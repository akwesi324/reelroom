'use client';

import React from 'react';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';
import { Star, Play, Info, Bookmark, BookmarkCheck, Radio, Users } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onOpenDetails: (movie: Movie) => void;
  onJoinWatchParty: (movie: Movie) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export default function MovieCard({
  movie,
  onOpenDetails,
  onJoinWatchParty,
  isWatchlisted,
  onToggleWatchlist,
}: MovieCardProps) {
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';

  return (
    <div className="group relative flex-shrink-0 w-44 sm:w-52 transition-all duration-300 transform hover:scale-105 hover:z-20 cursor-pointer">
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/5 group-hover:border-cyan-500/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 transition-all">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          {/* IMDb Score */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-bold shadow">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>

          {/* Live Stream Pill */}
          {movie.is_streaming_live && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-950/90 border border-cyan-400/80 text-cyan-300 text-[10px] font-extrabold tracking-tight shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              LIVE
            </div>
          )}
        </div>

        {/* Hover Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 space-y-2">
          {movie.is_streaming_live && (
            <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-semibold pb-1">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>{movie.live_viewers?.toLocaleString()} watching</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onJoinWatchParty(movie);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl gradient-reel text-white text-xs font-bold shadow-md shadow-cyan-500/30 hover:brightness-110 active:scale-95 transition-all"
              title="Stream & Chat"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Stream
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(movie);
              }}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-cyan-400/40 transition-all"
              title="IMDb Details"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatchlist(movie);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isWatchlisted
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300'
                  : 'bg-slate-800/90 border-white/10 text-slate-300 hover:text-white'
              }`}
              title={isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
            >
              {isWatchlisted ? (
                <BookmarkCheck className="w-4 h-4 text-cyan-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Title & Metadata below card */}
      <div className="pt-2 px-1">
        <h3
          onClick={() => onOpenDetails(movie)}
          className="text-sm font-bold text-slate-100 truncate group-hover:text-cyan-300 transition-colors"
        >
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-0.5">
          <span>{releaseYear}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
            {movie.genres[0] || 'Feature'}
          </span>
        </div>
      </div>
    </div>
  );
}
