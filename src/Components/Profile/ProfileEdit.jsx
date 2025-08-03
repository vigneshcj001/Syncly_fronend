import React, { useState } from "react";
import { api } from "../../utils/api";

const ProfileEdit = ({ profile, setEditing }) => {
  const [formData, setFormData] = useState({ ...profile });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await api.put("/profile/edit", formData);
      setEditing(false);
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          type="email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Avatar URL</label>
        <input
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Mentorship Role</label>
        <select
          name="mentorshipRole"
          value={formData.mentorshipRole || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="mentor">Mentor</option>
          <option value="learner">Learner</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Account Role</label>
        <select
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Account Status</label>
        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Skills</label>
        <input
          value={(formData.skills || []).join(", ")}
          onChange={(e) => handleArrayChange("skills", e.target.value)}
          placeholder="e.g. JavaScript, React, Node"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Tech Stack</label>
        <input
          value={(formData.stack || []).join(", ")}
          onChange={(e) => handleArrayChange("stack", e.target.value)}
          placeholder="e.g. MERN, Next.js, Firebase"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Interests</label>
        <input
          value={(formData.interests || []).join(", ")}
          onChange={(e) => handleArrayChange("interests", e.target.value)}
          placeholder="e.g. Open Source, Web3, Bioinformatics"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {message && <p className="text-red-500">{message}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;
