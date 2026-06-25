import { useState } from "react";

export const useCustomer = (asyncFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...args);
      return result;
    } catch (err) {
      const message =
        err.response?.data?.message || "Ocurrió un error inesperado";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
