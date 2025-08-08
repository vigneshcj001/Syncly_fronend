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
  BriefcaseBusiness
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { api } from "../../utils/api";
import SideBar_logo from "/SideBar_logo.png";
import Logout from "../pages/Auth/Logout";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { userName, avatar } = useSelector((state) => state.user) || {};
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/profile/view");

      if (res.data && res.data.success) {
        dispatch(addUser(res.data.profile));
      } else {
        console.error("Failed to fetch profile:", res.data.message);
      }
    } catch (err) {
      console.error("API Error:", err);
      navigate("/login"); // If unauthorized or session expired
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const navItems = [
    { name: "Feed", path: "/", icon: Home },
    { name: "Your pending Vibes", path: "/vibes", icon: MessageCircleHeart },
    { name: "Mutual Links", path: "/mutualLinks", icon: LinkIcon },
    { name: "Chatroom", path: "/chatroom", icon: ClipboardList },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Portfolio", path: "/portfolio", icon: BriefcaseBusiness },
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
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src={SideBar_logo} alt="Syncly Logo" className="w-8 h-8" />
            {open && <span className="font-bold text-lg">Syncly</span>}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-400 hover:text-white"
          >
            {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

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

      {/* Bottom Section */}
      <div className="border-t border-gray-700 p-4 flex items-center gap-3">
        {loading ? (
          <div className="text-sm text-gray-400">Loading...</div>
        ) : (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <img
                src={avatar || "https://i.pravatar.cc/150"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              {open && (
                <p
                  className="text-sm font-medium truncate"
                  style={{ maxWidth: "150px" }}
                  title={userName}
                >
                  {userName || "User"}
                </p>
              )}
            </Link>

            {open && (
              <Logout className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 ml-auto">
                <LogOut size={14} /> Logout
              </Logout>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
