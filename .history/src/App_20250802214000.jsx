import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/pages/Auth/Signup";
import Login from "./components/pages/Auth/Login";
import Body from "./components/CORE/Body";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.profile);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <div className="text-2xl">Hello {user?.userName}</div>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
