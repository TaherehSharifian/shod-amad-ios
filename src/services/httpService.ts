import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const httpService = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    http.get<T>(url, config),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    http.post<T>(url, data, config),
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    http.put<T>(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    http.patch<T>(url, data, config),
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    http.delete<T>(url, config),
};
