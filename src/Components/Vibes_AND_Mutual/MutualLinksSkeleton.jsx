const MutualLinksSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border border-gray-700 rounded-lg bg-gray-900 animate-pulse shadow"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-700" />

          {/* Content */}
          <div className="flex-1 space-y-2">
            {/* Name */}
            <div className="h-4 bg-gray-700 rounded w-1/3" />

            {/* Email */}
            <div className="h-3 bg-gray-700 rounded w-1/4" />

            {/* Bio */}
            <div className="h-3 bg-gray-700 rounded w-2/3" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="h-3 w-20 bg-gray-700 rounded" />
              <div className="h-3 w-24 bg-gray-700 rounded" />
              <div className="h-3 w-16 bg-gray-700 rounded" />
              <div className="h-3 w-12 bg-gray-700 rounded" />
            </div>

            {/* Skills/Stack/Interest */}
            <div className="space-y-1 mt-2">
              <div className="h-2 w-full bg-gray-800 rounded" />
              <div className="h-2 w-3/4 bg-gray-800 rounded" />
              <div className="h-2 w-2/3 bg-gray-800 rounded" />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <div className="w-5 h-5 bg-gray-700 rounded-full" />
            <div className="w-5 h-5 bg-gray-700 rounded-full" />
            <div className="w-5 h-5 bg-gray-700 rounded-full" />
            <div className="w-5 h-5 bg-gray-700 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MutualLinksSkeleton;
