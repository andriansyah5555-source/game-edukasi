// Player Controller: Movement, Animation, Stats, Weapons, and Inventory

class Player {
    constructor(scene) {
        this.scene = scene;

        // Stats
        this.level = 1;
        this.hp = 100;
        this.maxHp = 100;
        this.exp = 0;
        this.maxExp = 100;
        this.gold = 1500; // Starting gold: enough to test buying mounts (Horse, Boar, Wolf, Cat, etc.) right away!
        this.quizScore = 0; // Poin Pembelajaran / Skor Kuis Edukasi
        this.quizzesAnswered = 0;
        this.quizzesCorrect = 0;
        this.baseAtk = 20;
        this.critRate = 0.05;

        // Equipped items
        this.equippedWeapon = 'woodenSword';
        this.weaponBonusAtk = 15;
        this.weaponBonusCrit = 0.0;
        this.inventory = ['woodenSword'];

        // =====================================================================
        // MOUNT / HEWAN TUNGGANGAN STATE
        // =====================================================================
        this.ownedMounts = []; // List of mount IDs bought by player
        this.activeMountId = null; // Currently equipped mount ID
        this.isMounted = false; // Is player actively riding the mount?
        this.currentMount = null; // Mount data object from ModelFactory
        this.currentMountMesh = null; // 3D Three.js Group attached to hero
        this.mountCycle = 0; // Animation cycle for gallop/stride
        this.mountFootstepTimer = 0;
        this.mountParticles = []; // Custom trail particles (stardust, shadows, feathers)

        this.name = 'Arthur';
        this.characterClass = 'knight';

        // 3D Model
        this.modelData = ModelFactory.createHero();
        this.mesh = this.modelData.mesh;
        this.bodyRoot = this.modelData.bodyRoot;
        this.leftArmGroup = this.modelData.leftArmGroup;
        this.rightArmGroup = this.modelData.rightArmGroup;
        this.leftLegGroup = this.modelData.leftLegGroup;
        this.rightLegGroup = this.modelData.rightLegGroup;
        this.cape = this.modelData.cape;
        this.weaponSocket = this.modelData.weaponSocket;

        // Current 3D weapon mesh
        this.currentWeaponMesh = null;
        this.attachWeapon(this.equippedWeapon);

        // Position player in open plaza boulevard facing North (safe from colliders!)
        this.mesh.position.set(0, 0, 12);
        this.scene.add(this.mesh);

        // Movement state
        this.moveSpeed = 7.0;
        this.moveX = 0;
        this.moveZ = 0;
        this.isMoving = false;
        this.walkCycle = 0;
        this.footstepTimer = 0;
        this.dustParticles = [];
        this.comboStep = 0;
        this.lastAttackTime = 0;

        // Jump physics & state
        this.isGrounded = true;
        this.isJumping = false;
        this.jumpVelocity = 0;
        this.gravity = -26.0;
        this.jumpForce = 9.2;
        this.landSquash = 1.0;

        // Swimming state & ripples
        this.isSwimming = false;
        this.swimCycle = 0;
        this.swimRippleTimer = 0;
        this.waterRipples = [];
        this.waterSplashes = [];
    }

    jump() {
        if (this.isSwimming && (!this.isMounted || !this.currentMount || !this.currentMount.canGlide)) {
            // Water breach leap
            this.jumpVelocity = 7.6;
            this.isGrounded = false;
            this.isJumping = true;
            this.spawnWaterSplash(this.mesh.position, 14);
            this.spawnWaterRipple(this.mesh.position.x, this.mesh.position.z, 1.1);
            if (typeof Audio !== 'undefined' && Audio.playWaterSplash) {
                Audio.playWaterSplash();
            }
            return;
        }

        if (!this.isGrounded) return; // Prevent mid-air jumps unless gliding

        if (this.isMounted && this.currentMount) {
            if (this.currentMount.canGlide) {
                this.jumpVelocity = 12.0; // Higher leap for winged mounts!
                if (typeof Audio !== 'undefined' && Audio.playWingFlap) {
                    Audio.playWingFlap();
                }
            } else {
                this.jumpVelocity = 10.5;
                if (typeof Audio !== 'undefined' && Audio.playJump) {
                    Audio.playJump();
                }
            }
        } else {
            this.jumpVelocity = this.jumpForce;
            if (typeof Audio !== 'undefined' && Audio.playJump) {
                Audio.playJump();
            }
        }

        this.isGrounded = false;
        this.isJumping = true;
        this.spawnDust(this.mesh.position);
    }

    // =========================================================================
    // MOUNT / HEWAN TUNGGANGAN CONTROLS & MANAGEMENT
    // =========================================================================
    mountUp(mountId) {
        if (!this.ownedMounts.includes(mountId)) {
            if (window.UI) {
                window.UI.showCustomDialogue('shopkeeper', 'Kamu belum memiliki hewan tunggangan ini! Kunjungi Kandang Hewan Oakhaven untuk membelinya!');
            }
            return;
        }

        if (this.isMounted) {
            this.dismount(false);
        }

        this.activeMountId = mountId;
        this.currentMount = ModelFactory.createMount(mountId);
        this.currentMountMesh = this.currentMount.group;
        this.mesh.add(this.currentMountMesh);

        this.isMounted = true;
        this.mountCycle = 0;

        // Position rider onto saddle
        this.bodyRoot.position.y = this.currentMount.saddleY;
        this.bodyRoot.position.z = this.currentMount.saddleZ || 0;

        // Riding pose: legs spread hugging flanks, hands forward holding reins
        this.leftLegGroup.rotation.z = -0.42;
        this.leftLegGroup.rotation.x = -0.32;
        this.rightLegGroup.rotation.z = 0.42;
        this.rightLegGroup.rotation.x = -0.32;
        this.leftArmGroup.rotation.x = -0.65;
        this.leftArmGroup.rotation.y = 0.22;
        if (!window.gameCombat || !window.gameCombat.isAttacking) {
            this.rightArmGroup.rotation.x = -0.65;
            this.rightArmGroup.rotation.y = -0.22;
        }

        // Audio & Visual Effects
        if (typeof Audio !== 'undefined' && Audio.playMountSummon) {
            Audio.playMountSummon();
            const cleanType = String(mountId).replace(/^mount_/, '');
            setTimeout(() => { if (Audio.playMountRoar) Audio.playMountRoar(cleanType); }, 250);
        }
        this.spawnMountSummonFX();
        this.showMountBanner(mountId, true);

        if (window.UI) {
            window.UI.updateMountHUD();
            window.UI.renderEquipmentShop();
        }
    }

    dismount(notify = true) {
        if (!this.isMounted) return;

        const prevId = this.activeMountId;
        if (this.currentMountMesh) {
            this.mesh.remove(this.currentMountMesh);
            this.currentMountMesh = null;
        }
        this.currentMount = null;
        this.isMounted = false;

        // Reset rider body & limbs to normal
        this.bodyRoot.position.y = 0;
        this.bodyRoot.position.z = 0;
        this.bodyRoot.rotation.x = 0;
        this.leftLegGroup.rotation.set(0, 0, 0);
        this.rightLegGroup.rotation.set(0, 0, 0);
        this.leftArmGroup.rotation.set(0, 0, 0);
        if (!window.gameCombat || !window.gameCombat.isAttacking) {
            this.rightArmGroup.rotation.set(0, 0, 0);
        }

        if (notify) {
            if (typeof Audio !== 'undefined' && Audio.playJump) {
                Audio.playJump();
            }
            this.spawnDust(this.mesh.position);
            this.showMountBanner(prevId, false);
        }

        if (window.UI) {
            window.UI.updateMountHUD();
            window.UI.renderEquipmentShop();
        }
    }

    toggleMount() {
        if (this.isMounted) {
            this.dismount(true);
        } else {
            if (this.activeMountId && this.ownedMounts.includes(this.activeMountId)) {
                this.mountUp(this.activeMountId);
            } else if (this.ownedMounts.length > 0) {
                this.mountUp(this.ownedMounts[0]);
            } else {
                if (window.UI) {
                    window.UI.showCustomDialogue('shopkeeper', 'Kamu belum memiliki hewan tunggangan! Kunjungi Peternak Barnaby di Kandang Oakhaven atau buka Toko (Tab Tunggangan) untuk membeli Kuda, Burung, Pegasus, dll.!');
                    if (typeof Audio !== 'undefined' && Audio.playHit) Audio.playHit();
                }
            }
        }
    }

    showMountBanner(mountId, isMounting) {
        let name = 'Hewan Tunggangan';
        let bonusText = '';
        if (typeof MOUNTS_DATA !== 'undefined') {
            const mData = MOUNTS_DATA.find(m => m.id === mountId);
            if (mData) {
                name = mData.name;
                bonusText = ` (+${Math.round((mData.speedMultiplier - 1) * 100)}% Kecepatan Lari)`;
            }
        }

        const banner = document.createElement('div');
        banner.className = 'mount-banner-popup';
        banner.innerHTML = isMounting
            ? `🐎 <span class="mount-glow">MENAIKI: ${name}</span>${bonusText}!`
            : `🚶 Turun dari ${name}.`;
        document.body.appendChild(banner);
        setTimeout(() => {
            banner.classList.add('fade-out');
            setTimeout(() => banner.remove(), 400);
        }, 2200);
    }

    spawnMountSummonFX() {
        // Magical ring on ground
        const ringGeo = new THREE.RingGeometry(0.6, 1.8, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xfacc15,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(this.mesh.position.x, 0.1, this.mesh.position.z);
        this.scene.add(ring);

        // Flash of light & summon dust particles
        this.spawnDust(this.mesh.position);
        for (let i = 0; i < 16; i++) {
            this.spawnMountParticle(this.activeMountId, this.mesh.position);
        }

        const startTime = performance.now();
        const animRing = () => {
            const elapsed = (performance.now() - startTime) / 1000;
            const progress = Math.min(elapsed / 0.5, 1.0);
            const scale = 1.0 + progress * 0.8;
            ring.scale.set(scale, scale, scale);
            ring.material.opacity = Math.max(0, 0.9 * (1.0 - progress));

            if (progress < 1.0) {
                requestAnimationFrame(animRing);
            } else {
                this.scene.remove(ring);
                ring.geometry.dispose();
                ring.material.dispose();
            }
        };
        animRing();
    }

    spawnMountParticle(mountId, pos) {
        const cleanType = String(mountId).replace(/^mount_/, '');
        let pColor = 0xd6c7a1;
        let isGlow = false;

        if (cleanType === 'pegasus') {
            pColor = Math.random() > 0.5 ? 0x38bdf8 : 0xfacc15; // Stardust cyan & gold
            isGlow = true;
        } else if (cleanType === 'bird') {
            pColor = Math.random() > 0.5 ? 0xf59e0b : 0xef4444; // Golden phoenix feather
        } else if (cleanType === 'wolf') {
            pColor = 0x27272a; // Shadow smoke
        } else if (cleanType === 'cat') {
            pColor = 0xf97316; // Amber slash spark
        } else if (cleanType === 'boar') {
            pColor = 0x5c381c; // Heavy dirt
        }

        const geo = new THREE.SphereGeometry(isGlow ? 0.14 : 0.18, 5, 5);
        const mat = new THREE.MeshBasicMaterial({
            color: pColor,
            transparent: true,
            opacity: 0.8
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            pos.x + (Math.random() - 0.5) * 0.8,
            0.2 + Math.random() * 0.4,
            pos.z + (Math.random() - 0.5) * 0.8
        );
        this.scene.add(mesh);

        this.mountParticles.push({
            mesh,
            opacity: 0.8,
            life: 0,
            maxLife: 0.4 + Math.random() * 0.25,
            vy: 0.5 + Math.random() * 0.5,
            scaleSpeed: isGlow ? 0.95 : 1.05
        });
    }

    updateMountParticles(delta) {
        for (let i = this.mountParticles.length - 1; i >= 0; i--) {
            const p = this.mountParticles[i];
            p.life += delta;
            p.mesh.position.y += p.vy * delta;
            p.mesh.scale.multiplyScalar(p.scaleSpeed);
            p.mesh.material.opacity = Math.max(0, p.opacity * (1 - p.life / p.maxLife));

            if (p.life >= p.maxLife) {
                this.scene.remove(p.mesh);
                if (p.mesh.geometry) p.mesh.geometry.dispose();
                if (p.mesh.material) p.mesh.material.dispose();
                this.mountParticles.splice(i, 1);
            }
        }
    }

    spawnDust(pos) {
        const dustGeo = new THREE.SphereGeometry(0.18, 6, 6);
        const dustMat = new THREE.MeshBasicMaterial({
            color: 0xd6c7a1,
            transparent: true,
            opacity: 0.65
        });
        const dust = new THREE.Mesh(dustGeo, dustMat);
        dust.position.set(pos.x + (Math.random() - 0.5) * 0.4, 0.1, pos.z + (Math.random() - 0.5) * 0.4);
        this.scene.add(dust);

        this.dustParticles.push({
            mesh: dust,
            scale: 0.18,
            opacity: 0.65,
            life: 0,
            maxLife: 0.35
        });
    }

    spawnWaterRipple(x, z, scale = 1.0) {
        const geo = new THREE.RingGeometry(0.25 * scale, 0.45 * scale, 24);
        const mat = new THREE.MeshBasicMaterial({
            color: 0xe0f2fe,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, 0.05, z);
        this.scene.add(mesh);

        this.waterRipples.push({
            mesh,
            life: 0,
            maxLife: 0.85,
            maxScale: 2.8 * scale,
            initScale: scale
        });
    }

    spawnWaterSplash(pos, count = 12) {
        const geo = new THREE.SphereGeometry(0.12, 5, 5);
        for (let i = 0; i < count; i++) {
            const mat = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.35 ? 0xffffff : 0x7dd3fc,
                transparent: true,
                opacity: 0.85
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                pos.x + (Math.random() - 0.5) * 0.4,
                0.06,
                pos.z + (Math.random() - 0.5) * 0.4
            );
            this.scene.add(mesh);

            const angle = Math.random() * Math.PI * 2;
            const speed = 1.2 + Math.random() * 2.2;
            this.waterSplashes.push({
                mesh,
                vx: Math.cos(angle) * speed,
                vy: 3.5 + Math.random() * 3.0,
                vz: Math.sin(angle) * speed,
                life: 0,
                maxLife: 0.55
            });
        }
    }

    spawnWaterBubble(pos) {
        const geo = new THREE.SphereGeometry(0.09, 4, 4);
        const mat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.75
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            pos.x + (Math.random() - 0.5) * 0.35,
            0.05,
            pos.z + (Math.random() - 0.5) * 0.35
        );
        this.scene.add(mesh);
        this.waterRipples.push({
            mesh,
            life: 0,
            maxLife: 0.45,
            maxScale: 1.4,
            initScale: 0.8
        });
    }

    attachWeapon(weaponId) {
        if (this.currentWeaponMesh) {
            this.weaponSocket.remove(this.currentWeaponMesh);
        }

        const newWeapon = ModelFactory.createWeapon(weaponId);
        newWeapon.rotation.x = Math.PI / 2; // Point weapon upward in hand
        newWeapon.rotation.z = Math.PI / 8;
        this.weaponSocket.add(newWeapon);
        this.currentWeaponMesh = newWeapon;
        this.equippedWeapon = weaponId;

        // Update weapon bonuses
        const weaponData = {
            woodenSword: { atk: 15, crit: 0.0 },
            ironSword:   { atk: 25, crit: 0.0 },
            starSword:   { atk: 50, crit: 0.10 },
            ironAxe:     { atk: 15, crit: 0.0 },
            magicStaff:  { atk: 15, crit: 0.0 },
            shortbow:    { atk: 10, crit: 0.05 }
        };

        const w = weaponData[weaponId] || { atk: 10, crit: 0.0 };
        this.weaponBonusAtk = w.atk;
        this.weaponBonusCrit = w.crit;
    }

    setHeroAppearance(config) {
        if (!config) return;
        const curPos = this.mesh ? this.mesh.position.clone() : new THREE.Vector3(0, 0, 12);
        const curRotY = this.mesh ? this.mesh.rotation.y : 0;

        if (this.mesh) {
            this.scene.remove(this.mesh);
        }

        this.modelData = ModelFactory.createHero(config);
        this.mesh = this.modelData.mesh;
        this.bodyRoot = this.modelData.bodyRoot;
        this.leftArmGroup = this.modelData.leftArmGroup;
        this.rightArmGroup = this.modelData.rightArmGroup;
        this.leftLegGroup = this.modelData.leftLegGroup;
        this.rightLegGroup = this.modelData.rightLegGroup;
        this.cape = this.modelData.cape;
        this.weaponSocket = this.modelData.weaponSocket;

        this.mesh.position.copy(curPos);
        this.mesh.rotation.y = curRotY;
        this.scene.add(this.mesh);

        this.currentWeaponMesh = null;
        if (config.weapon) {
            this.attachWeapon(config.weapon);
        } else {
            this.attachWeapon(this.equippedWeapon);
        }

        if (config.baseAtk !== undefined) this.baseAtk = config.baseAtk;
        if (config.critRate !== undefined) this.critRate = config.critRate;
        if (config.maxHp !== undefined) {
            this.maxHp = config.maxHp;
            this.hp = this.maxHp;
        }
        if (config.name) this.name = config.name;
        if (config.characterClass) this.characterClass = config.characterClass;

        if (window.UI) window.UI.updateStats();
    }

    getAttackPower() {
        return this.baseAtk + this.weaponBonusAtk;
    }

    addGold(amount) {
        this.gold += amount;
        if (window.UI) window.UI.updateStats();
    }

    addQuizScore(amount) {
        this.quizScore = (this.quizScore || 0) + amount;
        this.quizzesCorrect = (this.quizzesCorrect || 0) + 1;
        this.quizzesAnswered = (this.quizzesAnswered || 0) + 1;
        if (window.UI) window.UI.updateStats();
    }

    heal(amount) {
        const prevHp = this.hp;
        this.hp = Math.min(this.maxHp, this.hp + amount);
        const actualHealed = this.hp - prevHp;
        if (window.UI) window.UI.updateStats();
        return actualHealed;
    }

    takeDamage(amount) {
        const prevHp = this.hp;
        this.hp = Math.max(0, this.hp - amount);
        const actualDamage = prevHp - this.hp;
        if (window.UI) window.UI.updateStats();

        if (this.hp <= 0 && window.game && window.game.combat) {
            window.game.combat.handlePlayerDeath();
        }

        return actualDamage;
    }

    addExp(amount) {
        this.exp += amount;
        if (this.exp >= this.maxExp) {
            this.levelUp();
        }
        if (window.UI) window.UI.updateStats();
    }

    levelUp() {
        this.level++;
        this.exp -= this.maxExp;
        this.maxExp = Math.round(this.maxExp * 1.5);
        this.maxHp += 20;
        this.hp = this.maxHp;
        this.baseAtk += 8;
        Audio.playLevelUp();

        // Level Up Banner popup
        const div = document.createElement('div');
        div.className = 'level-up-banner';
        div.innerHTML = `⭐ LEVEL UP! ⭐<br><span style="font-size:16px;">Lv. ${this.level} - All Stats Increased!</span>`;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2500);
    }

    update(delta, time, colliders = [], world = null) {
        // Query terrain elevation and river water presence
        const surface = (world && typeof world.getElevationAndWater === 'function') 
            ? world.getElevationAndWater(this.mesh.position.x, this.mesh.position.z) 
            : { inWater: false, groundY: 0 };

        // Winged mount can glide over water without sinking
        const isGlidingMount = this.isMounted && this.currentMount && this.currentMount.canGlide;

        // Water Entry / Exit Transition Events
        if (surface.inWater && !this.isSwimming && !isGlidingMount) {
            this.isSwimming = true;
            this.spawnWaterSplash(this.mesh.position, 16);
            this.spawnWaterRipple(this.mesh.position.x, this.mesh.position.z, 1.2);
            if (typeof Audio !== 'undefined' && Audio.playWaterSplash) Audio.playWaterSplash();
        } else if (!surface.inWater && this.isSwimming) {
            this.isSwimming = false;
            this.bodyRoot.rotation.x = 0;
            this.modelData.headGroup.rotation.x = 0;
            this.spawnWaterSplash(this.mesh.position, 8);
            if (typeof Audio !== 'undefined' && Audio.playWaterSplash) Audio.playWaterSplash();
        }

        // Calculate velocity (mount multiplies speed for exhilarating movement!)
        let currentSpeed = this.isSwimming ? 4.6 : this.moveSpeed;
        if (this.isMounted && this.currentMount) {
            const mult = this.currentMount.speedMultiplier || 1.7;
            if (isGlidingMount && surface.inWater) {
                currentSpeed = this.moveSpeed * mult;
            } else if (this.isSwimming) {
                currentSpeed = 4.6 * mult;
            } else {
                currentSpeed = this.moveSpeed * mult;
            }
        }

        const len = Math.hypot(this.moveX, this.moveZ);
        this.isMoving = len > 0.05;

        if (this.isMoving) {
            const dirX = this.moveX / len;
            const dirZ = this.moveZ / len;

            // Target facing angle
            const targetAngle = Math.atan2(dirX, dirZ);
            
            // Smooth rotation towards move direction
            let diff = targetAngle - this.mesh.rotation.y;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            this.mesh.rotation.y += diff * 14 * delta;

            // Tentative next position
            const nextX = this.mesh.position.x + dirX * currentSpeed * delta;
            const nextZ = this.mesh.position.z + dirZ * currentSpeed * delta;

            // Push player out if inside any collider box
            colliders.forEach(box => {
                const px = this.mesh.position.x;
                const pz = this.mesh.position.z;
                if (px >= box.minX && px <= box.maxX && pz >= box.minZ && pz <= box.maxZ) {
                    const dLeft = px - box.minX;
                    const dRight = box.maxX - px;
                    const dTop = pz - box.minZ;
                    const dBottom = box.maxZ - pz;
                    const minD = Math.min(dLeft, dRight, dTop, dBottom);
                    if (minD === dLeft) this.mesh.position.x = box.minX - 0.3;
                    else if (minD === dRight) this.mesh.position.x = box.maxX + 0.3;
                    else if (minD === dTop) this.mesh.position.z = box.minZ - 0.3;
                    else this.mesh.position.z = box.maxZ + 0.3;
                }
            });

            // Collision check against world colliders with player radius buffer
            const r = 0.35;
            let canMoveX = true;
            let canMoveZ = true;

            colliders.forEach(box => {
                if (nextX + r > box.minX && nextX - r < box.maxX && 
                    this.mesh.position.z + r > box.minZ && this.mesh.position.z - r < box.maxZ) {
                    canMoveX = false;
                }
                if (this.mesh.position.x + r > box.minX && this.mesh.position.x - r < box.maxX && 
                    nextZ + r > box.minZ && nextZ - r < box.maxZ) {
                    canMoveZ = false;
                }
            });

            // Boundary constraints for open world
            if (nextX < -140 || nextX > 140) canMoveX = false;
            if (nextZ < -140 || nextZ > 140) canMoveZ = false;

            if (canMoveX) this.mesh.position.x = nextX;
            if (canMoveZ) this.mesh.position.z = nextZ;
        }

        // =====================================================================
        // VERTICAL PHYSICS (JUMPING & SWIMMING BUOYANCY)
        // =====================================================================
        const effectiveGravity = (isGlidingMount && !this.isGrounded) ? -10.5 : this.gravity;

        if (this.isSwimming && !isGlidingMount) {
            // Floating buoyancy in water with wave bobbing
            const swimTargetY = surface.groundY + Math.sin(time * 3.5) * 0.05;

            if (this.isJumping) {
                this.mesh.position.y += this.jumpVelocity * delta;
                this.jumpVelocity += effectiveGravity * delta;

                if (this.mesh.position.y <= swimTargetY) {
                    // Land back in water
                    this.mesh.position.y = swimTargetY;
                    this.isJumping = false;
                    this.isGrounded = true;
                    this.jumpVelocity = 0;
                    this.spawnWaterSplash(this.mesh.position, 12);
                    this.spawnWaterRipple(this.mesh.position.x, this.mesh.position.z, 1.0);
                    if (typeof Audio !== 'undefined' && Audio.playWaterSplash) Audio.playWaterSplash();
                }
            } else {
                this.mesh.position.y += (swimTargetY - this.mesh.position.y) * 12 * delta;
                this.jumpVelocity = 0;
                this.isGrounded = true;
            }
        } else {
            // Dry land, bridge deck, or gliding mount hover over river
            const targetGroundY = (isGlidingMount && surface.inWater) ? surface.groundY + 0.8 : surface.groundY;

            if (!this.isGrounded || this.mesh.position.y > targetGroundY + 0.02) {
                this.mesh.position.y += this.jumpVelocity * delta;
                this.jumpVelocity += effectiveGravity * delta;

                if (this.mesh.position.y <= targetGroundY) {
                    this.mesh.position.y = targetGroundY;
                    const wasAirborne = !this.isGrounded;
                    this.isGrounded = true;
                    this.isJumping = false;
                    this.jumpVelocity = 0;

                    if (wasAirborne) {
                        const isStone = surface.isBridge || (Math.abs(this.mesh.position.x) < 16 && Math.abs(this.mesh.position.z) < 32);
                        if (typeof Audio !== 'undefined' && Audio.playLand) Audio.playLand(isStone);
                        this.spawnDust(this.mesh.position);
                        this.landSquash = 0.82;
                    }
                }
            } else {
                this.mesh.position.y = targetGroundY;
                this.jumpVelocity = 0;
                this.isGrounded = true;
            }

            // Restore landing squash deformation
            this.landSquash += (1.0 - this.landSquash) * 12 * delta;
            const invS = 1.0 / Math.sqrt(Math.max(0.5, this.landSquash));
            this.bodyRoot.scale.set(invS, this.landSquash, invS);
        }

        // =====================================================================
        // ANIMATION SYSTEMS (MOUNTED RIDING vs NORMAL WALKING / SWIMMING)
        // =====================================================================
        if (this.isMounted && this.currentMount) {
            // Case A: RIDING MOUNT (Kuda, Burung, Pegasus, Serigala, Harimau, Babi)
            this.updateMountAnimation(delta, time, currentSpeed, surface);
        } else if (this.isSwimming) {
            // Case 1: SWIMMING IN RIVER WATER
            if (this.isMoving) {
                // Horizontal swimming posture (chest down in water)
                this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, 1.15, 12 * delta);
                // Head tilted up to breathe above water
                this.modelData.headGroup.rotation.x = THREE.MathUtils.lerp(this.modelData.headGroup.rotation.x, -0.85, 12 * delta);

                this.swimCycle += delta * 7.5;
                const armPhase = Math.sin(this.swimCycle);
                this.leftArmGroup.rotation.x = armPhase * 1.1 - 0.3;
                this.leftArmGroup.rotation.z = Math.cos(this.swimCycle) * 0.5 + 0.3;

                if (!window.gameCombat || !window.gameCombat.isAttacking) {
                    this.rightArmGroup.rotation.x = -armPhase * 1.1 - 0.3;
                    this.rightArmGroup.rotation.z = -Math.cos(this.swimCycle) * 0.5 - 0.3;
                }

                // Leg flutter kicks
                const kickPhase = Math.sin(this.swimCycle * 2.2);
                this.leftLegGroup.rotation.x = kickPhase * 0.45;
                this.rightLegGroup.rotation.x = -kickPhase * 0.45;

                // Wake ripples and paddle sound
                this.swimRippleTimer += delta;
                if (this.swimRippleTimer >= 0.28) {
                    this.swimRippleTimer = 0;
                    this.spawnWaterRipple(this.mesh.position.x, this.mesh.position.z, 0.65);
                    this.spawnWaterBubble(this.mesh.position);
                    if (typeof Audio !== 'undefined' && Audio.playSwim) Audio.playSwim();
                }
            } else {
                // Treading water idle stance
                this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, 0.22, 10 * delta);
                this.modelData.headGroup.rotation.x = THREE.MathUtils.lerp(this.modelData.headGroup.rotation.x, 0, 10 * delta);

                this.leftArmGroup.rotation.z = 0.6 + Math.sin(time * 3.0) * 0.25;
                this.leftArmGroup.rotation.x = 0.2;
                if (!window.gameCombat || !window.gameCombat.isAttacking) {
                    this.rightArmGroup.rotation.z = -0.6 - Math.sin(time * 3.0) * 0.25;
                    this.rightArmGroup.rotation.x = 0.2;
                }

                this.leftLegGroup.rotation.x = Math.sin(time * 2.8) * 0.25;
                this.rightLegGroup.rotation.x = -Math.sin(time * 2.8) * 0.25;

                this.swimRippleTimer += delta;
                if (this.swimRippleTimer >= 1.2) {
                    this.swimRippleTimer = 0;
                    this.spawnWaterRipple(this.mesh.position.x, this.mesh.position.z, 0.45);
                }
            }
        } else if (!this.isGrounded) {
            // Case 2: AIRBORNE JUMPING ON LAND / BRIDGES
            this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, 0, 12 * delta);
            this.modelData.headGroup.rotation.x = THREE.MathUtils.lerp(this.modelData.headGroup.rotation.x, 0, 12 * delta);

            // Dynamic jump pose: legs tucked, arms balancing
            this.leftLegGroup.rotation.x = -0.45;
            this.rightLegGroup.rotation.x = 0.35;
            this.leftArmGroup.rotation.x = -0.7;
            if (!window.gameCombat || !window.gameCombat.isAttacking) {
                this.rightArmGroup.rotation.x = -0.7;
            }
        } else if (this.isMoving) {
            // Case 3: NORMAL RUNNING ON LAND / BRIDGES
            this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, 0, 12 * delta);
            this.modelData.headGroup.rotation.x = THREE.MathUtils.lerp(this.modelData.headGroup.rotation.x, 0, 12 * delta);

            this.walkCycle += delta * 13;
            const legAngle = Math.sin(this.walkCycle) * 0.75;
            this.leftLegGroup.rotation.x = legAngle;
            this.rightLegGroup.rotation.x = -legAngle;

            this.leftArmGroup.rotation.x = -legAngle * 0.85;
            this.leftArmGroup.rotation.z = 0;
            if (!window.gameCombat || !window.gameCombat.isAttacking) {
                this.rightArmGroup.rotation.x = legAngle * 0.85;
                this.rightArmGroup.rotation.z = 0;
            }

            this.bodyRoot.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.12;
            this.bodyRoot.rotation.z = Math.sin(this.walkCycle) * 0.05;

            this.footstepTimer += delta * 13;
            if (this.footstepTimer >= Math.PI) {
                this.footstepTimer -= Math.PI;
                const isStone = surface.isBridge || (Math.abs(this.mesh.position.x) < 16 && Math.abs(this.mesh.position.z) < 32);
                Audio.playFootstep(isStone);
                this.spawnDust(this.mesh.position);
            }
        } else {
            // Case 4: IDLE ON LAND / BRIDGES
            this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, 0, 12 * delta);
            this.modelData.headGroup.rotation.x = THREE.MathUtils.lerp(this.modelData.headGroup.rotation.x, 0, 12 * delta);

            this.leftLegGroup.rotation.x *= 0.8;
            this.rightLegGroup.rotation.x *= 0.8;
            this.leftArmGroup.rotation.x *= 0.8;
            this.leftArmGroup.rotation.z *= 0.8;
            if (!window.gameCombat || !window.gameCombat.isAttacking) {
                this.rightArmGroup.rotation.x *= 0.8;
                this.rightArmGroup.rotation.z *= 0.8;
            }
            this.bodyRoot.rotation.z *= 0.8;

            this.bodyRoot.position.y = Math.sin(time * 3) * 0.04;
            this.modelData.headGroup.position.y = 2.1 + Math.sin(time * 2.5) * 0.02;
        }

        // Cape undulating wind wave
        if (this.cape) {
            const windSpeed = this.isMoving ? 16 : 6;
            const windIntensity = this.isMoving ? 0.45 : 0.15;
            this.cape.rotation.x = 0.28 + Math.sin(time * windSpeed) * windIntensity;
            this.cape.rotation.y = Math.sin(time * (windSpeed * 0.7)) * 0.1;
        }

        // Star Sword magical shimmer
        if (this.equippedWeapon === 'starSword' && this.currentWeaponMesh) {
            this.currentWeaponMesh.rotation.y = Math.sin(time * 4) * 0.15;
        }

        // Update Footstep Dust Particles
        for (let i = this.dustParticles.length - 1; i >= 0; i--) {
            const p = this.dustParticles[i];
            p.life += delta;
            p.mesh.scale.multiplyScalar(1.05);
            p.mesh.material.opacity = Math.max(0, p.opacity * (1 - p.life / p.maxLife));
            p.mesh.position.y += 0.4 * delta;

            if (p.life >= p.maxLife) {
                this.scene.remove(p.mesh);
                if (p.mesh.geometry) p.mesh.geometry.dispose();
                if (p.mesh.material) p.mesh.material.dispose();
                this.dustParticles.splice(i, 1);
            }
        }

        // Update Water Wake Ripples
        for (let i = this.waterRipples.length - 1; i >= 0; i--) {
            const r = this.waterRipples[i];
            r.life += delta;
            const progress = r.life / r.maxLife;
            const curScale = r.initScale + (r.maxScale - r.initScale) * progress;
            r.mesh.scale.set(curScale, curScale, curScale);
            r.mesh.material.opacity = Math.max(0, 0.85 * (1 - progress));

            if (r.life >= r.maxLife) {
                this.scene.remove(r.mesh);
                if (r.mesh.geometry) r.mesh.geometry.dispose();
                if (r.mesh.material) r.mesh.material.dispose();
                this.waterRipples.splice(i, 1);
            }
        }

        // Update Water Splash Particles
        for (let i = this.waterSplashes.length - 1; i >= 0; i--) {
            const s = this.waterSplashes[i];
            s.life += delta;
            s.mesh.position.x += s.vx * delta;
            s.mesh.position.z += s.vz * delta;
            s.mesh.position.y += s.vy * delta;
            s.vy -= 18.0 * delta; // Gravity
            const progress = s.life / s.maxLife;
            s.mesh.material.opacity = Math.max(0, 0.85 * (1 - progress));

            if (s.life >= s.maxLife || s.mesh.position.y <= 0.02) {
                this.scene.remove(s.mesh);
                if (s.mesh.geometry) s.mesh.geometry.dispose();
                if (s.mesh.material) s.mesh.material.dispose();
                this.waterSplashes.splice(i, 1);
            }
        }

        // Update Mount Trail Particles (stardust, shadows, feathers)
        this.updateMountParticles(delta);
    }

    // =========================================================================
    // DYNAMIC MOUNT ANIMATION SYSTEM (Gallop, Wings Flap, Bobbing & Saddle Sitting)
    // =========================================================================
    updateMountAnimation(delta, time, currentSpeed, surface) {
        if (!this.currentMount) return;

        const mount = this.currentMount;
        const cleanType = String(this.activeMountId).replace(/^mount_/, '');
        const isAirborne = !this.isGrounded;

        // 1. Position and pose hero rider on saddle
        let gallopBob = 0;
        let leanAngle = 0;

        if (this.isMoving) {
            this.mountCycle += delta * (currentSpeed * 1.35);
            gallopBob = Math.abs(Math.sin(this.mountCycle * 2)) * 0.08;
            leanAngle = 0.14; // Rider leans slightly forward in full gallop

            // Cape flaps faster in high wind
            if (this.cape) {
                this.cape.rotation.x = 0.5 + Math.sin(time * 24) * 0.5;
                this.cape.rotation.y = Math.sin(time * 16) * 0.15;
            }

            // Hoofstep / Gallop Sound & Particles
            this.mountFootstepTimer += delta * (currentSpeed * 1.5);
            if (this.mountFootstepTimer >= Math.PI) {
                this.mountFootstepTimer -= Math.PI;
                const isStone = surface.isBridge || (Math.abs(this.mesh.position.x) < 16 && Math.abs(this.mesh.position.z) < 32);
                if (typeof Audio !== 'undefined' && Audio.playMountGallop) {
                    Audio.playMountGallop(isStone);
                }
                this.spawnDust(this.mesh.position);
                this.spawnMountParticle(this.activeMountId, this.mesh.position);
            }
        } else {
            // Idle breathing bob
            gallopBob = Math.sin(time * 2.8) * 0.03;
            leanAngle = 0;
            if (this.cape) {
                this.cape.rotation.x = 0.25 + Math.sin(time * 5) * 0.15;
            }
        }

        // Apply hero rider posture
        this.bodyRoot.position.y = mount.saddleY + gallopBob;
        this.bodyRoot.position.z = mount.saddleZ || 0;
        this.bodyRoot.rotation.x = THREE.MathUtils.lerp(this.bodyRoot.rotation.x, leanAngle, 12 * delta);
        this.bodyRoot.rotation.z = this.isMoving ? Math.sin(this.mountCycle) * 0.04 : 0;

        // Legs stay clamped to saddle flanks
        this.leftLegGroup.rotation.z = -0.42;
        this.leftLegGroup.rotation.x = -0.32;
        this.rightLegGroup.rotation.z = 0.42;
        this.rightLegGroup.rotation.x = -0.32;

        // Hands hold reins
        this.leftArmGroup.rotation.x = -0.65;
        this.leftArmGroup.rotation.y = 0.22;
        this.leftArmGroup.rotation.z = 0.08;
        if (!window.gameCombat || !window.gameCombat.isAttacking) {
            this.rightArmGroup.rotation.x = -0.65;
            this.rightArmGroup.rotation.y = -0.22;
            this.rightArmGroup.rotation.z = -0.08;
        }

        // 2. Animate Mount 3D Parts
        if (this.isMoving) {
            const legAmp = 0.68;

            if (cleanType === 'bird') {
                // Avian 2-legged run
                if (mount.frontLeftLeg) mount.frontLeftLeg.rotation.x = Math.sin(this.mountCycle) * 0.75;
                if (mount.frontRightLeg) mount.frontRightLeg.rotation.x = -Math.sin(this.mountCycle) * 0.75;
            } else {
                // 4-legged quadruped animal gallop
                if (mount.frontLeftLeg) mount.frontLeftLeg.rotation.x = Math.sin(this.mountCycle) * legAmp;
                if (mount.frontRightLeg) mount.frontRightLeg.rotation.x = -Math.sin(this.mountCycle) * legAmp;
                if (mount.backLeftLeg) mount.backLeftLeg.rotation.x = -Math.sin(this.mountCycle + 0.35) * (legAmp * 0.9);
                if (mount.backRightLeg) mount.backRightLeg.rotation.x = Math.sin(this.mountCycle + 0.35) * (legAmp * 0.9);
            }

            // Head & Neck bob
            if (mount.neck) mount.neck.rotation.x = -0.4 + Math.sin(this.mountCycle * 2) * 0.08;
            if (mount.head && mount.head !== mount.neck) mount.head.rotation.x = 0.5 + Math.sin(this.mountCycle * 2) * 0.05;

            // Tail sway
            if (mount.tail) {
                mount.tail.rotation.y = Math.sin(this.mountCycle) * 0.35;
                mount.tail.rotation.x = -0.3 + Math.sin(this.mountCycle * 2) * 0.15;
            }

            // Wing flap during movement
            if (mount.leftWing && mount.rightWing) {
                const wingSpeed = isAirborne ? 12 : 6;
                const wingAmp = isAirborne ? 0.75 : 0.45;
                mount.leftWing.rotation.z = Math.sin(time * wingSpeed) * wingAmp;
                mount.rightWing.rotation.z = -Math.sin(time * wingSpeed) * wingAmp;
                mount.leftWing.rotation.y = isAirborne ? 0.2 : 0;
                mount.rightWing.rotation.y = isAirborne ? -0.2 : 0;
            }
        } else {
            // Idle Mount
            if (mount.frontLeftLeg) mount.frontLeftLeg.rotation.x *= 0.85;
            if (mount.frontRightLeg) mount.frontRightLeg.rotation.x *= 0.85;
            if (mount.backLeftLeg) mount.backLeftLeg.rotation.x *= 0.85;
            if (mount.backRightLeg) mount.backRightLeg.rotation.x *= 0.85;

            if (mount.tail) {
                mount.tail.rotation.y = Math.sin(time * 2.0) * 0.18;
                mount.tail.rotation.x = -0.35 + Math.sin(time * 1.5) * 0.05;
            }

            if (mount.neck) {
                mount.neck.rotation.x = -0.4 + Math.sin(time * 2.5) * 0.03;
            }

            if (mount.leftWing && mount.rightWing) {
                // Gentle breathing fold of wings
                mount.leftWing.rotation.z = THREE.MathUtils.lerp(mount.leftWing.rotation.z, -0.15 + Math.sin(time * 2.5) * 0.08, 6 * delta);
                mount.rightWing.rotation.z = THREE.MathUtils.lerp(mount.rightWing.rotation.z, 0.15 - Math.sin(time * 2.5) * 0.08, 6 * delta);
            }
        }

        // Winged mount soaring / airborne flapping
        if (isAirborne && mount.leftWing && mount.rightWing) {
            mount.leftWing.rotation.z = Math.sin(time * 14) * 0.8;
            mount.rightWing.rotation.z = -Math.sin(time * 14) * 0.8;
            if (Math.random() < 0.2) {
                this.spawnMountParticle(this.activeMountId, this.mesh.position);
            }
        }
    }
}
