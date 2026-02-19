/**
 * LocalStorage Wrapper for Frequency Zero
 * Handles all persistent data storage
 */

const Storage = {
    PREFIX: 'fz_',

    // ===== Core Methods =====

    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.PREFIX + key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(this.PREFIX + key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    },

    // ===== Player Profile =====

    getProfile() {
        return this.get('profile', {
            name: 'Player',
            createdAt: Date.now(),
            lastActive: Date.now()
        });
    },

    setProfile(profile) {
        return this.set('profile', {
            ...this.getProfile(),
            ...profile,
            lastActive: Date.now()
        });
    },

    // ===== Energy System =====

    getEnergy() {
        const data = this.get('energy', {
            current: 10,
            max: 10,
            lastRefill: Date.now()
        });

        // Check for daily refill
        const now = new Date();
        const lastRefill = new Date(data.lastRefill);

        // Refill at midnight UTC
        if (this.isNewDay(lastRefill, now)) {
            data.current = data.max;
            data.lastRefill = now.getTime();
            this.set('energy', data);
        }

        return data;
    },

    setEnergy(amount) {
        const data = this.getEnergy();
        data.current = Math.max(0, Math.min(amount, data.max + 10)); // Allow up to 10 bonus
        this.set('energy', data);
        return data.current;
    },

    addEnergy(amount) {
        const data = this.getEnergy();
        return this.setEnergy(data.current + amount);
    },

    useEnergy(amount = 1) {
        const data = this.getEnergy();
        if (data.current >= amount) {
            this.setEnergy(data.current - amount);
            return true;
        }
        return false;
    },

    // ===== Hints System =====

    getHints() {
        const data = this.get('hints_data', {
            current: 5,
            lastRefill: Date.now()
        });

        // Check for daily refill
        const now = new Date();
        const lastRefill = new Date(data.lastRefill);

        if (this.isNewDay(lastRefill, now)) {
            data.current = 5;
            data.lastRefill = now.getTime();
            this.set('hints_data', data);
        }

        return data.current;
    },

    setHints(amount) {
        const data = this.get('hints_data', {
            current: 5,
            lastRefill: Date.now()
        });
        data.current = Math.max(0, amount);
        this.set('hints_data', data);
        return data.current;
    },

    addHints(amount) {
        return this.setHints(this.getHints() + amount);
    },

    useHint() {
        const hints = this.getHints();
        if (hints > 0) {
            this.setHints(hints - 1);
            return true;
        }
        return false;
    },

    // ===== Streak System =====

    getStreak() {
        const data = this.get('streak', {
            current: 0,
            best: 0,
            lastCompletedDate: null
        });

        // Check if streak should reset
        if (data.lastCompletedDate) {
            const lastDate = new Date(data.lastCompletedDate);
            const today = new Date();
            const daysDiff = this.getDaysDifference(lastDate, today);

            if (daysDiff > 1) {
                // Streak broken - missed a day
                data.current = 0;
                this.set('streak', data);
            }
        }

        return data;
    },

    incrementStreak() {
        const data = this.getStreak();
        const today = this.getDateString(new Date());

        // Don't increment if already completed today
        if (data.lastCompletedDate === today) {
            return data;
        }

        data.current++;
        data.best = Math.max(data.best, data.current);
        data.lastCompletedDate = today;
        this.set('streak', data);

        return data;
    },

    // ===== Daily Progress =====

    // Get current date string in Chicago timezone
    getChicagoDateString() {
        const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    getDailyProgress() {
        const today = this.getChicagoDateString();
        const storageKey = 'daily_' + today;
        const existingData = this.get(storageKey, null);

        console.log('📅 Chicago date:', today);
        console.log('📦 Storage key:', storageKey);
        console.log('📊 Existing data:', existingData);

        // If no data exists for today, create fresh progress
        if (!existingData) {
            console.log('✨ Creating fresh daily progress for new day');
            const freshData = {
                date: today,
                puzzles: [null, null, null],
                hintsUsed: [0, 0, 0],
                times: [null, null, null],
                scores: [0, 0, 0],
                completed: false,
                currentIndex: 0
            };
            this.set(storageKey, freshData);
            return freshData;
        }

        return existingData;
    },

    setDailyProgress(progress) {
        const today = this.getChicagoDateString();
        return this.set('daily_' + today, progress);
    },

    recordDailyPuzzle(index, result) {
        const progress = this.getDailyProgress();
        progress.puzzles[index] = result.solved;
        progress.hintsUsed[index] = result.hintsUsed;
        progress.times[index] = result.time;
        progress.scores[index] = result.score;
        progress.currentIndex = Math.min(index + 1, 2);

        if (index === 2) {
            progress.completed = true;
        }

        this.setDailyProgress(progress);
        return progress;
    },

    // ===== Statistics =====

    getStats() {
        // Check for monthly reset
        this.checkMonthlyStatsReset();

        return this.get('stats', {
            puzzlesPlayed: 0,
            puzzlesSolved: 0,
            totalScore: 0,
            bestStreak: 0,
            noHintSolves: 0,
            categories: {
                movies: { played: 0, solved: 0 },
                tvshows: { played: 0, solved: 0 },
                songs: { played: 0, solved: 0 },
                phrases: { played: 0, solved: 0 },
                brands: { played: 0, solved: 0 },
                places: { played: 0, solved: 0 }
            },
            averageTime: 0,
            totalTime: 0
        });
    },

    checkMonthlyStatsReset() {
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
        const currentMonth = now.getFullYear() * 12 + now.getMonth();
        const lastStatsMonth = this.get('stats_month', null);

        if (lastStatsMonth !== currentMonth) {
            console.log('📊 Resetting monthly stats');
            // Reset stats
            this.set('stats', {
                puzzlesPlayed: 0,
                puzzlesSolved: 0,
                totalScore: 0,
                bestStreak: 0,
                noHintSolves: 0,
                categories: {
                    movies: { played: 0, solved: 0 },
                    tvshows: { played: 0, solved: 0 },
                    songs: { played: 0, solved: 0 },
                    phrases: { played: 0, solved: 0 },
                    brands: { played: 0, solved: 0 },
                    places: { played: 0, solved: 0 }
                },
                averageTime: 0,
                totalTime: 0
            });
            this.set('stats_month', currentMonth);
        }
    },

    recordPuzzle(puzzle, solved, score, time, hintsUsed) {
        const stats = this.getStats();

        stats.puzzlesPlayed++;
        if (solved) {
            stats.puzzlesSolved++;
            stats.totalScore += score;
            if (hintsUsed === 0) {
                stats.noHintSolves++;
            }
        }

        // Category stats
        if (stats.categories[puzzle.category]) {
            stats.categories[puzzle.category].played++;
            if (solved) {
                stats.categories[puzzle.category].solved++;
            }
        }

        // Time tracking
        stats.totalTime += time;
        stats.averageTime = Math.round(stats.totalTime / stats.puzzlesPlayed);

        // Streak
        const streak = this.getStreak();
        stats.bestStreak = streak.best;

        this.set('stats', stats);
        return stats;
    },

    // ===== Daily Rewards =====

    getRewards() {
        const defaultRewards = {
            lastClaimDate: null,
            currentDay: 1,        // Which day (1-7) in the cycle
            cycleClaimedDays: [], // Which days in current cycle are claimed [1,2,3...]
            totalClaims: 0
        };

        let rewards = this.get('rewards', defaultRewards);

        // Migration: handle old format - give users a fresh start
        if (rewards.consecutiveDays !== undefined || rewards.currentDay === undefined) {
            rewards = {
                lastClaimDate: null,  // Reset so they can claim today
                currentDay: 1,
                cycleClaimedDays: [],
                totalClaims: 0
            };
            this.set('rewards', rewards);
        }

        // Check if streak is broken (missed more than 1 day)
        if (rewards.lastClaimDate) {
            const lastClaim = new Date(rewards.lastClaimDate);
            const today = new Date();
            const daysDiff = this.getDaysDifference(lastClaim, today);

            if (daysDiff > 1) {
                // Streak broken - reset to day 1
                rewards.currentDay = 1;
                rewards.cycleClaimedDays = [];
                this.set('rewards', rewards);
            }
        }

        return rewards;
    },

    claimReward(dayNumber) {
        const rewards = this.getRewards();
        const today = this.getDateString(new Date());

        // Check if already claimed today
        if (rewards.lastClaimDate === today) {
            return null;
        }

        // Mark current day as claimed
        if (!rewards.cycleClaimedDays.includes(dayNumber)) {
            rewards.cycleClaimedDays.push(dayNumber);
        }

        // Update last claim date
        rewards.lastClaimDate = today;
        rewards.totalClaims++;

        // Advance to next day for tomorrow (or wrap back to day 1 after day 7)
        if (dayNumber >= 7) {
            rewards.currentDay = 1;
            rewards.cycleClaimedDays = []; // Reset cycle
        } else {
            rewards.currentDay = dayNumber + 1;
        }

        this.set('rewards', rewards);
        return rewards;
    },

    // ===== Leaderboard =====

    getLeaderboardScores() {
        return this.get('leaderboard', {
            daily: [],
            weekly: [],
            monthly: []
        });
    },

    addLeaderboardScore(score, period = 'daily') {
        const scores = this.getLeaderboardScores();
        const today = this.getDateString(new Date());

        const entry = {
            name: this.getProfile().name,
            score,
            date: today,
            you: true
        };

        scores[period].push(entry);
        scores[period].sort((a, b) => b.score - a.score);
        scores[period] = scores[period].slice(0, 100);

        this.set('leaderboard', scores);
        return scores;
    },

    // ===== Solved Puzzles Tracking =====

    getSolvedPuzzles() {
        return this.get('solved', []);
    },

    markPuzzleSolved(puzzleId) {
        const solved = this.getSolvedPuzzles();
        if (!solved.includes(puzzleId)) {
            solved.push(puzzleId);
            this.set('solved', solved);
        }
        return solved;
    },

    isPuzzleSolved(puzzleId) {
        return this.getSolvedPuzzles().includes(puzzleId);
    },

    // ===== Tutorial =====

    hasSeeenTutorial() {
        return this.get('tutorial_seen', false);
    },

    markTutorialSeen() {
        return this.set('tutorial_seen', true);
    },

    // ===== Utility Methods =====

    getDateString(date) {
        return date.toISOString().split('T')[0];
    },

    isNewDay(lastDate, currentDate) {
        const last = new Date(lastDate);
        const current = new Date(currentDate);

        return last.toDateString() !== current.toDateString();
    },

    getDaysDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        // Reset time to midnight for accurate day comparison
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(d2 - d1);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    },

    // ===== Export/Import =====

    exportData() {
        const data = {};
        const keys = Object.keys(localStorage);

        keys.forEach(key => {
            if (key.startsWith(this.PREFIX)) {
                const shortKey = key.replace(this.PREFIX, '');
                data[shortKey] = this.get(shortKey);
            }
        });

        return JSON.stringify(data, null, 2);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            for (const key in data) {
                this.set(key, data[key]);
            }

            return true;
        } catch (e) {
            console.error('Import error:', e);
            return false;
        }
    }
};

// Export for use
window.Storage = Storage;
