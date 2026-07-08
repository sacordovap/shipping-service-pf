import { api } from "@/common/services/api";
import { handleApiCall } from "@/common/services/handle-api";

export const authService = {
  login: async (credentials) => {
    const data = handleApiCall(api.post("/auth/login", credentials));
    return data;
  },

  register: async (userData) => {
    const data = handleApiCall(api.post("/auth/register", userData));
    return data;
  },

  getUsers: async () => {
    const data = handleApiCall(api.get("/auth/users"));
    return data;
  },
};
