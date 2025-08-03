import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { addUser } from "../../redux/userSlice";
import { FaEdit } from "react-icons/fa";

const Body = () => {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/view");
      if (res.data.success) {
        dispatch(addUser(res.data.profile));
        setProfile(res.data.profile);
        setFormData(res.data.profile); // for edit form
      } else {
        setErrorMsg(res.data.message || "Profile not found");
      }
    } catch (error) {
      navigate("/login");
      setErrorMsg(error?.response?.data?.message || "Unexpected error");
    }
  };

  const updateProfile = async () => {
    try {
      const res = await api.put("/profile/edit", formData);
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

  useEffect(() => {
    fetchProfile();
  }, []);

  if (errorMsg) return <div className="text-red-500">{errorMsg}</div>;
  if (!profile) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl transition hover:shadow-2xl relative group">
        <button
          onClick={() => setEditing(true)}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
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
          <p>🛡️ Account Type: {profile.accountType}</p>
          <p>📶 Status: {profile.status}</p>
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
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Edit Profile</h2>

            <input
              type="text"
              value={formData.userName || ""}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="Username"
              className="w-full px-3 py-2 border rounded"
            />

            <textarea
              value={formData.bio || ""}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
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
      )}
    </div>
  );
};

export default Body;
