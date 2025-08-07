import React from "react";

const FeedSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-md p-6 flex flex-col justify-between animate-pulse h-[500px] max-w-md w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-zinc-700 mb-3" />
        <div className="w-32 h-4 bg-gray-300 dark:bg-zinc-700 rounded mb-2" />
        <div className="w-40 h-3 bg-gray-200 dark:bg-zinc-800 rounded" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 justify-center mb-3 flex-wrap">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="w-16 h-6 rounded-full bg-gray-200 dark:bg-zinc-700"
          />
        ))}
      </div>

      {/* Tab Content Skeleton */}
      <div className="overflow-y-auto flex-1 px-1 space-y-2 mb-4">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="w-full h-3 bg-gray-200 dark:bg-zinc-800 rounded"
          />
        ))}
      </div>

      {/* Footer Buttons Skeleton */}
      <div className="flex justify-center gap-4 mt-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-700" />
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-700" />
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-700" />
      </div>
    </div>
  );
};

export default FeedSkeleton;
