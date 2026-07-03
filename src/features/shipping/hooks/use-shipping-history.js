import { shippingService } from "@/features/shipping/services/shipping-service";
import { useState } from "react";

export const useShippingHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async (trackingCode) => {
    setHistory([]);
    setIsLoading(true);
    try {
      const response = await shippingService.getHistory(trackingCode);
      setHistory(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { history, isLoading, error, refetch: fetchHistory };
};
