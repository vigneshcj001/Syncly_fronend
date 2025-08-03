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
import { FaXTwitter } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
    <Icon /> {label}: <span className="font-medium">{value}</span>
  </div>
);

const TagList = ({ items, className }) =>
  items?.length > 0 ? (
    items.map((item, idx) => (
      <span key={idx} className={`px-3 py-1 rounded-full text-xs ${className}`}>
        {item}
      </span>
    ))
  ) : (
    <span className="text-gray-500">None listed</span>
  );

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
      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src={avatar}
          alt="Avatar"
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

      {/* Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <InfoItem icon={FaUser} label="Role" value={role} />
        <InfoItem icon={FaStar} label="Account" value={accountType} />
        <InfoItem icon={FaMapMarkerAlt} label="Location" value={location} />
        <InfoItem
          icon={FaUserFriends}
          label="Mentorship"
          value={mentorshipRole}
        />
        <InfoItem
          icon={() => <>🤝</>}
          label="Match Type"
          value={preferences?.matchType}
        />
        <InfoItem
          icon={() => <>⭐</>}
          label="Reputation Score"
          value={reputationScore}
        />
        <InfoItem
          icon={() => <>📍</>}
          label="Following"
          value={following?.length}
        />
        <InfoItem
          icon={() => <>📌</>}
          label="Followers"
          value={followers?.length}
        />
      </div>

      {/* Stack */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 flex items-center gap-2">
          <FaCode /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          <TagList
            items={stack}
            className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          <TagList
            items={skills}
            className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-white"
          />
        </div>
      </div>

      {/* Socials */}
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
