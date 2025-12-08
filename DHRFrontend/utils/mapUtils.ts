/**
 * Map utility functions for coordinate calculations and transformations
 */

export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * Kerala center coordinates
 */
export const KERALA_CENTER: LatLng = {
  lat: 10.8505,
  lng: 76.2711,
};

/**
 * Default zoom level for Kerala
 */
export const KERALA_ZOOM = 7;

/**
 * Calculate centroid from polygon coordinates
 */
export const calculateCentroid = (coordinates: LatLng[]): LatLng => {
  if (coordinates.length === 0) return KERALA_CENTER;

  let sumLat = 0;
  let sumLng = 0;

  coordinates.forEach((coord) => {
    sumLat += coord.lat;
    sumLng += coord.lng;
  });

  return {
    lat: sumLat / coordinates.length,
    lng: sumLng / coordinates.length,
  };
};

/**
 * Convert SVG path coordinates to Google Maps LatLng
 * This is a simplified conversion - in production, use actual district boundaries
 */
export const convertSVGToLatLng = (
  svgPath: string,
  viewBox: { width: number; height: number },
  bounds: { north: number; south: number; east: number; west: number }
): LatLng[] => {
  // Extract coordinates from SVG path
  const coords: LatLng[] = [];
  const regex = /([ML])\s+(\d+)\s+(\d+)/g;
  let match;

  while ((match = regex.exec(svgPath)) !== null) {
    const x = parseFloat(match[2]);
    const y = parseFloat(match[3]);

    // Convert SVG coordinates to lat/lng
    const lat = bounds.south + (y / viewBox.height) * (bounds.north - bounds.south);
    const lng = bounds.west + (x / viewBox.width) * (bounds.east - bounds.west);

    coords.push({ lat, lng });
  }

  return coords.length > 0 ? coords : [KERALA_CENTER];
};

/**
 * Kerala district bounds (approximate)
 */
export const KERALA_BOUNDS = {
  north: 12.7946,
  south: 8.0883,
  east: 77.2708,
  west: 74.4421,
};

/**
 * Generate mock polygon coordinates for a district
 * In production, these should come from actual GeoJSON data
 */
export const generateDistrictPolygon = (
  center: LatLng,
  size: number = 0.5
): LatLng[] => {
  // Generate a simple square polygon around the center
  // In production, use actual district boundary GeoJSON
  return [
    { lat: center.lat - size, lng: center.lng - size },
    { lat: center.lat - size, lng: center.lng + size },
    { lat: center.lat + size, lng: center.lng + size },
    { lat: center.lat + size, lng: center.lng - size },
  ];
};

/**
 * Check if a point is inside a polygon
 */
export const isPointInPolygon = (point: LatLng, polygon: LatLng[]): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

/**
 * Calculate distance between two points (Haversine formula)
 */
export const calculateDistance = (point1: LatLng, point2: LatLng): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

