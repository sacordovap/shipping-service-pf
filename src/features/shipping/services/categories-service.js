import { api } from "@/common/services/api";
import { handleApiCall } from "@/common/services/handle-api";

export const categoriesService = {
  // Crear categoria
  //   create: (data) => handleApiCall(api.post("/categories", data)),

  //TODOS LAS CATEGORIAS
  getAll: async () => handleApiCall(api.get("/categories")),
};
