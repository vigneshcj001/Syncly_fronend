import React, { useState } from "react";
import ProfileEdit from "./ProfileEdit";

const ProfileView = ({ profile }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {editing ? (
        <ProfileEdit profile={profile} setEditing={setEditing} />
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Profile</h2>
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center mb-4">
            <img
              src={profile.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <p className="mb-2">
            <strong>Bio:</strong> {profile.bio}
          </p>
          <p className="mb-2">
            <strong>Role:</strong> {profile.role}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {profile.status}
          </p>
          <p className="mb-2">
            <strong>Mentorship Role:</strong> {profile.mentorshipRole}
          </p>
          <p className="mb-2">
            <strong>Skills:</strong> {(profile.skills || []).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Tech Stack:</strong> {(profile.stack || []).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Interests:</strong> {(profile.interests || []).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
