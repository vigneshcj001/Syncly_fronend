import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";

// Auth Pages
import Login from "./Components/pages/Auth/Login";
import Signup from "./Components/pages/Auth/Signup";
import Logout from "./Components/pages/Auth/Logout";

// Core Components
import Sidebar  from "./Components/CORE/Sidebar";
import ProtectedRoute from "./Components/CORE/ProtectedRoute";

// Main Feature Pages
import Feed from "./Components/Feed/Feed";
import UserProfile from "./Components/Profile/Profile";
import ProfileEditor from "./Components/Profile/ProfileEditor";
import YourVibes from "./Components/Vibes_AND_Mutual/YourVibes";
import MutualLinks from "./Components/Vibes_AND_Mutual/MutualLinks";
import Chatroom from "./Components/Chatroom/Chatroom";
import Portfolio from "./Components/Portfolio/Portfolio";
import PortfolioEdit from "./Components/Portfolio/PortfolioEdit";
// Layout for Protected Routes
function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 h-full">{children}</div>
      </div>
    </div>
  );
}

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
        {/* Auth Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Feed />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vibes"
          element={
            <ProtectedRoute>
              <MainLayout>
                <YourVibes />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mutualLinks"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MutualLinks />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatroom"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Chatroom />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UserProfile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profileEdit"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProfileEditor />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Portfolio />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolioEdit"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PortfolioEdit />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
