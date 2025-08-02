// src/components/pages/Home/MainContent.js
import React from "react";
import { FiX, FiHeart, FiSend } from "react-icons/fi";
import Card from "./Card";

const MainContent = ({
  profile,
  onSwipe,
  onProfileSelect,
  isLoading,
  error,
}) => {
  const handleSwipe = (status) => {
    if (profile) {
      onSwipe(profile.user._id, status);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading profiles...</p>;
    }
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }
    if (profile) {
      return (
        <>
          <Card profile={profile} onProfileSelect={onProfileSelect} />
          <div className="flex gap-6 mt-6">
            <button
              onClick={() => handleSwipe("Ghost")}
              className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              aria-label="Ghost"
            >
              <FiX size={32} />
            </button>
            <button
              onClick={() => handleSwipe("Vibe")}
              className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full text-green-500 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
              aria-label="Vibe"
            >
              <FiHeart size={32} />
            </button>
            <button
              className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              aria-label="Chat"
            >
              <FiSend size={32} />
            </button>
          </div>
          <div className="flex gap-12 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Ghost</span>
            <span>Vibe</span>
            <span>Chat</span>
          </div>
        </>
      );
    }
    return <p className="text-xl">No new profiles to show right now.</p>;
  };

  return (
    <div className="w-full md:w-3/4 flex flex-col items-center justify-center p-6">
      {renderContent()}
    </div>
  );
};

export default MainContent;
