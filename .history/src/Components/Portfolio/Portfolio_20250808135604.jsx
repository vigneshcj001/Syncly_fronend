// src/Components/Portfolio/Portfolio.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.slug) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [projRes, expRes, eduRes, certRes, portRes] = await Promise.all([
          api.get(`/projects/${user.slug}`),
          api.get(`/experiences/${user.slug}`),
          api.get(`/educations/${user.slug}`),
          api.get(`/certifications/${user.slug}`),
          api.get(`/portfolio/${user.slug}`),
        ]);
        setProjects(projRes.data.data || []);
        setExperiences(expRes.data.data || []);
        setEducations(eduRes.data.data || []);
        setCertifications(certRes.data.data || []);
        setPortfolio(portRes.data.data || null);
      } catch (err) {
        console.error("Failed to fetch portfolio data:", err);
        setError("Could not load portfolio data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.slug]);

  if (loading) {
    return <div className="p-6 text-center">Loading portfolio...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <Link
          to="/portfolioEdit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit Portfolio
        </Link>
      </div>

      {portfolio && (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-semibold">Portfolio Settings</h2>
          <p>
            Theme Primary Color:{" "}
            <span style={{ color: portfolio.theme.primaryColor }}>
              {portfolio.theme.primaryColor}
            </span>
          </p>
          <p>Public: {portfolio.isPublic ? "Yes" : "No"}</p>
          <p>Custom Domain: {portfolio.customDomain || "Not set"}</p>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Projects</h2>
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p._id} className="p-4 border rounded-lg">
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects added yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          Experience
        </h2>
        {experiences.length > 0 ? (
          <ul className="space-y-4">
            {experiences.map((e) => (
              <li key={e._id} className="p-4 border rounded-lg">
                <h3 className="font-bold text-lg">
                  {e.role} @ {e.company}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {e.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No experiences added yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Education</h2>
        {educations.length > 0 ? (
          <ul className="space-y-4">
            {educations.map((edu) => (
              <li key={edu._id} className="p-4 border rounded-lg">
                <h3 className="font-bold text-lg">
                  {edu.degree} - {edu.institution}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {edu.fieldOfStudy}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No education history added yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          Certifications
        </h2>
        {certifications.length > 0 ? (
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li key={cert._id} className="p-4 border rounded-lg">
                <h3 className="font-bold text-lg">{cert.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Issued by: {cert.issuingOrganization}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No certifications added yet.</p>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
