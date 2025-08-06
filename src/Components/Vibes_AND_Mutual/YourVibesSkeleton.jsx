import React from "react";

const YourVibesSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center gap-4 shadow animate-pulse"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-700" />

          {/* Info Section */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-1/4" />
            <div className="h-3 bg-gray-700 rounded w-1/2" />
            <div className="h-3 bg-gray-700 rounded w-full" />
            <div className="flex gap-2 flex-wrap mt-2">
              <div className="h-3 bg-gray-700 rounded w-20" />
              <div className="h-3 bg-gray-700 rounded w-24" />
              <div className="h-3 bg-gray-700 rounded w-16" />
              <div className="h-3 bg-gray-700 rounded w-20" />
            </div>
            <div className="space-y-1 mt-2">
              <div className="h-3 bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-700 rounded w-4/5" />
              <div className="h-3 bg-gray-700 rounded w-2/3" />
            </div>
          </div>

          {/* Social icons */}
          <div className="flex flex-col gap-2 items-center">
            <div className="w-6 h-6 bg-gray-700 rounded" />
            <div className="w-6 h-6 bg-gray-700 rounded" />
            <div className="w-6 h-6 bg-gray-700 rounded" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 ml-4">
            <div className="h-10 w-20 bg-gray-700 rounded" />
            <div className="h-10 w-20 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourVibesSkeleton;
