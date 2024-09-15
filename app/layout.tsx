// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import './globals.css';
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext';
import StickyPlayer from '../components/StickyPlayer';

export const metadata = {
  title: 'AI-Powered Podcast Platform',
  description: 'An AI-powered platform with multi-voice synthesis and image generation.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <AudioPlayerProvider>
        <html lang="en">
          <body>
            {children}
            <StickyPlayer />
          </body>
        </html>
      </AudioPlayerProvider>
    </ClerkProvider>
  );
}
