'use client';

import React, { useRef } from 'react';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  movies: Movie[];
  onOpenDetails: (movie: Movie) => void;
  onJoinWatchParty: (movie: Movie) => void;
  watchlist: number[];
  onToggleWatchlist: (movie: Movie) => void;
}

export default function MovieRow({
  title,
  subtitle,
  icon,
  movies,
  onOpenDetails,
  onJoinWatchParty,
  watchlist,
  onToggleWatchlist,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-5 select-none group/row">
      {/* Row Header */}
      <div className="flex items-end justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          {icon && <div className="text-cyan-400">{icon}</div>}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {title}
              <span className="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                {movies.length}
              </span>
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Desktop Scroll Controls */}
        <div className="hidden sm:flex items-center gap-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shadow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shadow"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Rail */}
      <div
        ref={rowRef}
        className="flex items-center gap-4 overflow-x-auto hide-scrollbar py-2 px-1 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onOpenDetails={onOpenDetails}
            onJoinWatchParty={onJoinWatchParty}
            isWatchlisted={watchlist.includes(movie.id)}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))}
      </div>
    </section>
  );
}
