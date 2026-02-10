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

        // Only set answer if not already set (don't reset reveals)
        if (!this.currentAnswer) {
            this.setAnswer(puzzle.answer);
        }
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

        if (!this.currentAnswer) return;

        // Group letters by word to prevent mid-word line breaks
        const words = [];
        let currentWord = [];
        let letterIndex = 0;

        for (let i = 0; i < this.currentAnswer.length; i++) {
            const char = this.currentAnswer[i];

            if (char === ' ') {
                // End current word and start new one
                if (currentWord.length > 0) {
                    words.push(currentWord);
                    currentWord = [];
                }
            } else {
                // Add letter to current word
                const isRevealed = this.currentReveals[i];
                currentWord.push({
                    char: isRevealed ? char : '_',
                    isRevealed
                });
            }
        }

        // Don't forget the last word
        if (currentWord.length > 0) {
            words.push(currentWord);
        }

        // Render words with proper grouping
        hintDisplay.innerHTML = words.map(word => {
            const letters = word.map(l => {
                if (l.isRevealed) {
                    return `<span class="hint-letter">${l.char}</span>`;
                } else {
                    return '<span class="hint-blank">_</span>';
                }
            }).join('');
            return `<span class="hint-word">${letters}</span>`;
        }).join('<span class="hint-space"> </span>');
    },

    // ===== Use Hint (Main Method) =====

    useHint(puzzle, type = 'letter', free = false) {
        // If not a free hint, check and consume hint tokens
        if (!free) {
            if (!this.hasHints()) {
                this.showNoHintsMessage();
                return null;
            }

            if (!this.use()) {
                return null;
            }
        }

        if (type === 'letter') {
            // Initialize answer if not already set
            if (!this.currentAnswer && puzzle) {
                this.setAnswer(puzzle.answer);
            }

            const revealed = this.revealLetter();
            if (revealed) {
                // Show the hint display
                const hintDisplay = document.getElementById('hint-display');
                if (hintDisplay) {
                    hintDisplay.classList.add('visible');
                }
                this.updateHintDisplay();
                const freeText = free ? ' (free)' : '';
                this.showHintNotification(`Letter revealed: ${revealed.char}${freeText}`);
            } else {
                // All letters revealed
                this.showHintNotification(`All letters already revealed!`);
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
        background: linear-gradient(135deg, #ff6b9d, #ff5286);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(255, 107, 157, 0.4);
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

    .hint-word {
        display: inline-block;
        white-space: nowrap;
        margin: 4px 0;
    }

    .hint-space {
        display: inline-block;
        width: 20px;
    }

    .hint-letter {
        color: #06d6a0;
        font-weight: 700;
        letter-spacing: 2px;
    }

    .hint-blank {
        color: #ffffff;
        letter-spacing: 2px;
    }
`;
document.head.appendChild(hintStyles);

// Export for use
window.Hints = Hints;
