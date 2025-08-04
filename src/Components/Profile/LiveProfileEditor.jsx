// LiveProfileEditor.jsx
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

const LiveProfileEditor = ({ profile, setProfile, setEditing }) => {
  const dispatch = useDispatch();

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
  const [showToast, setShowToast] = useState(false);

  const [socialLinks, setSocialLinks] = useState({
    portfolio: profile.socialLinks?.portfolio || "",
    github: profile.socialLinks?.github || "",
    X: profile.socialLinks?.X || "",
    linkedin: profile.socialLinks?.linkedin || "",
    youtube: profile.socialLinks?.youtube || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    const calculateProfileCompletion = () => {
      const fields = [
        userName,
        avatar,
        bio,
        domain,
        location,
        mentorshipRole,
        ...stack,
        ...skills,
        ...interests,
        ...Object.values(socialLinks),
      ];
      const completedFields = fields.filter((field) =>
        Array.isArray(field) ? field.length > 0 : field
      ).length;
      const totalFields = fields.length;
      setProfileCompletion((completedFields / totalFields) * 100);
    };
    calculateProfileCompletion();
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

  const handleUpdate = async () => {
    setIsSaving(true);

    for (const key in socialLinks) {
      if (socialLinks[key] && !/^https?:\/\/\S+\.\S+/.test(socialLinks[key])) {
        toast.error(`${key} must be a valid URL`);
        setIsSaving(false);
        return;
      }
    }

    try {
      const cleanData = {
        userName: userName.trim(),
        bio,
        domain,
        stack,
        skills,
        interests,
        location,
        mentorshipRole,
        socialLinks: {},
      };
      if (avatar.trim()) {
        cleanData.avatar = avatar.trim(); 
      }

      Object.keys(socialLinks).forEach((key) => {
        if (socialLinks[key].trim()) {
          cleanData.socialLinks[key] = socialLinks[key].trim();
        }
      });
      const isValidUrl = (url) =>
        /^https?:\/\/\S+\.\S+/.test(url) || url.startsWith("data:image/");

      if (avatar && !isValidUrl(avatar)) {
        toast.error("Avatar must be a valid image URL or base64 string");
        setIsSaving(false);
        return;
      }

const res = await api.put("/profile/edit", cleanData);
      if (res.data.success) {
        dispatch(addUser(res.data.profile));
        setProfile(res.data.profile);
        localStorage.setItem("user", JSON.stringify(res.data.profile));
        toast.success("Profile updated!");
        setShowToast(true);
        const isUnchanged =
          JSON.stringify(cleanData) === JSON.stringify(profile);
        if (isUnchanged) {
          toast("No changes to save");
          setIsSaving(false);
          return;
        }

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setEditing(false);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("🔥 API Error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyle =
    "border border-gray-700 text-gray-100 bg-gray-900 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md placeholder-gray-400 transition-all duration-300";

  const labelStyle = "flex items-center gap-2 text-gray-400 font-semibold mb-2";

  const animatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const TagsInput = ({ value, onChange, placeholder }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        if (
          !value.some((tag) => tag.toLowerCase() === inputValue.toLowerCase())
        ) {
          onChange([...value, inputValue.trim()]);
        }
        setInputValue("");
      }
    };

    const removeTag = (tagToRemove) => {
      onChange(value.filter((tag) => tag !== tagToRemove));
    };

    return (
      <div className={`${inputStyle} flex flex-wrap items-center gap-2`}>
        {value.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-600 text-white px-2 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-white hover:text-red-500 transition-colors"
            >
              x
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-transparent flex-grow focus:outline-none"
        />
      </div>
    );
  };

  const ProgressBar = ({ value }) => {
    const animatedStyle = useSpring({
      width: `${value}%`,
      from: { width: "0%" },
    });

    return (
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
        <animated.div
          className="bg-blue-600 h-2.5 rounded-full"
          style={animatedStyle}
        />
      </div>
    );
  };

  return (
    <animated.div style={animatedProps} className="p-6 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left - Profile Editor */}
        <div className="lg:col-span-2 bg-gray-950 shadow-xl rounded-2xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-6 text-blue-500 flex items-center gap-3 border-b pb-2 border-blue-800">
            <FaUserEdit className="text-2xl" /> Live Profile Editor
          </h2>

          <div className="mb-4">
            <label className={labelStyle}>Profile Completion</label>
            <ProgressBar value={profileCompletion} />
          </div>

          <label className={labelStyle}>
            <BsPersonCircle /> Username
          </label>
          <input
            className={inputStyle}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label className={labelStyle}>
            <AiOutlineGlobal /> Avatar URL
          </label>
          <input
            className={inputStyle}
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <label className={labelStyle}>Bio</label>
          <textarea
            className={inputStyle}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>
                <MdWork /> Domain
              </label>
              <input
                className={inputStyle}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <div>
              <label className={labelStyle}>
                <MdLocationOn /> Location
              </label>
              <input
                className={inputStyle}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <label className={labelStyle}>
            <TbStack3 /> Stack
          </label>
          <TagsInput
            value={stack}
            onChange={setStack}
            placeholder="Add a stack and press Enter"
          />

          <label className={labelStyle}>
            <GiSkills /> Skills
          </label>
          <TagsInput
            value={skills}
            onChange={setSkills}
            placeholder="Add a skill and press Enter"
          />

          <label className={labelStyle}>
            <MdInterests /> Interests
          </label>
          <TagsInput
            value={interests}
            onChange={setInterests}
            placeholder="Add an interest and press Enter"
          />

          <label className={labelStyle}>
            <SiCodementor /> Mentorship Role
          </label>
          <select
            className={`${inputStyle} bg-gray-900 text-white`}
            value={mentorshipRole}
            onChange={(e) => setMentorshipRole(e.target.value)}
          >
            <option value="learner">Learner</option>
            <option value="mentor">Mentor</option>
            <option value="both">Both</option>
          </select>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              { icon: AiOutlineGlobal, label: "Portfolio", field: "portfolio" },
              { icon: FaGithub, label: "GitHub", field: "github" },
              { icon: FaXTwitter, label: "X", field: "X" },
              { icon: FaLinkedin, label: "LinkedIn", field: "linkedin" },
              { icon: FaYoutube, label: "YouTube", field: "youtube" },
            ].map(({ icon: Icon, label, field }) => (
              <div key={field}>
                <label className={labelStyle}>
                  <Icon /> {label}
                </label>
                <input
                  className={inputStyle}
                  placeholder={`${label} URL`}
                  value={socialLinks[field]}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, [field]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className={`mt-6 w-full sm:w-auto px-6 ${
                isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              } bg-blue-600 text-white py-2 rounded-xl text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105`}
            >
              <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Right - Live Preview */}
        <div className="lg:col-span-1 bg-gray-900 rounded-2xl shadow-xl p-6 max-w-md w-full self-start">
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
        {showToast && (
          <div className="toast toast-top toast-center pt-20 ">
            <div className="alert alert-success">
              <span>Profile saved successfully</span>
            </div>
          </div>
        )}
      </div>
    </animated.div>
  );
};

export default LiveProfileEditor;
