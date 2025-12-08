/**
 * Main Google Maps Heatmap Component
 * Displays Kerala with district-level migrant worker density heatmap
 */

"use client";

import { useDistrictData } from "@/hooks/useDistrictData";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { generateHeatmapData } from "@/services/mapService";
import { GoogleMapsDistrictData } from "@/services/mock/googleMapsMockData";
import { KERALA_CENTER, KERALA_ZOOM } from "@/utils/mapUtils";
import { GoogleMap, HeatmapLayer, Marker } from "@react-google-maps/api";
import { AlertCircle, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AIAssistant from "./AIAssistant";
import DistrictPolygon from "./DistrictPolygon";
import DraggableDistrictCard from "./DraggableDistrictCard";
import FloatingControls from "./FloatingControls";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

interface GoogleMapsHeatmapProps {
  data?: GoogleMapsDistrictData[];
  onDistrictSelect?: (district: GoogleMapsDistrictData) => void;
  className?: string;
}

const GoogleMapsHeatmap: React.FC<GoogleMapsHeatmapProps> = ({
  data: externalData,
  onDistrictSelect,
  className = "",
}) => {
  const { isLoaded, loadError, google } = useGoogleMaps();
  const {
    districts: hookDistricts,
    loading,
    error,
    filterByOrigin,
    filterByTimeRange,
    filterByThreshold,
  } = useDistrictData();

  // Use external data if provided, otherwise use hook data
  const districts = externalData || hookDistricts;

  // State management
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<GoogleMapsDistrictData | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("All");
  const [timeRange, setTimeRange] = useState<"30days" | "90days" | "1year">("1year");
  const [densityThreshold, setDensityThreshold] = useState<number>(0);

  const mapRef = useRef<google.maps.Map | null>(null);

  // Generate heatmap data
  const heatmapData = useMemo(() => {
    if (!showHeatmap || !districts.length) return [];
    const filteredDistricts = districts.filter((d) => d.workers >= densityThreshold);
    return generateHeatmapData(filteredDistricts, selectedOrigin);
  }, [districts, showHeatmap, selectedOrigin, densityThreshold]);

  // Handle map load
  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
    setMap(mapInstance);
  }, []);

  // Handle district click
  const handleDistrictClick = useCallback(
    (district: GoogleMapsDistrictData) => {
      setSelectedDistrict(district);
      if (onDistrictSelect) {
        onDistrictSelect(district);
      }
    },
    [onDistrictSelect]
  );

  // Handle marker click
  const handleMarkerClick = useCallback(
    (district: GoogleMapsDistrictData) => {
      handleDistrictClick(district);
    },
    [handleDistrictClick]
  );

  // Handle view details
  const handleViewDetails = useCallback(() => {
    if (selectedDistrict && onDistrictSelect) {
      onDistrictSelect(selectedDistrict);
    }
  }, [selectedDistrict, onDistrictSelect]);

  // Handle generate report
  const handleGenerateReport = useCallback(() => {
    if (selectedDistrict) {
      // In production, this would trigger a report generation API call
      console.log("Generating report for:", selectedDistrict.name);
      alert(`Report generation for ${selectedDistrict.name} would be triggered here`);
    }
  }, [selectedDistrict]);

  // Handle export map
  const handleExportMap = useCallback(() => {
    if (!mapRef.current) return;

    // Create a canvas and draw the map
    const mapDiv = mapRef.current.getDiv();
    if (!mapDiv) return;

    // Use html2canvas or similar library for export
    // For now, just log the action
    console.log("Exporting map as PNG");
    alert("Map export functionality would be implemented here (requires html2canvas library)");
  }, []);

  // Apply filters when they change
  useEffect(() => {
    filterByOrigin(selectedOrigin);
  }, [selectedOrigin, filterByOrigin]);

  useEffect(() => {
    filterByTimeRange(timeRange);
  }, [timeRange, filterByTimeRange]);

  useEffect(() => {
    filterByThreshold(densityThreshold);
  }, [densityThreshold, filterByThreshold]);

  // Create custom marker icon
  const createMarkerIcon = useCallback(
    (district: GoogleMapsDistrictData, isSelected: boolean) => {
      if (!google) return undefined;
      
      const densityColor = district.density === "high" ? "#dc2626" : 
                          district.density === "medium" ? "#f97316" :
                          district.density === "low" ? "#fbbf24" : "#16a34a";
      
      return {
        path: google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 8 : 6,
        fillColor: densityColor,
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      };
    },
    [google]
  );

  // Loading state
  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center h-full bg-slate-50 rounded-lg ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className={`flex items-center justify-center h-full bg-red-50 rounded-lg ${className}`}>
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Failed to Load Google Maps
          </h3>
          <p className="text-red-700 mb-4">
            {loadError.message || "Please check your API key configuration"}
          </p>
          <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Get Google Maps API Key
          </a>
        </div>
      </div>
    );
  }

  // Data loading state
  if (loading && !externalData) {
    return (
      <div className={`flex items-center justify-center h-full bg-slate-50 rounded-lg ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading district data...</p>
        </div>
      </div>
    );
  }

  // Data error state
  if (error && !externalData) {
    return (
      <div className={`flex items-center justify-center h-full bg-yellow-50 rounded-lg ${className}`}>
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            Failed to Load Data
          </h3>
          <p className="text-yellow-700">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full ${className}`}>
      {/* Map Container */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full h-full" style={{ minHeight: '600px' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={KERALA_CENTER}
          zoom={KERALA_ZOOM}
          onLoad={onMapLoad}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            styles: [
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [{ visibility: "on" }],
              },
            ],
          }}
        >
          {/* District Polygons */}
          {districts.map((district) => (
            <DistrictPolygon
              key={district.id}
              district={district}
              map={map}
              isHovered={hoveredDistrict === district.id}
              isSelected={selectedDistrict?.id === district.id}
              onMouseEnter={() => setHoveredDistrict(district.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              onClick={() => handleDistrictClick(district)}
            />
          ))}

          {/* District Markers */}
          {districts.map((district) => (
            <Marker
              key={`marker-${district.id}`}
              position={district.center}
              icon={createMarkerIcon(district, selectedDistrict?.id === district.id)}
              onClick={() => handleMarkerClick(district)}
              animation={selectedDistrict?.id === district.id && google ? google.maps.Animation.BOUNCE : undefined}
            />
          ))}

          {/* Heatmap Layer */}
          {showHeatmap && heatmapData.length > 0 && google && (
            <HeatmapLayer
              data={heatmapData.map((point) => ({
                location: new google.maps.LatLng(point.location.lat, point.location.lng),
                weight: point.weight,
              }))}
              options={{
                radius: 20,
                opacity: 0.6,
                gradient: [
                  "rgba(0, 255, 255, 0)",
                  "rgba(0, 255, 255, 1)",
                  "rgba(0, 191, 255, 1)",
                  "rgba(0, 127, 255, 1)",
                  "rgba(0, 63, 255, 1)",
                  "rgba(0, 0, 255, 1)",
                  "rgba(0, 0, 223, 1)",
                  "rgba(0, 0, 191, 1)",
                  "rgba(0, 0, 159, 1)",
                  "rgba(0, 0, 127, 1)",
                  "rgba(63, 0, 91, 1)",
                  "rgba(127, 0, 63, 1)",
                  "rgba(191, 0, 31, 1)",
                  "rgba(255, 0, 0, 1)",
                ],
              }}
            />
          )}

        </GoogleMap>

        {/* Floating Controls Panel */}
        <FloatingControls
          showHeatmap={showHeatmap}
          onToggleHeatmap={setShowHeatmap}
          selectedOrigin={selectedOrigin}
          onOriginChange={setSelectedOrigin}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          densityThreshold={densityThreshold}
          onDensityThresholdChange={setDensityThreshold}
          onExportMap={handleExportMap}
        />

        {/* Draggable District Card */}
        {selectedDistrict && (
          <DraggableDistrictCard
            district={selectedDistrict}
            onClose={() => setSelectedDistrict(null)}
            onViewDetails={handleViewDetails}
            onGenerateReport={handleGenerateReport}
          />
        )}

        {/* AI Assistant */}
        <AIAssistant selectedDistrict={selectedDistrict} />
      </div>
    </div>
  );
};

export default GoogleMapsHeatmap;

