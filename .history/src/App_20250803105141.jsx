// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/pages/Auth/Signup";
import Login from "./Components/pages/Auth/Login";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";
import Body from "./Components/CORE/Body";
import Profile from "./Components/Profile/Profile"

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
            user ? (<h1>Hello + {DataTransfer.userName}</h1>
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
