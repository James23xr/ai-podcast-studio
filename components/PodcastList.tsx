'use client';
import React from 'react';
import { Headphones } from 'lucide-react';

interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
}

interface PodcastListProps {
  podcasts: Podcast[];
  onSelect: (podcast: Podcast) => void;
}

const PodcastList: React.FC<PodcastListProps> = ({ podcasts, onSelect }) => {
  return (
    <ul className="mt-6 space-y-4">
      {podcasts.map((podcast) => (
        <li 
          key={podcast.id} 
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
          onClick={() => onSelect(podcast)}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Headphones size={24} className="text-blue-500" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{podcast.title}</h3>
              <p className="text-sm text-gray-600">{podcast.author}</p>
              <p className="mt-2 text-gray-700 line-clamp-2">{podcast.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PodcastList;