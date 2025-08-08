import { api } from "../utils/api";

// Projects
export const getProjects = (slug) => api.get(`/projects/${slug}`);
export const createProject = (data) => api.post(`/projects`, data);
export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Experiences
export const getExperiences = (slug) =>
  api.get(`/experiences/${slug}`);
export const createExperience = (data) =>
  api.post(`/experiences`, data);
export const updateExperience = (id, data) =>
  api.put(`/experiences/${id}`, data);
export const deleteExperience = (id) =>
  api.delete(`/experiences/${id}`);

// Education
export const getEducations = (slug) => api.get(`/educations/${slug}`);
export const createEducation = (data) =>
  api.post(`/educations`, data);
export const updateEducation = (id, data) =>
  api.put(`/educations/${id}`, data);
export const deleteEducation = (id) =>
  api.delete(`/educations/${id}`);

// Certifications
export const getCertifications = (slug) =>
  api.get(`/certifications/${slug}`);
export const createCertification = (data) =>
  api.post(`/certifications`, data);
export const updateCertification = (id, data) =>
  api.put(`/certifications/${id}`, data);
export const deleteCertification = (id) =>
  api.delete(`/certifications/${id}`);

// Portfolio
export const getPortfolio = (slug) => api.get(`/portfolio/${slug}`);
export const generatePortfolio = (data) =>
  api.post(`/portfolio`, data);
export const updatePortfolio = (id, data) =>
  api.put(`/portfolio/${id}`, data);
export const deletePortfolio = (id) => api.delete(`/portfolio/${id}`);
