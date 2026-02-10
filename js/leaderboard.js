/**
 * Leaderboard System for Frequency Zero
 * Daily, weekly, and all-time rankings
 */

const Leaderboard = {
    // Fake player names for simulation
    FAKE_NAMES: [
        'EmojiMaster', 'PuzzleKing', 'BrainiacPro', 'QuizWhiz', 'WordNinja',
        'CleverCat', 'SmartFox', 'WiseOwl', 'QuickThinker', 'MindReader',
        'Genius101', 'PuzzlePro', 'BrainStorm', 'ThinkTank', 'IdeaGuru',
        'LogicLord', 'EmojiExpert', 'GuessGod', 'DecodeKing', 'SymbolSage',
        'MovieBuff', 'SongStar', 'PhraseFan', 'BrandBoss', 'TriviaKing',
        'Riddler', 'Enigma', 'Cipher', 'Oracle', 'Prophet',
        'MasterMind', 'DeepThink', 'QuickWit', 'SharpMind', 'BrightSpark',
        'StarPlayer', 'TopGamer', 'ProSolver', 'FastGuess', 'SureShot'
    ],

    currentPeriod: 'daily',

    // ===== Initialization =====

    init() {
        this.generateFakeEntries();
        this.setupTabs();
        this.render();
    },

    // ===== Generate Fake Leaderboard =====

    generateFakeEntries() {
        const existing = Storage.getLeaderboardScores();

        // Generate fake entries for each period if needed
        ['daily', 'weekly', 'alltime'].forEach(period => {
            if (existing[period].length < 20) {
                const fakeEntries = this.createFakeEntries(period);
                existing[period] = [...existing[period], ...fakeEntries];
                existing[period].sort((a, b) => b.score - a.score);
                existing[period] = existing[period].slice(0, 100);
            }
        });

        Storage.set('leaderboard', existing);
    },

    createFakeEntries(period) {
        const entries = [];
        const count = 50;

        // Score ranges based on period
        const ranges = {
            daily: { min: 100, max: 750 },
            weekly: { min: 500, max: 5000 },
            alltime: { min: 2000, max: 50000 }
        };

        const range = ranges[period];
        const usedNames = new Set();

        for (let i = 0; i < count; i++) {
            // Get unique name
            let name;
            do {
                name = this.FAKE_NAMES[Math.floor(Math.random() * this.FAKE_NAMES.length)];
                if (Math.random() > 0.7) {
                    name += Math.floor(Math.random() * 100);
                }
            } while (usedNames.has(name));
            usedNames.add(name);

            entries.push({
                name,
                score: Math.floor(Math.random() * (range.max - range.min) + range.min),
                date: Storage.getDateString(new Date()),
                you: false
            });
        }

        return entries;
    },

    // ===== Tab Management =====

    setupTabs() {
        const tabs = document.querySelectorAll('.lb-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentPeriod = tab.dataset.period;
                this.render();
            });
        });
    },

    // ===== Render Leaderboard =====

    render() {
        const container = document.getElementById('leaderboard-list');
        if (!container) return;

        const scores = Storage.getLeaderboardScores();
        const entries = scores[this.currentPeriod] || [];

        // Sort by score
        entries.sort((a, b) => b.score - a.score);

        // Take top 20 for display
        const topEntries = entries.slice(0, 20);

        if (topEntries.length === 0) {
            container.innerHTML = `
                <div class="lb-empty">
                    <p>No scores yet!</p>
                    <p>Complete puzzles to appear on the leaderboard.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = topEntries.map((entry, index) => {
            const rank = index + 1;
            let rankClass = '';
            let rankDisplay = `#${rank}`;

            if (rank === 1) {
                rankClass = 'gold';
                rankDisplay = '🥇';
            } else if (rank === 2) {
                rankClass = 'silver';
                rankDisplay = '🥈';
            } else if (rank === 3) {
                rankClass = 'bronze';
                rankDisplay = '🥉';
            }

            const entryClass = `lb-entry ${rank <= 3 ? 'top-3' : ''} ${entry.you ? 'you' : ''}`;

            return `
                <div class="${entryClass}">
                    <span class="lb-rank ${rankClass}">${rankDisplay}</span>
                    <span class="lb-name">${entry.name}${entry.you ? ' (You)' : ''}</span>
                    <span class="lb-score">${this.formatScore(entry.score)}</span>
                </div>
            `;
        }).join('');

        // Update your rank
        this.updateYourRank();
    },

    formatScore(score) {
        if (score >= 10000) {
            return (score / 1000).toFixed(1) + 'k';
        }
        return score.toLocaleString();
    },

    // ===== Your Rank =====

    updateYourRank() {
        const scores = Storage.getLeaderboardScores();
        const entries = scores[this.currentPeriod] || [];

        // Find user's entry
        const userIndex = entries.findIndex(e => e.you);
        const rankValue = document.getElementById('rank-value');

        if (rankValue) {
            if (userIndex === -1) {
                rankValue.textContent = '#--';
            } else {
                rankValue.textContent = `#${userIndex + 1}`;
            }
        }
    },

    // ===== Add Score =====

    addScore(score) {
        const playerName = Storage.getProfile().name;

        // Update daily
        this.updatePeriodScore('daily', playerName, score);

        // Update weekly
        const weeklyData = Storage.get('weekly_score', { score: 0, week: this.getWeekNumber() });
        if (weeklyData.week === this.getWeekNumber()) {
            weeklyData.score += score;
        } else {
            weeklyData.score = score;
            weeklyData.week = this.getWeekNumber();
        }
        Storage.set('weekly_score', weeklyData);
        this.updatePeriodScore('weekly', playerName, weeklyData.score, true);

        // Update all-time
        const stats = Storage.getStats();
        this.updatePeriodScore('alltime', playerName, stats.totalScore, true);

        this.render();
    },

    updatePeriodScore(period, name, score, replace = false) {
        const scores = Storage.getLeaderboardScores();

        // Remove existing user entry if replacing
        if (replace) {
            scores[period] = scores[period].filter(e => !e.you);
        }

        // Add new entry
        scores[period].push({
            name,
            score,
            date: Storage.getDateString(new Date()),
            you: true
        });

        // Sort and limit
        scores[period].sort((a, b) => b.score - a.score);
        scores[period] = scores[period].slice(0, 100);

        Storage.set('leaderboard', scores);
    },

    getWeekNumber() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 604800000;
        return Math.ceil(diff / oneWeek);
    },

    // ===== Scoring System =====

    calculateScore(timeSeconds, hintsUsed, difficulty) {
        const basePoints = 100;

        // Time bonus
        let timeBonus = 0;
        let timeLabel = '';
        if (timeSeconds < 10) {
            timeBonus = 50;
            timeLabel = 'Speed Bonus (under 10s)';
        } else if (timeSeconds < 30) {
            timeBonus = 30;
            timeLabel = 'Speed Bonus (under 30s)';
        } else if (timeSeconds < 60) {
            timeBonus = 10;
            timeLabel = 'Speed Bonus (under 60s)';
        }

        // No-hint bonus
        const noHintBonus = hintsUsed === 0 ? 100 : 0;

        // Hint penalty (capped so score doesn't go below 0)
        const maxPenalty = basePoints + timeBonus; // Can't lose more than you earned
        const rawHintPenalty = hintsUsed * 20;
        const hintPenalty = Math.min(rawHintPenalty, maxPenalty);

        // Difficulty multiplier
        const difficultyMultiplier = {
            easy: 1,
            medium: 1.5,
            hard: 2
        }[difficulty] || 1;

        const difficultyLabel = {
            easy: 'Easy',
            medium: 'Medium (1.5x)',
            hard: 'Hard (2x)'
        }[difficulty] || '';

        // Streak multiplier
        const streakMultiplier = Rewards.getStreakBonus();

        // Score multiplier from rewards
        const rewardMultiplier = Rewards.getScoreMultiplier();

        // Calculate subtotal before multipliers
        let subtotal = basePoints + timeBonus - hintPenalty + noHintBonus;
        subtotal = Math.max(0, subtotal); // Never go negative

        // Calculate total with multipliers
        const totalMultiplier = difficultyMultiplier * streakMultiplier * rewardMultiplier;
        const total = Math.floor(subtotal * totalMultiplier);

        return {
            base: basePoints,
            timeBonus,
            timeLabel,
            hintPenalty,
            hintsUsed,
            noHintBonus,
            subtotal,
            difficulty,
            difficultyLabel,
            difficultyMultiplier,
            streakMultiplier,
            rewardMultiplier,
            totalMultiplier,
            total
        };
    }
};

// Add CSS for leaderboard
const lbStyles = document.createElement('style');
lbStyles.textContent = `
    .lb-empty {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-secondary);
    }

    .lb-empty p {
        margin: 8px 0;
    }
`;
document.head.appendChild(lbStyles);

// Export for use
window.Leaderboard = Leaderboard;
