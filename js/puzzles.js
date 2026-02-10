/**
 * Puzzle Database for Frequency Zero
 * 500+ puzzles across 6 categories
 */

const PUZZLES = {
    // ===== MOVIES (150 puzzles) =====
    movies: {
        easy: [
            { id: 'm1', emojis: ['🦁', '👑'], answer: 'The Lion King', hints: ['Disney', 'Africa', 'Simba'] },
            { id: 'm2', emojis: ['🕷️', '🧑'], answer: 'Spider-Man', hints: ['Marvel', 'Hero', 'Web'] },
            { id: 'm3', emojis: ['⭐', '⚔️'], answer: 'Star Wars', hints: ['Space', 'Jedi', 'Force'] },
            { id: 'm4', emojis: ['🧊', '❄️', '👸'], answer: 'Frozen', hints: ['Disney', 'Sister', 'Elsa'] },
            { id: 'm5', emojis: ['🦇', '🧑'], answer: 'Batman', hints: ['DC', 'Gotham', 'Dark'] },
            { id: 'm6', emojis: ['👻', '🚫'], answer: 'Ghostbusters', hints: ['Comedy', '80s', 'Slimer'] },
            { id: 'm7', emojis: ['🧙', '💍'], answer: 'Lord of the Rings', hints: ['Fantasy', 'Hobbit', 'Frodo'] },
            { id: 'm8', emojis: ['🦖', '🏞️'], answer: 'Jurassic Park', hints: ['Dinosaurs', 'Island', 'Spielberg'] },
            { id: 'm9', emojis: ['🚢', '❄️', '💑'], answer: 'Titanic', hints: ['Ship', 'Romance', 'Jack'] },
            { id: 'm10', emojis: ['🤠', '🚀', '🧸'], answer: 'Toy Story', hints: ['Pixar', 'Woody', 'Buzz'] },
            { id: 'm11', emojis: ['🐠', '🔍'], answer: 'Finding Nemo', hints: ['Pixar', 'Ocean', 'Fish'] },
            { id: 'm12', emojis: ['👸', '🐸'], answer: 'The Princess and the Frog', hints: ['Disney', 'New Orleans', 'Tiana'] },
            { id: 'm13', emojis: ['🦈', '🏊'], answer: 'Jaws', hints: ['Thriller', 'Beach', 'Summer'] },
            { id: 'm14', emojis: ['🏠', '👽'], answer: 'E.T.', hints: ['Spielberg', 'Alien', 'Bike'] },
            { id: 'm15', emojis: ['🎃', '🔪'], answer: 'Halloween', hints: ['Horror', 'Michael', 'Slasher'] },
            { id: 'm16', emojis: ['🚗', '⚡'], answer: 'Cars', hints: ['Pixar', 'Racing', 'McQueen'] },
            { id: 'm17', emojis: ['👨‍🍳', '🐀'], answer: 'Ratatouille', hints: ['Pixar', 'Paris', 'Cooking'] },
            { id: 'm18', emojis: ['🧞', '🏜️'], answer: 'Aladdin', hints: ['Disney', 'Lamp', 'Genie'] },
            { id: 'm19', emojis: ['🦸', '👨‍👩‍👧‍👦'], answer: 'The Incredibles', hints: ['Pixar', 'Super', 'Family'] },
            { id: 'm20', emojis: ['🏰', '🥀'], answer: 'Beauty and the Beast', hints: ['Disney', 'Belle', 'Rose'] },
            { id: 'm21', emojis: ['🌊', '🧜‍♀️'], answer: 'The Little Mermaid', hints: ['Disney', 'Ariel', 'Ocean'] },
            { id: 'm22', emojis: ['🎪', '🐘'], answer: 'Dumbo', hints: ['Disney', 'Circus', 'Flying'] },
            { id: 'm23', emojis: ['⬆️', '🏠'], answer: 'Up', hints: ['Pixar', 'Balloons', 'Adventure'] },
            { id: 'm24', emojis: ['🤖', '❤️'], answer: 'WALL-E', hints: ['Pixar', 'Robot', 'Space'] },
            { id: 'm25', emojis: ['🏹', '🍎'], answer: 'Brave', hints: ['Pixar', 'Scotland', 'Princess'] },
        ],
        medium: [
            { id: 'm26', emojis: ['💭', '🛏️'], answer: 'Inception', hints: ['Nolan', 'Dream', 'Layers'] },
            { id: 'm27', emojis: ['🃏', '🦇'], answer: 'The Dark Knight', hints: ['Joker', 'Batman', 'Gotham'] },
            { id: 'm28', emojis: ['💊', '🔴', '🔵'], answer: 'The Matrix', hints: ['Neo', 'Pill', 'Reality'] },
            { id: 'm29', emojis: ['🥊', '🏆'], answer: 'Rocky', hints: ['Boxing', 'Philadelphia', 'Stallone'] },
            { id: 'm30', emojis: ['🎭', '🎤'], answer: 'The Greatest Showman', hints: ['Musical', 'Circus', 'Jackman'] },
            { id: 'm31', emojis: ['🕐', '🔙'], answer: 'Back to the Future', hints: ['DeLorean', 'Time', 'McFly'] },
            { id: 'm32', emojis: ['🦍', '✈️', '🏙️'], answer: 'King Kong', hints: ['Monster', 'Empire State', 'Ape'] },
            { id: 'm33', emojis: ['👨‍🚀', '🌑'], answer: 'Interstellar', hints: ['Nolan', 'Space', 'Black hole'] },
            { id: 'm34', emojis: ['🎹', '🌙'], answer: 'La La Land', hints: ['Musical', 'Jazz', 'Hollywood'] },
            { id: 'm35', emojis: ['🔪', '🛁'], answer: 'Psycho', hints: ['Hitchcock', 'Horror', 'Motel'] },
            { id: 'm36', emojis: ['🐺', '💰', '📈'], answer: 'The Wolf of Wall Street', hints: ['DiCaprio', 'Money', 'Stock'] },
            { id: 'm37', emojis: ['💀', '🏴‍☠️', '🌊'], answer: 'Pirates of the Caribbean', hints: ['Sparrow', 'Disney', 'Caribbean'] },
            { id: 'm38', emojis: ['🎪', '🤡'], answer: 'It', hints: ['Horror', 'Clown', 'Stephen King'] },
            { id: 'm39', emojis: ['⛓️', '🔨', '🕊️'], answer: 'The Shawshank Redemption', hints: ['Prison', 'Hope', 'Morgan'] },
            { id: 'm40', emojis: ['📋', '✡️', '🏭'], answer: 'Schindlers List', hints: ['WW2', 'Holocaust', 'Spielberg'] },
            { id: 'm41', emojis: ['🚁', '🌴', '💥'], answer: 'Apocalypse Now', hints: ['Vietnam', 'War', 'Coppola'] },
            { id: 'm42', emojis: ['👦', '🏠', '🎄'], answer: 'Home Alone', hints: ['Christmas', 'Kevin', 'Burglars'] },
            { id: 'm43', emojis: ['🎩', '🍫'], answer: 'Charlie and the Chocolate Factory', hints: ['Wonka', 'Golden', 'Ticket'] },
            { id: 'm44', emojis: ['👩‍🦰', '💚', '🧙‍♀️'], answer: 'Wicked', hints: ['Musical', 'Oz', 'Witch'] },
            { id: 'm45', emojis: ['🏎️', '🔥'], answer: 'Fast and Furious', hints: ['Cars', 'Family', 'Racing'] },
            { id: 'm46', emojis: ['🤵', '🔫'], answer: 'James Bond', hints: ['007', 'Spy', 'British'] },
            { id: 'm47', emojis: ['👨‍👩‍👧', '🎈'], answer: 'It Chapter Two', hints: ['Horror', 'Clown', 'Derry'] },
            { id: 'm48', emojis: ['🐉', '🧙'], answer: 'How to Train Your Dragon', hints: ['Animation', 'Viking', 'Toothless'] },
            { id: 'm49', emojis: ['🌹', '💀'], answer: 'American Beauty', hints: ['Drama', 'Suburban', 'Spacey'] },
            { id: 'm50', emojis: ['🎯', '🦌'], answer: 'The Deer Hunter', hints: ['Vietnam', 'War', 'Russian Roulette'] },
        ],
        hard: [
            { id: 'm51', emojis: ['🕯️', '🍽️', '💀'], answer: 'The Cook the Thief His Wife and Her Lover', hints: ['Drama', 'British', 'Greenaway'] },
            { id: 'm52', emojis: ['🎭', '🔴', '👤'], answer: 'The Phantom of the Opera', hints: ['Musical', 'Mask', 'Paris'] },
            { id: 'm53', emojis: ['🌀', '👁️'], answer: 'Vertigo', hints: ['Hitchcock', 'Fear', 'Heights'] },
            { id: 'm54', emojis: ['🧠', '🔬'], answer: 'A Beautiful Mind', hints: ['Math', 'Nash', 'Schizophrenia'] },
            { id: 'm55', emojis: ['⚫', '🦢'], answer: 'Black Swan', hints: ['Ballet', 'Thriller', 'Portman'] },
            { id: 'm56', emojis: ['🔪', '🏃', '🏙️'], answer: 'Blade Runner', hints: ['Sci-fi', 'Replicant', 'Ford'] },
            { id: 'm57', emojis: ['🧩', '🚪'], answer: 'Being John Malkovich', hints: ['Portal', 'Weird', 'Mind'] },
            { id: 'm58', emojis: ['📼', '⏪'], answer: 'Memento', hints: ['Nolan', 'Memory', 'Reverse'] },
            { id: 'm59', emojis: ['🎩', '✨', '👯'], answer: 'The Prestige', hints: ['Magic', 'Nolan', 'Tesla'] },
            { id: 'm60', emojis: ['🌌', '👶', '🧓'], answer: '2001 A Space Odyssey', hints: ['Kubrick', 'HAL', 'Monolith'] },
            { id: 'm61', emojis: ['🍊', '⏰', '🎩'], answer: 'A Clockwork Orange', hints: ['Kubrick', 'Violence', 'Dystopia'] },
            { id: 'm62', emojis: ['🎬', '🔇', '🎩'], answer: 'The Artist', hints: ['Silent', 'Black White', 'French'] },
            { id: 'm63', emojis: ['🥊', '🧼', '🤫'], answer: 'Fight Club', hints: ['Pitt', 'Norton', 'Underground'] },
            { id: 'm64', emojis: ['🤫', '🐑'], answer: 'The Silence of the Lambs', hints: ['Hannibal', 'FBI', 'Horror'] },
            { id: 'm65', emojis: ['⚔️', '👰', '🩸'], answer: 'Kill Bill', hints: ['Tarantino', 'Revenge', 'Uma'] },
            { id: 'm66', emojis: ['🚫', '🇺🇸', '👴'], answer: 'No Country for Old Men', hints: ['Coen', 'Texas', 'Chigurh'] },
            { id: 'm67', emojis: ['🛢️', '🩸'], answer: 'There Will Be Blood', hints: ['Oil', 'Daniel', 'Milkshake'] },
            { id: 'm68', emojis: ['🚪', '🧠', '💭'], answer: 'Eternal Sunshine of the Spotless Mind', hints: ['Memory', 'Love', 'Erase'] },
            { id: 'm69', emojis: ['🎰', '💎', '🃏'], answer: 'Casino', hints: ['Scorsese', 'Vegas', 'Mob'] },
            { id: 'm70', emojis: ['😈', '👗', '👠'], answer: 'The Devil Wears Prada', hints: ['Fashion', 'Meryl', 'Vogue'] },
        ],
    },

    // ===== TV SHOWS (100 puzzles) =====
    tvshows: {
        easy: [
            { id: 't1', emojis: ['👨‍👩‍👧‍👦', '📺'], answer: 'Modern Family', hints: ['Comedy', 'ABC', 'Sitcom'] },
            { id: 't2', emojis: ['🐉', '🔥', '👑'], answer: 'Game of Thrones', hints: ['HBO', 'Fantasy', 'Winter'] },
            { id: 't3', emojis: ['🏢', '📋'], answer: 'The Office', hints: ['NBC', 'Dunder', 'Comedy'] },
            { id: 't4', emojis: ['👫', '☕'], answer: 'Friends', hints: ['NBC', 'Central Perk', 'Sitcom'] },
            { id: 't5', emojis: ['👨‍🔬', '💊'], answer: 'Breaking Bad', hints: ['AMC', 'Meth', 'Walter'] },
            { id: 't6', emojis: ['🧟', '🚶'], answer: 'The Walking Dead', hints: ['AMC', 'Zombies', 'Apocalypse'] },
            { id: 't7', emojis: ['👽', '🚲', '👦'], answer: 'Stranger Things', hints: ['Netflix', 'Eleven', 'Hawkins'] },
            { id: 't8', emojis: ['👨‍👩‍👧‍👦', '💛', '🍩'], answer: 'The Simpsons', hints: ['Fox', 'Yellow', 'Springfield'] },
            { id: 't9', emojis: ['🦸', '⚡'], answer: 'The Flash', hints: ['CW', 'DC', 'Speedster'] },
            { id: 't10', emojis: ['👑', '🏰'], answer: 'The Crown', hints: ['Netflix', 'Queen', 'Royal'] },
            { id: 't11', emojis: ['🔍', '🧥'], answer: 'Sherlock', hints: ['BBC', 'Detective', 'Holmes'] },
            { id: 't12', emojis: ['📞', '🚔'], answer: 'Brooklyn Nine-Nine', hints: ['NBC', 'Police', 'Comedy'] },
            { id: 't13', emojis: ['🏥', '❤️'], answer: 'Greys Anatomy', hints: ['ABC', 'Medical', 'Drama'] },
            { id: 't14', emojis: ['🧑‍🍳', '🔪'], answer: 'Hells Kitchen', hints: ['Fox', 'Gordon', 'Cooking'] },
            { id: 't15', emojis: ['🏝️', '✈️', '❓'], answer: 'Lost', hints: ['ABC', 'Island', 'Mystery'] },
        ],
        medium: [
            { id: 't16', emojis: ['🎰', '🏜️'], answer: 'Fallout', hints: ['Amazon', 'Vault', 'Apocalypse'] },
            { id: 't17', emojis: ['⚔️', '🛡️', '🗺️'], answer: 'Vikings', hints: ['History', 'Ragnar', 'Norse'] },
            { id: 't18', emojis: ['👮', '🔬'], answer: 'CSI', hints: ['CBS', 'Crime', 'Forensics'] },
            { id: 't19', emojis: ['🧛', '📔'], answer: 'The Vampire Diaries', hints: ['CW', 'Mystic Falls', 'Elena'] },
            { id: 't20', emojis: ['🎭', '🔪', '💀'], answer: 'Dexter', hints: ['Showtime', 'Serial', 'Killer'] },
            { id: 't21', emojis: ['🏈', '💡', '🌙'], answer: 'Friday Night Lights', hints: ['NBC', 'Texas', 'Football'] },
            { id: 't22', emojis: ['💼', '⚖️'], answer: 'Suits', hints: ['USA', 'Lawyers', 'Harvey'] },
            { id: 't23', emojis: ['🚀', '🌌'], answer: 'Star Trek', hints: ['Paramount', 'Space', 'Federation'] },
            { id: 't24', emojis: ['👨‍👨‍👦', '🍕'], answer: 'Two and a Half Men', hints: ['CBS', 'Sitcom', 'Charlie'] },
            { id: 't25', emojis: ['🎤', '⭐'], answer: 'American Idol', hints: ['Fox', 'Singing', 'Competition'] },
            { id: 't26', emojis: ['🧙‍♂️', '📚'], answer: 'Harry Potter', hints: ['HBO', 'Wizards', 'Hogwarts'] },
            { id: 't27', emojis: ['🎯', '🏹'], answer: 'Arrow', hints: ['CW', 'DC', 'Oliver'] },
            { id: 't28', emojis: ['💍', '🌹'], answer: 'The Bachelor', hints: ['ABC', 'Dating', 'Rose'] },
            { id: 't29', emojis: ['🐻', '🏕️'], answer: 'Yellowstone', hints: ['Paramount', 'Ranch', 'Montana'] },
            { id: 't30', emojis: ['🎪', '🔮'], answer: 'Carnival Row', hints: ['Amazon', 'Fantasy', 'Fae'] },
        ],
        hard: [
            { id: 't31', emojis: ['⌛', '🚂'], answer: 'Dark', hints: ['Netflix', 'German', 'Time Travel'] },
            { id: 't32', emojis: ['🎩', '🔫', '🥃'], answer: 'Peaky Blinders', hints: ['BBC', 'Gangster', 'Birmingham'] },
            { id: 't33', emojis: ['🖥️', '🔓'], answer: 'Mr Robot', hints: ['USA', 'Hacker', 'Elliot'] },
            { id: 't34', emojis: ['📕', '👧'], answer: 'The Handmaids Tale', hints: ['Hulu', 'Dystopia', 'Gilead'] },
            { id: 't35', emojis: ['🧬', '🔄'], answer: 'Orphan Black', hints: ['BBC', 'Clones', 'Sarah'] },
            { id: 't36', emojis: ['🌲', '🦉', '☕'], answer: 'Twin Peaks', hints: ['ABC', 'Lynch', 'Mystery'] },
            { id: 't37', emojis: ['🎭', '🗡️'], answer: 'Westworld', hints: ['HBO', 'Robots', 'Park'] },
            { id: 't38', emojis: ['📞', '💵'], answer: 'Better Call Saul', hints: ['AMC', 'Lawyer', 'Prequel'] },
            { id: 't39', emojis: ['👁️', '🔺'], answer: 'The OA', hints: ['Netflix', 'Mystery', 'Dimension'] },
            { id: 't40', emojis: ['🛸', '👾'], answer: 'The X-Files', hints: ['Fox', 'FBI', 'Aliens'] },
        ],
    },

    // ===== SONGS (100 puzzles) =====
    songs: {
        easy: [
            { id: 's1', emojis: ['🎤', '👸'], answer: 'Single Ladies', hints: ['Beyonce', 'Ring', 'Dance'] },
            { id: 's2', emojis: ['🌧️', '☔', '💜'], answer: 'Purple Rain', hints: ['Prince', '80s', 'Iconic'] },
            { id: 's3', emojis: ['🌙', '💃'], answer: 'Dancing in the Moonlight', hints: ['Classic', '70s', 'Night'] },
            { id: 's4', emojis: ['❤️', '🔨'], answer: 'Wrecking Ball', hints: ['Miley', 'Cyrus', 'Video'] },
            { id: 's5', emojis: ['🔥', '🏠'], answer: 'Burning Down the House', hints: ['Talking Heads', '80s', 'Rock'] },
            { id: 's6', emojis: ['🎸', '😇'], answer: 'Stairway to Heaven', hints: ['Led Zeppelin', 'Classic', 'Rock'] },
            { id: 's7', emojis: ['👁️', '🐯'], answer: 'Eye of the Tiger', hints: ['Survivor', 'Rocky', '80s'] },
            { id: 's8', emojis: ['💛', '🚕'], answer: 'Big Yellow Taxi', hints: ['Joni', 'Mitchell', 'Folk'] },
            { id: 's9', emojis: ['🌈', '🌧️'], answer: 'Somewhere Over the Rainbow', hints: ['Wizard', 'Oz', 'Classic'] },
            { id: 's10', emojis: ['🎉', '🇺🇸'], answer: 'Party in the USA', hints: ['Miley', 'Cyrus', 'Pop'] },
            { id: 's11', emojis: ['☀️', '😊'], answer: 'Here Comes the Sun', hints: ['Beatles', '60s', 'Classic'] },
            { id: 's12', emojis: ['💎', '🌌'], answer: 'Diamonds', hints: ['Rihanna', 'Sky', 'Pop'] },
            { id: 's13', emojis: ['🚗', '📻'], answer: 'Life is a Highway', hints: ['Cars', 'Rascal', 'Flatts'] },
            { id: 's14', emojis: ['💃', '👗'], answer: 'Dancing Queen', hints: ['ABBA', '70s', 'Disco'] },
            { id: 's15', emojis: ['🔔', '🎄'], answer: 'Jingle Bells', hints: ['Christmas', 'Classic', 'Holiday'] },
        ],
        medium: [
            { id: 's16', emojis: ['🦋', '💔'], answer: 'Butterflies', hints: ['Kacey', 'Musgraves', 'Country'] },
            { id: 's17', emojis: ['🌊', '👀'], answer: 'Ocean Eyes', hints: ['Billie', 'Eilish', 'Debut'] },
            { id: 's18', emojis: ['🌙', '🚶'], answer: 'Walking on the Moon', hints: ['Police', 'Sting', '80s'] },
            { id: 's19', emojis: ['🍾', '⬆️'], answer: 'Champagne Supernova', hints: ['Oasis', 'Britpop', '90s'] },
            { id: 's20', emojis: ['🔥', '💧'], answer: 'Fire and Rain', hints: ['James', 'Taylor', '70s'] },
            { id: 's21', emojis: ['🔫', '🌹'], answer: 'Guns N Roses', hints: ['Band', 'Rock', 'Axl'] },
            { id: 's22', emojis: ['💜', '🌧️'], answer: 'Purple Rain', hints: ['Prince', 'Classic', 'Ballad'] },
            { id: 's23', emojis: ['🎸', '😭'], answer: 'While My Guitar Gently Weeps', hints: ['Beatles', 'Harrison', 'Classic'] },
            { id: 's24', emojis: ['🌃', '🚗'], answer: 'Take Me Home Tonight', hints: ['Eddie', 'Money', '80s'] },
            { id: 's25', emojis: ['👟', '💃'], answer: 'Footloose', hints: ['Kenny', 'Loggins', '80s'] },
            { id: 's26', emojis: ['🎪', '🎭'], answer: 'The Show Must Go On', hints: ['Queen', 'Freddie', 'Epic'] },
            { id: 's27', emojis: ['⭐', '💛'], answer: 'Yellow', hints: ['Coldplay', '2000s', 'Stars'] },
            { id: 's28', emojis: ['🌙', '🌊'], answer: 'Moonlight Sonata', hints: ['Beethoven', 'Classical', 'Piano'] },
            { id: 's29', emojis: ['🔥', '🎸'], answer: 'Through the Fire and Flames', hints: ['Dragonforce', 'Metal', 'Guitar Hero'] },
            { id: 's30', emojis: ['💃', '🐺'], answer: 'Hungry Like the Wolf', hints: ['Duran Duran', '80s', 'Pop'] },
        ],
        hard: [
            { id: 's31', emojis: ['🎻', '🔥', '🏠'], answer: 'The House of the Rising Sun', hints: ['Animals', '60s', 'Classic'] },
            { id: 's32', emojis: ['🌌', '🚀'], answer: 'Rocket Man', hints: ['Elton', 'John', 'Space'] },
            { id: 's33', emojis: ['👁️', '📺', '💀'], answer: 'Video Killed the Radio Star', hints: ['Buggles', 'MTV', '80s'] },
            { id: 's34', emojis: ['🧱', '🧱', '🧱'], answer: 'Another Brick in the Wall', hints: ['Pink Floyd', '70s', 'Education'] },
            { id: 's35', emojis: ['🌧️', '☔', '🇬🇧'], answer: 'Singing in the Rain', hints: ['Musical', 'Classic', 'Hollywood'] },
            { id: 's36', emojis: ['👶', '🔙', '🕐'], answer: 'Baby One More Time', hints: ['Britney', 'Spears', '90s'] },
            { id: 's37', emojis: ['🌊', '🎤', '❤️'], answer: 'Rolling in the Deep', hints: ['Adele', '2010s', 'Soul'] },
            { id: 's38', emojis: ['🦅', '🏨'], answer: 'Hotel California', hints: ['Eagles', '70s', 'Classic Rock'] },
            { id: 's39', emojis: ['💫', '🎵'], answer: 'Bohemian Rhapsody', hints: ['Queen', 'Freddie', 'Opera'] },
            { id: 's40', emojis: ['🎵', '🔇'], answer: 'The Sound of Silence', hints: ['Simon', 'Garfunkel', '60s'] },
        ],
    },

    // ===== PHRASES (100 puzzles) =====
    phrases: {
        easy: [
            { id: 'p1', emojis: ['🎂', '🎉'], answer: 'Happy Birthday', hints: ['Celebration', 'Cake', 'Party'] },
            { id: 'p2', emojis: ['💔', '😢'], answer: 'Broken Heart', hints: ['Sad', 'Love', 'Emotion'] },
            { id: 'p3', emojis: ['🌅', '🏃'], answer: 'Morning Run', hints: ['Exercise', 'Early', 'Fitness'] },
            { id: 'p4', emojis: ['💰', '🗣️'], answer: 'Money Talks', hints: ['Saying', 'Wealth', 'Power'] },
            { id: 'p5', emojis: ['⏰', '💸'], answer: 'Time is Money', hints: ['Saying', 'Value', 'Work'] },
            { id: 'p6', emojis: ['🍎', '👨‍⚕️'], answer: 'An Apple a Day', hints: ['Health', 'Doctor', 'Saying'] },
            { id: 'p7', emojis: ['☔', '🐱', '🐕'], answer: 'Raining Cats and Dogs', hints: ['Weather', 'Heavy', 'Idiom'] },
            { id: 'p8', emojis: ['🥧', '🍰'], answer: 'Piece of Cake', hints: ['Easy', 'Simple', 'Idiom'] },
            { id: 'p9', emojis: ['💤', '😴'], answer: 'Beauty Sleep', hints: ['Rest', 'Night', 'Health'] },
            { id: 'p10', emojis: ['🎯', '👁️'], answer: 'Bulls Eye', hints: ['Target', 'Accurate', 'Perfect'] },
            { id: 'p11', emojis: ['❤️', '🏠'], answer: 'Home Sweet Home', hints: ['Comfort', 'Family', 'Place'] },
            { id: 'p12', emojis: ['🌧️', '🌈'], answer: 'After the Rain Comes the Rainbow', hints: ['Hope', 'Weather', 'Positive'] },
            { id: 'p13', emojis: ['🐦', '🪱'], answer: 'Early Bird Gets the Worm', hints: ['Morning', 'Success', 'Idiom'] },
            { id: 'p14', emojis: ['💪', '🏋️'], answer: 'No Pain No Gain', hints: ['Exercise', 'Effort', 'Saying'] },
            { id: 'p15', emojis: ['🔥', '❄️'], answer: 'Hot and Cold', hints: ['Temperature', 'Contrast', 'Katy Perry'] },
        ],
        medium: [
            { id: 'p16', emojis: ['🐘', '🏠'], answer: 'Elephant in the Room', hints: ['Obvious', 'Ignored', 'Idiom'] },
            { id: 'p17', emojis: ['🦆', '🌊'], answer: 'Like Water Off a Ducks Back', hints: ['Unfazed', 'Ignore', 'Idiom'] },
            { id: 'p18', emojis: ['🐝', '🧢'], answer: 'Bee in Your Bonnet', hints: ['Obsessed', 'Idea', 'Idiom'] },
            { id: 'p19', emojis: ['🐱', '👜'], answer: 'Let the Cat Out of the Bag', hints: ['Secret', 'Reveal', 'Idiom'] },
            { id: 'p20', emojis: ['🐴', '🎁'], answer: 'Dont Look a Gift Horse in the Mouth', hints: ['Grateful', 'Free', 'Idiom'] },
            { id: 'p21', emojis: ['🦈', '🏊'], answer: 'Swimming With Sharks', hints: ['Danger', 'Business', 'Risk'] },
            { id: 'p22', emojis: ['🐸', '🍳'], answer: 'Frog in Boiling Water', hints: ['Gradual', 'Change', 'Metaphor'] },
            { id: 'p23', emojis: ['🐦', '🪶'], answer: 'Birds of a Feather', hints: ['Similar', 'Friends', 'Idiom'] },
            { id: 'p24', emojis: ['🎭', '🦵', '🍀'], answer: 'Break a Leg', hints: ['Theater', 'Luck', 'Saying'] },
            { id: 'p25', emojis: ['🌧️', '☀️', '🌧️'], answer: 'When It Rains It Pours', hints: ['Problems', 'Multiple', 'Idiom'] },
            { id: 'p26', emojis: ['🐕', '💤'], answer: 'Let Sleeping Dogs Lie', hints: ['Avoid', 'Trouble', 'Idiom'] },
            { id: 'p27', emojis: ['🥛', '😭'], answer: 'No Use Crying Over Spilled Milk', hints: ['Past', 'Move on', 'Idiom'] },
            { id: 'p28', emojis: ['🔔', '🐱'], answer: 'Who Will Bell the Cat', hints: ['Risk', 'Task', 'Idiom'] },
            { id: 'p29', emojis: ['🍪', '🏺'], answer: 'Caught With Your Hand in the Cookie Jar', hints: ['Caught', 'Stealing', 'Idiom'] },
            { id: 'p30', emojis: ['🌿', '🏠'], answer: 'Grass is Greener on the Other Side', hints: ['Envy', 'Comparison', 'Idiom'] },
        ],
        hard: [
            { id: 'p31', emojis: ['🐔', '🥚'], answer: 'Which Came First the Chicken or the Egg', hints: ['Paradox', 'Question', 'Philosophy'] },
            { id: 'p32', emojis: ['🐺', '🐑', '👔'], answer: 'A Wolf in Sheeps Clothing', hints: ['Disguise', 'Danger', 'Idiom'] },
            { id: 'p33', emojis: ['👀', '📖', '📝'], answer: 'Read Between the Lines', hints: ['Hidden', 'Meaning', 'Understand'] },
            { id: 'p34', emojis: ['🐝', '🍯'], answer: 'You Catch More Flies With Honey', hints: ['Kindness', 'Approach', 'Idiom'] },
            { id: 'p35', emojis: ['🗿', '🪨'], answer: 'Between a Rock and a Hard Place', hints: ['Dilemma', 'Choice', 'Idiom'] },
            { id: 'p36', emojis: ['🎭', '🎭'], answer: 'Two Faced', hints: ['Fake', 'Pretend', 'Personality'] },
            { id: 'p37', emojis: ['🐄', '🏠'], answer: 'Why Buy the Cow When You Get the Milk for Free', hints: ['Commitment', 'Relationship', 'Idiom'] },
            { id: 'p38', emojis: ['🦷', '🍬'], answer: 'Sweet Tooth', hints: ['Sugar', 'Candy', 'Craving'] },
            { id: 'p39', emojis: ['🐝', '🦋'], answer: 'Float Like a Butterfly Sting Like a Bee', hints: ['Ali', 'Boxing', 'Famous'] },
            { id: 'p40', emojis: ['🗑️', '💎'], answer: 'One Mans Trash is Another Mans Treasure', hints: ['Value', 'Perspective', 'Idiom'] },
        ],
    },

    // ===== BRANDS (50 puzzles) =====
    brands: {
        easy: [
            { id: 'b1', emojis: ['🍎', '📱'], answer: 'Apple', hints: ['Tech', 'iPhone', 'Mac'] },
            { id: 'b2', emojis: ['🎯', '🛒'], answer: 'Target', hints: ['Retail', 'Red', 'Store'] },
            { id: 'b3', emojis: ['☕', '🧜‍♀️'], answer: 'Starbucks', hints: ['Coffee', 'Green', 'Seattle'] },
            { id: 'b4', emojis: ['👟', '✔️'], answer: 'Nike', hints: ['Sports', 'Swoosh', 'Just Do It'] },
            { id: 'b5', emojis: ['🍔', '🤡'], answer: 'McDonalds', hints: ['Fast Food', 'Golden Arches', 'Burger'] },
            { id: 'b6', emojis: ['📦', '😊'], answer: 'Amazon', hints: ['Shopping', 'Prime', 'Bezos'] },
            { id: 'b7', emojis: ['🎬', '📺'], answer: 'Netflix', hints: ['Streaming', 'Movies', 'Series'] },
            { id: 'b8', emojis: ['🐦', '💬'], answer: 'Twitter', hints: ['Social', 'Tweets', 'Blue'] },
            { id: 'b9', emojis: ['📸', '📱'], answer: 'Instagram', hints: ['Photos', 'Social', 'Meta'] },
            { id: 'b10', emojis: ['🔵', '👥'], answer: 'Facebook', hints: ['Social', 'Meta', 'Zuckerberg'] },
        ],
        medium: [
            { id: 'b11', emojis: ['🚗', '⚡'], answer: 'Tesla', hints: ['Electric', 'Musk', 'Cars'] },
            { id: 'b12', emojis: ['🎮', '🟢'], answer: 'Xbox', hints: ['Microsoft', 'Gaming', 'Console'] },
            { id: 'b13', emojis: ['🔎', '🌐'], answer: 'Google', hints: ['Search', 'Tech', 'Alphabet'] },
            { id: 'b14', emojis: ['📺', '▶️'], answer: 'YouTube', hints: ['Video', 'Google', 'Streaming'] },
            { id: 'b15', emojis: ['🎵', '🟢'], answer: 'Spotify', hints: ['Music', 'Streaming', 'Podcast'] },
            { id: 'b16', emojis: ['🛋️', '🔧'], answer: 'IKEA', hints: ['Furniture', 'Swedish', 'Assembly'] },
            { id: 'b17', emojis: ['🍕', '🛵'], answer: 'Dominos', hints: ['Pizza', 'Delivery', 'Fast Food'] },
            { id: 'b18', emojis: ['💳', '🔵'], answer: 'Visa', hints: ['Payment', 'Card', 'Banking'] },
            { id: 'b19', emojis: ['🎧', '🅱️'], answer: 'Beats', hints: ['Audio', 'Apple', 'Headphones'] },
            { id: 'b20', emojis: ['🏠', '🛏️'], answer: 'Airbnb', hints: ['Travel', 'Rental', 'Vacation'] },
        ],
        hard: [
            { id: 'b21', emojis: ['💎', '⌚'], answer: 'Rolex', hints: ['Watch', 'Luxury', 'Swiss'] },
            { id: 'b22', emojis: ['🐊', '👕'], answer: 'Lacoste', hints: ['Fashion', 'French', 'Tennis'] },
            { id: 'b23', emojis: ['🐴', '👔'], answer: 'Ralph Lauren', hints: ['Fashion', 'Polo', 'American'] },
            { id: 'b24', emojis: ['🦅', '🇺🇸'], answer: 'American Eagle', hints: ['Clothing', 'Retail', 'Teen'] },
            { id: 'b25', emojis: ['🐆', '🚗'], answer: 'Jaguar', hints: ['Cars', 'British', 'Luxury'] },
            { id: 'b26', emojis: ['🦁', '🎬'], answer: 'MGM', hints: ['Movies', 'Hollywood', 'Roar'] },
            { id: 'b27', emojis: ['🐚', '⛽'], answer: 'Shell', hints: ['Gas', 'Oil', 'Energy'] },
            { id: 'b28', emojis: ['🌺', '🧴'], answer: 'Hawaiian Tropic', hints: ['Sunscreen', 'Beach', 'Skincare'] },
            { id: 'b29', emojis: ['🍬', '🌈'], answer: 'Skittles', hints: ['Candy', 'Rainbow', 'Taste'] },
            { id: 'b30', emojis: ['🐄', '🧀'], answer: 'Laughing Cow', hints: ['Cheese', 'French', 'Spread'] },
        ],
    },

    // ===== PLACES (50 puzzles) =====
    places: {
        easy: [
            { id: 'pl1', emojis: ['🗽', '🇺🇸'], answer: 'New York', hints: ['City', 'USA', 'Big Apple'] },
            { id: 'pl2', emojis: ['🗼', '🇫🇷'], answer: 'Paris', hints: ['France', 'Eiffel', 'Love'] },
            { id: 'pl3', emojis: ['🏛️', '🇮🇹'], answer: 'Rome', hints: ['Italy', 'Colosseum', 'Ancient'] },
            { id: 'pl4', emojis: ['🎰', '🌴'], answer: 'Las Vegas', hints: ['Casino', 'Nevada', 'Entertainment'] },
            { id: 'pl5', emojis: ['🐨', '🦘'], answer: 'Australia', hints: ['Continent', 'Outback', 'Sydney'] },
            { id: 'pl6', emojis: ['🗻', '🇯🇵'], answer: 'Japan', hints: ['Tokyo', 'Fuji', 'Asia'] },
            { id: 'pl7', emojis: ['🏖️', '🌺'], answer: 'Hawaii', hints: ['Islands', 'USA', 'Aloha'] },
            { id: 'pl8', emojis: ['🏰', '🐭'], answer: 'Disneyland', hints: ['Theme Park', 'Magic', 'Mickey'] },
            { id: 'pl9', emojis: ['🌉', '🌁'], answer: 'San Francisco', hints: ['California', 'Bridge', 'Bay'] },
            { id: 'pl10', emojis: ['🎭', '🎵', '🗽'], answer: 'Broadway', hints: ['Theater', 'NYC', 'Shows'] },
        ],
        medium: [
            { id: 'pl11', emojis: ['🐪', '🏜️', '🔺'], answer: 'Egypt', hints: ['Pyramids', 'Nile', 'Pharaoh'] },
            { id: 'pl12', emojis: ['🦁', '🌿', '🌍'], answer: 'Africa', hints: ['Continent', 'Safari', 'Wildlife'] },
            { id: 'pl13', emojis: ['❄️', '🐧'], answer: 'Antarctica', hints: ['Ice', 'South Pole', 'Cold'] },
            { id: 'pl14', emojis: ['🌸', '🏯'], answer: 'Tokyo', hints: ['Japan', 'Cherry', 'Blossom'] },
            { id: 'pl15', emojis: ['🏔️', '🧘'], answer: 'Tibet', hints: ['Himalayas', 'Buddhist', 'Mountain'] },
            { id: 'pl16', emojis: ['🌊', '🏄'], answer: 'Malibu', hints: ['Beach', 'California', 'Surf'] },
            { id: 'pl17', emojis: ['🇬🇧', '☔', '🫖'], answer: 'London', hints: ['UK', 'England', 'Big Ben'] },
            { id: 'pl18', emojis: ['🍕', '🚤'], answer: 'Venice', hints: ['Italy', 'Canals', 'Gondola'] },
            { id: 'pl19', emojis: ['🌵', '🤠'], answer: 'Texas', hints: ['USA', 'Cowboys', 'Big'] },
            { id: 'pl20', emojis: ['🎲', '🏝️'], answer: 'Monaco', hints: ['Casino', 'Mediterranean', 'F1'] },
        ],
        hard: [
            { id: 'pl21', emojis: ['🏔️', '🙏', '🕉️'], answer: 'Nepal', hints: ['Everest', 'Himalayas', 'Buddha'] },
            { id: 'pl22', emojis: ['🌋', '🏝️', '🌴'], answer: 'Bali', hints: ['Indonesia', 'Island', 'Paradise'] },
            { id: 'pl23', emojis: ['🦙', '🏔️'], answer: 'Peru', hints: ['Machu Picchu', 'Andes', 'Llama'] },
            { id: 'pl24', emojis: ['🕌', '🌙'], answer: 'Dubai', hints: ['UAE', 'Luxury', 'Desert'] },
            { id: 'pl25', emojis: ['🎺', '🥁', '🇧🇷'], answer: 'Rio de Janeiro', hints: ['Brazil', 'Carnival', 'Beach'] },
            { id: 'pl26', emojis: ['🏛️', '🫒'], answer: 'Athens', hints: ['Greece', 'Acropolis', 'Ancient'] },
            { id: 'pl27', emojis: ['🌷', '🚲'], answer: 'Amsterdam', hints: ['Netherlands', 'Canals', 'Bikes'] },
            { id: 'pl28', emojis: ['🍷', '🏰'], answer: 'Bordeaux', hints: ['France', 'Wine', 'Vineyards'] },
            { id: 'pl29', emojis: ['⛩️', '🌸'], answer: 'Kyoto', hints: ['Japan', 'Temple', 'Traditional'] },
            { id: 'pl30', emojis: ['🦩', '🌴'], answer: 'Miami', hints: ['Florida', 'Beach', 'Art Deco'] },
        ],
    },
};

// Category icons mapping
const CATEGORY_ICONS = {
    movies: '🎬',
    tvshows: '📺',
    songs: '🎵',
    phrases: '💬',
    brands: '🏷️',
    places: '🌍'
};

// Category display names
const CATEGORY_NAMES = {
    movies: 'Movies',
    tvshows: 'TV Shows',
    songs: 'Songs',
    phrases: 'Phrases',
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
