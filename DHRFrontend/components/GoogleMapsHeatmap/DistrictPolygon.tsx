/**
 * District Polygon component for Google Maps
 */

"use client";

import { GoogleMapsDistrictData } from "@/services/mock/googleMapsMockData";
import { getHoverPolygonStyle, getPolygonStyle } from "@/utils/colorUtils";
import React, { useEffect, useRef } from "react";

interface DistrictPolygonProps {
  district: GoogleMapsDistrictData;
  map: google.maps.Map | null;
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const DistrictPolygon: React.FC<DistrictPolygonProps> = ({
  district,
  map,
  isHovered,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const polygonRef = useRef<google.maps.Polygon | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create polygon
    const polygon = new google.maps.Polygon({
      paths: district.bounds.map((coord) => ({
        lat: coord.lat,
        lng: coord.lng,
      })),
      ...getPolygonStyle(district.workers),
    });

    // Add event listeners
    polygon.addListener("mouseover", onMouseEnter);
    polygon.addListener("mouseout", onMouseLeave);
    polygon.addListener("click", onClick);

    // Set polygon on map
    polygon.setMap(map);
    polygonRef.current = polygon;

    return () => {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
      }
    };
  }, [map, district.bounds, district.workers, onMouseEnter, onMouseLeave, onClick]);

  useEffect(() => {
    if (!polygonRef.current) return;

    // Update polygon style based on hover/selection state
    if (isHovered || isSelected) {
      const hoverStyle = getHoverPolygonStyle(district.workers);
      polygonRef.current.setOptions(hoverStyle);
    } else {
      const normalStyle = getPolygonStyle(district.workers);
      polygonRef.current.setOptions(normalStyle);
    }
  }, [isHovered, isSelected, district.workers]);

  return null; // This component doesn't render anything directly
};

export default DistrictPolygon;

