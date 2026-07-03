import { shippingService } from "@/features/shipping/services/shipping-service";
import { useState } from "react";

export const useUpdateStatus = (shippingId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateStatus = async (data, onSuccess) => {
    setIsUpdating(true);
    try {
      await shippingService.updateState(shippingId, data.newState);
      onSuccess?.();
    } catch (error) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating, error };
};
