import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaStar,
  FaTools,
  FaLightbulb,
  FaEdit,
} from "react-icons/fa";

const ProfileView = ({ profile, setEditing }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaUser className="text-blue-600" /> {profile.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <FaEnvelope className="text-gray-400" /> {profile.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaEdit /> Edit
        </button>
      </div>

      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
        <p>
          <FaBriefcase className="inline text-gray-400 mr-2" />
          <strong>Bio:</strong> {profile.bio || "N/A"}
        </p>
        <p>
          <FaStar className="inline text-yellow-400 mr-2" />
          <strong>Status:</strong> {profile.status}
        </p>
        <p>
          <FaTools className="inline text-gray-400 mr-2" />
          <strong>Role:</strong> {profile.role}
        </p>
        <p>
          <FaUser className="inline text-purple-500 mr-2" />
          <strong>Mentorship:</strong> {profile.mentorshipRole}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <FaStar /> Skills
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {(profile.skills || []).map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-300">
          <FaTools /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {(profile.stack || []).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-pink-700 dark:text-pink-300">
          <FaLightbulb /> Interests
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {(profile.interests || []).map((interest, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
