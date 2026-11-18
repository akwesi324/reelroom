export interface Movie {
  id: number;
  title: string;
  tagline?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  genres: string[];
  director?: string;
  cast?: CastMember[];
  trailer_url?: string;
  live_viewers?: number;
  is_streaming_live?: boolean;
  is_upcoming?: boolean;
  cinema_release_date?: string;
  distributor?: string;
  anticipated_score?: number;
  era?: string;
  imdb_id?: string;
  certification?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userBadge?: 'Host' | 'VIP Critic' | 'Mod' | 'Fanatic' | 'Member';
  badgeColor?: string;
  content: string;
  timestamp: string;
  reactions: { [emoji: string]: number };
}

export interface WatchRoom {
  id: string;
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  movieBackdrop: string;
  hostName: string;
  hostAvatar: string;
  viewersCount: number;
  isLive: boolean;
  currentTimestamp: number; // in seconds
  duration: number; // in seconds
  channel: string;
}
