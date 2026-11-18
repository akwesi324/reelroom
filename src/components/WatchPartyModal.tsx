'use client';

import React, { useState, useEffect } from 'react';
import { Movie, WatchRoom } from '@/types/movie';
import DiscordChat from './DiscordChat';
import { getImageUrl } from '@/lib/tmdb';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Users, Radio, Sparkles, RefreshCw, Heart } from 'lucide-react';

interface WatchPartyModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function WatchPartyModal({ movie, onClose }: WatchPartyModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [viewers, setViewers] = useState(movie.live_viewers || 2480);
  const [isSynced, setIsSynced] = useState(true);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; left: number }[]>([]);

  // Periodically fluctuate viewer count for realistic Twitch-like live feel
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerStreamReaction = (emoji: string) => {
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      left: Math.floor(Math.random() * 80) + 10,
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-0 sm:p-4 overflow-hidden animate-fade-in">
      <div className="relative w-full h-full max-w-[1600px] max-h-[920px] bg-[#070b16] sm:rounded-2xl border border-cyan-500/30 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Stream Bar */}
        <div className="h-14 px-4 bg-[#0a0f21] border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-black tracking-wider">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              LIVE THEATER
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
              {movie.title} • Watch Party
            </h2>
            <div className="hidden md:flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Users className="w-3.5 h-3.5 text-cyan-400 ml-2" />
              <span className="font-bold text-cyan-300">{viewers.toLocaleString()}</span> watching
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSynced(!isSynced)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                isSynced
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-600 text-slate-300'
              }`}
              title="Sync playback with host"
            >
              <RefreshCw className={`w-3 h-3 ${isSynced ? 'text-emerald-400' : ''}`} />
              {isSynced ? 'Host Synced' : 'Sync Playback'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Split: Left = Video Stream Player, Right = Discord Chatroom */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Twitch-style Live Video Stage */}
          <div className="relative flex-1 bg-black flex flex-col justify-between overflow-hidden">
            {/* Embedded Stream Video or Cinematic Trailer */}
            <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
              {movie.trailer_url ? (
                <iframe
                  src={`${movie.trailer_url}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1`}
                  title={movie.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={getImageUrl(movie.backdrop_path, 'original')}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-full gradient-reel mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/30">
                        <Play className="w-7 h-7 text-white fill-white ml-1" />
                      </div>
                      <p className="text-base font-bold text-white tracking-wide">
                        Live Watchroom Stream Active
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Twitch-Style Floating Reactions Canvas */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {floatingEmojis.map((item) => (
                  <span
                    key={item.id}
                    style={{ left: `${item.left}%` }}
                    className="absolute bottom-16 text-3xl animate-bounce transition-all duration-1000 transform -translate-y-48 opacity-90"
                  >
                    {item.emoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Twitch Player Bottom Control Bar */}
            <div className="h-16 px-4 bg-[#090e1d] border-t border-white/5 flex items-center justify-between gap-4 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-slate-100">{movie.title}</p>
                  <p className="text-[11px] text-cyan-400 font-medium">Synced with Host @CinemaGodfather</p>
                </div>
              </div>

              {/* Twitch Stream Live Reaction Trigger Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium mr-1">
                  React Live:
                </span>
                {['🍿', '🔥', '😱', '👏', '❤️'].map((emo) => (
                  <button
                    key={emo}
                    onClick={() => triggerStreamReaction(emo)}
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-sm hover:scale-110 active:scale-90 transition-all"
                    title={`Send ${emo} stream reaction`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discord-Style Chatroom Sidebar */}
          <div className="w-full lg:w-96 xl:w-[420px] h-72 lg:h-full shrink-0">
            <DiscordChat
              channelName={`watchparty-${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
              movieTitle={movie.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
