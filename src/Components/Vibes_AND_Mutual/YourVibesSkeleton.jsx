import React from "react";

const YourVibesSkeleton = () => {
  return (
    <div className="flex w-full max-w-5xl mx-auto flex-col gap-4 p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="skeleton h-4 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="skeleton h-4 w-36 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="skeleton h-24 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
    </div>
  );
};

export default YourVibesSkeleton;
