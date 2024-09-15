import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '512x512',
    });
    const imageUrl = response.data[0].url;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error in Image Generation:', error);
    return new NextResponse('Failed to generate image', { status: 500 });
  }
}