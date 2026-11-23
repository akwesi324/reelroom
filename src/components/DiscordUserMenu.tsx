'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Settings,
  Bell,
  Volume2,
  Shield,
  Sparkles,
  LogOut,
  ChevronRight,
  Smile,
  Mic,
  Headphones,
  Radio,
  Check,
  Crown,
  Film
} from 'lucide-react';

export type UserStatus = 'online' | 'idle' | 'dnd' | 'invisible';

interface DiscordUserMenuProps {
  onStatusChange?: (status: UserStatus) => void;
}

export default function DiscordUserMenu({ onStatusChange }: DiscordUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<UserStatus>('online');
  const [customStatus, setCustomStatus] = useState('🍿 Binging Dune Part Two in 4K');
  const [isEditingCustomStatus, setIsEditingCustomStatus] = useState(false);
  const [streamerMode, setStreamerMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditingCustomStatus(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusSelect = (newStatus: UserStatus) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const getStatusColor = (s: UserStatus) => {
    switch (s) {
      case 'online':
        return 'bg-emerald-500';
      case 'idle':
        return 'bg-amber-400';
      case 'dnd':
        return 'bg-red-500';
      case 'invisible':
        return 'bg-slate-400';
    }
  };

  const getStatusText = (s: UserStatus) => {
    switch (s) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Idle';
      case 'dnd':
        return 'Do Not Disturb';
      case 'invisible':
        return 'Invisible';
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Discord Avatar Button on Far Left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/80 border border-white/5 hover:border-pink-500/30 transition-all focus:outline-none"
        title="Discord Profile & Settings"
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
            alt="Discord User Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-500/50 group-hover:ring-pink-400 transition-all"
          />
          {/* Status Indicator Dot */}
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[#06080f] ${getStatusColor(
              status
            )}`}
          />
        </div>
      </button>

      {/* Discord Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 sm:w-88 rounded-2xl bg-[#111214] border border-[#2b2d31] shadow-2xl text-slate-200 overflow-hidden z-50 animate-fade-in font-sans">
          {/* Discord Banner & Profile Header */}
          <div className="relative h-20 gradient-banner p-3 flex items-start justify-end">
            {/* VIP & Nitro Badges */}
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[10px] font-bold text-pink-300">
              <Crown className="w-3 h-3 text-amber-400" />
              <span>CINEPHILE VIP</span>
            </div>
          </div>

          {/* Profile Card Body */}
          <div className="px-4 pb-3 pt-0 relative bg-[#111214]">
            {/* Large Avatar Overlapping Banner */}
            <div className="relative -mt-10 mb-2 inline-block">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop"
                alt="Profile Large"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#111214]"
              />
              <span
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full ring-3 ring-[#111214] ${getStatusColor(
                  status
                )}`}
              />
            </div>

            {/* User Details */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">Akwesi</h3>
                <span className="text-xs text-slate-400 font-medium">#2026</span>
              </div>
              <p className="text-xs text-pink-400 font-semibold flex items-center gap-1">
                <Film className="w-3 h-3" />
                Verified Watchroom Host
              </p>
            </div>

            {/* Custom Status Bar */}
            <div className="mt-3 p-2.5 rounded-xl bg-[#1e1f22] border border-[#2b2d31] text-xs">
              {isEditingCustomStatus ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customStatus}
                    onChange={(e) => setCustomStatus(e.target.value)}
                    placeholder="Set custom status..."
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsEditingCustomStatus(false)}
                    className="text-[11px] font-bold text-pink-400 hover:text-pink-300"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingCustomStatus(true)}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <span className="text-slate-300 truncate">{customStatus || 'Set a custom status...'}</span>
                  <Smile className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400 shrink-0" />
                </div>
              )}
            </div>

            {/* Status Switcher (Online, Idle, DND, Invisible) */}
            <div className="mt-3 pt-3 border-t border-[#2b2d31] space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                Presence Status
              </span>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {(['online', 'idle', 'dnd', 'invisible'] as UserStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusSelect(s)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      status === s
                        ? 'bg-[#2b2d31] text-white border border-pink-500/40'
                        : 'hover:bg-[#1e1f22] text-slate-300'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(s)}`} />
                    <span className="truncate">{getStatusText(s)}</span>
                    {status === s && <Check className="w-3 h-3 text-pink-400 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Discord Controls: Mute, Deafen, Streamer Mode */}
            <div className="mt-3 pt-3 border-t border-[#2b2d31] flex items-center justify-between px-1">
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isMuted ? 'bg-red-500/20 text-red-400' : 'hover:bg-[#1e1f22] hover:text-white'
                  }`}
                  title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsDeafened(!isDeafened)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isDeafened ? 'bg-red-500/20 text-red-400' : 'hover:bg-[#1e1f22] hover:text-white'
                  }`}
                  title={isDeafened ? 'Undeafen Audio' : 'Deafen Audio'}
                >
                  <Headphones className="w-4 h-4" />
                </button>
              </div>

              {/* Streamer Mode Toggle */}
              <button
                onClick={() => setStreamerMode(!streamerMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  streamerMode
                    ? 'bg-red-950 border-pink-500 text-pink-300'
                    : 'bg-[#1e1f22] border-[#2b2d31] text-slate-400 hover:text-white'
                }`}
                title="Toggle Discord Streamer Mode"
              >
                <Radio className="w-3 h-3" />
                <span>Streamer Mode</span>
              </button>
            </div>

            {/* Menu Navigation Items */}
            <div className="mt-3 pt-3 border-t border-[#2b2d31] space-y-0.5">
              <button
                onClick={() => alert('Opening Profile Customization...')}
                className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium hover:bg-[#1e1f22] text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-pink-400" />
                  <span>Edit Cinephile Profile</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => alert('Opening Watchroom Voice & Audio Preferences...')}
                className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium hover:bg-[#1e1f22] text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-rose-400" />
                  <span>Voice & Theater Sync</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => alert('Opening Notification Settings...')}
                className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium hover:bg-[#1e1f22] text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Notifications & Pings</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => alert('Opening Nitro & Perks...')}
                className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium hover:bg-[#1e1f22] text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>ReelRoom Nitro VIP</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded gradient-reel text-white">PRO</span>
              </button>

              <button
                onClick={() => alert('Opening User Settings...')}
                className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium hover:bg-[#1e1f22] text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>User Settings</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            {/* Discord Log Out */}
            <div className="mt-2 pt-2 border-t border-[#2b2d31]">
              <button
                onClick={() => alert('Logging out...')}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
