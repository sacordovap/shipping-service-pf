import { shippingService } from "@/features/shipping/services/shipping-service";
import { mapShippingList } from "@/features/shipping/utils/mapper/shipping-mapper";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useListShippingsPaged = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ content: [], totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = useMemo(() => {
    const p = parseInt(searchParams.get("page") || "1");
    return {
      page: isNaN(p) || p < 1 ? 1 : p,
      branch: searchParams.get("branch") || "",
      state: searchParams.get("state") || "",
      category: searchParams.get("category") || "",
      term: searchParams.get("term") || "",
      name: searchParams.get("name") || "",
    };
  }, [searchParams]);

  const fetchShippings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = {
        page: filters.page, 
        size: 12,
        ...(filters.branch && { branch: filters.branch }),
        ...(filters.state && { state: filters.state }),
        ...(filters.category && { category: filters.category }),
        ...(filters.term && { term: filters.term }),
        ...(filters.name && { name: filters.name }),
      };

      const response = await shippingService.searchFiltered(queryParams);

      setData({
        content: mapShippingList(response?.content || []),
        totalPages: response?.totalPages || 0,
      });
    } catch (err) {
      setError(err.message);
      setData({ content: [], totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchShippings();
  }, [fetchShippings]);

  const setFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (!newFilters.hasOwnProperty("page")) {
      params.set("page", "1");
    }

    setSearchParams(params, { replace: true });
  };

  return {
    shippings: data.content,
    totalPages: data.totalPages,
    currentPage: filters.page,
    setCurrentPage: (p) =>
      setFilters({ page: typeof p === "function" ? p(filters.page) : p }),
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchShippings,
  };
};
