// components/Feed/FeedSkeleton.jsx
import React from "react";

export default function FeedSkeleton() {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl animate-pulse w-full max-w-md mx-auto my-6 text-white">
      <div className="flex flex-col items-center text-center space-y-2">
        {/* Avatar */}
        <div className="w-24 h-24 bg-gray-700 rounded-full" />

        {/* Name */}
        <div className="h-5 bg-gray-600 w-1/3 rounded" />

        {/* Bio */}
        <div className="h-4 bg-gray-700 w-2/3 rounded" />

        {/* Location & Role */}
        <div className="h-3 bg-gray-700 w-1/2 rounded" />

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="px-3 py-1 rounded text-sm font-medium bg-blue-600 w-16 h-6" />
          <div className="px-3 py-1 rounded text-sm font-medium bg-gray-700 w-16 h-6" />
          <div className="px-3 py-1 rounded text-sm font-medium bg-gray-700 w-16 h-6" />
        </div>

        {/* Tab Content Placeholder */}
        <div className="mt-4 min-h-[60px] flex flex-col gap-2 items-center w-full">
          <div className="h-4 bg-gray-700 w-3/4 rounded" />
          <div className="h-4 bg-gray-700 w-2/3 rounded" />
        </div>

        {/* Swipe Action Icons */}
        <div className="flex justify-around w-full mt-6 items-center">
          {/* Ghost */}
          <div className="w-12 h-12 bg-red-500/70 rounded-full" />
          {/* Chat */}
          <div className="w-12 h-12 bg-blue-500/60 rounded-full" />
          {/* Vibe */}
          <div className="w-12 h-12 bg-green-500/70 rounded-full" />
        </div>
      </div>
    </div>
  );
}
