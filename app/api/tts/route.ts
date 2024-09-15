import { NextRequest, NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs/promises';
import path from 'path';

const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'google-service-account.json');

const client = new TextToSpeechClient({ keyFilename });

export async function POST(request: NextRequest) {
  const { text, voice } = await request.json();

  const ttsRequest = {
    input: { text },
    voice: {
      languageCode: 'en-US',
      name: voice,
    },
    audioConfig: { audioEncoding: 'MP3' as const },
  };

  try {
    const [response] = await client.synthesizeSpeech(ttsRequest);
    const audioContent = response.audioContent as Buffer;
    const fileName = `output-${Date.now()}.mp3`;
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, fileName);

    // Ensure the public directory exists
    await fs.mkdir(publicDir, { recursive: true });

    // Write the file
    await fs.writeFile(filePath, audioContent, 'binary');

    console.log(`File written successfully: ${filePath}`);

    return NextResponse.json({ url: `/${fileName}` });
  } catch (error: any) {
    console.error('Error in Text-to-Speech:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.code === 'ENOENT') {
      console.error('Directory does not exist. Attempted path:', error.path);
    }
    
    return new NextResponse(JSON.stringify({
      error: 'Failed to synthesize or save speech',
      details: error.message,
      code: error.code
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}