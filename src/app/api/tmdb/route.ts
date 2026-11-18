import { NextResponse } from 'next/server';
import { CURATED_MOVIES } from '@/lib/tmdb';

const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || 'trending';
  const query = searchParams.get('query') || '';

  if (!TMDB_API_KEY) {
    // Return curated movies if API key is not configured
    if (query) {
      const filtered = CURATED_MOVIES.filter(m =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.overview.toLowerCase().includes(query.toLowerCase()) ||
        m.genres.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
      return NextResponse.json({ results: filtered, source: 'curated' });
    }
    return NextResponse.json({ results: CURATED_MOVIES, source: 'curated' });
  }

  try {
    let url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
    if (endpoint === 'search' && query) {
      url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
    } else if (endpoint === 'top_rated') {
      url = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
    } else if (endpoint === 'now_playing') {
      url = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
    }

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`TMDB responded with status ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json({ results: data.results, source: 'tmdb' });
  } catch (error: any) {
    console.error('TMDB fetch error:', error);
    return NextResponse.json({ results: CURATED_MOVIES, source: 'fallback', error: error.message });
  }
}
