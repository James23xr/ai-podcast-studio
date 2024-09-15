import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  const podcastData = await request.json();

  // Remove the id field from the data
  const { id, ...podcastDataWithoutId } = podcastData;

  try {
    const savedPodcast = await convex.mutation(api.podcasts.create, podcastDataWithoutId);
    return NextResponse.json(savedPodcast);
  } catch (error) {
    console.error('Error saving podcast:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to save podcast', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}