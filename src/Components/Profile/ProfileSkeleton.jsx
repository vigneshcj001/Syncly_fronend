import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="mt-10 max-w-lg w-full mx-auto p-6 bg-gray-900 shadow-xl rounded-2xl relative flex flex-col text-gray-200 animate-pulse">
      {/* Avatar */}
      <div className="pt-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-gray-900 bg-gray-700" />
        </div>

        {/* Edit Button Placeholder */}
        <div className="absolute top-4 right-4 h-8 w-20 bg-gray-700 rounded-full" />

        {/* Name & Email */}
        <div className="text-center mt-2">
          <div className="h-6 w-32 bg-gray-700 mx-auto rounded mb-2" />
          <div className="h-4 w-40 bg-gray-700 mx-auto rounded" />
        </div>

        {/* Profile Completion Circle Placeholder */}
        <div className="w-20 h-20 my-6 mx-auto bg-gray-700 rounded-full" />

        {/* Bio */}
        <div className="mb-6 text-gray-300 space-y-2">
          <div className="h-4 w-3/4 bg-gray-700 rounded" />
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 w-5/6 bg-gray-700 rounded" />
          ))}
        </div>

        {/* Skills */}
        <SectionSkeleton title="Skills" />

        {/* Tech Stack */}
        <SectionSkeleton title="Tech Stack" />

        {/* Social Links */}
        <div className="mt-6">
          <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 w-24 bg-gray-700 rounded" />
            ))}
          </div>
        </div>

        {/* Followers */}
        <div className="mt-6 flex gap-6 items-center text-sm">
          <div className="h-4 w-24 bg-gray-700 rounded" />
          <div className="h-4 w-24 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};

const SectionSkeleton = ({ title }) => (
  <div className="mt-6">
    <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-6 w-16 bg-gray-700 rounded-full" />
      ))}
    </div>
  </div>
);

export default ProfileSkeleton;
