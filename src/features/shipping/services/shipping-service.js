import { api } from "@/common/services/api";
import { handleApiCall } from "@/common/services/handle-api";

export const shippingService = {
  // Crear envío
  create: (data) => handleApiCall(api.post("/shippings", data)),

  // Listado filtrado (BRANCH + STATE)
  getByBranchAndState: (branch, state) =>
    handleApiCall(api.get(`/shippings/filter?branch=${branch}&state=${state}`)),

  //TODOS LOS ENVIOS
  getAll: async () => handleApiCall(api.get("/shippings")),
  // const response = await api.get();

  // Listado filtrado (CATEGORY + STATE)
  getByCategoryAndState: (category, state) =>
    handleApiCall(
      api.get(`/shippings/filter/category?category=${category}&state=${state}`),
    ),

  // Búsqueda por término (tracking parcial)
  searchByTracking: (term) =>
    handleApiCall(api.get(`/shippings/search?term=${term}`)),

  // Búsqueda por nombre
  searchByName: (name) =>
    handleApiCall(api.get(`/shippings/searchName?name=${name}`)),

  // Obtener por ID
  getById: (id) => handleApiCall(api.get(`/shippings/${id}`)),

  // Obtener historial
  getHistory: (trackingNumber) =>
    handleApiCall(api.get(`/shippings/tracking/${trackingNumber}/history`)),

  // Actualizar estado
  updateState: (id, newState) =>
    handleApiCall(api.patch(`/shippings/${id}/state`, { newState })),

  // Revertir estado
  revertState: (id) => handleApiCall(api.patch(`/shippings/${id}/revert`)),

  // Eliminar (Solo Admin)
  delete: (id) => handleApiCall(api.delete(`/shippings/${id}`)),
};
