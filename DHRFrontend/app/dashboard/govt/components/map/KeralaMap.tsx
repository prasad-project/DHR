"use client"

import React, { useState } from 'react';
import { Users, MapPin, Activity, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { DistrictData } from '@/services/mock/mockDistrictData';
import { useDistricts } from '@/hooks/useDistricts';
import InfoTooltip from './InfoTooltip';
import DistrictModal from './DistrictModal';
import MapSidebarControls from './MapSidebarControls';
import { useApi } from '@/context/ApiContext';

// --- Configuration for Icon Colors ---
const ORIGIN_COLORS: Record<string, string> = {
    Odisha: "#3b82f6",     // Blue
    WB: "#f97316",         // Orange
    Bihar: "#a855f7",      // Purple
    Assam: "#10b981",      // Green
    All: "#334155"         // Slate-700
};

// --- Component Props Interface ---
interface KeralaMapProps {
    showHeat?: boolean;
    showIcons?: boolean;
    selectedCategory?: string;
}

export default function KeralaMap({
    showHeat = true,
    showIcons = true,
    selectedCategory = "All"
}: KeralaMapProps) {

    // Data Fetching
    const { districts, loading, error, refetch } = useDistricts();
    const { isMockMode } = useApi();

    // UI State Management
    const [hoveredDistrict, setHoveredDistrict] = useState<DistrictData | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // State needed for MapSidebarControls to function within this component:
    const [mapShowHeat, setMapShowHeat] = useState(showHeat);
    const [mapShowIcons, setMapShowIcons] = useState(showIcons);
    const [mapSelectedCategory, setMapSelectedCategory] = useState(selectedCategory);

    // --- Core Logic Functions ---

    // 1. Calculates the fill color for the heatmap based on total workers
    const getFillColor = (d: DistrictData) => {
        if (!mapShowHeat) return "#e2e8f0"; // Default slate-200 if toggled off
        if (d.workers > 40000) return "#ef4444"; // High Risk (Red)
        if (d.workers > 20000) return "#fb923c"; // Medium Risk (Orange)
        return "#4ade80"; // Low Risk (Green)
    };

    // 2. Determines the icon details for the selected category filter
    const getIconDetails = (d: DistrictData) => {
        const categoryKey = mapSelectedCategory === 'All' ? 'Odisha' : (mapSelectedCategory as keyof DistrictData['originBreakdown']);

        let count = 0;
        if (mapSelectedCategory === 'All') {
            // Sum all origin workers if 'All' is selected
            count = Object.values(d.originBreakdown).reduce((sum, val) => sum + val, 0);
        } else {
            // Get count for the specific selected state
            count = d.originBreakdown[categoryKey];
        }

        // Base icon size (min 5, max 15) scaled by the count relative to a max (e.g., 30,000 workers)
        const maxWorkers = 30000;
        const baseSize = 5;
        const scaleFactor = Math.min(1, count / maxWorkers);
        const size = baseSize + scaleFactor * 10;

        return {
            count,
            size: size,
            color: ORIGIN_COLORS[mapSelectedCategory] || ORIGIN_COLORS['All']
        };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Calculate mouse position relative to the viewport for the Tooltip
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // --- Component Rendering ---

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-96 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <p className="text-slate-500 text-sm">Loading map data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-96 bg-red-50 rounded-xl border border-red-200">
                <div className="flex flex-col items-center gap-2 text-red-600">
                    <AlertCircle className="w-8 h-8" />
                    <p className="font-medium">Failed to load map data</p>
                    <p className="text-sm text-red-500">{error}</p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-white border border-red-200 rounded-md text-sm hover:bg-red-50 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full h-full bg-slate-50">

            {/* 1. Sidebar Controls - Pass State Up/Down */}
            <div className="flex-shrink-0">
                <MapSidebarControls
                    showHeat={mapShowHeat}
                    setShowHeat={setMapShowHeat}
                    showIcons={mapShowIcons}
                    setShowIcons={setMapShowIcons}
                    selectedCategory={mapSelectedCategory}
                    setSelectedCategory={(category: string) => setMapSelectedCategory(category)}
                />
                {isMockMode && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-700 font-medium flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Mock Mode Active
                        </p>
                    </div>
                )}
            </div>

            {/* 2. Interactive Map Container */}
            <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-200 relative overflow-hidden flex items-center justify-center p-6" onMouseMove={handleMouseMove}>

                {/* SVG Viewport */}
                <div className="relative w-full max-w-lg h-full" onMouseMove={handleMouseMove}>
                    <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-xl">

                        {districts.map((district) => {
                            const iconDetails = getIconDetails(district);

                            return (
                                <g
                                    key={district.id}
                                    onMouseEnter={() => setHoveredDistrict(district)}
                                    onMouseLeave={() => setHoveredDistrict(null)}
                                    onClick={() => setSelectedDistrict(district)}
                                    className="cursor-pointer transition-all duration-300 group"
                                >
                                    {/* District Shape (HeatLayer) */}
                                    <path
                                        d={district.path}
                                        fill={getFillColor(district)}
                                        fillOpacity={mapShowHeat ? 0.7 : 1}
                                        stroke="white"
                                        strokeWidth={hoveredDistrict?.id === district.id ? 3 : 1}
                                        className="transition-all duration-300 group-hover:brightness-110 focus:outline-none"
                                    />

                                    {/* Worker Icons Layer (Conditional) */}
                                    {mapShowIcons && iconDetails.count > 0 && (
                                        <g transform={`translate(${district.centroid[0]}, ${district.centroid[1]})`}>
                                            {/* Pulsing ring for visual emphasis */}
                                            <motion.circle
                                                r={iconDetails.size + 4}
                                                fill={iconDetails.color}
                                                fillOpacity={0.2}
                                                className="animate-pulse"
                                                initial={{ scale: 0.5 }}
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            {/* The actual icon dot (size scales by worker count) */}
                                            <circle
                                                r={iconDetails.size}
                                                fill={iconDetails.color}
                                                className="transition-all duration-300 shadow-sm hover:scale-125"
                                            />
                                            {/* Worker Count Text (optional, for demo) */}
                                            <text
                                                fontSize="8"
                                                fill="white"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="pointer-events-none drop-shadow-md font-bold"
                                            >
                                                {(iconDetails.count / 1000).toFixed(0)}k
                                            </text>
                                        </g>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Hover Tooltip (InfoTooltip.tsx) */}
                    {hoveredDistrict && (
                        <InfoTooltip
                            data={hoveredDistrict}
                            x={mousePos.x}
                            y={mousePos.y}
                        />
                    )}
                </div>

                {/* Modal Overlay (DistrictModal.tsx) */}
                <DistrictModal
                    data={selectedDistrict}
                    onClose={() => setSelectedDistrict(null)}
                />
            </div>
        </div>
    );
}