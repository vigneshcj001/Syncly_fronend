import React, { useState } from "react";
import {
  Home,
  User,
  Settings,
  LogOut,
  MessageCircleHeart,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/userSlice";
import SideBar_logo from "../../../public/SideBar_logo.png"
import Logout from "../pages/Auth/Logout";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navItems = [
    { name: "Feed", path: "/", icon: Home },
    { name: "Your Vibes", path: "/vibes", icon: MessageCircleHeart },
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

        {/* Navigation */}
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
      {/* Bottom Section - User Info and Logout */}

      <div className="border-t border-gray-700 p-4 flex items-center gap-3">
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          {console.log("Avatar:", user?.avatar)}
          <img
            src={
              user?.avatar && typeof user.avatar === "string"
                ? user.avatar
                : "https://ui-avatars.com/api/?name=User&background=random"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          {open && (
            <p className="text-sm font-medium">{user?.userName || "User"}</p>
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
