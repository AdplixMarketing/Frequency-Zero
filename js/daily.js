/**
 * Daily Challenge System for Frequency Zero
 * Deterministic daily puzzle selection
 */

const Daily = {
    START_DATE: new Date('2024-01-01'),
    TIMEZONE: 'America/Chicago', // Central Time

    // ===== Core Methods =====

    // Get current date in Chicago timezone
    getChicagoDate() {
        return new Date(new Date().toLocaleString('en-US', { timeZone: this.TIMEZONE }));
    },

    // Get date string in Chicago timezone (YYYY-MM-DD)
    getChicagoDateString() {
        const date = this.getChicagoDate();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    getDayIndex() {
        const today = this.getChicagoDate();
        today.setHours(0, 0, 0, 0);
        const start = new Date(this.START_DATE);
        start.setHours(0, 0, 0, 0);

        return Math.floor((today - start) / (24 * 60 * 60 * 1000));
    },

    // ===== Seeded Random =====

    // Simple seeded random number generator
    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    },

    shuffleWithSeed(array, seed) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(this.seededRandom(seed + i) * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // ===== Daily Puzzle Selection =====

    getDailyPuzzles() {
        const dayIndex = this.getDayIndex();

        // Get puzzles from each difficulty
        const easyPuzzles = this.getAllPuzzlesByDifficulty('easy');
        const mediumPuzzles = this.getAllPuzzlesByDifficulty('medium');
        const hardPuzzles = this.getAllPuzzlesByDifficulty('hard');

        // Use day index as seed for consistent daily puzzles
        const easyShuffled = this.shuffleWithSeed(easyPuzzles, dayIndex);
        const mediumShuffled = this.shuffleWithSeed(mediumPuzzles, dayIndex + 1000);
        const hardShuffled = this.shuffleWithSeed(hardPuzzles, dayIndex + 2000);

        // Select puzzles based on day index (cycling through all puzzles)
        const easy = easyShuffled[dayIndex % easyShuffled.length];
        const medium = mediumShuffled[dayIndex % mediumShuffled.length];
        const hard = hardShuffled[dayIndex % hardShuffled.length];

        return [
            { ...easy, difficulty: 'easy', dailyIndex: 0 },
            { ...medium, difficulty: 'medium', dailyIndex: 1 },
            { ...hard, difficulty: 'hard', dailyIndex: 2 }
        ];
    },

    getAllPuzzlesByDifficulty(difficulty) {
        const puzzles = [];
        for (const category in PUZZLES) {
            if (PUZZLES[category][difficulty]) {
                PUZZLES[category][difficulty].forEach(puzzle => {
                    puzzles.push({
                        ...puzzle,
                        category
                    });
                });
            }
        }
        return puzzles;
    },

    // ===== Progress Tracking =====

    getProgress() {
        return Storage.getDailyProgress();
    },

    getCurrentPuzzleIndex() {
        const progress = this.getProgress();
        // Find first unsolved puzzle
        for (let i = 0; i < 3; i++) {
            if (progress.puzzles[i] === null) {
                return i;
            }
        }
        return -1; // All completed
    },

    getCurrentPuzzle() {
        const index = this.getCurrentPuzzleIndex();
        if (index === -1) return null;

        const puzzles = this.getDailyPuzzles();
        return puzzles[index];
    },

    isCompleted() {
        const progress = this.getProgress();
        return progress.completed;
    },

    recordResult(index, solved, hintsUsed, time, score) {
        const result = {
            solved,
            hintsUsed,
            time,
            score
        };

        Storage.recordDailyPuzzle(index, result);

        // Check if daily is now complete
        if (index === 2) {
            this.onDailyComplete();
        }

        return this.getProgress();
    },

    // ===== Daily Completion =====

    onDailyComplete() {
        // Increment streak
        Storage.incrementStreak();

        // Calculate total score
        const progress = this.getProgress();
        const totalScore = progress.scores.reduce((sum, s) => sum + s, 0);

        // Add to leaderboard
        Storage.addLeaderboardScore(totalScore, 'daily');

        // Show completion modal
        this.showCompletionModal();
    },

    showCompletionModal() {
        const modal = document.getElementById('daily-complete-modal');
        if (!modal) return;

        const progress = this.getProgress();
        const streak = Storage.getStreak();
        const totalScore = progress.scores.reduce((sum, s) => sum + s, 0);

        // Build puzzle summary
        const summaryContainer = document.getElementById('summary-puzzles');
        if (summaryContainer) {
            summaryContainer.innerHTML = progress.puzzles.map((solved, i) => {
                const stars = this.getStars(progress.hintsUsed[i], solved);
                const difficulty = ['Easy', 'Medium', 'Hard'][i];
                return `
                    <div class="summary-puzzle">
                        <span>${difficulty}</span>
                        <span class="summary-puzzle-stars">${stars}</span>
                    </div>
                `;
            }).join('');
        }

        // Update totals
        const scoreEl = document.getElementById('summary-score');
        if (scoreEl) scoreEl.textContent = totalScore;

        const streakEl = document.getElementById('summary-streak');
        if (streakEl) streakEl.textContent = `🔥${streak.current}`;

        // Generate share text
        const shareText = this.generateShareText();
        const shareTextEl = document.getElementById('share-text');
        if (shareTextEl) shareTextEl.textContent = shareText;

        modal.classList.add('active');
    },

    hideCompletionModal() {
        const modal = document.getElementById('daily-complete-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    // ===== Stars Calculation =====

    getStars(hintsUsed, solved) {
        if (!solved) return '❌';
        if (hintsUsed === 0) return '⭐⭐⭐';
        if (hintsUsed === 1) return '⭐⭐';
        return '⭐';
    },

    // ===== Share Text =====

    generateShareText() {
        const progress = this.getProgress();
        const streak = Storage.getStreak();
        const dayIndex = this.getDayIndex();
        const totalScore = progress.scores.reduce((sum, s) => sum + s, 0);

        let text = `🎯 Decodji - Day ${dayIndex + 1}\n\n`;

        progress.puzzles.forEach((solved, i) => {
            const difficulty = ['Easy', 'Medium', 'Hard'][i];
            const stars = this.getStars(progress.hintsUsed[i], solved);
            const hintText = progress.hintsUsed[i] === 0 ? '(no hints!)' :
                           progress.hintsUsed[i] === 1 ? '(1 hint)' :
                           `(${progress.hintsUsed[i]} hints)`;
            text += `${difficulty}: ${stars} ${solved ? hintText : ''}\n`;
        });

        text += `\nScore: ${totalScore} | Streak: 🔥${streak.current}\n`;
        text += `\nPlay at: ${window.location.origin}`;

        return text;
    },

    // ===== Time Until Reset =====

    getTimeUntilReset() {
        // Get current Chicago time
        const chicagoNow = this.getChicagoDate();

        // Calculate midnight tonight in Chicago
        const chicagoMidnight = new Date(chicagoNow);
        chicagoMidnight.setDate(chicagoMidnight.getDate() + 1);
        chicagoMidnight.setHours(0, 0, 0, 0);

        // Calculate difference
        return chicagoMidnight - chicagoNow;
    },

    formatTimeRemaining(ms) {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    // ===== UI Updates =====

    updateProgressUI() {
        const progress = this.getProgress();
        const dots = document.querySelectorAll('.progress-dot');

        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'completed', 'skipped');

            if (progress.puzzles[i] === true) {
                dot.classList.add('completed');
            } else if (progress.puzzles[i] === false) {
                dot.classList.add('skipped');
            } else if (i === this.getCurrentPuzzleIndex()) {
                dot.classList.add('active');
            }
        });

        const progressText = document.getElementById('progress-text');
        if (progressText) {
            const currentIndex = this.getCurrentPuzzleIndex();
            if (currentIndex === -1) {
                progressText.textContent = 'All Complete!';
            } else {
                progressText.textContent = `Puzzle ${currentIndex + 1} of 3`;
            }
        }

        const dailySolved = document.getElementById('daily-solved');
        if (dailySolved) {
            const solved = progress.puzzles.filter(p => p === true).length;
            dailySolved.textContent = `${solved}/3`;
        }
    }
};

// Export for use
window.Daily = Daily;
