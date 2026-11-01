// Enhanced Action RPG Combat System:
// Weapon-Specific Attacks (Swords, Bows, Magic Staffs, Axes)
// Character-Specific Skills [Q] & [Shift] (Knight, Pyro, Ranger, Paladin, Shinobi, Valkyrie)
// Advanced Enemy AI & Epic Crimson Dragon Boss with Real Fire Breath (Semburan Api) & Meteor Rain

class CombatSystem {
    constructor(scene, camera, player, world) {
        this.scene = scene;
        this.camera = camera;
        this.player = player;
        this.world = world;

        this.floatingTexts = [];
        this.lootDrops = [];
        this.projectiles = [];
        this.dragonFlames = [];
        this.dragonMeteors = [];
        this.groundEmbers = [];

        this.slashMesh = null;
        this.whirlwindMesh = null;

        this.isAttacking = false;
        this.attackCooldown = 0;

        // Skill Cooldowns (in seconds)
        this.skill1Cd = 0;
        this.skill1MaxCd = 4.0;
        this.skill2Cd = 0;
        this.skill2MaxCd = 2.5;
        this.potionCd = 0;
        this.potionMaxCd = 5.0;

        // Burning damage cooldown for player
        this.playerBurnCooldown = 0;

        this.initEffects();
    }

    // Cooldown getters for backward compatibility with UI
    get whirlwindCd() { return this.skill1Cd; }
    set whirlwindCd(v) { this.skill1Cd = v; }
    get dashCd() { return this.skill2Cd; }
    set dashCd(v) { this.skill2Cd = v; }

    initEffects() {
        // 1. Melee Slash Arc
        const slashGeo = new THREE.RingGeometry(0.8, 1.8, 16, 1, 0, Math.PI * 0.75);
        const slashMat = new THREE.MeshBasicMaterial({
            color: 0x70d6ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });
        this.slashMesh = new THREE.Mesh(slashGeo, slashMat);
        this.slashMesh.rotation.x = Math.PI / 2;
        this.slashMesh.position.y = 1.0;
        this.scene.add(this.slashMesh);

        // 2. 360-degree Whirlwind Spin Ring
        const spinGeo = new THREE.RingGeometry(1.0, 3.8, 24);
        const spinMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });
        this.whirlwindMesh = new THREE.Mesh(spinGeo, spinMat);
        this.whirlwindMesh.rotation.x = Math.PI / 2;
        this.whirlwindMesh.position.y = 1.0;
        this.scene.add(this.whirlwindMesh);
    }

    // =========================================================================
    // 1. WEAPON-SPECIFIC ATTACK SYSTEM (Tebas Pedang, Panah Terbang, Bola Sihir, Kapak Hentak)
    // =========================================================================
    triggerAttack() {
        if (this.isAttacking || this.attackCooldown > 0) return;
        if (window.gamePaused) return;

        const weapon = this.player.equippedWeapon || 'woodenSword';

        if (weapon === 'shortbow') {
            this.executeBowAttack();
        } else if (weapon === 'magicStaff') {
            this.executeMagicAttack();
        } else if (weapon === 'ironAxe') {
            this.executeAxeAttack();
        } else {
            // Swords (woodenSword, ironSword, starSword)
            this.executeSwordAttack();
        }
    }

    // A. SWORD MELEE COMBO ATTACK
    executeSwordAttack() {
        this.isAttacking = true;

        const now = performance.now();
        if (now - this.player.lastAttackTime < 850) {
            this.player.comboStep = (this.player.comboStep + 1) % 3;
        } else {
            this.player.comboStep = 0;
        }
        this.player.lastAttackTime = now;

        const combo = this.player.comboStep;
        this.attackCooldown = combo === 2 ? 0.45 : 0.28;

        const pPos = this.player.mesh.position;
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);

        if (combo === 0) {
            Audio.playSlash();
            this.slashMesh.position.set(pPos.x + forward.x * 0.9, 1.2, pPos.z + forward.z * 0.9);
            this.slashMesh.rotation.y = this.player.mesh.rotation.y - Math.PI / 4;
            this.slashMesh.material.color.setHex(this.player.equippedWeapon === 'starSword' ? 0xf72585 : 0x70d6ff);
            this.slashMesh.material.opacity = 0.9;
            this.animateSwing(220, -Math.PI * 0.6, Math.PI * 0.35, 1.0, 3.0);
        } else if (combo === 1) {
            Audio.playSlash();
            this.slashMesh.position.set(pPos.x + forward.x * 1.0, 1.3, pPos.z + forward.z * 1.0);
            this.slashMesh.rotation.y = this.player.mesh.rotation.y + Math.PI / 4;
            this.slashMesh.material.color.setHex(0xfacc15);
            this.slashMesh.material.opacity = 0.95;
            this.animateSwing(220, Math.PI * 0.55, -Math.PI * 0.4, 1.25, 3.2);
        } else {
            Audio.playHeavySlam();
            this.slashMesh.position.set(pPos.x + forward.x * 1.2, 0.4, pPos.z + forward.z * 1.2);
            this.slashMesh.rotation.y = this.player.mesh.rotation.y;
            this.slashMesh.material.color.setHex(this.player.equippedWeapon === 'starSword' ? 0xf43f5e : 0xef4444);
            this.slashMesh.material.opacity = 1.0;

            const startY = this.player.bodyRoot.position.y;
            const startTime = performance.now();
            const duration = 380;

            const animateLeapSlam = () => {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1.0);

                if (progress < 0.5) {
                    const t = progress / 0.5;
                    this.player.bodyRoot.position.y = startY + Math.sin(t * Math.PI) * 0.6;
                    this.player.rightArmGroup.rotation.x = -Math.PI * 0.9;
                } else {
                    const t = (progress - 0.5) / 0.5;
                    this.player.bodyRoot.position.y = startY + (1 - t) * 0.6;
                    this.player.rightArmGroup.rotation.x = -Math.PI * 0.9 * (1 - t);
                }

                this.slashMesh.material.opacity = Math.max(0, 1.0 * (1 - progress));

                if (progress < 1.0) {
                    requestAnimationFrame(animateLeapSlam);
                } else {
                    this.player.bodyRoot.position.y = startY;
                    this.player.rightArmGroup.rotation.x = 0;
                    this.isAttacking = false;
                }
            };
            animateLeapSlam();
            this.checkHit(4.0, 2.5, true);
        }
    }

    animateSwing(duration, targetRotX, targetRotZ, multiplier, range) {
        const startTime = performance.now();
        const animate = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / duration, 1.0);

            if (progress < 0.5) {
                const t = progress / 0.5;
                this.player.rightArmGroup.rotation.x = targetRotX * t;
                this.player.rightArmGroup.rotation.z = targetRotZ * t;
            } else {
                const t = (progress - 0.5) / 0.5;
                this.player.rightArmGroup.rotation.x = targetRotX * (1 - t);
                this.player.rightArmGroup.rotation.z = targetRotZ * (1 - t);
            }

            this.slashMesh.material.opacity = Math.max(0, 0.9 * (1 - progress));

            if (progress < 1.0) {
                requestAnimationFrame(animate);
            } else {
                this.player.rightArmGroup.rotation.x = 0;
                this.player.rightArmGroup.rotation.z = 0;
                this.isAttacking = false;
            }
        };
        animate();
        this.checkHit(range, multiplier);
    }

    // B. SHORTBOW: REAL 3D FLYING ARROW PROJECTILE
    executeBowAttack() {
        this.isAttacking = true;
        this.attackCooldown = 0.32;

        Audio.playBowShot();

        // Hero arm draw animation
        this.player.rightArmGroup.rotation.x = -Math.PI * 0.45;
        this.player.leftArmGroup.rotation.x = -Math.PI * 0.45;
        setTimeout(() => {
            this.player.rightArmGroup.rotation.x = 0;
            this.player.leftArmGroup.rotation.x = 0;
            this.isAttacking = false;
        }, 180);

        const pPos = this.player.mesh.position;
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);

        this.spawnArrow(
            new THREE.Vector3(pPos.x + forward.x * 0.8, 1.25, pPos.z + forward.z * 0.8),
            forward.clone().multiplyScalar(28.0),
            1.15
        );
    }

    spawnArrow(origin, velocity, multiplier = 1.0) {
        const arrowGroup = new THREE.Group();

        // Arrow Shaft
        const shaft = new THREE.Mesh(
            new THREE.CylinderGeometry(0.025, 0.025, 0.85, 6),
            new THREE.MeshLambertMaterial({ color: 0x854d0e })
        );
        shaft.rotation.x = Math.PI / 2;
        arrowGroup.add(shaft);

        // Arrow Head
        const head = new THREE.Mesh(
            new THREE.ConeGeometry(0.08, 0.22, 5),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 })
        );
        head.rotation.x = Math.PI / 2;
        head.position.z = 0.45;
        arrowGroup.add(head);

        // Arrow Fletching Feathers
        const feather = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.02, 0.2),
            new THREE.MeshBasicMaterial({ color: 0x22c55e })
        );
        feather.position.z = -0.35;
        arrowGroup.add(feather);

        arrowGroup.position.copy(origin);
        arrowGroup.lookAt(origin.clone().add(velocity));
        this.scene.add(arrowGroup);

        this.projectiles.push({
            group: arrowGroup,
            velocity,
            type: 'arrow',
            multiplier,
            lifetime: 0,
            maxLife: 1.3
        });
    }

    // C. MAGIC STAFF: GLOWING 3D ARCANE / FIREBALL PROJECTILE
    executeMagicAttack() {
        this.isAttacking = true;
        this.attackCooldown = 0.38;

        Audio.playMagicCast();

        // Staff cast elevation animation
        this.player.rightArmGroup.rotation.x = -Math.PI * 0.7;
        setTimeout(() => {
            this.player.rightArmGroup.rotation.x = 0;
            this.isAttacking = false;
        }, 220);

        const pPos = this.player.mesh.position;
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);

        this.spawnMagicOrb(
            new THREE.Vector3(pPos.x + forward.x * 0.9, 1.3, pPos.z + forward.z * 0.9),
            forward.clone().multiplyScalar(20.0),
            1.35
        );
    }

    spawnMagicOrb(origin, velocity, multiplier = 1.35) {
        const orbGroup = new THREE.Group();

        // Core Glowing Orb
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), coreMat);
        orbGroup.add(core);

        // Outer Aura
        const auraMat = new THREE.MeshBasicMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const aura = new THREE.Mesh(new THREE.SphereGeometry(0.38, 8, 8), auraMat);
        orbGroup.add(aura);

        orbGroup.position.copy(origin);
        this.scene.add(orbGroup);

        this.projectiles.push({
            group: orbGroup,
            velocity,
            type: 'magic_orb',
            multiplier,
            lifetime: 0,
            maxLife: 1.5
        });
    }

    // D. BATTLE AXE: HEAVY VERTICAL CHOP & GROUND SHOCKWAVE
    executeAxeAttack() {
        this.isAttacking = true;
        this.attackCooldown = 0.48;

        Audio.playHeavySlam();

        const pPos = this.player.mesh.position;
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);

        // Heavy vertical chop animation
        this.player.rightArmGroup.rotation.x = -Math.PI * 0.85;
        setTimeout(() => {
            this.player.rightArmGroup.rotation.x = Math.PI * 0.35;
            // Ground Shockwave
            this.slashMesh.position.set(pPos.x + forward.x * 1.5, 0.2, pPos.z + forward.z * 1.5);
            this.slashMesh.rotation.y = this.player.mesh.rotation.y;
            this.slashMesh.material.color.setHex(0xf59e0b);
            this.slashMesh.material.opacity = 1.0;

            setTimeout(() => {
                this.slashMesh.material.opacity = 0;
                this.player.rightArmGroup.rotation.x = 0;
                this.isAttacking = false;
            }, 180);
        }, 180);

        this.checkHit(3.8, 1.8, false);
    }

    // =========================================================================
    // 2. CHARACTER-SPECIFIC UNIQUE JURUS / SKILLS [Q] & [Shift]
    // =========================================================================
    triggerSkill1() {
        if (this.skill1Cd > 0) return;
        if (window.gamePaused) return;

        const charClass = this.player.characterClass || 'knight';
        this.skill1Cd = this.skill1MaxCd;

        if (charClass === 'pyro') {
            this.skillInfernoNova();
        } else if (charClass === 'ranger') {
            this.skillArrowVolley();
        } else if (charClass === 'paladin') {
            this.skillStarSmite();
        } else if (charClass === 'assassin') {
            this.skillShurikenStorm();
        } else if (charClass === 'valkyrie') {
            this.skillGlacialShatter();
        } else {
            // Knight: Classic Whirlwind
            this.skillWhirlwind();
        }

        if (window.UI) window.UI.updateSkillCooldowns();
    }

    triggerWhirlwind() {
        this.triggerSkill1();
    }

    // Knight Skill 1: Whirlwind Slash
    skillWhirlwind() {
        Audio.playSlash();
        const pPos = this.player.mesh.position;
        this.whirlwindMesh.position.set(pPos.x, 1.1, pPos.z);
        this.whirlwindMesh.material.color.setHex(0x38bdf8);
        this.whirlwindMesh.material.opacity = 0.95;

        const startTime = performance.now();
        const animateSpin = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / 420, 1.0);

            this.player.mesh.rotation.y += 0.45;
            this.whirlwindMesh.rotation.z += 0.55;
            this.whirlwindMesh.material.opacity = Math.max(0, 0.95 * (1 - progress));

            if (progress < 1.0) requestAnimationFrame(animateSpin);
        };
        animateSpin();

        this.checkHit(4.6, 2.0, true);
    }

    // Pyro Skill 1: Inferno Nova Blast
    skillInfernoNova() {
        Audio.playFireExplosion();
        const pPos = this.player.mesh.position;

        this.whirlwindMesh.position.set(pPos.x, 0.3, pPos.z);
        this.whirlwindMesh.material.color.setHex(0xff3b00);
        this.whirlwindMesh.material.opacity = 1.0;

        const startTime = performance.now();
        const animateNova = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / 450, 1.0);
            this.whirlwindMesh.scale.set(1 + progress * 1.5, 1 + progress * 1.5, 1);
            this.whirlwindMesh.material.opacity = Math.max(0, 1.0 * (1 - progress));
            if (progress < 1.0) requestAnimationFrame(animateNova);
            else this.whirlwindMesh.scale.set(1, 1, 1);
        };
        animateNova();

        this.checkHit(6.0, 2.6, true);
    }

    // Ranger Skill 1: 5-Arrow Fan Volley
    skillArrowVolley() {
        Audio.playBowShot();
        const pPos = this.player.mesh.position;
        const baseRotY = this.player.mesh.rotation.y;

        [-0.35, -0.18, 0, 0.18, 0.35].forEach(offsetAngle => {
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), baseRotY + offsetAngle);
            this.spawnArrow(
                new THREE.Vector3(pPos.x + forward.x * 0.8, 1.25, pPos.z + forward.z * 0.8),
                forward.clone().multiplyScalar(28.0),
                1.1
            );
        });
    }

    // Paladin Skill 1: Celestial Star Smite (+Heal)
    skillStarSmite() {
        Audio.playPurchase();
        const pPos = this.player.mesh.position;
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);

        // Radiant pillar of star light from sky
        const pillarGeo = new THREE.CylinderGeometry(1.6, 1.6, 20, 16);
        const pillarMat = new THREE.MeshBasicMaterial({
            color: 0xfacc15,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        const impactPos = pPos.clone().add(forward.clone().multiplyScalar(3.5));
        pillar.position.set(impactPos.x, 10, impactPos.z);
        this.scene.add(pillar);

        setTimeout(() => {
            let fade = 0.8;
            const fadeInterval = setInterval(() => {
                fade -= 0.1;
                pillar.material.opacity = fade;
                if (fade <= 0) {
                    clearInterval(fadeInterval);
                    this.scene.remove(pillar);
                }
            }, 30);
        }, 150);

        // Heal Paladin +35 HP
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + 35);
        this.createDamagePopup(pPos, '+35 HOLY HEAL', false, '#facc15');

        this.checkHit(5.5, 2.8, true);
    }

    // Assassin Skill 1: Radial 360 Shuriken Burst
    skillShurikenStorm() {
        Audio.playSlash();
        const pPos = this.player.mesh.position;

        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const forward = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));

            const shuriken = new THREE.Mesh(
                new THREE.BoxGeometry(0.35, 0.04, 0.35),
                new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9 })
            );
            shuriken.position.set(pPos.x, 1.1, pPos.z);
            this.scene.add(shuriken);

            this.projectiles.push({
                group: shuriken,
                velocity: forward.multiplyScalar(22.0),
                type: 'shuriken',
                multiplier: 1.4,
                lifetime: 0,
                maxLife: 0.9
            });
        }
    }

    // Valkyrie Skill 1: Glacial Earth Shatter
    skillGlacialShatter() {
        Audio.playHeavySlam();
        const pPos = this.player.mesh.position;
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);

        this.slashMesh.position.set(pPos.x + forward.x * 2.0, 0.2, pPos.z + forward.z * 2.0);
        this.slashMesh.rotation.y = this.player.mesh.rotation.y;
        this.slashMesh.material.color.setHex(0x06b6d4);
        this.slashMesh.material.opacity = 1.0;

        setTimeout(() => {
            this.slashMesh.material.opacity = 0;
        }, 300);

        this.checkHit(6.2, 3.2, true);
    }

    // SKILL 2 [Shift]: Class-Specific Dashes & Escapes
    triggerSkill2() {
        if (this.skill2Cd > 0) return;
        if (window.gamePaused) return;

        this.skill2Cd = this.skill2MaxCd;
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);

        Audio.playSlash();

        const dashDist = 6.5;
        const startX = this.player.mesh.position.x;
        const startZ = this.player.mesh.position.z;
        const targetX = startX + forward.x * dashDist;
        const targetZ = startZ + forward.z * dashDist;

        let step = 0;
        const dashInterval = setInterval(() => {
            step++;
            this.player.mesh.position.x = THREE.MathUtils.lerp(startX, targetX, step / 10);
            this.player.mesh.position.z = THREE.MathUtils.lerp(startZ, targetZ, step / 10);
            if (step >= 10) clearInterval(dashInterval);
        }, 16);

        if (window.UI) window.UI.updateSkillCooldowns();
    }

    triggerDash() {
        this.triggerSkill2();
    }

    // Potion Heal [H]
    usePotion() {
        if (this.potionCd > 0) return;
        if (window.gamePaused) return;

        this.potionCd = this.potionMaxCd;
        Audio.playPurchase();

        this.player.hp = Math.min(this.player.maxHp, this.player.hp + 60);
        this.createDamagePopup(this.player.mesh.position, '+60 HP HEAL', false, '#22c55e');

        if (window.UI) {
            window.UI.updateStats();
            window.UI.updateSkillCooldowns();
        }
    }

    // =========================================================================
    // 3. HIT DETECTION & DAMAGE CALCULATIONS
    // =========================================================================
    checkHit(range = 2.8, multiplier = 1.0, is360 = false) {
        const pPos = this.player.mesh.position;

        this.world.enemies.forEach(enemy => {
            if (!enemy.alive) return;

            const dist = pPos.distanceTo(enemy.group.position);
            if (dist <= range) {
                if (is360) {
                    this.applyDamageToEnemy(enemy, multiplier);
                } else {
                    const toEnemy = enemy.group.position.clone().sub(pPos).normalize();
                    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.mesh.rotation.y);
                    const dot = toEnemy.dot(forward);

                    if (dot > -0.2) {
                        this.applyDamageToEnemy(enemy, multiplier);
                    }
                }
            }
        });
    }

    applyDamageToEnemy(enemy, multiplier = 1.0) {
        const isCrit = Math.random() < this.player.critRate;
        let damage = Math.round(this.player.getAttackPower() * multiplier * (0.9 + Math.random() * 0.3));

        if (isCrit) {
            damage = Math.round(damage * 2.2);
            Audio.playCrit();
            this.createDamagePopup(enemy.group.position, damage, true);
        } else {
            Audio.playHit();
            this.createDamagePopup(enemy.group.position, damage, false);
        }

        enemy.hp -= damage;

        // Boss HP Bar update
        if (enemy.type === 'dragon_boss' && window.UI) {
            window.UI.updateBossHpBar(enemy.hp, enemy.maxHp);
        }

        // Hit flash
        if (enemy.body && enemy.body.material) {
            const orig = enemy.body.material.color.getHex();
            enemy.body.material.color.setHex(0xff2222);
            setTimeout(() => { if (enemy.alive && enemy.body) enemy.body.material.color.setHex(orig); }, 150);
        }

        if (enemy.hp <= 0) {
            this.killEnemy(enemy);
        }
    }

    createDamagePopup(pos, text, isCrit = false, customColor = null) {
        const div = document.createElement('div');
        div.className = `damage-popup ${isCrit ? 'crit' : ''}`;
        if (customColor) div.style.color = customColor;

        div.textContent = typeof text === 'number' ? (isCrit ? `💥 CRIT! -${text}` : `-${text}`) : text;
        const container = document.getElementById('floating-ui-container');
        if (container) container.appendChild(div);

        this.floatingTexts.push({
            element: div,
            pos3D: pos.clone().add(new THREE.Vector3(0, 1.4, 0)),
            lifetime: 0,
            maxLife: 1.1,
            velY: 1.4
        });
    }

    killEnemy(enemy) {
        enemy.alive = false;
        enemy.hp = 0;

        const pos = enemy.group.position.clone();
        enemy.group.scale.set(0.001, 0.001, 0.001);

        // Spawn Loot Drop
        this.spawnLoot(pos, enemy.goldDrop || 40, enemy.expDrop || 30);

        // Notify Quest Manager
        if (window.QuestSys) {
            window.QuestSys.onEnemyKilled(enemy.type);
        }

        // Hide Boss Bar if Dragon defeated
        if (enemy.type === 'dragon_boss' && window.UI) {
            window.UI.hideBossHpBar();
            window.UI.showCustomDialogue('hero', '🏆 NAGA MERAH PURBA TELAH DIKALAHKAN! Dunia Eldoria diselamatkan!');
            Audio.playQuestComplete();
        }

        // Respawn normal monsters after 9s (Boss does not respawn)
        if (enemy.type !== 'dragon_boss') {
            setTimeout(() => {
                enemy.alive = true;
                enemy.hp = enemy.maxHp;
                enemy.group.position.set(enemy.homeX, 0, enemy.homeZ);
                enemy.group.scale.set(enemy.scale || 1, enemy.scale || 1, enemy.scale || 1);
            }, 9000);
        }
    }

    spawnLoot(pos, gold, exp) {
        const coinMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.24, 0.24, 0.07, 10),
            ModelFactory.materials.gold
        );
        coinMesh.position.set(pos.x, 0.5, pos.z);
        coinMesh.rotation.x = Math.PI / 2;
        this.scene.add(coinMesh);

        this.lootDrops.push({
            mesh: coinMesh,
            gold,
            exp,
            time: 0
        });
    }

    // =========================================================================
    // 4. ADVANCED ENEMY AI & DRAGON BOSS COMBAT MECHANICS
    // =========================================================================
    updateEnemyAI(delta, playerPos) {
        this.world.enemies.forEach(enemy => {
            if (!enemy.alive) return;

            const dist = playerPos.distanceTo(enemy.group.position);

            // SPECIAL: DRAGON BOSS COMPLEX MECHANICS
            if (enemy.type === 'dragon_boss') {
                this.updateDragonBossAI(enemy, delta, playerPos, dist);
                return;
            }

            // NORMAL ENEMY: SLIMES & GOLEMS
            const aggroRange = 12.0;
            const attackRange = enemy.type === 'golem' ? 2.4 : 1.8;

            if (dist <= aggroRange && dist > attackRange) {
                // Aggressive chase towards player
                const dir = playerPos.clone().sub(enemy.group.position).normalize();
                const speed = enemy.speed || 3.2;
                enemy.group.position.x += dir.x * speed * delta;
                enemy.group.position.z += dir.z * speed * delta;
                enemy.group.rotation.y = Math.atan2(dir.x, dir.z);

                // Slime hopping lunge
                if (enemy.type === 'green' || enemy.type === 'blue' || enemy.type === 'gold') {
                    if (!enemy.hopTimer) enemy.hopTimer = 0;
                    enemy.hopTimer += delta * 6;
                    enemy.group.position.y = Math.abs(Math.sin(enemy.hopTimer)) * 0.7;
                }
            } else if (dist <= attackRange) {
                if (!enemy.attackCd) enemy.attackCd = 0;
                enemy.attackCd -= delta;

                if (enemy.attackCd <= 0) {
                    enemy.attackCd = enemy.type === 'golem' ? 2.0 : 1.2;
                    this.monsterAttackPlayer(enemy);
                }
            }
        });
    }

    // DRAGON BOSS BEHAVIOR: Melee, Fire Breath, & Meteor Rain
    updateDragonBossAI(dragon, delta, playerPos, dist) {
        if (!dragon.fireTimer) dragon.fireTimer = 3.0; // Initial breath warmup
        if (!dragon.meteorTimer) dragon.meteorTimer = 8.0;

        dragon.fireTimer -= delta;

        // Face player smoothly
        const toPlayer = playerPos.clone().sub(dragon.group.position);
        toPlayer.y = 0;
        const targetRotY = Math.atan2(toPlayer.x, toPlayer.z);
        dragon.group.rotation.y = THREE.MathUtils.lerp(dragon.group.rotation.y, targetRotY, 4 * delta);

        // 1. FIRE BREATH ATTACK (Every 7 seconds)
        if (dragon.fireTimer <= 0 && !dragon.isBreathingFire) {
            this.triggerDragonFireBreath(dragon, playerPos);
            dragon.fireTimer = 7.5 + Math.random() * 2.0;
        }

        // 2. METEOR RAIN ATTACK (When HP < 60% Enraged)
        if (dragon.hp < dragon.maxHp * 0.6) {
            dragon.meteorTimer -= delta;
            if (dragon.meteorTimer <= 0) {
                this.triggerDragonMeteors(dragon, playerPos);
                dragon.meteorTimer = 8.0;
            }
        }

        // 3. MELEE ATTACK (Claw swipe / Tail whip if close)
        if (dist <= 4.8 && !dragon.isBreathingFire) {
            if (!dragon.attackCd) dragon.attackCd = 0;
            dragon.attackCd -= delta;
            if (dragon.attackCd <= 0) {
                dragon.attackCd = 2.2;
                this.monsterAttackPlayer(dragon);
            }
        } else if (dist > 4.8 && dist < 22.0 && !dragon.isBreathingFire) {
            // Slowly stalk towards player
            const dir = toPlayer.normalize();
            dragon.group.position.x += dir.x * (dragon.speed || 3.0) * delta;
            dragon.group.position.z += dir.z * (dragon.speed || 3.0) * delta;
        }
    }

    // TRIGGER TORRENTIAL FIRE BREATH STREAM (SEMBURAN API NAGA)
    triggerDragonFireBreath(dragon, playerPos) {
        dragon.isBreathingFire = true;

        // Roar & charge throat
        Audio.playDragonRoar();
        if (dragon.throatFireMat) dragon.throatFireMat.opacity = 1.0;
        if (dragon.jaw) dragon.jaw.rotation.x = 0.35; // Open jaw wide

        setTimeout(() => {
            if (!dragon.alive) return;
            Audio.playFireBreath();

            let breathTicks = 0;
            const maxTicks = 22; // 2.2 seconds of continuous streaming fire!

            const streamInterval = setInterval(() => {
                if (!dragon.alive || !dragon.isBreathingFire) {
                    clearInterval(streamInterval);
                    return;
                }

                breathTicks++;

                // Spawn 3 blazing fire particles per tick
                const mouthPos = dragon.fireSocket ? dragon.fireSocket.getWorldPosition(new THREE.Vector3()) : dragon.group.position.clone().add(new THREE.Vector3(0, 3.5, 2.5));
                const dragonForward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), dragon.group.rotation.y);

                for (let k = 0; k < 3; k++) {
                    const spread = (Math.random() - 0.5) * 0.28;
                    const spreadVel = dragonForward.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), spread).multiplyScalar(16.0 + Math.random() * 6.0);
                    this.spawnFlameParticle(mouthPos, spreadVel);
                }

                // Check flame cone damage against player
                const toPlayer = this.player.mesh.position.clone().sub(mouthPos);
                const pDist = toPlayer.length();
                toPlayer.normalize();

                const dot = dragonForward.dot(toPlayer);
                if (pDist < 16.0 && dot > 0.65) {
                    // Player caught directly in flame cone!
                    const burnDmg = 16;
                    this.player.hp = Math.max(0, this.player.hp - burnDmg);
                    Audio.playHit();
                    this.createDamagePopup(this.player.mesh.position, `🔥 -${burnDmg}`, false, '#f97316');
                    if (window.UI) window.UI.updateStats();
                    if (this.player.hp <= 0) this.handlePlayerDeath();
                }

                if (breathTicks >= maxTicks) {
                    clearInterval(streamInterval);
                    dragon.isBreathingFire = false;
                    if (dragon.throatFireMat) dragon.throatFireMat.opacity = 0;
                    if (dragon.jaw) dragon.jaw.rotation.x = 0; // Close jaw
                }
            }, 100);
        }, 550);
    }

    spawnFlameParticle(origin, velocity) {
        const fireMat = new THREE.MeshBasicMaterial({
            color: Math.random() < 0.6 ? 0xff4500 : 0xfacc15,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });
        const fireMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35 + Math.random() * 0.25, 6, 6), fireMat);
        fireMesh.position.copy(origin);
        this.scene.add(fireMesh);

        this.dragonFlames.push({
            mesh: fireMesh,
            velocity,
            life: 0,
            maxLife: 0.9
        });
    }

    // TRIGGER METEOR BARRAGE FROM SKY
    triggerDragonMeteors(dragon, playerPos) {
        Audio.playDragonRoar();

        // 3 meteor impact zones around player
        const offsets = [[0, 0], [4, 3], [-4, -2]];
        offsets.forEach(off => {
            const groundPos = new THREE.Vector3(playerPos.x + off[0], 0.1, playerPos.z + off[1]);

            // Red Warning Target Ring on Ground
            const ringGeo = new THREE.RingGeometry(0.8, 3.2, 20);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xef4444,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.75
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = -Math.PI / 2;
            ringMesh.position.copy(groundPos);
            this.scene.add(ringMesh);

            setTimeout(() => {
                this.scene.remove(ringMesh);

                // Crashing Meteor Rock
                const rockGeo = new THREE.DodecahedronGeometry(0.9, 1);
                const rockMat = new THREE.MeshStandardMaterial({
                    color: 0x7f1d1d,
                    emissive: 0xff4500,
                    emissiveIntensity: 0.8
                });
                const rockMesh = new THREE.Mesh(rockGeo, rockMat);
                rockMesh.position.set(groundPos.x, 16, groundPos.z);
                this.scene.add(rockMesh);

                Audio.playFireExplosion();

                // Drop down fast
                let y = 16;
                const dropInterval = setInterval(() => {
                    y -= 1.8;
                    rockMesh.position.y = y;
                    rockMesh.rotation.x += 0.2;

                    if (y <= 0.6) {
                        clearInterval(dropInterval);
                        this.scene.remove(rockMesh);

                        // Explosion impact shockwave
                        Audio.playFireExplosion();
                        const distToP = this.player.mesh.position.distanceTo(groundPos);
                        if (distToP < 3.8) {
                            const dmg = 42;
                            this.player.hp = Math.max(0, this.player.hp - dmg);
                            this.createDamagePopup(this.player.mesh.position, `💥 METEOR! -${dmg}`, true, '#ef4444');
                            if (window.UI) window.UI.updateStats();
                            if (this.player.hp <= 0) this.handlePlayerDeath();
                        }
                    }
                }, 20);
            }, 1200);
        });
    }

    monsterAttackPlayer(enemy) {
        const dmg = enemy.atk || 18;
        this.player.hp = Math.max(0, this.player.hp - dmg);
        Audio.playHit();
        this.createDamagePopup(this.player.mesh.position, `-${dmg}`, false, '#ef4444');

        if (window.UI) window.UI.updateStats();

        // Check Player Death
        if (this.player.hp <= 0) {
            this.handlePlayerDeath();
        }
    }

    handlePlayerDeath() {
        Audio.playHit();
        this.player.hp = this.player.maxHp;
        this.world.changeZone('town');
        if (window.UI) {
            window.UI.updateStats();
            window.UI.showCustomDialogue('hero', '⚔️ Anda gugur dalam pertempuran! Berhasil pulih kembali di Desa Oakhaven.');
        }
    }

    // =========================================================================
    // 5. MAIN LOOP: PROJECTILE FLIGHT, DRAGON FLAMES & LOOT
    // =========================================================================
    update(delta, time) {
        if (window.gamePaused) return;

        if (this.attackCooldown > 0) this.attackCooldown -= delta;
        if (this.skill1Cd > 0) this.skill1Cd -= delta;
        if (this.skill2Cd > 0) this.skill2Cd -= delta;
        if (this.potionCd > 0) this.potionCd -= delta;

        // Enemy AI
        if (this.player) {
            this.updateEnemyAI(delta, this.player.mesh.position);
        }

        // Update Flying Projectiles (Arrows, Magic Orbs, Shurikens)
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.lifetime += delta;
            p.group.position.add(p.velocity.clone().multiplyScalar(delta));

            // Spin shurikens or orbs
            if (p.type === 'shuriken') {
                p.group.rotation.y += 24 * delta;
            } else if (p.type === 'magic_orb') {
                p.group.rotation.x += 12 * delta;
            }

            // Collision check against alive enemies
            let hit = false;
            for (let enemy of this.world.enemies) {
                if (!enemy.alive) continue;
                const dist = p.group.position.distanceTo(enemy.group.position);
                const hitRadius = p.type === 'magic_orb' ? 2.0 : 1.2;

                if (dist <= hitRadius) {
                    hit = true;
                    this.applyDamageToEnemy(enemy, p.multiplier);
                    if (p.type === 'magic_orb') {
                        Audio.playFireExplosion();
                    }
                    break;
                }
            }

            if (hit || p.lifetime >= p.maxLife) {
                this.scene.remove(p.group);
                this.projectiles.splice(i, 1);
            }
        }

        // Update Dragon Fire Breath Particles
        for (let i = this.dragonFlames.length - 1; i >= 0; i--) {
            const f = this.dragonFlames[i];
            f.life += delta;
            f.mesh.position.add(f.velocity.clone().multiplyScalar(delta));
            f.mesh.position.y += 0.8 * delta; // flames rise
            f.mesh.scale.multiplyScalar(1.04);
            f.mesh.material.opacity = Math.max(0, 0.9 * (1 - f.life / f.maxLife));

            if (f.life >= f.maxLife) {
                this.scene.remove(f.mesh);
                this.dragonFlames.splice(i, 1);
            }
        }

        // Update Floating Texts
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const item = this.floatingTexts[i];
            item.lifetime += delta;
            item.pos3D.y += item.velY * delta;

            const screenPos = item.pos3D.clone().project(this.camera);
            const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;

            item.element.style.left = `${x}px`;
            item.element.style.top = `${y}px`;
            item.element.style.opacity = Math.max(0, 1 - (item.lifetime / item.maxLife));

            if (item.lifetime >= item.maxLife) {
                item.element.remove();
                this.floatingTexts.splice(i, 1);
            }
        }

        // Update Loot Magnets
        const pPos = this.player.mesh.position;
        for (let i = this.lootDrops.length - 1; i >= 0; i--) {
            const loot = this.lootDrops[i];
            loot.time += delta;
            loot.mesh.rotation.y += 4 * delta;

            const dist = pPos.distanceTo(loot.mesh.position);
            if (dist < 5.0) {
                const dir = pPos.clone().add(new THREE.Vector3(0, 0.8, 0)).sub(loot.mesh.position).normalize();
                loot.mesh.position.add(dir.multiplyScalar(10.0 * delta));

                if (dist < 0.8) {
                    Audio.playCoin();
                    this.player.addGold(loot.gold);
                    this.player.addExp(loot.exp);

                    const popup = document.createElement('div');
                    popup.className = 'loot-popup';
                    popup.innerHTML = `+${loot.gold} 💰 | +${loot.exp} EXP`;
                    const container = document.getElementById('floating-ui-container');
                    if (container) container.appendChild(popup);

                    this.floatingTexts.push({
                        element: popup,
                        pos3D: pPos.clone().add(new THREE.Vector3(0, 1.8, 0)),
                        lifetime: 0,
                        maxLife: 1.2,
                        velY: 1.2
                    });

                    this.scene.remove(loot.mesh);
                    this.lootDrops.splice(i, 1);
                }
            }
        }
    }
}
