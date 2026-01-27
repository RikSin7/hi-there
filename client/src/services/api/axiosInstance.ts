import axios from "axios";
import { getToken, removeToken, setToken } from "../../utils/token";
import { AuthService } from "..";

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

// Response interceptor → refresh token + error handling
api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { accessToken } = await AuthService.refresh();
                setToken(accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch {
                removeToken();
            }
        }

        return Promise.reject(err);
    }
);
