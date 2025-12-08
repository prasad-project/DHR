/**
 * Draggable District Detail Card Component
 */

"use client";

import { downloadReport, generateDistrictReport } from "@/services/aiService";
import { GoogleMapsDistrictData } from "@/services/mock/googleMapsMockData";
import { getOriginStateColor } from "@/utils/colorUtils";
import { Activity, CheckCircle, GripVertical, Loader2, Minus, TrendingDown, TrendingUp, Users, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DraggableDistrictCardProps {
  district: GoogleMapsDistrictData;
  onClose: () => void;
  onViewDetails?: () => void;
  onGenerateReport?: () => void;
}

const DraggableDistrictCard: React.FC<DraggableDistrictCardProps> = ({
  district,
  onClose,
  onViewDetails,
  onGenerateReport,
}) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [animatedData, setAnimatedData] = useState(
    Object.entries(district.originBreakdown).map(([name, value]) => ({
      name,
      value: 0,
      percentage: 0,
    }))
  );

  useEffect(() => {
    // Animate pie chart data
    const total = district.workers;
    const targetData = Object.entries(district.originBreakdown).map(([name, value]) => ({
      name,
      value,
      percentage: (value / total) * 100,
    }));

    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedData(
        targetData.map((item) => ({
          ...item,
          value: item.value * easedProgress,
          percentage: item.percentage * easedProgress,
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedData(targetData);
      }
    };

    requestAnimationFrame(animate);
  }, [district]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      setIsDragging(true);
      const rect = cardRef.current.getBoundingClientRect();
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
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
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

  const total = district.workers;
  const pieData = animatedData.map((item) => ({
    name: item.name === "WB" ? "West Bengal" : item.name,
    value: item.value,
    color: getOriginStateColor(item.name),
    percentage: total > 0 ? (item.value / total) * 100 : 0,
  }));

  const getTrendIcon = () => {
    switch (district.trend) {
      case "up":
        return <TrendingUp className="w-3.5 h-3.5 text-red-500" />;
      case "down":
        return <TrendingDown className="w-3.5 h-3.5 text-green-500" />;
      default:
        return <Minus className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <div
      ref={cardRef}
      className="fixed bg-white rounded-xl shadow-2xl border border-slate-200 w-80 max-w-[calc(100vw-40px)] z-50 cursor-move"
      style={{
        left: `${Math.max(10, Math.min(position.x, typeof window !== 'undefined' ? window.innerWidth - 330 : position.x))}px`,
        top: `${Math.max(10, Math.min(position.y, typeof window !== 'undefined' ? window.innerHeight - 400 : position.y))}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Draggable Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-white rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="w-4 h-4 opacity-70" />
          <div className="flex-1">
            <h3 className="text-lg font-bold leading-tight">{district.name}</h3>
            <p className="text-xs text-blue-100">District Analysis</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
          aria-label="Close"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Compact Content */}
      <div className="p-3 space-y-3">
        {/* Total Workers - Compact */}
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-600">Total Workers</span>
            {getTrendIcon()}
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {district.workers.toLocaleString()}
          </p>
        </div>

        {/* Compact Pie Chart */}
        <div className="bg-slate-50 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-slate-700 mb-2">
            Origin Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => {
                  const { name, value } = entry;
                  const pct = total > 0 ? (value / total) * 100 : 0;
                  return pct > 5 ? `${name}: ${pct.toFixed(0)}%` : "";
                }}
                outerRadius={55}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `${value.toLocaleString()} workers`,
                  "",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Compact Health Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 rounded-lg p-2 border border-green-100">
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span className="text-[10px] font-medium text-green-700">Health</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {district.healthMetrics.healthCheckRate}%
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
            <div className="flex items-center gap-1 mb-1">
              <Users className="w-3 h-3 text-blue-600" />
              <span className="text-[10px] font-medium text-blue-700">New Visit</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {Math.floor(district.workers * 0.15).toLocaleString()}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-2 border border-red-100">
            <div className="flex items-center gap-1 mb-1">
              <Activity className="w-3 h-3 text-red-600" />
              <span className="text-[10px] font-medium text-red-700">Cases</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {district.healthMetrics.activeCases}
            </p>
          </div>
        </div>

        {/* Compact Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onViewDetails}
            className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
          >
            Details
          </button>
          <button
            onClick={async () => {
              setIsGeneratingReport(true);
              try {
                const report = await generateDistrictReport(district);
                downloadReport(report, district.name);
                if (onGenerateReport) onGenerateReport();
              } catch (error) {
                console.error("Error generating report:", error);
              } finally {
                setIsGeneratingReport(false);
              }
            }}
            disabled={isGeneratingReport}
            className="flex-1 px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {isGeneratingReport ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Generating...
              </>
            ) : (
              "Report"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableDistrictCard;

