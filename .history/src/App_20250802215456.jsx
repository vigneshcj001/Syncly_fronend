// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/pages/Auth/Signup";
import Login from "./Components/pages/Auth/Login";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Optional: restore user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(addUser(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div className="text-2xl text-white bg-black h-screen flex items-center justify-center">
                Hello {user.userName}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
