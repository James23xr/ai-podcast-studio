'use client';
import React, { useState } from 'react';
import { X, Image, Mic, Save } from 'lucide-react';

interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
}

interface PodcastCreatorProps {
  podcast: Podcast;
  onClose: () => void;
}

const PodcastCreator: React.FC<PodcastCreatorProps> = ({ podcast, onClose }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: podcast.title }),
      });
      if (!response.ok) throw new Error('Failed to generate image');
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateAudio = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: podcast.description, voice: 'en-US-Neural2-F' }),
      });
      if (!response.ok) throw new Error('Failed to generate audio');
      const data = await response.json();
      setAudioUrl(data.url);
    } catch (err) {
      setError('Failed to generate audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const savePodcast = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/save-podcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...podcast, imageUrl, audioUrl }),
      });
      if (!response.ok) throw new Error('Failed to save podcast');
      onClose();
    } catch (err) {
      setError('Failed to save podcast. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{podcast.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-2">{podcast.author}</p>
        <p className="text-gray-800 mb-4">{podcast.description}</p>
        
        <div className="flex space-x-4 mb-4">
          <button 
            onClick={generateImage} 
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            <Image size={20} className="mr-2" />
            Generate Image
          </button>
          <button 
            onClick={generateAudio} 
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            disabled={loading}
          >
            <Mic size={20} className="mr-2" />
            Generate Audio
          </button>
        </div>
        
        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl} alt="Generated podcast cover" className="w-full rounded-lg shadow-md" />
          </div>
        )}
        
        {audioUrl && (
          <div className="mb-4">
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )}
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <button 
          onClick={savePodcast} 
          className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300"
          disabled={loading || !imageUrl || !audioUrl}
        >
          <Save size={20} className="mr-2" />
          Save Podcast
        </button>
      </div>
    </div>
  );
};

export default PodcastCreator;