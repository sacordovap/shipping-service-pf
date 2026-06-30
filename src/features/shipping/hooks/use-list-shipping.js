import { shippingService } from "@/features/shipping/services/shipping-service";
import { mapShippingList } from "@/features/shipping/utils/mapper/shipping-mapper";
import { useCallback, useEffect, useState } from "react";

export const useListShippings = () => {
  const [shippings, setShippings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShippings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await shippingService.getAll();
      setShippings(mapShippingList(data));
      // setShippings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShippings();
  }, [fetchShippings]);

  return { shippings, isLoading, error, refetch: fetchShippings };
};
