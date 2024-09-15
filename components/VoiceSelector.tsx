// components/VoiceSelector.tsx
'use client';
import React, { useState, useContext } from 'react';
import { AudioPlayerContext } from '../contexts/AudioPlayerContext';

const VoiceSelector = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('en-US-Wavenet-D');
  const [loading, setLoading] = useState(false);
  const { setAudioSrc } = useContext(AudioPlayerContext);

  const synthesizeSpeech = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice }),
      });
      const data = await response.json();
      if (data.url) {
        setAudioSrc(data.url);
      } else {
        alert('Failed to synthesize speech');
      }
    } catch (error) {
      console.error('Error in Voice Synthesis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-2">Voice Synthesis</h2>
      <textarea
        className="w-full p-2 border"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to synthesize"
      />
      <div className="flex items-center mt-2">
        <label className="mr-2">Voice:</label>
        <select
          className="p-2 border"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="en-US-Wavenet-D">Male Voice 1</option>
          <option value="en-US-Wavenet-E">Male Voice 2</option>
          <option value="en-US-Wavenet-F">Female Voice 1</option>
          {/* Add more voices as desired */}
        </select>
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white mt-4 rounded-md"
        onClick={synthesizeSpeech}
        disabled={loading}
      >
        {loading ? 'Synthesizing...' : 'Synthesize'}
      </button>
    </div>
  );
};

export default VoiceSelector;
