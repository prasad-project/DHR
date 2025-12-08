/**
 * InfoWindow component showing district details with animated pie chart
 */

"use client";

import { GoogleMapsDistrictData } from "@/services/mock/googleMapsMockData";
import { getOriginStateColor } from "@/utils/colorUtils";
import { Activity, AlertTriangle, CheckCircle, Minus, TrendingDown, TrendingUp, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DistrictInfoWindowProps {
  district: GoogleMapsDistrictData;
  onClose: () => void;
  onViewDetails?: () => void;
  onGenerateReport?: () => void;
}

const DistrictInfoWindow: React.FC<DistrictInfoWindowProps> = ({
  district,
  onClose,
  onViewDetails,
  onGenerateReport,
}) => {
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

    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

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
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl w-96 max-w-[90vw] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{district.name}</h3>
            <p className="text-sm text-blue-100">District Analysis</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Total Workers */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Total Workers</span>
            {getTrendIcon()}
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {district.workers.toLocaleString()}
          </p>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">
            Origin State Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => {
                  const { name, value } = entry;
                  const pct = total > 0 ? (value / total) * 100 : 0;
                  return `${name}: ${pct.toFixed(1)}%`;
                }}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
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

        {/* Health Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">
                Health Check
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {district.healthMetrics.healthCheckRate}%
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
            <div className="flex items-center gap-1 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-xs font-medium text-yellow-700">
                Awaaz Coverage
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {district.healthMetrics.awaazCoverage}%
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 border border-red-100">
            <div className="flex items-center gap-1 mb-1">
              <Activity className="w-4 h-4 text-red-600" />
              <span className="text-xs font-medium text-red-700">
                Disease Cases
              </span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {district.healthMetrics.activeCases}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={onGenerateReport}
            className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistrictInfoWindow;

