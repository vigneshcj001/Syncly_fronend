import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { addUser } from "../../redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.profile);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data.profile));
    } catch (error) {
      console.error("Profile fetch failed", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id) fetchProfile();
    else setLoading(false);
  }, [user]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
