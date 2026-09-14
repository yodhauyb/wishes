import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'YouTube API key is missing' }, { status: 500 });
  }

  try {
    // YouTube Data API se gaane search karna
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(query + ' song audio')}&type=video&videoCategoryId=10&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Results ko UI ke hisaab se format karna
    const results = data.items.map((item: any) => ({
      title: item.snippet.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&"),
      artist: item.snippet.channelTitle,
      url: item.id.videoId, // Yeh humein baad mein iframe player ke liye chahiye
      thumbnail: item.snippet.thumbnails.default.url
    }));

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}