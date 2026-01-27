import axios from "axios";
import { getToken, removeToken } from "../../utils/token";

// Create axios instance
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor → attach token
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor → global error handling
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            removeToken();
            window.location.replace("/auth/login");
        }
        return Promise.reject(err);
    }
);
