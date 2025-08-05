import React from "react";
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

const colorMap = {
  blue: {
    heading: "text-blue-400",
    tag: "bg-blue-300 text-blue-900 hover:bg-blue-400",
  },
  purple: {
    heading: "text-purple-400",
    tag: "bg-purple-300 text-purple-900 hover:bg-purple-400",
  },
  pink: {
    heading: "text-pink-400",
    tag: "bg-pink-300 text-pink-900 hover:bg-pink-400",
  },
};

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
    location,
    socialLinks.github || socialLinks.linkedin,
    domain,
  ].filter(Boolean).length;

  const completionPercent = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-gray-900 shadow-xl rounded-2xl relative flex flex-col text-gray-200">
      {/* Avatar */}
      <div className="pt-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={avatar || "https://i.pravatar.cc/150"}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-gray-900 shadow-lg object-cover"
          />
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setEditing(true)}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex gap-2 items-center text-sm"
        >
          <FaEdit /> Edit
        </button>

        {/* Basic Info */}
        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold text-white">{userName}</h2>
          <p className="text-gray-400">{emailID}</p>
        </div>

        {/* Profile Completion */}
        <div className="w-20 h-20 my-6 mx-auto">
          <CircularProgressbar
            value={completionPercent}
            text={`${completionPercent}%`}
            styles={buildStyles({
              pathColor: "#10B981",
              textColor: "#10B981",
              trailColor: "#374151",
            })}
          />
        </div>

        {/* Bio */}
        <div className="mb-6 text-gray-300">
          <p className="flex items-center gap-3">
            <FaBriefcase className="text-gray-500" />
            <strong>Bio:</strong> {bio || "Not specified."}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-gray-300 mb-4 text-sm">
          <p className="flex items-center gap-2">
            <FaProjectDiagram className="text-gray-500" />
            <strong>Domain:</strong> {domain || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <FaTools className="text-gray-500" />
            <strong>Role:</strong> {role || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <FaUserFriends className="text-gray-500" />
            <strong>Mentorship:</strong> {mentorshipRole || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineScore className="text-gray-500" />
            <strong>Reputation:</strong> {reputationScore || 0}
          </p>
          <p className="flex items-center gap-2">
            <FaStar className="text-gray-500" />
            <strong>Status:</strong> {status || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <FaLaptopCode className="text-gray-500" />
            <strong>Account:</strong> {accountType || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <FaGlobe className="text-gray-500" />
            <strong>Created:</strong>{" "}
            {createdAt ? dayjs(createdAt).format("DD MMM YYYY") : "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <FaGlobe className="text-gray-500" />
            <strong>Updated:</strong>{" "}
            {updatedAt ? dayjs(updatedAt).format("DD MMM YYYY") : "N/A"}
          </p>
        </div>

        {/* Skills & Stack */}
        <Section title="Skills" icon={<FaStar />} items={skills} color="blue" />
        <Section
          title="Tech Stack"
          icon={<FaTools />}
          items={stack}
          color="purple"
        />

        {/* Social Links */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
            <FaGlobe /> Social Links
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
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
            {socialLinks.youtube && (
              <SocialLink
                url={socialLinks.youtube}
                label="YouTube"
                icon={<FaYoutube />}
              />
            )}
            {socialLinks.X && (
              <SocialLink url={socialLinks.X} label="X" icon={<SiX />} />
            )}
          </div>
        </div>

        {/* Followers */}
        <div className="mt-6 flex gap-6 items-center text-sm text-gray-400">
          <span>
            <strong>{followers.length}</strong> Followers
          </span>
          <span>
            <strong>{following.length}</strong> Following
          </span>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, items = [], color }) => {
  if (!items || items.length === 0) return null;
  const styles = colorMap[color] || colorMap.blue;
  return (
    <div className="mt-6">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 mb-2 ${styles.heading}`}
      >
        {icon} {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-transform transform hover:scale-105 ${styles.tag}`}
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
    className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 transition-colors"
  >
    {icon} {label}
  </a>
);

export default ProfileView;
