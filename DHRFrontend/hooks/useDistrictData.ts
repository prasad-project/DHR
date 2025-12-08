/**
 * Custom hook for fetching and managing district data
 */

import {
    fetchDistrictData,
    fetchRealTimeData,
    filterDistrictsByOrigin,
    filterDistrictsByTimeRange,
    getDistrictsAboveThreshold,
} from "@/services/mapService";
import { GoogleMapsDistrictData } from "@/services/mock/googleMapsMockData";
import { useCallback, useEffect, useState } from "react";

export interface UseDistrictDataReturn {
  districts: GoogleMapsDistrictData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  filterByOrigin: (origin: string) => void;
  filterByTimeRange: (range: "30days" | "90days" | "1year") => void;
  filterByThreshold: (threshold: number) => void;
  getDistrictById: (id: string) => GoogleMapsDistrictData | undefined;
  refreshDistrict: (id: string) => Promise<void>;
}

export const useDistrictData = (): UseDistrictDataReturn => {
  const [districts, setDistricts] = useState<GoogleMapsDistrictData[]>([]);
  const [allDistricts, setAllDistricts] = useState<GoogleMapsDistrictData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentOriginFilter, setCurrentOriginFilter] = useState<string>("All");
  const [currentTimeRange, setCurrentTimeRange] = useState<
    "30days" | "90days" | "1year"
  >("1year");
  const [currentThreshold, setCurrentThreshold] = useState<number>(0);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDistrictData();
      setAllDistricts(data);
      setDistricts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load district data"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const applyFilters = useCallback(() => {
    let filtered = [...allDistricts];

    // Apply origin filter
    if (currentOriginFilter !== "All") {
      filtered = filterDistrictsByOrigin(filtered, currentOriginFilter);
    }

    // Apply time range filter
    filtered = filterDistrictsByTimeRange(filtered, currentTimeRange);

    // Apply threshold filter
    if (currentThreshold > 0) {
      filtered = getDistrictsAboveThreshold(filtered, currentThreshold);
    }

    setDistricts(filtered);
  }, [allDistricts, currentOriginFilter, currentTimeRange, currentThreshold]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const filterByOrigin = useCallback((origin: string) => {
    setCurrentOriginFilter(origin);
  }, []);

  const filterByTimeRange = useCallback((range: "30days" | "90days" | "1year") => {
    setCurrentTimeRange(range);
  }, []);

  const filterByThreshold = useCallback((threshold: number) => {
    setCurrentThreshold(threshold);
  }, []);

  const getDistrictById = useCallback(
    (id: string): GoogleMapsDistrictData | undefined => {
      return districts.find((d) => d.id === id);
    },
    [districts]
  );

  const refreshDistrict = useCallback(async (id: string) => {
    try {
      const updatedDistrict = await fetchRealTimeData(id);
      if (updatedDistrict) {
        setAllDistricts((prev) =>
          prev.map((d) => (d.id === id ? updatedDistrict : d))
        );
      }
    } catch (err) {
      console.error("Failed to refresh district:", err);
    }
  }, []);

  return {
    districts,
    loading,
    error,
    refetch: loadData,
    filterByOrigin,
    filterByTimeRange,
    filterByThreshold,
    getDistrictById,
    refreshDistrict,
  };
};

