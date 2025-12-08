/**
 * Floating Controls Panel - Collapsible and draggable
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
import { ChevronLeft, ChevronRight, Download, Filter, GripVertical, Map } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface FloatingControlsProps {
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

const FloatingControls: React.FC<FloatingControlsProps> = ({
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
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const originStates = ["All", "Odisha", "Bihar", "West Bengal", "Assam"];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (panelRef.current) {
      setIsDragging(true);
      const rect = panelRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(10, Math.min(e.clientX - dragStart.x, typeof window !== 'undefined' ? window.innerWidth - 320 : e.clientX - dragStart.x)),
          y: Math.max(10, Math.min(e.clientY - dragStart.y, typeof window !== 'undefined' ? window.innerHeight - 500 : e.clientY - dragStart.y)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      ref={panelRef}
      className="fixed bg-white rounded-lg shadow-2xl border border-slate-200 z-30 w-80 max-w-[calc(100vw-40px)]"
      style={{
        left: `${Math.max(10, Math.min(position.x, typeof window !== 'undefined' ? window.innerWidth - 330 : position.x))}px`,
        top: `${Math.max(10, Math.min(position.y, typeof window !== 'undefined' ? window.innerHeight - 500 : position.y))}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* Draggable Header */}
      <div
        className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-white rounded-t-lg flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="w-4 h-4 opacity-70" />
          <Filter className="w-4 h-4" />
          <h3 className="text-sm font-semibold">Map Controls</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={isOpen ? "Collapse" : "Expand"}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {isOpen ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
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
      )}
    </div>
  );
};

export default FloatingControls;

