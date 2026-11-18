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

// Rich curated dataset of real TMDB movies with genuine high-res poster and backdrop paths
export const CURATED_MOVIES: Movie[] = [
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
    trailer_url: 'https://www.youtube.com/embed/Way9Dexny3w',
    cast: [
      { id: 1190668, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: '/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
      { id: 505710, name: 'Zendaya', character: 'Chani', profile_path: '/tyFvN1i9o1jE981eJ4e0d9b4c0Z.jpg' },
      { id: 74568, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: '/6NRiA28kG6e1n9f7v3a8B9C1.jpg' },
      { id: 934, name: 'Javier Bardem', character: 'Stilgar', profile_path: '/pNuKekn1p2o3l4m5n6.jpg' }
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
    trailer_url: 'https://www.youtube.com/embed/uYPbbksJxIg',
    cast: [
      { id: 2037, name: 'Cillian Murphy', character: 'J. Robert Oppenheimer' },
      { id: 3223, name: 'Robert Downey Jr.', character: 'Lewis Strauss' },
      { id: 5081, name: 'Emily Blunt', character: 'Kitty Oppenheimer' },
      { id: 1892, name: 'Matt Damon', character: 'Leslie Groves' }
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
    trailer_url: 'https://www.youtube.com/embed/cqGjhVJWtEg',
    cast: [
      { id: 587506, name: 'Shameik Moore', character: 'Miles Morales' },
      { id: 54693, name: 'Hailee Steinfeld', character: 'Gwen Stacy' },
      { id: 2524, name: 'Oscar Isaac', character: 'Miguel O’Hara / Spider-Man 2099' }
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
    live_viewers: 1420,
    is_streaming_live: false,
    trailer_url: 'https://www.youtube.com/embed/YoHD9XEInc0',
    cast: [
      { id: 6193, name: 'Leonardo DiCaprio', character: 'Dom Cobb' },
      { id: 24045, name: 'Joseph Gordon-Levitt', character: 'Arthur' },
      { id: 27578, name: 'Elliot Page', character: 'Ariadne' },
      { id: 2524, name: 'Tom Hardy', character: 'Eames' }
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
    live_viewers: 950,
    is_streaming_live: false,
    trailer_url: 'https://www.youtube.com/embed/gCcx85zbxz4',
    cast: [
      { id: 30614, name: 'Ryan Gosling', character: 'Officer K' },
      { id: 3, name: 'Harrison Ford', character: 'Rick Deckard' },
      { id: 224194, name: 'Ana de Armas', character: 'Joi' }
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
    trailer_url: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    cast: [
      { id: 10297, name: 'Matthew McConaughey', character: 'Cooper' },
      { id: 1813, name: 'Anne Hathaway', character: 'Brand' },
      { id: 83002, name: 'Jessica Chastain', character: 'Murph' }
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
    live_viewers: 820,
    is_streaming_live: false,
    trailer_url: 'https://www.youtube.com/embed/5xH0RzeSojI',
    cast: [
      { id: 20738, name: 'Song Kang-ho', character: 'Kim Ki-taek' },
      { id: 1253360, name: 'Choi Woo-shik', character: 'Kim Ki-woo' },
      { id: 1243202, name: 'Park So-dam', character: 'Kim Ki-jung' }
    ]
  },
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
    live_viewers: 1650,
    is_streaming_live: true,
    trailer_url: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    cast: [
      { id: 6384, name: 'Keanu Reeves', character: 'Neo' },
      { id: 2975, name: 'Laurence Fishburne', character: 'Morpheus' },
      { id: 530, name: 'Carrie-Anne Moss', character: 'Trinity' }
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
