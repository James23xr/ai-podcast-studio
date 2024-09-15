import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

const PodcastListSkeleton = () => {
  return (
    <ul className="mt-6 space-y-4">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <SkeletonLoader />
        </li>
      ))}
    </ul>
  );
};

export default PodcastListSkeleton;