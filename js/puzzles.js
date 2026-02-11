/**
 * Puzzle Database for Decodji
 * 1000 puzzles across 5 categories
 * Puzzles loaded from separate category files for better performance
 */

// Combine all puzzles from category files
const PUZZLES = {
    movies: MOVIE_PUZZLES,
    tvshows: TVSHOW_PUZZLES,
    songs: SONG_PUZZLES,
    brands: BRAND_PUZZLES,
    places: PLACE_PUZZLES
};

// Category icons mapping
const CATEGORY_ICONS = {
    movies: '🎬',
    tvshows: '📺',
    songs: '🎵',
    brands: '🏷️',
    places: '🌍'
};

// Category display names
const CATEGORY_NAMES = {
    movies: 'Movies',
    tvshows: 'TV Shows',
    songs: 'Songs',
    brands: 'Brands',
    places: 'Places'
};

// Get total puzzle count
function getTotalPuzzleCount() {
    let total = 0;
    for (const category in PUZZLES) {
        for (const difficulty in PUZZLES[category]) {
            total += PUZZLES[category][difficulty].length;
        }
    }
    return total;
}

// Get puzzles by difficulty
function getPuzzlesByDifficulty(difficulty) {
    const puzzles = [];
    for (const category in PUZZLES) {
        if (PUZZLES[category][difficulty]) {
            PUZZLES[category][difficulty].forEach(puzzle => {
                puzzles.push({
                    ...puzzle,
                    category,
                    difficulty
                });
            });
        }
    }
    return puzzles;
}

// Get all puzzles as flat array
function getAllPuzzles() {
    const puzzles = [];
    for (const category in PUZZLES) {
        for (const difficulty in PUZZLES[category]) {
            PUZZLES[category][difficulty].forEach(puzzle => {
                puzzles.push({
                    ...puzzle,
                    category,
                    difficulty
                });
            });
        }
    }
    return puzzles;
}

// Get random puzzle
function getRandomPuzzle(excludeIds = []) {
    const allPuzzles = getAllPuzzles().filter(p => !excludeIds.includes(p.id));
    if (allPuzzles.length === 0) return null;
    return allPuzzles[Math.floor(Math.random() * allPuzzles.length)];
}

// Get random puzzle from specific category
function getRandomPuzzleByCategory(category, excludeIds = []) {
    if (category === 'all') {
        return getRandomPuzzle(excludeIds);
    }

    if (!PUZZLES[category]) return null;

    const puzzles = [];
    for (const difficulty in PUZZLES[category]) {
        PUZZLES[category][difficulty].forEach(puzzle => {
            if (!excludeIds.includes(puzzle.id)) {
                puzzles.push({
                    ...puzzle,
                    category,
                    difficulty
                });
            }
        });
    }

    if (puzzles.length === 0) return null;
    return puzzles[Math.floor(Math.random() * puzzles.length)];
}

// Get puzzle by ID
function getPuzzleById(id) {
    for (const category in PUZZLES) {
        for (const difficulty in PUZZLES[category]) {
            const puzzle = PUZZLES[category][difficulty].find(p => p.id === id);
            if (puzzle) {
                return { ...puzzle, category, difficulty };
            }
        }
    }
    return null;
}

// Export for use
window.PUZZLES = PUZZLES;
window.CATEGORY_ICONS = CATEGORY_ICONS;
window.CATEGORY_NAMES = CATEGORY_NAMES;
window.getTotalPuzzleCount = getTotalPuzzleCount;
window.getPuzzlesByDifficulty = getPuzzlesByDifficulty;
window.getAllPuzzles = getAllPuzzles;
window.getRandomPuzzle = getRandomPuzzle;
window.getRandomPuzzleByCategory = getRandomPuzzleByCategory;
window.getPuzzleById = getPuzzleById;
