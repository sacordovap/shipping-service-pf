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

  //TODOS LOS ENVIOS PAGINADO
  getAllPaged: async (page, size) =>
    handleApiCall(api.get(`/shippings/paged?page=${page}&size=${size}`)),

  getAllOwner: async () => handleApiCall(api.get("/shippings/my-shippings")),
  // const response = await api.get();


  //multiple filters 
  searchFiltered: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return handleApiCall(api.get(`/shippings/filter/search?${params}`));
  },

  // Listado filtrado (CATEGORY + STATE)
  getByCategoryAndState: (category, state) =>
    handleApiCall(
      api.get(`/shippings/filter/category?category=${category}&state=${state}`),
    ),

  // Búsqueda por tracking
  searchByTracking: (tracking) =>
    handleApiCall(api.get(`/shippings/tracking/${tracking}`)),

  // Búsqueda por término (tracking parcial)
  searchByTrackingTerm: (term) =>
    handleApiCall(api.get(`/shippings/search?term=${term}`)),

  // Búsqueda por nombre
  searchByName: (name) =>
    handleApiCall(api.get(`/shippings/searchName?name=${name}`)),

  // Obtener por ID
  getById: (id) => handleApiCall(api.get(`/shippings/detail/${id}`)),

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
