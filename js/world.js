// Multi-Zone World Manager: 300x300 Expansive Open-World RPG with Realism & Diorama Aesthetics
// Procedural Swaying Grass, Wildflowers, River Water Ripples, Cobblestones, and Atmospheric Lighting

const RPGTextures = {
    grassTexture: null,
    cobbleTexture: null,
    waterTexture: null,
    riverbedTexture: null,
    shoreFoamTexture: null,
    forestTexture: null,
    ruinsTexture: null,
    lavaTexture: null,

    getGrass() {
        if (this.grassTexture) return this.grassTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Base lush grass gradient
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#469c54');
        grad.addColorStop(0.5, '#4fa856');
        grad.addColorStop(1, '#3e914a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Organic micro-blades and natural grass clumping
        const colors = ['#388344', '#58b860', '#63c46b', '#30773b', '#6cc973', '#498f37'];
        for (let i = 0; i < 4500; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const len = 3 + Math.random() * 6;
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
            ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.lineWidth = 1 + Math.random() * 1.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
            ctx.stroke();
        }

        // Earthy soil flecks and subtle clover dots
        for (let i = 0; i < 280; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            ctx.fillStyle = Math.random() > 0.4 ? '#336128' : '#7cb342';
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + Math.random() * 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(24, 24);
        this.grassTexture = texture;
        return texture;
    },

    getCobblestone() {
        if (this.cobbleTexture) return this.cobbleTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Mortar base
        ctx.fillStyle = '#675c4e';
        ctx.fillRect(0, 0, 512, 512);

        // Grid of hand-laid rounded cobblestones
        const stoneRows = 16;
        const stoneCols = 16;
        const rw = 512 / stoneCols;
        const rh = 512 / stoneRows;
        const stoneTones = ['#cbbca1', '#d4c7ad', '#bfaa8f', '#e0d5be', '#b5a487', '#cfc0a5'];

        for (let r = 0; r < stoneRows; r++) {
            const offset = (r % 2) * (rw * 0.5);
            for (let c = -1; c <= stoneCols; c++) {
                const x = c * rw + offset + (Math.random() - 0.5) * 2;
                const y = r * rh + (Math.random() - 0.5) * 2;
                const w = rw - 4 + (Math.random() - 0.5) * 2;
                const h = rh - 4 + (Math.random() - 0.5) * 2;

                // Cobblestone body
                ctx.fillStyle = stoneTones[Math.floor(Math.random() * stoneTones.length)];
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(x + 2, y + 2, w, h, 4);
                else ctx.rect(x + 2, y + 2, w, h);
                ctx.fill();

                // 3D Bevel highlight (top/left)
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x + 3, y + h);
                ctx.lineTo(x + 3, y + 3);
                ctx.lineTo(x + w, y + 3);
                ctx.stroke();

                // 3D Bevel shadow (bottom/right)
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.moveTo(x + w, y + 3);
                ctx.lineTo(x + w, y + h);
                ctx.lineTo(x + 3, y + h);
                ctx.stroke();
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 16);
        this.cobbleTexture = texture;
        return texture;
    },

    getWater() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Deep azure water gradient: translucent turquoise to deep oceanic sapphire
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0.0, '#0284c7');
        grad.addColorStop(0.2, '#0ea5e9');
        grad.addColorStop(0.5, '#0369a1');
        grad.addColorStop(0.8, '#0ea5e9');
        grad.addColorStop(1.0, '#0284c7');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // High-detail Voronoi caustics network
        const numPoints = 64;
        const pts = [];
        for (let i = 0; i < numPoints; i++) {
            pts.push({
                x: (((Math.sin(i * 12.9898 + 1.2) * 43758.5453) % 1 + 1) % 1) * 512,
                y: (((Math.cos(i * 78.233 + 3.4) * 43758.5453) % 1 + 1) % 1) * 512
            });
        }

        // Draw luminous caustics webbing
        ctx.lineWidth = 2.8;
        ctx.strokeStyle = 'rgba(240, 249, 255, 0.42)';
        for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i];
            for (let j = i + 1; j < pts.length; j++) {
                const p2 = pts[j];
                let dx = Math.abs(p1.x - p2.x);
                if (dx > 256) dx = 512 - dx;
                let dy = Math.abs(p1.y - p2.y);
                if (dy > 256) dy = 512 - dy;
                const dist = Math.hypot(dx, dy);
                if (dist < 80 && dist > 18) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    const midX = (p1.x + p2.x) / 2 + Math.sin(i + j) * 8;
                    const midY = (p1.y + p2.y) / 2 + Math.cos(i * j) * 8;
                    ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        // Shimmering wave ripple lines
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.32)';
        for (let y = 10; y < 512; y += 18) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            for (let x = 0; x <= 512; x += 16) {
                const cy = y + Math.sin(x * 0.08 + y * 0.03) * 4 + Math.cos(x * 0.04) * 3;
                ctx.lineTo(x, cy);
            }
            ctx.stroke();
        }

        // Sunlight specular sparkle flecks
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        for (let i = 0; i < 220; i++) {
            const sx = Math.random() * 512;
            const sy = Math.random() * 512;
            const sr = 0.8 + Math.random() * 1.6;
            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(12, 2);
        return texture;
    },

    getRiverbed() {
        if (this.riverbedTexture) return this.riverbedTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Dark moist riverbed silt / gravel base
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(0, 0, 512, 512);

        // Hundreds of smooth river pebbles & stones
        const stoneColors = ['#44403c', '#57534e', '#78716c', '#a8a29e', '#3f3f46', '#292524', '#713f12', '#14532d', '#334155'];
        for (let i = 0; i < 1600; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const rx = 3 + Math.random() * 7;
            const ry = 2 + Math.random() * 5;
            const rot = Math.random() * Math.PI;

            ctx.fillStyle = stoneColors[Math.floor(Math.random() * stoneColors.length)];
            ctx.beginPath();
            ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(x - 1, y - 1, rx * 0.7, ry * 0.7, rot, 0, Math.PI);
            ctx.stroke();
        }

        // Shimmering gold and river sand specks
        for (let i = 0; i < 350; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            ctx.fillStyle = Math.random() > 0.35 ? '#ca8a04' : '#eab308';
            ctx.fillRect(x, y, 1.5, 1.5);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 3);
        this.riverbedTexture = texture;
        return texture;
    },

    getShoreFoam() {
        if (this.shoreFoamTexture) return this.shoreFoamTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 512, 128);

        // Soft frothy foam bubbles along riverbank
        for (let i = 0; i < 1200; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 128;
            const r = 1 + Math.random() * 3.5;
            const alpha = Math.sin((y / 128) * Math.PI) * 0.8;
            ctx.fillStyle = `rgba(240, 253, 250, ${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.repeat.set(12, 1);
        this.shoreFoamTexture = texture;
        return texture;
    },

    getForestGround() {
        if (this.forestTexture) return this.forestTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#22381e';
        ctx.fillRect(0, 0, 512, 512);

        const colors = ['#2f4c28', '#1a2e16', '#3b5e32', '#4b3f2f', '#56422d'];
        for (let i = 0; i < 3500; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillRect(x, y, 2 + Math.random() * 3, 2 + Math.random() * 3);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);
        this.forestTexture = texture;
        return texture;
    },

    getRuinsFloor() {
        if (this.ruinsTexture) return this.ruinsTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        const step = 64;
        for (let x = 0; x <= 512; x += step) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
        }
        for (let y = 0; y <= 512; y += step) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
        }

        for (let i = 0; i < 2000; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? 'rgba(51, 65, 85, 0.4)' : 'rgba(15, 23, 42, 0.4)';
            ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 16);
        this.ruinsTexture = texture;
        return texture;
    },

    getLavaCrust() {
        if (this.lavaTexture) return this.lavaTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#181313';
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        for (let i = 0; i < 16; i++) {
            ctx.beginPath();
            let x = Math.random() * 512;
            let y = Math.random() * 512;
            ctx.moveTo(x, y);
            for (let seg = 0; seg < 5; seg++) {
                x += (Math.random() - 0.5) * 80;
                y += (Math.random() - 0.5) * 80;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(14, 14);
        this.lavaTexture = texture;
        return texture;
    }
};

class WorldManager {
    constructor(scene) {
        this.scene = scene;
        this.currentZone = 'town';

        this.zoneGroup = new THREE.Group();
        this.scene.add(this.zoneGroup);

        this.colliders = [];
        this.portals = [];
        this.enemies = [];
        this.collectibles = [];
        this.chests = [];
        this.npcs = [];
        this.roamingVillagers = [];
        this.particles = null;
        this.smokePuffs = [];
        this.portalCooldown = 0;

        // Realistic grass, flowers, water & wind uniforms
        this.grassMesh = null;
        this.flowerMesh = null;
        this.grassShaderUniforms = null;
        this.waterTexture = null;
        this.waterShaderUniforms = null;
        this.floatingLilyPads = [];
        this.shoreFoamTextures = [];
        this.riverData = null;

        // Special entities
        this.shopkeeper = null;
        this.angelWizard = null;
        this.villageElder = null;
        this.villageGuard = null;
        this.villageGuard2 = null;
        this.villageDog = null;
        this.windmill = null;
        this.speechBubble = null;
        this.dragonBoss = null;
        this.stableBuilding = null;
        this.stableMaster = null;
        this.previewMounts = [];

        // Lighting
        this.hemiLight = null;
        this.ambientLight = null;
        this.sunLight = null;

        this.initLighting();
        this.buildZone('town');
    }

    initLighting() {
        // Natural diorama sky & ground ambient fill
        this.hemiLight = new THREE.HemisphereLight(0xbad7f2, 0x4a7c40, 0.65);
        this.scene.add(this.hemiLight);

        this.ambientLight = new THREE.AmbientLight(0xfff1e6, 0.45);
        this.scene.add(this.ambientLight);

        this.sunLight = new THREE.DirectionalLight(0xfff4db, 1.15);
        this.sunLight.position.set(45, 75, 50);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 420;
        this.sunLight.shadow.camera.left = -160;
        this.sunLight.shadow.camera.right = 160;
        this.sunLight.shadow.camera.top = 160;
        this.sunLight.shadow.camera.bottom = -160;
        this.sunLight.shadow.bias = -0.0004;
        this.scene.add(this.sunLight);
    }

    clearZone() {
        while (this.zoneGroup.children.length > 0) {
            const obj = this.zoneGroup.children[0];
            this.zoneGroup.remove(obj);
        }

        // Clean up smoke particles
        this.smokePuffs.forEach(p => this.scene.remove(p.mesh));
        this.smokePuffs = [];

        // Clean up instanced grass and wildflowers
        if (this.grassMesh) {
            this.zoneGroup.remove(this.grassMesh);
            if (this.grassMesh.geometry) this.grassMesh.geometry.dispose();
            this.grassMesh = null;
        }
        if (this.flowerMesh) {
            this.zoneGroup.remove(this.flowerMesh);
            if (this.flowerMesh.geometry) this.flowerMesh.geometry.dispose();
            this.flowerMesh = null;
        }
        this.grassShaderUniforms = null;
        this.waterTexture = null;
        this.waterShaderUniforms = null;
        this.floatingLilyPads = [];
        this.shoreFoamTextures = [];
        this.riverData = null;

        this.colliders = [];
        this.portals = [];
        this.enemies = [];
        this.collectibles = [];
        this.chests = [];
        this.npcs = [];
        this.roamingVillagers = [];
        this.shopkeeper = null;
        this.angelWizard = null;
        this.villageElder = null;
        this.villageGuard = null;
        this.villageGuard2 = null;
        this.villageDog = null;
        this.windmill = null;
        this.speechBubble = null;
        this.dragonBoss = null;
        this.stableBuilding = null;
        this.stableMaster = null;
        this.previewMounts = [];
    }

    // =========================================================================
    // REALISTIC RIVER & WATER SIMULATION SYSTEM (3D Waves, Riverbed, Caustics & Foam)
    // =========================================================================
    createRealisticRiver(options = {}) {
        const centerZ = options.centerZ !== undefined ? options.centerZ : 48;
        const width = options.width !== undefined ? options.width : 13.5;
        const length = options.length !== undefined ? options.length : 300;
        const zoneGroup = options.zoneGroup || this.zoneGroup;

        // 1. Excavated Riverbed Ground Channel (depth y = -0.75)
        const bedGeo = new THREE.PlaneGeometry(length, width - 2.0);
        const bedMat = new THREE.MeshLambertMaterial({
            map: RPGTextures.getRiverbed(),
            color: 0xaabbcc
        });
        const riverbed = new THREE.Mesh(bedGeo, bedMat);
        riverbed.rotation.x = -Math.PI / 2;
        riverbed.position.set(0, -0.75, centerZ);
        riverbed.receiveShadow = true;
        zoneGroup.add(riverbed);

        // Sloping North Embankment (slopes from ground y=0 down to bed y=-0.75)
        const bankNorthGeo = new THREE.PlaneGeometry(length, 1.8);
        const bankMat = new THREE.MeshLambertMaterial({
            map: RPGTextures.getRiverbed(),
            color: 0x667766
        });
        const bankNorth = new THREE.Mesh(bankNorthGeo, bankMat);
        bankNorth.position.set(0, -0.37, centerZ - width / 2 + 0.9);
        bankNorth.rotation.x = -Math.PI / 2 + 0.46;
        bankNorth.receiveShadow = true;
        zoneGroup.add(bankNorth);

        // Sloping South Embankment (slopes from ground y=0 down to bed y=-0.75)
        const bankSouth = new THREE.Mesh(bankNorthGeo, bankMat);
        bankSouth.position.set(0, -0.37, centerZ + width / 2 - 0.9);
        bankSouth.rotation.x = -Math.PI / 2 - 0.46;
        bankSouth.receiveShadow = true;
        zoneGroup.add(bankSouth);

        // 2. Submerged River Rocks & Boulders visible beneath the clear water
        const skipBridges = options.skipBridges || [];
        for (let i = 0; i < 40; i++) {
            const rx = (Math.random() - 0.5) * (length - 30);
            const rz = centerZ + (Math.random() - 0.5) * (width - 3.2);

            let skip = false;
            for (let b of skipBridges) {
                if (Math.abs(rx - b.x) < b.w) { skip = true; break; }
            }
            if (skip) continue;

            const rock = ModelFactory.createMossyRock();
            rock.position.set(rx, -0.65, rz);
            const s = 0.5 + Math.random() * 0.7;
            rock.scale.set(s, s * 0.55, s);
            rock.rotation.y = Math.random() * Math.PI * 2;
            zoneGroup.add(rock);
        }

        // 3. Underwater Dancing Sunlight Caustics Layer
        const causticsTex = RPGTextures.getWater();
        const causticsMat = new THREE.MeshBasicMaterial({
            map: causticsTex,
            transparent: true,
            opacity: 0.36,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const causticsMesh = new THREE.Mesh(new THREE.PlaneGeometry(length, width - 2.2), causticsMat);
        causticsMesh.rotation.x = -Math.PI / 2;
        causticsMesh.position.set(0, -0.71, centerZ);
        zoneGroup.add(causticsMesh);

        // 4. MAIN REALISTIC WATER SURFACE MESH (Subdivided 140x24 for dynamic 3D waves)
        const waterGeo = new THREE.PlaneGeometry(length, width, 140, 24);
        const waterTex = RPGTextures.getWater();
        this.waterTexture = waterTex;

        const riverMat = new THREE.MeshStandardMaterial({
            map: waterTex,
            roughness: 0.08,
            metalness: 0.22,
            transparent: true,
            opacity: 0.84,
            side: THREE.DoubleSide
        });

        // Dynamic 3D River Waves Shader with compound Gerstner waves & shore foam
        riverMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 };
            shader.uniforms.uHalfWidth = { value: width / 2 };
            shader.uniforms.uCenterZ = { value: centerZ };
            this.waterShaderUniforms = shader.uniforms;

            shader.vertexShader = `
                uniform float uTime;
                uniform float uHalfWidth;
                uniform float uCenterZ;
                varying vec3 vWorldPosition;
                varying float vShoreDist;
                varying float vWaveHeight;
            ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                
                // Multi-frequency natural river wave displacement
                float w1 = sin(position.x * 0.28 + uTime * 2.4 + position.y * 0.35) * 0.075;
                float w2 = cos(position.x * 0.65 - uTime * 3.2 - position.y * 0.55) * 0.04;
                float w3 = sin(position.x * 1.35 + uTime * 4.6) * 0.018;
                float totalWave = w1 + w2 + w3;

                // Dampen waves near shores so water meets riverbanks smoothly
                float distFromCenter = abs(position.y);
                float shoreFactor = smoothstep(uHalfWidth, uHalfWidth - 1.5, distFromCenter);
                transformed.z += totalWave * shoreFactor;

                vWaveHeight = totalWave;
                vShoreDist = 1.0 - (distFromCenter / uHalfWidth);
                `
            );

            shader.vertexShader = shader.vertexShader.replace(
                '#include <worldpos_vertex>',
                `
                #include <worldpos_vertex>
                vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;
                `
            );

            shader.fragmentShader = `
                uniform float uTime;
                varying vec3 vWorldPosition;
                varying float vShoreDist;
                varying float vWaveHeight;
            ` + shader.fragmentShader;

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
                #include <dithering_fragment>

                // Depth color gradient: crystal cyan near shore to deep sapphire in center
                vec3 shallowWaterColor = vec3(0.14, 0.74, 0.95);
                vec3 deepWaterColor    = vec3(0.01, 0.42, 0.72);
                vec3 waterBase = mix(shallowWaterColor, deepWaterColor, clamp(vShoreDist * 1.3, 0.0, 1.0));

                // Dynamic Animated Shore Foam along both banks
                float foamNoise = sin(vWorldPosition.x * 2.5 + uTime * 3.8) * cos(vWorldPosition.z * 3.2 - uTime * 2.2);
                float foamEdge = smoothstep(0.18, 0.02, vShoreDist);
                float foamMask = foamEdge * step(0.15, foamNoise + 0.65);
                vec3 foamColor = vec3(0.96, 0.98, 1.0);

                // Sun glints / sparkling specular points
                float glint = pow(max(0.0, sin(vWorldPosition.x * 4.5 + uTime * 5.0) * cos(vWorldPosition.z * 5.2 - uTime * 4.2)), 8.0) * 0.6;

                // Composite realistic water
                gl_FragColor.rgb = mix(gl_FragColor.rgb * waterBase * 1.5, foamColor, foamMask * 0.85) + vec3(glint);
                gl_FragColor.a = clamp(0.72 + vShoreDist * 0.16 + foamMask * 0.25, 0.0, 0.95);
                `
            );
        };

        const river = new THREE.Mesh(waterGeo, riverMat);
        river.rotation.x = -Math.PI / 2;
        river.position.set(0, 0.04, centerZ);
        river.receiveShadow = true;
        zoneGroup.add(river);

        // 5. Shore Foam Ribbons along North and South Banks
        const foamTex = RPGTextures.getShoreFoam();
        this.shoreFoamTextures.push(foamTex);
        const foamMat = new THREE.MeshBasicMaterial({
            map: foamTex,
            transparent: true,
            opacity: 0.75,
            side: THREE.DoubleSide
        });

        const foamNorth = new THREE.Mesh(new THREE.PlaneGeometry(length, 0.9), foamMat);
        foamNorth.rotation.x = -Math.PI / 2;
        foamNorth.position.set(0, 0.045, centerZ - width / 2 + 0.45);
        zoneGroup.add(foamNorth);

        const foamSouth = new THREE.Mesh(new THREE.PlaneGeometry(length, 0.9), foamMat);
        foamSouth.rotation.x = -Math.PI / 2;
        foamSouth.position.set(0, 0.045, centerZ + width / 2 - 0.45);
        zoneGroup.add(foamSouth);

        this.riverData = {
            riverMesh: river,
            causticsMesh,
            centerZ,
            width,
            waterY: 0.04
        };

        return this.riverData;
    }

    // River Water & Elevation Query: reports swimming vs ground vs bridge
    getElevationAndWater(x, z) {
        if (this.currentZone === 'town') {
            // Town River: center at z = 48, width = 13.5 -> z in [41.25, 54.75]
            if (z >= 41.5 && z <= 54.5) {
                // Wooden bridge at (0, 0, 48)
                if (Math.abs(x) <= 2.6 && z >= 42.0 && z <= 54.0) {
                    return { inWater: false, groundY: 0.5, isBridge: true };
                }
                // Docks pier at (24, 0, 44)
                if (x >= 22.0 && x <= 26.0 && z >= 39.5 && z <= 48.0) {
                    return { inWater: false, groundY: 0.25, isPier: true };
                }
                return { inWater: true, groundY: -0.48, waterY: 0.04 };
            }
        } else if (this.currentZone === 'forest') {
            // Forest River: center at z = 0, width = 14.0 -> z in [-7.0, 7.0]
            if (z >= -7.0 && z <= 7.0) {
                // Bridge 1 at (-20, 0, 0)
                if (Math.abs(x - (-20)) <= 2.6 && Math.abs(z) <= 5.5) {
                    return { inWater: false, groundY: 0.5, isBridge: true };
                }
                // Bridge 2 at (20, 0, 0)
                if (Math.abs(x - 20) <= 2.6 && Math.abs(z) <= 5.5) {
                    return { inWater: false, groundY: 0.5, isBridge: true };
                }
                return { inWater: true, groundY: -0.48, waterY: 0.04 };
            }
        }
        return { inWater: false, groundY: 0.0 };
    }

    // =========================================================================
    // PROCEDURAL 3D SWAYING GRASS & WILDFLOWER ENGINE (InstancedMesh + GPU Wind)
    // =========================================================================
    buildGrassAndFlowers(zoneId, tuftCount = 3500, flowerCount = 650) {
        // 1. Instanced Grass Tufts with GPU Vertex Wind Shader
        const grassGeo = ModelFactory.createGrassTuftGeometry();
        const grassMat = new THREE.MeshLambertMaterial({
            color: zoneId === 'forest' ? 0x3d7a42 : 0x58c568,
            side: THREE.DoubleSide
        });

        grassMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 };
            this.grassShaderUniforms = shader.uniforms;
            shader.vertexShader = `
                uniform float uTime;
            ` + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                #ifdef USE_INSTANCING
                    float instX = instanceMatrix[3][0];
                    float instZ = instanceMatrix[3][2];
                #else
                    float instX = position.x;
                    float instZ = position.z;
                #endif
                float windWave = sin(uTime * 2.8 + instX * 0.35 + instZ * 0.28) * 0.22 +
                                 cos(uTime * 1.6 + instZ * 0.45) * 0.12;
                float hFactor = smoothstep(0.05, 0.9, position.y);
                transformed.x += windWave * hFactor;
                transformed.z += (windWave * 0.6) * hFactor;
                `
            );
        };

        const grassMesh = new THREE.InstancedMesh(grassGeo, grassMat, tuftCount);
        grassMesh.receiveShadow = true;

        const dummy = new THREE.Object3D();
        const colorVar = new THREE.Color();
        const townPalettes = [0x4ade80, 0x22c55e, 0x84cc16, 0x16a34a, 0x65a30d, 0x86efac];
        const forestPalettes = [0x2d6a4f, 0x40916c, 0x52b788, 0x1b4332, 0x74c69d];

        let placed = 0;
        let attempts = 0;
        const maxAttempts = tuftCount * 5;

        while (placed < tuftCount && attempts < maxAttempts) {
            attempts++;
            const rx = (Math.random() - 0.5) * 260;
            const rz = (Math.random() - 0.5) * 260;

            if (zoneId === 'town') {
                if (Math.hypot(rx, rz) < 22) continue; // Plaza circle
                if (Math.abs(rx) < 5.0 && rz > -40 && rz < 0) continue; // North Road
                if (Math.abs(rx) < 5.0 && rz > 0 && rz < 75) continue; // South Road
                if (Math.abs(rz) < 4.0 && rx > 0 && rx < 65) continue; // East Road
                if (Math.abs(rz) < 4.0 && rx < 0 && rx > -65) continue; // West Road
                if (rz > 41.0 && rz < 55.0) continue; // Inside River water & banks
                if (Math.abs(rx) < 6 && rz < -34 && rz > -42) continue; // Shop porch
            } else if (zoneId === 'forest') {
                if (rz > -7.5 && rz < 7.5) continue; // River & banks
                if (Math.abs(rx) < 4.0 && rz < -6) continue; // Trail
            }

            const scale = 0.75 + Math.random() * 0.55;
            dummy.position.set(rx, 0, rz);
            dummy.rotation.y = Math.random() * Math.PI * 2;
            dummy.scale.set(scale, scale * (0.85 + Math.random() * 0.35), scale);
            dummy.updateMatrix();

            grassMesh.setMatrixAt(placed, dummy.matrix);

            const palette = zoneId === 'forest' ? forestPalettes : townPalettes;
            colorVar.setHex(palette[Math.floor(Math.random() * palette.length)]);
            grassMesh.setColorAt(placed, colorVar);

            placed++;
        }
        grassMesh.instanceMatrix.needsUpdate = true;
        if (grassMesh.instanceColor) grassMesh.instanceColor.needsUpdate = true;
        this.zoneGroup.add(grassMesh);
        this.grassMesh = grassMesh;

        // 2. Wildflowers InstancedMesh
        const flowerGeo = ModelFactory.createFlowerGeometry();
        const flowerMat = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        });

        flowerMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 };
            shader.vertexShader = `
                uniform float uTime;
            ` + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                #ifdef USE_INSTANCING
                    float instX = instanceMatrix[3][0];
                    float instZ = instanceMatrix[3][2];
                #else
                    float instX = position.x;
                    float instZ = position.z;
                #endif
                float windWave = sin(uTime * 2.8 + instX * 0.35 + instZ * 0.28) * 0.18;
                float hFactor = smoothstep(0.1, 0.7, position.y);
                transformed.x += windWave * hFactor;
                transformed.z += (windWave * 0.5) * hFactor;
                `
            );
        };

        const flowerMesh = new THREE.InstancedMesh(flowerGeo, flowerMat, flowerCount);
        const flowerColors = [0xef4444, 0xfacc15, 0xf8fafc, 0x38bdf8, 0xa855f7, 0xf472b6];

        let flowersPlaced = 0;
        let fAttempts = 0;
        while (flowersPlaced < flowerCount && fAttempts < flowerCount * 5) {
            fAttempts++;
            const rx = (Math.random() - 0.5) * 240;
            const rz = (Math.random() - 0.5) * 240;

            if (zoneId === 'town') {
                if (Math.hypot(rx, rz) < 22) continue;
                if (Math.abs(rx) < 5.0 && rz > -40 && rz < 75) continue;
                if (Math.abs(rz) < 4.0 && Math.abs(rx) < 65) continue;
                if (rz > 41.0 && rz < 55.0) continue;
            } else if (zoneId === 'forest') {
                if (rz > -7.5 && rz < 7.5) continue;
            }

            const scale = 0.8 + Math.random() * 0.45;
            dummy.position.set(rx, 0, rz);
            dummy.rotation.y = Math.random() * Math.PI * 2;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();

            flowerMesh.setMatrixAt(flowersPlaced, dummy.matrix);
            colorVar.setHex(flowerColors[Math.floor(Math.random() * flowerColors.length)]);
            flowerMesh.setColorAt(flowersPlaced, colorVar);

            flowersPlaced++;
        }

        flowerMesh.instanceMatrix.needsUpdate = true;
        if (flowerMesh.instanceColor) flowerMesh.instanceColor.needsUpdate = true;
        this.zoneGroup.add(flowerMesh);
        this.flowerMesh = flowerMesh;
    }

    changeZone(newZoneId, spawnPos = null, force = false) {
        if (this.currentZone === newZoneId) return false;

        // Validasi urutan misi: Cegah pemain loncat ke wilayah yang belum terbuka
        if (!force && window.QuestSys && !window.QuestSys.isZoneUnlocked(newZoneId)) {
            const reason = window.QuestSys.getZoneLockReason(newZoneId);
            if (typeof Audio !== 'undefined' && Audio.playHit) Audio.playHit();
            if (window.UI) {
                window.UI.showCustomDialogue('elder', reason);
            }
            return false;
        }

        this.portalCooldown = 4.0; // 4 detik kekebalan portal agar tidak langsung teleportasi balik
        this.currentZone = newZoneId;
        this.buildZone(newZoneId);

        if (window.game && window.game.player) {
            const spawn = spawnPos || this.getDefaultSpawn(newZoneId);
            window.game.player.mesh.position.set(spawn.x, 0, spawn.z);
        }

        if (window.QuestSys) {
            window.QuestSys.onZoneEntered(newZoneId);
        }

        this.showZoneBanner(newZoneId);
        Audio.playPurchase();
        return true;
    }

    getDefaultSpawn(zoneId) {
        switch (zoneId) {
            case 'town': return { x: 0, z: 12 };
            case 'forest': return { x: 0, z: -70 };
            case 'ruins': return { x: -70, z: 0 };
            case 'boss_peak': return { x: 0, z: -70 };
            default: return { x: 0, z: 0 };
        }
    }

    showZoneBanner(zoneId) {
        const zoneNames = {
            town: '🏰 DESA OAKHAVEN (KOTA UTAMA & PASAR RAYA)',
            forest: '🌲 WHISPERING WOODS (HUTAN LIAR, SUNGAI & SLIME)',
            ruins: '🏛️ GOBLIN CRYPT RUINS (LABIRIN RERUNTUHAN GOBLIN)',
            boss_peak: '🌋 CRIMSON DRAGON PEAK (PUNCAK NAGA BERAPI)'
        };

        const div = document.createElement('div');
        div.className = 'zone-transition-banner';
        div.innerHTML = `<span>MEMASUKI WILAYAH:</span><br><b>${zoneNames[zoneId] || zoneId.toUpperCase()}</b>`;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2600);
    }

    buildZone(zoneId) {
        this.clearZone();

        switch (zoneId) {
            case 'town':
                this.buildTownZone();
                break;
            case 'forest':
                this.buildForestZone();
                break;
            case 'ruins':
                this.buildRuinsZone();
                break;
            case 'boss_peak':
                this.buildBossPeakZone();
                break;
        }

        this.setupAtmosphericParticles(zoneId);
    }

    // =========================================================================
    // ZONE 1: BUSTLING DESA OAKHAVEN (300x300 Meter Expansive 6-District Town)
    // =========================================================================
    buildTownZone() {
        this.scene.background = new THREE.Color(0xa7c5eb);
        this.scene.fog = new THREE.FogExp2(0xa7c5eb, 0.005);
        this.ambientLight.color.setHex(0xfff1e6);
        this.sunLight.color.setHex(0xfff7e6);

        // Huge 300x300 Realistic Grass Terrain
        const terrain = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300, 64, 64),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getGrass(),
                color: 0xffffff
            })
        );
        terrain.rotation.x = -Math.PI / 2;
        terrain.receiveShadow = true;
        this.zoneGroup.add(terrain);

        // Cobblestone Main Plaza
        const plaza = new THREE.Mesh(
            new THREE.CircleGeometry(24, 32),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getCobblestone(),
                color: 0xffffff
            })
        );
        plaza.rotation.x = -Math.PI / 2;
        plaza.position.set(0, 0.02, 0);
        plaza.receiveShadow = true;
        this.zoneGroup.add(plaza);

        // Grand North Boulevard (Leading to Weapon Shop)
        const northRoad = new THREE.Mesh(
            new THREE.PlaneGeometry(8.0, 50),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getCobblestone(),
                color: 0xffffff
            })
        );
        northRoad.rotation.x = -Math.PI / 2;
        northRoad.position.set(0, 0.025, -25);
        northRoad.receiveShadow = true;
        this.zoneGroup.add(northRoad);

        // Grand South Boulevard (Leading across River to Forest Portal)
        const southRoad = new THREE.Mesh(
            new THREE.PlaneGeometry(8.0, 80),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getCobblestone(),
                color: 0xffffff
            })
        );
        southRoad.rotation.x = -Math.PI / 2;
        southRoad.position.set(0, 0.025, 45);
        southRoad.receiveShadow = true;
        this.zoneGroup.add(southRoad);

        // East Avenue (To Windmill & Wheat Valley)
        const eastRoad = new THREE.Mesh(
            new THREE.PlaneGeometry(80, 6.0),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getCobblestone(),
                color: 0xffffff
            })
        );
        eastRoad.rotation.x = -Math.PI / 2;
        eastRoad.position.set(45, 0.025, 0);
        eastRoad.receiveShadow = true;
        this.zoneGroup.add(eastRoad);

        // West Avenue (To Tavern & Residential Quarter)
        const westRoad = new THREE.Mesh(
            new THREE.PlaneGeometry(80, 6.0),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getCobblestone(),
                color: 0xffffff
            })
        );
        westRoad.rotation.x = -Math.PI / 2;
        westRoad.position.set(-45, 0.025, 0);
        westRoad.receiveShadow = true;
        this.zoneGroup.add(westRoad);

        // REALISTIC TOWN RIVER (Flowing East-West at z = 48 with deep bed, 3D waves, caustics, and shore foam)
        this.createRealisticRiver({
            centerZ: 48,
            width: 13.5,
            length: 300,
            skipBridges: [{ x: 0, w: 4.0 }, { x: 24, w: 4.0 }]
        });

        // Floating Water Lily Pads with Lotus Blossoms (Tracked for wave bobbing)
        const lilyPositions = [
            [-12, 46], [-8, 49], [14, 47], [18, 50],
            [-32, 47], [-40, 49], [34, 46], [45, 49]
        ];
        lilyPositions.forEach(pos => {
            const pad = ModelFactory.createLilyPad();
            pad.position.set(pos[0], 0.045, pos[1]);
            pad.rotation.y = Math.random() * Math.PI * 2;
            const s = 0.85 + Math.random() * 0.4;
            pad.scale.set(s, s, s);
            this.zoneGroup.add(pad);
            this.floatingLilyPads.push({ mesh: pad, baseX: pos[0], baseZ: pos[1] });
        });

        // Riverside Cattail Reeds along banks
        const reedPositions = [
            [-16, 42.5], [-6, 42.5], [8, 42.5], [16, 42.5], [30, 42.5],
            [-14, 53.5], [-4, 53.5], [10, 53.5], [20, 53.5], [36, 53.5]
        ];
        reedPositions.forEach(pos => {
            const reed = ModelFactory.createReeds();
            reed.position.set(pos[0], 0, pos[1]);
            reed.rotation.y = Math.random() * Math.PI * 2;
            this.zoneGroup.add(reed);
        });

        // Mossy Fantasy Rocks along riverbanks and avenue corners
        const rockPositions = [
            [-18, 0, 42], [18, 0, 42], [-28, 0, 54], [26, 0, 54],
            [-15, 0, -12], [15, 0, -12], [-16, 0, 14], [16, 0, 14],
            [32, 0, 12], [-32, 0, 26]
        ];
        rockPositions.forEach(pos => {
            const r = ModelFactory.createMossyRock();
            r.position.set(pos[0], 0, pos[2]);
            const s = 0.9 + Math.random() * 0.5;
            r.scale.set(s, s, s);
            r.rotation.y = Math.random() * Math.PI * 2;
            this.zoneGroup.add(r);
        });

        // ARCHED WOODEN BRIDGE crossing the river at (0, 0, 48)
        const bridge = ModelFactory.createWoodenBridge();
        bridge.position.set(0, 0, 48);
        this.zoneGroup.add(bridge);

        // RIVERSIDE DOCK & BOAT at (24, 0, 48)
        const docks = ModelFactory.createPierAndBoat();
        docks.position.set(24, 0, 44);
        this.zoneGroup.add(docks);

        // ---------------------------------------------------------
        // DISTRICT 1: BAZAAR PLAZA (Center)
        // ---------------------------------------------------------
        const fountain = ModelFactory.createWaterFountain();
        fountain.position.set(0, 0, 0);
        this.zoneGroup.add(fountain);
        this.colliders.push({ minX: -3.8, maxX: 3.8, minZ: -3.8, maxZ: 3.8 });

        // Market Stalls in Plaza
        const stall1 = ModelFactory.createMarketStall('fruit');
        stall1.position.set(-12, 0, -6);
        stall1.rotation.y = 0.3;
        this.zoneGroup.add(stall1);

        const stall2 = ModelFactory.createMarketStall('potion');
        stall2.position.set(12, 0, -6);
        stall2.rotation.y = -0.3;
        this.zoneGroup.add(stall2);

        const stall3 = ModelFactory.createMarketStall('fruit');
        stall3.position.set(-12, 0, 8);
        stall3.rotation.y = -0.3;
        this.zoneGroup.add(stall3);

        const stall4 = ModelFactory.createMarketStall('potion');
        stall4.position.set(12, 0, 8);
        stall4.rotation.y = 0.3;
        this.zoneGroup.add(stall4);

        // ---------------------------------------------------------
        // DISTRICT 2: WEAPON SHOP & CASTLE AVENUE (North)
        // ---------------------------------------------------------
        const shop = ModelFactory.createWeaponShop();
        shop.position.set(0, 0, -38);
        this.zoneGroup.add(shop);
        this.colliders.push({ minX: -4.5, maxX: 4.5, minZ: -41.0, maxZ: -35.0 });

        // Shopkeeper NPC on porch (Exact match with screenshot)
        this.shopkeeper = ModelFactory.createShopkeeper();
        this.shopkeeper.position.set(0.8, 0.5, -36.2);
        this.zoneGroup.add(this.shopkeeper);
        this.npcs.push({ position: new THREE.Vector3(0.8, 0.5, -36.2), name: 'Shopkeeper' });

        this.createShopkeeperSpeechBubble();

        // Angel Wizard NPC (Floating near shop entrance)
        const wizardObj = ModelFactory.createAngelWizard();
        wizardObj.group.position.set(8.5, 0.8, -36.5);
        this.zoneGroup.add(wizardObj.group);
        this.angelWizard = wizardObj;
        this.npcs.push({ position: new THREE.Vector3(8.5, 0.8, -36.5), name: 'Angel Wizard' });

        // ---------------------------------------------------------
        // DISTRICT 3: BLACKSMITH & CRAFTING YARD (Northeast)
        // ---------------------------------------------------------
        const forge = ModelFactory.createBlacksmithForge();
        forge.position.set(28, 0, -26);
        this.zoneGroup.add(forge);
        this.colliders.push({ minX: 25, maxX: 32, minZ: -28, maxZ: -24 });

        // ---------------------------------------------------------
        // DISTRICT 4: TAVERN & RESIDENTIAL QUARTER (West)
        // ---------------------------------------------------------
        const tavern = ModelFactory.createTavern();
        tavern.position.set(-36, 0, -18);
        this.zoneGroup.add(tavern);
        this.colliders.push({ minX: -42, maxX: -30, minZ: -22, maxZ: -14 });

        // Residential Houses with smoking chimneys!
        const h1 = ModelFactory.createResidentialHouse(0xb91c1c);
        h1.group.position.set(-36, 0, 16);
        this.zoneGroup.add(h1.group);
        this.colliders.push({ minX: -40, maxX: -32, minZ: 13, maxZ: 19 });

        const h2 = ModelFactory.createResidentialHouse(0x1d4ed8);
        h2.group.position.set(-54, 0, 14);
        this.zoneGroup.add(h2.group);
        this.colliders.push({ minX: -58, maxX: -50, minZ: 11, maxZ: 17 });

        const h3 = ModelFactory.createResidentialHouse(0x059669);
        h3.group.position.set(-54, 0, -18);
        this.zoneGroup.add(h3.group);
        this.colliders.push({ minX: -58, maxX: -50, minZ: -21, maxZ: -15 });

        // ---------------------------------------------------------
        // DISTRICT 5: WINDMILL & GOLDEN WHEAT VALLEY (East)
        // ---------------------------------------------------------
        this.windmill = ModelFactory.createWindmill();
        this.windmill.group.position.set(52, 0, 24);
        this.zoneGroup.add(this.windmill.group);
        this.colliders.push({ minX: 48, maxX: 56, minZ: 20, maxZ: 28 });

        // Waving Golden Wheat Fields
        for (let x = 36; x <= 64; x += 10) {
            for (let z = 6; z <= 36; z += 10) {
                if (Math.hypot(x - 52, z - 24) > 6) {
                    const wheat = ModelFactory.createWheatField();
                    wheat.position.set(x, 0, z);
                    this.zoneGroup.add(wheat);
                }
            }
        }

        // Hay Bales & Scarecrow
        const bale1 = ModelFactory.createHayBale();
        bale1.position.set(42, 0, 20);
        this.zoneGroup.add(bale1);
        const bale2 = ModelFactory.createHayBale();
        bale2.position.set(45, 0, 22);
        this.zoneGroup.add(bale2);

        // ---------------------------------------------------------
        // DISTRICT 5B: ROYAL STABLES & BEASTMASTER CORRAL (East)
        // ---------------------------------------------------------
        const stable = ModelFactory.createStableBuilding();
        stable.position.set(24, 0, -8);
        this.zoneGroup.add(stable);
        this.stableBuilding = stable;
        this.colliders.push({ minX: 19, maxX: 29, minZ: -12, maxZ: -4 });

        // Stable Master Barnaby NPC
        this.stableMaster = ModelFactory.createStableMasterNPC();
        this.stableMaster.group.position.set(24, 0, -3.2);
        this.stableMaster.group.rotation.y = Math.PI; // Facing south towards path
        this.zoneGroup.add(this.stableMaster.group);
        this.npcs.push({ position: new THREE.Vector3(24, 0, -3.2), name: 'Peternak Barnaby' });

        // Add 3D preview mounts resting peacefully in/around the stable paddock!
        this.previewMounts = [];

        // 1. Warhorse resting in left stall
        const pHorse = ModelFactory.createMountHorse();
        pHorse.group.position.set(21.2, 0, -10.2);
        pHorse.group.rotation.y = 0.4;
        this.zoneGroup.add(pHorse.group);
        this.previewMounts.push({ data: pHorse, type: 'horse' });

        // 2. War Boar resting near trough
        const pBoar = ModelFactory.createMountBoar();
        pBoar.group.position.set(26.8, 0, -10.2);
        pBoar.group.rotation.y = -0.3;
        this.zoneGroup.add(pBoar.group);
        this.previewMounts.push({ data: pBoar, type: 'boar' });

        // 3. Majestic Pegasus in golden fenced pasture next to stable
        const pPegasus = ModelFactory.createMountPegasus();
        pPegasus.group.position.set(34, 0, -8);
        pPegasus.group.rotation.y = -0.8;
        this.zoneGroup.add(pPegasus.group);
        this.previewMounts.push({ data: pPegasus, type: 'pegasus' });

        // 4. Shadow Wolf resting under tree near pasture
        const pWolf = ModelFactory.createMountWolf();
        pWolf.group.position.set(33, 0, -3);
        pWolf.group.rotation.y = 1.8;
        this.zoneGroup.add(pWolf.group);
        this.previewMounts.push({ data: pWolf, type: 'wolf' });

        // 5. Sabertooth Tiger perched atop rustic elevation
        const pCat = ModelFactory.createMountBigCat();
        pCat.group.position.set(32, 0, -13.5);
        pCat.group.rotation.y = 0.2;
        this.zoneGroup.add(pCat.group);
        this.previewMounts.push({ data: pCat, type: 'cat' });

        // 6. Giant Garuda / Sky Roc perched majestically on timber perch
        const pBird = ModelFactory.createMountBird();
        pBird.group.position.set(28.5, 0.4, -4);
        pBird.group.rotation.y = -1.2;
        this.zoneGroup.add(pBird.group);
        this.previewMounts.push({ data: pBird, type: 'bird' });

        // Decorative rustic fence around the mount pasture
        const pastureFence = ModelFactory.createRusticFence(12.0);
        pastureFence.position.set(34, 0, -1);
        this.zoneGroup.add(pastureFence);

        // ---------------------------------------------------------
        // DISTRICT 6: TRAINING GROUNDS & CAMPFIRE (Northwest)
        // ---------------------------------------------------------
        const archery1 = ModelFactory.createArcheryTarget();
        archery1.position.set(-20, 0, -32);
        this.zoneGroup.add(archery1);

        const archery2 = ModelFactory.createArcheryTarget();
        archery2.position.set(-26, 0, -32);
        this.zoneGroup.add(archery2);

        const campfire = ModelFactory.createCampfire();
        campfire.position.set(-23, 0, -24);
        this.zoneGroup.add(campfire);

        // ---------------------------------------------------------
        // LIVELY ANIMATED NPCS POPULATING THE VIBRANT TOWN
        // ---------------------------------------------------------
        // A. Village Elder (Plaza East)
        this.villageElder = ModelFactory.createVillageElder();
        this.villageElder.group.position.set(-8.5, 0, 4.5);
        this.villageElder.group.rotation.y = 0.6;
        this.zoneGroup.add(this.villageElder.group);
        this.npcs.push({ position: new THREE.Vector3(-8.5, 0, 4.5), name: 'Village Elder' });

        // B. Royal Guard Knights (Pair patrolling the Grand Boulevard)
        this.villageGuard = ModelFactory.createVillageGuard();
        this.villageGuard.group.position.set(-2.0, 0, 20);
        this.zoneGroup.add(this.villageGuard.group);
        this.npcs.push({ position: new THREE.Vector3(-2.0, 0, 20), name: 'Royal Guard' });

        this.villageGuard2 = ModelFactory.createVillageGuard();
        this.villageGuard2.group.position.set(2.0, 0, 20);
        this.zoneGroup.add(this.villageGuard2.group);
        this.npcs.push({ position: new THREE.Vector3(2.0, 0, 20), name: 'Royal Guard 2' });

        // C. Cute Village Dog (Running around plaza)
        this.villageDog = ModelFactory.createVillageDog();
        this.villageDog.group.position.set(6.5, 0, 4.0);
        this.zoneGroup.add(this.villageDog.group);
        this.npcs.push({ position: new THREE.Vector3(6.5, 0, 4.0), name: 'Village Dog' });

        // D. Roaming Villagers (Walking with AI path loops)
        const farmer = ModelFactory.createRoamingVillager('farmer');
        farmer.group.position.set(46, 0, 16);
        farmer.homeX = 46; farmer.homeZ = 16;
        farmer.radius = 8;
        this.zoneGroup.add(farmer.group);
        this.roamingVillagers.push(farmer);
        this.npcs.push({ position: farmer.group.position, name: 'Farmer Bob' });

        const maid = ModelFactory.createRoamingVillager('maid');
        maid.group.position.set(-8, 0, -8);
        maid.homeX = -8; maid.homeZ = -8;
        maid.radius = 6;
        this.zoneGroup.add(maid.group);
        this.roamingVillagers.push(maid);
        this.npcs.push({ position: maid.group.position, name: 'Maid Maria' });

        const kid = ModelFactory.createRoamingVillager('kid');
        kid.group.position.set(8, 0, 6);
        kid.homeX = 8; kid.homeZ = 6;
        kid.radius = 10;
        this.zoneGroup.add(kid.group);
        this.roamingVillagers.push(kid);
        this.npcs.push({ position: kid.group.position, name: 'Little Timmy' });

        // E. Blacksmith Vulcan with Anvil & Forge
        this.blacksmith = ModelFactory.createBlacksmith();
        this.blacksmith.group.position.set(-16, 0, -28);
        this.zoneGroup.add(this.blacksmith.group);
        this.npcs.push({ position: new THREE.Vector3(-16, 0, -28), name: 'Blacksmith Vulcan' });

        // F. Lyra the Traveling Bard (near Tavern)
        this.bard = ModelFactory.createBard();
        this.bard.group.position.set(-26, 0, -14);
        this.zoneGroup.add(this.bard.group);
        this.npcs.push({ position: new THREE.Vector3(-26, 0, -14), name: 'Lyra the Bard' });

        // G. Cute Village Cat (Sitting on barrel near Cottage)
        this.villageCat = ModelFactory.createVillageCat();
        this.villageCat.group.position.set(-32, 0, 14);
        this.zoneGroup.add(this.villageCat.group);
        this.npcs.push({ position: new THREE.Vector3(-32, 0, 14), name: 'Village Cat' });

        // H. Gate Guard Roland (Guarding Forest Bridge)
        this.gateGuard = ModelFactory.createVillageGuard();
        this.gateGuard.group.position.set(0, 0, 68);
        this.zoneGroup.add(this.gateGuard.group);
        this.npcs.push({ position: new THREE.Vector3(0, 0, 68), name: 'Gate Guard Roland' });

        // ---------------------------------------------------------
        // STREET LANTERNS & TOWN DECORATIONS
        // ---------------------------------------------------------
        const streetLamps = [
            [-5, 0, -14], [5, 0, -14],
            [-5, 0, -28], [5, 0, -28],
            [-5, 0, 14], [5, 0, 14],
            [-5, 0, 32], [5, 0, 32],
            [-5, 0, 62], [5, 0, 62],
            [-22, 0, 3.5], [22, 0, 3.5],
            [-42, 0, 3.5], [42, 0, 3.5]
        ];
        streetLamps.forEach(s => {
            const lamp = ModelFactory.createStreetLantern();
            lamp.position.set(s[0], 0, s[2]);
            this.zoneGroup.add(lamp);
        });

        // Town Perimeter Trees & Woodland
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 10) {
            const tree = ModelFactory.createTree();
            tree.position.set(Math.cos(a) * 95, 0, Math.sin(a) * 95);
            const scale = 1.4 + Math.random() * 0.6;
            tree.scale.set(scale, scale, scale);
            this.zoneGroup.add(tree);
        }

        // Lush Berry & Flower Bushes
        const bushPositions = [
            [-5.5, 0, -34], [5.5, 0, -34], // Beside Weapon Shop
            [-18, 0, -4], [18, 0, -4],     // Flanking Plaza
            [-28, 0, -14], [-44, 0, -14],  // Near Tavern
            [-30, 0, 14], [-42, 0, 14],    // Beside Cottage
            [48, 0, 18], [58, 0, 20]       // Near Wheat Valley
        ];
        bushPositions.forEach((pos, idx) => {
            const berryCol = idx % 2 === 0 ? 0xef4444 : 0xfacc15;
            const bush = ModelFactory.createBush(berryCol);
            bush.position.set(pos[0], 0, pos[2]);
            const s = 0.85 + Math.random() * 0.35;
            bush.scale.set(s, s, s);
            this.zoneGroup.add(bush);
        });

        // Rustic Wooden Fences around wheat valley and gardens
        const fence1 = ModelFactory.createRusticFence(18.0);
        fence1.position.set(48, 0, 4.0);
        this.zoneGroup.add(fence1);

        const fence2 = ModelFactory.createRusticFence(18.0);
        fence2.position.set(48, 0, 38.0);
        this.zoneGroup.add(fence2);

        // Scenic Perimeter Hills creating a majestic diorama valley backdrop
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
            const hill = ModelFactory.createScenicHill(24 + Math.random() * 8, 6.5 + Math.random() * 3, 0x418a4e);
            hill.position.set(Math.cos(a) * 115, 0, Math.sin(a) * 115);
            this.zoneGroup.add(hill);
        }

        // LUSH 3D SWAYING GRASS & WILDFLOWERS (3,200 Grass Blades + 650 Wildflowers)
        this.buildGrassAndFlowers('town', 3200, 650);

        // PORTAL TO WHISPERING WOODS (South Gate across the bridge at z = 75)
        const portalForest = ModelFactory.createMagicPortal(0x22c55e, 'KE HUTAN');
        portalForest.group.position.set(0, 0, 75);
        this.zoneGroup.add(portalForest.group);

        this.portals.push({
            position: new THREE.Vector3(0, 0, 75),
            targetZone: 'forest',
            targetSpawn: { x: 0, z: -65 },
            vortex: portalForest.vortex,
            ring: portalForest.ring
        });
    }

    createShopkeeperSpeechBubble() {
        const bubbleCanvas = document.createElement('canvas');
        bubbleCanvas.width = 512;
        bubbleCanvas.height = 160;
        const ctx = bubbleCanvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 6;

        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(10, 10, 492, 110, 16);
        else ctx.rect(10, 10, 492, 110);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(240, 120);
        ctx.lineTo(256, 148);
        ctx.lineTo(272, 120);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#111827';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('I heard the forest monsters', 256, 50);
        ctx.fillText('are stronger now.', 256, 85);

        const texture = new THREE.CanvasTexture(bubbleCanvas);
        const bubblePlane = new THREE.Mesh(
            new THREE.PlaneGeometry(3.6, 1.15),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true })
        );
        bubblePlane.position.set(0.8, 3.2, -35.8);
        this.zoneGroup.add(bubblePlane);
        this.speechBubble = bubblePlane;
    }

    // =========================================================================
    // ZONE 2: MASSIVE WHISPERING WOODS (300x300 Deep Forest, River & Slimes)
    // =========================================================================
    buildForestZone() {
        this.scene.background = new THREE.Color(0x132a13);
        this.scene.fog = new THREE.FogExp2(0x132a13, 0.009);
        this.ambientLight.color.setHex(0xa3b18a);
        this.sunLight.color.setHex(0xddbea9);

        // Huge 300x300 Forest Terrain
        const terrain = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300, 64, 64),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getForestGround(),
                color: 0xffffff
            })
        );
        terrain.rotation.x = -Math.PI / 2;
        terrain.receiveShadow = true;
        this.zoneGroup.add(terrain);

        // REALISTIC FOREST RIVER (Deep river channel, 3D waves, caustics, and shore foam at z = 0)
        this.createRealisticRiver({
            centerZ: 0,
            width: 14.0,
            length: 300,
            skipBridges: [{ x: -20, w: 4.0 }, { x: 20, w: 4.0 }]
        });

        const bridge1 = ModelFactory.createWoodenBridge();
        bridge1.position.set(-20, 0, 0);
        this.zoneGroup.add(bridge1);

        const bridge2 = ModelFactory.createWoodenBridge();
        bridge2.position.set(20, 0, 0);
        this.zoneGroup.add(bridge2);

        // Floating Water Lily Pads with Lotus Blossoms on Forest River
        [[-10, -1], [8, 1], [-30, 2], [32, -2], [-45, 1], [45, -1]].forEach(pos => {
            const pad = ModelFactory.createLilyPad();
            pad.position.set(pos[0], 0.045, pos[1]);
            pad.rotation.y = Math.random() * Math.PI * 2;
            const s = 0.85 + Math.random() * 0.4;
            pad.scale.set(s, s, s);
            this.zoneGroup.add(pad);
            this.floatingLilyPads.push({ mesh: pad, baseX: pos[0], baseZ: pos[1] });
        });

        // Riverside Reeds
        [[-15, -6.5], [15, -6.5], [-25, 6.5], [25, 6.5], [-35, -6.5], [35, 6.5]].forEach(pos => {
            const reed = ModelFactory.createReeds();
            reed.position.set(pos[0], 0, pos[1]);
            this.zoneGroup.add(reed);
        });

        // Mossy Fantasy Rocks
        [[-22, 0, -8], [22, 0, 8], [-32, 0, 12], [32, 0, -14], [-12, 0, 28], [14, 0, -32]].forEach(pos => {
            const r = ModelFactory.createMossyRock();
            r.position.set(pos[0], 0, pos[2]);
            const s = 1.0 + Math.random() * 0.6;
            r.scale.set(s, s, s);
            this.zoneGroup.add(r);
        });

        // Wild Berry Bushes in Forest Glades
        [[-18, 0, -22], [18, 0, -22], [-28, 0, 24], [28, 0, 24], [-40, 0, -12], [40, 0, 12]].forEach(pos => {
            const bush = ModelFactory.createBush(0x38bdf8);
            bush.position.set(pos[0], 0, pos[2]);
            this.zoneGroup.add(bush);
        });

        // Scenic Perimeter Hills
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
            const hill = ModelFactory.createScenicHill(26 + Math.random() * 8, 7.5 + Math.random() * 3, 0x1f381c);
            hill.position.set(Math.cos(a) * 115, 0, Math.sin(a) * 115);
            this.zoneGroup.add(hill);
        }

        // 3D SWAYING DEEP FOREST GRASS & WILDFLOWERS (3,500 Grass Blades + 500 Wildflowers)
        this.buildGrassAndFlowers('forest', 3500, 500);

        // Forest Winding Trails
        const trail1 = new THREE.Mesh(
            new THREE.PlaneGeometry(6.0, 150),
            new THREE.MeshLambertMaterial({ color: 0x4f3b26 })
        );
        trail1.rotation.x = -Math.PI / 2;
        trail1.position.set(0, 0.035, 0);
        trail1.receiveShadow = true;
        this.zoneGroup.add(trail1);

        // 1. PORTAL BACK TO TOWN (North at z = -75)
        const portalTown = ModelFactory.createMagicPortal(0x38bdf8, 'KE DESA');
        portalTown.group.position.set(0, 0, -75);
        this.zoneGroup.add(portalTown.group);

        this.portals.push({
            position: new THREE.Vector3(0, 0, -75),
            targetZone: 'town',
            targetSpawn: { x: 0, z: 65 },
            vortex: portalTown.vortex,
            ring: portalTown.ring
        });

        // 2. PORTAL TO GOBLIN CRYPT (East Glade at x = 75, z = 15)
        const portalRuins = ModelFactory.createMagicPortal(0x9d4edd, 'KE RERUNTUHAN');
        portalRuins.group.position.set(75, 0, 15);
        portalRuins.group.rotation.y = -Math.PI / 2;
        this.zoneGroup.add(portalRuins.group);

        this.portals.push({
            position: new THREE.Vector3(75, 0, 15),
            targetZone: 'ruins',
            targetSpawn: { x: -65, z: 0 },
            vortex: portalRuins.vortex,
            ring: portalRuins.ring
        });

        // 3. Dense Woodland Pine Trees (40+ Trees)
        for (let i = 0; i < 45; i++) {
            const rx = (Math.random() - 0.5) * 220;
            const rz = (Math.random() - 0.5) * 220;
            if (Math.abs(rx) > 6 || Math.abs(rz) > 6) {
                const tree = ModelFactory.createTree();
                tree.position.set(rx, 0, rz);
                const scale = 1.1 + Math.random() * 0.6;
                tree.scale.set(scale, scale, scale);
                this.zoneGroup.add(tree);
            }
        }

        // 4. GATHERABLE GLOWING FANTASY MUSHROOMS (12 Spots)
        const shroomColors = [0xc084fc, 0x38bdf8, 0xf472b6, 0xa855f7];
        const shroomSpots = [
            [-12, -45], [16, -38], [-24, -20], [28, -14],
            [-32, 16], [34, 22], [-14, 42], [18, 50],
            [-45, -5], [48, 5], [-50, 40], [52, -35]
        ];

        shroomSpots.forEach((s, idx) => {
            const shroom = ModelFactory.createGatherableMushroom(shroomColors[idx % shroomColors.length]);
            shroom.position.set(s[0], 0, s[1]);
            this.zoneGroup.add(shroom);

            this.collectibles.push({
                type: 'mushroom',
                mesh: shroom,
                position: new THREE.Vector3(s[0], 0, s[1]),
                active: true
            });
        });

        // 5. PACKS OF SLIME MONSTERS (14 Slimes roaming the forest!)
        const slimeConfigs = [
            { type: 'green', x: -10, z: -48 }, { type: 'green', x: 12, z: -44 },
            { type: 'green', x: -18, z: -32 }, { type: 'blue',  x: 16, z: -26 },
            { type: 'green', x: -12, z: 22 },  { type: 'blue',  x: 14, z: 28 },
            { type: 'green', x: -24, z: 42 },  { type: 'blue',  x: 22, z: 46 },
            { type: 'green', x: -38, z: -10 }, { type: 'blue',  x: 42, z: -8 },
            { type: 'blue',  x: -36, z: 32 },  { type: 'blue',  x: 38, z: 34 },
            { type: 'gold',  x: 48, z: 15 },   // Gold Slime near portal
            { type: 'gold',  x: 0, z: 58 }     // Giant South King Slime
        ];

        slimeConfigs.forEach(cfg => {
            const slime = ModelFactory.createSlime(cfg.type);
            slime.group.position.set(cfg.x, 0, cfg.z);
            slime.homeX = cfg.x;
            slime.homeZ = cfg.z;
            this.zoneGroup.add(slime.group);
            this.enemies.push(slime);
        });

        // 6. Forest Alchemist Sylva (near forest clearing)
        this.alchemist = ModelFactory.createAlchemist();
        this.alchemist.group.position.set(-22, 0, 5);
        this.zoneGroup.add(this.alchemist.group);
        this.npcs.push({ position: new THREE.Vector3(-22, 0, 5), name: 'Alchemist Sylva' });
    }

    // =========================================================================
    // ZONE 3: GOBLIN CRYPT RUINS (300x300 Dungeon Complex Labyrinth)
    // =========================================================================
    buildRuinsZone() {
        this.scene.background = new THREE.Color(0x181824);
        this.scene.fog = new THREE.FogExp2(0x181824, 0.012);
        this.ambientLight.color.setHex(0x6b7280);
        this.sunLight.color.setHex(0x94a3b8);

        // Huge 300x300 Stone Floor
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300, 48, 48),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getRuinsFloor(),
                color: 0xffffff
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.zoneGroup.add(floor);

        // Grand Dungeon Highways (North-South & East-West)
        const corridor1 = new THREE.Mesh(
            new THREE.PlaneGeometry(12.0, 160),
            new THREE.MeshLambertMaterial({ color: 0x1e293b })
        );
        corridor1.rotation.x = -Math.PI / 2;
        this.zoneGroup.add(corridor1);

        const corridor2 = new THREE.Mesh(
            new THREE.PlaneGeometry(160, 12.0),
            new THREE.MeshLambertMaterial({ color: 0x1e293b })
        );
        corridor2.rotation.x = -Math.PI / 2;
        this.zoneGroup.add(corridor2);

        // 1. PORTAL BACK TO FOREST (West at x = -75, z = 0)
        const portalForest = ModelFactory.createMagicPortal(0x22c55e, 'KE HUTAN');
        portalForest.group.position.set(-75, 0, 0);
        portalForest.group.rotation.y = Math.PI / 2;
        this.zoneGroup.add(portalForest.group);

        this.portals.push({
            position: new THREE.Vector3(-75, 0, 0),
            targetZone: 'forest',
            targetSpawn: { x: 65, z: 15 },
            vortex: portalForest.vortex,
            ring: portalForest.ring
        });

        // 2. PORTAL TO DRAGON PEAK (North at x = 0, z = 75)
        const portalDragon = ModelFactory.createMagicPortal(0xef4444, 'PUNCAK NAGA');
        portalDragon.group.position.set(0, 0, 75);
        this.zoneGroup.add(portalDragon.group);

        this.portals.push({
            position: new THREE.Vector3(0, 0, 75),
            targetZone: 'boss_peak',
            targetSpawn: { x: 0, z: -65 },
            vortex: portalDragon.vortex,
            ring: portalDragon.ring
        });

        // 3. Majestic Colonnade Pillars
        [-9.0, 9.0].forEach(x => {
            for (let z = -60; z <= 60; z += 15) {
                const pillar = ModelFactory.createDungeonPillar();
                pillar.position.set(x, 0, z);
                this.zoneGroup.add(pillar);
                this.colliders.push({ minX: x - 1.0, maxX: x + 1.0, minZ: z - 1.0, maxZ: z + 1.0 });
            }
        });

        // Braziers with flame
        [-6.5, 6.5].forEach(x => {
            [-45, -20, 5, 30, 55].forEach(z => {
                const b = ModelFactory.createBrazier();
                b.position.set(x, 0, z);
                this.zoneGroup.add(b);
            });
        });

        // 4. TREASURE CHESTS (4 Rich Chests)
        const chestConfigs = [
            { x: -22, z: -35, gold: 350 },
            { x: 22, z: -20, gold: 400 },
            { x: -24, z: 25, gold: 500 },
            { x: 24, z: 50, gold: 650 }
        ];

        chestConfigs.forEach(c => {
            const chest = ModelFactory.createTreasureChest();
            chest.group.position.set(c.x, 0, c.z);
            this.zoneGroup.add(chest.group);

            this.chests.push({
                obj: chest,
                position: new THREE.Vector3(c.x, 0, c.z),
                gold: c.gold,
                opened: false
            });
        });

        // 5. GOBLIN & SKELETON PATROLS (12 Enemies)
        const enemySpawns = [
            { type: 'goblin', x: -5, z: -45 }, { type: 'goblin', x: 5, z: -40 },
            { type: 'skeleton', x: -6, z: -25 }, { type: 'goblin', x: 6, z: -15 },
            { type: 'skeleton', x: -5, z: 15 }, { type: 'goblin', x: 5, z: 25 },
            { type: 'skeleton', x: -6, z: 45 }, { type: 'goblin', x: 6, z: 55 },
            { type: 'goblin', x: -35, z: -5 }, { type: 'skeleton', x: -35, z: 5 },
            { type: 'goblin', x: 35, z: -5 }, { type: 'skeleton', x: 35, z: 5 }
        ];

        enemySpawns.forEach(s => {
            const mon = s.type === 'goblin' ? ModelFactory.createGoblin() : ModelFactory.createSkeleton();
            mon.group.position.set(s.x, 0, s.z);
            mon.homeX = s.x; mon.homeZ = s.z;
            this.zoneGroup.add(mon.group);
            this.enemies.push(mon);
        });

        // 6. Archaeologist Drake (Investigating Ancient Tablets)
        this.archaeologist = ModelFactory.createArchaeologist();
        this.archaeologist.group.position.set(-25, 0, -20);
        this.zoneGroup.add(this.archaeologist.group);
        this.npcs.push({ position: new THREE.Vector3(-25, 0, -20), name: 'Archaeologist Drake' });

        // 7. TOUGH ANCIENT STONE GOLEMS (Ruins Guardians)
        [[-20, 20], [20, 20], [-20, -20], [20, -20]].forEach(p => {
            const golem = ModelFactory.createStoneGolem();
            golem.group.position.set(p[0], 0, p[1]);
            golem.homeX = p[0]; golem.homeZ = p[1];
            this.zoneGroup.add(golem.group);
            this.enemies.push(golem);
        });
    }

    // =========================================================================
    // ZONE 4: CRIMSON DRAGON PEAK (300x300 Volcanic Caldera & Epic Dragon Boss)
    // =========================================================================
    buildBossPeakZone() {
        this.scene.background = new THREE.Color(0x3a0808);
        this.scene.fog = new THREE.FogExp2(0x3a0808, 0.01);
        this.ambientLight.color.setHex(0xf97316);
        this.sunLight.color.setHex(0xef4444);

        // Huge 300x300 Volcanic Obsidian Ground
        const terrain = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300, 48, 48),
            new THREE.MeshLambertMaterial({
                map: RPGTextures.getLavaCrust(),
                color: 0xffffff
            })
        );
        terrain.rotation.x = -Math.PI / 2;
        terrain.receiveShadow = true;
        this.zoneGroup.add(terrain);

        // Molten Lava Caldera Ring around Arena
        const lavaRing = new THREE.Mesh(
            new THREE.RingGeometry(32, 44, 32),
            new THREE.MeshBasicMaterial({ color: 0xe11d48, side: THREE.DoubleSide })
        );
        lavaRing.rotation.x = -Math.PI / 2;
        lavaRing.position.set(0, 0.04, 15);
        this.zoneGroup.add(lavaRing);

        // 1. PORTAL BACK TO RUINS (South at x = 0, z = -75)
        const portalRuins = ModelFactory.createMagicPortal(0x9d4edd, 'KE RERUNTUHAN');
        portalRuins.group.position.set(0, 0, -75);
        this.zoneGroup.add(portalRuins.group);

        this.portals.push({
            position: new THREE.Vector3(0, 0, -75),
            targetZone: 'ruins',
            targetSpawn: { x: 0, z: 65 },
            vortex: portalRuins.vortex,
            ring: portalRuins.ring
        });

        // 2. Volcanic Spire Rocks
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
            const rock = ModelFactory.createVolcanoRock();
            rock.position.set(Math.cos(a) * 55, 0, 15 + Math.sin(a) * 55);
            const s = 1.6 + Math.random() * 0.9;
            rock.scale.set(s, s * 1.8, s);
            this.zoneGroup.add(rock);
        }

        // 3. GLITTERING GOLD TREASURE HOARDS (Dragon's immense hoard)
        const hoard1 = ModelFactory.createGoldHoard();
        hoard1.position.set(-20, 0, 20);
        this.zoneGroup.add(hoard1);

        const hoard2 = ModelFactory.createGoldHoard();
        hoard2.position.set(20, 0, 20);
        this.zoneGroup.add(hoard2);

        // 4. ANCIENT CRIMSON DRAGON BOSS (Center Caldera at z = 15)
        this.dragonBoss = ModelFactory.createDragonBoss();
        this.dragonBoss.group.position.set(0, 0, 15);
        this.dragonBoss.homeX = 0;
        this.dragonBoss.homeZ = 15;
        this.zoneGroup.add(this.dragonBoss.group);
        this.enemies.push(this.dragonBoss);

        // Dragon Minions (Magma Slimes)
        [[-16, 5], [16, 5], [-18, 25], [18, 25]].forEach(p => {
            const magmaSlime = ModelFactory.createSlime('gold');
            magmaSlime.group.position.set(p[0], 0, p[1]);
            magmaSlime.homeX = p[0]; magmaSlime.homeZ = p[1];
            this.zoneGroup.add(magmaSlime.group);
            this.enemies.push(magmaSlime);
        });

        // Legendary Dragon Chest
        const dragonChest = ModelFactory.createTreasureChest();
        dragonChest.group.position.set(0, 0, 32);
        this.zoneGroup.add(dragonChest.group);

        this.chests.push({
            obj: dragonChest,
            position: new THREE.Vector3(0, 0, 32),
            gold: 2500,
            opened: false
        });

        if (window.UI) {
            window.UI.showBossHpBar('🐉 ANCIENT CRIMSON DRAGON', this.dragonBoss.hp, this.dragonBoss.maxHp);
        }
    }

    setupAtmosphericParticles(zoneId) {
        if (this.particles) {
            this.scene.remove(this.particles);
        }

        const particleCount = 280;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 260;
            positions[i + 1] = Math.random() * 15 + 0.5;
            positions[i + 2] = (Math.random() - 0.5) * 260;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        let pColor = 0xfff4cc; // Town golden dust
        if (zoneId === 'forest') pColor = 0x80ed99; // Forest glowing fireflies
        if (zoneId === 'ruins') pColor = 0x93c5fd; // Crypt blue wisps
        if (zoneId === 'boss_peak') pColor = 0xf97316; // Lava embers

        const mat = new THREE.PointsMaterial({
            color: pColor,
            size: zoneId === 'forest' ? 0.35 : 0.25,
            transparent: true,
            opacity: 0.85
        });

        this.particles = new THREE.Points(geo, mat);
        this.scene.add(this.particles);
    }

    // Billowing chimney smoke puff generator
    spawnSmokePuff(pos) {
        const geo = new THREE.SphereGeometry(0.35, 6, 6);
        const mat = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.5
        });
        const puff = new THREE.Mesh(geo, mat);
        puff.position.copy(pos);
        this.scene.add(puff);

        this.smokePuffs.push({
            mesh: puff,
            opacity: 0.5,
            life: 0,
            maxLife: 2.2
        });
    }

    checkInteraction(playerPos) {
        // 1. Interaksi Jamur Ajaib (Mushroom Quest & Gathering)
        for (let i = 0; i < this.collectibles.length; i++) {
            const col = this.collectibles[i];
            if (!col.active) continue;

            const dist = playerPos.distanceTo(col.position);
            if (dist < 2.5) {
                // Gunakan Sistem Kuis Edukasi Pembelajaran
                if (window.EduQuiz) {
                    window.EduQuiz.openQuiz({
                        category: 'mushroom',
                        title: '🌿 MEMETIK JAMUR AJAIB BERCAHAYA',
                        icon: '🍄',
                        contextDesc: 'Jamur Ajaib memiliki spora magis. Jawablah tantangan ilmu pengetahuan berikut untuk memetiknya dengan aman dan menyerap sari kekuatannya!',
                        onSuccess: () => {
                            col.active = false;
                            this.zoneGroup.remove(col.mesh);
                            if (typeof Audio !== 'undefined' && Audio.playCoin) {
                                Audio.playCoin();
                            }

                            if (window.QuestSys) {
                                window.QuestSys.onMushroomGathered();
                            }
                            if (window.UI) {
                                window.UI.showCustomDialogue('hero', 'Berhasil memetik Jamur Ajaib Bercahaya setelah memecahkan teka-teki alam! (+Poin, +Gold, +Darah, +EXP)');
                            }
                        }
                    });
                    return true;
                }

                // Fallback jika kuis tidak aktif
                col.active = false;
                this.zoneGroup.remove(col.mesh);
                Audio.playCoin();

                if (window.game && window.game.player) {
                    window.game.player.addGold(50);
                    window.game.player.addExp(30);
                }
                if (window.QuestSys) {
                    window.QuestSys.onMushroomGathered();
                }
                if (window.UI) {
                    window.UI.showCustomDialogue('hero', 'Memetik Jamur Ajaib Bercahaya! (+50 Gold & +30 EXP)');
                }
                return true;
            }
        }

        // 2. Interaksi Peti Harta Karun (Treasure Chests)
        for (let i = 0; i < this.chests.length; i++) {
            const c = this.chests[i];
            if (c.opened) continue;

            const dist = playerPos.distanceTo(c.position);
            if (dist < 3.2) {
                // Gunakan Sistem Kuis Edukasi Pembelajaran untuk membuka gembok kuno
                if (window.EduQuiz) {
                    window.EduQuiz.openQuiz({
                        category: 'chest',
                        title: '🗝️ GEMBOK TEKA-TEKI PETI KUNO',
                        icon: '📦',
                        contextDesc: 'Peti harta karun kuno terlindungi oleh kunci sandi berhitung & logika purba. Pecahkan soal berikut untuk membuka gembok dan mengambil hartanya!',
                        onSuccess: () => {
                            c.opened = true;
                            if (c.obj && c.obj.lidPivot) {
                                c.obj.lidPivot.rotation.x = -Math.PI * 0.45;
                            }
                            if (typeof Audio !== 'undefined' && Audio.playPurchase) {
                                Audio.playPurchase();
                            }

                            if (window.game && window.game.player) {
                                window.game.player.addGold(c.gold);
                                window.game.player.addExp(150);
                            }
                            if (window.QuestSys) {
                                window.QuestSys.onChestOpened();
                            }
                            if (window.UI) {
                                window.UI.showCustomDialogue('hero', `Kunci terbuka! Membuka Peti Harta Karun dan mendapatkan +${c.gold} Gold serta bekal berharga!`);
                            }
                        }
                    });
                    return true;
                }

                c.opened = true;
                c.obj.lidPivot.rotation.x = -Math.PI * 0.45;
                Audio.playPurchase();

                if (window.game && window.game.player) {
                    window.game.player.addGold(c.gold);
                    window.game.player.addExp(150);
                }
                if (window.QuestSys) {
                    window.QuestSys.onChestOpened();
                }
                if (window.UI) {
                    window.UI.showCustomDialogue('hero', `Membuka Peti Harta Karun! Mendapatkan +${c.gold} Gold!`);
                }
                return true;
            }
        }

        return false;
    }

    checkPortalCollisions(playerPos) {
        if (this.portalCooldown > 0) return;
        if (window.quizActive) return;

        for (let i = 0; i < this.portals.length; i++) {
            const p = this.portals[i];
            const dist = playerPos.distanceTo(p.position);
            if (dist < 3.0) {
                // 1. Validasi Urutan Misi: Blokir jika pemain belum menyelesaikan misi prasyarat
                if (window.QuestSys && !window.QuestSys.isZoneUnlocked(p.targetZone)) {
                    // Dorong mundur agar tidak terjebak di trigger portal
                    if (window.game && window.game.player) {
                        const pushDir = window.game.player.mesh.position.clone().sub(p.position).normalize();
                        if (pushDir.lengthSq() > 0.01) {
                            window.game.player.mesh.position.add(pushDir.multiplyScalar(2.0));
                        }
                    }
                    this.portalCooldown = 2.0;
                    const reason = window.QuestSys.getZoneLockReason(p.targetZone);
                    if (typeof Audio !== 'undefined' && Audio.playHit) {
                        Audio.playHit();
                    }
                    if (window.UI) {
                        window.UI.showCustomDialogue('elder', reason);
                    }
                    return;
                }

                const zoneTargetNames = {
                    town: 'Desa Oakhaven',
                    forest: 'Whispering Woods (Hutan Berbisik)',
                    ruins: 'Goblin Crypt Ruins (Reruntuhan Kuno)',
                    boss_peak: 'Crimson Dragon Peak (Puncak Naga Api)'
                };
                const destName = zoneTargetNames[p.targetZone] || p.targetZone.toUpperCase();

                if (window.EduQuiz) {
                    // Dorong mundur sedikit agar pemain tidak berada di dalam zona tabrakan saat kuis terbuka
                    if (window.game && window.game.player) {
                        const pushDir = window.game.player.mesh.position.clone().sub(p.position).normalize();
                        if (pushDir.lengthSq() > 0.01) {
                            window.game.player.mesh.position.add(pushDir.multiplyScalar(1.2));
                        }
                    }

                    window.EduQuiz.openQuiz({
                        category: 'portal',
                        title: `🌀 GERBANG PORTAL: MENUJU ${destName.toUpperCase()}`,
                        icon: '🌀',
                        contextDesc: `Penjaga gerbang dimensi menuntut sandi pengetahuan untuk membuka gerbang menuju ${destName}! Jawablah tantangan edukasi ini:`,
                        onSuccess: () => {
                            this.portalCooldown = 4.0;
                            this.changeZone(p.targetZone, p.targetSpawn);
                        },
                        onFail: () => {
                            this.portalCooldown = 1.5;
                        }
                    });
                    break;
                } else {
                    this.changeZone(p.targetZone, p.targetSpawn);
                    break;
                }
            }
        }
    }

    getPortalTo(targetZone, currentZone) {
        // Jika ada portal langsung
        const direct = this.portals.find(p => p.targetZone === targetZone);
        if (direct) return direct;

        // Panduan rute terurut: Town -> Forest -> Ruins -> Boss Peak
        if (currentZone === 'town') {
            return this.portals.find(p => p.targetZone === 'forest') || this.portals[0] || null;
        }
        if (currentZone === 'forest') {
            if (targetZone === 'town') {
                return this.portals.find(p => p.targetZone === 'town') || this.portals[0] || null;
            }
            return this.portals.find(p => p.targetZone === 'ruins') || this.portals[0] || null;
        }
        if (currentZone === 'ruins') {
            if (targetZone === 'boss_peak') {
                return this.portals.find(p => p.targetZone === 'boss_peak') || this.portals[0] || null;
            }
            return this.portals.find(p => p.targetZone === 'forest') || this.portals[0] || null;
        }
        if (currentZone === 'boss_peak') {
            return this.portals.find(p => p.targetZone === 'ruins') || this.portals[0] || null;
        }

        return this.portals[0] || null;
    }

    getNearestQuestTarget(targetEntity, playerPos) {
        if (targetEntity === 'shopkeeper' && this.shopkeeper) return this.shopkeeper.position;
        if (targetEntity === 'mushroom' && this.collectibles.length > 0) {
            const activeM = this.collectibles.find(c => c.active);
            if (activeM) return activeM.position;
        }
        if (targetEntity === 'chest' && this.chests.length > 0) {
            const openC = this.chests.find(c => !c.opened);
            if (openC) return openC.position;
        }
        if (this.enemies.length > 0) {
            const aliveE = this.enemies.find(e => e.alive);
            if (aliveE) return aliveE.group.position;
        }
        return new THREE.Vector3(0, 0, 0);
    }

    update(delta, time, playerPos) {
        // Realistic Wind Swaying for 3D Grass Blades & Wildflowers
        if (this.grassShaderUniforms) {
            this.grassShaderUniforms.uTime.value = time;
        }

        // Realistic Flowing Water, 3D Wave Shader & Shore Foam Animation
        if (this.waterShaderUniforms) {
            this.waterShaderUniforms.uTime.value = time;
        }
        if (this.waterTexture) {
            this.waterTexture.offset.x = time * 0.055;
            this.waterTexture.offset.y = Math.sin(time * 0.7) * 0.012;
        }
        if (this.shoreFoamTextures && this.shoreFoamTextures.length > 0) {
            this.shoreFoamTextures.forEach(tex => {
                tex.offset.x = time * 0.075;
            });
        }

        // Floating Water Lilies dynamic wave bobbing & gentle tilt
        if (this.floatingLilyPads && this.floatingLilyPads.length > 0) {
            for (let i = 0; i < this.floatingLilyPads.length; i++) {
                const item = this.floatingLilyPads[i];
                const waveY = Math.sin(item.baseX * 0.28 + time * 2.4 + item.baseZ * 0.35) * 0.045;
                item.mesh.position.y = 0.045 + waveY;
                item.mesh.rotation.z = Math.sin(time * 1.8 + item.baseX) * 0.04;
            }
        }

        // 1. Portals vortex spinning
        this.portals.forEach(p => {
            if (p.vortex) p.vortex.rotation.z = time * 1.6;
            if (p.ring) p.ring.rotation.z = -time * 0.9;
        });

        // 2. Windmill sails continuous rotation
        if (this.windmill && this.windmill.sailsPivot) {
            this.windmill.sailsPivot.rotation.z += 1.2 * delta;
        }

        // 3. Royal Guard Knights patrolling in formation
        if (this.villageGuard && this.villageGuard2) {
            const g1 = this.villageGuard;
            const g2 = this.villageGuard2;
            if (!g1.patrolDir) g1.patrolDir = 1;

            g1.group.position.z += g1.patrolDir * 2.5 * delta;
            g2.group.position.z = g1.group.position.z;

            const legSwing = Math.sin(time * 6) * 0.45;
            g1.legL.rotation.x = legSwing; g1.legR.rotation.x = -legSwing;
            g2.legL.rotation.x = -legSwing; g2.legR.rotation.x = legSwing;

            if (g1.group.position.z > 42) {
                g1.patrolDir = -1;
                g1.group.rotation.y = Math.PI;
                g2.group.rotation.y = Math.PI;
            } else if (g1.group.position.z < 18) {
                g1.patrolDir = 1;
                g1.group.rotation.y = 0;
                g2.group.rotation.y = 0;
            }
        }

        // 4. Village Dog playful trot & tail wagging
        if (this.villageDog) {
            const dog = this.villageDog;
            dog.tail.rotation.z = Math.sin(time * 14) * 0.5;
            dog.group.position.y = Math.abs(Math.sin(time * 8)) * 0.08;
            dog.group.position.x = 6.5 + Math.sin(time * 0.6) * 2.2;
            dog.group.position.z = 4.0 + Math.cos(time * 0.6) * 1.8;
            dog.group.rotation.y = time * 0.6 + Math.PI / 2;
        }

        // 5. Roaming Villagers AI Pathfinding loops
        this.roamingVillagers.forEach(v => {
            v.walkCycle += delta * 5;
            const legSwing = Math.sin(v.walkCycle) * 0.4;
            v.legL.rotation.x = legSwing;
            v.legR.rotation.x = -legSwing;

            // Roam in elliptical patrol near home
            const t = time * 0.5 + (v.radius || 5);
            v.group.position.x = v.homeX + Math.sin(t) * (v.radius || 6);
            v.group.position.z = v.homeZ + Math.cos(t) * (v.radius || 6);
            v.group.rotation.y = t + Math.PI / 2;
        });

        // 6. Intelligent Head Tracking (NPCs turn heads to look at Hero when nearby!)
        if (playerPos) {
            const trackHead = (npcObj, distThreshold = 8.0) => {
                if (!npcObj || !npcObj.headGroup) return;
                const d = playerPos.distanceTo(npcObj.group.position);
                if (d < distThreshold) {
                    const toPlayer = playerPos.clone().sub(npcObj.group.position).normalize();
                    const targetAngle = Math.atan2(toPlayer.x, toPlayer.z) - npcObj.group.rotation.y;
                    npcObj.headGroup.rotation.y = THREE.MathUtils.lerp(npcObj.headGroup.rotation.y, targetAngle, 8 * delta);
                } else {
                    npcObj.headGroup.rotation.y = THREE.MathUtils.lerp(npcObj.headGroup.rotation.y, 0, 5 * delta);
                }
            };

            trackHead(this.villageElder);
            trackHead(this.villageGuard);
            trackHead(this.villageGuard2);
            trackHead(this.blacksmith);
            trackHead(this.bard);
            trackHead(this.gateGuard);
            trackHead(this.alchemist);
            trackHead(this.archaeologist);
            trackHead(this.stableMaster);
        }

        // Animate Stable Master Barnaby waving his brush
        if (this.stableMaster && this.stableMaster.rightArmGroup) {
            this.stableMaster.rightArmGroup.rotation.z = 0.6 + Math.sin(time * 3.5) * 0.25;
        }

        // Animate preview mounts in stable yard
        if (this.previewMounts && this.previewMounts.length > 0) {
            this.previewMounts.forEach((pm, idx) => {
                const m = pm.data;
                const offset = idx * 1.5;
                if (m.tail) m.tail.rotation.y = Math.sin(time * 2.0 + offset) * 0.2;
                if (m.neck) m.neck.rotation.x = -0.38 + Math.sin(time * 2.2 + offset) * 0.05;
                if (m.leftWing && m.rightWing) {
                    m.leftWing.rotation.z = Math.sin(time * 2.8 + offset) * 0.15;
                    m.rightWing.rotation.z = -Math.sin(time * 2.8 + offset) * 0.15;
                }
            });
        }

        // Animate Blacksmith Hammering Anvil
        if (this.blacksmith && this.blacksmith.armR) {
            this.blacksmith.armR.rotation.x = Math.sin(time * 5.5) * 0.7 - 0.2;
        }

        // Animate Bard gentle swaying to music
        if (this.bard && this.bard.group) {
            this.bard.group.rotation.y = Math.sin(time * 1.8) * 0.2;
        }

        // Animate Village Cat tail curling
        if (this.villageCat && this.villageCat.tail) {
            this.villageCat.tail.rotation.z = Math.sin(time * 3.5) * 0.35;
        }

        // 7. Angel Wizard Hover & Wing Flap
        if (this.angelWizard) {
            this.angelWizard.floatingBody.position.y = Math.sin(time * 2.4) * 0.18;
            const wingFlap = Math.sin(time * 4.5) * 0.4;
            this.angelWizard.wingL.rotation.y = wingFlap;
            this.angelWizard.wingR.rotation.y = -wingFlap;
        }

        // 8. Slimes bounce squash & stretch physics
        this.enemies.forEach(e => {
            if (!e.alive) return;
            if (e.body && (e.type === 'green' || e.type === 'blue' || e.type === 'gold')) {
                const bounce = Math.abs(Math.sin(time * 3.5 + (e.wobbleOffset || 0)));
                e.group.position.y = bounce * 0.45;
                e.body.scale.set(1 + (1 - bounce) * 0.3, 1 + bounce * 0.35, 1 + (1 - bounce) * 0.3);
            }
        });

        // 9. Dragon Boss Idle & Wing Flap
        if (this.dragonBoss && this.dragonBoss.alive) {
            const wingAngle = Math.sin(time * 3.2) * 0.45;
            this.dragonBoss.wingLGroup.rotation.z = wingAngle;
            this.dragonBoss.wingRGroup.rotation.z = -wingAngle;
            this.dragonBoss.headGroup.position.y = 4.0 + Math.sin(time * 2) * 0.18;
        }

        // 10. Atmospheric dust drift
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] += Math.sin(time + i) * 0.008;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // 11. Billowing Chimney Smoke in Town
        if (this.currentZone === 'town' && Math.random() < 0.12) {
            this.spawnSmokePuff(new THREE.Vector3(28, 4.5, -26)); // Forge chimney
            this.spawnSmokePuff(new THREE.Vector3(-34, 5.5, 15)); // House chimney
        }

        for (let i = this.smokePuffs.length - 1; i >= 0; i--) {
            const p = this.smokePuffs[i];
            p.life += delta;
            p.mesh.position.y += 1.5 * delta;
            p.mesh.position.x += 0.3 * delta;
            p.mesh.scale.multiplyScalar(1.02);
            p.mesh.material.opacity = Math.max(0, p.opacity * (1 - p.life / p.maxLife));

            if (p.life >= p.maxLife) {
                this.scene.remove(p.mesh);
                this.smokePuffs.splice(i, 1);
            }
        }

        // 12. Check Portals & Cooldown
        if (this.portalCooldown > 0) {
            this.portalCooldown -= delta;
        }

        if (playerPos) {
            this.checkPortalCollisions(playerPos);
        }
    }
}
