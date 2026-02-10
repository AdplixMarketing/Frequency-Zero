# Frequency Zero - Emoji Decoder Game

An addictive emoji puzzle game where players decode movies, phrases, songs, and brands from emoji clues. Features daily challenges, hint systems, leaderboards, and retention mechanics.

## Features

### Core Gameplay
- **Emoji Clues**: 2-6 emojis representing movies, TV shows, songs, phrases, brands, and places
- **Fuzzy Matching**: Intelligent answer checking with typo tolerance
- **Hint System**: Reveal letters progressively using hint tokens
- **Categories**: 6 different categories with 500+ puzzles

### Daily Challenge
- 3 daily puzzles (easy, medium, hard) - same for all players worldwide
- Time bonus for fast solves
- No-hint bonus for solving without help
- Streak tracking with score multipliers

### Retention Mechanics
- **Energy System**: 10 energy per day (daily puzzles are free)
- **Daily Rewards**: 7-day reward calendar with escalating prizes
- **Login Streaks**: Consecutive day bonuses
- **Leaderboards**: Daily, weekly, and all-time rankings

### Scoring System
```
Base Points: 100
Time Bonus: +50 (under 10s), +30 (under 30s), +10 (under 60s)
Hint Penalty: -20 per hint used
No-Hint Bonus: +100
Streak Multiplier: 1.1x per consecutive day (max 2x)
```

## File Structure

```
Frequency-Zero/
├── index.html              # Main game page
├── css/
│   ├── style.css           # Core styling
│   ├── animations.css      # Reveal animations
│   └── responsive.css      # Mobile breakpoints
├── js/
│   ├── app.js              # Main app controller
│   ├── game.js             # Core game logic
│   ├── puzzles.js          # Puzzle database (500+ puzzles)
│   ├── daily.js            # Daily puzzle selection
│   ├── hints.js            # Hint system
│   ├── energy.js           # Energy management
│   ├── rewards.js          # Daily rewards & streaks
│   ├── leaderboard.js      # Scoring & rankings
│   ├── storage.js          # LocalStorage wrapper
│   └── share.js            # Social sharing
└── README.md
```

## Technology Stack

- **Vanilla HTML/CSS/JavaScript** - No framework dependencies
- **LocalStorage** - Player progress persistence
- **CSS Grid & Flexbox** - Responsive layout
- **Web Share API** - Native mobile sharing

## Ad Placements (Ezoic Ready)

5 strategic ad placement divs are included:
1. **Top Banner** (728x90 desktop, 320x50 mobile)
2. **Right Sidebar** (300x600 desktop only)
3. **Interstitial** (300x250 between puzzles)
4. **Bottom Anchor** (320x100 mobile sticky)
5. **Rewarded Video** - "Watch ad for +3 hints" button

## Local Development

Simply open `index.html` in a browser - no build step required.

```bash
# Clone the repository
git clone https://github.com/AdplixMarketing/Frequency-Zero.git

# Open in browser
open index.html
```

## Daily Puzzle Algorithm

Puzzles are deterministically selected based on the current date:

```javascript
function getDailyPuzzles() {
    const startDate = new Date('2024-01-01');
    const today = new Date();
    const dayIndex = Math.floor((today - startDate) / 86400000);

    // Seeded shuffle ensures same puzzles for all users
    return [
        shuffledEasyPuzzles[dayIndex % easyCount],
        shuffledMediumPuzzles[dayIndex % mediumCount],
        shuffledHardPuzzles[dayIndex % hardCount]
    ];
}
```

## Color Scheme

- Background: `#0f0f0f`
- Card Background: `#1a1a2e`
- Accent Primary: `#e94560` (pink-red)
- Accent Secondary: `#0f3460` (deep blue)
- Success: `#4ecca3` (teal green)
- Text: `#eaeaea`

## Sharing

Players can share their results in a format like:

```
🎬 Frequency Zero - Day 47

Easy: ⭐⭐⭐ (no hints!)
Medium: ⭐⭐ (1 hint)
Hard: ⭐⭐⭐ (no hints!)

Score: 580 | Streak: 🔥7

Play at: [URL]
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT License - Feel free to modify and use for your own projects.

---

Built with ❤️ by Adplix Marketing
