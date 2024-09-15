// contexts/AudioPlayerContext.tsx
'use client';
import React, { createContext, useState, ReactNode } from 'react';

interface AudioPlayerContextProps {
  audioSrc: string;
  setAudioSrc: (src: string) => void;
}

export const AudioPlayerContext = createContext<AudioPlayerContextProps>({
  audioSrc: '',
  setAudioSrc: () => {},
});

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [audioSrc, setAudioSrc] = useState('');

  return (
    <AudioPlayerContext.Provider value={{ audioSrc, setAudioSrc }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
