import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";
import Login from "./Components/pages/Auth/Login";
import Signup from "./Components/pages/Auth/Signup";
import ProtectedRoute from "./Components/CORE/ProtectedRoute";
import Feed from "./Components/Feed/Feed";
import UserProfile from "./Components/Profile/Profile";
import Logout from "./Components/pages/Auth/Logout";
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(addUser(JSON.parse(storedUser)));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/*"
          element={
            //<ProtectedRoute>
            <UserProfile />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
      {user && <Logout />}
    </BrowserRouter>
  );
}

export default App;
