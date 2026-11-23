'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/movie';
import { Send, Hash, Users, Sparkles, Smile, Shield, Flame, Popcorn } from 'lucide-react';

interface DiscordChatProps {
  channelName: string;
  movieTitle: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    userId: 'u1',
    userName: 'CinemaGodfather',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop',
    userBadge: 'Host',
    badgeColor: 'bg-pink-500 text-black',
    content: 'Welcome everyone to the ReelRoom live sync! Grab your popcorn 🍿 and sound off if audio is crisp!',
    timestamp: '12:42 PM',
    reactions: { '🍿': 14, '🔥': 8 }
  },
  {
    id: 'm2',
    userId: 'u2',
    userName: 'NeonCritic_88',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop',
    userBadge: 'VIP Critic',
    badgeColor: 'bg-amber-400 text-black',
    content: 'The cinematography in this scene is completely unmatched. Look at the practical lighting in the background!',
    timestamp: '12:44 PM',
    reactions: { '🎬': 19, '🤯': 6 }
  },
  {
    id: 'm3',
    userId: 'u3',
    userName: 'Kev_Theorist',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop',
    userBadge: 'Member',
    badgeColor: 'bg-slate-700 text-slate-200',
    content: 'I noticed a hidden foreshadowing detail in the mirror reflection right before this dialogue. Pure genius.',
    timestamp: '12:46 PM',
    reactions: { '👀': 11 }
  }
];

const ONLINE_USERS = [
  { name: 'CinemaGodfather', role: 'Host', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop', status: 'online' },
  { name: 'NeonCritic_88', role: 'VIP Critic', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop', status: 'online' },
  { name: 'Kev_Theorist', role: 'Member', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop', status: 'idle' },
  { name: 'SarahReels', role: 'Mod', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop', status: 'online' },
  { name: 'SciFi_Alex', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop', status: 'online' }
];

export default function DiscordChat({ channelName, movieTitle }: DiscordChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: 'current-user',
      userName: 'You (Cinephile)',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop',
      userBadge: 'Fanatic',
      badgeColor: 'bg-pink-400 text-black',
      content: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: {}
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const handleReact = (msgId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === msgId) {
          const count = msg.reactions[emoji] || 0;
          return {
            ...msg,
            reactions: {
              ...msg.reactions,
              [emoji]: count + 1
            }
          };
        }
        return msg;
      })
    );
  };

  return (
    <div className="flex h-full w-full bg-[#080d1a] border-l border-white/10 flex-col overflow-hidden">
      {/* Discord Channel Header */}
      <div className="h-14 px-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#090f1f]">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-pink-400" />
          <div>
            <span className="text-sm font-bold text-white tracking-wide">
              {channelName || 'general-watchparty'}
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-400 ml-2">
              | Live chat for <span className="text-pink-300 font-semibold">{movieTitle}</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowUsers(!showUsers)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
            showUsers
              ? 'bg-red-950 border-pink-500/60 text-pink-300'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Toggle online members"
        >
          <Users className="w-3.5 h-3.5 text-pink-400" />
          <span>{ONLINE_USERS.length}</span>
        </button>
      </div>

      {/* Main chat body with optional users sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Messages feed */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4">
            {/* Welcome banner */}
            <div className="p-3 rounded-xl bg-red-950/40 border border-pink-500/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-pink-300 font-bold">
                <Sparkles className="w-4 h-4 text-pink-400" />
                Discord-Powered Movie Lounge
              </div>
              <p>Be civil, avoid major unannounced spoilers, and enjoy synchronized streaming!</p>
            </div>

            {/* Message items */}
            {messages.map((msg) => (
              <div key={msg.id} className="group flex gap-3 hover:bg-white/[0.02] p-1.5 -mx-1.5 rounded-xl transition-all">
                <img
                  src={msg.userAvatar}
                  alt={msg.userName}
                  className="w-9 h-9 rounded-full ring-1 ring-pink-500/30 object-cover shrink-0"
                />
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-100 hover:underline cursor-pointer">
                      {msg.userName}
                    </span>
                    {msg.userBadge && (
                      <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded ${msg.badgeColor || 'bg-pink-500 text-black'}`}>
                        {msg.userBadge}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-medium">
                      {msg.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed break-words">
                    {msg.content}
                  </p>

                  {/* Reactions */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        onClick={() => handleReact(msg.id, emoji)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700/60 hover:border-pink-500/50 text-xs font-semibold text-slate-200 hover:scale-105 active:scale-95 transition-all"
                      >
                        <span>{emoji}</span>
                        <span className="text-[10px] text-pink-300">{count}</span>
                      </button>
                    ))}

                    {/* Quick emoji reactions trigger */}
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 ml-1 transition-opacity">
                      {['🍿', '🔥', '🎬', '👏'].map((emo) => (
                        <button
                          key={emo}
                          onClick={() => handleReact(msg.id, emo)}
                          className="text-xs hover:scale-125 transition-transform"
                        >
                          {emo}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input box */}
          <div className="p-3 bg-[#0a0f21] border-t border-white/5">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-700/80 focus-within:border-pink-500 px-3 py-2">
              <input
                type="text"
                placeholder={`Message #${channelName || 'watchparty'}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setInputText((prev) => prev + ' 🍿 ')}
                className="text-slate-400 hover:text-pink-400 transition-colors"
                title="Add Popcorn reaction"
              >
                <Popcorn className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-1.5 rounded-lg gradient-reel text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Discord Online User Roster */}
        {showUsers && (
          <div className="w-48 bg-[#070b16] border-l border-white/5 p-3 space-y-3 overflow-y-auto">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              ONLINE — {ONLINE_USERS.length}
            </h4>
            <div className="space-y-2">
              {ONLINE_USERS.map((user) => (
                <div key={user.name} className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 cursor-pointer">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ring-1 ring-slate-950 ${
                        user.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                    <p className="text-[10px] text-pink-400 truncate">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
