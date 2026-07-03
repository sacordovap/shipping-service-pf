import { shippingService } from "@/features/shipping/services/shipping-service";
import { mapShippingToList } from "@/features/shipping/utils/mapper/shipping-mapper";
import { useState, useEffect, useCallback } from "react";

export const useShippingDetail = (id) => {
  const [shipping, setShipping] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await shippingService.getById(id);
      setShipping(mapShippingToList(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { shipping, isLoading, error, refetch };
};
