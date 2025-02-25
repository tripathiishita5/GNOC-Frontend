import { api } from "./axios";

export const login = (data) => api.post("/user/login", data);
