import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { api } from "../../utils/api"; // Your base Axios instance

// --- All API Functions Corrected with '/api/' prefix ---
const getProjects = (slug) => api.get(`/projects/${slug}`);
const createProject = (data) => api.post("/projects", data);
const updateProject = (id, data) => api.put(`/projects/${id}`, data);
const deleteProject = (id) => api.delete(`/projects/${id}`);

const getExperiences = (slug) => api.get(`/experiences/${slug}`);
const createExperience = (data) => api.post("/experiences", data);
const updateExperience = (id, data) => api.put(`/experiences/${id}`, data);
const deleteExperience = (id) => api.delete(`/experiences/${id}`);

const getEducations = (slug) => api.get(`/educations/${slug}`);
const createEducation = (data) => api.post("/educations", data);
const updateEducation = (id, data) => api.put(`/educations/${id}`, data);
const deleteEducation = (id) => api.delete(`/educations/${id}`);

const getCertifications = (slug) => api.get(`/certifications/${slug}`);
const createCertification = (data) => api.post("/certifications", data);
const updateCertification = (id, data) =>
  api.put(`/certifications/${id}`, data);
const deleteCertification = (id) => api.delete(`/certifications/${id}`);

const getPortfolio = (slug) => api.get(`/portfolio/${slug}`);
const generatePortfolio = (data) => api.post("/portfolio", data);
const updatePortfolio = (id, data) => api.put(`/portfolio/${id}`, data);
// -------------------------------------------------------------

// --- Reusable Sub-Component for list sections (Projects, etc.) ---
const EditSection = ({ title, items, fields, api, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
    setErrors({});
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    const initialFormData = {};
    fields.forEach((field) => {
      const value = item[field.name];
      if (field.type === "date" && value) {
        initialFormData[field.name] = new Date(value)
          .toISOString()
          .split("T")[0];
      } else if (field.isArray && Array.isArray(value)) {
        initialFormData[field.name] = value.join(", ");
      } else {
        initialFormData[field.name] = value || "";
      }
    });
    setFormData(initialFormData);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(id);
        toast.success("Item deleted successfully");
        onUpdate();
        resetForm();
      } catch (err) {
        toast.error("Failed to delete item.");
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.placeholder} is required.`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const payload = { ...formData };
      fields.forEach((field) => {
        if (field.isArray && typeof payload[field.name] === "string") {
          payload[field.name] = payload[field.name]
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      });

      if (editingId) {
        await api.update(editingId, payload);
        toast.success("Item updated successfully");
      } else {
        await api.create(payload);
        toast.success("Item created successfully");
      }
      resetForm();
      onUpdate();
    } catch (err) {
      toast.error("An error occurred while saving.");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 space-y-4 mb-6"
      >
        <h3 className="text-xl font-bold">
          {editingId
            ? `Editing ${title.slice(0, -1)}`
            : `Add New ${title.slice(0, -1)}`}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.fullWidth ? "md:col-span-2" : ""}
            >
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {errors[field.name] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      <ul className="space-y-3">
        {items?.map((item) => (
          <li
            key={item._id}
            className="p-3 border rounded-lg flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-bold">
                {item.title || item.role || item.degree || item.name}
              </p>
              <p className="text-sm text-gray-600">
                {item.company || item.institution || item.issuingOrganization}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(item)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(item._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

// --- Sub-Component for Portfolio Settings Form ---
const PortfolioSettingsForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    theme: { primaryColor: "#000000" },
    isPublic: true,
    customDomain: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("theme.")) {
      setFormData((p) => ({
        ...p,
        theme: { ...p.theme, [name.split(".")[1]]: value },
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await updatePortfolio(formData._id, formData);
        toast.success("Settings updated!");
      } else {
        await generatePortfolio(formData);
        toast.success("Settings created!");
      }
      onSave();
    } catch (err) {
      toast.error("Failed to save settings.");
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Portfolio Settings</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Theme Color</label>
            <input
              type="color"
              name="theme.primaryColor"
              value={formData.theme?.primaryColor || "#000000"}
              onChange={handleInputChange}
              className="w-full h-10 p-1 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Custom Domain</label>
            <input
              type="text"
              name="customDomain"
              placeholder="your-domain.com"
              value={formData.customDomain || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-2 mt-2">
            <input
              id="isPublic"
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic || false}
              onChange={handleInputChange}
            />
            <label htmlFor="isPublic">Make Portfolio Public</label>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </section>
  );
};

// --- Main Parent Component ---
const PortfolioEdit = () => {
  const user = useSelector((state) => state.user);
  const slug = user?.slug;

  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAllData = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [proj, exp, edu, cert] = await Promise.all([
        getProjects(slug),
        getExperiences(slug),
        getEducations(slug),
        getCertifications(slug),
      ]);
      setProjects(proj.data.data);
      setExperiences(exp.data.data);
      setEducations(edu.data.data);
      setCertifications(cert.data.data);

      try {
        const portfolioRes = await getPortfolio(slug);
        setPortfolioData(portfolioRes.data.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setPortfolioData(null);
        } else {
          throw err;
        }
      }
    } catch (err) {
      toast.error("Failed to load portfolio data. Please refresh the page.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Your Portfolio</h1>
      <PortfolioSettingsForm initialData={portfolioData} onSave={loadAllData} />
      <EditSection
        title="Projects"
        items={projects}
        onUpdate={loadAllData}
        fields={[
          { name: "title", placeholder: "Project Title", required: true },
          {
            name: "description",
            placeholder: "Description",
            required: true,
            fullWidth: true,
          },
          {
            name: "technologies",
            placeholder: "Technologies (comma-separated)",
            isArray: true,
            fullWidth: true,
          },
          { name: "liveDemoLink", placeholder: "Live Demo URL" },
          { name: "sourceCodeLink", placeholder: "Source Code URL" },
        ]}
        api={{
          create: createProject,
          update: updateProject,
          delete: deleteProject,
        }}
      />
      <EditSection
        title="Experiences"
        items={experiences}
        onUpdate={loadAllData}
        fields={[
          { name: "role", placeholder: "Role", required: true },
          { name: "company", placeholder: "Company", required: true },
          { name: "description", placeholder: "Description", fullWidth: true },
          { name: "startDate", placeholder: "Start Date", type: "date" },
          { name: "endDate", placeholder: "End Date", type: "date" },
        ]}
        api={{
          create: createExperience,
          update: updateExperience,
          delete: deleteExperience,
        }}
      />
      <EditSection
        title="Education"
        items={educations}
        onUpdate={loadAllData}
        fields={[
          { name: "degree", placeholder: "Degree", required: true },
          { name: "institution", placeholder: "Institution", required: true },
          { name: "fieldOfStudy", placeholder: "Field of Study" },
          {
            name: "startDate",
            placeholder: "Start Date",
            type: "date",
            required: true,
          },
          { name: "endDate", placeholder: "End Date", type: "date" },
        ]}
        api={{
          create: createEducation,
          update: updateEducation,
          delete: deleteEducation,
        }}
      />
      <EditSection
        title="Certifications"
        items={certifications}
        onUpdate={loadAllData}
        fields={[
          { name: "name", placeholder: "Certification Name", required: true },
          {
            name: "issuingOrganization",
            placeholder: "Issuing Organization",
            required: true,
          },
          {
            name: "issueDate",
            placeholder: "Issue Date",
            type: "date",
            required: true,
          },
          { name: "credentialURL", placeholder: "Credential URL" },
        ]}
        api={{
          create: createCertification,
          update: updateCertification,
          delete: deleteCertification,
        }}
      />
    </div>
  );
};

export default PortfolioEdit;
