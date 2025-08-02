// src/components/layout/Body.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { addUser } from "../../redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user?.profile);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      if (response.data.success && response.data.profile) {
        dispatch(addUser(response.data.profile));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Profile fetch failed", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  return <Outlet />;
};

export default Body;
