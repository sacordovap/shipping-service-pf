import { shippingService } from "@/features/shipping/services/shipping-service";
import { mapShippingToList } from "@/features/shipping/utils/mapper/shipping-mapper";
import { useState, useEffect } from "react";

export const useShippingDetail = (id) => {
  const [shipping, setShipping] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        console.log(id)
        const data = await shippingService.getById(id);
        console.log(shipping)
        setShipping(mapShippingToList(data));
        // setShipping(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  return { shipping, isLoading, error };
};
