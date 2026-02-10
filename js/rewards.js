/**
 * Daily Rewards System for Frequency Zero
 * 7-day reward calendar with streak bonuses
 */

const Rewards = {
    // Reward definitions for each day
    REWARDS: [
        { day: 1, type: 'energy', amount: 2, icon: '⚡', label: '+2 Energy' },
        { day: 2, type: 'hints', amount: 1, icon: '💡', label: '+1 Hint' },
        { day: 3, type: 'energy', amount: 3, icon: '⚡', label: '+3 Energy' },
        { day: 4, type: 'hints', amount: 2, icon: '💡', label: '+2 Hints' },
        { day: 5, type: 'multiplier', amount: 2, icon: '✨', label: '2x Score' },
        { day: 6, type: 'energy', amount: 5, icon: '⚡', label: '+5 Energy' },
        { day: 7, type: 'mystery', amount: 0, icon: '🎁', label: 'Mystery Box' }
    ],

    // ===== Core Methods =====

    init() {
        this.renderCalendar();
        this.updateStreakDisplay();
    },

    getRewardData() {
        return Storage.getRewards();
    },

    getCurrentDay() {
        const data = this.getRewardData();
        const streak = Storage.getStreak();

        // Day is based on consecutive login days (1-7, then cycles)
        return ((data.consecutiveDays - 1) % 7) + 1 || 1;
    },

    canClaimToday() {
        const data = this.getRewardData();
        const today = Storage.getDateString(new Date());

        return data.lastClaimDate !== today;
    },

    // ===== Claim Reward =====

    claimReward() {
        if (!this.canClaimToday()) {
            this.showAlreadyClaimedMessage();
            return null;
        }

        const dayNumber = this.getCurrentDay();
        const reward = this.REWARDS[dayNumber - 1];

        // Process reward
        let rewardResult;

        switch (reward.type) {
            case 'energy':
                Energy.add(reward.amount);
                rewardResult = `+${reward.amount} Energy`;
                break;

            case 'hints':
                Hints.add(reward.amount);
                rewardResult = `+${reward.amount} Hint${reward.amount > 1 ? 's' : ''}`;
                break;

            case 'multiplier':
                this.activateScoreMultiplier(reward.amount);
                rewardResult = `${reward.amount}x Score Multiplier (24hr)`;
                break;

            case 'mystery':
                rewardResult = this.openMysteryBox();
                break;

            default:
                rewardResult = reward.label;
        }

        // Update storage
        Storage.claimReward(dayNumber);

        // Update UI
        this.renderCalendar();
        this.updateStreakDisplay();

        // Show reward modal
        this.showRewardModal(reward.icon, rewardResult);

        return rewardResult;
    },

    // ===== Mystery Box =====

    openMysteryBox() {
        // Random reward between 5-10 hints or energy
        const isEnergy = Math.random() > 0.5;
        const amount = Math.floor(Math.random() * 6) + 5; // 5-10

        if (isEnergy) {
            Energy.add(amount);
            return `+${amount} Energy!`;
        } else {
            Hints.add(amount);
            return `+${amount} Hints!`;
        }
    },

    // ===== Score Multiplier =====

    activateScoreMultiplier(multiplier) {
        const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        Storage.set('score_multiplier', {
            value: multiplier,
            expires
        });
    },

    getScoreMultiplier() {
        const data = Storage.get('score_multiplier');
        if (!data) return 1;

        if (Date.now() > data.expires) {
            Storage.remove('score_multiplier');
            return 1;
        }

        return data.value;
    },

    // ===== UI Rendering =====

    renderCalendar() {
        const container = document.getElementById('rewards-calendar');
        if (!container) return;

        const data = this.getRewardData();
        const currentDay = this.getCurrentDay();
        const canClaim = this.canClaimToday();

        container.innerHTML = this.REWARDS.map((reward, index) => {
            const dayNum = index + 1;
            const isClaimed = this.isDayClaimed(dayNum);
            const isAvailable = dayNum === currentDay && canClaim;
            const isLocked = dayNum > currentDay;

            let className = 'reward-day';
            if (isClaimed) className += ' claimed';
            else if (isAvailable) className += ' available';
            else if (isLocked) className += ' locked';

            return `
                <div class="${className}" data-day="${dayNum}" ${isAvailable ? 'onclick="Rewards.claimReward()"' : ''}>
                    <span class="reward-day-number">Day ${dayNum}</span>
                    <span class="reward-day-icon">${isClaimed ? '✅' : reward.icon}</span>
                    <span class="reward-day-label">${reward.label}</span>
                </div>
            `;
        }).join('');
    },

    isDayClaimed(dayNum) {
        const data = this.getRewardData();
        const currentDay = this.getCurrentDay();

        // If we've passed this day in the current cycle, it's claimed
        if (dayNum < currentDay) return true;

        // If it's the current day and we claimed today
        if (dayNum === currentDay && !this.canClaimToday()) return true;

        return false;
    },

    updateStreakDisplay() {
        const streak = Storage.getStreak();

        // Update rewards screen streak
        const rewardStreak = document.getElementById('reward-streak');
        if (rewardStreak) {
            rewardStreak.textContent = `${streak.current} days`;
        }

        // Update header streak
        const streakValue = document.getElementById('streak-value');
        if (streakValue) {
            streakValue.textContent = streak.current;
        }

        const currentStreak = document.getElementById('current-streak');
        if (currentStreak) {
            currentStreak.textContent = `🔥${streak.current}`;
        }
    },

    // ===== Modals =====

    showRewardModal(icon, description) {
        const modal = document.getElementById('reward-modal');
        if (!modal) return;

        const iconEl = document.getElementById('reward-icon');
        const descEl = document.getElementById('reward-description');

        if (iconEl) iconEl.textContent = icon;
        if (descEl) descEl.textContent = description;

        modal.classList.add('active');

        // Add confetti effect
        this.createConfetti();
    },

    hideRewardModal() {
        const modal = document.getElementById('reward-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    showAlreadyClaimedMessage() {
        const notification = document.createElement('div');
        notification.className = 'reward-notification animate-fade-in-up';
        notification.innerHTML = `<span>✅</span> Already claimed today! Come back tomorrow.`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    },

    // ===== Confetti Effect =====

    createConfetti() {
        const colors = ['#e94560', '#4ecca3', '#ffc107', '#00d9ff', '#ff6b6b'];
        const shapes = ['square', 'circle', 'triangle'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = `confetti-particle ${shapes[Math.floor(Math.random() * shapes.length)]}`;
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
                confetti.style.animationDelay = `${Math.random() * 0.5}s`;

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
    },

    // ===== Streak Bonus Calculation =====

    getStreakBonus() {
        const streak = Storage.getStreak();
        // 10% bonus per day, max 100% (2x)
        return Math.min(1 + (streak.current * 0.1), 2);
    }
};

// Add CSS for reward notifications
const rewardStyles = document.createElement('style');
rewardStyles.textContent = `
    .reward-notification {
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #4ecca3, #3db891);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(78, 204, 163, 0.4);
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .reward-notification.fade-out {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(rewardStyles);

// Export for use
window.Rewards = Rewards;
