// components/ImageGenerator.tsx
'use client';
import React, { useState } from 'react';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        alert('Failed to generate image');
      }
    } catch (error) {
      console.error('Error in Image Generation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-2">Image Generation</h2>
      <input
        className="w-full p-2 border"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter image prompt"
      />
      <button
        className="px-4 py-2 bg-green-600 text-white mt-4 rounded-md"
        onClick={generateImage}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {imageUrl && (
        <img src={imageUrl} alt="Generated" className="mt-4 w-full" />
      )}
    </div>
  );
};

export default ImageGenerator;
