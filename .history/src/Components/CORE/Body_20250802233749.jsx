import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { addUser } from "../../redux/userSlice";

const Body = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/view");
      if (res.data.success) {
        dispatch(addUser(res.data.profile));
        setProfile(res.data.profile);
      } else {
        setErrorMsg(res.data.message || "Profile not found");
      }
    } catch (error) {
      navigate("/login");
      setErrorMsg(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (errorMsg) {
    return <div className="text-red-500 text-center mt-4">{errorMsg}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-4">Loading profile...</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{profile.userName}</h2>
          <p className="text-gray-500">{profile.emailID}</p>
        </div>
      </div>

      <p className="text-gray-700">{profile.bio}</p>

      <div>
        <h3 className="font-medium">Skills:</h3>
        {profile.skills.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {profile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills added yet.</p>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>Location: {profile.location}</p>
        <p>Account Type: {profile.accountType}</p>
        <p>Mentorship Role: {profile.mentorshipRole}</p>
        <p>Status: {profile.status}</p>
      </div>
    </div>
  );
};

export default Body;
