/**
 * Color utility functions for density-based visualization
 */

export type DensityLevel = "very-low" | "low" | "medium" | "high";

export interface DensityColor {
  hex: string;
  rgb: string;
  opacity: number;
}

/**
 * Get density level based on worker count
 */
export const getDensityLevel = (workers: number): DensityLevel => {
  if (workers > 40000) return "high";
  if (workers >= 20000) return "medium";
  if (workers >= 10000) return "low";
  return "very-low";
};

/**
 * Get color for density level
 */
export const getDensityColor = (density: DensityLevel | number): DensityColor => {
  let level: DensityLevel;
  
  if (typeof density === "number") {
    level = getDensityLevel(density);
  } else {
    level = density;
  }

  const colorMap: Record<DensityLevel, DensityColor> = {
    high: {
      hex: "#dc2626", // Red
      rgb: "220, 38, 38",
      opacity: 0.7,
    },
    medium: {
      hex: "#f97316", // Orange
      rgb: "243, 115, 22",
      opacity: 0.6,
    },
    low: {
      hex: "#fbbf24", // Yellow
      rgb: "251, 191, 36",
      opacity: 0.5,
    },
    "very-low": {
      hex: "#16a34a", // Green
      rgb: "22, 163, 74",
      opacity: 0.4,
    },
  };

  return colorMap[level];
};

/**
 * Get polygon style for Google Maps based on density
 */
export const getPolygonStyle = (workers: number) => {
  const densityColor = getDensityColor(workers);
  
  return {
    fillColor: densityColor.hex,
    fillOpacity: densityColor.opacity,
    strokeWeight: 2,
    strokeColor: "#FFFFFF",
    clickable: true,
    draggable: false,
    editable: false,
    zIndex: 1,
  };
};

/**
 * Get hover polygon style (thicker border)
 */
export const getHoverPolygonStyle = (workers: number) => {
  const baseStyle = getPolygonStyle(workers);
  return {
    ...baseStyle,
    strokeWeight: 4,
    strokeColor: "#2563eb", // Blue highlight
    fillOpacity: baseStyle.fillOpacity + 0.1,
  };
};

/**
 * Get origin state colors for pie charts
 */
export const getOriginStateColor = (state: string): string => {
  const colorMap: Record<string, string> = {
    Odisha: "#3b82f6", // Blue
    Bihar: "#a855f7",  // Purple
    WB: "#f97316",     // Orange
    "West Bengal": "#f97316", // Orange
    Assam: "#10b981",  // Green
  };
  
  return colorMap[state] || "#6b7280"; // Default gray
};

