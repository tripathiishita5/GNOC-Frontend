import { api } from "./axios";

export const login = (data) => api.post("/user/login", data);
export const profile = () => api.get("/user/profile");
export const logout = () => api.post("/user/logout");
