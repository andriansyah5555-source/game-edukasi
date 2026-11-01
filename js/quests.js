// Quest Management System: Directional Storyline, Quest Tracker, Compass Pointer & Log Modal

class QuestManager {
    constructor() {
        this.currentQuestIndex = 0;
        this.quests = [
            {
                id: 'quest_1',
                chapter: 'Chapter 1: The Rookie Adventurer',
                title: 'Perlengkapan Pertama (First Gear)',
                desc: 'Kunjungi Toko Senjata di Desa Oakhaven dan beli perlengkapan senjata (Iron Sword) untuk persiapan ekspedisi!',
                targetType: 'purchase_or_kill',
                targetZone: 'town',
                targetEntity: 'shopkeeper',
                required: 1,
                current: 0,
                rewardGold: 100,
                rewardExp: 50,
                completed: false,
                hint: 'Kunjungi Toko Senjata di barat laut Desa Oakhaven dan beli Iron Sword (atau senjata lain).'
            },
            {
                id: 'quest_2',
                chapter: 'Chapter 1: The Rookie Adventurer',
                title: 'Invasi Slime Hutan (Slime Woods)',
                desc: 'Pergilah melalui gerbang selatan menuju Whispering Woods dan kalahkan 5 Slime Hutan!',
                targetType: 'kill_slime',
                targetZone: 'forest',
                targetEntity: 'slime',
                required: 5,
                current: 0,
                rewardGold: 200,
                rewardExp: 100,
                completed: false,
                hint: 'Masuki portal hutan di selatan desa, lalu tebas 5 Slime hijau/biru.'
            },
            {
                id: 'quest_3',
                chapter: 'Chapter 2: Mystic Forest Secrets',
                title: 'Jamur Ajaib Bercahaya (Mystic Mushrooms)',
                desc: 'Petik 3 Jamur Ajaib bercahaya di area Whispering Woods dengan memecahkan teka-teki alamnya!',
                targetType: 'gather_mushroom',
                targetZone: 'forest',
                targetEntity: 'mushroom',
                required: 3,
                current: 0,
                rewardGold: 250,
                rewardExp: 150,
                completed: false,
                hint: 'Cari jamur bercahaya ungu/biru di antara pepohonan hutan lalu tekan [E] untuk menjawab tantangan alam.'
            },
            {
                id: 'quest_4',
                chapter: 'Chapter 2: Mystic Forest Secrets',
                title: 'Gerbang Reruntuhan Kuno (Crypt Portal)',
                desc: 'Pecahkan teka-teki dimensi penjaga portal kuno untuk membuka jalan menuju Goblin Crypt Ruins!',
                targetType: 'enter_zone',
                targetZone: 'ruins',
                targetEntity: 'portal_ruins',
                required: 1,
                current: 0,
                rewardGold: 300,
                rewardExp: 200,
                completed: false,
                hint: 'Ikuti jalan setapak hutan ke arah portal ungu, lalu jawab teka-teki dimensi penjaga portal.'
            },
            {
                id: 'quest_5',
                chapter: 'Chapter 3: The Goblin Crypt',
                title: 'Pembersihan Reruntuhan (Goblin Purge)',
                desc: 'Kalahkan 4 Goblin Warrior dan Skeleton yang menduduki Reruntuhan Kuno!',
                targetType: 'kill_goblin',
                targetZone: 'ruins',
                targetEntity: 'goblin',
                required: 4,
                current: 0,
                rewardGold: 450,
                rewardExp: 350,
                completed: false,
                hint: 'Jelajahi lorong reruntuhan kuno dan basmi para prajurit goblin bertongkat duri.'
            },
            {
                id: 'quest_6',
                chapter: 'Chapter 3: The Goblin Crypt',
                title: 'Harta Karun Tersembunyi (Treasure Chest)',
                desc: 'Pecahkan gembok sandi kuno untuk membuka Peti Harta Karun (Treasure Chest) di dalam Reruntuhan!',
                targetType: 'open_chest',
                targetZone: 'ruins',
                targetEntity: 'chest',
                required: 1,
                current: 0,
                rewardGold: 500,
                rewardExp: 400,
                completed: false,
                hint: 'Cari peti harta karun emas di sudut reruntuhan, dekati dan tekan [E] untuk memecahkan sandi gemboknya.'
            },
            {
                id: 'quest_7',
                chapter: 'Chapter 4: The Dragon Peak',
                title: 'Pedang Bintang & Gerbang Naga (Star Sword & Dragon Gate)',
                desc: 'Beli atau lengkapi Star Sword legendaris dan masuki Portal Crimson Dragon Peak!',
                targetType: 'equip_star_sword',
                targetZone: 'boss_peak',
                targetEntity: 'portal_dragon',
                required: 1,
                current: 0,
                rewardGold: 1000,
                rewardExp: 800,
                completed: false,
                hint: 'Kumpulkan gold untuk Star Sword, lalu masuk ke Portal Puncak Naga Api di ujung reruntuhan.'
            },
            {
                id: 'quest_8',
                chapter: 'Final Chapter: Legend of the Slayer',
                title: 'Kalahkan Naga Gunung Berapi (The Crimson Dragon)',
                desc: 'Kalahkan Raja Naga Kuno (Ancient Crimson Dragon) untuk membebaskan seluruh negeri!',
                targetType: 'kill_dragon',
                targetZone: 'boss_peak',
                targetEntity: 'dragon_boss',
                required: 1,
                current: 0,
                rewardGold: 2500,
                rewardExp: 2000,
                completed: false,
                hint: 'Hindari semburan nafas api dan serangan guncangan naga! Gunakan skill Whirlwind [Q] & Dash [Shift]!'
            }
        ];
    }

    getCurrentQuest() {
        return this.quests[this.currentQuestIndex] || null;
    }

    /**
     * Memeriksa apakah wilayah tujuan sudah terbuka sesuai urutan misi
     * Pemain WAJIB menyelesaikan misi secara terurut dan TIDAK BISA langsung
     * loncat ke level akhir menghadapi bos/naga.
     * @param {string} zoneId - 'town' | 'forest' | 'ruins' | 'boss_peak'
     * @returns {boolean}
     */
    isZoneUnlocked(zoneId) {
        if (!zoneId || zoneId === 'town') return true;

        // Whispering Woods (Hutan): Terbuka setelah Misi 1 selesai (currentQuestIndex >= 1)
        if (zoneId === 'forest') {
            return this.currentQuestIndex >= 1;
        }

        // Goblin Crypt Ruins (Reruntuhan): Terbuka setelah Misi 1, 2, dan 3 selesai (currentQuestIndex >= 3)
        // Misi 4 adalah "Gerbang Reruntuhan Kuno" yang menugaskan pemain masuk ke Ruins
        if (zoneId === 'ruins') {
            return this.currentQuestIndex >= 3;
        }

        // Crimson Dragon Peak (Level Akhir Menghadapi Naga Boss):
        // Terbuka HANYA setelah Misi 1 sampai Misi 6 selesai (currentQuestIndex >= 6)
        if (zoneId === 'boss_peak') {
            return this.currentQuestIndex >= 6;
        }

        return true;
    }

    /**
     * Alasan penguncian wilayah berdasarkan misi aktif
     * @param {string} zoneId
     * @returns {string}
     */
    getZoneLockReason(zoneId) {
        if (zoneId === 'forest') {
            return '🔒 Gerbang Whispering Woods Tersegel!\nSelesaikan Misi 1: "Perlengkapan Pertama" di Desa Oakhaven terlebih dahulu!';
        }
        if (zoneId === 'ruins') {
            if (this.currentQuestIndex < 1) {
                return '🔒 Gerbang Reruntuhan Tersegel Kuno!\nSelesaikan Misi 1 di Desa Oakhaven terlebih dahulu!';
            }
            if (this.currentQuestIndex === 1) {
                return '🔒 Gerbang Reruntuhan Tersegel!\nSelesaikan Misi 2: "Invasi Slime Hutan" (Kalahkan 5 Slime) terlebih dahulu!';
            }
            if (this.currentQuestIndex === 2) {
                return '🔒 Gerbang Reruntuhan Tersegel!\nSelesaikan Misi 3: "Jamur Ajaib Bercahaya" (Petik 3 Jamur Ajaib) terlebih dahulu!';
            }
            return '🔒 Gerbang Reruntuhan Tersegel!\nSelesaikan seluruh misi di Whispering Woods terlebih dahulu!';
        }
        if (zoneId === 'boss_peak') {
            if (this.currentQuestIndex < 3) {
                return '🔒 Puncak Naga Tersegel Magis Purba!\nSelesaikan misi di Desa Oakhaven dan Whispering Woods terlebih dahulu!';
            }
            if (this.currentQuestIndex === 3) {
                return '🔒 Puncak Naga Tersegel!\nSelesaikan Misi 4: Masuki Goblin Crypt Ruins terlebih dahulu!';
            }
            if (this.currentQuestIndex === 4) {
                return '🔒 Puncak Naga Tersegel Api Purba!\nSelesaikan Misi 5: "Pembersihan Reruntuhan" (Kalahkan 4 Goblin & Skeleton) terlebih dahulu!';
            }
            if (this.currentQuestIndex === 5) {
                return '🔒 Puncak Naga Tersegel Api Purba!\nSelesaikan Misi 6: "Harta Karun Tersembunyi" (Buka Peti Kuno) terlebih dahulu!';
            }
            return '🔒 Puncak Naga Tersegel!\nSelesaikan seluruh misi di Reruntuhan Kuno sebelum menghadapi Sang Naga!';
        }
        return 'Wilayah belum dapat diakses.';
    }

    onEnemyKilled(enemyType) {
        const q = this.getCurrentQuest();
        if (!q) return;

        if (q.targetType === 'kill_slime' && (enemyType.includes('slime') || enemyType === 'green' || enemyType === 'blue' || enemyType === 'gold')) {
            this.addProgress(1);
        } else if (q.targetType === 'kill_goblin' && (enemyType === 'goblin' || enemyType === 'skeleton')) {
            this.addProgress(1);
        } else if (q.targetType === 'kill_dragon' && enemyType === 'dragon_boss') {
            this.addProgress(1);
        } else if (q.targetType === 'purchase_or_kill') {
            this.addProgress(1);
        }
    }

    onItemPurchased(itemId) {
        const q = this.getCurrentQuest();
        if (!q) return;

        if (q.targetType === 'purchase_or_kill') {
            this.addProgress(1);
        } else if (q.targetType === 'equip_star_sword' && itemId === 'starSword') {
            this.addProgress(1);
        }
    }

    onMushroomGathered() {
        const q = this.getCurrentQuest();
        if (!q) return;

        if (q.targetType === 'gather_mushroom') {
            this.addProgress(1);
        }
    }

    onChestOpened() {
        const q = this.getCurrentQuest();
        if (!q) return;

        if (q.targetType === 'open_chest') {
            this.addProgress(1);
        }
    }

    onZoneEntered(zoneId) {
        const q = this.getCurrentQuest();
        if (!q) return;

        if (q.targetType === 'enter_zone' && zoneId === q.targetZone) {
            this.addProgress(1);
        } else if (q.targetType === 'equip_star_sword' && zoneId === 'boss_peak') {
            this.addProgress(1);
        }
    }

    addProgress(amount = 1) {
        const q = this.getCurrentQuest();
        if (!q || q.completed) return;

        q.current = Math.min(q.required, q.current + amount);
        this.updateHUD();

        if (q.current >= q.required) {
            this.completeCurrentQuest();
        }
    }

    completeCurrentQuest() {
        const q = this.getCurrentQuest();
        if (!q) return;

        q.completed = true;
        Audio.playLevelUp();

        // Give Rewards
        if (window.game && window.game.player) {
            window.game.player.addGold(q.rewardGold);
            window.game.player.addExp(q.rewardExp);
        }

        // Show Epic Banner
        this.showQuestCompletedBanner(q);

        // Advance to next quest after brief delay
        setTimeout(() => {
            this.currentQuestIndex++;
            this.updateHUD();
            const nextQ = this.getCurrentQuest();
            if (nextQ && window.UI) {
                window.UI.showCustomDialogue('hero', `Misi baru dimulai: "${nextQ.title}"! ${nextQ.hint}`);
            }
        }, 1800);
    }

    showQuestCompletedBanner(quest) {
        const div = document.createElement('div');
        div.className = 'quest-complete-modal';
        div.innerHTML = `
            <div class="quest-complete-header">✨ MISI SELESAI! ✨</div>
            <div class="quest-complete-title">${quest.title}</div>
            <div class="quest-complete-rewards">
                <span>💰 +${quest.rewardGold} Gold</span>
                <span>⭐ +${quest.rewardExp} EXP</span>
            </div>
        `;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3200);
    }

    updateHUD() {
        const q = this.getCurrentQuest();
        const titleEl = document.getElementById('quest-tracker-title');
        const descEl = document.getElementById('quest-tracker-desc');
        const progEl = document.getElementById('quest-tracker-progress');
        const fillEl = document.getElementById('quest-tracker-bar-fill');
        const compassText = document.getElementById('quest-compass-text');

        if (!q) {
            if (titleEl) titleEl.textContent = '🏆 Semua Misi Selesai!';
            if (descEl) descEl.textContent = 'Selamat! Anda adalah Sang Penakluk Legendaris (Pixel Slayer)!';
            if (progEl) progEl.textContent = '100%';
            if (fillEl) fillEl.style.width = '100%';
            if (compassText) compassText.textContent = 'Bebas Bertualang';
            return;
        }

        if (titleEl) titleEl.textContent = q.title;
        if (descEl) descEl.textContent = q.desc;
        if (progEl) progEl.textContent = `${q.current}/${q.required}`;
        if (fillEl) fillEl.style.width = `${(q.current / q.required) * 100}%`;

        // Compass destination label
        if (compassText) {
            compassText.textContent = `Target: ${q.targetZone.toUpperCase()} (${q.hint})`;
        }
    }

    // Directional Compass calculation towards current objective target
    calculateCompassAngle(playerPos, currentZone, worldManager) {
        const q = this.getCurrentQuest();
        if (!q) return 0;

        let targetPos = new THREE.Vector3(0, 0, 0);

        // If player is not in the quest target zone, point towards the portal that leads to it!
        if (currentZone !== q.targetZone) {
            const portal = worldManager.getPortalTo(q.targetZone, currentZone);
            if (portal) {
                targetPos.copy(portal.position);
            }
        } else {
            // Player is in the right zone, point to nearest entity
            targetPos = worldManager.getNearestQuestTarget(q.targetEntity, playerPos);
        }

        if (!targetPos) return 0;

        // Angle on X-Z plane
        const dx = targetPos.x - playerPos.x;
        const dz = targetPos.z - playerPos.z;
        const dist = Math.hypot(dx, dz);

        // Angle in degrees
        const angle = Math.atan2(dx, dz) * (180 / Math.PI);
        return { angle, dist: Math.round(dist) };
    }
}

window.QuestSys = new QuestManager();
