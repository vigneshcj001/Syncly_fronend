import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api";
import { setVibes } from "../../redux/vibesSlices";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaYoutube,
  FaSearch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import YourVibesSkeleton from "./YourVibesSkeleton";

const YourVibes = () => {
  const dispatch = useDispatch();
  const vibes = useSelector((state) => state.vibes || []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [processingId, setProcessingId] = useState(null);

  const fetchVibes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/network/requests/pendings");
      dispatch(setVibes(res.data.data || []));
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Failed to load pending vibes.");
    } finally {
      setLoading(false);
    }
  };

  const reviewVibes = async (connectionStatus, requestId) => {
    try {
      setProcessingId(requestId);
      const res = await api.post(
        `/request/review/${connectionStatus}/${requestId}`
      );
      console.log("✅ Review success:", res.data);
      fetchVibes();
    } catch (error) {
      console.error("❌ Review error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      setError(
        error.response?.data?.message ||
          `Failed to review the vibe. Status: ${
            error.response?.status || "unknown"
          }`
      );
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchVibes();
  }, []);

  const filteredVibes = (Array.isArray(vibes) ? vibes : [])
    .filter((item) => {
      const user = item?.initiatorID;
      if (!user) return false;

      const matchesRole =
        filterRole === "all" || user.mentorshipRole === filterRole;
      const matchesSearch = user?.userName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesRole && matchesSearch;
    })
    .sort((a, b) => {
      const nameA = a?.initiatorID?.userName?.toLowerCase() || "";
      const nameB = b?.initiatorID?.userName?.toLowerCase() || "";
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-white">Pending Vibes</h2>

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

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Content */}
      {loading ? (
        <YourVibesSkeleton />
      ) : filteredVibes.length === 0 ? (
        <p className="text-gray-400">No pending vibes found.</p>
      ) : (
        <div className="space-y-4">
          {filteredVibes.map((item) => {
            const requestId = item?._id;
            const user = item?.initiatorID || {};

            return (
              <motion.div
                key={requestId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center gap-4 shadow hover:shadow-lg transition"
              >
                {/* Avatar */}
                <img
                  src={
                    user.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt={user.userName || "User"}
                  className="w-16 h-16 rounded-full object-cover"
                />

                {/* User Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {user.userName || "Unknown User"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {user.emailID || "No email"}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {user.bio || "No bio provided"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
                    <span>📍 {user.location || "Unknown"}</span>
                    <span>🎯 {user.mentorshipRole || "N/A"}</span>
                    <span>🧪 Status: {user.status || "N/A"}</span>
                    <span>👤 Role: {user.role || "N/A"}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>
                      Stack:{" "}
                      {user.stack?.length ? user.stack.join(", ") : "None"}
                    </p>
                    <p>
                      Skills:{" "}
                      {user.skills?.length ? user.skills.join(", ") : "None"}
                    </p>
                    <p>
                      Interests:{" "}
                      {user.interests?.length
                        ? user.interests.join(", ")
                        : "None"}
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center gap-2 text-white text-lg">
                  {user.socialLinks?.linkedin?.trim() && (
                    <a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <FaLinkedin className="hover:text-blue-500" />
                    </a>
                  )}
                  {user.socialLinks?.github?.trim() && (
                    <a
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                    >
                      <FaGithub className="hover:text-gray-400" />
                    </a>
                  )}
                  {user.socialLinks?.portfolio?.trim() && (
                    <a
                      href={user.socialLinks.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Portfolio"
                    >
                      <FaGlobe className="hover:text-green-400" />
                    </a>
                  )}
                  {user.socialLinks?.youtube?.trim() && (
                    <a
                      href={user.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="YouTube"
                    >
                      <FaYoutube className="hover:text-red-500" />
                    </a>
                  )}
                  {user.socialLinks?.X?.trim() && (
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

                {/* Action Buttons */}
                <div className="flex gap-2 ml-4">
                  <button
                    disabled={processingId === requestId}
                    onClick={() => reviewVibes("Link", requestId)}
                    className={`btn btn-success btn-md px-6 py-2 text-base ${
                      processingId === requestId ? "opacity-50" : ""
                    }`}
                  >
                    {processingId === requestId ? "Processing..." : "Link"}
                  </button>
                  <button
                    disabled={processingId === requestId}
                    onClick={() => reviewVibes("Noped", requestId)}
                    className={`btn btn-error btn-md px-6 py-2 text-base ${
                      processingId === requestId ? "opacity-50" : ""
                    }`}
                  >
                    {processingId === requestId ? "Processing..." : "Noped"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YourVibes;
