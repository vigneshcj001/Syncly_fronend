import React, { useState } from "react";
import { api } from "../../utils/api";
const ProfileEdit = ({ profile, setProfile, setEditing }) => {
  const [formData, setFormData] = useState(profile);

  const updateProfile = async () => {
    try {
      const { user, emailID, ...dataToUpdate } = formData;
      const res = await api.put("/profile/edit", dataToUpdate);
      if (res.data.success) {
        setProfile(res.data.profile);
        setEditing(false);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        <input
          type="text"
          value={formData.userName || ""}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          disabled
          placeholder="Username"
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />

        <input
          type="email"
          value={formData.emailID || ""}
          disabled
          placeholder="Email"
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />

        <textarea
          value={formData.bio || ""}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Your bio"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          value={formData.location || ""}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="Location"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          value={formData.domain || ""}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
          placeholder="Domain"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          value={formData.mentorshipRole || ""}
          onChange={(e) =>
            setFormData({ ...formData, mentorshipRole: e.target.value })
          }
          placeholder="Mentorship Role (mentor/learner/both)"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          value={formData.role || ""}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="Role (user/admin/moderator)"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          value={formData.status || ""}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          placeholder="Status (active/suspended/deactivated)"
          className="w-full px-3 py-2 border rounded"
        />

        {/* Social Links */}
        {Object.keys(formData.socialLinks || {}).map((key) => (
          <input
            key={key}
            type="url"
            value={formData.socialLinks[key] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                socialLinks: {
                  ...formData.socialLinks,
                  [key]: e.target.value,
                },
              })
            }
            placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
            className="w-full px-3 py-2 border rounded"
          />
        ))}

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditing(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={updateProfile}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
