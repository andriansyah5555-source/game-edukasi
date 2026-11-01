// Mini-Map Radar & Fullscreen World Map System
// Renders real-time player position, monsters, NPCs, portals, and enables fast-travel

class MiniMapSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.size = 150;
        this.scale = 0.95; // 1 meter in 3D = 0.95px on mini-map (wide open world view)
        this.worldMapOpen = false;

        this.zonesData = {
            town: {
                id: 'town',
                name: 'Desa Oakhaven',
                icon: '🏰',
                dangerLevel: 'Aman (Safe Zone)',
                desc: 'Desa awal petualang. Terdapat Toko Senjata legendaris, Shopkeeper, dan Angel Wizard.',
                bgColor: '#4d908e',
                color: '#57cc99',
                coords: { x: 120, y: 340 }
            },
            forest: {
                id: 'forest',
                name: 'Whispering Woods',
                icon: '🌲',
                dangerLevel: 'Bahaya: Rendah (Lv. 1 - 3)',
                desc: 'Hutan lebat misterius tempat bersarangnya Slime Hutan dan Jamur Ajaib bercahaya.',
                bgColor: '#2d6a4f',
                color: '#52b788',
                coords: { x: 340, y: 280 }
            },
            ruins: {
                id: 'ruins',
                name: 'Goblin Crypt Ruins',
                icon: '🏛️',
                dangerLevel: 'Bahaya: Sedang (Lv. 3 - 6)',
                desc: 'Reruntuhan batu kuno yang dikuasai Prajurit Goblin bertongkat duri dan Kerangka.',
                bgColor: '#4a4e69',
                color: '#9a8c98',
                coords: { x: 560, y: 190 }
            },
            boss_peak: {
                id: 'boss_peak',
                name: 'Crimson Dragon Peak',
                icon: '🌋',
                dangerLevel: 'Sangat Berbahaya (Boss Lv. 10+)',
                desc: 'Puncak lava berapi sarang Raja Naga Kuno (Ancient Crimson Dragon).',
                bgColor: '#9d0208',
                color: '#e85d04',
                coords: { x: 740, y: 100 }
            }
        };

        this.init();
    }

    init() {
        this.canvas = document.getElementById('minimap-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = this.size;
            this.canvas.height = this.size;

            // Click minimap to open full World Map
            this.canvas.addEventListener('click', () => this.toggleWorldMap());
        }

        // World Map Close Button
        const closeBtn = document.getElementById('world-map-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggleWorldMap(false));
        }

        // Toggle button on top bar
        const mapBtn = document.getElementById('world-map-btn');
        if (mapBtn) {
            mapBtn.addEventListener('click', () => this.toggleWorldMap());
        }
    }

    toggleWorldMap(forceState = null) {
        this.worldMapOpen = forceState !== null ? forceState : !this.worldMapOpen;
        const modal = document.getElementById('world-map-modal');
        if (modal) {
            modal.style.display = this.worldMapOpen ? 'flex' : 'none';
        }
        if (this.worldMapOpen) {
            this.renderWorldMapModal();
        }
    }

    renderWorldMapModal() {
        const container = document.getElementById('world-map-zones-grid');
        const currentZone = window.game ? window.game.world.currentZone : 'town';
        if (!container) return;

        container.innerHTML = '';

        Object.values(this.zonesData).forEach(zone => {
            const isCurrent = zone.id === currentZone;
            const isUnlocked = !window.QuestSys || window.QuestSys.isZoneUnlocked(zone.id);
            const lockReason = window.QuestSys ? window.QuestSys.getZoneLockReason(zone.id) : '';

            const card = document.createElement('div');
            card.className = `world-map-card ${isCurrent ? 'active-zone' : ''} ${!isUnlocked ? 'locked-zone' : ''}`;
            card.style.borderColor = isUnlocked ? zone.color : '#475569';

            let footerHtml = '';
            if (isCurrent) {
                footerHtml = '<span class="pin-current">📍 ANDA DI SINI</span>';
            } else if (!isUnlocked) {
                footerHtml = `
                    <button class="fast-travel-btn locked" disabled title="Selesaikan misi cerita terlebih dahulu untuk membuka wilayah ini">
                        <span>🔒 Wilayah Terkunci</span>
                    </button>
                    <div class="zone-lock-hint">${lockReason.replace(/\n/g, '<br>')}</div>
                `;
            } else {
                footerHtml = `<button class="fast-travel-btn" onclick="window.game.world.changeZone('${zone.id}'); window.MiniMap.toggleWorldMap(false);">⚡ Teleport / Kunjungi</button>`;
            }

            card.innerHTML = `
                <div class="zone-badge" style="background:${isUnlocked ? zone.color : '#475569'}; color:${isUnlocked ? '#111' : '#f1f5f9'};">
                    ${!isUnlocked ? '🔒' : zone.icon} ${zone.name}
                </div>
                <div class="zone-danger">${zone.dangerLevel}</div>
                <div class="zone-desc">${zone.desc}</div>
                <div class="zone-footer">
                    ${footerHtml}
                </div>
            `;
            container.appendChild(card);
        });
    }

    update(player, world) {
        if (!this.ctx || !player || !world) return;

        const ctx = this.ctx;
        const w = this.size;
        const h = this.size;
        const center = w / 2;

        ctx.clearRect(0, 0, w, h);

        // 1. Radar Background
        const currentZoneData = this.zonesData[world.currentZone] || this.zonesData.town;
        ctx.fillStyle = currentZoneData.bgColor;
        ctx.fillRect(0, 0, w, h);

        // Concentric distance rings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        [25, 45, 65].forEach(r => {
            ctx.beginPath();
            ctx.arc(center, center, r, 0, Math.PI * 2);
            ctx.stroke();
        });

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(center, 0); ctx.lineTo(center, h);
        ctx.moveTo(0, center); ctx.lineTo(w, center);
        ctx.stroke();

        const pX = player.mesh.position.x;
        const pZ = player.mesh.position.z;

        // 1.5 Render River and Bridges on Radar
        if (world.currentZone === 'town' || world.currentZone === 'forest') {
            const riverZ = world.currentZone === 'town' ? 48 : 0;
            const riverW = (world.currentZone === 'town' ? 13.5 : 14.0) * this.scale;
            const riverScreenY = center + (riverZ - pZ) * this.scale - riverW / 2;

            ctx.fillStyle = 'rgba(2, 132, 199, 0.45)';
            ctx.fillRect(0, riverScreenY, w, riverW);

            ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, riverScreenY, w, riverW);

            // Bridges crossing the river
            const bridges = world.currentZone === 'town' ? [{ x: 0 }] : [{ x: -20 }, { x: 20 }];
            bridges.forEach(b => {
                const bX = center + (b.x - pX) * this.scale - 3.5;
                ctx.fillStyle = '#b45309';
                ctx.fillRect(bX, riverScreenY - 2, 7, riverW + 4);
                ctx.strokeStyle = '#fef3c7';
                ctx.lineWidth = 1;
                ctx.strokeRect(bX, riverScreenY - 2, 7, riverW + 4);
            });
        }

        // 2. Render Portals on Radar
        if (world.portals) {
            world.portals.forEach(portal => {
                const dx = (portal.position.x - pX) * this.scale;
                const dz = (portal.position.z - pZ) * this.scale;

                if (Math.abs(dx) < center && Math.abs(dz) < center) {
                    ctx.save();
                    ctx.translate(center + dx, center + dz);
                    // Pulsing star portal
                    ctx.fillStyle = '#f72585';
                    ctx.beginPath();
                    ctx.arc(0, 0, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 8px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('PORTAL', 0, -7);
                    ctx.restore();
                }
            });
        }

        // 3. Render Friendly NPCs (Green dots)
        if (world.npcs) {
            world.npcs.forEach(npc => {
                const dx = (npc.position.x - pX) * this.scale;
                const dz = (npc.position.z - pZ) * this.scale;

                if (Math.abs(dx) < center && Math.abs(dz) < center) {
                    ctx.fillStyle = '#4ade80';
                    ctx.beginPath();
                    ctx.arc(center + dx, center + dz, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#14532d';
                    ctx.stroke();
                }
            });
        }

        // Render Roaming Villagers (Cyan dots)
        if (world.roamingVillagers) {
            world.roamingVillagers.forEach(v => {
                const dx = (v.group.position.x - pX) * this.scale;
                const dz = (v.group.position.z - pZ) * this.scale;
                if (Math.abs(dx) < center && Math.abs(dz) < center) {
                    ctx.fillStyle = '#2dd4bf';
                    ctx.beginPath();
                    ctx.arc(center + dx, center + dz, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }

        // 4. Render Active Monsters (Red dots)
        if (world.enemies) {
            world.enemies.forEach(mon => {
                if (!mon.alive) return;
                const dx = (mon.group.position.x - pX) * this.scale;
                const dz = (mon.group.position.z - pZ) * this.scale;

                if (Math.abs(dx) < center && Math.abs(dz) < center) {
                    ctx.fillStyle = mon.type === 'dragon_boss' ? '#f43f5e' : '#ef4444';
                    ctx.beginPath();
                    ctx.arc(center + dx, center + dz, mon.type === 'dragon_boss' ? 6 : 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }

        // 5. Render Collectibles / Mushrooms (Cyan dots)
        if (world.collectibles) {
            world.collectibles.forEach(col => {
                if (!col.active) return;
                const dx = (col.mesh.position.x - pX) * this.scale;
                const dz = (col.mesh.position.z - pZ) * this.scale;

                if (Math.abs(dx) < center && Math.abs(dz) < center) {
                    ctx.fillStyle = '#38bdf8';
                    ctx.beginPath();
                    ctx.arc(center + dx, center + dz, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        }

        // 6. Player Cursor in Center (Blue Glowing Arrow rotating with player angle)
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(-player.mesh.rotation.y + Math.PI);

        // Arrow
        ctx.fillStyle = '#38bdf8';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -7);
        ctx.lineTo(5, 6);
        ctx.lineTo(0, 3);
        ctx.lineTo(-5, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // 7. Update HUD Label for Zone & Position
        const zoneLabel = document.getElementById('minimap-zone-title');
        if (zoneLabel) {
            zoneLabel.innerHTML = `${currentZoneData.icon} <b>${currentZoneData.name}</b>`;
        }

        const coordLabel = document.getElementById('minimap-coords');
        if (coordLabel) {
            coordLabel.textContent = `X: ${Math.round(pX)} | Z: ${Math.round(pZ)}`;
        }
    }
}

window.MiniMap = new MiniMapSystem();
