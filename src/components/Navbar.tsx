'use client';

import React, { useState } from 'react';
import { Film, Radio, Search, Users, Bookmark, Calendar, History } from 'lucide-react';
import DiscordUserMenu, { UserStatus } from './DiscordUserMenu';

interface NavbarProps {
  onSearch: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLiveWatchroom: () => void;
  watchlistCount: number;
  hasLiveParties: boolean;
  upcomingCount?: number;
}

export default function Navbar({
  onSearch,
  activeTab,
  setActiveTab,
  onOpenLiveWatchroom,
  watchlistCount,
  hasLiveParties,
  upcomingCount = 4,
}: NavbarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Section: Far-Left Discord Avatar Menu + Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Avatar on the FAR LEFT with full Discord dropdown menu */}
          <DiscordUserMenu />

          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-reel flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all shrink-0">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div className="hidden xs:block">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  REELROOM
                </span>
                {hasLiveParties ? (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-400/50 shadow-sm shadow-cyan-500/20">
                    LIVE
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    CINEMA
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Stream • Chat • Cinephile Hub
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'explore'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Browse
            </button>

            {/* Watch Parties Button with conditional blinking indicator */}
            <button
              onClick={() => {
                setActiveTab('watchrooms');
                if (hasLiveParties) {
                  onOpenLiveWatchroom();
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'watchrooms'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Radio className={`w-4 h-4 ${hasLiveParties ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
              Watch Parties
              {hasLiveParties && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            {/* Upcoming Movies Tab */}
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              Coming Soon
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {upcomingCount}
              </span>
            </button>

            {/* Cinema History Tab: brackets removed */}
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'history'
                  ? 'text-amber-300 bg-amber-950/40 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <History className="w-4 h-4 text-amber-400" />
              Cinema History
            </button>

            {/* IMDb High Score */}
            <button
              onClick={() => setActiveTab('imdb_top')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'imdb_top'
                  ? 'text-amber-300 bg-amber-950/40 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              IMDb High Score
            </button>

            {/* Watchlist */}
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'watchlist'
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Watchlist
              {watchlistCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-black text-xs font-bold">
                  {watchlistCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Right Section: Search & Discord User Presence */}
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div
            className={`relative flex items-center rounded-xl bg-slate-900/80 border border-slate-700/60 px-3 py-1.5 transition-all duration-300 ${
              isSearchExpanded ? 'w-52 sm:w-64 border-cyan-500/60 ring-2 ring-cyan-500/20' : 'w-36 sm:w-56'
            }`}
          >
            <Search className="w-4 h-4 text-cyan-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search movies, year, director..."
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => setIsSearchExpanded(false)}
              className="bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none w-full"
            />
            {searchValue && (
              <button
                onClick={() => {
                  setSearchValue('');
                  onSearch('');
                }}
                className="text-xs text-slate-400 hover:text-white ml-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Online Fans indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs font-medium text-slate-200 shadow-md">
            <span className="flex h-2 w-2 relative">
              {hasLiveParties && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-cyan-300">8,270</span> Online
          </div>
        </div>
      </div>
    </header>
  );
}
