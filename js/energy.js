/**
 * Energy Management System for Frequency Zero
 * Handles energy consumption, refills, and bonus energy
 */

const Energy = {
    MAX_ENERGY: 10,
    BONUS_ENERGY_AMOUNT: 3,

    // ===== Core Methods =====

    init() {
        this.updateDisplay();
        this.startRefillTimer();
    },

    getCurrent() {
        return Storage.getEnergy().current;
    },

    getMax() {
        return this.MAX_ENERGY;
    },

    // ===== Energy Operations =====

    use(amount = 1) {
        const current = this.getCurrent();
        if (current >= amount) {
            Storage.setEnergy(current - amount);
            this.updateDisplay();
            return true;
        }
        return false;
    },

    add(amount) {
        const current = this.getCurrent();
        const newAmount = Math.min(current + amount, this.MAX_ENERGY + 10); // Allow overflow
        Storage.setEnergy(newAmount);
        this.updateDisplay();
        return newAmount;
    },

    hasEnough(amount = 1) {
        return this.getCurrent() >= amount;
    },

    // ===== Daily Refill =====

    checkDailyRefill() {
        const energyData = Storage.getEnergy();
        const now = new Date();
        const lastRefill = new Date(energyData.lastRefill);

        if (Storage.isNewDay(lastRefill, now)) {
            Storage.setEnergy(this.MAX_ENERGY);
            Storage.set('energy', {
                ...energyData,
                current: this.MAX_ENERGY,
                lastRefill: now.getTime()
            });
            this.updateDisplay();
            return true;
        }
        return false;
    },

    getTimeUntilRefill() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
        tomorrow.setUTCHours(0, 0, 0, 0);

        return tomorrow.getTime() - now.getTime();
    },

    formatTimeRemaining(ms) {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    },

    // ===== Refill Timer =====

    startRefillTimer() {
        // Check every minute
        setInterval(() => {
            this.checkDailyRefill();
        }, 60000);
    },

    // ===== Bonus Energy (Rewarded Ads) =====

    showBonusEnergyModal() {
        const modal = document.getElementById('bonus-energy-modal');
        if (modal) {
            modal.classList.add('active');
        }
    },

    hideBonusEnergyModal() {
        const modal = document.getElementById('bonus-energy-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    grantBonusEnergy() {
        this.add(this.BONUS_ENERGY_AMOUNT);
        this.hideBonusEnergyModal();

        // Show notification
        this.showEnergyNotification(`+${this.BONUS_ENERGY_AMOUNT} Energy!`);
    },

    // ===== UI Updates =====

    updateDisplay() {
        const current = this.getCurrent();
        const display = document.getElementById('energy-value');

        if (display) {
            const oldValue = parseInt(display.textContent) || 0;
            display.textContent = current;

            // Animate if value changed
            if (current !== oldValue) {
                display.classList.add('animate-scale-in');
                setTimeout(() => {
                    display.classList.remove('animate-scale-in');
                }, 300);
            }

            // Visual feedback for low energy
            const badge = document.getElementById('energy-display');
            if (badge) {
                if (current <= 2) {
                    badge.classList.add('low-energy');
                } else {
                    badge.classList.remove('low-energy');
                }
            }
        }
    },

    showEnergyNotification(message) {
        // Create floating notification
        const notification = document.createElement('div');
        notification.className = 'energy-notification animate-fade-in-up';
        notification.innerHTML = `<span class="energy-icon">⚡</span> ${message}`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    // ===== Energy Cost Check =====

    canPlayPractice() {
        return this.hasEnough(1);
    },

    playPractice() {
        if (this.canPlayPractice()) {
            this.use(1);
            return true;
        }
        return false;
    },

    // Daily puzzles are always free
    canPlayDaily() {
        return true;
    }
};

// Add CSS for notifications dynamically
const energyStyles = document.createElement('style');
energyStyles.textContent = `
    .energy-notification {
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ffc107, #ff9800);
        color: #000;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(255, 193, 7, 0.4);
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .energy-notification .energy-icon {
        font-size: 1.25rem;
    }

    .energy-notification.fade-out {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
    }

    .low-energy {
        animation: pulse 1s infinite;
    }

    .low-energy .stat-value {
        color: #ff6b6b;
    }
`;
document.head.appendChild(energyStyles);

// Export for use
window.Energy = Energy;
