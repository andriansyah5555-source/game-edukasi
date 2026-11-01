// UI Manager: Equipment Shop, Quest Tracker, Compass, Skills HUD, Boss Bar, and Dialogues

class UIManager {
    constructor(player) {
        this.player = player;
        this.shopOpen = false;
        this.questLogOpen = false;

        // Equipment Shop Data (Exact match with screenshot)
        this.shopItems = {
            weapons: [
                {
                    id: 'woodenSword',
                    name: 'Wooden Sword',
                    price: 100,
                    stats: 'Attack +15',
                    icon: GameAssets.woodenSword,
                    isLegendary: false
                },
                {
                    id: 'ironSword',
                    name: 'Iron Sword',
                    price: 200,
                    stats: 'Attack +25',
                    icon: GameAssets.ironSword,
                    isLegendary: false
                },
                {
                    id: 'starSword',
                    name: 'Star Sword',
                    price: 1000,
                    stats: 'Attack +50<br>Crit Rate +10%',
                    icon: GameAssets.starSword,
                    isLegendary: true // Glowing gold & pink border
                },
                {
                    id: 'ironAxe',
                    name: 'Iron Axe',
                    price: 100,
                    stats: 'Attack +15',
                    icon: GameAssets.ironAxe,
                    isLegendary: false
                },
                {
                    id: 'magicStaff',
                    name: 'Magic Staff',
                    price: 100,
                    stats: 'Attack +15',
                    icon: GameAssets.magicStaff,
                    isLegendary: false
                },
                {
                    id: 'shortbow',
                    name: 'Shortbow',
                    price: 100,
                    stats: 'Crit Rate +5%',
                    icon: GameAssets.shortbow,
                    isLegendary: false
                }
            ],
            armor: [
                {
                    id: 'leatherArmor',
                    name: 'Leather Armor',
                    price: 150,
                    stats: 'Defense +10<br>HP +25',
                    icon: GameAssets.woodenSword,
                    isLegendary: false
                },
                {
                    id: 'dragonPlate',
                    name: 'Dragon Scale Armor',
                    price: 650,
                    stats: 'Defense +40<br>HP +120',
                    icon: GameAssets.starSword,
                    isLegendary: true
                }
            ],
            accessories: [
                {
                    id: 'warriorRing',
                    name: 'Ring of Valour',
                    price: 200,
                    stats: 'Attack +10<br>Crit +5%',
                    icon: GameAssets.magicStaff,
                    isLegendary: false
                },
                {
                    id: 'celestialAmulet',
                    name: 'Celestial Star Amulet',
                    price: 800,
                    stats: 'Crit +15%<br>HP +150',
                    icon: GameAssets.starSword,
                    isLegendary: true
                }
            ],
            mounts: typeof MOUNTS_DATA !== 'undefined' ? MOUNTS_DATA : [
                {
                    id: 'mount_horse',
                    type: 'horse',
                    name: 'Kuda Perang Ksatria',
                    price: 200,
                    stats: '⚡ Kecepatan +70%<br>🐎 Derap Kaki Cepat<br>🛡️ Daya Tahan +10',
                    icon: GameAssets.mountHorse,
                    isLegendary: false
                },
                {
                    id: 'mount_boar',
                    type: 'boar',
                    name: 'Babi Hutan Purba',
                    price: 350,
                    stats: '⚡ Kecepatan +60%<br>🛡️ Pertahanan +20<br>❤️ Max HP +80',
                    icon: GameAssets.mountBoar,
                    isLegendary: false
                },
                {
                    id: 'mount_wolf',
                    type: 'wolf',
                    name: 'Serigala Bayangan',
                    price: 500,
                    stats: '⚡ Kecepatan +75%<br>⚔️ Serangan +15<br>🎯 Crit Rate +5%',
                    icon: GameAssets.mountWolf,
                    isLegendary: false
                },
                {
                    id: 'mount_cat',
                    type: 'cat',
                    name: 'Harimau Baja',
                    price: 700,
                    stats: '⚡ Kecepatan +80%<br>⚔️ Serangan +25<br>💨 Lompatan Harimau',
                    icon: GameAssets.mountCat,
                    isLegendary: false
                },
                {
                    id: 'mount_bird',
                    type: 'bird',
                    name: 'Burung Garuda Raksasa',
                    price: 950,
                    stats: '⚡ Kecepatan +85%<br>🪽 Sayap Meluncur (Glide)<br>🌊 Lintasi Air & Tebing',
                    icon: GameAssets.mountBird,
                    isLegendary: false
                },
                {
                    id: 'mount_pegasus',
                    type: 'pegasus',
                    name: 'Pegasus Surgawi',
                    price: 1400,
                    stats: '⚡ Kecepatan +100%<br>✨ Sayap Surgawi & Meluncur<br>🌟 Jejak Bintang Kosmik',
                    icon: GameAssets.mountPegasus,
                    isLegendary: true
                }
            ]
        };

        this.currentTab = 'weapons';

        this.initDOM();
        this.renderEquipmentShop();
        this.updateStats();
        this.updateMountHUD();
        if (window.QuestSys) window.QuestSys.updateHUD();
    }

    initDOM() {
        // Hero portrait in dialogue box
        const portraitContainer = document.getElementById('dialogue-portrait');
        if (portraitContainer) {
            portraitContainer.innerHTML = GameAssets.heroPortrait;
        }

        // Shop Tabs (Weapons, Armor, Accessories, Mounts)
        ['weapons', 'armor', 'accessories', 'mounts'].forEach(tab => {
            const btn = document.getElementById(`tab-${tab}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.currentTab = tab;
                    this.renderEquipmentShop();
                });
            }
        });

        // Close shop button
        const closeShopBtn = document.getElementById('shop-close-btn');
        if (closeShopBtn) {
            closeShopBtn.addEventListener('click', () => this.toggleShop(false));
        }

        // Shop Toggle Header Button
        const toggleBtn = document.getElementById('toggle-shop-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleShop());
        }

        // Dedicated Mount Button on Action HUD
        const mountBtn = document.getElementById('mount-btn');
        if (mountBtn) {
            mountBtn.addEventListener('click', () => {
                if (this.player && typeof this.player.toggleMount === 'function') {
                    this.player.toggleMount();
                }
            });
        }

        // Skill Buttons
        const whirlwindBtn = document.getElementById('skill-whirlwind-btn');
        if (whirlwindBtn) {
            whirlwindBtn.addEventListener('click', () => {
                if (window.game && window.game.combat) window.game.combat.triggerWhirlwind();
            });
        }

        const dashBtn = document.getElementById('skill-dash-btn');
        if (dashBtn) {
            dashBtn.addEventListener('click', () => {
                if (window.game && window.game.combat) window.game.combat.triggerDash();
            });
        }

        const potionBtn = document.getElementById('potion-btn');
        if (potionBtn) {
            potionBtn.addEventListener('click', () => {
                if (window.game && window.game.combat) window.game.combat.usePotion();
            });
        }

        // Quest Log Button & Close
        const questLogBtn = document.getElementById('quest-log-btn');
        if (questLogBtn) {
            questLogBtn.addEventListener('click', () => this.toggleQuestLog());
        }

        const questLogClose = document.getElementById('quest-log-close-btn');
        if (questLogClose) {
            questLogClose.addEventListener('click', () => this.toggleQuestLog(false));
        }

        const questLogModal = document.getElementById('quest-log-modal');
        if (questLogModal) {
            questLogModal.addEventListener('click', (e) => {
                if (e.target === questLogModal) this.toggleQuestLog(false);
            });
        }

        // Dialogue Box click
        const dialogueBox = document.getElementById('dialogue-box');
        if (dialogueBox) {
            dialogueBox.addEventListener('click', () => {
                dialogueBox.style.display = 'none';
            });
        }

        // Sound Effects & Music Quick Toggles
        const soundBtn = document.getElementById('sound-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                const enabled = Audio.toggleSound();
                soundBtn.textContent = enabled ? '🔊' : '🔇';
                soundBtn.title = enabled ? 'Suara Efek: Aktif' : 'Suara Efek: Nonaktif';
            });
        }

        const musicBtn = document.getElementById('music-btn');
        if (musicBtn) {
            musicBtn.addEventListener('click', () => {
                const enabled = Audio.toggleMusic();
                musicBtn.textContent = enabled ? '🎵' : '🔈';
                musicBtn.title = enabled ? 'Musik Fantasy: Aktif' : 'Musik: Nonaktif';
            });
        }

        // Educational Quiz Quick Triggers
        const quizBtn = document.getElementById('quiz-btn');
        if (quizBtn) {
            quizBtn.addEventListener('click', () => {
                if (window.EduQuiz) {
                    window.EduQuiz.openQuiz({
                        category: 'general',
                        title: '🎓 UJIAN KUIS EDUKASI CEPAT (LATIHAN MANDIRI)',
                        icon: '📚',
                        contextDesc: 'Asah wawasan dan kemampuanmu di berbagai mata pelajaran untuk mendapatkan Poin Edukasi, Gold, dan Pemulihan Darah!'
                    });
                }
            });
        }

        const quizScoreBadge = document.getElementById('quiz-score-badge');
        if (quizScoreBadge) {
            quizScoreBadge.addEventListener('click', () => {
                if (window.EduQuiz) {
                    window.EduQuiz.openQuiz({
                        category: 'general',
                        title: '🎓 UJIAN KUIS EDUKASI CEPAT (LATIHAN MANDIRI)',
                        icon: '📚',
                        contextDesc: 'Asah wawasan dan kemampuanmu di berbagai mata pelajaran untuk mendapatkan Poin Edukasi, Gold, dan Pemulihan Darah!'
                    });
                }
            });
        }
    }

    renderEquipmentShop() {
        const grid = document.getElementById('equipment-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const items = this.shopItems[this.currentTab] || [];

        items.forEach(item => {
            let isEquipped = false;
            let isOwned = false;

            if (this.currentTab === 'mounts') {
                isOwned = this.player.ownedMounts && this.player.ownedMounts.includes(item.id);
                isEquipped = this.player.activeMountId === item.id && this.player.isMounted;
            } else {
                isEquipped = this.player.equippedWeapon === item.id;
                isOwned = this.player.inventory.includes(item.id);
            }

            const card = document.createElement('div');
            card.className = `shop-item-card ${item.isLegendary ? 'legendary' : ''} ${isEquipped ? 'equipped' : ''}`;

            let priceDisplay = `${item.price} Gold`;
            let btnText = 'Beli';
            let btnClass = 'btn-buy';

            if (this.currentTab === 'mounts') {
                if (isEquipped) {
                    priceDisplay = '🐎 SEDANG DINAIKI';
                    btnText = 'Turun [R]';
                    btnClass = 'btn-equipped';
                } else if (isOwned) {
                    priceDisplay = '✅ DIMILIKI';
                    btnText = 'Tunggangi [R]';
                    btnClass = 'btn-equip';
                } else {
                    priceDisplay = `${item.price} Gold`;
                    btnText = `Beli (${item.price} G)`;
                    btnClass = 'btn-buy';
                }
            } else {
                priceDisplay = isOwned ? (isEquipped ? 'EQUIPPED' : 'OWNED') : `${item.price} Gold`;
                btnText = isEquipped ? 'Equipped' : (isOwned ? 'Equip' : 'Buy');
                btnClass = isEquipped ? 'btn-equipped' : (isOwned ? 'btn-equip' : 'btn-buy');
            }

            card.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-icon-box">
                    ${item.icon}
                </div>
                <div class="item-price">
                    <span class="gold-icon">💰</span> ${priceDisplay}
                </div>
                <div class="item-stats">${item.stats}</div>
                <button class="item-action-btn ${btnClass}">
                    ${btnText}
                </button>
            `;

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleItemAction(item);
            });

            grid.appendChild(card);
        });
    }

    handleItemAction(item) {
        if (this.currentTab === 'mounts') {
            const isOwned = this.player.ownedMounts && this.player.ownedMounts.includes(item.id);

            if (isOwned) {
                if (this.player.activeMountId === item.id && this.player.isMounted) {
                    this.player.dismount();
                    this.showCustomDialogue('hero', `Turun dari ${item.name}.`);
                } else {
                    this.player.mountUp(item.id);
                    this.showCustomDialogue('hero', `Menaiki ${item.name}! Kecepatan bertambah dahsyat!`);
                }
                this.renderEquipmentShop();
                this.updateStats();
                this.updateMountHUD();
            } else {
                // Must be bought first!
                if (this.player.gold >= item.price) {
                    this.player.gold -= item.price;
                    if (!this.player.ownedMounts) this.player.ownedMounts = [];
                    this.player.ownedMounts.push(item.id);
                    this.player.mountUp(item.id);
                    if (typeof Audio !== 'undefined') {
                        Audio.playPurchase();
                    }
                    if (window.QuestSys) {
                        window.QuestSys.onItemPurchased(item.id);
                    }
                    this.renderEquipmentShop();
                    this.updateStats();
                    this.updateMountHUD();
                    this.showCustomDialogue('hero', `Berhasil membeli dan menaiki ${item.name}! Sangat keren! (Tekan [R] untuk Naik/Turun kapan saja)`);
                } else {
                    if (typeof Audio !== 'undefined') Audio.playHit();
                    this.showCustomDialogue('shopkeeper', `Gold Anda kurang ${item.price - this.player.gold}! Jawab kuis edukasi, buka peti, atau kalahkan monster untuk mengumpulkan gold!`);
                }
            }
            return;
        }

        if (this.currentTab !== 'weapons') {
            this.showCustomDialogue('shopkeeper', 'Item armor/aksesoris ini akan hadir di pembaruan selanjutnya!');
            return;
        }

        const isOwned = this.player.inventory.includes(item.id);

        if (isOwned) {
            this.player.attachWeapon(item.id);
            Audio.playPurchase();
            this.renderEquipmentShop();
            this.updateStats();
            this.showCustomDialogue('hero', `Memasang ${item.name}! Seranganku kini bertambah kuat!`);
        } else {
            if (this.player.gold >= item.price) {
                this.player.gold -= item.price;
                this.player.inventory.push(item.id);
                this.player.attachWeapon(item.id);
                Audio.playPurchase();

                if (window.QuestSys) {
                    window.QuestSys.onItemPurchased(item.id);
                }

                this.renderEquipmentShop();
                this.updateStats();

                if (item.isLegendary) {
                    this.showCustomDialogue('hero', 'LUAR BIASA! Star Sword Legendaris kini ada di tanganku! Mari ratakan semua monster!');
                } else {
                    this.showCustomDialogue('hero', `Berhasil membeli ${item.name}! Jauh lebih tajam dari sebelumnya!`);
                }
            } else {
                Audio.playHit();
                this.showCustomDialogue('shopkeeper', `Gold Anda kurang ${item.price - this.player.gold}! Taklukkan monster atau buka peti untuk mendapatkan gold!`);
            }
        }
    }

    updateMountHUD() {
        const mountBtn = document.getElementById('mount-btn');
        const activeHud = document.getElementById('mount-active-hud');
        const activeIcon = document.getElementById('mount-active-icon');
        const activeName = document.getElementById('mount-active-name');

        const icons = {
            horse: '🐎',
            bird: '🦅',
            pegasus: '🦄',
            wolf: '🐺',
            cat: '🐯',
            boar: '🐗'
        };

        if (this.player && this.player.isMounted && this.player.currentMount) {
            const cleanType = String(this.player.activeMountId).replace(/^mount_/, '');
            const icon = icons[cleanType] || '🐎';
            let mName = 'Tunggangan';
            if (typeof MOUNTS_DATA !== 'undefined') {
                const md = MOUNTS_DATA.find(m => m.id === this.player.activeMountId);
                if (md) mName = md.name;
            }

            if (mountBtn) {
                mountBtn.innerHTML = icon;
                mountBtn.classList.add('is-mounted');
                mountBtn.title = `Turun dari ${mName} [R]`;
            }

            if (activeHud) {
                activeHud.style.display = 'flex';
                if (activeIcon) activeIcon.textContent = icon;
                if (activeName) activeName.textContent = mName;
            }
        } else {
            if (mountBtn) {
                mountBtn.innerHTML = '🐎';
                mountBtn.classList.remove('is-mounted');
                mountBtn.title = 'Naik / Turun Tunggangan [R]';
            }

            if (activeHud) {
                activeHud.style.display = 'none';
            }
        }
    }

    switchTab(tab) {
        document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
        const targetBtn = document.getElementById(`tab-${tab}`);
        if (targetBtn) targetBtn.classList.add('active');
        this.currentTab = tab;
        this.renderEquipmentShop();
    }

    toggleShop(forceState = null) {
        this.shopOpen = forceState !== null ? forceState : !this.shopOpen;
        const modal = document.getElementById('equipment-shop-modal');
        if (modal) {
            modal.style.display = this.shopOpen ? 'flex' : 'none';
        }
        if (this.shopOpen) {
            this.renderEquipmentShop();
        }
    }

    toggleQuestLog(forceState = null) {
        this.questLogOpen = forceState !== null ? forceState : !this.questLogOpen;
        const modal = document.getElementById('quest-log-modal');
        if (!modal) return;
        modal.style.display = this.questLogOpen ? 'flex' : 'none';
        if (this.questLogOpen) {
            this.renderQuestLog();
        }
    }

    renderQuestLog() {
        const container = document.getElementById('quest-log-content');
        if (!container || !window.QuestSys) return;

        container.innerHTML = '';
        window.QuestSys.quests.forEach((q, idx) => {
            const isCurrent = idx === window.QuestSys.currentQuestIndex;
            const item = document.createElement('div');
            item.className = `quest-log-entry ${q.completed ? 'completed' : (isCurrent ? 'active' : 'locked')}`;

            item.innerHTML = `
                <div class="quest-log-title">
                    <span>${q.completed ? '✅' : (isCurrent ? '⭐' : '🔒')} ${q.title}</span>
                    <span class="quest-log-badge">${q.completed ? 'SELESAI' : (isCurrent ? `${q.current}/${q.required}` : 'TERKUNCI')}</span>
                </div>
                <div class="quest-log-desc">${q.desc}</div>
                <div class="quest-log-reward">Hadiah: 💰 +${q.rewardGold} Gold | ⭐ +${q.rewardExp} EXP</div>
            `;
            container.appendChild(item);
        });
    }

    showBossHpBar(name, hp, maxHp) {
        const bar = document.getElementById('boss-bar-container');
        const nameEl = document.getElementById('boss-name');
        const fillEl = document.getElementById('boss-fill');

        if (bar) bar.style.display = 'block';
        if (nameEl) nameEl.textContent = name;
        if (fillEl) fillEl.style.width = `${(hp / maxHp) * 100}%`;
    }

    updateBossHpBar(hp, maxHp) {
        const fillEl = document.getElementById('boss-fill');
        if (fillEl) fillEl.style.width = `${Math.max(0, (hp / maxHp) * 100)}%`;
    }

    hideBossHpBar() {
        const bar = document.getElementById('boss-bar-container');
        if (bar) bar.style.display = 'none';
    }

    showCustomDialogue(speaker, msg, quizConfig = null) {
        const portrait = document.getElementById('dialogue-portrait');
        const text = document.getElementById('dialogue-text');
        const box = document.getElementById('dialogue-box');

        if (!text || !box) return;
        box.style.display = 'flex';

        if (speaker === 'shopkeeper') {
            portrait.innerHTML = GameAssets.shopkeeperPortrait;
        } else if (speaker === 'wizard') {
            portrait.innerHTML = GameAssets.wizardPortrait;
        } else {
            portrait.innerHTML = GameAssets.heroPortrait;
        }

        if (quizConfig) {
            text.innerHTML = `
                <div class="dialogue-msg-content">${msg}</div>
                <div class="dialogue-action-row">
                    <button type="button" class="dialogue-quiz-btn" id="dialogue-quiz-btn">
                        <span>🎓 Ambil Tantangan Soal (+Hadiah)</span>
                    </button>
                </div>
            `;
            const quizBtn = document.getElementById('dialogue-quiz-btn');
            if (quizBtn) {
                quizBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    box.style.display = 'none';
                    if (window.EduQuiz) {
                        window.EduQuiz.openQuiz(quizConfig);
                    }
                });
            }
        } else {
            text.textContent = msg;
        }

        Audio.playDialogueBlip();
    }

    updateSkillCooldowns() {
        if (!window.game || !window.game.combat) return;
        const c = window.game.combat;
        const charClass = (this.player && this.player.characterClass) || 'knight';

        const wBtn = document.getElementById('skill-whirlwind-btn');
        const dBtn = document.getElementById('skill-dash-btn');
        const pBtn = document.getElementById('potion-btn');
        const atkBtn = document.getElementById('attack-btn');

        // Dynamic Skill Icons based on Class
        const classSkillIcons = {
            knight:   { s1: '🌀', s2: '🛡️', t1: 'Putaran Pedang Badai [Q]', t2: 'Serbuan Perisai Ksatria [Shift]' },
            pyro:     { s1: '🔥', s2: '⚡', t1: 'Ledakan Inferno Nova [Q]', t2: 'Kilat Api Flame Blink [Shift]' },
            ranger:   { s1: '🏹', s2: '🍃', t1: 'Hujan 5 Panah Kipas [Q]', t2: 'Langkah Badai Gale Step [Shift]' },
            paladin:  { s1: '✨', s2: '🌟', t1: 'Hantaman Bintang (+Heal) [Q]', t2: 'Pelindung Cahaya Bintang [Shift]' },
            assassin: { s1: '🥷', s2: '💨', t1: 'Hujan Shuriken 360 Derajat [Q]', t2: 'Menghilang Bayangan [Shift]' },
            valkyrie: { s1: '❄️', s2: '💥', t1: 'Hentakan Gempa Es [Q]', t2: 'Terjangan Pembekuan [Shift]' }
        };

        const currentIcons = classSkillIcons[charClass] || classSkillIcons.knight;

        if (wBtn) {
            wBtn.title = currentIcons.t1;
            wBtn.innerHTML = c.skill1Cd > 0 ? `<span class="cd-timer">${Math.ceil(c.skill1Cd)}s</span>` : currentIcons.s1;
        }
        if (dBtn) {
            dBtn.title = currentIcons.t2;
            dBtn.innerHTML = c.skill2Cd > 0 ? `<span class="cd-timer">${Math.ceil(c.skill2Cd)}s</span>` : currentIcons.s2;
        }
        if (pBtn) {
            pBtn.innerHTML = c.potionCd > 0 ? `<span class="cd-timer">${Math.ceil(c.potionCd)}s</span>` : '🧪';
        }

        // Weapon-specific attack button icon & tooltip
        if (atkBtn && this.player) {
            const weaponIcons = {
                woodenSword: '⚔️',
                ironSword: '⚔️',
                starSword: '⭐',
                shortbow: '🏹',
                magicStaff: '🔮',
                ironAxe: '🪓'
            };
            const currentWeapon = this.player.equippedWeapon || 'woodenSword';
            const icon = weaponIcons[currentWeapon] || '⚔️';
            if (atkBtn.getAttribute('data-weapon') !== currentWeapon) {
                atkBtn.setAttribute('data-weapon', currentWeapon);
                atkBtn.textContent = icon;
                const tooltips = {
                    shortbow: 'Tembak Panah Busur (Klik Kiri / F)',
                    magicStaff: 'Tembakkan Bola Sihir Arcane (Klik Kiri / F)',
                    ironAxe: 'Hentakan Kapak Berat (Klik Kiri / F)',
                    starSword: 'Tebasan Pedang Bintang (Klik Kiri / F)',
                    ironSword: 'Tebasan Pedang Besi (Klik Kiri / F)',
                    woodenSword: 'Tebasan Pedang Kayu (Klik Kiri / F)'
                };
                atkBtn.title = tooltips[currentWeapon] || 'Serang (Klik Kiri / F)';
            }
        }
    }

    updateCompass(playerPos, currentZone, world) {
        if (!window.QuestSys) return;
        const info = window.QuestSys.calculateCompassAngle(playerPos, currentZone, world);
        const arrow = document.getElementById('quest-compass-arrow');
        const distEl = document.getElementById('quest-compass-dist');

        if (arrow && info) {
            arrow.style.transform = `rotate(${info.angle}deg)`;
        }
        if (distEl && info) {
            distEl.textContent = `${info.dist}m`;
        }
    }

    updateStats() {
        const hpFill = document.getElementById('hp-fill');
        const hpText = document.getElementById('hp-text');
        const expFill = document.getElementById('exp-fill');
        const levelText = document.getElementById('player-level');
        const goldText = document.getElementById('gold-counter');
        const quizText = document.getElementById('quiz-score-counter');
        const atkText = document.getElementById('stat-atk');
        const critText = document.getElementById('stat-crit');

        if (hpFill) hpFill.style.width = `${(this.player.hp / this.player.maxHp) * 100}%`;
        if (hpText) hpText.textContent = `${this.player.hp}/${this.player.maxHp}`;
        if (expFill) expFill.style.width = `${(this.player.exp / this.player.maxExp) * 100}%`;
        if (levelText) levelText.textContent = `Lv. ${this.player.level}`;
        if (goldText) goldText.textContent = `${this.player.gold}`;
        if (quizText) quizText.textContent = `${this.player.quizScore || 0}`;
        if (atkText) atkText.textContent = `⚔️ ATK: ${this.player.getAttackPower()}`;
        if (critText) critText.textContent = `💥 CRIT: ${Math.round((this.player.critRate + this.player.weaponBonusCrit) * 100)}%`;
    }

    showToast(msg, duration = 3500) {
        let toast = document.getElementById('rpg-toast-banner');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'rpg-toast-banner';
            toast.className = 'rpg-toast-banner';
            document.body.appendChild(toast);
        }

        toast.textContent = msg;
        toast.classList.add('show');

        if (this._toastTimer) clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}
