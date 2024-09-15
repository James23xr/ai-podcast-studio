// components/StickyPlayer.tsx
'use client';
import React, { useContext } from 'react';
import { AudioPlayerContext } from '../contexts/AudioPlayerContext';

const StickyPlayer = () => {
  const { audioSrc } = useContext(AudioPlayerContext);

  if (!audioSrc) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 text-white z-50">
      <audio controls src={audioSrc} className="w-full" />
    </div>
  );
};

export default StickyPlayer;
