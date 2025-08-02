// src/components/pages/Home/Home.js
import React, { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { api } from "../../utils/api";

// Import the child components
import ConnectionsPanel from "./ConnectionsPanel";
import MainContent from "./MainContent";
import ProfileDetail from "./ProfileDetail";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [feed, setFeed] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect for dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Effect for fetching initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [feedRes, connectionsRes] = await Promise.all([
          api.get("/network/feed"),
          api.get("/network/mutualVibes"),
        ]);
        setFeed(feedRes.data.feed || []);
        setConnections(connectionsRes.data.data || []);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handler for swiping action
  const handleSwipe = async (recipientId, status) => {
    try {
      await api.post(`/request/swipe/${status}/${recipientId}`);
      setFeed((prevFeed) => prevFeed.filter((p) => p.user._id !== recipientId));
    } catch (err) {
      console.error(`Failed to ${status}`, err);
      // You can set an error state here to inform the user
    }
  };

  // Conditionally render the ProfileDetail view if a profile is selected
  if (selectedProfile) {
    return (
      <ProfileDetail
        profile={selectedProfile}
        onBack={() => setSelectedProfile(null)}
      />
    );
  }

  // Main component layout
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <ConnectionsPanel
        connections={connections}
        onProfileSelect={setSelectedProfile}
      />

      <div className="flex-1 flex flex-col">
        {/* Top bar with theme switcher */}
        <div className="w-full flex justify-end p-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <MainContent
          profile={feed.length > 0 ? feed[0] : null}
          onSwipe={handleSwipe}
          onProfileSelect={setSelectedProfile}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Home;
