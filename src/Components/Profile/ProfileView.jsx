import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaTools,
  FaStar,
  FaBriefcase,
  FaLightbulb,
  FaEdit,
  FaUserFriends,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaLaptopCode,
  FaProjectDiagram,
} from "react-icons/fa";
import { MdVerified, MdOutlineScore } from "react-icons/md";
import { SiX } from "react-icons/si";
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProfileView = ({ profile, setEditing }) => {
  
  const {
    userName,
    emailID,
    avatar,
    bio,
    domain,
    stack = [],
    skills = [],
    interests = [],
    location,
    role,
    mentorshipRole,
    socialLinks = {},
    followers = [],
    following = [],
    reputationScore,
    status,
    accountType,
    isVerified,
    createdAt,
    updatedAt,
  } = profile;

  const totalFields = 10;
  const completedFields = [
    userName,
    emailID,
    avatar,
    bio,
    stack.length,
    skills.length,
    interests.length,
    location !== "Unknown",
    socialLinks.github || socialLinks.linkedin || socialLinks.portfolio,
    domain,
  ].filter(Boolean).length;

  const completionPercent = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl relative">
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-40 rounded-t-2xl">
        <div className="absolute top-20 left-6">
          <img
            src={avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="pt-20 px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaUser className="text-blue-500" />
              {userName}{" "}
              {isVerified && <MdVerified className="text-blue-500" />}

            </h2>
            <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2">
              <FaEnvelope /> {emailID}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />{" "}
              {location || "Unknown"}
            </p>
          </div>

          <div>
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:scale-105 transition flex gap-2 items-center"
            >
              <FaEdit /> Edit
            </button>
          </div>
        </div>

        <div className="w-24 h-24 mb-6">
          <CircularProgressbar
            value={completionPercent}
            text={`${completionPercent}%`}
            styles={buildStyles({
              pathColor: "#10B981",
              textColor: "#10B981",
              trailColor: "#D1D5DB",
            })}
          />
        </div>

        {/* Bio Section - Full Width */}
        <div className="mb-6 text-gray-700 dark:text-gray-200">
          <p>
            <FaBriefcase className="inline mr-2" />
            <strong>Bio:</strong> {bio || "N/A"}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200 mb-4">
          <p>
            <FaProjectDiagram className="inline mr-2" />
            <strong>Domain:</strong> {domain || "N/A"}
          </p>
          <p>
            <FaTools className="inline mr-2" />
            <strong>Role:</strong> {role || "N/A"}
          </p>
          <p>
            <FaUserFriends className="inline mr-2" />
            <strong>Mentorship:</strong> {mentorshipRole || "N/A"}
          </p>
          <p>
            <MdOutlineScore className="inline mr-2" />
            <strong>Reputation:</strong> {reputationScore || 0}
          </p>
          <p>
            <FaStar className="inline mr-2" />
            <strong>Status:</strong> {status || "N/A"}
          </p>
          <p>
            <FaLaptopCode className="inline mr-2" />
            <strong>Account:</strong> {accountType || "N/A"}
          </p>
        </div>

        <Section title="Skills" icon={<FaStar />} items={skills} color="blue" />
        <Section
          title="Tech Stack"
          icon={<FaTools />}
          items={stack}
          color="purple"
        />
        <Section
          title="Interests"
          icon={<FaLightbulb />}
          items={interests}
          color="pink"
        />

        <div className="mt-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-white">
            <FaGlobe /> Social Links
          </h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {socialLinks.portfolio && (
              <SocialLink
                url={socialLinks.portfolio}
                label="Portfolio"
                icon={<FaGlobe />}
              />
            )}
            {socialLinks.github && (
              <SocialLink
                url={socialLinks.github}
                label="GitHub"
                icon={<FaGithub />}
              />
            )}
            {socialLinks.linkedin && (
              <SocialLink
                url={socialLinks.linkedin}
                label="LinkedIn"
                icon={<FaLinkedin />}
              />
            )}
            {socialLinks.X && (
              <SocialLink url={socialLinks.X} label="X" icon={<SiX />} />
            )}
            {socialLinks.youtube && (
              <SocialLink
                url={socialLinks.youtube}
                label="YouTube"
                icon={<FaYoutube />}
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-6 items-center text-sm text-gray-600 dark:text-gray-300">
          <span>
            <strong>{followers.length}</strong> Followers
          </span>
          <span>
            <strong>{following.length}</strong> Following
          </span>
        </div>

        <div className="mt-4 text-xs text-gray-400 text-right">
          <p>Created: {dayjs(createdAt).format("DD MMM YYYY, h:mm A")}</p>
          <p>Updated: {dayjs(updatedAt).format("DD MMM YYYY, h:mm A")}</p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, items = [], color }) => {
  if (!items.length) return null;
  return (
    <div className="mt-4">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 text-${color}-700 dark:text-${color}-300`}
      >
        {icon} {title}
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((item, i) => (
          <span
            key={i}
            className={`px-3 py-1 bg-${color}-100 text-${color}-800 rounded-full text-sm transition-all transform hover:scale-105 hover:bg-${color}-200`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const SocialLink = ({ url, label, icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline flex items-center gap-1"
  >
    {icon} {label}
  </a>
);

export default ProfileView;
