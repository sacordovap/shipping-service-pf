export const handleApiCall = async (
  apiCall,
  errorMessage = "Error en la operación",
) => {
  try {
    const response = await apiCall;
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: errorMessage };
  }
};
