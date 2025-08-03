import React from "react";
import { FaEdit } from "react-icons/fa";

const ProfileView = ({ profile, setEditing }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl relative group">
      <button
        onClick={() => setEditing(true)}
        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
      >
        <FaEdit className="h-5 w-5 text-gray-600" />
      </button>

      <div className="flex gap-4 items-center">
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.userName}</h2>
          <p className="text-gray-500">{profile.emailID}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-700 italic">{profile.bio}</p>

      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p>📍 Location: {profile.location}</p>
        <p>🎓 Mentorship Role: {profile.mentorshipRole}</p>
        <p>🛡️ Account Type: {profile.role}</p>
        <p>📶 Status: {profile.status}</p>
        <p>🧠 Domain: {profile.domain}</p>
        <p>🔗 Social Links:</p>
        <ul className="ml-4 list-disc">
          {Object.entries(profile.socialLinks || {}).map(([key, value]) => (
            <li key={key} className="text-blue-600 underline">
              <a href={value} target="_blank" rel="noopener noreferrer">
                {key}: {value}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Stack:</h3>
        {profile.stack.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.stack.map((item, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No stack listed.</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Skills:</h3>
        {profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills listed.</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Interests:</h3>
        {profile.interests.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.interests.map((interest, i) => (
              <span
                key={i}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No interests listed.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
