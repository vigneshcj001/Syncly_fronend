import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../utils/api";
import { addUser } from "../../redux/userSlice";
import FeedCard from "../Feed/FeedCard";
import { toast } from "react-hot-toast";
import {
  FaSave,
  FaUserEdit,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaArrowLeft,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn, MdInterests, MdWork } from "react-icons/md";
import { SiCodementor } from "react-icons/si";
import { GiSkills } from "react-icons/gi";
import { AiOutlineGlobal } from "react-icons/ai";
import { HiOutlineCode } from "react-icons/hi";
import { TbStack3 } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { useSpring, animated } from "react-spring";

// Helper Component: TagsInput for handling arrays of strings
const TagsInput = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="border border-gray-700 bg-gray-900 rounded px-3 py-2 w-full mb-3 shadow-md">
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-blue-600 text-white text-sm rounded-full px-3 py-1"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="text-white hover:text-gray-200"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-transparent flex-grow outline-none text-gray-100 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

// Helper Component: ProgressBar for showing profile completion
const ProgressBar = ({ value }) => {
  const animatedProps = useSpring({
    width: `${value}%`,
    from: { width: "0%" },
  });
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <animated.div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
        style={animatedProps}
      ></animated.div>
    </div>
  );
};

const LiveProfileEditor = ({ profile, setProfile, setEditing }) => {
  const dispatch = useDispatch();

  // State for all editable profile fields
  const [userName, setUserName] = useState(profile.userName || "");
  const [avatar, setAvatar] = useState(profile.avatar || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [domain, setDomain] = useState(profile.domain || "");
  const [stack, setStack] = useState(profile.stack || []);
  const [skills, setSkills] = useState(profile.skills || []);
  const [interests, setInterests] = useState(profile.interests || []);
  const [location, setLocation] = useState(profile.location || "");
  const [mentorshipRole, setMentorshipRole] = useState(
    profile.mentorshipRole || "learner"
  );
  const [socialLinks, setSocialLinks] = useState({
    portfolio: profile.socialLinks?.portfolio || "",
    github: profile.socialLinks?.github || "",
    X: profile.socialLinks?.X || "",
    linkedin: profile.socialLinks?.linkedin || "",
    youtube: profile.socialLinks?.youtube || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);

  // Effect to calculate profile completion percentage
  useEffect(() => {
    const fields = [userName, avatar, bio, domain, location, mentorshipRole];
    const arrayFields = [stack, skills, interests];
    const socialFields = Object.values(socialLinks).filter((link) => link);

    const filledFields = fields.filter(Boolean).length;
    const filledArrayFields = arrayFields.filter(
      (arr) => arr.length > 0
    ).length;

    const totalFields =
      fields.length + arrayFields.length + Object.keys(socialLinks).length;
    const completedCount =
      filledFields + filledArrayFields + socialFields.length;

    setProfileCompletion(Math.round((completedCount / totalFields) * 100));
  }, [
    userName,
    avatar,
    bio,
    domain,
    stack,
    skills,
    interests,
    location,
    mentorshipRole,
    socialLinks,
  ]);

  // Handler for saving the updated profile
  const handleUpdate = async () => {
    setIsSaving(true);
    const updatedProfile = {
      userName,
      avatar,
      bio,
      domain,
      stack,
      skills,
      interests,
      location,
      mentorshipRole,
      socialLinks,
    };

    try {
      const response = await api.put("/user/profile/update", updatedProfile);
      if (response.data.success) {
        const updatedUser = response.data.user;
        dispatch(addUser(updatedUser)); // Update Redux state
        setProfile(updatedUser); // Update local parent state
        toast.success("Profile saved successfully!");
        setTimeout(() => setEditing(false), 1000); // Go back after a short delay
      } else {
        throw new Error(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Common styles for inputs and labels
  const inputStyle =
    "border border-gray-700 text-gray-100 bg-gray-900 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md placeholder-gray-400 transition-all duration-300";
  const labelStyle = "flex items-center gap-2 text-gray-400 font-semibold mb-2";
  const animatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={animatedProps} className="p-6 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left - Profile Editor Form */}
        <div className="lg:col-span-2 bg-gray-950 shadow-xl rounded-2xl p-6 text-white">
          <div className="flex justify-between items-center mb-6 border-b pb-2 border-blue-800">
            <h2 className="text-3xl font-bold text-blue-500 flex items-center gap-3">
              <FaUserEdit className="text-2xl" /> Live Profile Editor
            </h2>
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Back to profile"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
          </div>

          <div className="mb-6">
            <label className={labelStyle}>Profile Completion</label>
            <ProgressBar value={profileCompletion} />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>
                <BsPersonCircle /> Username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={inputStyle}
                placeholder="E.g., jane_doe"
              />
            </div>
            <div>
              <label className={labelStyle}>
                <AiOutlineGlobal /> Avatar URL
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className={inputStyle}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>
              <MdWork /> Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={inputStyle}
              rows="3"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>
                <HiOutlineCode /> Primary Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className={inputStyle}
                placeholder="E.g., Frontend Developer"
              />
            </div>
            <div>
              <label className={labelStyle}>
                <MdLocationOn /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputStyle}
                placeholder="E.g., San Francisco, CA"
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>
              <TbStack3 /> Tech Stack
            </label>
            <TagsInput
              value={stack}
              onChange={setStack}
              placeholder="Add a technology and press Enter..."
            />
          </div>
          <div>
            <label className={labelStyle}>
              <GiSkills /> Skills
            </label>
            <TagsInput
              value={skills}
              onChange={setSkills}
              placeholder="Add a skill and press Enter..."
            />
          </div>
          <div>
            <label className={labelStyle}>
              <MdInterests /> Interests
            </label>
            <TagsInput
              value={interests}
              onChange={setInterests}
              placeholder="Add an interest and press Enter..."
            />
          </div>

          <div>
            <label className={labelStyle}>
              <SiCodementor /> Mentorship Role
            </label>
            <select
              value={mentorshipRole}
              onChange={(e) => setMentorshipRole(e.target.value)}
              className={inputStyle}
            >
              <option value="learner">Learner</option>
              <option value="mentor">Mentor</option>
              <option value="both">Both</option>
            </select>
          </div>

          <h3 className="text-xl font-bold text-blue-500 mt-6 mb-4 border-t pt-4 border-gray-800">
            Social Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div className="mb-3">
              <label className={labelStyle}>
                <AiOutlineGlobal /> Portfolio
              </label>
              <input
                type="text"
                value={socialLinks.portfolio}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, portfolio: e.target.value })
                }
                className={inputStyle}
                placeholder="Your personal site URL"
              />
            </div>
            <div className="mb-3">
              <label className={labelStyle}>
                <FaGithub /> GitHub
              </label>
              <input
                type="text"
                value={socialLinks.github}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, github: e.target.value })
                }
                className={inputStyle}
                placeholder="GitHub profile URL"
              />
            </div>
            <div className="mb-3">
              <label className={labelStyle}>
                <FaLinkedin /> LinkedIn
              </label>
              <input
                type="text"
                value={socialLinks.linkedin}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                }
                className={inputStyle}
                placeholder="LinkedIn profile URL"
              />
            </div>
            <div className="mb-3">
              <label className={labelStyle}>
                <FaXTwitter /> X (Twitter)
              </label>
              <input
                type="text"
                value={socialLinks.X}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, X: e.target.value })
                }
                className={inputStyle}
                placeholder="X profile URL"
              />
            </div>
            <div className="mb-3">
              <label className={labelStyle}>
                <FaYoutube /> YouTube
              </label>
              <input
                type="text"
                value={socialLinks.youtube}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, youtube: e.target.value })
                }
                className={inputStyle}
                placeholder="YouTube channel URL"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className={`w-full sm:w-auto px-6 py-2 rounded-lg text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                isSaving
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Right - Live Preview */}
        <div className="lg:col-span-1 bg-gray-900 rounded-2xl shadow-xl p-6 max-w-md w-full self-start sticky top-10">
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
            <HiOutlineCode className="text-blue-500" /> Live Preview
          </h3>
          <FeedCard
            profile={{
              ...profile,
              userName,
              avatar: avatar || undefined,
              bio,
              domain,
              stack,
              skills,
              interests,
              location,
              mentorshipRole,
              socialLinks,
            }}
          />
        </div>
      </div>
    </animated.div>
  );
};

export default LiveProfileEditor;
