import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaYoutube,
  FaCommentDots,
  FaUserFriends,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { FaUser, FaStar, FaCodeBranch, FaXTwitter } from "react-icons/fa6";
import { TbHeartFilled, TbGhost2Filled } from "react-icons/tb";

const FeedCard = ({ profile }) => {
  const [activeTab, setActiveTab] = useState("about");
  const socialLinks = profile.socialLinks || {};

  const tabStyle = (tab) =>
    `px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition ${
      activeTab === tab
        ? "bg-indigo-600 text-white"
        : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300"
    }`;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-md p-6 flex flex-col justify-between text-center transition hover:shadow-lg h-[500px] max-w-md w-full">
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={profile.avatar || null} // FIX: Pass null if avatar is an empty string
          alt={profile.userName}
          className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 mb-3"
        />
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">
          {profile.userName}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {profile.emailID}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-3 flex-wrap">
        {["about", "skills", "preferences", "social"].map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={tabStyle(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        ))}
      </div>

      {/* Tab Content */}
      <div className="overflow-y-auto flex-1 px-1 text-left text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-4">
        {activeTab === "about" && (
          <>
            <p>
              <strong>Bio:</strong> {profile.bio || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {profile.location || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {profile.role || "N/A"}
            </p>
            <p>
              <strong>Mentorship:</strong> {profile.mentorshipRole || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {profile.status || "N/A"}
            </p>
          </>
        )}

        {activeTab === "skills" && (
          <>
            <p>
              <strong>Stack:</strong> {profile.stack?.join(", ") || "None"}
            </p>
            <p>
              <strong>Skills:</strong> {profile.skills?.join(", ") || "None"}
            </p>
            <p>
              <strong>Interests:</strong>{" "}
              {profile.interests?.join(", ") || "None"}
            </p>
          </>
        )}

        {activeTab === "preferences" && (
          <>
            <p>
              <strong>Match Type:</strong>{" "}
              {profile.preferences?.matchType || "N/A"}
            </p>
            <p>
              <strong>Collab Interest:</strong>{" "}
              {profile.preferences?.collabInterest ? "Yes" : "No"}
            </p>
            <p>
              <strong>Account Type:</strong> {profile.accountType || "Free"}
            </p>
            <p>
              <strong>Verified:</strong> {profile.isVerified ? "Yes" : "No"}
            </p>
            <p>
              <strong>Online:</strong> {profile.isOnline ? "Yes" : "No"}
            </p>
            <p>
              <strong>Reputation:</strong> {profile.reputationScore || 0}
            </p>
          </>
        )}

        {activeTab === "social" && (
          <div className="flex flex-wrap gap-3 items-center">
            {socialLinks.portfolio && (
              <a href={socialLinks.portfolio} target="_blank" rel="noreferrer">
                <FaGlobe size={18} />
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer">
                <FaGithub size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin size={18} />
              </a>
            )}
            {socialLinks.X && (
              <a href={socialLinks.X} target="_blank" rel="noreferrer">
                <FaXTwitter size={18} />
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noreferrer">
                <FaYoutube size={18} />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                <FaInstagram size={18} />
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
                <FaFacebookF size={18} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center gap-4 mt-2">
        <button
          className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-600 dark:text-white p-2 rounded-full transition"
          title="Message"
        >
          <FaCommentDots size={32} />
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-white p-2 rounded-full transition"
          title="Ghost"
        >
          <TbGhost2Filled size={32} />
        </button>
        <button
          className="bg-pink-100 hover:bg-pink-200 dark:bg-pink-800 dark:hover:bg-pink-700 text-pink-600 dark:text-white p-2 rounded-full transition"
          title="Vibe"
        >
          <TbHeartFilled size={32} />
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
