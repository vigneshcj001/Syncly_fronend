import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout route
      await api.post("/auth/logout");

      // Clear frontend state
      localStorage.removeItem("user");
      dispatch(removeUser());

      // Redirect
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout failed:",
        error?.response?.data?.message || error.message
      );
      // Still logout client-side even if server fails
      localStorage.removeItem("user");
      dispatch(removeUser());
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default Logout;
