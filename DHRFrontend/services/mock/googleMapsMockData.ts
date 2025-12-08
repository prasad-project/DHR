/**
 * Mock data for Google Maps heatmap visualization
 * Contains Kerala district data with Google Maps coordinates
 */

import { LatLng } from "@/utils/mapUtils";

export interface GoogleMapsDistrictData {
  id: string;
  name: string;
  center: LatLng;
  bounds: LatLng[]; // Polygon coordinates for district boundary
  workers: number;
  density: "very-low" | "low" | "medium" | "high";
  trend: "up" | "down" | "stable";
  originBreakdown: {
    Odisha: number;
    Bihar: number;
    WB: number;
    Assam: number;
  };
  healthMetrics: {
    healthCheckRate: number;
    awaazCoverage: number;
    activeCases: number;
  };
}

/**
 * Generate polygon bounds for a district (simplified rectangular approximation)
 * In production, use actual GeoJSON district boundaries
 */
const createDistrictBounds = (
  center: LatLng,
  width: number = 0.3,
  height: number = 0.4
): LatLng[] => {
  return [
    { lat: center.lat - height / 2, lng: center.lng - width / 2 },
    { lat: center.lat - height / 2, lng: center.lng + width / 2 },
    { lat: center.lat + height / 2, lng: center.lng + width / 2 },
    { lat: center.lat + height / 2, lng: center.lng - width / 2 },
  ];
};

export const mockGoogleMapsDistrictData: GoogleMapsDistrictData[] = [
  // NORTH KERALA
  {
    id: "ERN",
    name: "Ernakulam",
    center: { lat: 9.9312, lng: 76.2673 },
    bounds: createDistrictBounds({ lat: 9.9312, lng: 76.2673 }, 0.4, 0.5),
    workers: 65423,
    density: "high",
    trend: "up",
    originBreakdown: {
      Odisha: 26169, // 40%
      Bihar: 19627,  // 30%
      WB: 13085,     // 20%
      Assam: 6542,   // 10%
    },
    healthMetrics: {
      healthCheckRate: 68,
      awaazCoverage: 45,
      activeCases: 235,
    },
  },
  {
    id: "KAS",
    name: "Kasaragod",
    center: { lat: 12.4996, lng: 75.0 },
    bounds: createDistrictBounds({ lat: 12.4996, lng: 75.0 }, 0.3, 0.3),
    workers: 12500,
    density: "low",
    trend: "stable",
    originBreakdown: {
      Odisha: 5000,
      WB: 3000,
      Bihar: 2000,
      Assam: 2500,
    },
    healthMetrics: {
      healthCheckRate: 72,
      awaazCoverage: 52,
      activeCases: 45,
    },
  },
  {
    id: "KAN",
    name: "Kannur",
    center: { lat: 11.8745, lng: 75.3704 },
    bounds: createDistrictBounds({ lat: 11.8745, lng: 75.3704 }, 0.35, 0.4),
    workers: 28000,
    density: "medium",
    trend: "up",
    originBreakdown: {
      Odisha: 10000,
      WB: 8000,
      Bihar: 5000,
      Assam: 5000,
    },
    healthMetrics: {
      healthCheckRate: 65,
      awaazCoverage: 48,
      activeCases: 120,
    },
  },
  {
    id: "WAY",
    name: "Wayanad",
    center: { lat: 11.6854, lng: 76.1320 },
    bounds: createDistrictBounds({ lat: 11.6854, lng: 76.1320 }, 0.4, 0.35),
    workers: 15000,
    density: "low",
    trend: "stable",
    originBreakdown: {
      Odisha: 6000,
      WB: 4000,
      Bihar: 3000,
      Assam: 2000,
    },
    healthMetrics: {
      healthCheckRate: 70,
      awaazCoverage: 55,
      activeCases: 35,
    },
  },
  {
    id: "KOZ",
    name: "Kozhikode",
    center: { lat: 11.2588, lng: 75.7804 },
    bounds: createDistrictBounds({ lat: 11.2588, lng: 75.7804 }, 0.4, 0.45),
    workers: 45000,
    density: "high",
    trend: "up",
    originBreakdown: {
      Odisha: 20000,
      WB: 10000,
      Bihar: 10000,
      Assam: 5000,
    },
    healthMetrics: {
      healthCheckRate: 62,
      awaazCoverage: 42,
      activeCases: 180,
    },
  },
  {
    id: "MAL",
    name: "Malappuram",
    center: { lat: 11.0732, lng: 76.0740 },
    bounds: createDistrictBounds({ lat: 11.0732, lng: 76.0740 }, 0.4, 0.4),
    workers: 38000,
    density: "high",
    trend: "up",
    originBreakdown: {
      Odisha: 15000,
      WB: 10000,
      Bihar: 8000,
      Assam: 5000,
    },
    healthMetrics: {
      healthCheckRate: 64,
      awaazCoverage: 44,
      activeCases: 155,
    },
  },
  // CENTRAL KERALA
  {
    id: "PAL",
    name: "Palakkad",
    center: { lat: 10.7867, lng: 76.6548 },
    bounds: createDistrictBounds({ lat: 10.7867, lng: 76.6548 }, 0.5, 0.45),
    workers: 32000,
    density: "medium",
    trend: "stable",
    originBreakdown: {
      Odisha: 12000,
      WB: 8000,
      Bihar: 8000,
      Assam: 4000,
    },
    healthMetrics: {
      healthCheckRate: 66,
      awaazCoverage: 50,
      activeCases: 98,
    },
  },
  {
    id: "THR",
    name: "Thrissur",
    center: { lat: 10.5276, lng: 76.2144 },
    bounds: createDistrictBounds({ lat: 10.5276, lng: 76.2144 }, 0.4, 0.4),
    workers: 41000,
    density: "high",
    trend: "up",
    originBreakdown: {
      Odisha: 18000,
      WB: 10000,
      Bihar: 8000,
      Assam: 5000,
    },
    healthMetrics: {
      healthCheckRate: 67,
      awaazCoverage: 46,
      activeCases: 142,
    },
  },
  {
    id: "IDU",
    name: "Idukki",
    center: { lat: 9.8497, lng: 76.9391 },
    bounds: createDistrictBounds({ lat: 9.8497, lng: 76.9391 }, 0.5, 0.5),
    workers: 22000,
    density: "low",
    trend: "down",
    originBreakdown: {
      Odisha: 8000,
      WB: 6000,
      Bihar: 5000,
      Assam: 3000,
    },
    healthMetrics: {
      healthCheckRate: 71,
      awaazCoverage: 58,
      activeCases: 28,
    },
  },
  // SOUTH KERALA
  {
    id: "KOT",
    name: "Kottayam",
    center: { lat: 9.5916, lng: 76.5222 },
    bounds: createDistrictBounds({ lat: 9.5916, lng: 76.5222 }, 0.35, 0.4),
    workers: 28000,
    density: "medium",
    trend: "stable",
    originBreakdown: {
      Odisha: 10000,
      WB: 8000,
      Bihar: 6000,
      Assam: 4000,
    },
    healthMetrics: {
      healthCheckRate: 69,
      awaazCoverage: 51,
      activeCases: 88,
    },
  },
  {
    id: "ALA",
    name: "Alappuzha",
    center: { lat: 9.4981, lng: 76.3388 },
    bounds: createDistrictBounds({ lat: 9.4981, lng: 76.3388 }, 0.3, 0.35),
    workers: 25000,
    density: "medium",
    trend: "stable",
    originBreakdown: {
      Odisha: 9000,
      WB: 7000,
      Bihar: 5000,
      Assam: 4000,
    },
    healthMetrics: {
      healthCheckRate: 68,
      awaazCoverage: 49,
      activeCases: 75,
    },
  },
  {
    id: "PAT",
    name: "Pathanamthitta",
    center: { lat: 9.2648, lng: 76.7870 },
    bounds: createDistrictBounds({ lat: 9.2648, lng: 76.7870 }, 0.3, 0.35),
    workers: 18000,
    density: "low",
    trend: "stable",
    originBreakdown: {
      Odisha: 7000,
      WB: 5000,
      Bihar: 4000,
      Assam: 2000,
    },
    healthMetrics: {
      healthCheckRate: 73,
      awaazCoverage: 56,
      activeCases: 42,
    },
  },
  {
    id: "KOL",
    name: "Kollam",
    center: { lat: 8.8932, lng: 76.6141 },
    bounds: createDistrictBounds({ lat: 8.8932, lng: 76.6141 }, 0.4, 0.4),
    workers: 35000,
    density: "high",
    trend: "up",
    originBreakdown: {
      Odisha: 14000,
      WB: 9000,
      Bihar: 7000,
      Assam: 5000,
    },
    healthMetrics: {
      healthCheckRate: 63,
      awaazCoverage: 43,
      activeCases: 165,
    },
  },
  {
    id: "TRI",
    name: "Thiruvananthapuram",
    center: { lat: 8.5241, lng: 76.9366 },
    bounds: createDistrictBounds({ lat: 8.5241, lng: 76.9366 }, 0.4, 0.45),
    workers: 55000,
    density: "high",
    trend: "up",
    originBreakdown: {
      Odisha: 25000,
      WB: 12000,
      Bihar: 10000,
      Assam: 8000,
    },
    healthMetrics: {
      healthCheckRate: 61,
      awaazCoverage: 40,
      activeCases: 298,
    },
  },
];

