import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api"; // Your base Axios instance

// --- API Functions defined directly in the component file ---
const getProjects = (slug) => api.get(`/projects/${slug}`);
const getExperiences = (slug) => api.get(`/experiences/${slug}`);
const getEducations = (slug) => api.get(`/educations/${slug}`);
const getCertifications = (slug) => api.get(`/certifications/${slug}`);
const getPortfolio = (slug) => api.get(`/portfolio/${slug}`);
// ---------------------------------------------------------

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = useParams(); // Get slug from the URL to display the correct user's portfolio
  const loggedInUser = useSelector((state) => state.user); // Get logged-in user to decide if "Edit" button should show

  useEffect(() => {
    if (!slug) {
      setError("No user portfolio specified in the URL.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use Promise.allSettled to ensure all requests complete, even if some fail (like a 404)
        const results = await Promise.allSettled([
          getProjects(slug),
          getExperiences(slug),
          getEducations(slug),
          getCertifications(slug),
          getPortfolio(slug), // This might fail with 404 if settings don't exist, which is okay
        ]);

        const [projRes, expRes, eduRes, certRes, portRes] = results;

        // Assign data from fulfilled promises
        if (projRes.status === "fulfilled")
          setProjects(projRes.value.data.data || []);
        if (expRes.status === "fulfilled")
          setExperiences(expRes.value.data.data || []);
        if (eduRes.status === "fulfilled")
          setEducations(eduRes.value.data.data || []);
        if (certRes.status === "fulfilled")
          setCertifications(certRes.value.data.data || []);
        if (portRes.status === "fulfilled") {
          setPortfolio(portRes.value.data.data);
        } else {
          // It's not a true error if portfolio settings are not found (404)
          if (portRes.reason?.response?.status !== 404) {
            console.error("Error fetching portfolio settings:", portRes.reason);
          }
        }

        // Check if any of the main data fetches (non-settings) failed
        const criticalErrors = results
          .slice(0, 4)
          .filter((r) => r.status === "rejected");
        if (criticalErrors.length > 0) {
          throw new Error(
            "Could not load some portfolio sections. The user profile may not exist."
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Re-run the fetch logic whenever the URL slug changes

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading portfolio...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">{error}</div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-4xl font-bold">{slug}'s Portfolio</h1>
        {/* Only show the "Edit Portfolio" button if the logged-in user is viewing their own page */}
        {loggedInUser?.slug === slug && (
          <Link
            to="/portfolioEdit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Edit Portfolio
          </Link>
        )}
      </div>

      {portfolio ? (
        <section className="p-5 border rounded-lg bg-gray-50 dark:bg-gray-800 shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Portfolio Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Theme Color:</strong>{" "}
              <span
                className="inline-block w-6 h-6 rounded-full border"
                style={{ backgroundColor: portfolio.theme?.primaryColor }}
              ></span>
            </p>
            <p>
              <strong>Public:</strong> {portfolio.isPublic ? "Yes" : "No"}
            </p>
            <p className="md:col-span-2">
              <strong>Custom Domain:</strong>{" "}
              {portfolio.customDomain || "Not set"}
            </p>
          </div>
        </section>
      ) : (
        <section className="p-5 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-gray-800 text-yellow-800 dark:text-yellow-300 rounded-lg">
          <h2 className="text-2xl font-semibold">Portfolio Settings</h2>
          <p>Portfolio settings have not been configured for this user.</p>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">Projects</h2>
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p._id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold text-xl">{p.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {p.description}
                </p>
                {p.liveDemoLink && (
                  <a
                    href={p.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Live Demo
                  </a>
                )}
                {p.sourceCodeLink && (
                  <a
                    href={p.sourceCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Source Code
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>This user has not added any projects yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">
          Experience
        </h2>
        {experiences.length > 0 ? (
          <ul className="space-y-4">
            {experiences.map((e) => (
              <li key={e._id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold text-xl">
                  {e.role} @ {e.company}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {e.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>This user has not added any experience yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">Education</h2>
        {educations.length > 0 ? (
          <ul className="space-y-4">
            {educations.map((edu) => (
              <li key={edu._id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold text-xl">
                  {edu.degree} - {edu.institution}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {edu.fieldOfStudy}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>This user has not added any education history yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold border-b pb-2 mb-4">
          Certifications
        </h2>
        {certifications.length > 0 ? (
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li key={cert._id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold text-xl">{cert.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Issued by: {cert.issuingOrganization}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>This user has not added any certifications yet.</p>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
