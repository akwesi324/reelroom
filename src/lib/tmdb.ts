import { Movie, Review, WatchRoom } from '../types/movie';

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string, size: 'w300' | 'w500' | 'w1280' | 'original' = 'w500') => {
  if (!path) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop';
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export const formatRuntime = (mins?: number) => {
  if (!mins) return '2h 15m';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
};

// Rich curated dataset spanning the entire history of cinema from 1927 up to 2026+ upcoming releases
export const CURATED_MOVIES: Movie[] = [
  // --- CONTEMPORARY MASTERPIECES ---
  {
    id: 693134,
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5200SV.jpg',
    release_date: '2024-03-01',
    vote_average: 8.4,
    vote_count: 5320,
    runtime: 166,
    genres: ['Science Fiction', 'Adventure', 'Action', 'Drama'],
    director: 'Denis Villeneuve',
    certification: 'PG-13',
    live_viewers: 3420,
    is_streaming_live: true,
    era: 'Contemporary (2020-Present)',
    trailer_url: 'https://www.youtube.com/embed/Way9Dexny3w',
    cast: [
      { id: 1190668, name: 'Timothée Chalamet', character: 'Paul Atreides' },
      { id: 505710, name: 'Zendaya', character: 'Chani' },
      { id: 74568, name: 'Rebecca Ferguson', character: 'Lady Jessica' }
    ]
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    tagline: 'The world forever changes.',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II, examining the moral weight and political aftermath of scientific breakthroughs.',
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop_path: '/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
    release_date: '2023-07-21',
    vote_average: 8.1,
    vote_count: 8940,
    runtime: 180,
    genres: ['Drama', 'History', 'Biography'],
    director: 'Christopher Nolan',
    certification: 'R',
    live_viewers: 1890,
    is_streaming_live: true,
    era: 'Contemporary (2020-Present)',
    trailer_url: 'https://www.youtube.com/embed/uYPbbksJxIg',
    cast: [
      { id: 2037, name: 'Cillian Murphy', character: 'J. Robert Oppenheimer' },
      { id: 3223, name: 'Robert Downey Jr.', character: 'Lewis Strauss' },
      { id: 5081, name: 'Emily Blunt', character: 'Kitty Oppenheimer' }
    ]
  },
  {
    id: 569094,
    title: 'Spider-Man: Across the Spider-Verse',
    tagline: 'It’s how you wear the mask that matters.',
    overview: 'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider-Society.',
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    release_date: '2023-06-02',
    vote_average: 8.3,
    vote_count: 6712,
    runtime: 140,
    genres: ['Animation', 'Action', 'Adventure', 'Sci-Fi'],
    director: 'Joaquim Dos Santos, Kemp Powers',
    certification: 'PG',
    live_viewers: 2750,
    is_streaming_live: true,
    era: 'Contemporary (2020-Present)',
    trailer_url: 'https://www.youtube.com/embed/cqGjhVJWtEg',
    cast: [
      { id: 587506, name: 'Shameik Moore', character: 'Miles Morales' },
      { id: 54693, name: 'Hailee Steinfeld', character: 'Gwen Stacy' }
    ]
  },
  {
    id: 496243,
    title: 'Parasite',
    tagline: 'Act like you own the place.',
    overview: 'All unemployed, Ki-taek\'s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.',
    poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    backdrop_path: '/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg',
    release_date: '2019-11-08',
    vote_average: 8.5,
    vote_count: 17800,
    runtime: 132,
    genres: ['Comedy', 'Thriller', 'Drama'],
    director: 'Bong Joon-ho',
    certification: 'R',
    era: 'Modern Classics (2000-2019)',
    trailer_url: 'https://www.youtube.com/embed/5xH0RzeSojI',
    cast: [
      { id: 20738, name: 'Song Kang-ho', character: 'Kim Ki-taek' },
      { id: 1253360, name: 'Choi Woo-shik', character: 'Kim Ki-woo' }
    ]
  },
  {
    id: 335984,
    title: 'Blade Runner 2049',
    tagline: 'There\'s still a page left.',
    overview: 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what\'s left of society into chaos.',
    poster_path: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    backdrop_path: '/ilRyAZwN39Rtq42vncLNWLzYHgL.jpg',
    release_date: '2017-10-06',
    vote_average: 8.0,
    vote_count: 13200,
    runtime: 164,
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    director: 'Denis Villeneuve',
    certification: 'R',
    era: 'Modern Classics (2000-2019)',
    trailer_url: 'https://www.youtube.com/embed/gCcx85zbxz4',
    cast: [
      { id: 30614, name: 'Ryan Gosling', character: 'Officer K' },
      { id: 3, name: 'Harrison Ford', character: 'Rick Deckard' }
    ]
  },
  {
    id: 157336,
    title: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    release_date: '2014-11-07',
    vote_average: 8.4,
    vote_count: 34500,
    runtime: 169,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    certification: 'PG-13',
    live_viewers: 2100,
    is_streaming_live: true,
    era: 'Modern Classics (2000-2019)',
    trailer_url: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    cast: [
      { id: 10297, name: 'Matthew McConaughey', character: 'Cooper' },
      { id: 1813, name: 'Anne Hathaway', character: 'Brand' }
    ]
  },
  {
    id: 27205,
    title: 'Inception',
    tagline: 'Your mind is the scene of the crime.',
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life in exchange for a seemingly impossible task: inception.',
    poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    release_date: '2010-07-16',
    vote_average: 8.4,
    vote_count: 36100,
    runtime: 148,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    director: 'Christopher Nolan',
    certification: 'PG-13',
    era: 'Modern Classics (2000-2019)',
    trailer_url: 'https://www.youtube.com/embed/YoHD9XEInc0',
    cast: [
      { id: 6193, name: 'Leonardo DiCaprio', character: 'Dom Cobb' },
      { id: 24045, name: 'Joseph Gordon-Levitt', character: 'Arthur' }
    ]
  },
  {
    id: 155,
    title: 'The Dark Knight',
    tagline: 'Welcome to a world without rules.',
    overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent, but finds himself up against a rising criminal mastermind known as the Joker.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
    release_date: '2008-07-18',
    vote_average: 8.5,
    vote_count: 32000,
    runtime: 152,
    genres: ['Drama', 'Action', 'Crime'],
    director: 'Christopher Nolan',
    certification: 'PG-13',
    era: 'Modern Classics (2000-2019)',
    trailer_url: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    cast: [
      { id: 3894, name: 'Christian Bale', character: 'Bruce Wayne / Batman' },
      { id: 1810, name: 'Heath Ledger', character: 'Joker' }
    ]
  },

  // --- 1990s RENAISSANCE ---
  {
    id: 603,
    title: 'The Matrix',
    tagline: 'Welcome to the Real World.',
    overview: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/7u3pxc0K1uhny2GUHGPD9xADsqC.jpg',
    release_date: '1999-03-30',
    vote_average: 8.2,
    vote_count: 25100,
    runtime: 136,
    genres: ['Action', 'Sci-Fi'],
    director: 'Lana & Lilly Wachowski',
    certification: 'R',
    era: '1990s Renaissance',
    trailer_url: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    cast: [
      { id: 6384, name: 'Keanu Reeves', character: 'Neo' },
      { id: 2975, name: 'Laurence Fishburne', character: 'Morpheus' }
    ]
  },
  {
    id: 278,
    title: 'The Shawshank Redemption',
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    overview: 'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.',
    poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    release_date: '1994-09-23',
    vote_average: 8.7,
    vote_count: 27000,
    runtime: 142,
    genres: ['Drama', 'Crime'],
    director: 'Frank Darabont',
    certification: 'R',
    era: '1990s Renaissance',
    trailer_url: 'https://www.youtube.com/embed/PLl99DlL6b4',
    cast: [
      { id: 504, name: 'Tim Robbins', character: 'Andy Dufresne' },
      { id: 192, name: 'Morgan Freeman', character: 'Ellis Boyd "Red" Redding' }
    ]
  },
  {
    id: 680,
    title: 'Pulp Fiction',
    tagline: 'Just because you are a character doesn\'t mean that you have character.',
    overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in four tales of violence and redemption.',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    release_date: '1994-09-10',
    vote_average: 8.5,
    vote_count: 27300,
    runtime: 154,
    genres: ['Thriller', 'Crime'],
    director: 'Quentin Tarantino',
    certification: 'R',
    era: '1990s Renaissance',
    trailer_url: 'https://www.youtube.com/embed/s7EdQ4FqbhY',
    cast: [
      { id: 8891, name: 'John Travolta', character: 'Vincent Vega' },
      { id: 2231, name: 'Samuel L. Jackson', character: 'Jules Winnfield' }
    ]
  },

  // --- NEW HOLLYWOOD & GOLDEN 1970s - 1980s ---
  {
    id: 78,
    title: 'Blade Runner',
    tagline: 'Man has made his match... now it\'s his problem.',
    overview: 'In the smog-choked dystopian Los Angeles of 2019, blade runner Rick Deckard is called out of retirement to terminate a quartet of replicants who have escaped to Earth seeking their creator.',
    poster_path: '/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg',
    backdrop_path: '/e2Cu12P4fU3n04Y7i9kR7jJ8lB9.jpg',
    release_date: '1982-06-25',
    vote_average: 7.9,
    vote_count: 13500,
    runtime: 117,
    genres: ['Sci-Fi', 'Drama', 'Thriller'],
    director: 'Ridley Scott',
    certification: 'R',
    era: 'New Hollywood & 80s (1970-1989)',
    trailer_url: 'https://www.youtube.com/embed/eogpIG53Cjc',
    cast: [
      { id: 3, name: 'Harrison Ford', character: 'Rick Deckard' },
      { id: 585, name: 'Rutger Hauer', character: 'Roy Batty' }
    ]
  },
  {
    id: 238,
    title: 'The Godfather',
    tagline: 'An offer you can\'t refuse.',
    overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch Vito Corleone barely survives an attempt on his life, his youngest son Michael steps in to take care of the would-be killers.',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    release_date: '1972-03-14',
    vote_average: 8.7,
    vote_count: 20200,
    runtime: 175,
    genres: ['Drama', 'Crime'],
    director: 'Francis Ford Coppola',
    certification: 'R',
    era: 'New Hollywood & 80s (1970-1989)',
    trailer_url: 'https://www.youtube.com/embed/UaVTIH8mujA',
    cast: [
      { id: 3084, name: 'Marlon Brando', character: 'Don Vito Corleone' },
      { id: 1158, name: 'Al Pacino', character: 'Michael Corleone' }
    ]
  },

  // --- DAWN OF CINEMA & GOLDEN AGE (1920s - 1960s) ---
  {
    id: 62,
    title: '2001: A Space Odyssey',
    tagline: 'An epic drama of adventure and exploration.',
    overview: 'Humanity finds a mysterious, obviously artificial object buried beneath the lunar surface and, with the intelligent computer H.A.L. 9000, sets off on a quest.',
    poster_path: '/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg',
    backdrop_path: '/w5CO3gE8e1M8nJ2bV2s7fG9Y9e9.jpg',
    release_date: '1968-04-02',
    vote_average: 8.1,
    vote_count: 11200,
    runtime: 149,
    genres: ['Sci-Fi', 'Mystery', 'Adventure'],
    director: 'Stanley Kubrick',
    certification: 'G',
    era: 'Dawn of Cinema (1920-1969)',
    trailer_url: 'https://www.youtube.com/embed/oR_e9y-bka0',
    cast: [
      { id: 247, name: 'Keir Dullea', character: 'Dr. Dave Bowman' },
      { id: 1243, name: 'Gary Lockwood', character: 'Dr. Frank Poole' }
    ]
  },
  {
    id: 389,
    title: '12 Angry Men',
    tagline: 'Life is in their hands. Death is on their minds.',
    overview: 'The defense and the prosecution have rested and the jury is filing into the jury room to decide if an 18-year-old youth is guilty of killing his father. A seemingly open-and-shut case turns into a study of jurors\' personal prejudices.',
    poster_path: '/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
    backdrop_path: '/qqHMGPhBwZuvR939JEI6688WdY9.jpg',
    release_date: '1957-04-10',
    vote_average: 8.5,
    vote_count: 8500,
    runtime: 96,
    genres: ['Drama'],
    director: 'Sidney Lumet',
    certification: 'Not Rated',
    era: 'Dawn of Cinema (1920-1969)',
    trailer_url: 'https://www.youtube.com/embed/TEN-2uTi2c0',
    cast: [
      { id: 4958, name: 'Henry Fonda', character: 'Juror 8' },
      { id: 2439, name: 'Lee J. Cobb', character: 'Juror 3' }
    ]
  },
  {
    id: 289,
    title: 'Casablanca',
    tagline: 'They had a date with fate in Casablanca!',
    overview: 'In Casablanca, Morocco in December 1941, a cynical American expatriate meets a former lover, with unforeseen complications during World War II.',
    poster_path: '/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg',
    backdrop_path: '/w2uH2qG7t1a3jY0l8x8F6o4D2e.jpg',
    release_date: '1942-11-26',
    vote_average: 8.2,
    vote_count: 5300,
    runtime: 102,
    genres: ['Drama', 'Romance', 'War'],
    director: 'Michael Curtiz',
    certification: 'PG',
    era: 'Dawn of Cinema (1920-1969)',
    trailer_url: 'https://www.youtube.com/embed/BKbK9V0aCj4',
    cast: [
      { id: 379, name: 'Humphrey Bogart', character: 'Rick Blaine' },
      { id: 101, name: 'Ingrid Bergman', character: 'Ilsa Lund' }
    ]
  },
  {
    id: 19,
    title: 'Metropolis',
    tagline: 'There can be no understanding between the hands and the brain unless the heart acts as mediator.',
    overview: 'In a futuristic city sharply divided between the working class and the city planners, the son of the city\'s mastermind falls in love with a working-class prophet who predicts the coming of a savior to mediate their differences.',
    poster_path: '/qsgpmipzkC15wR9eP4o444yvj8f.jpg',
    backdrop_path: '/4l3vA1k7sB2d1G0h3f6c8d7e9.jpg',
    release_date: '1927-01-10',
    vote_average: 8.2,
    vote_count: 2700,
    runtime: 153,
    genres: ['Sci-Fi', 'Drama'],
    director: 'Fritz Lang',
    certification: 'Not Rated',
    era: 'Dawn of Cinema (1920-1969)',
    trailer_url: 'https://www.youtube.com/embed/gdtZv36auQU',
    cast: [
      { id: 182, name: 'Alfred Abel', character: 'Joh Fredersen' },
      { id: 183, name: 'Gustav Fröhlich', character: 'Freder' }
    ]
  },

  // --- UPCOMING MOVIES (NEW MOVIES COMING OUT) ---
  {
    id: 1061474,
    title: 'Superman',
    tagline: 'Truth, Justice and the Human Way.',
    overview: 'Follows the titular superhero as he reconciles his heritage with his human upbringing. He is the embodiment of truth, justice and the American way in a world that views kindness as old-fashioned.',
    poster_path: '/fLkmfW8Z0P00Yc2vjMekfM1V55i.jpg',
    backdrop_path: '/8pkbpW6t0xH6x6Gj1b9h7l5D2v.jpg',
    release_date: '2025-07-11',
    vote_average: 8.6,
    vote_count: 1420,
    runtime: 145,
    genres: ['Action', 'Science Fiction', 'Adventure'],
    director: 'James Gunn',
    certification: 'PG-13',
    is_upcoming: true,
    era: 'Upcoming Cinema',
    trailer_url: 'https://www.youtube.com/embed/uhUht6vAsMY',
    cast: [
      { id: 1392137, name: 'David Corenswet', character: 'Clark Kent / Superman' },
      { id: 1253360, name: 'Rachel Brosnahan', character: 'Lois Lane' },
      { id: 74568, name: 'Nicholas Hoult', character: 'Lex Luthor' }
    ]
  },
  {
    id: 83533,
    title: 'Avatar: Fire and Ash',
    tagline: 'Return to Pandora. Discover the Ash People.',
    overview: 'Jake Sully and Neytiri encounter a new, aggressive volcanic clan of Na\'vi known as the "Ash People" led by Varang, testing their family bonds across the hostile landscapes of Pandora.',
    poster_path: '/7m31b7r7LgZ9U50k4xK3j4B56C.jpg',
    backdrop_path: '/5x7k2r9y4m2d1a3b8c7e6f5g4.jpg',
    release_date: '2025-12-19',
    vote_average: 8.7,
    vote_count: 980,
    runtime: 190,
    genres: ['Science Fiction', 'Action', 'Adventure'],
    director: 'James Cameron',
    certification: 'PG-13',
    is_upcoming: true,
    era: 'Upcoming Cinema',
    trailer_url: 'https://www.youtube.com/embed/d9MyW72ELq0',
    cast: [
      { id: 65731, name: 'Sam Worthington', character: 'Jake Sully' },
      { id: 8691, name: 'Zoe Saldaña', character: 'Neytiri' },
      { id: 10205, name: 'Sigourney Weaver', character: 'Kiri' }
    ]
  },
  {
    id: 414906,
    title: 'The Batman Part II',
    tagline: 'The shadows deepen over Gotham.',
    overview: 'Batman descends deeper into Gotham City\'s corrupt underbelly as a severe winter freezes the flooded city and new criminal syndicates emerge to challenge his crusade.',
    poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop_path: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    release_date: '2026-10-02',
    vote_average: 8.8,
    vote_count: 1250,
    runtime: 170,
    genres: ['Crime', 'Mystery', 'Action', 'Drama'],
    director: 'Matt Reeves',
    certification: 'PG-13',
    is_upcoming: true,
    era: 'Upcoming Cinema',
    trailer_url: 'https://www.youtube.com/embed/mqqft2x_Aa4',
    cast: [
      { id: 11288, name: 'Robert Pattinson', character: 'Bruce Wayne / The Batman' },
      { id: 134774, name: 'Andy Serkis', character: 'Alfred Pennyworth' },
      { id: 1243, name: 'Colin Farrell', character: 'Oswald Cobblepot / The Penguin' }
    ]
  },
  {
    id: 575264,
    title: 'Mission: Impossible - The Final Reckoning',
    tagline: 'Our lives are the sum of our choices.',
    overview: 'Ethan Hunt and his IMF team embark on their most dangerous mission yet: tracking down the terrifying AI entity known as the Entity before it falls into the wrong hands.',
    poster_path: '/v0LpYv39P1wLkm4eG8m1C2d3e.jpg',
    backdrop_path: '/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
    release_date: '2025-05-23',
    vote_average: 8.4,
    vote_count: 820,
    runtime: 165,
    genres: ['Action', 'Thriller', 'Adventure'],
    director: 'Christopher McQuarrie',
    certification: 'PG-13',
    is_upcoming: true,
    era: 'Upcoming Cinema',
    trailer_url: 'https://www.youtube.com/embed/NOhDy6ZzsA0',
    cast: [
      { id: 500, name: 'Tom Cruise', character: 'Ethan Hunt' },
      { id: 52886, name: 'Hayley Atwell', character: 'Grace' },
      { id: 55638, name: 'Simon Pegg', character: 'Benji Dunn' }
    ]
  }
];

export const DEMO_WATCH_ROOMS: WatchRoom[] = [
  {
    id: 'room-dune-2',
    movieId: 693134,
    movieTitle: 'Dune: Part Two',
    moviePoster: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    movieBackdrop: '/xOMo8BRK7PfcJv9JCnx7s5200SV.jpg',
    hostName: 'ArrakisPilot',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop',
    viewersCount: 3420,
    isLive: true,
    currentTimestamp: 2840,
    duration: 9960,
    channel: '#dune-watchparty'
  },
  {
    id: 'room-spider-verse',
    movieId: 569094,
    movieTitle: 'Spider-Man: Across the Spider-Verse',
    moviePoster: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    movieBackdrop: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    hostName: 'MilesFan_2099',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop',
    viewersCount: 2750,
    isLive: true,
    currentTimestamp: 1920,
    duration: 8400,
    channel: '#multiverse-chat'
  },
  {
    id: 'room-interstellar',
    movieId: 157336,
    movieTitle: 'Interstellar',
    moviePoster: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    movieBackdrop: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    hostName: 'CosmicCinema',
    hostAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop',
    viewersCount: 2100,
    isLive: true,
    currentTimestamp: 4200,
    duration: 10140,
    channel: '#blackhole-deepdive'
  }
];

export const DEMO_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'CinephileX',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop',
    rating: 9.5,
    date: '2 days ago',
    likes: 342,
    content: 'A transcendent cinematic masterclass. The sound design alone rumbles right through your chest, and the visual scope makes IMAX feel almost too small.'
  },
  {
    id: 'rev-2',
    author: 'SciFi_Oracle',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop',
    rating: 9.0,
    date: '1 week ago',
    likes: 189,
    content: 'Sets a new standard for modern epic adaptations. The character tension and pacing deliver a pulse-pounding third act that will be discussed for decades.'
  },
  {
    id: 'rev-3',
    author: 'FilmFanatic99',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop',
    rating: 8.5,
    date: '2 weeks ago',
    likes: 95,
    content: 'Denis Villeneuve proves once again he is a generational director. The chemistry and world-building are unparalleled.'
  }
];
