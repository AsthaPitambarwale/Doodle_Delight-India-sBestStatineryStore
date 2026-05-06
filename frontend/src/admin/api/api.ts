import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
});

// optional: auto attach token later
api.interceptors.request.use((config) => {
  return config;
});

export default api;