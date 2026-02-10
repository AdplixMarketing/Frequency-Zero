/**
 * Sound Effects for Decodji
 * Uses Web Audio API to generate sounds (no external files needed)
 */

const Sounds = {
    audioContext: null,
    enabled: true,

    // ===== Initialization =====

    init() {
        // Load preference from storage
        this.enabled = Storage.get('sounds_enabled', true);

        // Create audio context on first user interaction
        document.addEventListener('click', () => this.ensureContext(), { once: true });
        document.addEventListener('keydown', () => this.ensureContext(), { once: true });
    },

    ensureContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        // Resume if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    },

    toggle() {
        this.enabled = !this.enabled;
        Storage.set('sounds_enabled', this.enabled);
        return this.enabled;
    },

    // ===== Sound Effects =====

    // Correct answer - BIG celebratory fanfare!
    playCorrect() {
        if (!this.enabled) return;
        this.ensureContext();

        const ctx = this.audioContext;
        if (!ctx) return;

        const now = ctx.currentTime;

        // First chord - C major (loud)
        const chord1 = [261.63, 329.63, 392]; // C4, E4, G4
        chord1.forEach((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        });

        // Second chord - higher (triumph!)
        const chord2 = [329.63, 415.3, 523.25]; // E4, G#4, C5
        chord2.forEach((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + 0.15);
            gain.gain.setValueAtTime(0, now);
            gain.gain.setValueAtTime(0.12, now + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + 0.15);
            osc.stop(now + 0.45);
        });

        // Third chord - even higher (victory!)
        const chord3 = [523.25, 659.25, 783.99]; // C5, E5, G5
        chord3.forEach((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + 0.3);
            gain.gain.setValueAtTime(0, now);
            gain.gain.setValueAtTime(0.1, now + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + 0.3);
            osc.stop(now + 0.7);
        });

        // Final high ding - the cherry on top!
        const ding = ctx.createOscillator();
        const dingGain = ctx.createGain();
        ding.type = 'sine';
        ding.frequency.setValueAtTime(1318.5, now + 0.45); // E6
        dingGain.gain.setValueAtTime(0, now);
        dingGain.gain.setValueAtTime(0.25, now + 0.45);
        dingGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
        ding.connect(dingGain);
        dingGain.connect(ctx.destination);
        ding.start(now + 0.45);
        ding.stop(now + 1.0);

        // Extra sparkle dings
        [1046.5, 1568, 2093].forEach((freq, i) => {
            const sparkle = ctx.createOscillator();
            const sparkleGain = ctx.createGain();
            sparkle.type = 'sine';
            sparkle.frequency.setValueAtTime(freq, now + 0.5 + i * 0.1);
            sparkleGain.gain.setValueAtTime(0, now);
            sparkleGain.gain.setValueAtTime(0.15, now + 0.5 + i * 0.1);
            sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8 + i * 0.1);
            sparkle.connect(sparkleGain);
            sparkleGain.connect(ctx.destination);
            sparkle.start(now + 0.5 + i * 0.1);
            sparkle.stop(now + 0.9 + i * 0.1);
        });
    },

    // Wrong answer - low buzz/error sound
    playWrong() {
        if (!this.enabled) return;
        this.ensureContext();

        const ctx = this.audioContext;
        if (!ctx) return;

        const now = ctx.currentTime;

        // Create a "buzz" sound
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'square';
        osc1.frequency.setValueAtTime(150, now);

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(155, now); // Slight detune for buzzy effect

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.3);
        osc2.stop(now + 0.3);
    },

    // Hint used - soft "pop" sound
    playHint() {
        if (!this.enabled) return;
        this.ensureContext();

        const ctx = this.audioContext;
        if (!ctx) return;

        const now = ctx.currentTime;

        // Pop sound - quick frequency drop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    },

    // Skip puzzle - descending tone
    playSkip() {
        if (!this.enabled) return;
        this.ensureContext();

        const ctx = this.audioContext;
        if (!ctx) return;

        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
    },

    // Button click - subtle tap
    playClick() {
        if (!this.enabled) return;
        this.ensureContext();

        const ctx = this.audioContext;
        if (!ctx) return;

        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    },

    // Streak bonus - triumphant fanfare
    playStreak() {
        if (!this.enabled) return;
        this.ensureContext();

        const ctx = this.audioContext;
        if (!ctx) return;

        const now = ctx.currentTime;

        // Three ascending notes
        const notes = [392, 523.25, 659.25]; // G4, C5, E5

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0, now + i * 0.15);
            gain.gain.linearRampToValueAtTime(0.2, now + i * 0.15 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + i * 0.15);
            osc.stop(now + i * 0.15 + 0.35);
        });
    },

    // Reward claimed - coin/bell sound
    playReward() {
        if (!this.enabled) return;
        this.ensureContext();

        const ctx = this.audioContext;
        if (!ctx) return;

        const now = ctx.currentTime;

        // Bell-like sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // A5

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);

        // Add overtone
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1760, now); // A6

        gain2.gain.setValueAtTime(0.1, now);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc2.start(now);
        osc2.stop(now + 0.3);
    }
};

// Export for use
window.Sounds = Sounds;
