import { api } from "@/common/services/api";

export const customerService = {
  // Crear cliente
  create: async (data) => {
    try {
      const response = await api.post("/customers", data);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Error al registrar cliente" };
    }
  },

  // Obtener por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Error al obtener cliente" };
    }
  },

  // Obtener por DNI
  getByDni: async (dni) => {
    try {
      const response = await api.get(`/customers/dni/${dni}`);
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Error al buscar cliente por DNI" }
      );
    }
  },

  // Listar todos
  getAll: async () => {
    try {
      const response = await api.get("/customers");
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Error al cargar la lista de clientes",
        }
      );
    }
  },

  // Actualizar
  update: async (id, data) => {
    try {
      const response = await api.put(`/customers/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Error al actualizar cliente" };
    }
  },

  // Eliminar (Deshabilitar)
  delete: async (id) => {
    try {
      const response = await api.delete(`/customers/${id}`);
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Error al deshabilitar cliente" }
      );
    }
  },

  // Reactivar
  reactivate: async (id) => {
    try {
      const response = await api.patch(`/customers/${id}/activate`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Error al reactivar cliente" };
    }
  },
};
