import axios from "axios";
import { domains } from "../constants/domain/domain";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const api = axios.create({
  baseURL: domains.URL_BACKEND,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
