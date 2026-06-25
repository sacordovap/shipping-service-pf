import { api } from "@/common/services/api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data.data;
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data.data;
  },

  getUsers: async () => {
    const response = await api.get("/auth/users");
    return response.data.data;
  },
};
