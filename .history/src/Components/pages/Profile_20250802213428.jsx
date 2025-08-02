// src/components/pages/Profile/Profile.jsx
import React from "react";
import { useSelector } from "react-redux";
import { BadgeCheck, MapPin, Star, Users } from "lucide-react";

const Profile = () => {
  const profile = useSelector((store) => store.user?.profile);

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={profile.avatar}
            alt={profile.userName}
            className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-600"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {profile.userName}
              </h2>
              {profile.isVerified && <BadgeCheck className="text-blue-500" />}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {profile.emailID}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {profile.bio}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                {profile.followers} Followers
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4" />
                {profile.reputationScore} Reputation
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Skills
            </h3>
            {profile.skills.length ? (
              <ul className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No skills listed</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Preferences
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Match Type:</strong> {profile.preferences.matchType}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Collaboration:</strong>{" "}
              {profile.preferences.collabInterest
                ? "Open to collaborate"
                : "Not open"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
