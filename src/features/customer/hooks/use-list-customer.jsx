import { useState, useEffect } from "react";
import { customerService } from "@/features/customer/services/customer-service";

export const useListCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(data);
      setIsLoading(false);
    } catch (error) {
      setError("No se pudo cargar la lista de clientes");
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro?")) {
      await customerService.delete(id);
      fetchCustomers();
    }
  };

  const handleEdit = async (id, data) => {
    console.log(id)
    if (confirm("Editando")) {
      await customerService.update(id, data);
      await fetchCustomers();
    }
  };

  return {
    customers,
    isLoading,
    error,
    handleEdit,
    handleDelete,
    fetchCustomers,
  };
};
