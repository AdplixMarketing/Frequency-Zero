/**
 * Main Application Controller for Frequency Zero
 * Initializes all systems and handles navigation
 */

const App = {
    // ===== Initialization =====

    init() {
        console.log('🎯 Decodji - Initializing...');

        // Initialize all systems
        Energy.init();
        Hints.init();
        Rewards.init();
        Leaderboard.init();
        this.setupNavigation();
        this.setupModals();
        this.updateStats();

        // Check for first time user
        if (!Storage.hasSeeenTutorial()) {
            this.showTutorial();
        }

        // Initialize game last
        Game.init();

        // Check for daily reward availability
        if (Rewards.canClaimToday()) {
            this.highlightRewardsTab();
        }

        console.log('✅ Decodji - Ready!');
    },

    // ===== Navigation =====

    setupNavigation() {
        const tabs = document.querySelectorAll('.nav-tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                this.switchTab(targetTab);
            });
        });
    },

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.toggle('active', screen.id === `${tabName}-screen`);
        });

        // Refresh data for specific tabs
        if (tabName === 'leaderboard') {
            Leaderboard.render();
        } else if (tabName === 'rewards') {
            Rewards.renderCalendar();
            Rewards.updateStreakDisplay();
        } else if (tabName === 'stats') {
            this.updateStats();
        }
    },

    highlightRewardsTab() {
        const rewardsTab = document.querySelector('[data-tab="rewards"]');
        if (rewardsTab) {
            rewardsTab.classList.add('animate-pulse');

            // Add notification dot
            if (!rewardsTab.querySelector('.notification-dot')) {
                const dot = document.createElement('span');
                dot.className = 'notification-dot';
                rewardsTab.appendChild(dot);
            }
        }
    },

    // ===== Modals =====

    setupModals() {
        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                // Don't close result modal on overlay click (force next button)
                const modal = e.target.closest('.modal');
                if (modal && modal.id !== 'result-modal') {
                    modal.classList.remove('active');
                }
            });
        });

        // Tutorial close button
        const closeTutorial = document.getElementById('close-tutorial-btn');
        if (closeTutorial) {
            closeTutorial.addEventListener('click', () => {
                this.hideTutorial();
            });
        }

        // Help button (show tutorial)
        const helpBtn = document.getElementById('help-btn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.showTutorial();
            });
        }

        // Reward modal close
        const closeReward = document.getElementById('close-reward-btn');
        if (closeReward) {
            closeReward.addEventListener('click', () => {
                Rewards.hideRewardModal();
            });
        }

        // Bonus energy modal
        const watchAdBtn = document.getElementById('watch-ad-btn');
        if (watchAdBtn) {
            watchAdBtn.addEventListener('click', () => {
                // Simulate ad watching (in production, integrate with ad network)
                this.simulateAdWatch();
            });
        }

        const noThanksBtn = document.getElementById('no-thanks-btn');
        if (noThanksBtn) {
            noThanksBtn.addEventListener('click', () => {
                Energy.hideBonusEnergyModal();
            });
        }

        const continuePlayingBtn = document.getElementById('continue-playing-btn');
        if (continuePlayingBtn) {
            continuePlayingBtn.addEventListener('click', () => {
                Energy.hideBonusEnergyModal();
                // Load next puzzle if in practice mode
                if (Game.currentMode === 'practice') {
                    Game.loadPuzzle();
                }
            });
        }

        // Daily complete modal close (click overlay)
        const dailyCompleteOverlay = document.querySelector('#daily-complete-modal .modal-overlay');
        if (dailyCompleteOverlay) {
            dailyCompleteOverlay.addEventListener('click', () => {
                Daily.hideCompletionModal();
            });
        }
    },

    showTutorial(markAsSeen = false) {
        const modal = document.getElementById('tutorial-modal');
        if (modal) {
            modal.classList.add('active');
            modal.dataset.markAsSeen = markAsSeen ? 'true' : 'false';
        }
    },

    hideTutorial() {
        const modal = document.getElementById('tutorial-modal');
        if (modal) {
            // Only mark as seen on first view
            if (!Storage.hasSeeenTutorial()) {
                Storage.markTutorialSeen();
            }
            modal.classList.remove('active');
        }
    },

    // ===== Stats =====

    updateStats() {
        const stats = Storage.getStats();

        // Update stat numbers
        document.getElementById('stat-played').textContent = stats.puzzlesPlayed;
        document.getElementById('stat-solved').textContent = stats.puzzlesSolved;

        const accuracy = stats.puzzlesPlayed > 0
            ? Math.round((stats.puzzlesSolved / stats.puzzlesPlayed) * 100)
            : 0;
        document.getElementById('stat-accuracy').textContent = `${accuracy}%`;

        document.getElementById('stat-best-streak').textContent = stats.bestStreak;
        document.getElementById('stat-total-score').textContent = stats.totalScore.toLocaleString();
        document.getElementById('stat-no-hints').textContent = stats.noHintSolves;

        // Update category bars
        this.renderCategoryBars(stats.categories);
    },

    renderCategoryBars(categories) {
        const container = document.getElementById('category-bars');
        if (!container) return;

        const categoryNames = {
            movies: 'Movies',
            tvshows: 'TV Shows',
            songs: 'Songs',
            phrases: 'Phrases',
            brands: 'Brands',
            places: 'Places'
        };

        // Find max for scaling
        let maxPlayed = 1;
        for (const cat in categories) {
            if (categories[cat].played > maxPlayed) {
                maxPlayed = categories[cat].played;
            }
        }

        container.innerHTML = Object.entries(categories).map(([key, data]) => {
            const percentage = (data.played / maxPlayed) * 100;
            const accuracy = data.played > 0
                ? Math.round((data.solved / data.played) * 100)
                : 0;

            return `
                <div class="category-bar">
                    <span class="category-bar-label">${categoryNames[key] || key}</span>
                    <div class="category-bar-track">
                        <div class="category-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="category-bar-value">${data.solved}/${data.played}</span>
                </div>
            `;
        }).join('');
    },

    // ===== Ad Simulation =====

    simulateAdWatch() {
        const btn = document.getElementById('watch-ad-btn');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Loading...';
        }

        // Simulate 3 second ad
        setTimeout(() => {
            Energy.grantBonusEnergy();

            if (btn) {
                btn.disabled = false;
                btn.textContent = '▶️ Watch Video';
            }
        }, 3000);
    },

    // ===== Utility =====

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
};

// Add notification dot CSS
const appStyles = document.createElement('style');
appStyles.textContent = `
    .notification-dot {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 8px;
        height: 8px;
        background: var(--accent-primary);
        border-radius: 50%;
        animation: pulse 1s infinite;
    }

    .nav-tab {
        position: relative;
    }
`;
document.head.appendChild(appStyles);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Handle visibility change (pause/resume)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Check for daily reset
        Energy.checkDailyRefill();

        // Check if daily puzzles need to reset (new day)
        if (Game.currentMode === 'daily') {
            const progress = Storage.getDailyProgress();
            const today = Storage.getDateString(new Date());

            // If the stored progress is from a different day, reload
            if (progress.date !== today) {
                Game.loadPuzzle();
                Daily.updateProgressUI();
            }
        }
    }
});

// Export for use
window.App = App;
