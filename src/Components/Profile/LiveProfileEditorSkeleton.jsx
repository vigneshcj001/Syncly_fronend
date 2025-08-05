import React from "react";

// Skeleton for a single form field (label + input)
const FormFieldSkeleton = () => (
  <div className="mb-6">
    <div className="h-5 bg-gray-700 rounded w-1/4 mb-2"></div>
    <div className="h-10 bg-gray-700 rounded-lg w-full"></div>
  </div>
);

// Skeleton for the Tags input section
const TagsInputSkeleton = () => (
  <div className="mb-6">
    <div className="h-5 bg-gray-700 rounded w-1/5 mb-2"></div>
    <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
  </div>
);

// Skeleton for the live preview card
const FeedCardSkeleton = () => (
  <div className="border border-gray-700 rounded-xl p-4 w-full">
    {/* Header: Avatar + Name */}
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-700 shrink-0"></div>
      <div className="flex flex-col gap-2 w-full">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
    {/* Bio */}
    <div className="space-y-2 mt-4">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mt-4">
      <div className="h-7 w-20 bg-gray-700 rounded-full"></div>
      <div className="h-7 w-24 bg-gray-700 rounded-full"></div>
      <div className="h-7 w-16 bg-gray-700 rounded-full"></div>
    </div>
  </div>
);

const LiveProfileEditorSkeleton = () => {
  return (
    <div className="p-6 mt-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Editor Form Skeleton */}
        <div className="lg:col-span-2 bg-gray-950 shadow-xl rounded-2xl p-6">
          {/* Header */}
          <div className="h-8 bg-gray-700 rounded w-1/2 mb-4 border-b border-gray-800 pb-2"></div>

          {/* Progress Bar */}
          <div className="h-5 bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-2.5 bg-gray-700 rounded-full w-full mb-8"></div>

          {/* Form Fields */}
          <FormFieldSkeleton />
          <div className="mb-6">
            <div className="h-5 bg-gray-700 rounded w-1/6 mb-2"></div>
            <div className="h-24 bg-gray-700 rounded-lg w-full"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-5 bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-10 bg-gray-700 rounded-lg w-full"></div>
            </div>
            <div>
              <div className="h-5 bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-10 bg-gray-700 rounded-lg w-full"></div>
            </div>
          </div>

          <div className="my-6"></div>

          <TagsInputSkeleton />
          <TagsInputSkeleton />

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <div className="h-12 bg-gray-700 rounded-xl w-40"></div>
          </div>
        </div>

        {/* Right Column: Live Preview Skeleton */}
        <div className="lg:col-span-1 bg-gray-900 rounded-2xl shadow-xl p-6 max-w-md w-full self-start">
          <div className="h-7 bg-gray-700 rounded w-2/3 mb-4"></div>
          <FeedCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default LiveProfileEditorSkeleton;
