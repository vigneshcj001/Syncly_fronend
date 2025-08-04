import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../utils/api";
import { addUser } from "../../redux/userSlice";
import FeedCard from "../Feed/FeedCard";
import { toast } from "react-hot-toast";

// ICONS
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

const LiveProfileEditor = ({ profile }) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(profile.userName || "");
  const [avatar, setAvatar] = useState(profile.avatar || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [domain, setDomain] = useState(profile.domain || "");
  const [stack, setStack] = useState((profile.stack || []).join(", "));
  const [skills, setSkills] = useState((profile.skills || []).join(", "));
  const [interests, setInterests] = useState(
    (profile.interests || []).join(", ")
  );
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

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const res = await api.put("/profile/edit", {
        userName,
        avatar,
        bio,
        domain,
        stack: stack.split(",").map((s) => s.trim()),
        skills: skills.split(",").map((s) => s.trim()),
        interests: interests.split(",").map((i) => i.trim()),
        location,
        mentorshipRole,
        socialLinks,
      });

      if (res.data.success) {
        dispatch(addUser(res.data.profile));
        toast.success("Profile updated!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

 const inputStyle =
   "border border-gray-700 text-gray-100 bg-gray-900 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md placeholder-gray-400";

  const labelStyle = "flex items-center gap-2 text-gray-800 font-semibold";

  return (
    <div className="p-6 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Editor */}
        <div className="bg-gray-950 shadow-xl rounded-2xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-3 border-b pb-2 border-blue-200">
            <FaUserEdit className="text-2xl text-blue-500" /> Live Profile
            Editor
          </h2>

          <div>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>
                  <TbStack3 /> Stack
                </label>
                <input
                  className={inputStyle}
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                />
              </div>
              <div>
                <label className={labelStyle}>
                  <GiSkills /> Skills
                </label>
                <input
                  className={inputStyle}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </div>

            <label className={labelStyle}>
              <MdInterests /> Interests
            </label>
            <input
              className={inputStyle}
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />

            <label className={labelStyle}>
              <SiCodementor /> Mentorship Role
            </label>
            <select
              className={inputStyle}
              value={mentorshipRole}
              onChange={(e) => setMentorshipRole(e.target.value)}
            >
              <option value="learner">Learner</option>
              <option value="mentor">Mentor</option>
              <option value="both">Both</option>
            </select>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                {
                  icon: AiOutlineGlobal,
                  label: "Portfolio",
                  field: "portfolio",
                },
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
                      setSocialLinks({
                        ...socialLinks,
                        [field]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className={`mt-6 w-full ${
                isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              } bg-blue-600 text-white py-2 rounded-xl text-lg font-medium flex items-center justify-center gap-2 transition`}
            >
              <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-3">
            <HiOutlineCode className="text-blue-600" /> Live Preview
          </h3>
          <FeedCard
            profile={{
              ...profile,
              userName,
              avatar,
              bio,
              domain,
              stack: stack.split(",").map((s) => s.trim()),
              skills: skills.split(",").map((s) => s.trim()),
              interests: interests.split(",").map((i) => i.trim()),
              location,
              mentorshipRole,
              socialLinks,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveProfileEditor;
