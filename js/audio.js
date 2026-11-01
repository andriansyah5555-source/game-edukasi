// Audio Engine using Web Audio API & HTML5 Audio for 100% offline standalone RPG music & sound effects
class SoundManager {
    constructor() {
        this.ctx = null;
        this.musicPlaying = false;
        this.musicInterval = null;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.musicVolume = 0.60; // Default 60%
        this.sfxVolume = 0.80;   // Default 80%

        this.bgmAudio = null;
        this.bgmSrc = 'assets/audio/musikutama.mp3';
        this.usingFallbackSynth = false;
        this.sfxGain = null;
        this.unlockBound = false;

        this.initBgm();
        this.setupAutoPlayUnlock();
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        if (this.ctx && !this.sfxGain) {
            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.setValueAtTime(this.soundEnabled ? this.sfxVolume : 0, this.ctx.currentTime);
            this.sfxGain.connect(this.ctx.destination);
        }
    }

    getSfxDestination() {
        this.init();
        if (this.sfxGain) return this.sfxGain;
        if (this.ctx) return this.ctx.destination;
        return null;
    }

    // Initialize the main HTML5 audio element for musikutama.mp3
    initBgm() {
        if (this.bgmAudio) return;

        try {
            this.bgmAudio = document.createElement('audio');
            this.bgmAudio.src = this.bgmSrc;
            this.bgmAudio.loop = true;
            this.bgmAudio.preload = 'auto';
            this.bgmAudio.volume = this.musicEnabled ? this.musicVolume : 0;

            this.bgmAudio.addEventListener('error', (e) => {
                console.warn('Unable to load musikutama.mp3 directly, falling back to procedural synth music:', e);
                this.usingFallbackSynth = true;
                if (this.musicEnabled && this.musicPlaying) {
                    this.startSynthMusic();
                }
            });
        } catch (err) {
            console.warn('Audio element initialization warning:', err);
            this.usingFallbackSynth = true;
        }
    }

    // Ensure music starts immediately when user first interacts with the page
    setupAutoPlayUnlock() {
        if (this.unlockBound) return;
        this.unlockBound = true;

        const unlockHandler = () => {
            this.init();
            if (this.musicEnabled && this.musicPlaying) {
                if (this.bgmAudio && !this.usingFallbackSynth) {
                    this.bgmAudio.volume = this.musicVolume;
                    const p = this.bgmAudio.play();
                    if (p !== undefined) {
                        p.then(() => {
                            this.removeUnlockListeners(unlockHandler);
                        }).catch(e => console.warn(e));
                    }
                }
            } else {
                this.removeUnlockListeners(unlockHandler);
            }
        };

        ['pointerdown', 'touchstart', 'keydown', 'click'].forEach(evt => {
            window.addEventListener(evt, unlockHandler, { passive: true, capture: true });
        });
        this._unlockHandler = unlockHandler;
    }

    removeUnlockListeners(handler) {
        ['pointerdown', 'touchstart', 'keydown', 'click'].forEach(evt => {
            window.removeEventListener(evt, handler, { capture: true });
        });
    }

    // Play Sword Slash Sound
    playSlash() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.14);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.14);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Play Hit / Squish Sound
    playHit() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.12);
    }

    // Critical Hit Punch Sound
    playCrit() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'square';
        osc1.frequency.setValueAtTime(320, now);
        osc1.frequency.exponentialRampToValueAtTime(60, now + 0.22);

        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(480, now);
        osc2.frequency.exponentialRampToValueAtTime(90, now + 0.22);

        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.getSfxDestination());

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.22);
        osc2.stop(now + 0.22);
    }

    // Coin Pick-up Chime
    playCoin() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.25);
    }

    // Buy / Equip Fanfare
    playPurchase() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.07;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + 0.15);
        });
    }

    // Level Up Fanfare
    playLevelUp() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.1;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + (idx === notes.length - 1 ? 0.4 : 0.15));

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + (idx === notes.length - 1 ? 0.4 : 0.15));
        });
    }

    // Quest Complete / Game Start Grand Fanfare Chime
    playQuestComplete() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C Major triumph
        chord.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.22, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + (idx === chord.length - 1 ? 0.6 : 0.25));

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + (idx === chord.length - 1 ? 0.6 : 0.25));
        });
    }

    // Educational Quiz Correct Answer Jingle (Bright Sparkle Fanfare)
    playQuizCorrect() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.24, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + (idx === notes.length - 1 ? 0.45 : 0.2));

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + (idx === notes.length - 1 ? 0.45 : 0.2));
        });
    }

    // Educational Quiz Incorrect Answer Blip (Soft gentle double thud)
    playQuizWrong() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const freqs = [220, 185]; // A3 down to F#3
        freqs.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.12;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + 0.15);
        });
    }

    // Dialogue text beep / voice blip
    playDialogueBlip() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(420 + Math.random() * 80, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.04);
    }

    // Footstep Sound (Grass thud / Stone click)
    playFootstep(isStone = false) {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        if (isStone) {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(140 + Math.random() * 30, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(80 + Math.random() * 20, now);
            osc.frequency.exponentialRampToValueAtTime(30, now + 0.06);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        }

        osc.connect(gain);
        gain.connect(this.getSfxDestination());
        osc.start(now);
        osc.stop(now + 0.06);
    }

    // Jump Whoosh / Hop Sound
    playJump() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.12);

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());
        osc.start(now);
        osc.stop(now + 0.14);
    }

    // Land Impact Thud
    playLand(isStone = false) {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = isStone ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(isStone ? 130 : 90, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.09);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());
        osc.start(now);
        osc.stop(now + 0.09);
    }

    // Realistic Water Splash Sound (entering river / jump breach)
    playWaterSplash() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // 1. Noise burst for water spray
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.22);
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(950, now);
        filter.frequency.exponentialRampToValueAtTime(450, now + 0.22);
        filter.Q.setValueAtTime(2.2, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.24, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.getSfxDestination());

        whiteNoise.start(now);
        whiteNoise.stop(now + 0.22);

        // 2. Tonal bloop / bubble pitch drop
        const bloop = this.ctx.createOscillator();
        const bloopGain = this.ctx.createGain();
        bloop.type = 'sine';
        bloop.frequency.setValueAtTime(480, now);
        bloop.frequency.exponentialRampToValueAtTime(140, now + 0.18);

        bloopGain.gain.setValueAtTime(0.15, now);
        bloopGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        bloop.connect(bloopGain);
        bloopGain.connect(this.getSfxDestination());

        bloop.start(now);
        bloop.stop(now + 0.18);
    }

    // Gentle Water Paddle / Swim Stroke
    playSwim() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(170, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.16);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);

        gain.gain.setValueAtTime(0.10, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.16);
    }

    // Heavy 3rd Combo Slam Impact
    playHeavySlam() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.35);
    }

    // Blacksmith Anvil Clink
    playAnvilClink() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1864, now); // Bb6 sharp metallic ding
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());
        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Dragon Fierce Roar Sound
    playDragonRoar() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 1.2);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.55, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 1.25);
    }

    // Torrential Dragon Fire Breath Sound
    playFireBreath() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.4);
        osc.frequency.exponentialRampToValueAtTime(60, now + 1.0);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.linearRampToValueAtTime(1100, now + 0.5);
        filter.frequency.linearRampToValueAtTime(300, now + 1.0);
        filter.Q.value = 3.0;

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.05);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 1.1);
    }

    // Meteor / Fireball Explosion Boom
    playFireExplosion() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.6);

        gain.gain.setValueAtTime(0.65, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.65);
    }

    // Bow Arrow Release Twang & Whoosh
    playBowShot() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.14);
    }

    // Magic Staff Arcane Cast Chime
    playMagicCast() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const freqs = [392, 587.33, 783.99, 1174.66]; // G4, D5, G5, D6 magic shimmer
        freqs.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.04;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.18);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + 0.22);
        });
    }

    // =========================================================================
    // MOUNT / HEWAN TUNGGANGAN SFX (Summon, Derap Kaki/Gallop, Kepakan Sayap, Roar)
    // =========================================================================
    playMountSummon() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        // Majestic brass & celestial chime flourish
        const notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51]; // G4, C5, E5, G5, C6, E6
        notes.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.055;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 0.35);

            gain.gain.setValueAtTime(0.24, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + (idx === notes.length - 1 ? 0.6 : 0.3));

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + (idx === notes.length - 1 ? 0.6 : 0.3));
        });
    }

    playMountGallop(isStone = false) {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        // Rhythmic double-clop (clo-clop) of hooves/heavy paws
        const times = [0, 0.09];
        times.forEach((offset, idx) => {
            const now = this.ctx.currentTime + offset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = isStone ? 'triangle' : 'sine';
            const baseFreq = isStone ? (idx === 0 ? 320 : 260) : (idx === 0 ? 160 : 130);
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, now + 0.07);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

            osc.connect(gain);
            gain.connect(this.getSfxDestination());

            osc.start(now);
            osc.stop(now + 0.08);
        });
    }

    playWingFlap() {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.22);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.getSfxDestination());

        osc.start(now);
        osc.stop(now + 0.25);
    }

    playMountRoar(type = 'horse') {
        if (!this.soundEnabled || this.sfxVolume <= 0) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        if (type === 'wolf') {
            // Howl
            osc.type = 'sine';
            osc.frequency.setValueAtTime(350, now);
            osc.frequency.linearRampToValueAtTime(580, now + 0.25);
            osc.frequency.exponentialRampToValueAtTime(260, now + 0.6);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
            osc.connect(gain);
            gain.connect(this.getSfxDestination());
            osc.start(now);
            osc.stop(now + 0.65);
        } else if (type === 'cat') {
            // Big cat growl
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.linearRampToValueAtTime(90, now + 0.35);
            gain.gain.setValueAtTime(0.22, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(gain);
            gain.connect(this.getSfxDestination());
            osc.start(now);
            osc.stop(now + 0.4);
        } else if (type === 'boar') {
            // Heavy grunt
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, now);
            osc.frequency.exponentialRampToValueAtTime(55, now + 0.25);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(this.getSfxDestination());
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'bird') {
            // Eagle screech
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.linearRampToValueAtTime(1450, now + 0.15);
            osc.frequency.exponentialRampToValueAtTime(650, now + 0.4);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
            osc.connect(gain);
            gain.connect(this.getSfxDestination());
            osc.start(now);
            osc.stop(now + 0.45);
        } else {
            // Horse whinny / neigh
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.linearRampToValueAtTime(820, now + 0.15);
            osc.frequency.linearRampToValueAtTime(640, now + 0.3);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
            osc.connect(gain);
            gain.connect(this.getSfxDestination());
            osc.start(now);
            osc.stop(now + 0.55);
        }
    }

    // Sound Effects Toggle
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        if (this.ctx && this.sfxGain) {
            this.sfxGain.gain.setValueAtTime(this.soundEnabled ? this.sfxVolume : 0, this.ctx.currentTime);
        }
        this.notifyAudioListeners();
        return this.soundEnabled;
    }

    // Music Toggle
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (this.musicEnabled) {
            this.startMusic();
            if (this.bgmAudio) {
                this.bgmAudio.volume = this.musicVolume;
            }
        } else {
            if (this.bgmAudio) {
                this.bgmAudio.volume = 0;
            }
            this.stopMusic();
        }
        this.notifyAudioListeners();
        return this.musicEnabled;
    }

    // Set Master Music Volume (0.0 to 1.0 or 0 to 100)
    setMusicVolume(volume) {
        let v = typeof volume === 'number' ? volume : parseFloat(volume);
        if (isNaN(v)) v = 0.6;
        if (v > 1.0) v = v / 100;
        v = Math.max(0, Math.min(1, v));
        this.musicVolume = v;

        if (this.bgmAudio) {
            this.bgmAudio.volume = this.musicEnabled ? this.musicVolume : 0;
        }

        // If user pulls slider > 0 while muted, unmute music automatically
        if (v > 0 && !this.musicEnabled) {
            this.musicEnabled = true;
            this.startMusic();
        } else if (v === 0 && this.musicEnabled) {
            if (this.bgmAudio) this.bgmAudio.volume = 0;
        }

        this.notifyAudioListeners();
        return this.musicVolume;
    }

    // Set Master SFX Volume (0.0 to 1.0 or 0 to 100)
    setSfxVolume(volume) {
        let v = typeof volume === 'number' ? volume : parseFloat(volume);
        if (isNaN(v)) v = 0.8;
        if (v > 1.0) v = v / 100;
        v = Math.max(0, Math.min(1, v));
        this.sfxVolume = v;

        if (this.ctx && this.sfxGain) {
            this.sfxGain.gain.setValueAtTime(this.soundEnabled ? this.sfxVolume : 0, this.ctx.currentTime);
        }

        if (v > 0 && !this.soundEnabled) {
            this.soundEnabled = true;
        }

        this.notifyAudioListeners();
        return this.sfxVolume;
    }

    getMusicVolume() {
        return this.musicVolume;
    }

    getSfxVolume() {
        return this.sfxVolume;
    }

    // Start playing background music (musikutama.mp3)
    startMusic() {
        this.musicPlaying = true;
        if (!this.musicEnabled) return;

        this.initBgm();

        if (this.bgmAudio && !this.usingFallbackSynth) {
            this.bgmAudio.volume = this.musicVolume;
            const playPromise = this.bgmAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.musicPlaying = true;
                }).catch((err) => {
                    // Browser Autoplay Policy: wait for first user gesture
                    console.log('BGM autoplay awaiting user interaction gesture.');
                    this.setupAutoPlayUnlock();
                });
            }
        } else {
            this.startSynthMusic();
        }
        this.notifyAudioListeners();
    }

    // Stop background music
    stopMusic() {
        this.musicPlaying = false;
        if (this.bgmAudio) {
            this.bgmAudio.pause();
        }
        this.stopSynthMusic();
        this.notifyAudioListeners();
    }

    // Procedural chiptune synth arpeggio fallback in case MP3 playback is unavailable
    startSynthMusic() {
        if (!this.musicEnabled || this.musicInterval) return;
        this.init();
        if (!this.ctx) return;

        const chords = [
            [261.63, 329.63, 392.00, 493.88], // C, E, G, B
            [220.00, 261.63, 329.63, 392.00], // A, C, E, G
            [174.61, 220.00, 261.63, 329.63], // F, A, C, E
            [196.00, 246.94, 293.66, 349.23]  // G, B, D, F
        ];

        let chordIdx = 0;
        let noteStep = 0;

        this.musicInterval = setInterval(() => {
            if (!this.musicEnabled || !this.ctx) return;
            const currentChord = chords[chordIdx];
            const freq = currentChord[noteStep % currentChord.length];

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq * 1.5, now);

            const synthVol = 0.04 * this.musicVolume;
            gain.gain.setValueAtTime(synthVol, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.28);

            noteStep++;
            if (noteStep % 4 === 0) {
                chordIdx = (chordIdx + 1) % chords.length;
            }
        }, 320);
    }

    stopSynthMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
    }

    // Keep all HUD, Pause Menu, and Start Screen audio UI elements in sync
    notifyAudioListeners() {
        const musicPct = Math.round(this.musicVolume * 100);
        const sfxPct = Math.round(this.sfxVolume * 100);
        const isMusicActive = this.musicEnabled && this.musicVolume > 0;
        const isSfxActive = this.soundEnabled && this.sfxVolume > 0;

        // 1. Pause Menu Sliders & Labels
        const pauseMusicSlider = document.getElementById('pause-music-slider');
        const pauseMusicVal = document.getElementById('pause-music-val');
        const pauseMusicIcon = document.getElementById('pause-music-icon-indicator');
        const pauseMusicText = document.getElementById('pause-music-text');
        const pauseMusicBtnIcon = document.getElementById('pause-music-icon');

        if (pauseMusicSlider) pauseMusicSlider.value = musicPct;
        if (pauseMusicVal) pauseMusicVal.textContent = isMusicActive ? `${musicPct}%` : 'MUTE';
        if (pauseMusicIcon) pauseMusicIcon.textContent = isMusicActive ? (musicPct > 50 ? '🔊' : '🔉') : '🔇';
        if (pauseMusicText) pauseMusicText.textContent = isMusicActive ? `Musik Utama: ON` : 'Musik Utama: OFF';
        if (pauseMusicBtnIcon) pauseMusicBtnIcon.textContent = isMusicActive ? '🎵' : '🔈';

        const pauseSoundSlider = document.getElementById('pause-sound-slider');
        const pauseSoundVal = document.getElementById('pause-sound-val');
        const pauseSoundIcon = document.getElementById('pause-sound-icon-indicator');
        const pauseSoundText = document.getElementById('pause-sound-text');
        const pauseSoundBtnIcon = document.getElementById('pause-sound-icon');

        if (pauseSoundSlider) pauseSoundSlider.value = sfxPct;
        if (pauseSoundVal) pauseSoundVal.textContent = isSfxActive ? `${sfxPct}%` : 'MUTE';
        if (pauseSoundIcon) pauseSoundIcon.textContent = isSfxActive ? (sfxPct > 50 ? '🔊' : '🔉') : '🔇';
        if (pauseSoundText) pauseSoundText.textContent = isSfxActive ? `Efek Suara: ON` : 'Efek Suara: OFF';
        if (pauseSoundBtnIcon) pauseSoundBtnIcon.textContent = isSfxActive ? '🔊' : '🔇';

        // 2. Start / Title Screen Controls
        const startMusicSlider = document.getElementById('start-music-slider');
        const startMusicVal = document.getElementById('start-music-val');
        const startMusicIcon = document.getElementById('start-music-icon');
        const startMusicText = document.getElementById('start-music-text');

        if (startMusicSlider) startMusicSlider.value = musicPct;
        if (startMusicVal) startMusicVal.textContent = isMusicActive ? `${musicPct}%` : 'MUTE';
        if (startMusicIcon) startMusicIcon.textContent = isMusicActive ? '🎵' : '🔈';
        if (startMusicText) startMusicText.textContent = isMusicActive ? `Musik: ${musicPct}%` : 'Musik: OFF';

        // 3. HUD Quick Buttons
        const hudMusicBtn = document.getElementById('music-btn');
        const hudSoundBtn = document.getElementById('sound-btn');

        if (hudMusicBtn) {
            hudMusicBtn.textContent = isMusicActive ? '🎵' : '🔈';
            hudMusicBtn.title = isMusicActive ? `Musik Utama: ${musicPct}% (Scroll untuk atur volume)` : 'Musik Utama: Nonaktif';
        }
        if (hudSoundBtn) {
            hudSoundBtn.textContent = isSfxActive ? '🔊' : '🔇';
            hudSoundBtn.title = isSfxActive ? `Efek Suara: ${sfxPct}% (Scroll untuk atur volume)` : 'Efek Suara: Nonaktif';
        }
    }
}

const Audio = new SoundManager();

// Automatically start music as soon as DOM is ready or first user gesture occurs
window.addEventListener('DOMContentLoaded', () => {
    try {
        Audio.initBgm();
        Audio.startMusic();
    } catch (e) {
        console.warn('Audio auto-start initialization:', e);
    }
});
