/**
 * Demo page for Google Maps Heatmap Component
 */

"use client";

import { GoogleMapsHeatmap } from "@/components/GoogleMapsHeatmap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleMapsDistrictData } from "@/services/mock/googleMapsMockData";
import { MapPin } from "lucide-react";

export default function GoogleMapsHeatmapPage() {
  const handleDistrictSelect = (district: GoogleMapsDistrictData) => {
    console.log("Selected district:", district);
    // You can navigate to a details page or show a modal here
    alert(`Selected: ${district.name}\nWorkers: ${district.workers.toLocaleString()}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Kerala Migrant Worker Density Heatmap</CardTitle>
              <CardDescription>
                Interactive Google Maps visualization showing district-level worker density with
                origin state breakdown and health metrics
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-600 space-y-1">
            <p>• Click on any district marker or polygon to view detailed information</p>
            <p>• Use the controls panel to filter by origin state, time range, and density threshold</p>
            <p>• Toggle the heatmap layer to see density visualization</p>
          </div>
        </CardContent>
      </Card>

      {/* Map Component */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[calc(100vh-300px)] min-h-[600px]">
            <GoogleMapsHeatmap
              onDistrictSelect={handleDistrictSelect}
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

