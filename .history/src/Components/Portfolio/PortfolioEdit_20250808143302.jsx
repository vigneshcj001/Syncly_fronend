// src/Components/Portfolio/PortfolioEdit.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../../api/portfolio";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// Reusable component for each editable section (Projects, Experience, etc.)
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
      if (field.type === "date" && item[field.name]) {
        initialFormData[field.name] = new Date(item[field.name])
          .toISOString()
          .split("T")[0];
      } else {
        initialFormData[field.name] = item[field.name] || "";
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
      // Convert comma-separated strings to arrays if needed
      fields.forEach((field) => {
        if (field.isArray && typeof payload[field.name] === "string") {
          payload[field.name] = payload[field.name]
            .split(",")
            .map((s) => s.trim());
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
      toast.error("An error occurred while saving the item.");
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
        {items &&
          items.map((item) => (
            <li
              key={item._id}
              className="p-3 border rounded-lg flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-bold">
                  {item.title || item.role || item.degree || item.name}
                </p>
                <p className="text-sm text-gray-600">
                  {item.description ||
                    item.institution ||
                    item.company ||
                    item.issuingOrganization}
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

const PortfolioEdit = () => {
  const user = useSelector((state) => state.user);
  const slug = user?.slug;

  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllData = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const [proj, exp, edu, cert] = await Promise.all([
        getProjects(slug),
        getExperiences(slug),
        getEducations(slug),
        getCertifications(slug),
      ]);
      setProjects(proj.data.data || []);
      setExperiences(exp.data.data || []);
      setEducations(edu.data.data || []);
      setCertifications(cert.data.data || []);
    } catch (err) {
      toast.error("Failed to load portfolio data.");
      console.error(err);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  if (loading) {
    return <div className="p-6 text-center">Loading editor...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Portfolio</h1>

      <EditSection
        title="Projects"
        items={projects}
        fields={[
          {
            name: "title",
            placeholder: "Project Title",
            required: true,
            fullWidth: true,
          },
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
          },
          { name: "liveDemoLink", placeholder: "Live Demo URL" },
          { name: "sourceCodeLink", placeholder: "Source Code URL" },
        ]}
        api={{
          create: createProject,
          update: updateProject,
          delete: deleteProject,
        }}
        onUpdate={loadAllData}
      />

      <EditSection
        title="Experiences"
        items={experiences}
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
        onUpdate={loadAllData}
      />

      <EditSection
        title="Educations"
        items={educations}
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
        onUpdate={loadAllData}
      />

      <EditSection
        title="Certifications"
        items={certifications}
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
        onUpdate={loadAllData}
      />
    </div>
  );
};

export default PortfolioEdit;
