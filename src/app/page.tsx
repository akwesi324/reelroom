'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import MovieCard from '@/components/MovieCard';
import MovieDetailModal from '@/components/MovieDetailModal';
import WatchPartyModal from '@/components/WatchPartyModal';
import { Movie } from '@/types/movie';
import { CURATED_MOVIES, DEMO_WATCH_ROOMS } from '@/lib/tmdb';
import { Radio, Flame, Award, Film, Sparkles, Tv, Bookmark, Search, Users } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>(CURATED_MOVIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
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

  // Fetch from TMDB API proxy if available
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch('/api/tmdb?endpoint=trending');
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            setMovies(CURATED_MOVIES);
          }
        }
      } catch (e) {}
    }
    fetchMovies();
  }, []);

  // Filtered movies for search
  const filteredMovies = searchQuery
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.director && m.director.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const featuredMovie = movies[0];
  const liveMovies = movies.filter((m) => m.is_streaming_live);
  const topRatedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
  const scifiMovies = movies.filter((m) => m.genres.includes('Sci-Fi') || m.genres.includes('Science Fiction'));
  const actionMovies = movies.filter((m) => m.genres.includes('Action') || m.genres.includes('Adventure'));
  const watchlistedMovies = movies.filter((m) => watchlist.includes(m.id));

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        onSearch={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLiveWatchroom={() => setSelectedMovieForWatchParty(liveMovies[0] || movies[0])}
        watchlistCount={watchlist.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        {/* If user is searching */}
        {searchQuery ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-cyan-400" />
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
                <p className="text-xs text-slate-500">Try searching by genre, title, or acclaimed director.</p>
              </div>
            )}
          </div>
        ) : activeTab === 'watchlist' ? (
          /* Watchlist Tab */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-cyan-400" />
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
          /* Watch Parties / Twitch-style live stage overview */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm uppercase tracking-wider">
                <Radio className="w-4 h-4 animate-pulse" />
                Twitch-Style Live Cinephile Streams
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Live Watchrooms & Discord Lounges
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Join live streaming rooms synchronized in real-time with fellow movie fans, hosts, and verified critics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEMO_WATCH_ROOMS.map((room) => {
                const matchedMovie = movies.find((m) => m.id === room.movieId) || movies[0];
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedMovieForWatchParty(matchedMovie)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-cyan-500/20 hover:border-cyan-400/80 transition-all cursor-pointer shadow-xl hover:shadow-cyan-500/20"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img
                        src={`https://image.tmdb.org/t/p/w780${room.movieBackdrop}`}
                        alt={room.movieTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-xs font-black">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        LIVE STREAM
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/75 text-xs text-slate-200 font-bold backdrop-blur-sm">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        {room.viewersCount.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {room.movieTitle}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <div className="flex items-center gap-2">
                          <img src={room.hostAvatar} alt={room.hostName} className="w-5 h-5 rounded-full object-cover" />
                          <span className="font-semibold text-slate-300">Host: {room.hostName}</span>
                        </div>
                        <span className="font-mono text-cyan-400">{room.channel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
              {/* Live Streaming Rail */}
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

              {/* Trending Rail */}
              <MovieRow
                title="Trending This Week on IMDb"
                subtitle="Most discussed by cinephiles and critics"
                icon={<Flame className="w-6 h-6" />}
                movies={movies}
                onOpenDetails={setSelectedMovieForDetails}
                onJoinWatchParty={setSelectedMovieForWatchParty}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />

              {/* Top Rated Masterpieces */}
              <MovieRow
                title="IMDb Hall of Fame (8.2+)"
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

              {/* Action & Adventure */}
              <MovieRow
                title="Action, Heists & Thrillers"
                subtitle="High-octane blockbusters with pulse-pounding sound"
                icon={<Film className="w-6 h-6" />}
                movies={actionMovies}
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
          <Film className="w-4 h-4 text-cyan-400" />
          <span>ReelRoom — Netflix UI • IMDb Intelligence • Discord Lounge • Twitch Sync</span>
        </div>
        <p>
          Powered by The Movie Database (TMDB) API. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>
    </div>
  );
}
