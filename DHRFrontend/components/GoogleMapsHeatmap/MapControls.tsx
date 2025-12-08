/**
 * Sidebar controls panel for map filters and settings
 */

"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Download, Filter, Map } from "lucide-react";
import React from "react";

interface MapControlsProps {
  showHeatmap: boolean;
  onToggleHeatmap: (value: boolean) => void;
  selectedOrigin: string;
  onOriginChange: (origin: string) => void;
  timeRange: "30days" | "90days" | "1year";
  onTimeRangeChange: (range: "30days" | "90days" | "1year") => void;
  densityThreshold: number;
  onDensityThresholdChange: (threshold: number) => void;
  onExportMap: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  showHeatmap,
  onToggleHeatmap,
  selectedOrigin,
  onOriginChange,
  timeRange,
  onTimeRangeChange,
  densityThreshold,
  onDensityThresholdChange,
  onExportMap,
}) => {
  const originStates = ["All", "Odisha", "Bihar", "West Bengal", "Assam"];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-6 border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">Map Controls</h3>
      </div>

      {/* Heatmap Toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Map className="w-4 h-4" />
            Show Heatmap
          </label>
          <Toggle
            pressed={showHeatmap}
            onPressedChange={onToggleHeatmap}
            aria-label="Toggle heatmap"
          />
        </div>
        <p className="text-xs text-slate-500">
          Display density heatmap overlay
        </p>
      </div>

      {/* Origin State Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Filter by Origin State
        </label>
        <Select value={selectedOrigin} onValueChange={onOriginChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select origin state" />
          </SelectTrigger>
          <SelectContent>
            {originStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Time Range Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Time Range
        </label>
        <Select
          value={timeRange}
          onValueChange={(value) =>
            onTimeRangeChange(value as "30days" | "90days" | "1year")
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last 1 year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Density Threshold Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">
            Density Threshold
          </label>
          <span className="text-sm text-slate-600">
            {densityThreshold.toLocaleString()}
          </span>
        </div>
        <Slider
          value={[densityThreshold]}
          onValueChange={([value]) => onDensityThresholdChange(value)}
          min={0}
          max={50000}
          step={1000}
          className="w-full"
        />
        <p className="text-xs text-slate-500">
          Adjust minimum worker count for display
        </p>
      </div>

      {/* Export Button */}
      <Button
        onClick={onExportMap}
        variant="outline"
        className="w-full"
        aria-label="Export map as PNG"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Map as PNG
      </Button>
    </div>
  );
};

export default MapControls;

