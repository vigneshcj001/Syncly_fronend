import React, { useEffect } from "react";
import { api } from "../../utils/api";
import { addYourVibes } from "../../redux/VibesSlice";
import { useDispatch, useSelector } from "react-redux";

const YourVibes = () => {
  const dispatch = useDispatch();
  const vibes = useSelector((state) => state.vibes);

  const fetchYourVibes = async () => {
    try {
      const response = await api.get("/network/requests/pendings");
      dispatch(addYourVibes(response.data.data)); // store only array
    } catch (error) {
      console.error("Error fetching vibes:", error);
    }
  };

  useEffect(() => {
    fetchYourVibes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Vibes</h2>

      {vibes.length === 0 ? (
        <p className="text-gray-500">No pending vibes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vibes.map((vibe) => (
            <div
              key={vibe._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={vibe.avatar}
                alt={vibe.userName}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h3 className="font-semibold text-lg">{vibe.userName}</h3>
              <p className="text-gray-500 text-sm">{vibe.bio}</p>
              <p className="text-xs text-gray-400 mt-1">{vibe.emailID}</p>

              {/* Skills */}
              {vibe.skills && vibe.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {vibe.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Location */}
              <p className="mt-2 text-sm text-gray-500">
                📍 {vibe.location || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourVibes;
