import axios from "axios";
import { getApiUrl } from "../../../config";

export const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401/403 and we haven't already tried to refresh
    if (
      (error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await api.post("/auth/refresh");
        return api(originalRequest);

      } catch (refreshError) {
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);