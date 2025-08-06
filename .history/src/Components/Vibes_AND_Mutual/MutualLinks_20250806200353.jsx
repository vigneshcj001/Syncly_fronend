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

      // ✅ No transformation needed since API already returns flat user profiles
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
    .filter((user) => {
      if (filterRole === "all") return true;
      return user.mentorshipRole === filterRole;
    })
    .filter((user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.userName.localeCompare(b.userName);
      else return b.userName.localeCompare(a.userName);
    });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Mutual Connections</h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Filter */}
        <div className="flex items-center gap-2">
          <label className="text-white font-medium">Filter by role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="learner">Learners</option>
            <option value="mentor">Mentors</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-800 border border-gray-600 rounded px-2 py-1">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white outline-none"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-white font-medium">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
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
        <p className="text-gray-400">No matching mutual connections found.</p>
      ) : (
        <div className="space-y-4">
          {filteredLinks.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center gap-4 shadow hover:shadow-lg transition"
            >
              <img
                src={user.avatar}
                alt={user.userName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {user.userName}
                </h3>
                <p className="text-sm text-gray-400">{user.emailID}</p>
                <p className="text-sm text-gray-300 mt-1">{user.bio}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
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
                    {user.interests.length
                      ? user.interests.join(", ")
                      : "None"}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col items-center gap-2 text-white text-lg">
                {user.socialLinks.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="hover:text-blue-500" />
                  </a>
                )}
                {user.socialLinks.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <FaGithub className="hover:text-gray-400" />
                  </a>
                )}
                {user.socialLinks.portfolio && (
                  <a
                    href={user.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Portfolio"
                  >
                    <FaGlobe className="hover:text-green-400" />
                  </a>
                )}
                {user.socialLinks.youtube && (
                  <a
                    href={user.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                  >
                    <FaYoutube className="hover:text-red-500" />
                  </a>
                )}
                {user.socialLinks.X && (
                  <a
                    href={user.socialLinks.X}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter (X)"
                  >
                    <FaXTwitter className="hover:text-blue-400" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MutualLinks;
