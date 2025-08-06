const MutualLinksSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 shadow animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gray-300 mb-2" />
          <div className="h-4 bg-gray-300 w-1/2 mb-1" />
          <div className="h-3 bg-gray-300 w-3/4 mb-1" />
          <div className="h-3 bg-gray-300 w-full" />
        </div>
      ))}
    </div>
  );
};

export default MutualLinksSkeleton;
