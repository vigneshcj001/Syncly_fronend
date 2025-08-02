// src/components/pages/Home/ProfileDetail.js
import React from "react";

const ProfileDetail = ({ profile, onBack }) => (
  <div className="min-h-screen bg-gray-100 dark:bg-black p-4 md:p-8">
    <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">
      ← Back to feed
    </button>
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={profile.avatar}
          alt={profile.userName}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {profile.userName}
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400">
            {profile.domain}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {profile.location}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
          Bio
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
          Profile Details
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Stack:</strong>{" "}
            {profile.stack?.join(", ") || "Not specified"}
          </li>
          <li>
            <strong>Skills:</strong>{" "}
            {profile.skills?.join(", ") || "Not specified"}
          </li>
          <li>
            <strong>Interests:</strong>{" "}
            {profile.interests?.join(", ") || "Not specified"}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default ProfileDetail;
