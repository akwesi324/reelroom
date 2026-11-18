'use client';

import React from 'react';
import { Movie } from '@/types/movie';
import { getImageUrl, formatRuntime, formatReleaseDate } from '@/lib/tmdb';
import { Play, Info, Star, Radio, Users, Bookmark, BookmarkCheck, Calendar } from 'lucide-react';

interface HeroBannerProps {
  movie: Movie;
  onOpenDetails: (movie: Movie) => void;
  onJoinWatchParty: (movie: Movie) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export default function HeroBanner({
  movie,
  onOpenDetails,
  onJoinWatchParty,
  isWatchlisted,
  onToggleWatchlist,
}: HeroBannerProps) {
  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden select-none">
      {/* Background Cinematic Poster / Backdrop */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover object-top scale-105 animate-fade-in"
        />
        {/* Deep darkened gradient overlay for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080f] via-[#06080f]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080f]/60 via-transparent to-transparent h-24" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {movie.is_upcoming ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-bold tracking-wide shadow-lg shadow-cyan-500/20">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                COMING TO THEATERS • {formatReleaseDate(movie.release_date)}
              </span>
            ) : movie.is_streaming_live ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-bold tracking-wide shadow-lg shadow-cyan-500/20">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                TWITCH WATCHPARTY LIVE
                <span className="flex items-center gap-1 pl-1 text-[11px] text-cyan-200">
                  <Users className="w-3 h-3" />
                  {movie.live_viewers?.toLocaleString()}
                </span>
              </span>
            ) : null}

            {/* IMDb Golden Score Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <span className="bg-amber-400 text-black px-1.5 py-0.2 rounded font-black text-[11px] tracking-tight">
                IMDb
              </span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{movie.vote_average.toFixed(1)}/10</span>
              <span className="text-[11px] text-amber-200/60 font-normal">
                ({movie.vote_count.toLocaleString()})
              </span>
            </div>

            {/* Runtime & Certification */}
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
              {movie.certification || 'PG-13'}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {formatRuntime(movie.runtime)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-xl">
            {movie.title}
          </h1>

          {/* Tagline */}
          {movie.tagline && (
            <p className="text-sm sm:text-base font-medium italic text-cyan-300/90 tracking-wide">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          {/* Overview */}
          <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed drop-shadow">
            {movie.overview}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 pt-1">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onJoinWatchParty(movie)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-reel gradient-reel-hover text-white text-sm font-bold tracking-wide shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-white" />
              {movie.is_upcoming ? 'Watch Official Trailer' : 'Enter Live Watchroom'}
            </button>

            <button
              onClick={() => onOpenDetails(movie)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-100 text-sm font-semibold transition-all shadow-md"
            >
              <Info className="w-4 h-4 text-cyan-400" />
              IMDb Cast & Details
            </button>

            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`p-3 rounded-xl border transition-all ${
                isWatchlisted
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
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
    </div>
  );
}
