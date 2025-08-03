import React from "react";
import {
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaCode,
  FaStar,
  FaUserFriends,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // ✅ X (Twitter) icon from fa6
import { MdVerified } from "react-icons/md";

const ProfileView = ({ profile }) => {
  const {
    avatar,
    userName,
    emailID,
    bio,
    stack,
    skills,
    location,
    role,
    mentorshipRole,
    isVerified,
    preferences,
    accountType,
    following,
    followers,
    socialLinks,
    reputationScore,
  } = profile || {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl mt-10">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <img
          src={avatar}
          alt="Profile Avatar"
          className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            {userName}
            {isVerified && <MdVerified className="text-blue-500 text-xl" />}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <FaEnvelope /> {emailID}
          </p>
          <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
            {bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaUser /> Role: <span className="font-medium">{role}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaStar /> Account:{" "}
          <span className="font-medium capitalize">{accountType}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaMapMarkerAlt /> Location:{" "}
          <span className="font-medium">{location || "Unknown"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaUserFriends /> Mentorship:{" "}
          <span className="font-medium capitalize">{mentorshipRole}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          🤝 Match Type:{" "}
          <span className="font-medium capitalize">
            {preferences?.matchType}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          ⭐ Reputation Score:{" "}
          <span className="font-medium">{reputationScore}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          📍 Following:{" "}
          <span className="font-medium">{following?.length || 0}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          📌 Followers:{" "}
          <span className="font-medium">{followers?.length || 0}</span>
        </div>
      </div>

      {/* Stack & Skills */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 flex items-center gap-2">
          <FaCode /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {stack?.length > 0 ? (
            stack.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white rounded-full text-xs"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No stack specified</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills?.length > 0 ? (
            skills.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-white rounded-full text-xs"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No skills listed</span>
          )}
        </div>
      </div>

      {/* Social Links */}
      {socialLinks && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
            Connect with me
          </h3>
          <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-300">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            )}
            {socialLinks.portfolio && (
              <a
                href={socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </a>
            )}
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            )}
            {socialLinks.X && (
              <a href={socialLinks.X} target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
