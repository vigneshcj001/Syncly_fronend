// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/pages/Auth/Signup";
import Login from "./Components/pages/Auth/Login";
import Body from "./Components/CORE/Body";
import Profile from "./Components/pages/Profile/Profile"; // ✅ import profile
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user?.profile); // ✅ access profile

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<Body />}>
          <Route
            index
            element={
              user ? (
                <div className="text-2xl text-center mt-10">Hello {user.userName}</div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* ✅ Profile Route */}
          <Route
            path="profile"
            element={
              user ? <Profile /> : <Navigate to="/login" />
            }
          />
        </Route>

        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
