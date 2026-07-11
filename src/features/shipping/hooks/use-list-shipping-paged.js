import { shippingService } from "@/features/shipping/services/shipping-service";
import { mapShippingList } from "@/features/shipping/utils/mapper/shipping-mapper";
import { useCallback, useEffect, useState } from "react";

export const useListShippingsPaged = () => {
  const [data, setData] = useState({
    content: [],
    totalPages: 0,
    pageNumber: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchShippings = useCallback(async (page) => {
    console.log("parte1");
    setIsLoading(true);
    try {
      console.log("parte2");
      const response = await shippingService.getAllPaged(page, 12);
      console.log("parte3");
      setData({
        content: mapShippingList(response.content),
        totalPages: response.totalPages,
        pageNumber: response.pageNumber,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShippings(currentPage);
  }, [fetchShippings, currentPage]);

  const refetch = useCallback(
    (page = currentPage) => {
      fetchShippings(page);
    },
    [fetchShippings, currentPage],
  );
  return {
    shippings: data.content,
    totalPages: data.totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    refetch,
  };
};
