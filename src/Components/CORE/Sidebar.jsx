import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  LogOut,
  MessageCircleHeart,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideBar_logo from "./SideBar_logo.png";
import Logout from "../pages/Auth/Logout";
import { addUser } from "../../redux/userSlice";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // ✅ Load user from localStorage if not already in Redux
  useEffect(() => {
    if (!user || !user.userName) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          dispatch(addUser(JSON.parse(storedUser)));
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }
  }, [dispatch, user]);

  const navItems = [
    { name: "Feed", path: "/", icon: Home },
    { name: "Your Vibes", path: "/vibes", icon: MessageCircleHeart },
    { name: "Mutual Links", path: "/mutualLinks", icon: LinkIcon },
    { name: "Chatroom", path: "/chatroom", icon: ClipboardList },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-purple-600 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } h-screen bg-gray-900 text-gray-200 flex flex-col justify-between transition-all duration-300`}
    >
      {/* Top Section */}
      <div>
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img
              src={SideBar_logo}
              alt="Syncly Logo"
              className="w-8 h-8 object-contain"
            />
            {open && <span className="font-bold text-lg">Syncly</span>}
          </div>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col gap-1">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${isActive(
                path
              )}`}
            >
              <Icon size={20} />
              {open && <span className="text-sm">{name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Avatar + UserName + Logout */}
      <div className="border-t border-gray-700 p-4 flex items-center gap-3">
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <img
            src={
              user?.avatar && user.avatar.startsWith("http")
                ? user.avatar
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.userName || "User"
                  )}&background=random`
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          {open && (
            <p className="text-sm font-medium truncate max-w-[120px]">
              {user?.userName || "User"}
            </p>
          )}
        </Link>

        {open && (
          <Logout className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 ml-auto">
            <LogOut size={14} /> Logout
          </Logout>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
