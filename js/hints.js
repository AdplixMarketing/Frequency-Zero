/**
 * Hint System for Frequency Zero
 * Manages hint tokens and letter reveals
 */

const Hints = {
    // ===== State =====
    currentReveals: [],
    currentAnswer: '',

    // ===== Core Methods =====

    init() {
        this.updateDisplay();
    },

    getCurrent() {
        return Storage.getHints();
    },

    // ===== Hint Operations =====

    use() {
        const current = this.getCurrent();
        if (current > 0) {
            Storage.setHints(current - 1);
            this.updateDisplay();
            return true;
        }
        return false;
    },

    add(amount) {
        const current = this.getCurrent();
        Storage.setHints(current + amount);
        this.updateDisplay();
        return this.getCurrent();
    },

    hasHints() {
        return this.getCurrent() > 0;
    },

    // ===== Letter Reveal System =====

    setAnswer(answer) {
        this.currentAnswer = answer.toUpperCase();
        this.currentReveals = new Array(answer.length).fill(false);
    },

    revealLetter() {
        if (!this.currentAnswer) return null;

        // Find unrevealed letter positions (prioritize consonants, then vowels)
        const unrevealed = [];
        const vowels = 'AEIOU';

        for (let i = 0; i < this.currentAnswer.length; i++) {
            if (!this.currentReveals[i] && this.currentAnswer[i] !== ' ') {
                unrevealed.push({
                    index: i,
                    char: this.currentAnswer[i],
                    isVowel: vowels.includes(this.currentAnswer[i])
                });
            }
        }

        if (unrevealed.length === 0) return null;

        // Prioritize consonants
        const consonants = unrevealed.filter(u => !u.isVowel);
        const toReveal = consonants.length > 0 ? consonants : unrevealed;

        // Pick random from available
        const chosen = toReveal[Math.floor(Math.random() * toReveal.length)];
        this.currentReveals[chosen.index] = true;

        return chosen;
    },

    getRevealedString() {
        if (!this.currentAnswer) return '';

        return this.currentAnswer.split('').map((char, i) => {
            if (char === ' ') return '  ';
            if (this.currentReveals[i]) return char;
            return '_';
        }).join(' ');
    },

    getRevealCount() {
        return this.currentReveals.filter(r => r).length;
    },

    reset() {
        this.currentReveals = [];
        this.currentAnswer = '';
    },

    // ===== Category Hint =====

    getCategoryHint(puzzle) {
        if (!puzzle || !puzzle.hints) return null;

        // Return a random hint that hasn't been used
        const unusedHints = puzzle.hints.filter((_, i) => !this.usedCategoryHints?.includes(i));

        if (unusedHints.length === 0) {
            // All hints used, return random
            return puzzle.hints[Math.floor(Math.random() * puzzle.hints.length)];
        }

        const randomIndex = Math.floor(Math.random() * unusedHints.length);
        this.usedCategoryHints = this.usedCategoryHints || [];
        this.usedCategoryHints.push(randomIndex);

        return unusedHints[randomIndex];
    },

    resetCategoryHints() {
        this.usedCategoryHints = [];
    },

    // ===== UI Updates =====

    updateDisplay() {
        const display = document.getElementById('hints-value');
        if (display) {
            const current = this.getCurrent();
            const oldValue = parseInt(display.textContent) || 0;

            display.textContent = current;

            // Animate if value changed
            if (current !== oldValue) {
                display.classList.add('animate-scale-in');
                setTimeout(() => {
                    display.classList.remove('animate-scale-in');
                }, 300);
            }
        }
    },

    showHintDisplay(puzzle) {
        const hintDisplay = document.getElementById('hint-display');
        if (!hintDisplay) return;

        this.setAnswer(puzzle.answer);
        hintDisplay.classList.add('visible');
        this.updateHintDisplay();
    },

    hideHintDisplay() {
        const hintDisplay = document.getElementById('hint-display');
        if (hintDisplay) {
            hintDisplay.classList.remove('visible');
        }
    },

    updateHintDisplay() {
        const hintDisplay = document.getElementById('hint-display');
        if (!hintDisplay) return;

        const revealed = this.getRevealedString();
        hintDisplay.innerHTML = revealed.split('').map(char => {
            if (char === '_') {
                return '<span class="hint-blank">_</span>';
            } else if (char === ' ') {
                return '<span class="hint-space"> </span>';
            } else {
                return `<span class="hint-letter animate-scale-in">${char}</span>`;
            }
        }).join('');
    },

    // ===== Use Hint (Main Method) =====

    useHint(puzzle, type = 'letter') {
        if (!this.hasHints()) {
            this.showNoHintsMessage();
            return null;
        }

        if (!this.use()) {
            return null;
        }

        if (type === 'letter') {
            const revealed = this.revealLetter();
            if (revealed) {
                this.updateHintDisplay();
                this.showHintNotification(`Letter revealed: ${revealed.char}`);
            }
            return revealed;
        } else if (type === 'category') {
            const hint = this.getCategoryHint(puzzle);
            if (hint) {
                this.showHintNotification(`Hint: ${hint}`);
            }
            return hint;
        }

        return null;
    },

    // ===== Notifications =====

    showNoHintsMessage() {
        const notification = document.createElement('div');
        notification.className = 'hint-notification no-hints animate-fade-in-up';
        notification.innerHTML = `<span class="hint-icon">💡</span> No hints left!`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    showHintNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'hint-notification animate-fade-in-up';
        notification.innerHTML = `<span class="hint-icon">💡</span> ${message}`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
};

// Add CSS for hint notifications
const hintStyles = document.createElement('style');
hintStyles.textContent = `
    .hint-notification {
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #e94560, #d63850);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(233, 69, 96, 0.4);
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .hint-notification .hint-icon {
        font-size: 1.25rem;
    }

    .hint-notification.no-hints {
        background: linear-gradient(135deg, #666, #444);
    }

    .hint-notification.fade-out {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
    }

    .hint-space {
        width: 16px;
        display: inline-block;
    }

    .hint-letter {
        color: #4ecca3;
        font-weight: 700;
    }

    .hint-blank {
        color: #666;
    }
`;
document.head.appendChild(hintStyles);

// Export for use
window.Hints = Hints;
