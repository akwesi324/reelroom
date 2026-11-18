# 🎬 ReelRoom

> **Stream • Chat • Cinephile Hub**  
> Where the sleek discovery of **Netflix** meets the analytical depth of **IMDb**, the real-time community engagement of **Discord**, and the synchronized live watch parties of **Twitch**.

---

## 🌟 Vision & Key Features

### 1. 🍿 Netflix-Style Streaming Interface
- **Cinematic Hero Showcase**: Full-bleed backdrop, trailer previews, IMDb score pill, and instant live watchroom entry.
- **Horizontal Scrolling Rails**: "Now Streaming • Live Watchparties", "Trending on IMDb", "Hall of Fame (8.2+)", "Sci-Fi & Cyberpunk", "Action & Thrillers".
- **Interactive Movie Cards**: Hover scaling, live viewer counters, quick action buttons, and watchlist bookmarking.

### 2. 📊 IMDb-Grade Depth & TMDB Integration
- **Real TMDB Posters & Data**: High-resolution movie posters and backdrops powered by [The Movie Database (TMDB)](https://www.themoviedb.org/).
- **Deep Cinephile Modal**:
  - IMDb ratings and vote counts
  - Director, cast member avatars, and character names
  - MPAA certifications, runtimes, release dates, and story synopses
  - Verified community reviews with helpful upvote counts
  - Technical specs (Aspect ratios, sound mix like Dolby Atmos / IMAX GT, camera formats)
- **Instant Search**: Search films by title, genre, or acclaimed directors.

### 3. 💬 Discord-Style Cinephile Chatrooms
- **Live Channel Lounges**: Dedicated chatrooms per movie (e.g. `#watchparty-dune2`, `#theorists`).
- **User Roles & Badges**: Distinct badges for `Host`, `VIP Critic`, `Mod`, and `Fanatic`.
- **Live Emoji Reactions**: Instant popcorn 🍿, fire 🔥, clapperboard 🎬, and mindblown 🤯 reactions with live counters.
- **Member Roster**: Real-time list of online fans and critics with status dots.

### 4. 📺 Twitch-Style Live Theater & Watch Parties
- **Synchronized Stage**: Integrated video playback synchronized with the room host.
- **Real-Time Stream Reactions**: Live floating emojis (🍿, 🔥, 😱, 👏, ❤️) that animate across the player canvas.
- **Live Status & Viewer Metrics**: Pulsating LIVE badges, host metadata, and active audience count.
- **Split Cinema Layout**: 70% immersive movie stream on the left, 30% active Discord chat on the right.

### 5. 🎨 Dark Contrast & Deepened Color Palette
- Custom **Obsidian Cyan & Midnight Indigo** palette (`#06080F` canvas).
- Deepened vibrant gradients with high contrast so posters, text, and badges stand out with maximum clarity.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 22+)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akwesi324/reelroom.git
   cd reelroom
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **(Optional) Configure TMDB API Key**:
   ReelRoom works **out-of-the-box** with curated high-definition TMDB data! To connect to your own TMDB account:
   ```bash
   cp .env.example .env.local
   ```
   Add your key in `.env.local`:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism and darkened contrast gradients
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs)

---

## 📄 License

MIT License. Crafted for movie lovers, streamers, and cinephiles worldwide.
