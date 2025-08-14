import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api";
import { setMutualLinks } from "../../redux/mutualLinksSlice";
import MutualLinksSkeleton from "./MutualLinksSkeleton";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaYoutube,
  FaSearch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoIosChatbubbles } from "react-icons/io";

const MutualLinks = () => {
  const dispatch = useDispatch();
  const mutualLinks = useSelector((state) => state.mutual);
  const loggedInUserId = useSelector((state) => state.user?._id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchMutualLinks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/network/mutualVibes");
      dispatch(setMutualLinks(res.data.data));
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUserId) {
      fetchMutualLinks();
    }
  }, [loggedInUserId]);

  const filteredLinks = (mutualLinks || [])
    .filter((user) =>
      filterRole === "all" ? true : user.mentorshipRole === filterRole
    )
    .filter((user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.userName.localeCompare(b.userName)
        : b.userName.localeCompare(a.userName)
    );

  // Wrapper for external links
  const ExternalLink = ({ to, title, children }) => (
    <Link
      to={to}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      onClick={(e) => {
        if (to?.startsWith("http")) {
          window.open(to, "_blank", "noopener,noreferrer");
          e.preventDefault();
        }
      }}
    >
      {children}
    </Link>
  );

  return (
    <div className="p-4 space-y-4 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
        Mutual Links
      </h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center sm:justify-between">
        {/* Filter */}
        <div className="flex items-center gap-2">
          <label className="text-white font-medium">Filter by role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded w-40 sm:w-auto"
          >
            <option value="all">All</option>
            <option value="learner">Learners</option>
            <option value="mentor">Mentors</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full sm:w-64">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white outline-none flex-1"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-white font-medium">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded w-24 sm:w-auto"
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading */}
      {loading ? (
        <MutualLinksSkeleton />
      ) : filteredLinks.length === 0 ? (
        <p className="text-gray-400 text-center">
          No matching mutual connections found.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredLinks.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow hover:shadow-lg transition"
            >
              <div className="flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.userName}
                  className="w-16 h-16 rounded-full object-cover mx-auto sm:mx-0"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-white">
                  {user.userName}
                </h3>
                <p className="text-sm text-gray-400">{user.emailID}</p>
                <p className="text-sm text-gray-300 mt-1">{user.bio}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2 text-xs text-gray-400">
                  <span>📍 {user.location}</span>
                  <span>🎯 {user.mentorshipRole}</span>
                  <span>🧪 Status: {user.status}</span>
                  <span>👤 Role: {user.role}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p>
                    Stack: {user.stack.length ? user.stack.join(", ") : "None"}
                  </p>
                  <p>
                    Skills:{" "}
                    {user.skills.length ? user.skills.join(", ") : "None"}
                  </p>
                  <p>
                    Interests:{" "}
                    {user.interests.length ? user.interests.join(", ") : "None"}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-row sm:flex-col items-center justify-center gap-3 text-white text-lg">
                {user.socialLinks.linkedin && (
                  <ExternalLink to={user.socialLinks.linkedin} title="LinkedIn">
                    <FaLinkedin className="hover:text-blue-500" />
                  </ExternalLink>
                )}
                {user.socialLinks.github && (
                  <ExternalLink to={user.socialLinks.github} title="GitHub">
                    <FaGithub className="hover:text-gray-400" />
                  </ExternalLink>
                )}
                {user.socialLinks.portfolio && (
                  <ExternalLink
                    to={user.socialLinks.portfolio}
                    title="Portfolio"
                  >
                    <FaGlobe className="hover:text-green-400" />
                  </ExternalLink>
                )}
                {user.socialLinks.youtube && (
                  <ExternalLink to={user.socialLinks.youtube} title="YouTube">
                    <FaYoutube className="hover:text-red-500" />
                  </ExternalLink>
                )}
                {user.socialLinks.X && (
                  <ExternalLink to={user.socialLinks.X} title="Twitter (X)">
                    <FaXTwitter className="hover:text-blue-400" />
                  </ExternalLink>
                )}
              </div>

              {/* Chat Button */}
              <div className="sm:mt-auto w-full sm:w-auto">
                <Link to={`/chatroom/${user.user._id}`} className="block w-full">
                  <button className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg transition">
                    <IoIosChatbubbles className="text-xl" />
                    Chat
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MutualLinks;
