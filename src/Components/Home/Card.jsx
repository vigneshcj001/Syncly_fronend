// src/components/pages/Home/Card.js
import React, { useState } from "react";
import {
  FiX,
  FiHeart,
  FiSend,
  FiCode,
  FiUser,
  FiMoreHorizontal,
} from "react-icons/fi";

const Card = ({ profile, onProfileSelect, onSwipe }) => {
  const [activeTab, setActiveTab] = useState("about");

  if (!profile) return null;

  const user = profile.user || {};

  const handleSwipe = (direction) => {
    if (!user._id) return;
    const status = direction === "right" ? "Vibe" : "Ghost";
    onSwipe(user._id, status);
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 text-center py-2 text-sm font-medium ${
        activeTab === id
          ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
          : "text-gray-500 dark:text-gray-400"
      }`}
    >
      <Icon className="inline mr-1" />
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden transition-all">
      {/* Image */}
      <div
        className="relative h-72 cursor-pointer"
        onClick={() => onProfileSelect(profile)}
        title={`View ${profile.userName}'s profile`}
      >
        <img
          src={profile.avatar}
          alt={profile.userName}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
          Tap to view full profile
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800">
        <TabButton id="about" icon={FiUser} label="About" />
        <TabButton id="projects" icon={FiCode} label="Projects" />
        <TabButton id="more" icon={FiMoreHorizontal} label="More" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {activeTab === "about" && (
          <>
            <h2 className="text-2xl font-bold">{profile.userName}</h2>
            <p className="text-gray-600 dark:text-gray-300">{profile.bio}</p>
            <div>
              <h4 className="text-sm font-semibold">Skills:</h4>
              <p className="text-sm">
                {profile.skills?.join(", ") || "Not specified"}
              </p>
            </div>
          </>
        )}

        {activeTab === "projects" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            {/* You can map real projects here later */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon: exciting projects!
            </p>
          </div>
        )}

        {activeTab === "more" && (
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Stack:</strong>{" "}
              {profile.stack?.join(", ") || "Not specified"}
            </li>
            <li>
              <strong>Interests:</strong>{" "}
              {profile.interests?.join(", ") || "Not specified"}
            </li>
            <li>
              <strong>Domain:</strong> {profile.domain || "Not specified"}
            </li>
            <li>
              <strong>Location:</strong> {profile.location || "Unknown"}
            </li>
          </ul>
        )}
      </div>

      {/* Swipe Buttons */}
      <div className="flex justify-around items-center py-4 border-t dark:border-gray-700">
        <button
          onClick={() => handleSwipe("left")}
          className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:scale-110 transition"
          aria-label="Ghost"
        >
          <FiX size={24} />
        </button>
        <button
          className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:scale-110 transition"
          aria-label="Chat"
        >
          <FiSend size={24} />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:scale-110 transition"
          aria-label="Vibe"
        >
          <FiHeart size={24} />
        </button>
      </div>
    </div>
  );
};

export default Card;
