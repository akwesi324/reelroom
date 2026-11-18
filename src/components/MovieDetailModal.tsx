'use client';

import React, { useState } from 'react';
import { Movie } from '@/types/movie';
import { getImageUrl, formatRuntime, formatReleaseDate, DEMO_REVIEWS } from '@/lib/tmdb';
import { X, Star, Play, Users, Calendar, Clock, Film, Award, ThumbsUp, Bookmark, BookmarkCheck } from 'lucide-react';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
  onJoinWatchParty: (movie: Movie) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export default function MovieDetailModal({
  movie,
  onClose,
  onJoinWatchParty,
  isWatchlisted,
  onToggleWatchlist,
}: MovieDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'reviews' | 'specs'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Backdrop Banner with Close Button */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-[#090e1a]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all shadow-lg z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Play Trailer Floating Button */}
          {movie.trailer_url && (
            <button
              onClick={() => onJoinWatchParty(movie)}
              className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl gradient-reel text-white text-xs font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              Watch Live Stream
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 -mt-20 relative z-10">
          {/* Header Row: Poster + Key Stats */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 sm:w-44 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-2 ring-cyan-500/40 shrink-0 bg-slate-900">
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3 pt-2 sm:pt-16">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold">
                  <span className="bg-amber-400 text-black px-1 rounded font-black text-[10px]">IMDb</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {movie.vote_average.toFixed(1)}/10
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                  {movie.certification || 'PG-13'}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatRuntime(movie.runtime)}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatReleaseDate(movie.release_date)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm italic text-cyan-300 font-medium">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onJoinWatchParty(movie)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-reel text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Join Live Watchroom
                </button>

                <button
                  onClick={() => onToggleWatchlist(movie)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    isWatchlisted
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {isWatchlisted ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      Add to Watchlist
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (IMDb Style) */}
          <div className="flex border-b border-white/10 gap-2 sm:gap-6 pt-2">
            {[
              { id: 'overview', label: 'Overview & Story' },
              { id: 'cast', label: 'Cast & Crew' },
              { id: 'reviews', label: 'Cinephile Reviews' },
              { id: 'specs', label: 'Technical Specs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs sm:text-sm font-bold tracking-wide transition-all border-b-2 -mb-[2px] ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-2 text-slate-300 text-sm leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-base text-slate-200">{movie.overview}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block">Director</span>
                    <span className="text-sm font-semibold text-white">{movie.director || 'Christopher Nolan'}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block">Genres</span>
                    <span className="text-sm font-semibold text-cyan-300">{movie.genres.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block">TMDB / IMDb ID</span>
                    <span className="text-sm font-mono text-slate-300">#{movie.id}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block">Ratings Count</span>
                    <span className="text-sm font-semibold text-white">{movie.vote_count.toLocaleString()} votes</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cast' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movie.cast && movie.cast.length > 0 ? (
                  movie.cast.map((actor) => (
                    <div key={actor.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <p className="text-xs font-bold text-white truncate">{actor.name}</p>
                      <p className="text-[11px] text-cyan-400 truncate">{actor.character}</p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-slate-500">Cast details synchronized from TMDB catalog.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {DEMO_REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white">{rev.author}</p>
                          <p className="text-[10px] text-slate-400">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {rev.rating}/10
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{rev.content}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                      <ThumbsUp className="w-3 h-3 text-cyan-400" />
                      <span>{rev.likes} cinephiles found this helpful</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">Aspect Ratio</span>
                  <span className="text-sm text-slate-200">2.39:1 (Scope) / 1.43:1 (IMAX GT)</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">Sound Mix</span>
                  <span className="text-sm text-slate-200">Dolby Atmos, IMAX 12-Track, DTS:X</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">Negative Format</span>
                  <span className="text-sm text-slate-200">65 mm (also IMAX) & ARRIRAW 4.5K</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">Cinematographic Process</span>
                  <span className="text-sm text-slate-200">Digital Intermediate (4K master)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
