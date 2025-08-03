import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/userSlice";
import { api } from "../../utils/api";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [editing, setEditing] = useState(false);
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
      setErrorMsg(error?.response?.data?.message || "Unexpected error");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (errorMsg) return <div className="text-red-500">{errorMsg}</div>;
  if (!profile) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!editing ? (
        <ProfileView profile={profile} setEditing={setEditing} />
      ) : (
        <ProfileEdit
          profile={profile}
          setProfile={setProfile}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default UserProfile;
