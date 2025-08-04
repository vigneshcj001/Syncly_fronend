import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { api } from "../../utils/api";
import ProfileView from "./ProfileView";
import Logout from "../pages/Auth/Logout";
import LiveProfileEditor from "./LiveProfileEditor";

const Body = () => {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/view");
        const { success, profile, message } = res.data;

        if (success) {
          dispatch(addUser(profile));
          setProfile(profile);
        } else {
          setErrorMsg(message || "Profile not found");
        }
      } catch (error) {
        setErrorMsg(error?.response?.data?.message || "Unexpected error");
        navigate("/login");
      }
    };

    if (!userData || !userData.emailID) {
      fetchProfile();
    } else {
      setProfile(userData);
    }
  }, [dispatch, navigate, userData]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4">
      <div className="flex justify-between items-center mb-4">
        <Logout />
        {profile && (
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            {editMode ? "View Profile" : "Edit Profile"}
          </button>
        )}
      </div>

      {profile ? (
        editMode ? (
          <LiveProfileEditor profile={profile} />
        ) : (
          <ProfileView profile={profile} />
        )
      ) : (
        <p className="text-center text-lg text-gray-600 dark:text-white">
          {errorMsg || "Loading..."}
        </p>
      )}
    </div>
  );
};

export default Body;
