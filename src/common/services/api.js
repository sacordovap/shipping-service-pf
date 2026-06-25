import axios from "axios";
import { domains } from "../constants/domain/domain";

export const api = axios.create({
  baseURL: domains.URL_BACKEND,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

