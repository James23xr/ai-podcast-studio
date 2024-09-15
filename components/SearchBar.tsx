// components/SearchBar.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import PodcastCreator from './PodcastCreator';
import PodcastList from './PodcastList';

interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchPodcasts();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchPodcasts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch podcast suggestions');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error in Search:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative">
        <input
          className="w-full p-4 pr-12 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition duration-300"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search AI-generated podcasts"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <p className="mt-4 text-center text-red-500">{error}</p>
      )}
      
      <PodcastList 
        podcasts={results} 
        onSelect={(podcast) => setSelectedPodcast(podcast)}
      />
      
      {selectedPodcast && (
        <PodcastCreator 
          podcast={selectedPodcast} 
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </div>
  );
};

export default SearchBar;