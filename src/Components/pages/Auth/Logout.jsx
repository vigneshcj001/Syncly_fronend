
import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../redux/userSlice"
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";

const Logout = ({ className = "", children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Logout failed:",
        error?.response?.data?.message || error.message
      );
    } finally {
      localStorage.removeItem("user");
      dispatch(removeUser());
      navigate("/login");
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children || "Logout"}
    </button>
  );
};

export default Logout;
