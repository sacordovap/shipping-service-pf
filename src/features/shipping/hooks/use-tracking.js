import { shippingService } from "@/features/shipping/services/shipping-service";
import { mapShippingToList } from "@/features/shipping/utils/mapper/shipping-mapper";
import { useState } from "react";

export const useTracking = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTracking = async (trackingNumber) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await shippingService.searchByTracking(trackingNumber);
      console.log(response);
      setData(response);
    //   setData(mapShippingToList(response));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { getTracking, data, isLoading, error };
};
