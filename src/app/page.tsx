'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import MovieCard from '@/components/MovieCard';
import MovieDetailModal from '@/components/MovieDetailModal';
import WatchPartyModal from '@/components/WatchPartyModal';
import { Movie } from '@/types/movie';
import { CURATED_MOVIES, DEMO_WATCH_ROOMS, formatReleaseDate } from '@/lib/tmdb';
import { Radio, Flame, Award, Film, Sparkles, Tv, Bookmark, Search, Users, Calendar, History, Clapperboard, Clock } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>(CURATED_MOVIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [selectedMovieForDetails, setSelectedMovieForDetails] = useState<Movie | null>(null);
  const [selectedMovieForWatchParty, setSelectedMovieForWatchParty] = useState<Movie | null>(null);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reelroom_watchlist');
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Save watchlist to localStorage
  const handleToggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      const next = prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id];
      try {
        localStorage.setItem('reelroom_watchlist', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Groupings
  const liveMovies = movies.filter((m) => m.is_streaming_live);
  const hasLiveParties = liveMovies.length > 0;
  const upcomingMovies = movies.filter((m) => m.is_upcoming);
  const releasedMovies = movies.filter((m) => !m.is_upcoming);
  const chronologicalMovies = [...movies].sort(
    (a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
  );

  // Eras without brackets
  const eras = [
    'All',
    'Dawn of Cinema 1920–1969',
    'New Hollywood & 80s 1970–1989',
    '1990s Renaissance',
    'Modern Classics 2000–2019',
    'Contemporary 2020–Present',
    'Upcoming Cinema 2025–2026',
  ];

  const eraFilteredMovies = selectedEra === 'All'
    ? chronologicalMovies
    : chronologicalMovies.filter((m) => m.era === selectedEra);

  // Filtered movies for search
  const filteredMovies = searchQuery
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.director && m.director.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.release_date && m.release_date.includes(searchQuery))
      )
    : [];

  const featuredMovie = upcomingMovies[0] || movies[0];
  const topRatedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
  const scifiMovies = movies.filter((m) => m.genres.includes('Sci-Fi') || m.genres.includes('Science Fiction'));
  const classicPioneers = movies.filter((m) => new Date(m.release_date).getFullYear() < 2000);
  const watchlistedMovies = movies.filter((m) => watchlist.includes(m.id));

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex flex-col selection:bg-pink-500 selection:text-black">
      {/* Navigation Bar with far-left Discord user avatar and dropdown */}
      <Navbar
        onSearch={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLiveWatchroom={() => setSelectedMovieForWatchParty(liveMovies[0] || movies[0])}
        watchlistCount={watchlist.length}
        hasLiveParties={hasLiveParties}
        upcomingCount={upcomingMovies.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        {/* Search Results View */}
        {searchQuery ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-pink-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Search Results for &ldquo;{searchQuery}&rdquo;
                <span className="text-sm font-semibold text-slate-400 ml-2">({filteredMovies.length} found)</span>
              </h2>
            </div>

            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onOpenDetails={setSelectedMovieForDetails}
                    onJoinWatchParty={setSelectedMovieForWatchParty}
                    isWatchlisted={watchlist.includes(movie.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-3">
                <p className="text-lg font-bold text-slate-400">No cinephile matches found for &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-slate-500">Try searching by genre, title, year (e.g. 1927, 2025), or director.</p>
              </div>
            )}
          </div>
        ) : activeTab === 'upcoming' ? (
          /* TAB 1: Upcoming Movies (New Movies Coming Out) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-pink-400 font-extrabold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                Next Era of Cinema • 2025 & Beyond
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Upcoming Releases & Premiere Countdowns
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Stay ahead of the curve. Watch official trailers, check release schedules, and bookmark upcoming blockbusters for launch watchparties.
              </p>
            </div>

            {/* Upcoming Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="rounded-2xl bg-slate-900/80 border border-pink-500/30 p-5 flex flex-col sm:flex-row gap-5 hover:border-pink-400 transition-all shadow-xl hover:shadow-pink-500/10"
                >
                  <div
                    onClick={() => setSelectedMovieForDetails(movie)}
                    className="w-full sm:w-44 aspect-[2/3] rounded-xl overflow-hidden shrink-0 bg-slate-950 cursor-pointer shadow-lg"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-950 border border-pink-400 text-pink-300">
                          <Calendar className="w-3 h-3" />
                          {formatReleaseDate(movie.release_date)}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          Director: {movie.director}
                        </span>
                      </div>

                      <h3
                        onClick={() => setSelectedMovieForDetails(movie)}
                        className="text-xl font-bold text-white hover:text-pink-300 transition-colors cursor-pointer"
                      >
                        {movie.title}
                      </h3>

                      {movie.tagline && (
                        <p className="text-xs italic text-pink-300/80">
                          &ldquo;{movie.tagline}&rdquo;
                        </p>
                      )}

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {movie.overview}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setSelectedMovieForWatchParty(movie)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-reel text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:brightness-110 active:scale-95 transition-all"
                      >
                        <Clapperboard className="w-4 h-4" />
                        Watch Trailer
                      </button>

                      <button
                        onClick={() => handleToggleWatchlist(movie)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          watchlist.includes(movie.id)
                            ? 'bg-red-950 border-pink-400 text-pink-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                        }`}
                        title="Add to upcoming premiere reminder"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'history' ? (
          /* TAB 2: Cinema History without brackets */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                <History className="w-4 h-4" />
                From Metropolis 1927 to Contemporary Blockbusters
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                The History of Cinema Timeline
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl">
                Explore milestone cinema across historical eras: from Fritz Lang&apos;s pioneering German Expressionism to the Golden Age, New Hollywood, and modern sci-fi epics.
              </p>
            </div>

            {/* Era Filter Badges without brackets */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {eras.map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedEra === era
                      ? 'gradient-reel text-white shadow-md shadow-pink-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>

            {/* Chronological Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-4">
              {eraFilteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onOpenDetails={setSelectedMovieForDetails}
                  onJoinWatchParty={setSelectedMovieForWatchParty}
                  isWatchlisted={watchlist.includes(movie.id)}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              ))}
            </div>
          </div>
        ) : activeTab === 'watchlist' ? (
          /* Watchlist Tab */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Your Cinephile Watchlist
                <span className="text-sm font-semibold text-slate-400 ml-2">({watchlistedMovies.length} saved)</span>
              </h2>
            </div>

            {watchlistedMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {watchlistedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onOpenDetails={setSelectedMovieForDetails}
                    onJoinWatchParty={setSelectedMovieForWatchParty}
                    isWatchlisted={true}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-300">Your Watchlist is empty</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the bookmark icon on any movie poster to bookmark it for your next streaming watch party!
                </p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-5 py-2.5 rounded-xl gradient-reel text-white text-xs font-bold"
                >
                  Browse Movies
                </button>
              </div>
            )}
          </div>
        ) : activeTab === 'watchrooms' ? (
          /* Watch Parties / Live stage overview */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-pink-400 font-extrabold text-sm uppercase tracking-wider">
                <Radio className={`w-4 h-4 ${hasLiveParties ? 'animate-pulse text-pink-400' : 'text-slate-400'}`} />
                {hasLiveParties ? 'Twitch-Style Live Cinephile Streams' : 'Watchparty Lounges'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Live Watchrooms & Discord Lounges
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Join live streaming rooms synchronized in real-time with fellow movie fans, hosts, and verified critics.
              </p>
            </div>

            {hasLiveParties ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DEMO_WATCH_ROOMS.map((room) => {
                  const matchedMovie = movies.find((m) => m.id === room.movieId) || movies[0];
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedMovieForWatchParty(matchedMovie)}
                      className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-pink-500/20 hover:border-pink-400/80 transition-all cursor-pointer shadow-xl hover:shadow-pink-500/20"
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img
                          src={`https://image.tmdb.org/t/p/w780${room.movieBackdrop}`}
                          alt={room.movieTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/90 border border-pink-400 text-pink-300 text-xs font-black">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                          LIVE STREAM
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/75 text-xs text-slate-200 font-bold backdrop-blur-sm">
                          <Users className="w-3.5 h-3.5 text-pink-400" />
                          {room.viewersCount.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                          {room.movieTitle}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                          <div className="flex items-center gap-2">
                            <img src={room.hostAvatar} alt={room.hostName} className="w-5 h-5 rounded-full object-cover" />
                            <span className="font-semibold text-slate-300">Host: {room.hostName}</span>
                          </div>
                          <span className="font-mono text-pink-400">{room.channel}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 p-8 rounded-2xl bg-slate-900/40 border border-white/5 space-y-4 max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">No Live Watch Parties Right Now</h3>
                <p className="text-xs text-slate-400">
                  All stream rooms are currently off-air. You can browse classic films or start a watch party for any movie in the catalog!
                </p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-5 py-2.5 rounded-xl gradient-reel text-white text-xs font-bold"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Default Browse & Explore View (Netflix UI + IMDb depth) */
          <>
            {/* Cinematic Hero */}
            <HeroBanner
              movie={featuredMovie}
              onOpenDetails={setSelectedMovieForDetails}
              onJoinWatchParty={setSelectedMovieForWatchParty}
              isWatchlisted={watchlist.includes(featuredMovie?.id)}
              onToggleWatchlist={handleToggleWatchlist}
            />

            {/* Rails */}
            <div className="relative z-20 -mt-10 space-y-4">
              {/* Only show Live Streaming Rail if there ARE live watch parties */}
              {hasLiveParties && (
                <MovieRow
                  title="Now Streaming • Live Watchparties"
                  subtitle="Join ongoing rooms with synced audio and active Discord chats"
                  icon={<Radio className="w-6 h-6 animate-pulse" />}
                  movies={liveMovies}
                  onOpenDetails={setSelectedMovieForDetails}
                  onJoinWatchParty={setSelectedMovieForWatchParty}
                  watchlist={watchlist}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {/* Upcoming Releases Rail without brackets */}
              <MovieRow
                title="Coming Soon • Upcoming Cinema 2025–2026"
                subtitle="Upcoming blockbusters, official trailers, and premiere dates"
                icon={<Calendar className="w-6 h-6 text-pink-400" />}
                movies={upcomingMovies}
                onOpenDetails={setSelectedMovieForDetails}
                onJoinWatchParty={setSelectedMovieForWatchParty}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />

              {/* Trending Rail */}
              <MovieRow
                title="Trending This Week on IMDb"
                subtitle="Most discussed by cinephiles and critics"
                icon={<Flame className="w-6 h-6" />}
                movies={releasedMovies}
                onOpenDetails={setSelectedMovieForDetails}
                onJoinWatchParty={setSelectedMovieForWatchParty}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />

              {/* Golden Pioneers & Classics without brackets */}
              <MovieRow
                title="Cinema History Pioneers 1927–1999"
                subtitle="Groundbreaking masterpieces that shaped the art form"
                icon={<History className="w-6 h-6 text-amber-400" />}
                movies={classicPioneers}
                onOpenDetails={setSelectedMovieForDetails}
                onJoinWatchParty={setSelectedMovieForWatchParty}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />

              {/* Top Rated Masterpieces without brackets */}
              <MovieRow
                title="IMDb Hall of Fame 8.2+"
                subtitle="All-time highest rated films by verified viewers"
                icon={<Award className="w-6 h-6 text-amber-400" />}
                movies={topRatedMovies}
                onOpenDetails={setSelectedMovieForDetails}
                onJoinWatchParty={setSelectedMovieForWatchParty}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />

              {/* Sci-Fi Arenas */}
              <MovieRow
                title="Sci-Fi & Cyberpunk Arenas"
                subtitle="Dystopian futures, interstellar exploration, and neon realities"
                icon={<Sparkles className="w-6 h-6" />}
                movies={scifiMovies}
                onOpenDetails={setSelectedMovieForDetails}
                onJoinWatchParty={setSelectedMovieForWatchParty}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />
            </div>
          </>
        )}
      </main>

      {/* IMDb Deep Dive Modal */}
      {selectedMovieForDetails && (
        <MovieDetailModal
          movie={selectedMovieForDetails}
          onClose={() => setSelectedMovieForDetails(null)}
          onJoinWatchParty={(m) => {
            setSelectedMovieForDetails(null);
            setSelectedMovieForWatchParty(m);
          }}
          isWatchlisted={watchlist.includes(selectedMovieForDetails.id)}
          onToggleWatchlist={handleToggleWatchlist}
        />
      )}

      {/* Twitch Streaming Stage + Discord Chatroom Split Modal */}
      {selectedMovieForWatchParty && (
        <WatchPartyModal
          movie={selectedMovieForWatchParty}
          onClose={() => setSelectedMovieForWatchParty(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-400 font-semibold">
          <Film className="w-4 h-4 text-pink-400" />
          <span>ReelRoom — Netflix UI • IMDb Intelligence • Discord Lounge • Twitch Sync</span>
        </div>
        <p>
          Spanning the history of cinema from Metropolis 1927 to future 2026+ releases. Powered by The Movie Database TMDB API.
        </p>
      </footer>
    </div>
  );
}
