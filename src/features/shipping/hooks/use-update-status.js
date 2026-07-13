import { shippingService } from "@/features/shipping/services/shipping-service";
import { useState } from "react";
import toast from "react-stacked-toast";

export const useUpdateStatus = (shippingId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateStatus = async (data, onSuccess) => {
    setIsUpdating(true);
    setError(null);
    try {
      if (data.newState === "ELIMINADO") {
        await shippingService.delete(shippingId);
      } else {
        await shippingService.updateState(shippingId, data.newState);
      }

      onSuccess?.();
      toast.success("Estado actualizado exitosamente");
      return true;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      toast.error(error.message);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating, error };
};
