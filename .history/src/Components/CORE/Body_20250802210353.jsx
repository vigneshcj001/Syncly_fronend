import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { addUser } from "../../redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      console.error("Profile fetch failed", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
