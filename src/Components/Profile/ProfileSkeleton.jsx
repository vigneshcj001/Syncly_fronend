import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-gray-900 shadow-xl rounded-2xl relative flex flex-col text-gray-200">
      <div className="pt-16 px-6 animate-pulse">
        {/* Avatar Skeleton */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-28 h-28 rounded-full bg-gray-700"></div>
        </div>

        {/* Name and Email Skeleton */}
        <div className="text-center mt-2">
          <div className="h-7 bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
        </div>

        {/* Progress Bar Skeleton */}
        <div className="w-20 h-20 my-6 mx-auto rounded-full bg-gray-700"></div>

        {/* Bio Skeleton */}
        <div className="mb-6">
          <div className="h-5 bg-gray-700 rounded w-full"></div>
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
        </div>

        {/* Sections Skeleton */}
        <div className="mt-6">
          <div className="h-5 bg-gray-700 rounded w-1/4 mb-3"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-7 bg-gray-700 rounded-full w-20"></div>
            <div className="h-7 bg-gray-700 rounded-full w-24"></div>
            <div className="h-7 bg-gray-700 rounded-full w-28"></div>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-5 bg-gray-700 rounded w-1/3 mb-3"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-7 bg-gray-700 rounded-full w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
