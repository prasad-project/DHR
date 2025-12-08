/**
 * Map service for fetching and processing district data
 * Backend-ready service layer
 */

import { LatLng } from "@/utils/mapUtils";
import { GoogleMapsDistrictData, mockGoogleMapsDistrictData } from "./mock/googleMapsMockData";

export interface HeatmapDataPoint {
  location: LatLng;
  weight: number;
}

/**
 * Fetch district data from backend or mock
 */
export const fetchDistrictData = async (): Promise<GoogleMapsDistrictData[]> => {
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || true; // Default to mock for now

  if (useMockData) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockGoogleMapsDistrictData;
  } else {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${apiBaseUrl}/api/districts/heatmap`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch district data: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching district data:", error);
      // Fallback to mock data on error
      return mockGoogleMapsDistrictData;
    }
  }
};

/**
 * Fetch real-time data for a specific district
 */
export const fetchRealTimeData = async (
  districtId: string
): Promise<GoogleMapsDistrictData | null> => {
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" || true;

  if (useMockData) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return (
      mockGoogleMapsDistrictData.find((d) => d.id === districtId) || null
    );
  } else {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${apiBaseUrl}/api/districts/${districtId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch district data: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      return null;
    }
  }
};

/**
 * Generate heatmap data from district data
 */
export const generateHeatmapData = (
  districts: GoogleMapsDistrictData[],
  filterByOrigin?: string
): HeatmapDataPoint[] => {
  return districts
    .map((district) => {
      let weight = district.workers;

      // Filter by origin state if specified
      if (filterByOrigin && filterByOrigin !== "All") {
        const originKey =
          filterByOrigin === "West Bengal" ? "WB" : filterByOrigin;
        weight = district.originBreakdown[originKey as keyof typeof district.originBreakdown] || 0;
      }

      // Create multiple points for better heat visualization
      const points: HeatmapDataPoint[] = [];
      const numPoints = Math.ceil(weight / 1000); // One point per 1000 workers

      for (let i = 0; i < Math.min(numPoints, 10); i++) {
        // Add slight randomization for better heat spread
        const offset = {
          lat: (Math.random() - 0.5) * 0.05,
          lng: (Math.random() - 0.5) * 0.05,
        };

        points.push({
          location: {
            lat: district.center.lat + offset.lat,
            lng: district.center.lng + offset.lng,
          },
          weight: weight / numPoints,
        });
      }

      return points;
    })
    .flat();
};

/**
 * Filter districts by origin state
 */
export const filterDistrictsByOrigin = (
  districts: GoogleMapsDistrictData[],
  originState: string
): GoogleMapsDistrictData[] => {
  if (originState === "All") {
    return districts;
  }

  return districts.filter((district) => {
    const originKey = originState === "West Bengal" ? "WB" : originState;
    return (
      district.originBreakdown[originKey as keyof typeof district.originBreakdown] > 0
    );
  });
};

/**
 * Filter districts by time range (placeholder for future implementation)
 */
export const filterDistrictsByTimeRange = (
  districts: GoogleMapsDistrictData[],
  timeRange: "30days" | "90days" | "1year"
): GoogleMapsDistrictData[] => {
  // For now, return all districts
  // In production, this would filter based on registration dates
  return districts;
};

/**
 * Get districts above density threshold
 */
export const getDistrictsAboveThreshold = (
  districts: GoogleMapsDistrictData[],
  threshold: number
): GoogleMapsDistrictData[] => {
  return districts.filter((district) => district.workers >= threshold);
};

