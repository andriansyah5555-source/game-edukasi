// Procedural 3D Model Factory using Three.js
// Builds the Hero, Shopkeeper, Angel Wizard, Weapon Shop, Nature, and Slimes

const ModelFactory = {
    // Utility to create standard colors & materials
    materials: {
        skin: new THREE.MeshLambertMaterial({ color: 0xffdfc4 }),
        heroHair: new THREE.MeshLambertMaterial({ color: 0x2755e8 }),
        heroHairLight: new THREE.MeshLambertMaterial({ color: 0x4a7eff }),
        heroCape: new THREE.MeshLambertMaterial({ color: 0xd9142b }),
        heroPants: new THREE.MeshLambertMaterial({ color: 0x22222a }),
        heroGloves: new THREE.MeshLambertMaterial({ color: 0x1a1a20 }),
        woodDark: new THREE.MeshLambertMaterial({ color: 0x5c381c }),
        woodLight: new THREE.MeshLambertMaterial({ color: 0x966036 }),
        woodDeck: new THREE.MeshLambertMaterial({ color: 0xa97445 }),
        roofTile: new THREE.MeshLambertMaterial({ color: 0xc84c2a }),
        steel: new THREE.MeshStandardMaterial({ color: 0xdae2e8, metalness: 0.8, roughness: 0.25 }),
        gold: new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 0.7, roughness: 0.3 }),
        starGlow: new THREE.MeshStandardMaterial({ 
            color: 0xec4899, 
            emissive: 0xbe185d, 
            emissiveIntensity: 0.8,
            metalness: 0.5, 
            roughness: 0.2 
        }),
        slimeGreen: new THREE.MeshStandardMaterial({ 
            color: 0x4ade80, 
            roughness: 0.2, 
            metalness: 0.1, 
            transparent: true, 
            opacity: 0.92 
        }),
        slimeBlue: new THREE.MeshStandardMaterial({ 
            color: 0x38bdf8, 
            roughness: 0.2, 
            metalness: 0.1, 
            transparent: true, 
            opacity: 0.92 
        }),
        slimeGold: new THREE.MeshStandardMaterial({ 
            color: 0xfacc15, 
            emissive: 0xca8a04,
            emissiveIntensity: 0.4,
            roughness: 0.2, 
            metalness: 0.8 
        }),
        treeLeaves: new THREE.MeshLambertMaterial({ color: 0x40916c }),
        treeTrunk: new THREE.MeshLambertMaterial({ color: 0x6f4e37 }),
        stone: new THREE.MeshLambertMaterial({ color: 0x8d99ae }),
        pathStone: new THREE.MeshLambertMaterial({ color: 0xc4b59d })
    },

    // 1. CREATE HERO (Chibi anime hero with configurable class presets)
    createHero(config = {}) {
        const heroGroup = new THREE.Group();

        // Customizable palette with classic anime warrior fallbacks
        const hairColor = config.hairColor !== undefined ? config.hairColor : 0x2755e8;
        const capeColor = config.capeColor !== undefined ? config.capeColor : 0xd9142b;
        const vestColor = config.vestColor !== undefined ? config.vestColor : 0xf39c12;
        const eyeColor  = config.eyeColor  !== undefined ? config.eyeColor  : 0xe72b4b;
        const pantsColor = config.pantsColor !== undefined ? config.pantsColor : 0x22222a;
        const skinColor = config.skinColor !== undefined ? config.skinColor : 0xffdfc4;
        const glovesColor = config.glovesColor !== undefined ? config.glovesColor : 0x1a1a20;

        const hairMat = new THREE.MeshLambertMaterial({ color: hairColor });
        const capeMat = new THREE.MeshLambertMaterial({ color: capeColor, side: THREE.DoubleSide });
        const vestMat = new THREE.MeshLambertMaterial({ color: vestColor });
        const eyeMat = new THREE.MeshBasicMaterial({ color: eyeColor });
        const pantsMat = new THREE.MeshLambertMaterial({ color: pantsColor });
        const skinMat = new THREE.MeshLambertMaterial({ color: skinColor });
        const glovesMat = new THREE.MeshLambertMaterial({ color: glovesColor });

        // Root body container for bobbing/leaning
        const bodyRoot = new THREE.Group();
        heroGroup.add(bodyRoot);

        // Pelvis & Torso
        const torsoGeo = new THREE.BoxGeometry(0.8, 0.9, 0.5);
        const torso = new THREE.Mesh(torsoGeo, vestMat); // Adventurer vest
        torso.position.y = 1.35;
        torso.castShadow = true;
        bodyRoot.add(torso);

        // Belt with gold buckle
        const beltGeo = new THREE.BoxGeometry(0.85, 0.18, 0.55);
        const belt = new THREE.Mesh(beltGeo, new THREE.MeshLambertMaterial({ color: 0x3e2723 }));
        belt.position.y = 0.95;
        bodyRoot.add(belt);

        const buckleGeo = new THREE.BoxGeometry(0.24, 0.22, 0.58);
        const buckle = new THREE.Mesh(buckleGeo, this.materials.gold);
        buckle.position.y = 0.95;
        bodyRoot.add(buckle);

        // Head Group
        const headGroup = new THREE.Group();
        headGroup.position.y = 2.1;
        bodyRoot.add(headGroup);

        // Head Shape (Chibi cute rounded cube)
        const headGeo = new THREE.BoxGeometry(0.85, 0.8, 0.75);
        const head = new THREE.Mesh(headGeo, skinMat);
        head.castShadow = true;
        headGroup.add(head);

        // Fierce Anime Eyes
        const eyeGeo = new THREE.PlaneGeometry(0.16, 0.22);
        const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(-0.24, 0.05, 0.38);
        headGroup.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.position.set(0.24, 0.05, 0.38);
        headGroup.add(rightEye);

        const leftPupil = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.12), pupilMat);
        leftPupil.position.set(-0.24, 0.04, 0.382);
        headGroup.add(leftPupil);

        const rightPupil = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.12), pupilMat);
        rightPupil.position.set(0.24, 0.04, 0.382);
        headGroup.add(rightPupil);

        // Spiky Anime Hair
        const hairGroup = new THREE.Group();
        headGroup.add(hairGroup);

        const hairBaseGeo = new THREE.BoxGeometry(0.92, 0.45, 0.82);
        const hairBase = new THREE.Mesh(hairBaseGeo, hairMat);
        hairBase.position.set(0, 0.25, -0.05);
        hairGroup.add(hairBase);

        // Spikes pointing up, back, and sides
        const spikeGeo = new THREE.ConeGeometry(0.25, 0.75, 4);
        spikeGeo.rotateX(Math.PI / 2);

        const spikesConfig = [
            // Top crown spikes
            { pos: [0, 0.65, 0], rot: [-0.3, 0, 0], scale: 1.1 },
            { pos: [-0.3, 0.6, 0.1], rot: [-0.2, 0.2, 0.4], scale: 0.95 },
            { pos: [0.3, 0.6, 0.1], rot: [-0.2, -0.2, -0.4], scale: 0.95 },
            // Front bangs over forehead
            { pos: [-0.28, 0.2, 0.42], rot: [0.6, 0.2, 0.1], scale: 0.7 },
            { pos: [0, 0.25, 0.45], rot: [0.7, 0, 0], scale: 0.8 },
            { pos: [0.28, 0.2, 0.42], rot: [0.6, -0.2, -0.1], scale: 0.7 },
            // Side dynamic spikes (signature anime silhouette)
            { pos: [-0.52, 0.35, -0.1], rot: [0, 0, 1.1], scale: 1.0 },
            { pos: [0.52, 0.35, -0.1], rot: [0, 0, -1.1], scale: 1.0 },
            { pos: [-0.55, 0.05, -0.15], rot: [0, 0, 1.3], scale: 0.8 },
            { pos: [0.55, 0.05, -0.15], rot: [0, 0, -1.3], scale: 0.8 },
            // Back flowing hair
            { pos: [0, 0.25, -0.48], rot: [-1.2, 0, 0], scale: 1.1 },
            { pos: [-0.25, 0.1, -0.45], rot: [-1.1, 0.2, 0.3], scale: 0.9 },
            { pos: [0.25, 0.1, -0.45], rot: [-1.1, -0.2, -0.3], scale: 0.9 }
        ];

        spikesConfig.forEach(cfg => {
            const spike = new THREE.Mesh(spikeGeo, hairMat);
            spike.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
            spike.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
            spike.scale.set(cfg.scale, cfg.scale, cfg.scale);
            spike.castShadow = true;
            hairGroup.add(spike);
        });

        // Flowing Cape / Scarf
        const scarfCollar = new THREE.Mesh(
            new THREE.TorusGeometry(0.42, 0.14, 8, 16),
            capeMat
        );
        scarfCollar.rotation.x = Math.PI / 2;
        scarfCollar.position.y = 1.75;
        bodyRoot.add(scarfCollar);

        // Cape sheet fluttering backwards
        const capeGroup = new THREE.Group();
        capeGroup.position.set(0, 1.7, -0.28);
        bodyRoot.add(capeGroup);

        const capeGeo = new THREE.PlaneGeometry(0.85, 1.4, 4, 6);
        const cape = new THREE.Mesh(capeGeo, capeMat);
        cape.position.set(0, -0.65, -0.15);
        cape.rotation.x = 0.25; // slanted back
        cape.castShadow = true;
        capeGroup.add(cape);

        // Left Arm (Brawler stance)
        const leftArmGroup = new THREE.Group();
        leftArmGroup.position.set(-0.55, 1.6, 0);
        bodyRoot.add(leftArmGroup);

        const armGeo = new THREE.BoxGeometry(0.24, 0.6, 0.24);
        const leftArm = new THREE.Mesh(armGeo, skinMat);
        leftArm.position.y = -0.3;
        leftArmGroup.add(leftArm);

        const leftFist = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), glovesMat);
        leftFist.position.y = -0.65;
        leftArmGroup.add(leftFist);

        // Right Arm (Weapon holding arm)
        const rightArmGroup = new THREE.Group();
        rightArmGroup.position.set(0.55, 1.6, 0);
        bodyRoot.add(rightArmGroup);

        const rightArm = new THREE.Mesh(armGeo, skinMat);
        rightArm.position.y = -0.3;
        rightArmGroup.add(rightArm);

        const rightFist = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), glovesMat);
        rightFist.position.y = -0.65;
        rightArmGroup.add(rightFist);

        // Weapon Hand Socket
        const weaponSocket = new THREE.Group();
        weaponSocket.position.set(0, -0.65, 0.15);
        rightArmGroup.add(weaponSocket);

        // Legs
        const legGeo = new THREE.BoxGeometry(0.28, 0.85, 0.3);
        const leftLegGroup = new THREE.Group();
        leftLegGroup.position.set(-0.25, 0.85, 0);
        bodyRoot.add(leftLegGroup);

        const leftLeg = new THREE.Mesh(legGeo, pantsMat);
        leftLeg.position.y = -0.42;
        leftLeg.castShadow = true;
        leftLegGroup.add(leftLeg);

        const rightLegGroup = new THREE.Group();
        rightLegGroup.position.set(0.25, 0.85, 0);
        bodyRoot.add(rightLegGroup);

        const rightLeg = new THREE.Mesh(legGeo, pantsMat);
        rightLeg.position.y = -0.42;
        rightLeg.castShadow = true;
        rightLegGroup.add(rightLeg);

        // Return object with references for animation & weapon attachment
        return {
            mesh: heroGroup,
            bodyRoot,
            headGroup,
            leftArmGroup,
            rightArmGroup,
            leftLegGroup,
            rightLegGroup,
            cape,
            weaponSocket
        };
    },

    // 2. CREATE WEAPONS FOR EQUIPPING / DISPLAY
    createWeapon(type) {
        const weaponGroup = new THREE.Group();

        if (type === 'woodenSword') {
            // Wooden Sword
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.2, 0.06), this.materials.woodLight);
            blade.position.y = 0.65;
            blade.castShadow = true;
            weaponGroup.add(blade);

            const guard = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.12), this.materials.woodDark);
            guard.position.y = 0.08;
            weaponGroup.add(guard);

            const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.32, 6), this.materials.woodDark);
            handle.position.y = -0.12;
            weaponGroup.add(handle);

            const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), this.materials.woodLight);
            pommel.position.y = -0.28;
            weaponGroup.add(pommel);
        } else if (type === 'ironSword') {
            // Iron Sword (Buster / Broadsword)
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.4, 0.06), this.materials.steel);
            blade.position.y = 0.75;
            blade.castShadow = true;
            weaponGroup.add(blade);

            // Blade tip
            const tip = new THREE.Mesh(new THREE.ConeGeometry(0.155, 0.35, 4), this.materials.steel);
            tip.position.y = 1.62;
            tip.rotation.y = Math.PI / 4;
            weaponGroup.add(tip);

            // Golden crossguard
            const guard = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 0.14), this.materials.gold);
            guard.position.y = 0.08;
            weaponGroup.add(guard);

            // Grip
            const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.38, 8), this.materials.heroPants);
            handle.position.y = -0.16;
            weaponGroup.add(handle);

            const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), this.materials.gold);
            pommel.position.y = -0.36;
            weaponGroup.add(pommel);
        } else if (type === 'starSword') {
            // Legendary Star Sword (Glowing, magical, purple & gold)
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.55, 0.08), this.materials.starGlow);
            blade.position.y = 0.82;
            blade.castShadow = true;
            weaponGroup.add(blade);

            // Crystal glowing edges
            const edgeL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.4, 0.04), this.materials.gold);
            edgeL.position.set(-0.16, 0.8, 0);
            weaponGroup.add(edgeL);

            const edgeR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.4, 0.04), this.materials.gold);
            edgeR.position.set(0.16, 0.8, 0);
            weaponGroup.add(edgeR);

            // Tip Star
            const tip = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.45, 4), this.materials.starGlow);
            tip.position.y = 1.8;
            tip.rotation.y = Math.PI / 4;
            weaponGroup.add(tip);

            // Ornate Winged Golden Guard
            const guardWingL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.12), this.materials.gold);
            guardWingL.position.set(-0.25, 0.1, 0);
            guardWingL.rotation.z = 0.35;
            weaponGroup.add(guardWingL);

            const guardWingR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.12), this.materials.gold);
            guardWingR.position.set(0.25, 0.1, 0);
            guardWingR.rotation.z = -0.35;
            weaponGroup.add(guardWingR);

            // Star Core Jewel
            const jewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            jewel.position.set(0, 0.1, 0.07);
            weaponGroup.add(jewel);

            // Grip
            const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8), new THREE.MeshLambertMaterial({ color: 0x4a148c }));
            handle.position.y = -0.18;
            weaponGroup.add(handle);

            // Star pommel
            const pommel = new THREE.Mesh(new THREE.OctahedronGeometry(0.1), this.materials.gold);
            pommel.position.y = -0.4;
            weaponGroup.add(pommel);

            // Attach dynamic particle glow flag
            weaponGroup.userData.isLegendary = true;
        } else if (type === 'ironAxe') {
            // Iron Battleaxe
            const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 8), this.materials.woodLight);
            handle.position.y = 0.4;
            weaponGroup.add(handle);

            // Double Axe Head
            const bladeLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.06, 3), this.materials.steel);
            bladeLeft.position.set(-0.25, 0.9, 0);
            bladeLeft.rotation.z = Math.PI / 2;
            weaponGroup.add(bladeLeft);

            const bladeRight = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.06, 3), this.materials.steel);
            bladeRight.position.set(0.25, 0.9, 0);
            bladeRight.rotation.z = -Math.PI / 2;
            weaponGroup.add(bladeRight);

            const headCollar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.25, 0.18), this.materials.gold);
            headCollar.position.set(0, 0.9, 0);
            weaponGroup.add(headCollar);
        } else if (type === 'magicStaff') {
            // Magic Staff
            const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.6, 8), this.materials.gold);
            shaft.position.y = 0.5;
            weaponGroup.add(shaft);

            // Celestial Blue Orb
            const orb = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 16, 16),
                new THREE.MeshStandardMaterial({
                    color: 0x38bdf8,
                    emissive: 0x0284c7,
                    emissiveIntensity: 0.8,
                    roughness: 0.1
                })
            );
            orb.position.y = 1.35;
            weaponGroup.add(orb);

            // Star / Wings Cradle around orb
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.04, 8, 16), this.materials.gold);
            ring.position.y = 1.35;
            ring.rotation.x = Math.PI / 3;
            weaponGroup.add(ring);
        } else if (type === 'shortbow') {
            // Shortbow
            const curve = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.045, 8, 20, Math.PI), this.materials.woodLight);
            curve.position.set(0, 0.5, 0);
            curve.rotation.z = -Math.PI / 2;
            weaponGroup.add(curve);

            // Bowstring
            const stringGeo = new THREE.CylinderGeometry(0.01, 0.01, 1.3, 4);
            const string = new THREE.Mesh(stringGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
            string.position.set(0.22, 0.5, 0);
            weaponGroup.add(string);
        }

        return weaponGroup;
    },

    // 3. CREATE SHOPKEEPER NPC (Red-haired girl behind counter)
    createShopkeeper() {
        const group = new THREE.Group();

        // Dress & Body
        const dressGeo = new THREE.ConeGeometry(0.5, 1.2, 8);
        const dress = new THREE.Mesh(dressGeo, new THREE.MeshLambertMaterial({ color: 0x332222 }));
        dress.position.y = 0.6;
        dress.castShadow = true;
        group.add(dress);

        // White Apron
        const apron = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.7, 0.45), new THREE.MeshLambertMaterial({ color: 0xffffff }));
        apron.position.set(0, 0.65, 0.1);
        group.add(apron);

        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.65), this.materials.skin);
        head.position.y = 1.45;
        head.castShadow = true;
        group.add(head);

        // Cute Red Hair & Twin Horns/Pigtails
        const hairMat = new THREE.MeshLambertMaterial({ color: 0xd61a30 });
        const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.35, 0.7), hairMat);
        hairTop.position.set(0, 1.68, 0);
        group.add(hairTop);

        // Horns / Twintail cones
        const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.6, 6), hairMat);
        hornL.position.set(-0.48, 1.75, 0.1);
        hornL.rotation.z = 0.5;
        group.add(hornL);

        const hornR = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.6, 6), hairMat);
        hornR.position.set(0.48, 1.75, 0.1);
        hornR.rotation.z = -0.5;
        group.add(hornR);

        // Eyes
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff1133 });
        const eyeL = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.16), eyeMat);
        eyeL.position.set(-0.18, 1.45, 0.33);
        group.add(eyeL);

        const eyeR = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.16), eyeMat);
        eyeR.position.set(0.18, 1.45, 0.33);
        group.add(eyeR);

        // Cute smile
        const smile = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.05), new THREE.MeshBasicMaterial({ color: 0x880011 }));
        smile.position.set(0, 1.3, 0.33);
        group.add(smile);

        return group;
    },

    // 4. CREATE ANGEL WIZARD NPC (Floating, purple hat, starry wings, staff)
    createAngelWizard() {
        const group = new THREE.Group();

        const floatingBody = new THREE.Group();
        group.add(floatingBody);

        // Mystical Robes
        const robe = new THREE.Mesh(
            new THREE.ConeGeometry(0.55, 1.3, 8),
            new THREE.MeshLambertMaterial({ color: 0x2e1d54 })
        );
        robe.position.y = 0.65;
        robe.castShadow = true;
        floatingBody.add(robe);

        // Silver Hair & Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.65), this.materials.skin);
        head.position.y = 1.45;
        floatingBody.add(head);

        const silverHair = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.5, 0.7), new THREE.MeshLambertMaterial({ color: 0xdee2e6 }));
        silverHair.position.set(0, 1.55, -0.05);
        floatingBody.add(silverHair);

        // Wizard Hat (Wide brim + pointy cone)
        const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.08, 16), new THREE.MeshLambertMaterial({ color: 0x3d2b70 }));
        hatBrim.position.y = 1.82;
        floatingBody.add(hatBrim);

        const hatCone = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.9, 8), new THREE.MeshLambertMaterial({ color: 0x3d2b70 }));
        hatCone.position.set(0, 2.25, -0.08);
        hatCone.rotation.x = -0.15;
        floatingBody.add(hatCone);

        // Star on hat
        const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), this.materials.gold);
        star.position.set(0, 2.7, -0.15);
        floatingBody.add(star);

        // Glowing Blue Angel Wings
        const wingMat = new THREE.MeshStandardMaterial({
            color: 0x70d6ff,
            emissive: 0x0077b6,
            emissiveIntensity: 0.6,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.88
        });

        const wingL = new THREE.Group();
        wingL.position.set(-0.35, 1.25, -0.28);
        const wingLMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.1), wingMat);
        wingLMesh.position.set(-0.5, 0.2, 0);
        wingLMesh.rotation.y = 0.3;
        wingL.add(wingLMesh);
        floatingBody.add(wingL);

        const wingR = new THREE.Group();
        wingR.position.set(0.35, 1.25, -0.28);
        const wingRMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.1), wingMat);
        wingRMesh.position.set(0.5, 0.2, 0);
        wingRMesh.rotation.y = -0.3;
        wingR.add(wingRMesh);
        floatingBody.add(wingR);

        // Magic Star Staff held in hand
        const staff = this.createWeapon('magicStaff');
        staff.position.set(0.65, 0.6, 0.2);
        floatingBody.add(staff);

        return {
            group,
            floatingBody,
            wingL,
            wingR
        };
    },

    // 5. CREATE SLIME MONSTER (Green, Blue, Gold Boss)
    createSlime(type = 'green') {
        const slimeGroup = new THREE.Group();

        let mat = this.materials.slimeGreen;
        let scale = 1.0;
        let maxHp = 80;
        let goldDrop = 35;
        let expDrop = 25;
        let atk = 18;

        if (type === 'blue') {
            mat = this.materials.slimeBlue;
            scale = 1.35;
            maxHp = 160;
            goldDrop = 75;
            expDrop = 55;
            atk = 26;
        } else if (type === 'gold') {
            mat = this.materials.slimeGold;
            scale = 1.65;
            maxHp = 380;
            goldDrop = 250;
            expDrop = 150;
            atk = 38;
        }

        // Dome / Gelatinous body
        const bodyGeo = new THREE.SphereGeometry(0.55, 14, 10);
        bodyGeo.scale(1, 0.75, 1);
        const body = new THREE.Mesh(bodyGeo, mat.clone());
        body.position.y = 0.38;
        body.castShadow = true;
        slimeGroup.add(body);

        // Cute Big Eyes
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
        const eyeGeo = new THREE.SphereGeometry(0.08, 8, 8);

        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(-0.18, 0.42, 0.44);
        slimeGroup.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.position.set(0.18, 0.42, 0.44);
        slimeGroup.add(rightEye);

        // Eye highlights
        const shineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const shineGeo = new THREE.SphereGeometry(0.03, 6, 6);

        const shineL = new THREE.Mesh(shineGeo, shineMat);
        shineL.position.set(-0.16, 0.45, 0.5);
        slimeGroup.add(shineL);

        const shineR = new THREE.Mesh(shineGeo, shineMat);
        shineR.position.set(0.2, 0.45, 0.5);
        slimeGroup.add(shineR);

        // Golden crown if King/Gold slime
        if (type === 'gold' || type === 'blue') {
            const crownGeo = new THREE.CylinderGeometry(0.2, 0.16, 0.18, 5);
            const crown = new THREE.Mesh(crownGeo, this.materials.gold);
            crown.position.y = 0.85;
            slimeGroup.add(crown);
        }

        slimeGroup.scale.set(scale, scale, scale);

        return {
            group: slimeGroup,
            body,
            type,
            scale,
            hp: maxHp,
            maxHp,
            atk,
            goldDrop,
            expDrop,
            alive: true,
            wobbleOffset: Math.random() * 10
        };
    },

    // 6. CREATE THE WEAPON SHOP (Timber house, porch, counters, weapon racks, banners)
    createWeaponShop() {
        const shopGroup = new THREE.Group();

        // Main Building House Block
        const houseWidth = 7.0;
        const houseHeight = 4.2;
        const houseDepth = 4.5;

        // Timber Walls
        const wallMat = new THREE.MeshLambertMaterial({ color: 0xd4a373 });
        const walls = new THREE.Mesh(new THREE.BoxGeometry(houseWidth, houseHeight, houseDepth), wallMat);
        walls.position.set(0, houseHeight / 2, 0);
        walls.castShadow = true;
        walls.receiveShadow = true;
        shopGroup.add(walls);

        // Wooden Framing Beams (Corners and horizontal beams)
        const beamMat = this.materials.woodDark;
        const beamW = 0.35;

        const leftBeam = new THREE.Mesh(new THREE.BoxGeometry(beamW, houseHeight + 0.1, beamW), beamMat);
        leftBeam.position.set(-houseWidth / 2, houseHeight / 2, houseDepth / 2);
        shopGroup.add(leftBeam);

        const rightBeam = new THREE.Mesh(new THREE.BoxGeometry(beamW, houseHeight + 0.1, beamW), beamMat);
        rightBeam.position.set(houseWidth / 2, houseHeight / 2, houseDepth / 2);
        shopGroup.add(rightBeam);

        // Pitched Roof with terracotta shingles
        const roofGroup = new THREE.Group();
        roofGroup.position.set(0, houseHeight, 0);
        shopGroup.add(roofGroup);

        const roofLeft = new THREE.Mesh(
            new THREE.BoxGeometry(houseWidth + 0.8, 0.3, houseDepth * 0.75),
            this.materials.roofTile
        );
        roofLeft.position.set(0, 1.1, -1.2);
        roofLeft.rotation.x = 0.65;
        roofLeft.castShadow = true;
        roofGroup.add(roofLeft);

        const roofRight = new THREE.Mesh(
            new THREE.BoxGeometry(houseWidth + 0.8, 0.3, houseDepth * 0.75),
            this.materials.roofTile
        );
        roofRight.position.set(0, 1.1, 1.2);
        roofRight.rotation.x = -0.65;
        roofRight.castShadow = true;
        roofGroup.add(roofRight);

        // Chimney
        const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.2, 0.8), this.materials.stone);
        chimney.position.set(-2.2, houseHeight + 1.2, -0.6);
        chimney.castShadow = true;
        shopGroup.add(chimney);

        // FRONT PORCH DECK & POSTS (Where Shopkeeper stands)
        const porchDepth = 2.8;
        const porchHeight = 0.5;
        const porchDeck = new THREE.Mesh(
            new THREE.BoxGeometry(houseWidth + 0.5, porchHeight, porchDepth),
            this.materials.woodDeck
        );
        porchDeck.position.set(0, porchHeight / 2, houseDepth / 2 + porchDepth / 2);
        porchDeck.receiveShadow = true;
        shopGroup.add(porchDeck);

        // Porch Wooden Posts
        const postGeo = new THREE.BoxGeometry(0.25, 3.2, 0.25);
        [-3.2, -1.2, 1.2, 3.2].forEach(posX => {
            const post = new THREE.Mesh(postGeo, this.materials.woodDark);
            post.position.set(posX, 1.6, houseDepth / 2 + porchDepth - 0.15);
            post.castShadow = true;
            shopGroup.add(post);
        });

        // Porch Canopy Awning
        const awningMat = new THREE.MeshLambertMaterial({ color: 0xbf360c });
        const awning = new THREE.Mesh(new THREE.BoxGeometry(houseWidth + 0.6, 0.18, porchDepth + 0.3), awningMat);
        awning.position.set(0, 3.2, houseDepth / 2 + porchDepth / 2);
        awning.rotation.x = 0.1;
        awning.castShadow = true;
        shopGroup.add(awning);

        // Big "WEAPON SHOP" Sign
        const signBoard = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.8, 0.12), this.materials.woodDark);
        signBoard.position.set(0, 3.8, houseDepth / 2 + porchDepth - 0.1);
        shopGroup.add(signBoard);

        // Create canvas texture for "WEAPON SHOP" text
        const signCanvas = document.createElement('canvas');
        signCanvas.width = 512;
        signCanvas.height = 128;
        const sctx = signCanvas.getContext('2d');
        sctx.fillStyle = '#633816';
        sctx.fillRect(0, 0, 512, 128);
        sctx.lineWidth = 10;
        sctx.strokeStyle = '#d4af37';
        sctx.strokeRect(8, 8, 496, 112);
        sctx.fillStyle = '#ffecb3';
        sctx.font = 'bold 44px sans-serif';
        sctx.textAlign = 'center';
        sctx.textBaseline = 'middle';
        sctx.fillText('⚔️ WEAPON SHOP', 256, 64);

        const signTexture = new THREE.CanvasTexture(signCanvas);
        const signTextPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(3.5, 0.75),
            new THREE.MeshBasicMaterial({ map: signTexture })
        );
        signTextPlane.position.set(0, 3.8, houseDepth / 2 + porchDepth - 0.02);
        shopGroup.add(signTextPlane);

        // Signboard: "BEST GEAR / BETTER ADVENTURE"
        const sideSignCanvas = document.createElement('canvas');
        sideSignCanvas.width = 256;
        sideSignCanvas.height = 320;
        const ssCtx = sideSignCanvas.getContext('2d');
        ssCtx.fillStyle = '#3a2010';
        ssCtx.fillRect(0, 0, 256, 320);
        ssCtx.strokeStyle = '#8a6035';
        ssCtx.lineWidth = 8;
        ssCtx.strokeRect(6, 6, 244, 308);
        ssCtx.fillStyle = '#ffdfa0';
        ssCtx.font = 'bold 22px monospace';
        ssCtx.textAlign = 'center';
        ssCtx.fillText('BEST GEAR', 128, 60);
        ssCtx.font = '16px monospace';
        ssCtx.fillStyle = '#ddccaa';
        ssCtx.fillText('★ BETTER GEAR', 128, 120);
        ssCtx.fillText('★ BETTER', 128, 160);
        ssCtx.fillText('  ADVENTURE', 128, 195);
        ssCtx.fillStyle = '#f59e0b';
        ssCtx.fillText('⚔️ 🛡️ 🏹', 128, 260);

        const sideSignTexture = new THREE.CanvasTexture(sideSignCanvas);
        const sideSignMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1.0, 1.3),
            new THREE.MeshBasicMaterial({ map: sideSignTexture })
        );
        sideSignMesh.position.set(-2.8, 1.4, houseDepth / 2 + porchDepth - 0.05);
        shopGroup.add(sideSignMesh);

        // Shopkeeper Counter Table on Porch
        const counterTable = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 0.9, 0.7),
            this.materials.woodLight
        );
        counterTable.position.set(0.8, 0.95, houseDepth / 2 + 1.2);
        counterTable.castShadow = true;
        counterTable.receiveShadow = true;
        shopGroup.add(counterTable);

        // Miniature Display Swords resting on counter
        const displaySword1 = this.createWeapon('woodenSword');
        displaySword1.scale.set(0.6, 0.6, 0.6);
        displaySword1.rotation.set(Math.PI / 2, 0, 0.4);
        displaySword1.position.set(0.2, 1.45, houseDepth / 2 + 1.2);
        shopGroup.add(displaySword1);

        const displaySword2 = this.createWeapon('ironSword');
        displaySword2.scale.set(0.55, 0.55, 0.55);
        displaySword2.rotation.set(Math.PI / 2, 0, -0.3);
        displaySword2.position.set(1.4, 1.45, houseDepth / 2 + 1.2);
        shopGroup.add(displaySword2);

        // Wall Weapon Display Racks (Behind counter on porch wall)
        const wallRack = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.6, 0.15), this.materials.woodDark);
        wallRack.position.set(0.8, 2.2, houseDepth / 2 + 0.1);
        shopGroup.add(wallRack);

        // Mounted weapons on rack
        const mountedSword1 = this.createWeapon('ironSword');
        mountedSword1.scale.set(0.6, 0.6, 0.6);
        mountedSword1.position.set(0.2, 2.2, houseDepth / 2 + 0.25);
        mountedSword1.rotation.z = 0.2;
        shopGroup.add(mountedSword1);

        const mountedAxe = this.createWeapon('ironAxe');
        mountedAxe.scale.set(0.55, 0.55, 0.55);
        mountedAxe.position.set(0.9, 2.2, houseDepth / 2 + 0.25);
        mountedAxe.rotation.z = -0.3;
        shopGroup.add(mountedAxe);

        const mountedStaff = this.createWeapon('magicStaff');
        mountedStaff.scale.set(0.5, 0.5, 0.5);
        mountedStaff.position.set(1.6, 2.2, houseDepth / 2 + 0.25);
        shopGroup.add(mountedStaff);

        // Barrels with handles on porch left side
        const barrelMat = this.materials.woodDark;
        const barrelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 8);
        const barrel1 = new THREE.Mesh(barrelGeo, barrelMat);
        barrel1.position.set(-1.8, 0.9, houseDepth / 2 + 0.9);
        shopGroup.add(barrel1);

        const barrel2 = new THREE.Mesh(barrelGeo, barrelMat);
        barrel2.position.set(-2.4, 0.9, houseDepth / 2 + 1.2);
        shopGroup.add(barrel2);

        // Steps down from porch
        const step1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 0.6), this.materials.woodDeck);
        step1.position.set(0.8, 0.125, houseDepth / 2 + porchDepth + 0.3);
        step1.receiveShadow = true;
        shopGroup.add(step1);

        return shopGroup;
    },

    // 7. CREATE FANTASY ENVIRONMENT OBJECTS (Trees, flowers, fences, rocks)
    createTree() {
        const treeGroup = new THREE.Group();

        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.3, 0.45, 2.2, 7);
        const trunk = new THREE.Mesh(trunkGeo, this.materials.treeTrunk);
        trunk.position.y = 1.1;
        trunk.castShadow = true;
        treeGroup.add(trunk);

        // Foliage (Stacked conical/polyhedral clusters)
        const leafMat = this.materials.treeLeaves;
        const foliage1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.0, 7), leafMat);
        foliage1.position.y = 2.4;
        foliage1.castShadow = true;
        treeGroup.add(foliage1);

        const foliage2 = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.8, 7), leafMat);
        foliage2.position.y = 3.4;
        foliage2.castShadow = true;
        treeGroup.add(foliage2);

        const foliage3 = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.4, 7), leafMat);
        foliage3.position.y = 4.3;
        foliage3.castShadow = true;
        treeGroup.add(foliage3);

        return treeGroup;
    },

    createFlowerCluster(colorHex = 0xffdf00) {
        const cluster = new THREE.Group();
        const flowerMat = new THREE.MeshLambertMaterial({ color: colorHex });
        const stemMat = new THREE.MeshLambertMaterial({ color: 0x2d6a4f });

        for (let i = 0; i < 5; i++) {
            const f = new THREE.Group();
            const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 4), stemMat);
            stem.position.y = 0.15;
            f.add(stem);

            const petal = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), flowerMat);
            petal.position.y = 0.3;
            f.add(petal);

            f.position.set((Math.random() - 0.5) * 0.6, 0, (Math.random() - 0.5) * 0.6);
            cluster.add(f);
        }
        return cluster;
    },

    createWoodenFence() {
        const fenceGroup = new THREE.Group();
        const postMat = this.materials.woodDark;
        const railMat = this.materials.woodLight;

        // Posts
        const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 0.14), postMat);
        p1.position.set(-1.0, 0.5, 0);
        p1.castShadow = true;
        fenceGroup.add(p1);

        const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 0.14), postMat);
        p2.position.set(1.0, 0.5, 0);
        p2.castShadow = true;
        fenceGroup.add(p2);

        // Horizontal Rails
        const r1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.06), railMat);
        r1.position.set(0, 0.4, 0);
        fenceGroup.add(r1);

        const r2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.06), railMat);
        r2.position.set(0, 0.75, 0);
        fenceGroup.add(r2);

        return fenceGroup;
    },

    // 8. CREATE MAGIC PORTAL (Stone Arch with swirling vortex for zone traveling)
    createMagicPortal(colorHex = 0x9d4edd, label = 'PORTAL') {
        const portalGroup = new THREE.Group();

        // Stone Pillars (Left & Right)
        const stoneMat = this.materials.stone;
        const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.0, 0.7), stoneMat);
        p1.position.set(-1.8, 2.0, 0);
        p1.castShadow = true;
        portalGroup.add(p1);

        const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.0, 0.7), stoneMat);
        p2.position.set(1.8, 2.0, 0);
        p2.castShadow = true;
        portalGroup.add(p2);

        // Stone Arch Top
        const arch = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.7, 0.9), stoneMat);
        arch.position.set(0, 4.1, 0);
        arch.castShadow = true;
        portalGroup.add(arch);

        // Swirling Energy Vortex Plane
        const vortexGeo = new THREE.PlaneGeometry(3.0, 3.8);
        const vortexMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            emissive: colorHex,
            emissiveIntensity: 0.85,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
        });
        const vortex = new THREE.Mesh(vortexGeo, vortexMat);
        vortex.position.set(0, 2.0, 0);
        portalGroup.add(vortex);

        // Ground Glowing Runes Ring
        const ringGeo = new THREE.RingGeometry(1.6, 2.2, 16);
        const ringMat = new THREE.MeshBasicMaterial({
            color: colorHex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.05;
        portalGroup.add(ring);

        // Portal Signboard Banner
        const bannerGeo = new THREE.BoxGeometry(2.4, 0.5, 0.1);
        const bannerMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
        const banner = new THREE.Mesh(bannerGeo, bannerMat);
        banner.position.set(0, 4.7, 0);
        portalGroup.add(banner);

        return {
            group: portalGroup,
            vortex,
            ring
        };
    },

    // 9. CREATE GATHERABLE FANTASY MUSHROOM
    createGatherableMushroom(colorHex = 0xa855f7) {
        const shroomGroup = new THREE.Group();

        // Stem
        const stemGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.7, 8);
        const stemMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 0.35;
        shroomGroup.add(stem);

        // Glowing Cap
        const capGeo = new THREE.SphereGeometry(0.45, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const capMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            emissive: colorHex,
            emissiveIntensity: 0.75,
            roughness: 0.3
        });
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.y = 0.65;
        cap.castShadow = true;
        shroomGroup.add(cap);

        // Little white spots on cap
        for (let i = 0; i < 4; i++) {
            const spot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 4, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            const a = (i / 4) * Math.PI * 2;
            spot.position.set(Math.cos(a) * 0.32, 0.8, Math.sin(a) * 0.32);
            shroomGroup.add(spot);
        }

        return shroomGroup;
    },

    // 10. CREATE TREASURE CHEST (Opens upon interaction)
    createTreasureChest() {
        const chestGroup = new THREE.Group();

        // Base box
        const baseGeo = new THREE.BoxGeometry(1.2, 0.6, 0.8);
        const chestMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
        const base = new THREE.Mesh(baseGeo, chestMat);
        base.position.y = 0.3;
        base.castShadow = true;
        chestGroup.add(base);

        // Gold Trim
        const trim = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.12, 0.84), this.materials.gold);
        trim.position.y = 0.55;
        chestGroup.add(trim);

        // Lid (Hinged at the back)
        const lidPivot = new THREE.Group();
        lidPivot.position.set(0, 0.6, -0.4);
        chestGroup.add(lidPivot);

        const lidGeo = new THREE.CylinderGeometry(0.42, 0.42, 1.2, 8, 1, false, 0, Math.PI);
        const lid = new THREE.Mesh(lidGeo, chestMat);
        lid.rotation.z = Math.PI / 2;
        lid.position.set(0, 0, 0.4);
        lid.castShadow = true;
        lidPivot.add(lid);

        // Lock
        const lock = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, 0.1), this.materials.gold);
        lock.position.set(0, 0, 0.82);
        lidPivot.add(lock);

        return {
            group: chestGroup,
            lidPivot,
            opened: false
        };
    },

    // 11. CREATE GOBLIN WARRIOR (Green skin, spiked club, aggressive stance)
    createGoblin() {
        const group = new THREE.Group();
        const goblinSkin = new THREE.MeshLambertMaterial({ color: 0x55a630 });
        const clothMat = new THREE.MeshLambertMaterial({ color: 0x4a3219 });

        // Torso
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 0.45), goblinSkin);
        torso.position.y = 0.8;
        torso.castShadow = true;
        group.add(torso);

        // Loincloth
        const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.5), clothMat);
        cloth.position.y = 0.55;
        group.add(cloth);

        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 0.6), goblinSkin);
        head.position.y = 1.35;
        head.castShadow = true;
        group.add(head);

        // Big Pointy Goblin Ears
        const earGeo = new THREE.ConeGeometry(0.18, 0.65, 4);
        earGeo.rotateZ(Math.PI / 3);

        const earL = new THREE.Mesh(earGeo, goblinSkin);
        earL.position.set(-0.55, 1.35, 0);
        group.add(earL);

        const earR = new THREE.Mesh(earGeo, goblinSkin);
        earR.position.set(0.55, 1.35, 0);
        earR.rotation.z = Math.PI;
        group.add(earR);

        // Red glowing eyes
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0033 });
        const eyeL = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), eyeMat);
        eyeL.position.set(-0.18, 1.35, 0.31);
        group.add(eyeL);

        const eyeR = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), eyeMat);
        eyeR.position.set(0.18, 1.35, 0.31);
        group.add(eyeR);

        // Spiked Club in Hand
        const club = new THREE.Group();
        const woodHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 1.1, 6), this.materials.woodDark);
        woodHandle.position.y = 0.4;
        club.add(woodHandle);

        const clubHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6), this.materials.woodDark);
        clubHead.position.y = 0.9;
        club.add(clubHead);

        club.position.set(0.48, 0.6, 0.2);
        group.add(club);

        // Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.5, 0.22), goblinSkin);
        legL.position.set(-0.2, 0.25, 0);
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.5, 0.22), goblinSkin);
        legR.position.set(0.2, 0.25, 0);
        group.add(legR);

        return {
            group,
            type: 'goblin',
            hp: 85,
            maxHp: 85,
            atk: 14,
            speed: 3.8,
            goldDrop: 65,
            expDrop: 45,
            alive: true
        };
    },

    // 12. CREATE SKELETON KNIGHT
    createSkeleton() {
        const group = new THREE.Group();
        const boneMat = new THREE.MeshLambertMaterial({ color: 0xdedbd2 });

        // Ribcage
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.75, 0.35), boneMat);
        rib.position.y = 0.9;
        rib.castShadow = true;
        group.add(rib);

        // Skull
        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), boneMat);
        skull.position.y = 1.55;
        skull.castShadow = true;
        group.add(skull);

        // Blue spectral eye glow
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const eyeL = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), eyeMat);
        eyeL.position.set(-0.16, 1.55, 0.33);
        group.add(eyeL);

        const eyeR = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), eyeMat);
        eyeR.position.set(0.16, 1.55, 0.33);
        group.add(eyeR);

        // Rusted Sword
        const sword = this.createWeapon('ironSword');
        sword.position.set(0.5, 0.7, 0.2);
        group.add(sword);

        // Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.18), boneMat);
        legL.position.set(-0.2, 0.32, 0);
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.18), boneMat);
        legR.position.set(0.2, 0.32, 0);
        group.add(legR);

        return {
            group,
            type: 'skeleton',
            hp: 120,
            maxHp: 120,
            atk: 20,
            speed: 3.2,
            goldDrop: 100,
            expDrop: 70,
            alive: true
        };
    },

    // 13. CREATE ANCIENT CRIMSON DRAGON BOSS
    createDragonBoss() {
        const group = new THREE.Group();
        const dragonScale = new THREE.MeshStandardMaterial({
            color: 0x990011,
            roughness: 0.4,
            metalness: 0.2
        });
        const underbelly = new THREE.MeshStandardMaterial({
            color: 0xca6702,
            roughness: 0.5
        });
        const hornMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });

        // Massive Dragon Torso
        const bodyGeo = new THREE.ConeGeometry(1.6, 3.8, 8);
        bodyGeo.rotateX(Math.PI / 2);
        const body = new THREE.Mesh(bodyGeo, dragonScale);
        body.position.set(0, 2.2, 0);
        body.castShadow = true;
        group.add(body);

        // Dragon Neck & Fierce Head
        const neckGeo = new THREE.CylinderGeometry(0.7, 1.1, 1.8, 8);
        neckGeo.rotateX(-Math.PI / 4);
        const neck = new THREE.Mesh(neckGeo, dragonScale);
        neck.position.set(0, 3.2, 1.4);
        group.add(neck);

        const headGroup = new THREE.Group();
        headGroup.position.set(0, 4.0, 2.4);
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 2.0), dragonScale);
        head.castShadow = true;
        headGroup.add(head);

        // Dragon Snout Jaw (Movable for fire breath!)
        const jaw = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), underbelly);
        jaw.position.set(0, -0.4, 0.6);
        headGroup.add(jaw);

        // Blazing Fire Glow inside throat
        const throatFireMat = new THREE.MeshBasicMaterial({ color: 0xff3b00, transparent: true, opacity: 0 });
        const throatGlow = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 8), throatFireMat);
        throatGlow.position.set(0, -0.15, 0.9);
        headGroup.add(throatGlow);

        // Fire Breath Anchor Socket
        const fireSocket = new THREE.Group();
        fireSocket.position.set(0, -0.2, 1.6);
        headGroup.add(fireSocket);

        // Blazing Fiery Eyes
        const fireEyeMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
        const eyeL = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.15), fireEyeMat);
        eyeL.position.set(-0.71, 0.15, 0.4);
        eyeL.rotation.y = -Math.PI / 2;
        headGroup.add(eyeL);

        const eyeR = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.15), fireEyeMat);
        eyeR.position.set(0.71, 0.15, 0.4);
        eyeR.rotation.y = Math.PI / 2;
        headGroup.add(eyeR);

        // Grand Curved Dragon Horns
        const hornGeo = new THREE.ConeGeometry(0.22, 1.8, 6);
        hornGeo.rotateX(-0.5);

        const hornL = new THREE.Mesh(hornGeo, hornMat);
        hornL.position.set(-0.6, 0.8, -0.6);
        hornL.rotation.z = -0.3;
        headGroup.add(hornL);

        const hornR = new THREE.Mesh(hornGeo, hornMat);
        hornR.position.set(0.6, 0.8, -0.6);
        hornR.rotation.z = 0.3;
        headGroup.add(hornR);

        // Giant Bat Dragon Wings
        const wingLGroup = new THREE.Group();
        wingLGroup.position.set(-1.2, 2.8, 0.4);
        group.add(wingLGroup);

        const wingL = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 3.2), new THREE.MeshStandardMaterial({
            color: 0x770011,
            side: THREE.DoubleSide
        }));
        wingL.position.set(-2.1, 0.6, 0);
        wingL.rotation.y = 0.2;
        wingLGroup.add(wingL);

        const wingRGroup = new THREE.Group();
        wingRGroup.position.set(1.2, 2.8, 0.4);
        group.add(wingRGroup);

        const wingR = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 3.2), new THREE.MeshStandardMaterial({
            color: 0x770011,
            side: THREE.DoubleSide
        }));
        wingR.position.set(2.1, 0.6, 0);
        wingR.rotation.y = -0.2;
        wingRGroup.add(wingR);

        // Long Spiked Dragon Tail
        const tailGeo = new THREE.CylinderGeometry(0.1, 0.6, 3.2, 8);
        tailGeo.rotateX(-Math.PI / 3);
        const tail = new THREE.Mesh(tailGeo, dragonScale);
        tail.position.set(0, 1.4, -2.5);
        group.add(tail);

        // Four Heavy Dragon Legs
        const legGeo = new THREE.CylinderGeometry(0.35, 0.5, 1.8, 8);
        const legFL = new THREE.Mesh(legGeo, dragonScale);
        legFL.position.set(-1.1, 0.9, 1.2);
        group.add(legFL);

        const legFR = new THREE.Mesh(legGeo, dragonScale);
        legFR.position.set(1.1, 0.9, 1.2);
        group.add(legFR);

        const legBL = new THREE.Mesh(legGeo, dragonScale);
        legBL.position.set(-1.2, 0.9, -1.2);
        group.add(legBL);

        const legBR = new THREE.Mesh(legGeo, dragonScale);
        legBR.position.set(1.2, 0.9, -1.2);
        group.add(legBR);

        // Truly Massive Epic Boss Scale
        group.scale.set(1.85, 1.85, 1.85);

        return {
            group,
            type: 'dragon_boss',
            name: 'Ancient Crimson Dragon',
            headGroup,
            jaw,
            throatGlow,
            throatFireMat,
            fireSocket,
            wingLGroup,
            wingRGroup,
            tail,
            hp: 2800,
            maxHp: 2800,
            atk: 52,
            speed: 3.2,
            goldDrop: 3500,
            expDrop: 4000,
            alive: true,
            isBoss: true
        };
    },

    // 14. ENVIRONMENT OBJECTS: Dungeon Pillar, Brazier, Volcanic Rocks
    createDungeonPillar() {
        const pillar = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 5.0, 1.2),
            new THREE.MeshLambertMaterial({ color: 0x475569 })
        );
        pillar.position.y = 2.5;
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        return pillar;
    },

    createBrazier() {
        const brazier = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 1.2, 8), new THREE.MeshLambertMaterial({ color: 0x1e293b }));
        base.position.y = 0.6;
        brazier.add(base);

        const fire = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 6), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
        fire.position.y = 1.4;
        brazier.add(fire);

        return brazier;
    },

    createVolcanoRock() {
        const rock = new THREE.Mesh(
            new THREE.DodecahedronGeometry(1.4, 1),
            new THREE.MeshLambertMaterial({ color: 0x262626 })
        );
        rock.position.y = 0.7;
        rock.castShadow = true;
        return rock;
    },

    // 15. WINDMILL (With rotating 4-blade sails)
    createWindmill() {
        const group = new THREE.Group();
        const stoneMat = this.materials.stone;
        const woodMat = this.materials.woodDark;

        // Tapered Octagonal Tower Body
        const towerGeo = new THREE.CylinderGeometry(2.4, 3.6, 9.0, 8);
        const tower = new THREE.Mesh(towerGeo, stoneMat);
        tower.position.y = 4.5;
        tower.castShadow = true;
        group.add(tower);

        // Conical Roof
        const roofGeo = new THREE.ConeGeometry(3.0, 2.8, 8);
        const roof = new THREE.Mesh(roofGeo, this.materials.roofTile);
        roof.position.y = 10.4;
        roof.castShadow = true;
        group.add(roof);

        // Sail Axle Hub
        const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.8, 8), woodMat);
        axle.rotation.x = Math.PI / 2;
        axle.position.set(0, 8.2, 2.7);
        group.add(axle);

        // Rotating Sails Pivot
        const sailsPivot = new THREE.Group();
        sailsPivot.position.set(0, 8.2, 3.1);
        group.add(sailsPivot);

        const sailMat = new THREE.MeshLambertMaterial({ color: 0xfdf0d5, side: THREE.DoubleSide });
        for (let i = 0; i < 4; i++) {
            const sailArm = new THREE.Group();
            sailArm.rotation.z = (i * Math.PI) / 2;

            const woodBeam = new THREE.Mesh(new THREE.BoxGeometry(0.12, 5.0, 0.12), woodMat);
            woodBeam.position.y = 2.5;
            sailArm.add(woodBeam);

            const sailFabric = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 3.8), sailMat);
            sailFabric.position.set(0.48, 2.6, 0.02);
            sailArm.add(sailFabric);

            sailsPivot.add(sailArm);
        }

        return {
            group,
            sailsPivot
        };
    },

    // 16. WATER FOUNTAIN (Octagonal stone basin with animated water spray)
    createWaterFountain() {
        const group = new THREE.Group();
        const stoneMat = this.materials.stone;

        // Basin Wall
        const basin = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.5, 0.8, 8), stoneMat);
        basin.position.y = 0.4;
        basin.castShadow = true;
        group.add(basin);

        // Water Pool
        const waterMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.1,
            metalness: 0.1,
            transparent: true,
            opacity: 0.85
        });
        const pool = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 0.1, 8), waterMat);
        pool.position.y = 0.65;
        group.add(pool);

        // Center Pedestal & Tier
        const centerPed = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 2.0, 8), stoneMat);
        centerPed.position.y = 1.2;
        group.add(centerPed);

        const upperBowl = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.4, 0.5, 8), stoneMat);
        upperBowl.position.y = 2.2;
        group.add(upperBowl);

        // Spout Sphere
        const spout = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), this.materials.gold);
        spout.position.y = 2.6;
        group.add(spout);

        return group;
    },

    // 17. BLACKSMITH FORGE & ANVIL
    createBlacksmithForge() {
        const group = new THREE.Group();
        const stoneMat = this.materials.stone;

        // Brick Forge Furnace
        const furnace = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 1.8), stoneMat);
        furnace.position.set(0, 1.1, 0);
        furnace.castShadow = true;
        group.add(furnace);

        // Chimney
        const chimney = new THREE.Mesh(new THREE.BoxGeometry(1.0, 3.5, 1.0), stoneMat);
        chimney.position.set(0, 3.2, -0.3);
        group.add(chimney);

        // Glowing Coals Hearth
        const coals = new THREE.Mesh(
            new THREE.BoxGeometry(1.4, 0.4, 0.8),
            new THREE.MeshStandardMaterial({
                color: 0xff3b00,
                emissive: 0xff4500,
                emissiveIntensity: 0.95
            })
        );
        coals.position.set(0, 1.3, 0.6);
        group.add(coals);

        // Steel Anvil
        const anvilGroup = new THREE.Group();
        anvilGroup.position.set(2.4, 0, 0.8);
        const anvilBase = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.7, 8), this.materials.woodDark);
        anvilBase.position.y = 0.35;
        anvilGroup.add(anvilBase);

        const anvilSteel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.4), this.materials.steel);
        anvilSteel.position.y = 0.85;
        anvilGroup.add(anvilSteel);

        // Small steel hammer on anvil
        const hammer = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.35), this.materials.steel);
        hammer.position.set(0, 1.08, 0);
        hammer.rotation.y = 0.4;
        anvilGroup.add(hammer);

        group.add(anvilGroup);

        return group;
    },

    // 18. TAVERN / COZY INN (2-Story timber building with warm lights)
    createTavern() {
        const group = new THREE.Group();
        const wallMat = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });
        const roofMat = new THREE.MeshLambertMaterial({ color: 0x993322 });

        // First Floor
        const f1 = new THREE.Mesh(new THREE.BoxGeometry(7.5, 3.6, 5.5), wallMat);
        f1.position.y = 1.8;
        f1.castShadow = true;
        group.add(f1);

        // Second Floor
        const f2 = new THREE.Mesh(new THREE.BoxGeometry(8.0, 3.2, 6.0), wallMat);
        f2.position.y = 4.8;
        f2.castShadow = true;
        group.add(f2);

        // Pitched Roof
        const roofL = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.3, 4.0), roofMat);
        roofL.position.set(0, 7.3, -1.5);
        roofL.rotation.x = 0.7;
        roofL.castShadow = true;
        group.add(roofL);

        const roofR = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.3, 4.0), roofMat);
        roofR.position.set(0, 7.3, 1.5);
        roofR.rotation.x = -0.7;
        roofR.castShadow = true;
        group.add(roofR);

        // Tavern Sign
        const signCanvas = document.createElement('canvas');
        signCanvas.width = 256; signCanvas.height = 96;
        const sctx = signCanvas.getContext('2d');
        sctx.fillStyle = '#4a2511'; sctx.fillRect(0,0,256,96);
        sctx.strokeStyle = '#ffd166'; sctx.lineWidth = 6; sctx.strokeRect(4,4,248,88);
        sctx.fillStyle = '#ffeedd'; sctx.font = 'bold 30px monospace'; sctx.textAlign = 'center'; sctx.textBaseline = 'middle';
        sctx.fillText('🍺 TAVERN', 128, 48);

        const signMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2.2, 0.8),
            new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(signCanvas) })
        );
        signMesh.position.set(0, 3.2, 2.8);
        group.add(signMesh);

        return group;
    },

    // 19. MARKET STALL (Fruit / Potion stall with striped awning)
    createMarketStall(type = 'fruit') {
        const group = new THREE.Group();
        const woodMat = this.materials.woodLight;

        // Wooden Table Counter
        const table = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.2), woodMat);
        table.position.y = 0.45;
        table.castShadow = true;
        group.add(table);

        // Canopy Posts
        const postGeo = new THREE.BoxGeometry(0.1, 2.2, 0.1);
        [-1.1, 1.1].forEach(x => {
            [-0.5, 0.5].forEach(z => {
                const p = new THREE.Mesh(postGeo, this.materials.woodDark);
                p.position.set(x, 1.5, z);
                group.add(p);
            });
        });

        // Striped Awning
        const awningMat = new THREE.MeshLambertMaterial({
            color: type === 'fruit' ? 0xe63946 : 0x2a9d8f,
            side: THREE.DoubleSide
        });
        const awning = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.6), awningMat);
        awning.position.set(0, 2.5, 0);
        awning.rotation.x = 0.15;
        group.add(awning);

        // Goods on display
        if (type === 'fruit') {
            for (let i = 0; i < 6; i++) {
                const apple = new THREE.Mesh(
                    new THREE.SphereGeometry(0.12, 6, 6),
                    new THREE.MeshLambertMaterial({ color: i % 2 === 0 ? 0xef4444 : 0xf59e0b })
                );
                apple.position.set(-0.7 + (i % 3) * 0.5, 0.98, -0.2 + Math.floor(i / 3) * 0.4);
                group.add(apple);
            }
        } else {
            for (let i = 0; i < 4; i++) {
                const potion = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.08, 0.12, 0.32, 6),
                    new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x06b6d4 : 0xa855f7, roughness: 0.2 })
                );
                potion.position.set(-0.6 + i * 0.4, 1.05, 0);
                group.add(potion);
            }
        }

        return group;
    },

    // 20. VILLAGE ROYAL GUARD (Knight in polished armor with spear and shield)
    createVillageGuard() {
        const group = new THREE.Group();
        const armorMat = this.materials.steel;

        // Torso & Armor
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.95, 0.5), armorMat);
        torso.position.y = 1.4;
        torso.castShadow = true;
        group.add(torso);

        // Knight Helm
        const headGroup = new THREE.Group();
        headGroup.position.y = 2.15;
        group.add(headGroup);

        const helm = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), armorMat);
        headGroup.add(helm);

        // Red Plume
        const plume = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.8), new THREE.MeshLambertMaterial({ color: 0xef4444 }));
        plume.position.set(0, 0.5, -0.1);
        headGroup.add(plume);

        // Steel Spear in Right Hand
        const spear = new THREE.Group();
        spear.position.set(0.65, 1.2, 0.1);
        const spearPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 6), this.materials.woodDark);
        spearPole.position.y = 0.8;
        spear.add(spearPole);
        const spearTip = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.5, 4), this.materials.steel);
        spearTip.position.y = 2.6;
        spear.add(spearTip);
        group.add(spear);

        // Kite Shield in Left Hand
        const shield = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.4, 0.8), this.materials.gold);
        shield.position.set(-0.65, 1.4, 0.2);
        group.add(shield);

        // Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.9, 0.26), armorMat);
        legL.position.set(-0.22, 0.45, 0);
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.9, 0.26), armorMat);
        legR.position.set(0.22, 0.45, 0);
        group.add(legR);

        return {
            group,
            headGroup,
            legL,
            legR,
            patrolDir: 1
        };
    },

    // 21. VILLAGE ELDER (Wise elder with white beard, maroon robe, and walking staff)
    createVillageElder() {
        const group = new THREE.Group();
        const robeMat = new THREE.MeshLambertMaterial({ color: 0x581c87 });

        // Robe
        const robe = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.5, 8), robeMat);
        robe.position.y = 0.75;
        robe.castShadow = true;
        group.add(robe);

        // Head Group
        const headGroup = new THREE.Group();
        headGroup.position.y = 1.7;
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), this.materials.skin);
        headGroup.add(head);

        // Long White Beard
        const beard = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 6), new THREE.MeshLambertMaterial({ color: 0xffffff }));
        beard.position.set(0, -0.4, 0.3);
        beard.rotation.x = 0.3;
        headGroup.add(beard);

        // Walking Staff
        const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 6), this.materials.woodDark);
        staff.position.set(0.65, 0.9, 0.2);
        group.add(staff);

        return {
            group,
            headGroup
        };
    },

    // 22. VILLAGE DOG (Animated pet with wagging tail and head bobbing)
    createVillageDog() {
        const group = new THREE.Group();
        const furMat = new THREE.MeshLambertMaterial({ color: 0xb45309 });
        const creamMat = new THREE.MeshLambertMaterial({ color: 0xfef3c7 });

        // Body
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.9), furMat);
        body.position.y = 0.45;
        body.castShadow = true;
        group.add(body);

        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.45), furMat);
        head.position.set(0, 0.75, 0.5);
        group.add(head);

        // Snout
        const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.28), creamMat);
        snout.position.set(0, 0.68, 0.75);
        group.add(snout);

        // Floppy Ears
        const earL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.25, 0.15), furMat);
        earL.position.set(-0.22, 0.75, 0.45);
        group.add(earL);

        const earR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.25, 0.15), furMat);
        earR.position.set(0.22, 0.75, 0.45);
        group.add(earR);

        // Animated Tail
        const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 4), furMat);
        tail.position.set(0, 0.65, -0.55);
        tail.rotation.x = 0.8;
        group.add(tail);

        // 4 Legs
        const legGeo = new THREE.BoxGeometry(0.14, 0.35, 0.14);
        [[-0.2, 0.3], [0.2, 0.3], [-0.2, -0.3], [0.2, -0.3]].forEach(pos => {
            const leg = new THREE.Mesh(legGeo, furMat);
            leg.position.set(pos[0], 0.18, pos[1]);
            group.add(leg);
        });

        return {
            group,
            tail
        };
    },

    // 23. WOODEN BRIDGE
    createWoodenBridge() {
        const group = new THREE.Group();
        const plankMat = this.materials.woodDeck;
        const beamMat = this.materials.woodDark;

        // Bridge Deck Planks
        const deck = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.25, 10.0), plankMat);
        deck.position.y = 0.5;
        deck.receiveShadow = true;
        group.add(deck);

        // Sloping Approach Ramps at both ends (connecting ground y=0 to bridge deck y=0.5)
        [-5.6, 5.6].forEach((z, idx) => {
            const ramp = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.22, 1.4), plankMat);
            ramp.position.set(0, 0.25, z);
            ramp.rotation.x = idx === 0 ? 0.32 : -0.32;
            ramp.receiveShadow = true;
            group.add(ramp);
        });

        // Bridge Submerged Foundation Support Pilings into Riverbed
        [-2.0, 2.0].forEach(x => {
            [-3.5, 0, 3.5].forEach(z => {
                const pile = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.8, 8), beamMat);
                pile.position.set(x, -0.4, z);
                pile.castShadow = true;
                group.add(pile);
            });
        });

        // Bridge Handrails
        [-2.4, 2.4].forEach(x => {
            const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 10.0), beamMat);
            rail.position.set(x, 1.4, 0);
            group.add(rail);

            for (let z = -4.5; z <= 4.5; z += 1.8) {
                const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 0.14), beamMat);
                post.position.set(x, 0.9, z);
                group.add(post);
            }
        });

        return group;
    },

    // 24. STREET LANTERN POST (Warm glowing lantern)
    createStreetLantern() {
        const group = new THREE.Group();
        const ironMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });

        // Iron Post
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 3.2, 6), ironMat);
        post.position.y = 1.6;
        post.castShadow = true;
        group.add(post);

        // Arm
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.08), ironMat);
        arm.position.set(0.35, 3.1, 0);
        group.add(arm);

        // Glowing Glass Lantern
        const lantern = new THREE.Mesh(
            new THREE.BoxGeometry(0.35, 0.45, 0.35),
            new THREE.MeshStandardMaterial({
                color: 0xfef08a,
                emissive: 0xf59e0b,
                emissiveIntensity: 0.9
            })
        );
        lantern.position.set(0.65, 2.8, 0);
        group.add(lantern);

        return group;
    },

    // 25. GOLD TREASURE HOARD (Glittering gold coin mounds & gems)
    createGoldHoard() {
        const group = new THREE.Group();

        // Gold Coin Pile Base
        const mound = new THREE.Mesh(
            new THREE.ConeGeometry(2.6, 1.2, 12),
            this.materials.gold
        );
        mound.position.y = 0.6;
        group.add(mound);

        // Sparkle Gems
        const gemColors = [0xef4444, 0x3b82f6, 0x10b981, 0xa855f7];
        for (let i = 0; i < 8; i++) {
            const gem = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.18),
                new THREE.MeshStandardMaterial({
                    color: gemColors[i % gemColors.length],
                    roughness: 0.1,
                    metalness: 0.8
                })
            );
            const a = (i / 8) * Math.PI * 2;
            gem.position.set(Math.cos(a) * 1.5, 0.4 + Math.random() * 0.4, Math.sin(a) * 1.5);
            group.add(gem);
        }

        return group;
    },

    // 26. RESIDENTIAL MEDIEVAL HOUSE (Timber, Windows, Chimney)
    createResidentialHouse(roofColor = 0xb91c1c) {
        const group = new THREE.Group();
        const wallMat = new THREE.MeshLambertMaterial({ color: 0xe2d4b7 });
        const beamMat = this.materials.woodDark;
        const roofMat = new THREE.MeshLambertMaterial({ color: roofColor });

        // First Floor
        const f1 = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.2, 5.0), wallMat);
        f1.position.y = 1.6;
        f1.castShadow = true;
        group.add(f1);

        // Corner timber framing
        [[-3.2, -2.4], [3.2, -2.4], [-3.2, 2.4], [3.2, 2.4]].forEach(p => {
            const beam = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.2, 0.3), beamMat);
            beam.position.set(p[0], 1.6, p[1]);
            group.add(beam);
        });

        // Pitched Roof
        const roofL = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.25, 3.4), roofMat);
        roofL.position.set(0, 4.2, -1.2);
        roofL.rotation.x = 0.68;
        roofL.castShadow = true;
        group.add(roofL);

        const roofR = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.25, 3.4), roofMat);
        roofR.position.set(0, 4.2, 1.2);
        roofR.rotation.x = -0.68;
        roofR.castShadow = true;
        group.add(roofR);

        // Warm Glowing Windows
        const winMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
        const winF = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), winMat);
        winF.position.set(1.5, 1.8, 2.52);
        group.add(winF);

        // Wooden Door
        const door = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.0), this.materials.woodDark);
        door.position.set(-1.2, 1.0, 2.52);
        group.add(door);

        // Stone Chimney
        const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.6, 0.8), this.materials.stone);
        chimney.position.set(2.0, 4.2, -1.2);
        chimney.castShadow = true;
        group.add(chimney);

        return {
            group,
            chimneyPos: new THREE.Vector3(2.0, 5.5, -1.2)
        };
    },

    // 27. GOLDEN WHEAT FIELD
    createWheatField() {
        const group = new THREE.Group();
        const wheatMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });

        // Cluster of golden wheat stalks
        const stalkGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 4);
        for (let i = 0; i < 28; i++) {
            const stalk = new THREE.Mesh(stalkGeo, wheatMat);
            stalk.position.set((Math.random() - 0.5) * 4.5, 0.6, (Math.random() - 0.5) * 4.5);
            stalk.rotation.z = (Math.random() - 0.5) * 0.25;
            group.add(stalk);
        }

        return group;
    },

    // 28. HAY BALE
    createHayBale() {
        const group = new THREE.Group();
        const hayMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
        const bale = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.4, 8), hayMat);
        bale.rotation.z = Math.PI / 2;
        bale.position.y = 0.7;
        bale.castShadow = true;
        group.add(bale);
        return group;
    },

    // 29. RIVERSIDE DOCK & ROWBOAT
    createPierAndBoat() {
        const group = new THREE.Group();
        const woodMat = this.materials.woodDeck;

        // Wooden Boardwalk Pier into water
        const pier = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.3, 8.0), woodMat);
        pier.position.set(0, 0.25, 4.0);
        pier.receiveShadow = true;
        group.add(pier);

        // Wooden Mooring Posts
        [-1.6, 1.6].forEach(x => {
            const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 6), this.materials.woodDark);
            post.position.set(x, 0.6, 7.8);
            group.add(post);
        });

        // Moored Wooden Rowboat
        const boat = new THREE.Group();
        boat.position.set(3.2, -0.1, 6.0);
        boat.rotation.y = 0.2;

        const hull = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 3.8), this.materials.woodDark);
        boat.add(hull);

        const seat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 0.6), woodMat);
        seat.position.y = 0.2;
        boat.add(seat);

        group.add(boat);
        return group;
    },

    // 30. ARCHERY TARGET
    createArcheryTarget() {
        const group = new THREE.Group();
        const strawMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
        const target = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.2, 12), strawMat);
        target.rotation.x = Math.PI / 2;
        target.position.y = 1.4;
        target.castShadow = true;
        group.add(target);

        // Legs
        const legMat = this.materials.woodDark;
        const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 4), legMat);
        leg1.position.set(-0.5, 0.8, -0.3);
        leg1.rotation.z = -0.3;
        group.add(leg1);

        const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 4), legMat);
        leg2.position.set(0.5, 0.8, -0.3);
        leg2.rotation.z = 0.3;
        group.add(leg2);

        return group;
    },

    // 31. CAMPFIRE WITH STONES & COALS
    createCampfire() {
        const group = new THREE.Group();

        // Stone Ring
        for (let i = 0; i < 8; i++) {
            const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25), this.materials.stone);
            const a = (i / 8) * Math.PI * 2;
            stone.position.set(Math.cos(a) * 0.9, 0.15, Math.sin(a) * 0.9);
            group.add(stone);
        }

        // Crossed Firewood Logs
        const logMat = this.materials.woodDark;
        const log1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 6), logMat);
        log1.rotation.z = Math.PI / 4;
        log1.position.y = 0.25;
        group.add(log1);

        const log2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 6), logMat);
        log2.rotation.x = Math.PI / 4;
        log2.position.y = 0.25;
        group.add(log2);

        // Blazing Flame Cone
        const flame = new THREE.Mesh(
            new THREE.ConeGeometry(0.45, 0.9, 6),
            new THREE.MeshBasicMaterial({ color: 0xf97316 })
        );
        flame.position.y = 0.65;
        group.add(flame);

        return group;
    },

    // 32. ROAMING LIVELY VILLAGER (Farmer, Maid, Adventurer, Kid)
    createRoamingVillager(role = 'farmer') {
        const group = new THREE.Group();
        let clothesColor = 0x2563eb;
        if (role === 'farmer') clothesColor = 0x854d0e;
        if (role === 'maid') clothesColor = 0xd97706;
        if (role === 'kid') clothesColor = 0x059669;

        const scale = role === 'kid' ? 0.65 : 0.9;

        // Body
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.8, 0.4), new THREE.MeshLambertMaterial({ color: clothesColor }));
        torso.position.y = 1.1;
        torso.castShadow = true;
        group.add(torso);

        // Head Group
        const headGroup = new THREE.Group();
        headGroup.position.y = 1.8;
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), this.materials.skin);
        headGroup.add(head);

        // Hair / Hat
        if (role === 'farmer') {
            const strawHat = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.1, 8), new THREE.MeshLambertMaterial({ color: 0xfef08a }));
            strawHat.position.y = 0.42;
            headGroup.add(strawHat);
        } else {
            const hair = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.35, 0.7), this.materials.woodDark);
            hair.position.y = 0.35;
            headGroup.add(hair);
        }

        // Legs
        const legMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), legMat);
        legL.position.set(-0.2, 0.38, 0);
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), legMat);
        legR.position.set(0.2, 0.38, 0);
        group.add(legR);

        group.scale.set(scale, scale, scale);

        return {
            group,
            headGroup,
            legL,
            legR,
            role,
            walkCycle: Math.random() * 10
        };
    },

    // 33. PROCEDURAL 3D GRASS TUFT GEOMETRY (Optimized for InstancedMesh)
    createGrassTuftGeometry() {
        const geom = new THREE.BufferGeometry();
        const positions = [];
        const uvs = [];
        const indices = [];

        const bladeCount = 3;
        let vertOffset = 0;

        for (let b = 0; b < bladeCount; b++) {
            const angle = (b / bladeCount) * Math.PI;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const wBase = 0.22;
            const wMid = 0.15;
            const wTip = 0.03;
            const hMid = 0.45;
            const hTip = 0.95;

            // 6 vertices per blade (base, mid, tip)
            const x0 = -wBase * 0.5 * sin; const z0 = -wBase * 0.5 * cos;
            const x1 =  wBase * 0.5 * sin; const z1 =  wBase * 0.5 * cos;
            const x2 = -wMid * 0.5 * sin;  const z2 = -wMid * 0.5 * cos;
            const x3 =  wMid * 0.5 * sin;  const z3 =  wMid * 0.5 * cos;
            const x4 = -wTip * 0.5 * sin;  const z4 = -wTip * 0.5 * cos;
            const x5 =  wTip * 0.5 * sin;  const z5 =  wTip * 0.5 * cos;

            positions.push(
                x0, 0,    z0,
                x1, 0,    z1,
                x2, hMid, z2,
                x3, hMid, z3,
                x4, hTip, z4,
                x5, hTip, z5
            );

            uvs.push(
                0, 0,   1, 0,
                0, 0.5, 1, 0.5,
                0, 1.0, 1, 1.0
            );

            indices.push(
                vertOffset + 0, vertOffset + 1, vertOffset + 2,
                vertOffset + 1, vertOffset + 3, vertOffset + 2,
                vertOffset + 2, vertOffset + 3, vertOffset + 4,
                vertOffset + 3, vertOffset + 5, vertOffset + 4
            );

            vertOffset += 6;
        }

        geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geom.setIndex(indices);
        geom.computeVertexNormals();
        return geom;
    },

    // 34. PROCEDURAL WILDFLOWER GEOMETRY (Stem + Star Petals)
    createFlowerGeometry() {
        const geom = new THREE.BufferGeometry();
        const positions = [];
        const indices = [];

        // Stem: 2 crossed vertical quads
        for (let q = 0; q < 2; q++) {
            const angle = (q / 2) * Math.PI;
            const dx = Math.sin(angle) * 0.04;
            const dz = Math.cos(angle) * 0.04;
            const baseIdx = positions.length / 3;

            positions.push(
                -dx, 0,    -dz,
                 dx, 0,     dz,
                -dx, 0.65, -dz,
                 dx, 0.65,  dz
            );

            indices.push(
                baseIdx + 0, baseIdx + 1, baseIdx + 2,
                baseIdx + 1, baseIdx + 3, baseIdx + 2
            );
        }

        // 5 Petal Head Disk (Fan) at y = 0.65
        const centerIdx = positions.length / 3;
        positions.push(0, 0.68, 0); // Disk center
        const petalRadius = 0.22;
        const petalCount = 6;
        for (let p = 0; p <= petalCount; p++) {
            const a = (p / petalCount) * Math.PI * 2;
            positions.push(Math.cos(a) * petalRadius, 0.68 + Math.sin(p * 2) * 0.04, Math.sin(a) * petalRadius);
            if (p < petalCount) {
                indices.push(centerIdx, centerIdx + 1 + p, centerIdx + 1 + ((p + 1) % petalCount));
            }
        }

        geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geom.setIndex(indices);
        geom.computeVertexNormals();
        return geom;
    },

    // 35. MOSSY FANTASY BOULDER
    createMossyRock() {
        const group = new THREE.Group();
        const rockGeo = new THREE.DodecahedronGeometry(0.7 + Math.random() * 0.4, 1);
        const pos = rockGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const vy = pos.getY(i);
            pos.setY(i, vy * 0.72);
        }
        rockGeo.computeVertexNormals();

        const rockMat = new THREE.MeshLambertMaterial({ color: 0x7e8590 });
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.position.y = 0.35;
        rock.castShadow = true;
        rock.receiveShadow = true;
        group.add(rock);

        // Moss Cap on top
        const mossGeo = new THREE.SphereGeometry(0.55, 7, 5, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const mossMat = new THREE.MeshLambertMaterial({ color: 0x4d7c0f });
        const moss = new THREE.Mesh(mossGeo, mossMat);
        moss.position.y = 0.48;
        moss.scale.set(1.1, 0.45, 1.1);
        group.add(moss);

        return group;
    },

    // 36. LUSH SHRUBBERY & BERRY BUSH
    createBush(berryColor = 0xef4444) {
        const group = new THREE.Group();
        const foliageMat = new THREE.MeshLambertMaterial({ color: 0x2d6a4f });

        const clusters = [
            { x: 0, y: 0.65, z: 0, s: 0.8 },
            { x: -0.35, y: 0.55, z: 0.2, s: 0.65 },
            { x: 0.4, y: 0.5, z: -0.15, s: 0.6 },
            { x: 0.1, y: 0.6, z: 0.35, s: 0.55 }
        ];

        clusters.forEach(c => {
            const sphere = new THREE.Mesh(new THREE.DodecahedronGeometry(c.s, 1), foliageMat);
            sphere.position.set(c.x, c.y, c.z);
            sphere.castShadow = true;
            group.add(sphere);
        });

        if (berryColor) {
            const berryMat = new THREE.MeshBasicMaterial({ color: berryColor });
            for (let i = 0; i < 7; i++) {
                const berry = new THREE.Mesh(new THREE.SphereGeometry(0.08, 4, 4), berryMat);
                const angle = (i / 7) * Math.PI * 2;
                berry.position.set(Math.cos(angle) * 0.55, 0.5 + (i % 3) * 0.15, Math.sin(angle) * 0.55);
                group.add(berry);
            }
        }

        return group;
    },

    // 37. FLOATING LILY PAD WITH PINK LOTUS BLOSSOM
    createLilyPad() {
        const group = new THREE.Group();
        const padGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.02, 12);
        const padMat = new THREE.MeshLambertMaterial({ color: 0x38a169 });
        const pad = new THREE.Mesh(padGeo, padMat);
        group.add(pad);

        const flowerGroup = new THREE.Group();
        flowerGroup.position.set(0.12, 0.04, -0.05);

        const petalMat = new THREE.MeshLambertMaterial({ color: 0xf472b6 });
        for (let i = 0; i < 6; i++) {
            const p = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.02), petalMat);
            const a = (i / 6) * Math.PI * 2;
            p.rotation.y = a;
            p.rotation.x = 0.4;
            p.position.set(Math.cos(a) * 0.08, 0.04, Math.sin(a) * 0.08);
            flowerGroup.add(p);
        }

        const center = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
        center.position.y = 0.05;
        flowerGroup.add(center);

        group.add(flowerGroup);
        return group;
    },

    // 38. RIVERSIDE REEDS & CATTAILS
    createReeds() {
        const group = new THREE.Group();
        const stemMat = new THREE.MeshLambertMaterial({ color: 0x65a30d });
        const cattailMat = new THREE.MeshLambertMaterial({ color: 0x582f0e });

        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            const r = 0.25 * Math.random();
            const h = 1.2 + Math.random() * 0.6;

            const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, h, 5), stemMat);
            stem.position.set(Math.cos(a) * r, h * 0.5, Math.sin(a) * r);
            stem.rotation.z = (Math.random() - 0.5) * 0.15;
            group.add(stem);

            if (i % 2 === 0) {
                const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.35, 6), cattailMat);
                tip.position.set(stem.position.x, h - 0.15, stem.position.z);
                tip.rotation.copy(stem.rotation);
                group.add(tip);
            }
        }
        return group;
    },

    // 39. RUSTIC WOODEN FENCE
    createRusticFence(length = 6.0) {
        const group = new THREE.Group();
        const woodMat = this.materials.woodDark;

        const postCount = Math.max(2, Math.round(length / 2.0) + 1);
        const step = length / (postCount - 1);

        for (let i = 0; i < postCount; i++) {
            const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 1.1, 6), woodMat);
            post.position.set(i * step - length * 0.5, 0.55, 0);
            post.rotation.z = (Math.sin(i * 1.5) * 0.04);
            post.castShadow = true;
            group.add(post);
        }

        const rail1 = new THREE.Mesh(new THREE.BoxGeometry(length, 0.07, 0.07), woodMat);
        rail1.position.set(0, 0.45, 0);
        rail1.castShadow = true;
        group.add(rail1);

        const rail2 = new THREE.Mesh(new THREE.BoxGeometry(length, 0.07, 0.07), woodMat);
        rail2.position.set(0, 0.85, 0);
        rail2.castShadow = true;
        group.add(rail2);

        return group;
    },

    // 40. SCENIC PERIMETER HILL MOUND
    createScenicHill(radius = 20, height = 5.5, color = 0x489657) {
        const geo = new THREE.ConeGeometry(radius, height, 16);
        const mat = new THREE.MeshLambertMaterial({ color: color });
        const hill = new THREE.Mesh(geo, mat);
        hill.position.y = height * 0.4;
        hill.receiveShadow = true;
        return hill;
    },

    // 41. VILLAGE BLACKSMITH (Vulcan with Forge Anvil & Hammer)
    createBlacksmith() {
        const group = new THREE.Group();

        // Wooden Stump & Steel Anvil
        const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.8, 8), this.materials.woodDark);
        stump.position.set(0.9, 0.4, 0.8);
        stump.castShadow = true;
        group.add(stump);

        const anvil = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.9), this.materials.steel);
        anvil.position.set(0.9, 0.95, 0.8);
        anvil.castShadow = true;
        group.add(anvil);

        // Glowing forge ember coals
        const coal = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff4500 }));
        coal.position.set(0.9, 1.15, 0.8);
        group.add(coal);

        // Blacksmith Body
        const skinMat = new THREE.MeshLambertMaterial({ color: 0xe0ac69 });
        const apronMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
        const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });

        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.95, 0.5), apronMat);
        torso.position.y = 1.2;
        torso.castShadow = true;
        group.add(torso);

        const headGroup = new THREE.Group();
        headGroup.position.y = 1.95;
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), skinMat);
        headGroup.add(head);

        // Tough Blacksmith Beard & Bandana
        const beard = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.4), new THREE.MeshLambertMaterial({ color: 0x27272a }));
        beard.position.set(0, -0.22, 0.25);
        headGroup.add(beard);

        const bandana = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.16, 0.68), new THREE.MeshLambertMaterial({ color: 0xd97706 }));
        bandana.position.y = 0.28;
        headGroup.add(bandana);

        // Arms & Hammer
        const armR = new THREE.Group();
        armR.position.set(0.55, 1.5, 0.1);
        group.add(armR);

        const armMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.7, 0.24), skinMat);
        armMesh.position.y = -0.25;
        armR.add(armMesh);

        // Blacksmith Hammer
        const hammerHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.65, 6), this.materials.woodDark);
        hammerHandle.position.set(0, -0.5, 0.2);
        hammerHandle.rotation.x = Math.PI / 2;
        armR.add(hammerHandle);

        const hammerHead = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.32), this.materials.steel);
        hammerHead.position.set(0, -0.5, 0.45);
        armR.add(hammerHead);

        // Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.8, 0.28), pantsMat);
        legL.position.set(-0.24, 0.4, 0);
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.8, 0.28), pantsMat);
        legR.position.set(0.24, 0.4, 0);
        group.add(legR);

        return {
            group,
            headGroup,
            armR,
            role: 'blacksmith',
            hammerTimer: 0
        };
    },

    // 42. TRAVELING BARD (Lyra the Minstrel with Lute)
    createBard() {
        const group = new THREE.Group();
        const clothMat = new THREE.MeshLambertMaterial({ color: 0x15803d });
        const capeMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 });

        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.75, 0.4), clothMat);
        torso.position.y = 1.1;
        torso.castShadow = true;
        group.add(torso);

        const headGroup = new THREE.Group();
        headGroup.position.y = 1.75;
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), this.materials.skin);
        headGroup.add(head);

        // Feathered Minstrel Beret
        const beret = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.15, 8), new THREE.MeshLambertMaterial({ color: 0xd97706 }));
        beret.position.set(0, 0.32, 0);
        beret.rotation.z = -0.15;
        headGroup.add(beret);

        const feather = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.5, 4), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        feather.position.set(-0.35, 0.45, 0);
        feather.rotation.z = 0.5;
        headGroup.add(feather);

        // Wooden Lute / Harp
        const luteBody = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), this.materials.woodLight);
        luteBody.scale.set(1, 1.3, 0.5);
        luteBody.position.set(0.15, 1.1, 0.35);
        group.add(luteBody);

        const luteNeck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.05), this.materials.woodDark);
        luteNeck.position.set(0.15, 1.45, 0.35);
        luteNeck.rotation.z = -0.3;
        group.add(luteNeck);

        // Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 0.2), new THREE.MeshLambertMaterial({ color: 0x334155 }));
        legL.position.set(-0.16, 0.35, 0);
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 0.2), new THREE.MeshLambertMaterial({ color: 0x334155 }));
        legR.position.set(0.16, 0.35, 0);
        group.add(legR);

        return {
            group,
            headGroup,
            role: 'bard',
            strumTimer: 0
        };
    },

    // 43. CUTE VILLAGE CAT (Calico Cat Sitting on Wooden Barrel)
    createVillageCat() {
        const group = new THREE.Group();

        // Wooden barrel pedestal
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.48, 0.85, 10), this.materials.woodDark);
        barrel.position.y = 0.42;
        barrel.castShadow = true;
        group.add(barrel);

        const catMat = new THREE.MeshLambertMaterial({ color: 0xf97316 }); // Orange tabby
        const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

        // Cat body sitting loaf
        const catBody = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 8), catMat);
        catBody.scale.set(1, 0.8, 1.3);
        catBody.position.set(0, 0.98, 0);
        catBody.castShadow = true;
        group.add(catBody);

        const catHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), catMat);
        catHead.position.set(0, 1.2, 0.24);
        group.add(catHead);

        // Pointy Ears
        const earL = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 4), catMat);
        earL.position.set(-0.1, 1.35, 0.2);
        group.add(earL);

        const earR = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 4), catMat);
        earR.position.set(0.1, 1.35, 0.2);
        group.add(earR);

        // Cute Emerald Eyes
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
        const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), eyeMat);
        eyeL.position.set(-0.07, 1.22, 0.38);
        group.add(eyeL);

        const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), eyeMat);
        eyeR.position.set(0.07, 1.22, 0.38);
        group.add(eyeR);

        // Swaying Tail
        const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.45, 6), catMat);
        tail.position.set(0, 1.05, -0.35);
        tail.rotation.x = -0.6;
        group.add(tail);

        return {
            group,
            tail,
            role: 'cat'
        };
    },

    // 44. FOREST ALCHEMIST (Hermit Sylva with Cauldron)
    createAlchemist() {
        const group = new THREE.Group();
        const robeMat = new THREE.MeshLambertMaterial({ color: 0x581c87 });

        // Cauldron on Fire
        const cauldron = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.45, 0.65, 10), this.materials.steel);
        cauldron.position.set(0.9, 0.45, 0.6);
        cauldron.castShadow = true;
        group.add(cauldron);

        // Glowing green bubbling potion liquid
        const potionLiq = new THREE.Mesh(new THREE.CircleGeometry(0.58, 12), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
        potionLiq.rotation.x = -Math.PI / 2;
        potionLiq.position.set(0.9, 0.72, 0.6);
        group.add(potionLiq);

        // Alchemist Body
        const torso = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.2, 8), robeMat);
        torso.position.y = 0.8;
        torso.castShadow = true;
        group.add(torso);

        const headGroup = new THREE.Group();
        headGroup.position.y = 1.6;
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), this.materials.skin);
        headGroup.add(head);

        // Pointed Witch Hat
        const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.08, 10), robeMat);
        hatBrim.position.y = 0.26;
        headGroup.add(hatBrim);

        const hatCone = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.8, 8), robeMat);
        hatCone.position.set(0, 0.65, -0.08);
        hatCone.rotation.x = -0.2;
        headGroup.add(hatCone);

        // Stirring Wooden Ladle
        const ladle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 6), this.materials.woodDark);
        ladle.position.set(0.7, 0.85, 0.6);
        ladle.rotation.z = -0.3;
        group.add(ladle);

        return {
            group,
            potionLiq,
            role: 'alchemist'
        };
    },

    // 45. ARCHAEOLOGIST (Drake with Expedition Gear)
    createArchaeologist() {
        const group = new THREE.Group();
        const khakiMat = new THREE.MeshLambertMaterial({ color: 0xa8a29e });

        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.8, 0.4), khakiMat);
        torso.position.y = 1.1;
        torso.castShadow = true;
        group.add(torso);

        const headGroup = new THREE.Group();
        headGroup.position.y = 1.8;
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), this.materials.skin);
        headGroup.add(head);

        // Pith Safari Helmet
        const helmet = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.65, 0.2, 8), new THREE.MeshLambertMaterial({ color: 0xd6d3d1 }));
        helmet.position.y = 0.35;
        headGroup.add(helmet);

        // Magnifying Glass
        const glassHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 6), this.materials.gold);
        glassHandle.position.set(0.4, 1.2, 0.3);
        group.add(glassHandle);

        const glassRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 6, 12), this.materials.gold);
        glassRing.position.set(0.4, 1.4, 0.3);
        group.add(glassRing);

        // Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), this.materials.woodDark);
        legL.position.set(-0.18, 0.38, 0);
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), this.materials.woodDark);
        legR.position.set(0.18, 0.38, 0);
        group.add(legR);

        return {
            group,
            headGroup,
            role: 'archaeologist'
        };
    },

    // 46. ANCIENT STONE GOLEM (Tough Ruins Guardian Monster)
    createStoneGolem() {
        const group = new THREE.Group();
        const stoneMat = new THREE.MeshStandardMaterial({
            color: 0x52525b,
            roughness: 0.8,
            metalness: 0.1
        });
        const mossMat = new THREE.MeshStandardMaterial({
            color: 0x3f6212,
            roughness: 0.9
        });
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 }); // Glowing cyan runic eyes

        // Massive Stone Torso
        const torso = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 1.2), stoneMat);
        torso.position.y = 1.9;
        torso.castShadow = true;
        group.add(torso);

        // Moss patch
        const moss = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 0.1), mossMat);
        moss.position.set(-0.2, 2.0, 0.61);
        group.add(moss);

        // Golem Head with Cyan Glowing Eye Slit
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.75, 0.8), stoneMat);
        head.position.set(0, 2.9, 0.1);
        head.castShadow = true;
        group.add(head);

        const eyeRune = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.14), eyeMat);
        eyeRune.position.set(0, 2.95, 0.52);
        group.add(eyeRune);

        // Heavy Stone Fists / Arms
        const armL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.6, 0.55), stoneMat);
        armL.position.set(-1.15, 1.7, 0);
        armL.castShadow = true;
        group.add(armL);

        const armR = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.6, 0.55), stoneMat);
        armR.position.set(1.15, 1.7, 0);
        armR.castShadow = true;
        group.add(armR);

        // Heavy Pillar Legs
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.2, 0.6), stoneMat);
        legL.position.set(-0.5, 0.6, 0);
        legL.castShadow = true;
        group.add(legL);

        const legR = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.2, 0.6), stoneMat);
        legR.position.set(0.5, 0.6, 0);
        legR.castShadow = true;
        group.add(legR);

        group.scale.set(1.15, 1.15, 1.15);

        return {
            group,
            body: torso,
            type: 'golem',
            name: 'Ancient Stone Golem',
            scale: 1.15,
            hp: 380,
            maxHp: 380,
            atk: 32,
            speed: 2.3,
            goldDrop: 160,
            expDrop: 140,
            alive: true,
            wobbleOffset: Math.random() * 10
        };
    },

    // =========================================================================
    // 1. KUDA PERANG KSATRIA (WARHORSE MOUNT)
    // =========================================================================
    createMountHorse(config = {}) {
        const group = new THREE.Group();
        const coatColor = config.coatColor !== undefined ? config.coatColor : 0x78350f; // Rich chestnut
        const maneColor = config.maneColor !== undefined ? config.maneColor : 0x27170e; // Dark espresso
        const coatMat = new THREE.MeshLambertMaterial({ color: coatColor });
        const maneMat = new THREE.MeshLambertMaterial({ color: maneColor });
        const whiteMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
        const hoofMat = new THREE.MeshLambertMaterial({ color: 0x1c1917 });
        const saddlePadMat = new THREE.MeshLambertMaterial({ color: 0xb91c1c }); // Crimson
        const leatherMat = new THREE.MeshLambertMaterial({ color: 0x3e2723 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.25 });
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

        // Root Body
        const body = new THREE.Group();
        group.add(body);

        // Barrel / Torso
        const torsoGeo = new THREE.BoxGeometry(0.86, 0.96, 1.65);
        const torso = new THREE.Mesh(torsoGeo, coatMat);
        torso.position.set(0, 1.12, 0);
        torso.castShadow = true;
        body.add(torso);

        // Muscular Chest Front
        const chest = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.88, 0.6), coatMat);
        chest.position.set(0, 1.15, 0.72);
        chest.castShadow = true;
        body.add(chest);

        // Rounded Rump / Haunches Rear
        const rump = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.9, 0.65), coatMat);
        rump.position.set(0, 1.14, -0.68);
        rump.castShadow = true;
        body.add(rump);

        // Saddle Pad & War Saddle
        const saddlePad = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.08, 0.95), saddlePadMat);
        saddlePad.position.set(0, 1.62, -0.05);
        body.add(saddlePad);

        const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.2, 0.76), leatherMat);
        saddle.position.set(0, 1.68, -0.05);
        body.add(saddle);

        // Pommel (Front horn) & Cantle (Rear ridge)
        const pommel = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.14), goldMat);
        pommel.position.set(0, 1.8, 0.28);
        body.add(pommel);

        const cantle = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.22, 0.14), leatherMat);
        cantle.position.set(0, 1.8, -0.38);
        body.add(cantle);

        // Stirrup Leathers & Golden Stirrups
        [-0.46, 0.46].forEach(x => {
            const strap = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.55, 0.1), leatherMat);
            strap.position.set(x, 1.35, -0.05);
            body.add(strap);

            const stirrup = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.16), goldMat);
            stirrup.position.set(x, 1.05, -0.05);
            body.add(stirrup);
        });

        // Girth Strap around barrel
        const girth = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.98, 0.16), leatherMat);
        girth.position.set(0, 1.12, 0.1);
        body.add(girth);

        // Neck Group (Pivoting at shoulders)
        const neckGroup = new THREE.Group();
        neckGroup.position.set(0, 1.25, 0.7);
        neckGroup.rotation.x = -0.42;
        body.add(neckGroup);

        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.46, 1.1, 0.54), coatMat);
        neck.position.set(0, 0.5, 0.2);
        neck.castShadow = true;
        neckGroup.add(neck);

        // Flowing Horse Mane along neck crest
        for (let i = 0; i < 4; i++) {
            const maneBlock = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.35, 0.26), maneMat);
            maneBlock.position.set(0, 0.25 + i * 0.26, -0.15 - i * 0.05);
            maneBlock.rotation.x = 0.2;
            neckGroup.add(maneBlock);
        }

        // Head Group (at top of neck)
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 1.0, 0.35);
        headGroup.rotation.x = 0.52; // Leveled head
        neckGroup.add(headGroup);

        // Skull
        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.48, 0.65), coatMat);
        skull.position.set(0, 0.1, 0.2);
        skull.castShadow = true;
        headGroup.add(skull);

        // White Star / Blaze on Forehead
        const blaze = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.04), whiteMat);
        blaze.position.set(0, 0.2, 0.53);
        headGroup.add(blaze);

        // Muzzle / Snout
        const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.36, 0.46), new THREE.MeshLambertMaterial({ color: 0x3e2723 }));
        muzzle.position.set(0, -0.05, 0.65);
        headGroup.add(muzzle);

        // Nostrils
        const nostrilMat = new THREE.MeshBasicMaterial({ color: 0x1c1917 });
        [-0.09, 0.09].forEach(x => {
            const nostril = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.04), nostrilMat);
            nostril.position.set(x, -0.02, 0.88);
            headGroup.add(nostril);
        });

        // Almond Eyes
        [-0.23, 0.23].forEach(x => {
            const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 0.12), eyeMat);
            eye.position.set(x, 0.16, 0.35);
            headGroup.add(eye);
        });

        // Pricked Ears
        [-0.16, 0.16].forEach(x => {
            const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 4), coatMat);
            ear.position.set(x, 0.44, 0.05);
            ear.rotation.set(0.1, 0, x > 0 ? -0.2 : 0.2);
            headGroup.add(ear);
        });

        // Golden Bridle & Reins
        const bridleMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
        const noseBand = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.06, 0.48), bridleMat);
        noseBand.position.set(0, -0.02, 0.55);
        headGroup.add(noseBand);

        [-0.19, 0.19].forEach(x => {
            const bitRing = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 6, 12), goldMat);
            bitRing.position.set(x, -0.05, 0.6);
            bitRing.rotation.y = Math.PI / 2;
            headGroup.add(bitRing);
        });

        // Helper to build horse leg with thigh, shank (white sock), and hoof
        const buildHorseLeg = (x, z) => {
            const legRoot = new THREE.Group();
            legRoot.position.set(x, 1.05, z);
            group.add(legRoot);

            // Upper Thigh
            const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.52, 0.28), coatMat);
            thigh.position.set(0, -0.24, 0);
            thigh.castShadow = true;
            legRoot.add(thigh);

            // Lower Shank / Cannon bone with white sock
            const shank = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.2), whiteMat);
            shank.position.set(0, -0.68, 0);
            shank.castShadow = true;
            legRoot.add(shank);

            // Hoof
            const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.24), hoofMat);
            hoof.position.set(0, -0.96, 0.02);
            hoof.castShadow = true;
            legRoot.add(hoof);

            return legRoot;
        };

        const flLeg = buildHorseLeg(-0.32, 0.65);
        const frLeg = buildHorseLeg(0.32, 0.65);
        const blLeg = buildHorseLeg(-0.32, -0.65);
        const brLeg = buildHorseLeg(0.32, -0.65);

        // Bushy Cascading Horse Tail
        const tailGroup = new THREE.Group();
        tailGroup.position.set(0, 1.35, -1.0);
        tailGroup.rotation.x = -0.3;
        body.add(tailGroup);

        for (let i = 0; i < 4; i++) {
            const tailSeg = new THREE.Mesh(new THREE.BoxGeometry(0.22 - i * 0.02, 0.32, 0.22 - i * 0.02), maneMat);
            tailSeg.position.set(0, -0.18 - i * 0.24, -i * 0.06);
            tailGroup.add(tailSeg);
        }

        return {
            group,
            body,
            neck: neckGroup,
            head: headGroup,
            frontLeftLeg: flLeg,
            frontRightLeg: frLeg,
            backLeftLeg: blLeg,
            backRightLeg: brLeg,
            tail: tailGroup,
            saddleY: 1.28,
            saddleZ: -0.05,
            speedMultiplier: 1.7,
            canGlide: false,
            type: 'horse'
        };
    },

    // =========================================================================
    // 2. BURUNG GARUDA RAKSASA (GIANT SKY ROC / PHOENIX MOUNT)
    // =========================================================================
    createMountBird(config = {}) {
        const group = new THREE.Group();
        const goldFeatherMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
        const crimsonMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });
        const beakMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.7, roughness: 0.3 });
        const clawMat = new THREE.MeshLambertMaterial({ color: 0x1c1917 });
        const saddleMat = new THREE.MeshLambertMaterial({ color: 0x4f46e5 }); // Royal Indigo
        const emeraldMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x047857, emissiveIntensity: 0.4 });
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

        const body = new THREE.Group();
        group.add(body);

        // Avian Torso
        const torsoGeo = new THREE.BoxGeometry(0.92, 0.95, 1.6);
        const torso = new THREE.Mesh(torsoGeo, goldFeatherMat);
        torso.position.set(0, 1.25, 0);
        torso.castShadow = true;
        body.add(torso);

        // Fluffy Crimson Breast
        const breast = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.85, 0.65), crimsonMat);
        breast.position.set(0, 1.2, 0.75);
        breast.castShadow = true;
        body.add(breast);

        // Royal Feathered Saddle
        const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.2, 0.82), saddleMat);
        saddle.position.set(0, 1.76, 0.05);
        body.add(saddle);

        const jewel = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.12), emeraldMat);
        jewel.position.set(0, 1.88, 0.42);
        body.add(jewel);

        // Avian Neck & Head
        const neckGroup = new THREE.Group();
        neckGroup.position.set(0, 1.45, 0.8);
        neckGroup.rotation.x = -0.3;
        body.add(neckGroup);

        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.8, 0.5), goldFeatherMat);
        neck.position.set(0, 0.35, 0.15);
        neck.castShadow = true;
        neckGroup.add(neck);

        // Raptor Skull
        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.48, 0.6), crimsonMat);
        skull.position.set(0, 0.78, 0.35);
        skull.castShadow = true;
        neckGroup.add(skull);

        // Sharp Hooked Golden Beak
        const beakUpper = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.55, 4), beakMat);
        beakUpper.rotation.set(Math.PI / 2 + 0.3, 0, 0);
        beakUpper.position.set(0, 0.74, 0.78);
        neckGroup.add(beakUpper);

        const beakLower = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 4), beakMat);
        beakLower.rotation.set(Math.PI / 2 - 0.1, 0, 0);
        beakLower.position.set(0, 0.65, 0.72);
        neckGroup.add(beakLower);

        // Fierce Raptor Eyes
        [-0.24, 0.24].forEach(x => {
            const eyeRing = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.14), beakMat);
            eyeRing.position.set(x, 0.82, 0.45);
            neckGroup.add(eyeRing);

            const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.08), eyeMat);
            pupil.position.set(x > 0 ? x + 0.01 : x - 0.01, 0.82, 0.45);
            neckGroup.add(pupil);
        });

        // Triple Feather Crest Crown
        for (let i = 0; i < 3; i++) {
            const plume = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.55), goldFeatherMat);
            plume.position.set((i - 1) * 0.14, 1.05 + i * 0.05, 0.05 - i * 0.08);
            plume.rotation.x = -0.55;
            neckGroup.add(plume);
        }

        // Articulated Large Wings
        const createBirdWing = (isLeft) => {
            const wingRoot = new THREE.Group();
            wingRoot.position.set(isLeft ? -0.52 : 0.52, 1.48, 0.2);
            body.add(wingRoot);

            const sign = isLeft ? -1 : 1;

            // Wing Arm Primary
            const arm = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.18, 0.4), goldFeatherMat);
            arm.position.set(sign * 0.32, 0, 0);
            wingRoot.add(arm);

            // Layered Flight Feathers fanning outward
            for (let f = 0; f < 4; f++) {
                const featherMat = f % 2 === 0 ? goldFeatherMat : crimsonMat;
                const feather = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.06, 0.32), featherMat);
                feather.position.set(sign * (0.65 + f * 0.25), -0.05 - f * 0.04, -f * 0.12);
                feather.rotation.y = sign * (0.15 + f * 0.12);
                feather.rotation.z = sign * (-0.1 - f * 0.05);
                feather.castShadow = true;
                wingRoot.add(feather);
            }

            return wingRoot;
        };

        const leftWing = createBirdWing(true);
        const rightWing = createBirdWing(false);

        // Elegant Fan Tail Plumes
        const tailGroup = new THREE.Group();
        tailGroup.position.set(0, 1.35, -0.95);
        body.add(tailGroup);

        for (let t = -2; t <= 2; t++) {
            const plumeMat = Math.abs(t) % 2 === 0 ? goldFeatherMat : crimsonMat;
            const plume = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.95), plumeMat);
            plume.position.set(t * 0.18, 0.05 - Math.abs(t) * 0.04, -0.45);
            plume.rotation.y = t * 0.15;
            plume.rotation.x = -0.25;
            tailGroup.add(plume);
        }

        // Two Sturdy Talons / Avian Legs
        const buildBirdLeg = (x) => {
            const legRoot = new THREE.Group();
            legRoot.position.set(x, 1.05, -0.05);
            group.add(legRoot);

            // Feathered Drumstick
            const drumstick = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.48, 0.32), goldFeatherMat);
            drumstick.position.set(0, -0.22, 0.05);
            drumstick.castShadow = true;
            legRoot.add(drumstick);

            // Scaly Talon Shank
            const shank = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.18), beakMat);
            shank.position.set(0, -0.62, -0.02);
            shank.castShadow = true;
            legRoot.add(shank);

            // 3 Forward Claws
            [-0.1, 0, 0.1].forEach(cx => {
                const claw = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.32), clawMat);
                claw.position.set(cx, -0.88, 0.14);
                claw.rotation.x = 0.2;
                legRoot.add(claw);
            });

            // 1 Rear Locking Claw
            const rearClaw = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.22), clawMat);
            rearClaw.position.set(0, -0.88, -0.16);
            rearClaw.rotation.x = -0.2;
            legRoot.add(rearClaw);

            return legRoot;
        };

        const flLeg = buildBirdLeg(-0.35);
        const frLeg = buildBirdLeg(0.35);

        return {
            group,
            body,
            neck: neckGroup,
            head: neckGroup,
            frontLeftLeg: flLeg,
            frontRightLeg: frLeg,
            backLeftLeg: flLeg,
            backRightLeg: frLeg,
            leftWing,
            rightWing,
            tail: tailGroup,
            saddleY: 1.38,
            saddleZ: 0.05,
            speedMultiplier: 1.85,
            canGlide: true,
            type: 'bird'
        };
    },

    // =========================================================================
    // 3. PEGASUS SURGAWI (CELESTIAL WINGED STALLION MOUNT)
    // =========================================================================
    createMountPegasus(config = {}) {
        const group = new THREE.Group();
        const coatMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.15 });
        const maneMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.35, roughness: 0.3 });
        const wingMat = new THREE.MeshStandardMaterial({ color: 0xf0f9ff, roughness: 0.2, metalness: 0.1 });
        const wingTipMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x0284c7, emissiveIntensity: 0.45 });
        const goldHoofMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xca8a04, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 });
        const hornMat = new THREE.MeshStandardMaterial({ color: 0xfde047, emissive: 0xeab308, emissiveIntensity: 0.75, metalness: 0.9, roughness: 0.15 });
        const saddlePadMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a }); // Royal celestial navy
        const leatherMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });

        const body = new THREE.Group();
        group.add(body);

        // Pearl Torso
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.96, 1.65), coatMat);
        torso.position.set(0, 1.12, 0);
        torso.castShadow = true;
        body.add(torso);

        const chest = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.88, 0.6), coatMat);
        chest.position.set(0, 1.15, 0.72);
        chest.castShadow = true;
        body.add(chest);

        const rump = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.9, 0.65), coatMat);
        rump.position.set(0, 1.14, -0.68);
        rump.castShadow = true;
        body.add(rump);

        // Celestial Saddle
        const saddlePad = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.08, 0.95), saddlePadMat);
        saddlePad.position.set(0, 1.62, -0.05);
        body.add(saddlePad);

        const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.2, 0.76), leatherMat);
        saddle.position.set(0, 1.68, -0.05);
        body.add(saddle);

        [-0.46, 0.46].forEach(x => {
            const stirrup = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.16), goldHoofMat);
            stirrup.position.set(x, 1.05, -0.05);
            body.add(stirrup);
        });

        // Neck Group
        const neckGroup = new THREE.Group();
        neckGroup.position.set(0, 1.25, 0.7);
        neckGroup.rotation.x = -0.42;
        body.add(neckGroup);

        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.46, 1.1, 0.54), coatMat);
        neck.position.set(0, 0.5, 0.2);
        neck.castShadow = true;
        neckGroup.add(neck);

        // Glowing Azure Starlight Mane
        for (let i = 0; i < 4; i++) {
            const maneBlock = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.28), maneMat);
            maneBlock.position.set(0, 0.25 + i * 0.26, -0.15 - i * 0.05);
            maneBlock.rotation.x = 0.2;
            neckGroup.add(maneBlock);
        }

        // Head Group
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 1.0, 0.35);
        headGroup.rotation.x = 0.52;
        neckGroup.add(headGroup);

        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.48, 0.65), coatMat);
        skull.position.set(0, 0.1, 0.2);
        skull.castShadow = true;
        headGroup.add(skull);

        // Glowing Celestial Golden Horn on Forehead!
        const horn = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.68, 8), hornMat);
        horn.position.set(0, 0.45, 0.48);
        horn.rotation.x = 0.5;
        headGroup.add(horn);

        const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.36, 0.46), new THREE.MeshLambertMaterial({ color: 0xf1f5f9 }));
        muzzle.position.set(0, -0.05, 0.65);
        headGroup.add(muzzle);

        // Starlight Blue Eyes
        [-0.23, 0.23].forEach(x => {
            const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 0.12), eyeMat);
            eye.position.set(x, 0.16, 0.35);
            headGroup.add(eye);
        });

        // Angelic Ears
        [-0.16, 0.16].forEach(x => {
            const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 4), coatMat);
            ear.position.set(x, 0.44, 0.05);
            ear.rotation.set(0.1, 0, x > 0 ? -0.2 : 0.2);
            headGroup.add(ear);
        });

        // Giant Angelic Feathered Wings
        const createPegasusWing = (isLeft) => {
            const wingRoot = new THREE.Group();
            wingRoot.position.set(isLeft ? -0.48 : 0.48, 1.45, 0.15);
            body.add(wingRoot);

            const sign = isLeft ? -1 : 1;

            // Base wing shoulder bone
            const bone = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.42), wingMat);
            bone.position.set(sign * 0.35, 0.1, 0);
            wingRoot.add(bone);

            // Multi-tiered primary feathers
            for (let f = 0; f < 5; f++) {
                const featherMat = f >= 3 ? wingTipMat : wingMat;
                const feather = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.3), featherMat);
                feather.position.set(sign * (0.68 + f * 0.22), 0.08 - f * 0.03, -f * 0.14);
                feather.rotation.y = sign * (0.2 + f * 0.1);
                feather.rotation.z = sign * (-0.15 - f * 0.04);
                feather.castShadow = true;
                wingRoot.add(feather);
            }

            return wingRoot;
        };

        const leftWing = createPegasusWing(true);
        const rightWing = createPegasusWing(false);

        // 4 Horse Legs with Golden Hooves
        const buildPegasusLeg = (x, z) => {
            const legRoot = new THREE.Group();
            legRoot.position.set(x, 1.05, z);
            group.add(legRoot);

            const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.52, 0.28), coatMat);
            thigh.position.set(0, -0.24, 0);
            thigh.castShadow = true;
            legRoot.add(thigh);

            const shank = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.2), coatMat);
            shank.position.set(0, -0.68, 0);
            shank.castShadow = true;
            legRoot.add(shank);

            // Celestial Golden Hoof!
            const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.24), goldHoofMat);
            hoof.position.set(0, -0.96, 0.02);
            hoof.castShadow = true;
            legRoot.add(hoof);

            return legRoot;
        };

        const flLeg = buildPegasusLeg(-0.32, 0.65);
        const frLeg = buildPegasusLeg(0.32, 0.65);
        const blLeg = buildPegasusLeg(-0.32, -0.65);
        const brLeg = buildPegasusLeg(0.32, -0.65);

        // Glowing Starlight Tail
        const tailGroup = new THREE.Group();
        tailGroup.position.set(0, 1.35, -1.0);
        tailGroup.rotation.x = -0.3;
        body.add(tailGroup);

        for (let i = 0; i < 4; i++) {
            const tailSeg = new THREE.Mesh(new THREE.BoxGeometry(0.24 - i * 0.02, 0.32, 0.24 - i * 0.02), maneMat);
            tailSeg.position.set(0, -0.18 - i * 0.24, -i * 0.06);
            tailGroup.add(tailSeg);
        }

        return {
            group,
            body,
            neck: neckGroup,
            head: headGroup,
            frontLeftLeg: flLeg,
            frontRightLeg: frLeg,
            backLeftLeg: blLeg,
            backRightLeg: brLeg,
            leftWing,
            rightWing,
            tail: tailGroup,
            saddleY: 1.32,
            saddleZ: -0.05,
            speedMultiplier: 2.0,
            canGlide: true,
            type: 'pegasus'
        };
    },

    // =========================================================================
    // 4. SERIGALA BAYANGAN (DIREWOLF / SHADOW WOLF MOUNT)
    // =========================================================================
    createMountWolf(config = {}) {
        const group = new THREE.Group();
        const furDarkMat = new THREE.MeshLambertMaterial({ color: 0x27272a }); // Midnight charcoal
        const furSilverMat = new THREE.MeshLambertMaterial({ color: 0x71717a }); // Silver ruff
        const fangMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
        const redEyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const collarMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
        const spikeMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.8, roughness: 0.2 });
        const leatherMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

        const body = new THREE.Group();
        group.add(body);

        // Predator Torso (Deep chest, leaner flank)
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.84, 1.7), furDarkMat);
        torso.position.set(0, 1.05, 0);
        torso.castShadow = true;
        body.add(torso);

        // Silver Chest Ruff & Shoulder Bulk
        const chest = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.82, 0.65), furSilverMat);
        chest.position.set(0, 1.08, 0.65);
        chest.castShadow = true;
        body.add(chest);

        // Spiked Heavy Collar
        const collar = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.86, 0.16), collarMat);
        collar.position.set(0, 1.15, 0.72);
        body.add(collar);

        [-0.44, 0.44, 0].forEach((x, idx) => {
            const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 4), spikeMat);
            spike.position.set(x, idx === 2 ? 1.62 : 1.15, 0.72);
            spike.rotation.z = idx === 0 ? 0.6 : (idx === 1 ? -0.6 : 0);
            body.add(spike);
        });

        // Dark Studded Combat Saddle
        const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.72), leatherMat);
        saddle.position.set(0, 1.5, -0.05);
        body.add(saddle);

        [-0.4, 0.4].forEach(x => {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 6, 12), spikeMat);
            ring.position.set(x, 1.48, -0.05);
            ring.rotation.y = Math.PI / 2;
            body.add(ring);
        });

        // Wolf Neck
        const neckGroup = new THREE.Group();
        neckGroup.position.set(0, 1.15, 0.75);
        neckGroup.rotation.x = -0.3;
        body.add(neckGroup);

        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.65, 0.5), furDarkMat);
        neck.position.set(0, 0.25, 0.15);
        neckGroup.add(neck);

        // Fierce Wolf Skull
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 0.55, 0.35);
        neckGroup.add(headGroup);

        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.42, 0.52), furDarkMat);
        skull.castShadow = true;
        headGroup.add(skull);

        // Predatory Snout
        const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.26, 0.45), furDarkMat);
        snout.position.set(0, -0.06, 0.42);
        headGroup.add(snout);

        // Nose Leather
        const nose = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.08), new THREE.MeshBasicMaterial({ color: 0x09090b }));
        nose.position.set(0, 0.04, 0.65);
        headGroup.add(nose);

        // Visible Sharp White Fangs!
        [-0.1, 0.1].forEach(x => {
            const fangUpper = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 4), fangMat);
            fangUpper.rotation.x = Math.PI;
            fangUpper.position.set(x, -0.16, 0.5);
            headGroup.add(fangUpper);
        });

        // Glowing Crimson Predator Eyes
        [-0.2, 0.2].forEach(x => {
            const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.12), redEyeMat);
            eye.position.set(x, 0.1, 0.2);
            headGroup.add(eye);
        });

        // Pointed Wolf Ears with Tufts
        [-0.18, 0.18].forEach(x => {
            const ear = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.32, 4), furDarkMat);
            ear.position.set(x, 0.35, -0.05);
            ear.rotation.set(-0.15, 0, x > 0 ? -0.2 : 0.2);
            headGroup.add(ear);
        });

        // 4 Digitigrade Wolf Legs
        const buildWolfLeg = (x, z) => {
            const legRoot = new THREE.Group();
            legRoot.position.set(x, 0.95, z);
            group.add(legRoot);

            const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.48, 0.28), furDarkMat);
            thigh.position.set(0, -0.22, 0);
            thigh.castShadow = true;
            legRoot.add(thigh);

            const shank = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.2), furSilverMat);
            shank.position.set(0, -0.6, 0);
            shank.castShadow = true;
            legRoot.add(shank);

            // Broad Wolf Paw with Claws
            const paw = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.28), furDarkMat);
            paw.position.set(0, -0.85, 0.04);
            paw.castShadow = true;
            legRoot.add(paw);

            return legRoot;
        };

        const flLeg = buildWolfLeg(-0.3, 0.6);
        const frLeg = buildWolfLeg(0.3, 0.6);
        const blLeg = buildWolfLeg(-0.3, -0.6);
        const brLeg = buildWolfLeg(0.3, -0.6);

        // Bushy Wolf Tail with Silver Tip
        const tailGroup = new THREE.Group();
        tailGroup.position.set(0, 1.25, -0.95);
        tailGroup.rotation.x = -0.55;
        body.add(tailGroup);

        const tailBase = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.24), furDarkMat);
        tailBase.position.set(0, -0.25, 0);
        tailGroup.add(tailBase);

        const tailTip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.2), furSilverMat);
        tailTip.position.set(0, -0.6, 0);
        tailGroup.add(tailTip);

        return {
            group,
            body,
            neck: neckGroup,
            head: headGroup,
            frontLeftLeg: flLeg,
            frontRightLeg: frLeg,
            backLeftLeg: blLeg,
            backRightLeg: brLeg,
            tail: tailGroup,
            saddleY: 1.18,
            saddleZ: -0.05,
            speedMultiplier: 1.75,
            canGlide: false,
            type: 'wolf'
        };
    },

    // =========================================================================
    // 5. HARIMAU BAJA / ARMORED SABER TIGER (BIG CAT MOUNT)
    // =========================================================================
    createMountBigCat(config = {}) {
        const group = new THREE.Group();
        const tigerOrangeMat = new THREE.MeshLambertMaterial({ color: 0xf97316 }); // Tiger orange
        const stripeMat = new THREE.MeshLambertMaterial({ color: 0x18181b }); // Black stripes
        const whiteMat = new THREE.MeshLambertMaterial({ color: 0xfef08a }); // Light cream belly
        const saberFangMat = new THREE.MeshStandardMaterial({ color: 0xfffbeb, roughness: 0.15 });
        const greenEyeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
        const goldArmorMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.85, roughness: 0.25 });
        const redVelvetMat = new THREE.MeshLambertMaterial({ color: 0x991b1b });

        const body = new THREE.Group();
        group.add(body);

        // Muscular Feline Torso
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.88, 1.75), tigerOrangeMat);
        torso.position.set(0, 1.08, 0);
        torso.castShadow = true;
        body.add(torso);

        // Tiger Stripes on Flanks
        for (let s = -2; s <= 2; s++) {
            const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.55, 0.08), stripeMat);
            stripe.position.set(0, 1.15, s * 0.28);
            body.add(stripe);
        }

        // Broad Feline Chest & Golden Shoulder Armor Pauldrons!
        const chest = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.88, 0.65), whiteMat);
        chest.position.set(0, 1.1, 0.7);
        body.add(chest);

        [-0.48, 0.48].forEach(x => {
            const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.45), goldArmorMat);
            pauldron.position.set(x, 1.35, 0.65);
            pauldron.rotation.z = x > 0 ? -0.3 : 0.3;
            body.add(pauldron);
        });

        // Royal Crimson Velvet Saddle
        const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.18, 0.78), redVelvetMat);
        saddle.position.set(0, 1.55, 0);
        body.add(saddle);

        [-0.44, 0.44].forEach(x => {
            const stirrup = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.16), goldArmorMat);
            stirrup.position.set(x, 1.1, 0);
            body.add(stirrup);
        });

        // Muscular Feline Neck
        const neckGroup = new THREE.Group();
        neckGroup.position.set(0, 1.18, 0.78);
        neckGroup.rotation.x = -0.25;
        body.add(neckGroup);

        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.68, 0.52), tigerOrangeMat);
        neck.position.set(0, 0.28, 0.15);
        neckGroup.add(neck);

        // Broad Tiger Skull
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 0.6, 0.35);
        neckGroup.add(headGroup);

        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.46, 0.55), tigerOrangeMat);
        headGroup.add(skull);

        // Golden Forehead Armor Plate!
        const foreheadArmor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.45), goldArmorMat);
        foreheadArmor.position.set(0, 0.24, 0.15);
        headGroup.add(foreheadArmor);

        // White Muzzle
        const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.38), whiteMat);
        muzzle.position.set(0, -0.06, 0.4);
        headGroup.add(muzzle);

        // Massive Curved Ivory Sabertooth Fangs!
        [-0.14, 0.14].forEach(x => {
            const tusk = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.36, 6), saberFangMat);
            tusk.rotation.x = Math.PI + 0.15;
            tusk.position.set(x, -0.28, 0.48);
            headGroup.add(tusk);
        });

        // Jade Emerald Cat Eyes
        [-0.22, 0.22].forEach(x => {
            const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 0.12), greenEyeMat);
            eye.position.set(x, 0.12, 0.25);
            headGroup.add(eye);
        });

        // Rounded Predator Ears
        [-0.24, 0.24].forEach(x => {
            const ear = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.08), tigerOrangeMat);
            ear.position.set(x, 0.32, -0.08);
            headGroup.add(ear);
        });

        // 4 Muscular Big Cat Legs
        const buildCatLeg = (x, z) => {
            const legRoot = new THREE.Group();
            legRoot.position.set(x, 0.98, z);
            group.add(legRoot);

            const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.5, 0.3), tigerOrangeMat);
            thigh.position.set(0, -0.24, 0);
            thigh.castShadow = true;
            legRoot.add(thigh);

            const shank = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.44, 0.22), tigerOrangeMat);
            shank.position.set(0, -0.62, 0);
            shank.castShadow = true;
            legRoot.add(shank);

            // Broad Padded Tiger Paw
            const paw = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.3), whiteMat);
            paw.position.set(0, -0.88, 0.05);
            paw.castShadow = true;
            legRoot.add(paw);

            return legRoot;
        };

        const flLeg = buildCatLeg(-0.34, 0.62);
        const frLeg = buildCatLeg(0.34, 0.62);
        const blLeg = buildCatLeg(-0.34, -0.62);
        const brLeg = buildCatLeg(0.34, -0.62);

        // Long Sinuous Striped Tiger Tail
        const tailGroup = new THREE.Group();
        tailGroup.position.set(0, 1.25, -0.98);
        tailGroup.rotation.x = -0.4;
        body.add(tailGroup);

        for (let i = 0; i < 5; i++) {
            const segMat = i % 2 === 0 ? tigerOrangeMat : stripeMat;
            const seg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.24, 0.14), segMat);
            seg.position.set(0, -0.12 - i * 0.18, -i * 0.08);
            tailGroup.add(seg);
        }

        return {
            group,
            body,
            neck: neckGroup,
            head: headGroup,
            frontLeftLeg: flLeg,
            frontRightLeg: frLeg,
            backLeftLeg: blLeg,
            backRightLeg: brLeg,
            tail: tailGroup,
            saddleY: 1.24,
            saddleZ: 0,
            speedMultiplier: 1.8,
            canGlide: false,
            type: 'cat'
        };
    },

    // =========================================================================
    // 6. BABI HUTAN PURBA (ARMORED WAR BOAR MOUNT)
    // =========================================================================
    createMountBoar(config = {}) {
        const group = new THREE.Group();
        const boarHideMat = new THREE.MeshLambertMaterial({ color: 0x573926 }); // Dark russet bristly hide
        const mohawkMat = new THREE.MeshLambertMaterial({ color: 0x271a0c }); // Dark bristly spine
        const tuskMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.2 }); // Ivory tusks
        const ironArmorMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 });
        const snoutMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
        const redEyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const hoofMat = new THREE.MeshLambertMaterial({ color: 0x1c1917 });
        const saddleMat = new THREE.MeshLambertMaterial({ color: 0x334155 }); // Dark steel leather

        const body = new THREE.Group();
        group.add(body);

        // Stocky Heavyweight Barrel Torso
        const torso = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.98, 1.7), boarHideMat);
        torso.position.set(0, 1.05, 0);
        torso.castShadow = true;
        body.add(torso);

        // Arched Mohawk Bristles / Spine Ridge
        for (let b = -3; b <= 3; b++) {
            const bristle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.28, 0.18), mohawkMat);
            bristle.position.set(0, 1.62, b * 0.22);
            body.add(bristle);
        }

        // Studded Steel Armor Plates on Flanks
        [-0.56, 0.56].forEach(x => {
            const plate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 0.9), ironArmorMat);
            plate.position.set(x, 1.1, 0);
            body.add(plate);
        });

        // Heavy Reinforced Battle Saddle
        const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.82), saddleMat);
        saddle.position.set(0, 1.58, -0.05);
        body.add(saddle);

        const horn = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.16), ironArmorMat);
        horn.position.set(0, 1.72, 0.32);
        body.add(horn);

        // Broad Heavy Wedge Head & Snout
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 1.1, 0.85);
        headGroup.rotation.x = 0.15;
        body.add(headGroup);

        const skull = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.65, 0.75), boarHideMat);
        skull.castShadow = true;
        headGroup.add(skull);

        // Steel Brow Armor Plate
        const browArmor = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 0.55), ironArmorMat);
        browArmor.position.set(0, 0.32, 0.05);
        headGroup.add(browArmor);

        // Heavy Disc Pig Snout
        const snout = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.42), snoutMat);
        snout.position.set(0, -0.12, 0.52);
        headGroup.add(snout);

        // Nostril indentations
        [-0.1, 0.1].forEach(x => {
            const nostril = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), new THREE.MeshBasicMaterial({ color: 0x1c1917 }));
            nostril.position.set(x, -0.1, 0.74);
            headGroup.add(nostril);
        });

        // TWO PAIRS OF GIGANTIC CURVED IVORY TUSKS!
        // 1. Primary Lower Tusks (Massive curving upward and out)
        [-0.26, 0.26].forEach(x => {
            const lowerTusk = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.65, 6), tuskMat);
            lowerTusk.rotation.set(-0.4, 0, x > 0 ? 0.35 : -0.35);
            lowerTusk.position.set(x, 0.05, 0.62);
            headGroup.add(lowerTusk);
        });

        // 2. Secondary Upper Tusks
        [-0.28, 0.28].forEach(x => {
            const upperTusk = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.38, 6), tuskMat);
            upperTusk.rotation.set(-0.2, 0, x > 0 ? 0.6 : -0.6);
            upperTusk.position.set(x, -0.08, 0.45);
            headGroup.add(upperTusk);
        });

        // Fierce Red Beady Eyes under armored brow
        [-0.28, 0.28].forEach(x => {
            const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.1), redEyeMat);
            eye.position.set(x, 0.12, 0.32);
            headGroup.add(eye);
        });

        // Floppy Bristly Boar Ears
        [-0.38, 0.38].forEach(x => {
            const ear = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.08), boarHideMat);
            ear.position.set(x, 0.22, -0.15);
            ear.rotation.set(0.2, 0, x > 0 ? -0.5 : 0.5);
            headGroup.add(ear);
        });

        // 4 Short, Thick Powerhouse Legs with Cloven Hooves
        const buildBoarLeg = (x, z) => {
            const legRoot = new THREE.Group();
            legRoot.position.set(x, 0.95, z);
            group.add(legRoot);

            const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.46, 0.32), boarHideMat);
            thigh.position.set(0, -0.2, 0);
            thigh.castShadow = true;
            legRoot.add(thigh);

            const shank = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.4, 0.26), boarHideMat);
            shank.position.set(0, -0.55, 0);
            shank.castShadow = true;
            legRoot.add(shank);

            // Cloven Hooves
            const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.3), hoofMat);
            hoof.position.set(0, -0.8, 0.02);
            hoof.castShadow = true;
            legRoot.add(hoof);

            return legRoot;
        };

        const flLeg = buildBoarLeg(-0.38, 0.6);
        const frLeg = buildBoarLeg(0.38, 0.6);
        const blLeg = buildBoarLeg(-0.38, -0.6);
        const brLeg = buildBoarLeg(0.38, -0.6);

        // Curled Piggy Tail
        const tailGroup = new THREE.Group();
        tailGroup.position.set(0, 1.25, -0.92);
        tailGroup.rotation.x = -0.4;
        body.add(tailGroup);

        const tailGeo = new THREE.TorusGeometry(0.12, 0.04, 6, 12, Math.PI * 1.5);
        const tail = new THREE.Mesh(tailGeo, boarHideMat);
        tail.rotation.y = Math.PI / 2;
        tailGroup.add(tail);

        return {
            group,
            body,
            neck: headGroup,
            head: headGroup,
            frontLeftLeg: flLeg,
            frontRightLeg: frLeg,
            backLeftLeg: blLeg,
            backRightLeg: brLeg,
            tail: tailGroup,
            saddleY: 1.2,
            saddleZ: -0.05,
            speedMultiplier: 1.6,
            canGlide: false,
            type: 'boar'
        };
    },

    // =========================================================================
    // UNIFIED MOUNT FACTORY DISPATCHER
    // =========================================================================
    createMount(type = 'horse', config = {}) {
        const cleanType = String(type).replace(/^mount_/, '');
        switch (cleanType) {
            case 'horse':
                return this.createMountHorse(config);
            case 'bird':
                return this.createMountBird(config);
            case 'pegasus':
                return this.createMountPegasus(config);
            case 'wolf':
                return this.createMountWolf(config);
            case 'cat':
                return this.createMountBigCat(config);
            case 'boar':
                return this.createMountBoar(config);
            default:
                return this.createMountHorse(config);
        }
    },

    // =========================================================================
    // KANDANG TUNGGANGAN & PETERNAK BARNABY (ROYAL STABLE & STABLE MASTER NPC)
    // =========================================================================
    createStableBuilding() {
        const group = new THREE.Group();
        const timberMat = new THREE.MeshLambertMaterial({ color: 0x5c381c });
        const plankMat = new THREE.MeshLambertMaterial({ color: 0x966036 });
        const roofMat = new THREE.MeshLambertMaterial({ color: 0x4a2e1b });
        const hayMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
        const ironMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
        const waterMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });

        // Stable Floor Platform (Cobblestone / dirt pad)
        const floor = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.3, 7.5), new THREE.MeshLambertMaterial({ color: 0x78716c }));
        floor.position.set(0, 0.15, 0);
        floor.receiveShadow = true;
        group.add(floor);

        // 6 Heavy Timber Support Posts
        const postGeo = new THREE.BoxGeometry(0.5, 3.8, 0.5);
        const postPositions = [
            [-4.8, 1.9, -3.3], [0, 1.9, -3.3], [4.8, 1.9, -3.3],
            [-4.8, 1.9, 3.3], [0, 1.9, 3.3], [4.8, 1.9, 3.3]
        ];
        postPositions.forEach(p => {
            const post = new THREE.Mesh(postGeo, timberMat);
            post.position.set(p[0], p[1], p[2]);
            post.castShadow = true;
            group.add(post);
        });

        // Back Wall Planks
        const backWall = new THREE.Mesh(new THREE.BoxGeometry(9.8, 3.2, 0.25), plankMat);
        backWall.position.set(0, 1.8, -3.3);
        backWall.castShadow = true;
        group.add(backWall);

        // Side Walls
        [-4.8, 4.8].forEach(x => {
            const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.2, 6.6), plankMat);
            sideWall.position.set(x, 1.8, 0);
            sideWall.castShadow = true;
            group.add(sideWall);
        });

        // Center Stall Divider Partition
        const divider = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.0, 5.5), plankMat);
        divider.position.set(0, 1.2, -0.4);
        group.add(divider);

        // Gable / Slanted Shingled Stable Roof
        const roofLeft = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.25, 8.2), roofMat);
        roofLeft.position.set(-2.5, 4.3, 0);
        roofLeft.rotation.z = 0.32;
        roofLeft.castShadow = true;
        group.add(roofLeft);

        const roofRight = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.25, 8.2), roofMat);
        roofRight.position.set(2.5, 4.3, 0);
        roofRight.rotation.z = -0.32;
        roofRight.castShadow = true;
        group.add(roofRight);

        // Wooden Signboard: "KANDANG TUNGGANGAN OAKHAVEN"
        const signCanvas = document.createElement('canvas');
        signCanvas.width = 512;
        signCanvas.height = 128;
        const sctx = signCanvas.getContext('2d');
        sctx.fillStyle = '#3e220e';
        sctx.fillRect(0, 0, 512, 128);
        sctx.lineWidth = 8;
        sctx.strokeStyle = '#d97706';
        sctx.strokeRect(6, 6, 500, 116);
        sctx.fillStyle = '#fde047';
        sctx.font = 'bold 36px sans-serif';
        sctx.textAlign = 'center';
        sctx.textBaseline = 'middle';
        sctx.fillText('🐎 KANDANG TUNGGANGAN 🐎', 256, 45);
        sctx.fillStyle = '#ffffff';
        sctx.font = 'bold 22px sans-serif';
        sctx.fillText('Oakhaven Royal Stables & Mounts', 256, 92);

        const signTex = new THREE.CanvasTexture(signCanvas);
        const signMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.05, 0.15), new THREE.MeshBasicMaterial({ map: signTex }));
        signMesh.position.set(0, 3.8, 3.4);
        group.add(signMesh);

        // Hanging Iron Lanterns
        [-3.6, 3.6].forEach(x => {
            const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.5, 0.35), new THREE.MeshStandardMaterial({
                color: 0xfacc15,
                emissive: 0xf59e0b,
                emissiveIntensity: 0.8
            }));
            lantern.position.set(x, 2.9, 3.3);
            group.add(lantern);
        });

        // Hay Bales inside stalls
        const hay1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.2), hayMat);
        hay1.position.set(-2.8, 0.6, -2.2);
        group.add(hay1);

        const hay2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 1.1), hayMat);
        hay2.position.set(2.8, 0.55, -2.2);
        group.add(hay2);

        // Wooden Water Trough
        const troughBox = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 0.9), timberMat);
        troughBox.position.set(-3.2, 0.45, 1.8);
        group.add(troughBox);

        const troughWater = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.7), waterMat);
        troughWater.position.set(-3.2, 0.65, 1.8);
        group.add(troughWater);

        return group;
    },

    createStableMasterNPC() {
        const group = new THREE.Group();
        const skinMat = new THREE.MeshLambertMaterial({ color: 0xffdfc4 });
        const tunicMat = new THREE.MeshLambertMaterial({ color: 0x15803d }); // Forest Green ranger tunic
        const vestMat = new THREE.MeshLambertMaterial({ color: 0x78350f }); // Leather vest
        const pantsMat = new THREE.MeshLambertMaterial({ color: 0x3f3f46 });
        const bootMat = new THREE.MeshLambertMaterial({ color: 0x27170e });
        const hatMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
        const featherMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });
        const hairMat = new THREE.MeshLambertMaterial({ color: 0x854d0e });

        // Body
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.88, 0.46), tunicMat);
        torso.position.y = 1.35;
        torso.castShadow = true;
        group.add(torso);

        const vest = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.8, 0.48), vestMat);
        vest.position.y = 1.35;
        group.add(vest);

        // Belt & Treat Pouch
        const belt = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.16, 0.5), new THREE.MeshLambertMaterial({ color: 0x1c1917 }));
        belt.position.y = 0.95;
        group.add(belt);

        const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.22), new THREE.MeshLambertMaterial({ color: 0xa16207 }));
        pouch.position.set(0.32, 0.95, 0.2);
        group.add(pouch);

        // Head
        const headGroup = new THREE.Group();
        headGroup.position.y = 2.05;
        group.add(headGroup);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.65), skinMat);
        head.castShadow = true;
        headGroup.add(head);

        // Friendly Beard & Hair
        const beard = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.35, 0.25), hairMat);
        beard.position.set(0, -0.22, 0.26);
        headGroup.add(beard);

        // Eyes
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
        [-0.18, 0.18].forEach(x => {
            const eye = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), eyeMat);
            eye.position.set(x, 0.06, 0.33);
            headGroup.add(eye);
        });

        // Ranger Hat with Red Feather!
        const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.08, 16), hatMat);
        hatBrim.position.y = 0.36;
        headGroup.add(hatBrim);

        const hatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 0.45, 16), hatMat);
        hatCrown.position.y = 0.58;
        headGroup.add(hatCrown);

        const feather = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.16), featherMat);
        feather.position.set(0.38, 0.72, 0);
        feather.rotation.z = -0.3;
        headGroup.add(feather);

        // Arms (Right arm raised in friendly wave)
        const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), tunicMat);
        leftArm.position.set(-0.48, 1.25, 0);
        group.add(leftArm);

        const rightArmGroup = new THREE.Group();
        rightArmGroup.position.set(0.48, 1.55, 0);
        rightArmGroup.rotation.z = 0.6; // Waving
        group.add(rightArmGroup);

        const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), tunicMat);
        rightArm.position.y = -0.25;
        rightArmGroup.add(rightArm);

        // Horse Brush in hand
        const brush = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.26), new THREE.MeshLambertMaterial({ color: 0xd97706 }));
        brush.position.set(0, -0.6, 0.05);
        rightArmGroup.add(brush);

        // Legs & Boots
        [-0.2, 0.2].forEach(x => {
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.55, 0.28), pantsMat);
            leg.position.set(x, 0.65, 0);
            group.add(leg);

            const boot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.35, 0.36), bootMat);
            boot.position.set(x, 0.18, 0.04);
            group.add(boot);
        });

        return {
            group,
            headGroup,
            rightArmGroup,
            name: 'Barnaby the Beastmaster'
        };
    }
};



