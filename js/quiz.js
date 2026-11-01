/**
 * ============================================================================
 * MODUL KUIS & SISTEM PEMBELAJARAN RPG (Educational Quiz System)
 * ============================================================================
 * Mengatur tampilan UI modal tantangan kuis, interaksi jawaban, suara efek,
 * pembagian hadiah (Poin, Emas/Gold, Darah/HP, EXP), serta integrasi
 * ke objek pemain, jamur, portal, peti, dan NPC.
 */

class EducationalQuizManager {
    constructor() {
        this.activeQuestion = null;
        this.activeOptions = {};
        this.onSuccessCallback = null;
        this.onFailCallback = null;
        this.isOpen = false;
        this.answered = false;
        this.autoCloseTimer = null;

        this.modal = null;
        this.titleEl = null;
        this.subjectEl = null;
        this.iconEl = null;
        this.rewardPreviewEl = null;
        this.contextEl = null;
        this.questionTextEl = null;
        this.optionsGridEl = null;
        this.feedbackBoxEl = null;
        this.feedbackStatusEl = null;
        this.feedbackRewardsEl = null;
        this.feedbackExplanationEl = null;
        this.feedbackActionsEl = null;
        this.closeBtn = null;

        // Inisialisasi saat DOM siap
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.modal = document.getElementById('quiz-modal');
        this.titleEl = document.getElementById('quiz-title');
        this.subjectEl = document.getElementById('quiz-subject');
        this.iconEl = document.getElementById('quiz-icon');
        this.rewardPreviewEl = document.getElementById('quiz-reward-preview');
        this.contextEl = document.getElementById('quiz-context');
        this.questionTextEl = document.getElementById('quiz-question-text');
        this.optionsGridEl = document.getElementById('quiz-options-grid');
        this.feedbackBoxEl = document.getElementById('quiz-feedback');
        this.feedbackStatusEl = document.getElementById('quiz-feedback-status');
        this.feedbackRewardsEl = document.getElementById('quiz-feedback-rewards');
        this.feedbackExplanationEl = document.getElementById('quiz-feedback-explanation');
        this.feedbackActionsEl = document.getElementById('quiz-feedback-actions');
        this.closeBtn = document.getElementById('quiz-close-btn');

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.handleCancel());
        }

        // Shortcut keyboard saat kuis aktif (1/2/3/4 atau A/B/C/D atau ESC)
        window.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                if (this.autoCloseTimer) {
                    clearTimeout(this.autoCloseTimer);
                    this.autoCloseTimer = null;
                }
                this.handleCancel();
                return;
            }

            if (!this.answered) {
                const key = e.key.toLowerCase();
                let choice = -1;
                if (key === '1' || key === 'a') choice = 0;
                else if (key === '2' || key === 'b') choice = 1;
                else if (key === '3' || key === 'c') choice = 2;
                else if (key === '4' || key === 'd') choice = 3;

                if (choice >= 0 && choice < 4) {
                    this.selectOption(choice);
                }
            } else {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (this.autoCloseTimer) {
                        clearTimeout(this.autoCloseTimer);
                        this.autoCloseTimer = null;
                    }
                    const contBtn = document.getElementById('quiz-continue-btn');
                    if (contBtn) {
                        contBtn.click();
                        return;
                    }
                    const wrongCloseBtn = document.getElementById('quiz-close-after-wrong-btn');
                    if (wrongCloseBtn) {
                        wrongCloseBtn.click();
                        return;
                    }
                }
            }
        });
    }

    /**
     * Buka modal kuis untuk event game tertentu
     * @param {Object} config
     *   category: 'mushroom' | 'portal' | 'npc' | 'chest' | 'general'
     *   subject: 'Matematika' | 'IPA' dll (opsional)
     *   npcName: nama NPC penanya (opsional)
     *   title: Judul khusus
     *   icon: Emoji/ikon
     *   contextDesc: Deskripsi konteks cerita
     *   onSuccess: fungsi callback jika berhasil dijawab benar
     *   onFail: fungsi callback jika gagal / ditutup
     *   allowClose: boolean
     */
    openQuiz(config = {}) {
        if (!window.QuestionDB) {
            console.error('QuestionDB tidak ditemukan!');
            if (config.onSuccess) config.onSuccess();
            return;
        }

        // Ambil soal yang cocok
        const q = window.QuestionDB.getRandomQuestion(
            config.category || 'general',
            config.subject || null,
            config.npcName || null
        );

        if (!q) {
            console.warn('Tidak ada soal yang tersedia untuk kategori ini.');
            if (config.onSuccess) config.onSuccess();
            return;
        }

        this.activeQuestion = q;
        this.activeOptions = config;
        this.onSuccessCallback = config.onSuccess || null;
        this.onFailCallback = config.onFail || null;
        this.answered = false;
        this.isOpen = true;
        window.quizActive = true;

        // Hentikan pergerakan pemain agar tidak diserang monster saat berpikir
        if (window.game && window.game.player) {
            window.game.player.moveX = 0;
            window.game.player.moveZ = 0;
            window.game.player.isMoving = false;
        }

        // Pasang data ke UI
        if (this.titleEl) this.titleEl.textContent = config.title || 'TANTANGAN KUIS EDUKASI';
        if (this.iconEl) this.iconEl.textContent = config.icon || '🎓';
        if (this.subjectEl) this.subjectEl.textContent = `${q.subject} [${q.difficulty}]`;
        if (this.contextEl) {
            this.contextEl.textContent = config.contextDesc || 'Jawablah pertanyaan edukasi berikut untuk mendapatkan hadiah pengetahuan!';
        }

        const r = q.reward || { points: 20, gold: 50, hp: 30, exp: 35 };
        if (this.rewardPreviewEl) {
            this.rewardPreviewEl.innerHTML = `🎁 Hadiah: <b>+${r.points} Poin</b> | <b>+${r.gold} Gold</b> | <b>+${r.hp} Darah</b> | <b>+${r.exp} EXP</b>`;
        }

        if (this.questionTextEl) {
            this.questionTextEl.textContent = q.question;
        }

        // Render 4 Pilihan Jawaban
        if (this.optionsGridEl) {
            this.optionsGridEl.innerHTML = '';
            q.options.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'quiz-option-btn';
                btn.setAttribute('data-index', idx);

                const letters = ['A', 'B', 'C', 'D'];
                btn.innerHTML = `
                    <span class="option-badge">${letters[idx]}</span>
                    <span class="option-text">${optText.replace(/^[A-D]\.\s*/, '')}</span>
                `;

                btn.addEventListener('click', () => {
                    if (!this.answered) {
                        this.selectOption(idx);
                    }
                });

                this.optionsGridEl.appendChild(btn);
            });
        }

        // Reset Feedback Box
        if (this.feedbackBoxEl) {
            this.feedbackBoxEl.style.display = 'none';
            this.feedbackBoxEl.className = 'quiz-feedback-box';
        }

        // Tampilkan Modal
        if (this.modal) {
            this.modal.style.display = 'flex';
        }

        // Efek audio buka kuis
        if (typeof Audio !== 'undefined' && Audio.playDialogueBlip) {
            Audio.playDialogueBlip();
        }
    }

    /**
     * Memilih jawaban
     * @param {number} chosenIdx
     */
    selectOption(chosenIdx) {
        if (this.answered || !this.activeQuestion) return;
        this.answered = true;

        const q = this.activeQuestion;
        const isCorrect = (chosenIdx === q.correctIndex);
        const optionButtons = this.optionsGridEl.querySelectorAll('.quiz-option-btn');

        // Nonaktifkan tombol dan beri highlight visual
        optionButtons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.correctIndex) {
                btn.classList.add('correct');
            } else if (idx === chosenIdx && !isCorrect) {
                btn.classList.add('wrong');
            } else {
                btn.classList.add('dimmed');
            }
        });

        if (isCorrect) {
            this.handleAnswerCorrect();
        } else {
            this.handleAnswerWrong(chosenIdx);
        }
    }

    /**
     * Menangani jawaban BENAR
     */
    handleAnswerCorrect() {
        const q = this.activeQuestion;
        const r = q.reward || { points: 20, gold: 50, hp: 30, exp: 35 };

        // Suara kemenangan
        if (typeof Audio !== 'undefined') {
            if (Audio.playQuizCorrect) Audio.playQuizCorrect();
            else if (Audio.playLevelUp) Audio.playLevelUp();
        }

        // Berikan hadiah ke Pemain (Poin, Emas, HP, EXP)
        if (window.game && window.game.player) {
            const player = window.game.player;

            // 1. Tambah Poin Edukasi
            if (typeof player.addQuizScore === 'function') {
                player.addQuizScore(r.points);
            } else {
                player.quizScore = (player.quizScore || 0) + r.points;
            }

            // 2. Tambah Gold
            player.addGold(r.gold);

            // 3. Pulihkan Darah (HP)
            if (typeof player.heal === 'function') {
                player.heal(r.hp);
            } else {
                player.hp = Math.min(player.maxHp, player.hp + r.hp);
            }

            // 4. Tambah EXP
            player.addExp(r.exp);

            // Efek teks melayang 3D jika combat engine tersedia
            if (window.game.combat && typeof window.game.combat.createDamagePopup === 'function') {
                const pos = player.mesh.position.clone();
                window.game.combat.createDamagePopup(pos, `+${r.hp} HP HEAL`, false, '#22c55e');
                window.game.combat.createDamagePopup(pos.clone().add(new THREE.Vector3(0, 1.2, 0)), `+${r.points} POIN KUIS!`, false, '#38bdf8');
            }

            // Update UI HUD
            if (window.UI) {
                window.UI.updateStats();
            }
        }

        // Tampilkan Feedback Positif
        if (this.feedbackBoxEl) {
            this.feedbackBoxEl.className = 'quiz-feedback-box correct-feedback';
            this.feedbackBoxEl.style.display = 'block';

            if (this.feedbackStatusEl) {
                this.feedbackStatusEl.innerHTML = `
                    <div class="feedback-badge-success">🎉 JAWABAN TEPAT! LUAR BIASA!</div>
                `;
            }

            if (this.feedbackRewardsEl) {
                this.feedbackRewardsEl.innerHTML = `
                    <div class="reward-pills-row">
                        <span class="r-pill r-points">🎓 +${r.points} Poin Edukasi</span>
                        <span class="r-pill r-gold">💰 +${r.gold} Gold</span>
                        <span class="r-pill r-hp">❤️ +${r.hp} Darah Pulih</span>
                        <span class="r-pill r-exp">⭐ +${r.exp} EXP</span>
                    </div>
                `;
            }

            if (this.feedbackExplanationEl) {
                this.feedbackExplanationEl.innerHTML = `
                    <div class="explanation-title">💡 Pembahasan Materi & Pengetahuan:</div>
                    <div class="explanation-text">${q.explanation}</div>
                `;
            }

            if (this.feedbackActionsEl) {
                this.feedbackActionsEl.innerHTML = `
                    <button type="button" class="quiz-continue-btn" id="quiz-continue-btn">
                        <span>Lanjutkan Petualangan</span>
                        <span>➔</span>
                    </button>
                `;

                const contBtn = document.getElementById('quiz-continue-btn');
                if (contBtn) {
                    contBtn.focus();
                    contBtn.addEventListener('click', () => {
                        this.closeQuiz();
                        if (this.onSuccessCallback) {
                            this.onSuccessCallback();
                        }
                    });
                }
            }
        }
    }

    /**
     * Menangani jawaban SALAH:
     * - Mengurangi Darah / HP pemain (Penalti -20 HP)
     * - Menampilkan teks melayang dan suara hit/salah
     * - Menampilkan petunjuk dan kunci materi
     * - Menutup modal secara otomatis (atau tombol tutup)
     * - Soal berikutnya diacak ulang saat mencoba lagi
     */
    handleAnswerWrong(chosenIdx) {
        const q = this.activeQuestion;
        const penaltyHp = 20;
        let playerDied = false;

        // 1. Kurangi Darah/HP pemain
        if (window.game && window.game.player) {
            const player = window.game.player;
            if (typeof player.takeDamage === 'function') {
                player.takeDamage(penaltyHp);
            } else {
                player.hp = Math.max(0, player.hp - penaltyHp);
                if (window.UI) window.UI.updateStats();
                if (player.hp <= 0 && window.game.combat) {
                    window.game.combat.handlePlayerDeath();
                    playerDied = true;
                }
            }

            // Efek teks melayang merah (-20 HP)
            if (window.game.combat && typeof window.game.combat.createDamagePopup === 'function') {
                const pos = player.mesh.position.clone();
                window.game.combat.createDamagePopup(pos, `-${penaltyHp} HP SALAH JAWAB!`, true, '#ef4444');
            }
        }

        // 2. Efek audio hit / salah
        if (typeof Audio !== 'undefined') {
            if (Audio.playHit) Audio.playHit();
            else if (Audio.playQuizWrong) Audio.playQuizWrong();
        }

        // 3. Tampilkan Feedback Penalti & Pembahasan Singkat
        if (this.feedbackBoxEl) {
            this.feedbackBoxEl.className = 'quiz-feedback-box wrong-feedback';
            this.feedbackBoxEl.style.display = 'block';

            if (this.feedbackStatusEl) {
                this.feedbackStatusEl.innerHTML = `
                    <div class="feedback-badge-fail">❌ JAWABAN KURANG TEPAT! (-${penaltyHp} HP)</div>
                `;
            }

            if (this.feedbackRewardsEl) {
                this.feedbackRewardsEl.innerHTML = `
                    <div style="font-size:13px; color:#fca5a5; font-weight:bold; margin-bottom:4px;">
                        💥 Darah berkurang -${penaltyHp} HP! Modal akan tertutup dan soal diacak lagi saat mencoba kembali.
                    </div>
                `;
            }

            if (this.feedbackExplanationEl) {
                this.feedbackExplanationEl.innerHTML = `
                    <div class="explanation-title">💡 Petunjuk Pembahasan Materi:</div>
                    <div class="explanation-text">${q.explanation}</div>
                `;
            }

            if (this.feedbackActionsEl) {
                this.feedbackActionsEl.innerHTML = `
                    <button type="button" class="quiz-cancel-btn" id="quiz-close-after-wrong-btn">
                        <span>✕ Tutup Sekarang (Soal Diacak Lagi)</span>
                    </button>
                `;

                const cancelBtn = document.getElementById('quiz-close-after-wrong-btn');
                if (cancelBtn) {
                    cancelBtn.focus();
                    cancelBtn.addEventListener('click', () => {
                        if (this.autoCloseTimer) {
                            clearTimeout(this.autoCloseTimer);
                            this.autoCloseTimer = null;
                        }
                        this.handleCancel();
                    });
                }
            }
        }

        // 4. Modal otomatis tertutup setelah 1.8 detik
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
        }

        if (playerDied) {
            this.handleCancel();
        } else {
            this.autoCloseTimer = setTimeout(() => {
                if (this.isOpen) {
                    this.handleCancel();
                }
            }, 1800);
        }
    }

    handleCancel() {
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
        }
        this.closeQuiz();
        if (this.onFailCallback) {
            this.onFailCallback();
        }
    }

    closeQuiz() {
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
        }
        this.isOpen = false;
        this.answered = false;
        window.quizActive = false;

        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
}

// Inisialisasi Quiz Manager Global
window.EduQuiz = new EducationalQuizManager();
