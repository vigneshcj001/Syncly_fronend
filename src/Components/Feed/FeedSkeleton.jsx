import React from "react";

const FeedCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-md p-6 flex flex-col justify-between text-center transition animate-pulse h-[500px] max-w-md w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center mb-4 gap-2">
        <div className="skeleton w-20 h-20 rounded-full" />
        <div className="skeleton w-32 h-4 rounded" />
        <div className="skeleton w-40 h-3 rounded" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 justify-center mb-3 flex-wrap">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="skeleton h-6 w-16 rounded-full" />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 px-4 space-y-2 mb-4 text-left">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="skeleton h-4 w-full rounded" />
        ))}
      </div>

      {/* Footer Actions Skeleton */}
      <div className="flex justify-center gap-4 mt-2">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="skeleton w-10 h-10 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default FeedCardSkeleton;
