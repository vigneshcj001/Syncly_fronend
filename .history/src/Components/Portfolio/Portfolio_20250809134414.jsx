import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { api } from "../../utils/api";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaGlobe,
  FaBriefcase,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCode,
  FaExternalLinkAlt,
  FaUniversity,
  FaBook,
  FaCertificate,
  FaBuilding,
  FaUserTie,
  FaTools,
  FaLightbulb,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

// API functions
const getProjects = (slug) => api.get(`/projects/${slug}`);
const getExperiences = (slug) => api.get(`/experiences/${slug}`);
const getEducations = (slug) => api.get(`/educations/${slug}`);
const getCertifications = (slug) => api.get(`/certifications/${slug}`);
const getPortfolio = (slug) => api.get(`/portfolio/${slug}`);
const getProfileView = () => api.get(`/profile/view`);

// Skeleton loader
const SkeletonCard = () => (
  <div className="animate-pulse p-4 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800">
    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
  </div>
);

// Empty state
const EmptyState = ({ message, icon }) => (
  <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-6">
    <div className="text-4xl mb-2">{icon}</div>
    <p>{message}</p>
  </div>
);

// Social links
const SocialLink = ({ url, label, icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-700 dark:text-gray-300 hover:text-black flex items-center gap-1"
  >
    {icon}
    <span className="sr-only">{label}</span>
  </a>
);

const Portfolio = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!slug || !/^[a-zA-Z0-9-_]+$/.test(slug)) {
      setError("Invalid portfolio URL. Please check the username.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await Promise.allSettled([
        getProjects(slug),
        getExperiences(slug),
        getEducations(slug),
        getCertifications(slug),
        getPortfolio(slug),
        getProfileView(),
      ]);

      const [projRes, expRes, eduRes, certRes, , profileRes] = results;

      if (projRes.status === "fulfilled")
        setProjects(projRes.value.data.data || []);
      if (expRes.status === "fulfilled")
        setExperiences(expRes.value.data.data || []);
      if (eduRes.status === "fulfilled")
        setEducations(eduRes.value.data.data || []);
      if (certRes.status === "fulfilled")
        setCertifications(certRes.value.data.data || []);
      if (profileRes.status === "fulfilled") {
        setProfile(profileRes.value.data || null);
        dispatch(
          addUser(profileRes.value.data.profile || profileRes.value.data)
        );
      }

      const failedSections = results
        .slice(0, 4)
        .filter((r) => r.status === "rejected");
      if (failedSections.length === 4) {
        throw new Error("No portfolio found for this user.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong loading this portfolio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-10">
        <div className="border-b pb-4">
          <h1 className="text-4xl font-bold animate-pulse bg-gray-200 dark:bg-gray-700 w-48 h-8 rounded"></h1>
        </div>
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-4xl font-bold">
          {slug.charAt(0).toUpperCase() + slug.slice(1)}'s Portfolio
        </h1>
      </div>

      {/* Profile Section */}
      {profile && (
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt={`${profile.userName}'s avatar`}
              className="w-24 h-24 rounded-full mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{profile.userName}</h2>
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <FaEnvelope /> {profile.emailID}
          </p>

          {profile.ussrName && (
            <p className="text-gray-700 dark:text-gray-300">
              <strong>USSR Name:</strong> {profile.ussrName}
            </p>
          )}

          <div className="flex items-center gap-1 text-gray-500 my-2">
            <FaBriefcase />
            <span>
              {profile.bio !== "No bio provided"
                ? profile.bio
                : "Bio not specified."}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <FaTools />
            <strong>Stack:</strong>{" "}
            {profile.stack?.length ? profile.stack.join(", ") : "N/A"}
          </div>
          <div className="flex items-center gap-2">
            <FaLightbulb />
            <strong>Skills:</strong>{" "}
            {profile.skills?.length ? profile.skills.join(", ") : "N/A"}
          </div>
          <div className="flex items-center gap-2">
            <FaLightbulb />
            <strong>Interests:</strong>{" "}
            {profile.interests?.length ? profile.interests.join(", ") : "N/A"}
          </div>

          {profile.location && profile.location !== "Unknown" && (
            <p className="mt-2 text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FaMapMarkerAlt /> {profile.location}
            </p>
          )}

          {/* Social Links */}
          <div className="mt-4 flex flex-wrap gap-4">
            {profile.socialLinks?.portfolio &&
              profile.socialLinks.portfolio.trim() !== "" && (
                <SocialLink
                  url={profile.socialLinks.portfolio}
                  label="Portfolio"
                  icon={<FaGlobe />}
                />
              )}
            {profile.socialLinks?.github &&
              profile.socialLinks.github.trim() !== "" && (
                <SocialLink
                  url={profile.socialLinks.github}
                  label="GitHub"
                  icon={<FaGithub />}
                />
              )}
            {profile.socialLinks?.linkedin &&
              profile.socialLinks.linkedin.trim() !== "" && (
                <SocialLink
                  url={profile.socialLinks.linkedin}
                  label="LinkedIn"
                  icon={<FaLinkedin />}
                />
              )}
            {profile.socialLinks?.youtube &&
              profile.socialLinks.youtube.trim() !== "" && (
                <SocialLink
                  url={profile.socialLinks.youtube}
                  label="YouTube"
                  icon={<FaYoutube />}
                />
              )}
            {profile.socialLinks?.X && profile.socialLinks.X.trim() !== "" && (
              <SocialLink
                url={profile.socialLinks.X}
                label="X"
                icon={<SiX />}
              />
            )}
          </div>
        </div>
      )}

      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">Projects</h2>
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-xl">{p.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {p.description}
                </p>
                <div className="mt-2 flex gap-4">
                  {p.liveDemoLink && (
                    <a
                      href={p.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {p.sourceCodeLink && (
                    <a
                      href={p.sourceCodeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <FaCode /> Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No projects added yet." icon={<FaCode />} />
        )}
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">
          Experience
        </h2>
        {experiences.length > 0 ? (
          <div className="space-y-4">
            {experiences.map((e) => (
              <div
                key={e._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <FaUserTie /> {e.role} @ <FaBuilding /> {e.company}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {e.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No experience listed yet."
            icon={<FaBriefcase />}
          />
        )}
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">Education</h2>
        {educations.length > 0 ? (
          <div className="space-y-4">
            {educations.map((edu) => (
              <div
                key={edu._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <FaUniversity /> {edu.degree} - <FaBook /> {edu.institution}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {edu.fieldOfStudy}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No education history yet."
            icon={<FaUniversity />}
          />
        )}
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">
          Certifications
        </h2>
        {certifications.length > 0 ? (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <FaCertificate /> {cert.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Issued by: {cert.issuingOrganization}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No certifications yet."
            icon={<FaCertificate />}
          />
        )}
      </section>
    </div>
  );
};

export default Portfolio;
