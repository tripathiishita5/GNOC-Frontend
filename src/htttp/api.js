import { api } from "./axios";

export const login = (data) => api.post("/user/login", data);
export const profile = () => api.get("/user/profile");
export const logout = () => api.post("/user/logout");
export const register = (data) => api.post("/user/register", data);
export const getUsers = () => api.get("/user");
export const createProject = (data) => api.post("/project/create", data);
export const getAllProjects = () => api.get("/project");
export const updateUser = ({ id, data }) => api.patch(`/user/${id}`, data);
export const deleteUser = (id) => api.delete(`/user/${id}`);
export const updateProject = ({ id, data }) =>
  api.patch(`/project/${id}`, data);
export const deleteProject = (id) => api.delete(`/project/${id}`);
export const getAnalytics = () => api.get("/project/analytics");
export const createDoc = (data) => api.post("/docs/", data);
export const getDocs = () => api.get("/docs/");
export const deleteDoc = (id) => api.delete(`/docs/${id}`);
export const updateDoc = ({ id, data }) => api.patch(`/docs/${id}`, data);
export const creatAlert = (data) => api.post("/alert", data);
export const getAlerts = () => api.get("/alert");
