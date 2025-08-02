// src/components/pages/Home/ConnectionsPanel.js
import React from "react";
import { FiUser } from "react-icons/fi";

const ConnectionsPanel = ({ connections, onProfileSelect }) => {
  return (
    <div className="w-full md:w-1/4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col hidden md:flex">
      {/* Top Profile Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
          <FiUser size={24} />
        </div>
        <div>
          <h2 className="font-bold text-lg">You</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your Profile
          </p>
        </div>
      </div>

      {/* Connections List */}
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-4">Connections</h3>
        {connections.length > 0 ? (
          connections.map((conn) => (
            <div
              key={conn._id}
              onClick={() => onProfileSelect(conn)}
              className="flex items-center gap-3 mb-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <img
                src={conn.avatar}
                alt={conn.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">{conn.userName}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No connections yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPanel;
