/**
 * Core Game Logic for Frequency Zero
 * Handles gameplay, answer checking, and puzzle flow
 */

const Game = {
    // ===== State =====
    currentPuzzle: null,
    currentMode: 'daily', // 'daily' or 'practice'
    selectedCategory: 'all', // 'all' or specific category
    isPlaying: false,
    startTime: null,
    timerInterval: null,
    hintsUsedThisPuzzle: 0,
    elapsedSeconds: 0,

    // ===== Initialization =====

    init() {
        this.setupEventListeners();
        this.loadPuzzle();
    },

    setupEventListeners() {
        // Answer input
        const input = document.getElementById('answer-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswer();
                }
            });

            input.addEventListener('input', () => {
                // Remove error styling on new input
                input.classList.remove('incorrect');
            });
        }

        // Submit button
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.checkAnswer());
        }

        // Hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.useHint());
        }

        // Skip button
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skipPuzzle());
        }

        // Share button
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.sharePuzzle());
        }

        // Mode buttons
        const modeBtns = document.querySelectorAll('.mode-btn');
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.setMode(btn.dataset.mode);
            });
        });

        // Category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedCategory = btn.dataset.category;
                // Load new puzzle with selected category
                if (this.currentMode === 'practice') {
                    this.loadPuzzle();
                }
            });
        });

        // Result modal buttons
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPuzzle());
        }

        const shareResultBtn = document.getElementById('share-result-btn');
        if (shareResultBtn) {
            shareResultBtn.addEventListener('click', () => {
                Share.shareResult(
                    this.currentPuzzle,
                    this.lastResult?.solved || false,
                    this.lastResult?.score || 0,
                    this.hintsUsedThisPuzzle,
                    this.elapsedSeconds
                );
            });
        }

        // Daily complete modal
        const shareDailyBtn = document.getElementById('share-daily-btn');
        if (shareDailyBtn) {
            shareDailyBtn.addEventListener('click', () => Share.shareDaily());
        }

        const practiceBtn = document.getElementById('practice-btn');
        if (practiceBtn) {
            practiceBtn.addEventListener('click', () => {
                Daily.hideCompletionModal();
                this.setMode('practice');
            });
        }
    },

    // ===== Mode Management =====

    setMode(mode) {
        this.currentMode = mode;

        const dailyProgress = document.getElementById('daily-progress');
        if (dailyProgress) {
            dailyProgress.style.display = mode === 'daily' ? 'block' : 'none';
        }

        // Show/hide category selector
        const categorySelector = document.getElementById('category-selector');
        if (categorySelector) {
            categorySelector.style.display = mode === 'practice' ? 'block' : 'none';
        }

        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Load appropriate puzzle
        this.loadPuzzle();
    },

    // ===== Puzzle Loading =====

    loadPuzzle() {
        this.stopTimer();
        this.hintsUsedThisPuzzle = 0;
        this.elapsedSeconds = 0;
        Hints.reset();
        Hints.hideHintDisplay();

        if (this.currentMode === 'daily') {
            this.loadDailyPuzzle();
        } else {
            this.loadPracticePuzzle();
        }
    },

    loadDailyPuzzle() {
        const puzzle = Daily.getCurrentPuzzle();

        if (!puzzle) {
            // All daily puzzles completed
            Daily.showCompletionModal();
            return;
        }

        this.currentPuzzle = puzzle;
        this.displayPuzzle(puzzle);
        Daily.updateProgressUI();
        this.startTimer();
        this.isPlaying = true;
    },

    loadPracticePuzzle() {
        // Check energy
        if (!Energy.canPlayPractice()) {
            Energy.showBonusEnergyModal();
            return;
        }

        // Use energy
        Energy.playPractice();

        // Get random puzzle from selected category (excluding recently solved)
        const solved = Storage.getSolvedPuzzles();
        let puzzle = getRandomPuzzleByCategory(this.selectedCategory, solved.slice(-50));

        if (!puzzle) {
            // All puzzles in category played, reset exclusions
            puzzle = getRandomPuzzleByCategory(this.selectedCategory, []);
        }

        if (!puzzle) {
            // Fallback to any puzzle
            puzzle = getRandomPuzzle([]);
        }

        this.currentPuzzle = puzzle;
        this.displayPuzzle(this.currentPuzzle);
        this.startTimer();
        this.isPlaying = true;
    },

    displayPuzzle(puzzle) {
        // Display emojis
        const emojiDisplay = document.getElementById('emoji-display');
        if (emojiDisplay) {
            emojiDisplay.innerHTML = puzzle.emojis.map((emoji, i) =>
                `<span class="emoji" style="animation-delay: ${0.1 + i * 0.1}s">${emoji}</span>`
            ).join('');
        }

        // Display category
        const categoryIcon = document.querySelector('.category-icon');
        const categoryName = document.getElementById('category-name');
        if (categoryIcon && categoryName) {
            categoryIcon.textContent = CATEGORY_ICONS[puzzle.category] || '❓';
            categoryName.textContent = CATEGORY_NAMES[puzzle.category] || 'Unknown';
        }

        // Clear input
        const input = document.getElementById('answer-input');
        if (input) {
            input.value = '';
            input.classList.remove('correct', 'incorrect');
            input.focus();
        }

        // Enable buttons
        this.setButtonsEnabled(true);
    },

    // ===== Timer =====

    startTimer() {
        this.startTime = Date.now();
        this.elapsedSeconds = 0;

        const timerValue = document.getElementById('timer-value');
        if (timerValue) {
            timerValue.textContent = '0:00';
        }

        this.timerInterval = setInterval(() => {
            this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            if (timerValue) {
                const mins = Math.floor(this.elapsedSeconds / 60);
                const secs = this.elapsedSeconds % 60;
                timerValue.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    // ===== Answer Checking =====

    checkAnswer() {
        if (!this.isPlaying || !this.currentPuzzle) return;

        const input = document.getElementById('answer-input');
        if (!input) return;

        const userAnswer = input.value.trim();
        if (!userAnswer) return;

        // Hide welcome hook after first interaction
        const hook = document.getElementById('welcome-hook');
        if (hook) hook.style.display = 'none';

        const isCorrect = this.fuzzyMatch(userAnswer, this.currentPuzzle.answer);

        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer(input);
        }
    },

    fuzzyMatch(userAnswer, correctAnswer) {
        // Normalize both strings
        const normalize = (str) => {
            return str
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') // Remove special chars
                .replace(/\s+/g, ' ')         // Normalize spaces
                .replace(/^(the|a|an)\s+/i, '') // Remove articles
                .trim();
        };

        const user = normalize(userAnswer);
        const correct = normalize(correctAnswer);

        // Exact match
        if (user === correct) return true;

        // Check if user answer contains correct answer or vice versa
        if (user.includes(correct) || correct.includes(user)) {
            // Only if at least 80% of length
            const ratio = Math.min(user.length, correct.length) / Math.max(user.length, correct.length);
            if (ratio >= 0.8) return true;
        }

        // Levenshtein distance for typo tolerance
        const distance = this.levenshteinDistance(user, correct);
        const maxLength = Math.max(user.length, correct.length);
        const similarity = 1 - (distance / maxLength);

        // Allow up to 2 character mistakes for longer answers
        if (correct.length > 5 && distance <= 2) return true;

        // 85% similarity threshold
        return similarity >= 0.85;
    },

    levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    },

    // ===== Answer Handling =====

    handleCorrectAnswer() {
        this.stopTimer();
        this.isPlaying = false;

        // Play correct sound
        Sounds.playCorrect();

        const input = document.getElementById('answer-input');
        if (input) {
            input.classList.add('correct');
        }

        // Calculate score
        const scoreData = Leaderboard.calculateScore(
            this.elapsedSeconds,
            this.hintsUsedThisPuzzle,
            this.currentPuzzle.difficulty
        );

        // Record stats
        Storage.recordPuzzle(
            this.currentPuzzle,
            true,
            scoreData.total,
            this.elapsedSeconds,
            this.hintsUsedThisPuzzle
        );

        Storage.markPuzzleSolved(this.currentPuzzle.id);

        // Update leaderboard (weekly/monthly only count daily challenge scores)
        const isDailyChallenge = this.currentMode === 'daily';
        Leaderboard.addScore(scoreData.total, isDailyChallenge);

        // Record daily progress if in daily mode
        if (this.currentMode === 'daily') {
            const dailyIndex = Daily.getCurrentPuzzleIndex();
            Daily.recordResult(dailyIndex, true, this.hintsUsedThisPuzzle, this.elapsedSeconds, scoreData.total);
        }

        // Update score display
        this.updateScoreDisplay();

        // Store result for sharing
        this.lastResult = {
            solved: true,
            score: scoreData.total
        };

        // Show result modal
        this.showResultModal(true, scoreData);

        // Create confetti
        Rewards.createConfetti();
    },

    handleWrongAnswer(input) {
        // Play wrong sound
        Sounds.playWrong();

        input.classList.add('incorrect');

        // Shake animation
        input.classList.add('animate-shake');
        setTimeout(() => {
            input.classList.remove('animate-shake');
        }, 500);

        // Don't clear input - let user try again
    },

    // ===== Skip Puzzle =====

    skipPuzzle() {
        if (!this.isPlaying || !this.currentPuzzle) return;

        // Play skip sound
        Sounds.playSkip();

        this.stopTimer();
        this.isPlaying = false;

        // Record as failed
        Storage.recordPuzzle(
            this.currentPuzzle,
            false,
            0,
            this.elapsedSeconds,
            this.hintsUsedThisPuzzle
        );

        // Record daily progress if in daily mode
        if (this.currentMode === 'daily') {
            const dailyIndex = Daily.getCurrentPuzzleIndex();
            Daily.recordResult(dailyIndex, false, this.hintsUsedThisPuzzle, this.elapsedSeconds, 0);
        }

        // Store result
        this.lastResult = {
            solved: false,
            score: 0
        };

        // Show result modal
        this.showResultModal(false, { total: 0 });
    },

    // ===== Hints =====

    useHint() {
        if (!this.isPlaying || !this.currentPuzzle) return;

        // Practice mode has unlimited hints
        const freeHint = this.currentMode === 'practice';

        const result = Hints.useHint(this.currentPuzzle, 'letter', freeHint);
        if (result) {
            // Play hint sound
            Sounds.playHint();
            this.hintsUsedThisPuzzle++;
        }
    },

    // ===== Share =====

    sharePuzzle() {
        if (!this.currentPuzzle) return;

        Share.shareChallengeLink(this.currentPuzzle);
    },

    // ===== Result Modal =====

    showResultModal(correct, scoreData) {
        const modal = document.getElementById('result-modal');
        if (!modal) return;

        // Update icon
        const icon = document.getElementById('result-icon');
        if (icon) {
            icon.textContent = correct ? '✅' : '❌';
            icon.className = correct ? 'result-icon animate-scale-in' : 'result-icon';
        }

        // Update title
        const title = document.getElementById('result-title');
        if (title) {
            title.textContent = correct ? 'Correct!' : 'Not quite!';
        }

        // Update answer reveal
        const answerReveal = document.getElementById('answer-reveal');
        if (answerReveal) {
            answerReveal.textContent = this.currentPuzzle.answer;
        }

        // Update score breakdown
        const breakdownEl = document.getElementById('score-breakdown');
        if (breakdownEl) {
            if (correct) {
                let rows = [];

                // Base points
                rows.push(`<div class="score-row"><span>Base Points</span><span>+${scoreData.base}</span></div>`);

                // Time bonus (only if earned)
                if (scoreData.timeBonus > 0) {
                    rows.push(`<div class="score-row"><span>${scoreData.timeLabel}</span><span class="bonus">+${scoreData.timeBonus}</span></div>`);
                }

                // Hints: either bonus or penalty
                if (scoreData.noHintBonus > 0) {
                    rows.push(`<div class="score-row"><span>No-Hint Bonus</span><span class="bonus">+${scoreData.noHintBonus}</span></div>`);
                } else if (scoreData.hintPenalty > 0) {
                    rows.push(`<div class="score-row"><span>Hint Penalty (${scoreData.hintsUsed} used)</span><span class="penalty">-${scoreData.hintPenalty}</span></div>`);
                }

                // Subtotal if multipliers apply
                if (scoreData.totalMultiplier > 1) {
                    rows.push(`<div class="score-row subtotal"><span>Subtotal</span><span>${scoreData.subtotal}</span></div>`);

                    // Difficulty multiplier (only if not easy)
                    if (scoreData.difficultyMultiplier > 1) {
                        rows.push(`<div class="score-row"><span>${scoreData.difficultyLabel}</span><span class="multiplier">×${scoreData.difficultyMultiplier}</span></div>`);
                    }

                    // Streak multiplier (only if > 1)
                    if (scoreData.streakMultiplier > 1) {
                        rows.push(`<div class="score-row"><span>Streak Bonus</span><span class="multiplier">×${scoreData.streakMultiplier.toFixed(1)}</span></div>`);
                    }

                    // Reward multiplier (only if active)
                    if (scoreData.rewardMultiplier > 1) {
                        rows.push(`<div class="score-row"><span>Score Boost Active</span><span class="multiplier">×${scoreData.rewardMultiplier}</span></div>`);
                    }
                }

                // Total
                rows.push(`<div class="score-row total"><span>Total</span><span>+${scoreData.total}</span></div>`);

                breakdownEl.innerHTML = rows.join('');
            } else {
                breakdownEl.innerHTML = `
                    <div class="score-row"><span>Base Points</span><span>0</span></div>
                    <div class="score-row total"><span>Total</span><span>0</span></div>
                `;
            }
        }

        // Update next button text
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            if (this.currentMode === 'daily') {
                const nextIndex = Daily.getCurrentPuzzleIndex();
                if (nextIndex === -1) {
                    nextBtn.textContent = 'See Results →';
                } else {
                    nextBtn.textContent = 'Next Puzzle →';
                }
            } else {
                nextBtn.textContent = 'Next Puzzle →';
            }
        }

        modal.classList.add('active');
    },

    hideResultModal() {
        const modal = document.getElementById('result-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    // ===== Next Puzzle =====

    nextPuzzle() {
        this.hideResultModal();

        // Check if daily is complete
        if (this.currentMode === 'daily' && Daily.isCompleted()) {
            Daily.showCompletionModal();
            return;
        }

        this.loadPuzzle();
    },

    // ===== UI Helpers =====

    setButtonsEnabled(enabled) {
        const hintBtn = document.getElementById('hint-btn');
        const skipBtn = document.getElementById('skip-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (hintBtn) hintBtn.disabled = !enabled;
        if (skipBtn) skipBtn.disabled = !enabled;
        if (submitBtn) submitBtn.disabled = !enabled;
    },

    updateScoreDisplay() {
        const stats = Storage.getStats();

        const currentScore = document.getElementById('current-score');
        if (currentScore) {
            currentScore.textContent = stats.totalScore;
        }

        const dailySolved = document.getElementById('daily-solved');
        if (dailySolved && this.currentMode === 'daily') {
            const progress = Daily.getProgress();
            const solved = progress.puzzles.filter(p => p === true).length;
            dailySolved.textContent = `${solved}/3`;
        }
    }
};

// Export for use
window.Game = Game;
