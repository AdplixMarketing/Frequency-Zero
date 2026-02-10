/**
 * Share System for Frequency Zero
 * Social sharing with Web Share API
 */

const Share = {
    // ===== Share Methods =====

    async shareResult(puzzle, solved, score, hintsUsed, time) {
        const text = this.generatePuzzleShareText(puzzle, solved, score, hintsUsed, time);
        await this.share(text);
    },

    async shareDaily() {
        const text = Daily.generateShareText();
        await this.share(text);
    },

    async share(text) {
        const shareData = {
            title: 'Decodji',
            text: text,
            url: window.location.origin
        };

        // Try Web Share API first
        if (navigator.share && this.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return true;
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share failed:', err);
                }
            }
        }

        // Fallback to clipboard
        return this.copyToClipboard(text);
    },

    canShare(data) {
        if (!navigator.canShare) return true; // Assume yes if no canShare method
        try {
            return navigator.canShare(data);
        } catch {
            return false;
        }
    },

    // ===== Clipboard Fallback =====

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showCopiedNotification();
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand('copy');
                this.showCopiedNotification();
                return true;
            } catch (e) {
                console.error('Copy failed:', e);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    },

    // ===== Text Generation =====

    generatePuzzleShareText(puzzle, solved, score, hintsUsed, time) {
        const streak = Storage.getStreak();
        const stars = this.getStars(solved, hintsUsed);

        let text = `🎯 Decodji\n\n`;
        text += `${puzzle.emojis.join('')}\n`;
        text += `${stars}\n\n`;

        if (solved) {
            text += `✅ Solved in ${this.formatTime(time)}!\n`;
            text += `Score: ${score}\n`;
        } else {
            text += `❌ Better luck next time!\n`;
        }

        text += `Streak: 🔥${streak.current}\n\n`;
        text += `Can you decode it? Play at:\n${window.location.origin}`;

        return text;
    },

    getStars(solved, hintsUsed) {
        if (!solved) return '❌';
        if (hintsUsed === 0) return '⭐⭐⭐ Perfect!';
        if (hintsUsed === 1) return '⭐⭐ Great!';
        return '⭐ Good!';
    },

    formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        }
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    },

    // ===== Notifications =====

    showCopiedNotification() {
        const notification = document.createElement('div');
        notification.className = 'share-notification animate-fade-in-up';
        notification.innerHTML = `<span>📋</span> Copied to clipboard!`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    // ===== Social Sharing Buttons =====

    shareToTwitter(text) {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=550,height=420');
    },

    shareToFacebook() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`;
        window.open(url, '_blank', 'width=550,height=420');
    },

    shareToWhatsApp(text) {
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    },

    shareToTelegram(text) {
        const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    },

    // ===== Challenge Link =====

    generateChallengeLink(puzzleId) {
        const base = window.location.origin;
        return `${base}?challenge=${puzzleId}`;
    },

    async shareChallengeLink(puzzle) {
        const link = this.generateChallengeLink(puzzle.id);
        const text = `🎯 Can you decode this?\n\n${puzzle.emojis.join('')}\n\nChallenge me: ${link}`;

        await this.share(text);
    }
};

// Add CSS for share notifications
const shareStyles = document.createElement('style');
shareStyles.textContent = `
    .share-notification {
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #0f3460, #16213e);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(15, 52, 96, 0.4);
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid #e94560;
    }

    .share-notification.fade-out {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(shareStyles);

// Export for use
window.Share = Share;
