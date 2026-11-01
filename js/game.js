// Main Game Engine: Controls, Three.js Loop, Multi-Zone Transitions, Interactions, and Compass

class RPGGame {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.clock = new THREE.Clock();

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.world = null;
        this.player = null;
        this.combat = null;
        this.ui = null;

        this.keys = {};
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // High stylized 3D isometric diorama RPG view
        this.cameraOffset = new THREE.Vector3(7.0, 14.0, 13.5);
        this.cameraLookOffset = new THREE.Vector3(0, 1.2, 0);

        window.gameStarted = false;
        this.selectedHeroPreset = (typeof HERO_PRESETS !== 'undefined' && HERO_PRESETS.length > 0) ? HERO_PRESETS[0] : null;

        this.init();
    }

    init() {
        this.setupRenderer();
        this.setupSceneAndCamera();

        // 1. World Manager
        this.world = new WorldManager(this.scene);

        // 2. Player
        this.player = new Player(this.scene);

        // 3. Combat System
        this.combat = new CombatSystem(this.scene, this.camera, this.player, this.world);
        window.gameCombat = this.combat;

        // 4. UI Manager
        this.ui = new UIManager(this.player);
        window.UI = this.ui;

        // 5. Controls & Listeners
        this.setupInput();
        this.setupVirtualJoystick();
        this.setupWindowResize();
        this.setupPauseMenu();

        // 6. Title Screen & Character Selection
        this.setupStartScreen();

        // 7. Game Loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.16;
        this.container.appendChild(this.renderer.domElement);
    }

    setupSceneAndCamera() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa7c5eb);
        this.scene.fog = new THREE.FogExp2(0xa7c5eb, 0.013);

        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 250);
        this.camera.position.set(7.8, 14.8, 14.5);
        this.camera.lookAt(0.8, 1.2, 1.5);
    }

    setupInput() {
        window.addEventListener('keydown', (e) => {
            // Typing in name input or any input box
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
                if (e.key === 'Enter' && e.target.id === 'player-name-input') {
                    this.startGame();
                }
                return;
            }

            // ESC: Toggle In-game Pause Menu
            if (e.code === 'Escape' || e.key === 'Escape') {
                e.preventDefault();
                if (window.gameStarted) {
                    this.togglePauseMenu();
                }
                return;
            }

            if (!window.gameStarted || window.gamePaused || window.quizActive) return;

            const key = e.key.toLowerCase();
            this.keys[key] = true;
            this.keys[e.code] = true;

            // Jump: Space
            if (e.code === 'Space') {
                e.preventDefault();
                this.player.jump();
            }

            // Attack: [F], [J], or [Enter] (Mouse Left-Click also attacks)
            if (key === 'f' || key === 'j' || e.code === 'Enter') {
                e.preventDefault();
                this.combat.triggerAttack();
            }

            // Skill 1: [Q]
            if (key === 'q') {
                this.combat.triggerSkill1();
            }

            // Skill 2: Dash [Shift]
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.combat.triggerSkill2();
            }

            // Potion: [H]
            if (key === 'h') {
                this.combat.usePotion();
            }

            // Mount / Dismount: [R]
            if (key === 'r') {
                e.preventDefault();
                if (this.player && typeof this.player.toggleMount === 'function') {
                    this.player.toggleMount();
                }
            }

            // Interact / Gather / Open Chest / Talk / Open Shop: [E]
            if (key === 'e') {
                const talked = this.checkNearbyNPC(this.player.mesh.position);
                if (!talked) {
                    const interacted = this.world.checkInteraction(this.player.mesh.position);
                    if (!interacted && this.world.currentZone === 'town') {
                        this.ui.toggleShop();
                    }
                }
            }

            // Map: [M]
            if (key === 'm') {
                if (window.MiniMap) window.MiniMap.toggleWorldMap();
            }

            // Quest Log: [L] or [Tab]
            if (key === 'l' || e.code === 'Tab') {
                e.preventDefault();
                this.ui.toggleQuestLog();
            }

            // Quick Educational Quiz Challenge: [K]
            if (key === 'k') {
                if (window.EduQuiz) {
                    window.EduQuiz.openQuiz({
                        category: 'general',
                        title: '🎓 UJIAN KUIS EDUKASI CEPAT (LATIHAN MANDIRI)',
                        icon: '📚',
                        contextDesc: 'Asah wawasan dan kemampuanmu di berbagai mata pelajaran untuk mendapatkan Poin Edukasi, Gold, dan Pemulihan Darah!'
                    });
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            this.keys[key] = false;
            this.keys[e.code] = false;
        });

        // Mouse Wheel Camera Zoom
        window.addEventListener('wheel', (e) => {
            const zoomDelta = e.deltaY * 0.015;
            const currentDist = this.cameraOffset.length();
            const newDist = THREE.MathUtils.clamp(currentDist + zoomDelta, 9, 36);
            this.cameraOffset.normalize().multiplyScalar(newDist);
        }, { passive: true });

        // Click / Tap to interact or attack
        window.addEventListener('pointerdown', (e) => {
            if (!window.gameStarted || window.gamePaused || window.quizActive) return;

            // MUST only trigger when clicking directly on the 3D WebGL Canvas!
            // Automatically ignores all HUD, dialogue, buttons, modals, and overlays
            if (e.target !== this.renderer.domElement) {
                return;
            }

            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);

            if (intersects.length > 0) {
                const hitObj = intersects[0].object;

                // 1. Check Shopkeeper
                if (this.world.shopkeeper && this.isDescendantOf(hitObj, this.world.shopkeeper)) {
                    this.ui.toggleShop(true);
                    this.ui.showCustomDialogue('shopkeeper', 'Shopkeeper: Selamat datang di Toko Senjata! Pilihlah pedang, busur, kapak, atau tongkat sihir terkuat untuk petualanganmu!');
                    return;
                }

                // 1b. Check Stable Master Barnaby (Mount Shop)
                if (this.world.stableMaster && this.isDescendantOf(hitObj, this.world.stableMaster.group)) {
                    Audio.playMountRoar('horse');
                    this.ui.toggleShop(true);
                    this.ui.switchTab('mounts');
                    this.ui.showCustomDialogue('shopkeeper', 'Peternak Barnaby: "Halo pahlawan! Selamat datang di Kandang Oakhaven! Pilihlah hewan tunggangan gagahmu: Kuda, Burung Garuda, Pegasus, Serigala, Harimau Sabertooth, atau Babi Hutan! Tekan [R] untuk naik/turun!"');
                    return;
                }

                // 2. Check Blacksmith Vulcan
                if (this.world.blacksmith && this.isDescendantOf(hitObj, this.world.blacksmith.group)) {
                    Audio.playPurchase();
                    this.ui.showCustomDialogue('shopkeeper', 'Pandai Besi Vulcan: *KLANG! KLANG!* Tempaan baja kami adalah yang tertangguh di Oakhaven! Jika kamu ingin menguji pemahaman tentang sains logam dan fisika tempaan, terimalah tantanganku!', {
                        category: 'npc',
                        npcName: 'Blacksmith Vulcan',
                        title: '🔨 UJIAN TEMPAAN SAINS & FISIKA',
                        icon: '⚒️',
                        contextDesc: 'Pandai Besi Vulcan ingin menguji pengetahuanmu tentang sifat konduktor dan kalor logam:'
                    });
                    return;
                }

                // 3. Check Bard Lyra
                if (this.world.bard && this.isDescendantOf(hitObj, this.world.bard.group)) {
                    Audio.playMagicCast();
                    this.ui.showCustomDialogue('hero', 'Lyra si Pengelana: 🎶 "Dengarlah balada Crimson Dragon, sang raja naga perkasa... Asahlah kemampuan sastra dan bahasamu lewat teka-teki pantun ini!" 🎵', {
                        category: 'npc',
                        npcName: 'Lyra the Bard',
                        title: '🎵 UJIAN SASTRA & BAHASA INDONESIA',
                        icon: '🪕',
                        contextDesc: 'Lyra sang musisi mengajukan teka-teki peribahasa dan sastra Nusantara:'
                    });
                    return;
                }

                // 4. Check Village Cat
                if (this.world.villageCat && this.isDescendantOf(hitObj, this.world.villageCat.group)) {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Kucing Belang Desa: Meoowww~ Purrrrr... 🐱 *Kucing manis melingkarkan ekornya dan menjilati bulunya dengan manja saat kamu mengelusnya.*');
                    return;
                }

                // 5. Check Gate Guard Roland
                if (this.world.gateGuard && this.isDescendantOf(hitObj, this.world.gateGuard.group)) {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Penjaga Gerbang Roland: Berhenti sejenak, petualang! Sebelum melangkah ke hutan berbahaya, buktikan kecepatan logika dan perhitunganmu!', {
                        category: 'npc',
                        npcName: 'Penjaga Gerbang Roland',
                        title: '🛡️ UJIAN LOGIKA PENJAGA GERBANG',
                        icon: '⚔️',
                        contextDesc: 'Penjaga Gerbang Roland memberikan simulasi uji kecepatan dan taktik prajurit:'
                    });
                    return;
                }

                // 6. Check Forest Alchemist Sylva
                if (this.world.alchemist && this.isDescendantOf(hitObj, this.world.alchemist.group)) {
                    Audio.playPurchase();
                    this.ui.showCustomDialogue('wizard', 'Alkemis Sylva: *mengaduk kuali ramuan beraroma harum* Salam pengembara! Jamur bercahaya di hutan ini sangat mujarab. Buktikan wawasan biologimu dalam ramuan ini!', {
                        category: 'npc',
                        npcName: 'Alchemist Sylva',
                        title: '🧪 UJIAN SAINS & ALKEMIA',
                        icon: '⚗️',
                        contextDesc: 'Alkemis Sylva menanyakan rahasia sistem peredaran darah dan nutrisi makhluk hidup:'
                    });
                    return;
                }

                // 7. Check Archaeologist Drake
                if (this.world.archaeologist && this.isDescendantOf(hitObj, this.world.archaeologist.group)) {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Arkeolog Drake: *memeriksa relief purba* Menakjubkan! Pilar-pilar batu ini berasal dari peradaban kuno Nusantara! Ingin menguji wawasan sejarahmu?', {
                        category: 'npc',
                        npcName: 'Archaeologist Drake',
                        title: '🏛️ UJIAN SEJARAH ARKEOLOG',
                        icon: '🏺',
                        contextDesc: 'Arkeolog Drake ingin menguji pengetahuan peninggalan candi dan sejarah Nusantara:'
                    });
                    return;
                }

                // 8. Check Angel Wizard
                if (this.world.angelWizard && this.isDescendantOf(hitObj, this.world.angelWizard.group)) {
                    this.ui.showCustomDialogue('wizard', 'Angel Wizard: Semoga berkah bintang langit menyertai senjatamu! Let us test your international language and cosmic knowledge!', {
                        category: 'npc',
                        npcName: 'Angel Wizard',
                        title: '✨ UJIAN BAHASA INGGRIS & KOSMIK',
                        icon: '⭐',
                        contextDesc: 'Angel Wizard mengajukan soal Bahasa Inggris dan tata bahasa petualang:'
                    });
                    return;
                }

                // 9. Check Village Elder
                if (this.world.villageElder && this.isDescendantOf(hitObj, this.world.villageElder.group)) {
                    this.ui.showCustomDialogue('wizard', 'Tetua Desa: Wahai petualang muda! Dunia Oakhaven luas dan sarat pengetahuan. Buktikan kecerdasanmu dengan menjawab tantangan sejarah bangsa!', {
                        category: 'npc',
                        npcName: 'Village Elder',
                        title: '🧙 UJIAN KEBIJAKSANAAN TETUA DESA',
                        icon: '📜',
                        contextDesc: 'Tetua Desa menguji wawasan kebangsaan dan sejarah kemerdekaan:'
                    });
                    return;
                }

                // 10. Check Royal Guard
                if ((this.world.villageGuard && this.isDescendantOf(hitObj, this.world.villageGuard.group)) ||
                    (this.world.villageGuard2 && this.isDescendantOf(hitObj, this.world.villageGuard2.group))) {
                    this.ui.showCustomDialogue('hero', 'Prajurit Penjaga: Tetap waspada di luar gerbang desa! Di seberang jembatan hutan bersembunyi monster berbahaya!');
                    return;
                }

                // 11. Check Village Dog
                if (this.world.villageDog && this.isDescendantOf(hitObj, this.world.villageDog.group)) {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Anjing Desa: Guk guk! *mengibaskan ekornya riang dan melompat manja* 🐕');
                    return;
                }

                // 12. Check Roaming Villagers
                for (let v of this.world.roamingVillagers) {
                    if (this.isDescendantOf(hitObj, v.group)) {
                        Audio.playDialogueBlip();
                        if (v.role === 'farmer') {
                            this.ui.showCustomDialogue('hero', 'Petani Bob: Ladang gandum tahun ini sangat subur dan menguning! Semoga musim panen membawa berkah.');
                        } else if (v.role === 'maid') {
                            this.ui.showCustomDialogue('shopkeeper', 'Pelayan Maria: Saya sedang menyapu alun-alun desa. Jangan lupa mampir ke kedai Tavern!');
                        } else if (v.role === 'kid') {
                            this.ui.showCustomDialogue('hero', 'Timmy Kecil: Halo Kakak Pahlawan! Senjatamu bersinar keren sekali! Mau main kejar-kejaran? Hehehe!');
                        }
                        return;
                    }
                }

                // Normal click attack (if clicked on ground or monster)
                if (e.button === 0) {
                    const interacted = this.world.checkInteraction(this.player.mesh.position);
                    if (!interacted) {
                        this.combat.triggerAttack();
                    }
                }
            }
        });

        // Attack button on UI
        const attackBtn = document.getElementById('attack-btn');
        if (attackBtn) {
            attackBtn.addEventListener('click', () => {
                if (!window.gameStarted) return;
                this.combat.triggerAttack();
            });
            attackBtn.addEventListener('touchstart', (e) => {
                if (!window.gameStarted) return;
                e.preventDefault();
                this.combat.triggerAttack();
            });
        }

        // Jump button on UI
        const jumpBtn = document.getElementById('jump-btn');
        if (jumpBtn) {
            jumpBtn.addEventListener('click', () => {
                if (!window.gameStarted) return;
                this.player.jump();
            });
            jumpBtn.addEventListener('touchstart', (e) => {
                if (!window.gameStarted) return;
                e.preventDefault();
                this.player.jump();
            });
        }
    }

    isDescendantOf(child, parent) {
        if (!parent) return false;
        let cur = child;
        while (cur) {
            if (cur === parent) return true;
            cur = cur.parent;
        }
        return false;
    }

    checkNearbyNPC(playerPos) {
        if (!this.world) return false;

        const checkList = [
            {
                entity: this.world.shopkeeper,
                dist: 3.5,
                action: () => {
                    this.ui.toggleShop(true);
                    this.ui.showCustomDialogue('shopkeeper', 'Shopkeeper: Selamat datang di Toko Senjata! Saya juga menyediakan kuis perhitungan transaksi berhadiah!', {
                        category: 'npc',
                        npcName: 'Shopkeeper',
                        title: '💰 TANTANGAN HITUNG TOKO SENJATA',
                        icon: '🏪',
                        contextDesc: 'Toko Senjata memberikan soal hitungan aritmatika & diskon berhadiah gold:'
                    });
                }
            },
            {
                entity: this.world.stableMaster ? this.world.stableMaster.group : null,
                dist: 4.2,
                action: () => {
                    Audio.playMountRoar('horse');
                    this.ui.toggleShop(true);
                    this.ui.switchTab('mounts');
                    this.ui.showCustomDialogue('shopkeeper', 'Peternak Barnaby: "Halo petualang gagah! Selamat datang di Kandang Tunggangan Oakhaven! Di sini tersedia Kuda Perang, Babi Hutan Purba, Serigala Bayangan, Harimau Sabertooth, Burung Garuda, dan Pegasus Surgawi! Beli dan tunggangi dengan bangga! Tekan [R] untuk naik/turun!"', {
                        category: 'npc',
                        npcName: 'Peternak Barnaby',
                        title: '🐎 KANDANG TUNGGANGAN OAKHAVEN',
                        icon: '🐎',
                        contextDesc: 'Peternak Barnaby menyediakan hewan tunggangan tempur berkemampuan super:'
                    });
                }
            },
            {
                entity: this.world.blacksmith ? this.world.blacksmith.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playPurchase();
                    this.ui.showCustomDialogue('shopkeeper', 'Pandai Besi Vulcan: *KLANG!* Tempaan baja terbaik membutuhkan ilmu sains dan fisika logam!', {
                        category: 'npc',
                        npcName: 'Blacksmith Vulcan',
                        title: '🔨 UJIAN TEMPAAN SAINS & FISIKA',
                        icon: '⚒️',
                        contextDesc: 'Pandai Besi Vulcan ingin menguji pengetahuanmu tentang sifat konduktor dan kalor logam:'
                    });
                }
            },
            {
                entity: this.world.bard ? this.world.bard.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playMagicCast();
                    this.ui.showCustomDialogue('hero', 'Lyra si Pengelana: 🎶 Setiap bait lagu petualangan sarat makna bahasa dan sastra indah!', {
                        category: 'npc',
                        npcName: 'Lyra the Bard',
                        title: '🎵 UJIAN SASTRA & BAHASA INDONESIA',
                        icon: '🪕',
                        contextDesc: 'Lyra sang musisi mengajukan teka-teki peribahasa dan sastra Nusantara:'
                    });
                }
            },
            {
                entity: this.world.villageCat ? this.world.villageCat.group : null,
                dist: 3.2,
                action: () => {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Kucing Belang Desa: Meoowww~ Purrrrr... 🐱 *Kucing manis melingkarkan ekornya dan menjilati bulunya dengan manja saat kamu mengelusnya.*');
                }
            },
            {
                entity: this.world.gateGuard ? this.world.gateGuard.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Penjaga Gerbang Roland: Sebelum melangkah ke hutan berbahaya, buktikan kecepatan logika dan taktik prajuritmu!', {
                        category: 'npc',
                        npcName: 'Penjaga Gerbang Roland',
                        title: '🛡️ UJIAN LOGIKA PENJAGA GERBANG',
                        icon: '⚔️',
                        contextDesc: 'Penjaga Gerbang Roland memberikan simulasi uji kecepatan dan taktik prajurit:'
                    });
                }
            },
            {
                entity: this.world.alchemist ? this.world.alchemist.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playPurchase();
                    this.ui.showCustomDialogue('wizard', 'Alkemis Sylva: *mengaduk kuali ramuan beraroma harum* Jamur dan tanaman di hutan ini menyimpan ilmu biologi yang luar biasa!', {
                        category: 'npc',
                        npcName: 'Alchemist Sylva',
                        title: '🧪 UJIAN SAINS & ALKEMIA',
                        icon: '⚗️',
                        contextDesc: 'Alkemis Sylva menanyakan rahasia sistem peredaran darah dan nutrisi makhluk hidup:'
                    });
                }
            },
            {
                entity: this.world.archaeologist ? this.world.archaeologist.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Arkeolog Drake: *memeriksa relief purba* Relief batu ini menyimpan catatan sejarah peradaban Nusantara kuno!', {
                        category: 'npc',
                        npcName: 'Archaeologist Drake',
                        title: '🏛️ UJIAN SEJARAH ARKEOLOG',
                        icon: '🏺',
                        contextDesc: 'Arkeolog Drake ingin menguji pengetahuan peninggalan candi dan sejarah Nusantara:'
                    });
                }
            },
            {
                entity: this.world.villageElder ? this.world.villageElder.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('wizard', 'Tetua Desa: Wahai petualang muda! Buktikan kecerdasanmu dengan menjawab tantangan sejarah bangsa!', {
                        category: 'npc',
                        npcName: 'Village Elder',
                        title: '🧙 UJIAN KEBIJAKSANAAN TETUA DESA',
                        icon: '📜',
                        contextDesc: 'Tetua Desa menguji wawasan kebangsaan dan sejarah kemerdekaan:'
                    });
                }
            },
            {
                entity: this.world.angelWizard ? this.world.angelWizard.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playPurchase();
                    this.ui.showCustomDialogue('wizard', 'Angel Wizard: Let us test your international language and cosmic knowledge!', {
                        category: 'npc',
                        npcName: 'Angel Wizard',
                        title: '✨ UJIAN BAHASA INGGRIS & KOSMIK',
                        icon: '⭐',
                        contextDesc: 'Angel Wizard mengajukan soal Bahasa Inggris dan tata bahasa petualang:'
                    });
                }
            },
            {
                entity: this.world.villageGuard ? this.world.villageGuard.group : null,
                dist: 4.0,
                action: () => {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Prajurit Penjaga: Demi kejayaan Oakhaven! Tetap waspada terhadap monster liar yang berkeliaran.');
                }
            },
            {
                entity: this.world.villageDog ? this.world.villageDog.group : null,
                dist: 3.5,
                action: () => {
                    Audio.playDialogueBlip();
                    this.ui.showCustomDialogue('hero', 'Anjing Desa: Guk guk! Woof! 🐕 *mengibaskan ekornya dengan riang gembira dan melompat-lompat di depanmu.*');
                }
            }
        ];

        for (const item of checkList) {
            if (item.entity) {
                const pos = item.entity.position || item.entity;
                if (playerPos.distanceTo(pos) < item.dist) {
                    item.action();
                    return true;
                }
            }
        }

        // Check roaming villagers
        if (this.world.roamingVillagers) {
            for (const v of this.world.roamingVillagers) {
                if (playerPos.distanceTo(v.group.position) < 3.5) {
                    Audio.playDialogueBlip();
                    if (v.role === 'farmer') {
                        this.ui.showCustomDialogue('hero', 'Petani Bob: Ladang gandum tahun ini sangat subur dan menguning! Semoga musim panen membawa berkah.');
                    } else if (v.role === 'maid') {
                        this.ui.showCustomDialogue('shopkeeper', 'Pelayan Maria: Saya sedang menyapu alun-alun desa. Jangan lupa mampir ke kedai Tavern!');
                    } else if (v.role === 'kid') {
                        this.ui.showCustomDialogue('hero', 'Timmy Kecil: Halo Kakak Pahlawan! Senjatamu bersinar keren sekali! Mau main kejar-kejaran? Hehehe!');
                    }
                    return true;
                }
            }
        }

        return false;
    }

    setupPauseMenu() {
        const modal = document.getElementById('pause-menu-modal');
        const topBtn = document.getElementById('top-menu-btn');
        const quickMenuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('pause-close-btn');
        const resumeBtn = document.getElementById('pause-resume-btn');
        const questBtn = document.getElementById('pause-quest-btn');
        const mapBtn = document.getElementById('pause-map-btn');
        const soundBtn = document.getElementById('pause-sound-btn');
        const musicBtn = document.getElementById('pause-music-btn');
        const respawnBtn = document.getElementById('pause-respawn-btn');
        const helpBtn = document.getElementById('pause-help-btn');
        const exitBtn = document.getElementById('pause-exit-btn');

        if (topBtn) topBtn.addEventListener('click', () => this.togglePauseMenu());
        if (quickMenuBtn) quickMenuBtn.addEventListener('click', () => this.togglePauseMenu());
        if (closeBtn) closeBtn.addEventListener('click', () => this.togglePauseMenu(false));
        if (resumeBtn) resumeBtn.addEventListener('click', () => this.togglePauseMenu(false));

        if (questBtn) {
            questBtn.addEventListener('click', () => {
                this.togglePauseMenu(false);
                if (this.ui) this.ui.toggleQuestLog(true);
            });
        }

        if (mapBtn) {
            mapBtn.addEventListener('click', () => {
                this.togglePauseMenu(false);
                if (window.MiniMap) window.MiniMap.toggleWorldMap(true);
            });
        }

        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                Audio.toggleSound();
            });
        }

        if (musicBtn) {
            musicBtn.addEventListener('click', () => {
                Audio.toggleMusic();
            });
        }

        // Real-time Volume Sliders in Pause Menu
        const pauseMusicSlider = document.getElementById('pause-music-slider');
        if (pauseMusicSlider) {
            pauseMusicSlider.addEventListener('input', (e) => {
                Audio.setMusicVolume(e.target.value);
            });
        }

        const pauseSoundSlider = document.getElementById('pause-sound-slider');
        if (pauseSoundSlider) {
            pauseSoundSlider.addEventListener('input', (e) => {
                Audio.setSfxVolume(e.target.value);
            });
        }

        const pauseMusicQuickMute = document.getElementById('pause-music-quick-mute');
        if (pauseMusicQuickMute) {
            pauseMusicQuickMute.addEventListener('click', () => {
                Audio.toggleMusic();
            });
        }

        const pauseSoundQuickMute = document.getElementById('pause-sound-quick-mute');
        if (pauseSoundQuickMute) {
            pauseSoundQuickMute.addEventListener('click', () => {
                Audio.toggleSound();
            });
        }

        // Mouse wheel volume scrolling on HUD buttons
        const hudMusicBtn = document.getElementById('music-btn');
        if (hudMusicBtn) {
            hudMusicBtn.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY < 0 ? 0.05 : -0.05;
                const newVol = Audio.setMusicVolume(Audio.getMusicVolume() + delta);
                if (this.ui) this.ui.showToast(`🎵 Volume Musik: ${Math.round(newVol * 100)}%`, 1400);
            }, { passive: false });
        }

        const hudSoundBtn = document.getElementById('sound-btn');
        if (hudSoundBtn) {
            hudSoundBtn.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY < 0 ? 0.05 : -0.05;
                const newVol = Audio.setSfxVolume(Audio.getSfxVolume() + delta);
                if (this.ui) this.ui.showToast(`🔊 Volume Efek Suara: ${Math.round(newVol * 100)}%`, 1400);
            }, { passive: false });
        }

        if (respawnBtn) {
            respawnBtn.addEventListener('click', () => {
                this.togglePauseMenu(false);
                if (this.world) {
                    this.world.changeZone('town', { x: 0, z: 12 });
                }
                if (this.player) {
                    this.player.hp = this.player.maxHp;
                    if (this.ui) this.ui.updateStats();
                }
                if (this.ui) {
                    this.ui.showToast('✨ Kembali ke Alun-Alun Desa Oakhaven! HP telah dipulihkan.');
                }
            });
        }

        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.togglePauseMenu(false);
                if (this.ui) {
                    this.ui.showCustomDialogue('hero', '🎮 Panduan Kontrol: WASD/Panah = Bergerak | Spasi/Klik = Serang (sesuai senjata) | Q = Jurus 1 | Shift = Jurus 2 (Dash) | H = Minum Ramuan (+60 HP) | E = Ajak Bicara NPC / Ambil Jamur / Peti | M = Peta Dunia | L/Tab = Buku Misi | ESC = Buka Menu Permainan');
                }
            });
        }

        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                this.exitToTitleScreen();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.togglePauseMenu(false);
            });
        }
    }

    togglePauseMenu(forceState = null) {
        if (!window.gameStarted) return;
        const modal = document.getElementById('pause-menu-modal');
        if (!modal) return;

        window.gamePaused = forceState !== null ? forceState : !window.gamePaused;
        modal.style.display = window.gamePaused ? 'flex' : 'none';

        if (window.gamePaused) {
            this.updatePauseMenuProfile();
            this.updatePauseAudioLabels();
            try {
                if (typeof Audio !== 'undefined' && Audio && typeof Audio.playDialogueBlip === 'function') {
                    Audio.playDialogueBlip();
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    updatePauseMenuProfile() {
        if (!this.player) return;

        const avatarEl = document.getElementById('pause-hero-avatar');
        const nameEl = document.getElementById('pause-hero-name');
        const classEl = document.getElementById('pause-hero-class');
        const lvlEl = document.getElementById('pause-stat-level');
        const goldEl = document.getElementById('pause-stat-gold');
        const weaponEl = document.getElementById('pause-stat-weapon');

        const classData = {
            knight:   { icon: '⚔️', title: 'Ksatria Pedang (Blade Knight)' },
            pyro:     { icon: '🔥', title: 'Penyihir Api (Pyromancer)' },
            ranger:   { icon: '🏹', title: 'Pemburu Angin (Wind Ranger)' },
            paladin:  { icon: '🛡️', title: 'Ksatria Bintang (Star Paladin)' },
            assassin: { icon: '🥷', title: 'Ninja Bayangan (Shadow Shinobi)' },
            valkyrie: { icon: '❄️', title: 'Valkyrie Es (Frost Valkyrie)' }
        };

        const weaponNames = {
            woodenSword: 'Wooden Sword 🗡️',
            ironSword:   'Iron Sword ⚔️',
            starSword:   'Star Sword ⭐',
            shortbow:    'Hunting Bow 🏹',
            magicStaff:  'Arcane Staff 🪄',
            ironAxe:     'Battle Axe 🪓'
        };

        const cInfo = classData[this.player.characterClass] || { icon: '⚔️', title: 'Petualang' };

        if (avatarEl) avatarEl.textContent = cInfo.icon;
        if (nameEl) nameEl.textContent = this.player.name || 'Arthur';
        if (classEl) classEl.textContent = cInfo.title;
        if (lvlEl) lvlEl.textContent = `Lv. ${this.player.level || 1}`;
        if (goldEl) goldEl.textContent = `${this.player.gold || 0}`;
        const quizEl = document.getElementById('pause-stat-quiz');
        if (quizEl) quizEl.textContent = `${this.player.quizScore || 0}`;
        if (weaponEl) weaponEl.textContent = weaponNames[this.player.equippedWeapon] || 'Pedang';
    }

    updatePauseAudioLabels() {
        if (typeof Audio !== 'undefined' && Audio && typeof Audio.notifyAudioListeners === 'function') {
            Audio.notifyAudioListeners();
        }
    }

    exitToTitleScreen() {
        this.togglePauseMenu(false);
        if (this.ui) {
            this.ui.toggleShop(false);
            this.ui.toggleQuestLog(false);
            const diagBox = document.getElementById('dialogue-box');
            if (diagBox) {
                diagBox.style.display = 'none';
                diagBox.classList.remove('active');
            }
            const worldMap = document.getElementById('world-map-modal');
            if (worldMap) worldMap.style.display = 'none';
        }

        window.gameStarted = false;
        window.gamePaused = false;

        // Reset zone to town if player was in another zone
        if (this.world && this.world.currentZone !== 'town') {
            this.world.changeZone('town', { x: 0, z: 12 });
        }

        // Reposition player in town center
        if (this.player && this.player.mesh) {
            this.player.mesh.position.set(0, 0, 12);
            this.player.moveX = 0;
            this.player.moveZ = 0;
            this.player.isMoving = false;
        }

        // Display start screen overlay
        const overlay = document.getElementById('start-screen-overlay');
        if (overlay) {
            overlay.classList.remove('fade-out');
            overlay.style.display = 'flex';
            document.body.classList.add('in-title-screen');
        }

        try {
            if (typeof Audio !== 'undefined' && Audio && typeof Audio.playDialogueBlip === 'function') {
                Audio.playDialogueBlip();
            }
        } catch (err) {
            console.warn(err);
        }
    }

    setupVirtualJoystick() {
        const zone = document.getElementById('joystick-zone');
        const knob = document.getElementById('joystick-knob');
        if (!zone || !knob) return;

        let active = false;
        let startX = 0;
        let startY = 0;
        const maxDist = 45;

        const handleStart = (clientX, clientY) => {
            if (!window.gameStarted) return;
            active = true;
            const rect = zone.getBoundingClientRect();
            startX = rect.left + rect.width / 2;
            startY = rect.top + rect.height / 2;
            handleMove(clientX, clientY);
        };

        const handleMove = (clientX, clientY) => {
            if (!active) return;
            let dx = clientX - startX;
            let dy = clientY - startY;
            const dist = Math.hypot(dx, dy);

            if (dist > maxDist) {
                dx = (dx / dist) * maxDist;
                dy = (dy / dist) * maxDist;
            }

            knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
            this.player.moveX = dx / maxDist;
            this.player.moveZ = dy / maxDist;
        };

        const handleEnd = () => {
            active = false;
            knob.style.transform = `translate(-50%, -50%)`;
            this.player.moveX = 0;
            this.player.moveZ = 0;
        };

        zone.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        });

        window.addEventListener('touchmove', (e) => {
            if (active) {
                e.preventDefault();
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });

        window.addEventListener('touchend', handleEnd);
    }

    setupWindowResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    updatePlayerMovement() {
        if (!window.gameStarted || window.gamePaused || window.quizActive) {
            this.player.moveX = 0;
            this.player.moveZ = 0;
            this.player.isMoving = false;
            return;
        }

        let kx = 0;
        let kz = 0;

        if (this.keys['w'] || this.keys['arrowup']) kz -= 1;
        if (this.keys['s'] || this.keys['arrowdown']) kz += 1;
        if (this.keys['a'] || this.keys['arrowleft']) kx -= 1;
        if (this.keys['d'] || this.keys['arrowright']) kx += 1;

        if (kx !== 0 || kz !== 0) {
            this.player.moveX = kx;
            this.player.moveZ = kz;
        } else if (!document.getElementById('joystick-zone')?.matches(':active')) {
            if (Math.abs(this.player.moveX) <= 1 && Math.abs(this.player.moveZ) <= 1) {
                if (kx === 0) this.player.moveX = 0;
                if (kz === 0) this.player.moveZ = 0;
            }
        }
    }

    setupStartScreen() {
        const grid = document.getElementById('char-classes-grid');
        const nameInput = document.getElementById('player-name-input');
        const diceBtn = document.getElementById('random-name-btn');
        const startBtn = document.getElementById('start-game-btn');

        if (!grid || !nameInput || !startBtn) return;

        // Populate character classes grid
        grid.innerHTML = '';
        const presets = (typeof HERO_PRESETS !== 'undefined') ? HERO_PRESETS : [];

        presets.forEach((preset) => {
            const card = document.createElement('div');
            const isSelected = this.selectedHeroPreset && preset.id === this.selectedHeroPreset.id;
            card.className = `char-card ${isSelected ? 'selected' : ''}`;
            card.style.setProperty('--theme-color', preset.themeColor);
            card.setAttribute('data-char-id', preset.id);

            card.innerHTML = `
                <div class="char-card-badge" style="background: ${preset.themeColor}">${preset.badge}</div>
                <div class="char-card-header">
                    <div class="char-card-icon">${preset.icon}</div>
                    <div class="char-card-names">
                        <div class="char-card-name">${preset.name}</div>
                        <div class="char-card-title">${preset.title}</div>
                    </div>
                </div>
                <div class="char-card-desc">${preset.desc}</div>
                <div class="char-card-stats">
                    <span class="char-stat-pill">⚔️ ATK: <b>${preset.statNums.atk}</b></span>
                    <span class="char-stat-pill">❤️ HP: <b>${preset.statNums.hp}</b></span>
                    <span class="char-stat-pill">⚡ CRIT: <b>${preset.statNums.crit}%</b></span>
                </div>
                <div class="char-select-indicator">${isSelected ? '✓ TERPILIH' : 'PILIH KARAKTER'}</div>
            `;

            card.addEventListener('click', () => {
                this.selectCharacterPreset(preset);
            });

            grid.appendChild(card);
        });

        // Random name button
        if (diceBtn) {
            const handleDice = (e) => {
                if (e) e.preventDefault();
                const names = typeof FANTASY_NAMES !== 'undefined' ? FANTASY_NAMES : ['Arthur', 'Ignis', 'Zephyr', 'Aurelia', 'Kage', 'Freya'];
                const randomName = names[Math.floor(Math.random() * names.length)];
                nameInput.value = randomName;
                try {
                    if (typeof Audio !== 'undefined' && Audio && typeof Audio.playDialogueBlip === 'function') {
                        Audio.playDialogueBlip();
                    }
                } catch (err) {
                    console.warn(err);
                }
            };
            diceBtn.addEventListener('click', handleDice);
            diceBtn.addEventListener('touchend', handleDice);
        }

        // Title Screen Audio Controls
        const startMusicToggle = document.getElementById('start-music-toggle-btn');
        if (startMusicToggle) {
            startMusicToggle.addEventListener('click', () => {
                Audio.toggleMusic();
            });
        }

        const startMusicSlider = document.getElementById('start-music-slider');
        if (startMusicSlider) {
            startMusicSlider.addEventListener('input', (e) => {
                Audio.setMusicVolume(e.target.value);
            });
        }

        // Start Game CTA Button
        const handleStart = (e) => {
            if (e) e.preventDefault();
            this.startGame();
        };
        startBtn.addEventListener('click', handleStart);
        startBtn.addEventListener('touchend', handleStart);

        // Apply initial hero appearance
        if (this.selectedHeroPreset && this.player) {
            this.player.setHeroAppearance(this.selectedHeroPreset.modelConfig);
        }
    }

    selectCharacterPreset(preset) {
        this.selectedHeroPreset = preset;
        try {
            if (typeof Audio !== 'undefined' && Audio && typeof Audio.playDialogueBlip === 'function') {
                Audio.playDialogueBlip();
            }
        } catch (err) {
            console.warn(err);
        }

        // Update cards UI
        const allCards = document.querySelectorAll('.char-card');
        allCards.forEach(c => {
            const isMatch = c.getAttribute('data-char-id') === preset.id;
            c.classList.toggle('selected', isMatch);
            const indicator = c.querySelector('.char-select-indicator');
            if (indicator) {
                indicator.textContent = isMatch ? '✓ TERPILIH' : 'PILIH KARAKTER';
            }
        });

        // Update name input if user hasn't typed a custom name
        const nameInput = document.getElementById('player-name-input');
        if (nameInput) {
            const isDefaultHeroName = (typeof HERO_PRESETS !== 'undefined') && HERO_PRESETS.some(p => p.name.toLowerCase() === nameInput.value.trim().toLowerCase());
            if (!nameInput.value.trim() || isDefaultHeroName) {
                nameInput.value = preset.name;
            }
        }

        // Live 3D character update!
        if (this.player) {
            this.player.setHeroAppearance(preset.modelConfig);
        }
    }

    startGame() {
        if (window.gameStarted) return;

        const nameInput = document.getElementById('player-name-input');
        const heroName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : (this.selectedHeroPreset ? this.selectedHeroPreset.name : 'Arthur');

        // Apply to Player instance
        if (this.player) {
            this.player.name = heroName;
            this.player.characterClass = this.selectedHeroPreset ? this.selectedHeroPreset.id : 'knight';
            if (this.selectedHeroPreset && this.selectedHeroPreset.modelConfig) {
                this.player.setHeroAppearance(this.selectedHeroPreset.modelConfig);
            }
            if (this.player.mesh) {
                this.player.mesh.rotation.y = 0; // Face forward
            }
        }

        // Update HUD name
        const playerNameBadge = document.getElementById('player-name');
        if (playerNameBadge) {
            playerNameBadge.textContent = heroName;
        }

        // Update HUD stats & skills
        if (this.ui) {
            try {
                this.ui.updateStats();
                this.ui.updateSkillCooldowns();
            } catch (err) {
                console.warn(err);
            }
        }

        // Play audio fanfare & Start main BGM (musikutama.mp3)
        try {
            if (typeof Audio !== 'undefined' && Audio) {
                if (typeof Audio.playQuestComplete === 'function') {
                    Audio.playQuestComplete();
                } else if (typeof Audio.playLevelUp === 'function') {
                    Audio.playLevelUp();
                }
                if (typeof Audio.startMusic === 'function') {
                    Audio.startMusic();
                }
            }
        } catch (err) {
            console.warn(err);
        }

        // Mark game as started immediately
        window.gameStarted = true;
        window.gamePaused = false;

        // Smooth fade out title overlay
        const overlay = document.getElementById('start-screen-overlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.style.display = 'none';
                document.body.classList.remove('in-title-screen');
            }, 500);
        } else {
            document.body.classList.remove('in-title-screen');
        }

        // Welcome message toast
        if (this.ui && typeof this.ui.showToast === 'function') {
            try {
                this.ui.showToast(`✨ Selamat datang di Eldoria, ${heroName}! Temui Tetua Desa di dekat Air Mancur.`);
            } catch (err) {
                console.warn(err);
            }
        }
    }

    animate() {
        requestAnimationFrame(this.animate);

        const delta = Math.min(this.clock.getDelta(), 0.1);
        const time = this.clock.getElapsedTime();

        if (!window.gameStarted) {
            // Gentle showcase rotation for character selection preview
            if (this.player && this.player.mesh) {
                this.player.mesh.rotation.y += delta * 0.75;
                this.player.isMoving = false;
                this.player.update(delta, time, this.world ? this.world.colliders : [], this.world);
            }
            if (this.world) {
                this.world.update(delta, time, this.player ? this.player.mesh.position : new THREE.Vector3(0, 0, 12));
            }
            // Smooth Camera Follow
            const targetPos = this.player.mesh.position.clone().add(this.cameraOffset);
            this.camera.position.lerp(targetPos, 8 * delta);

            const lookTarget = this.player.mesh.position.clone().add(this.cameraLookOffset);
            this.camera.lookAt(lookTarget);

            this.renderer.render(this.scene, this.camera);
            return;
        }

        if (window.gamePaused) {
            // Scene frozen in background behind pause menu
            this.renderer.render(this.scene, this.camera);
            return;
        }

        // 1. Movement
        this.updatePlayerMovement();
        this.player.update(delta, time, this.world.colliders, this.world);

        // 2. World & Portals
        this.world.update(delta, time, this.player.mesh.position);

        // 3. Combat & Enemy AI
        this.combat.update(delta, time);

        // 4. Mini-Map & Position Tracking
        if (window.MiniMap) {
            window.MiniMap.update(this.player, this.world);
        }

        // 5. Directional Compass towards Quest Objective
        if (this.ui) {
            this.ui.updateCompass(this.player.mesh.position, this.world.currentZone, this.world);
            this.ui.updateSkillCooldowns();
        }

        // 6. Smooth Camera Follow
        const targetPos = this.player.mesh.position.clone().add(this.cameraOffset);
        this.camera.position.lerp(targetPos, 8 * delta);

        const lookTarget = this.player.mesh.position.clone().add(this.cameraLookOffset);
        this.camera.lookAt(lookTarget);

        // 7. Render 3D Scene
        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new RPGGame();
});
