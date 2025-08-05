import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/userSlice";
import { api } from "../../utils/api";
import ProfileView from "./ProfileView";
import LiveProfileEditor from "./LiveProfileEditor";
import ProfileSkeleton from "./ProfileSkeleton";
import LiveProfileEditorSkeleton from "./LiveProfileEditorSkeleton";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Delay to simulate network latency and see the skeleton
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await api.get("/profile/view");

      if (res.data && res.data.success) {
        dispatch(addUser(res.data.profile));
        setProfile(res.data.profile);
      } else {
        setErrorMsg(res.data.message || "Failed to fetch profile.");
      }
    } catch (error) {
      console.error("API Error fetching profile:", error);
      navigate("/login");
      setErrorMsg(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // UPDATED: This block now correctly shows the right skeleton based on the editing state.
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center px-4 md:px-8 py-8">
        {editing ? <LiveProfileEditorSkeleton /> : <ProfileSkeleton />}
      </div>
    );
  }

  if (errorMsg) {
    return <div className="text-center text-red-500 p-10">{errorMsg}</div>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center px-4 md:px-8 py-8">
      {!editing ? (
        <ProfileView profile={profile} setEditing={setEditing} />
      ) : (
        <LiveProfileEditor
          profile={profile}
          setProfile={setProfile}
          setEditing={setEditing} // Passing this function allows the back button to work
        />
      )}
    </div>
  );
};

export default UserProfile;
