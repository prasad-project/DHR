# Google Maps Heatmap Component

A comprehensive React component for displaying Kerala district-level migrant worker density heatmap using Google Maps API.

## Features

- 🗺️ Interactive Google Maps visualization
- 🔥 Heatmap layer with density-based color gradients
- 📊 District polygons with hover effects
- 📍 Custom markers with density indicators
- 📈 Animated pie charts showing origin state breakdown
- 🎛️ Filter controls (origin state, time range, density threshold)
- 📱 Mobile-responsive design
- ⚡ Backend-ready service layer

## Installation

The component requires `@react-google-maps/api` which should already be installed. If not:

```bash
npm install @react-google-maps/api
```

## Setup

1. **Get Google Maps API Key**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable "Maps JavaScript API"
   - Create credentials (API Key)
   - Restrict the API key to your domain for security

2. **Configure Environment Variables**
   
   Create a `.env.local` file in the root of `DHRFrontend`:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   NEXT_PUBLIC_USE_MOCK_DATA=true
   ```

3. **Usage Example**

```tsx
import { GoogleMapsHeatmap } from "@/components/GoogleMapsHeatmap";

export default function MapPage() {
  const handleDistrictSelect = (district) => {
    console.log("Selected district:", district);
    // Navigate to district details page or show modal
  };

  return (
    <div className="h-screen w-full p-4">
      <GoogleMapsHeatmap
        onDistrictSelect={handleDistrictSelect}
        className="rounded-lg"
      />
    </div>
  );
}
```

## Component Props

### GoogleMapsHeatmap

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `GoogleMapsDistrictData[]` | `undefined` | Optional external data. If not provided, uses `useDistrictData` hook |
| `onDistrictSelect` | `(district: GoogleMapsDistrictData) => void` | `undefined` | Callback when a district is selected |
| `className` | `string` | `""` | Additional CSS classes |

## Data Structure

```typescript
interface GoogleMapsDistrictData {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  bounds: Array<{ lat: number; lng: number }>; // Polygon coordinates
  workers: number;
  density: "very-low" | "low" | "medium" | "high";
  trend: "up" | "down" | "stable";
  originBreakdown: {
    Odisha: number;
    Bihar: number;
    WB: number;
    Assam: number;
  };
  healthMetrics: {
    healthCheckRate: number;
    awaazCoverage: number;
    activeCases: number;
  };
}
```

## Features Breakdown

### 1. Map Visualization
- Kerala centered at coordinates [10.8505, 76.2711]
- Zoom level 7 for optimal view
- District boundaries as polygons
- Custom styled markers at district centers

### 2. Heatmap Layer
- Color gradient based on worker density:
  - 🔴 Red: > 40,000 workers (High)
  - 🟠 Orange: 20,000-40,000 workers (Medium)
  - 🟡 Yellow: 10,000-20,000 workers (Low)
  - 🟢 Green: < 10,000 workers (Very Low)
- Opacity indicates density intensity

### 3. Interactive Elements
- **Hover**: District border highlights and thickens
- **Click**: Opens InfoWindow with:
  - District name and total workers
  - Trend indicator (↑/↓)
  - Animated pie chart (origin breakdown)
  - Health metrics
  - Action buttons

### 4. Controls Panel
- Toggle heatmap on/off
- Filter by origin state (Odisha/Bihar/WB/Assam/All)
- Time range selector (30/90 days/1 year)
- Density threshold slider
- Export map as PNG button

### 5. Animations
- Pie chart segments animate from 0% to actual value
- Marker bounce when district selected
- Smooth color transitions on filter changes
- Loading states with spinners

## Backend Integration

The component is designed to work with mock data initially, but can easily switch to real backend:

1. **Update Environment Variable**
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=false
   NEXT_PUBLIC_API_BASE_URL=https://your-api.com
   ```

2. **Backend Endpoints Expected**
   - `GET /api/districts/heatmap` - Returns array of district data
   - `GET /api/districts/:id` - Returns single district real-time data

3. **Data Format**
   The backend should return data matching the `GoogleMapsDistrictData` interface.

## File Structure

```
components/GoogleMapsHeatmap/
├── GoogleMapsHeatmap.tsx    # Main component
├── DistrictPolygon.tsx       # District boundary overlay
├── DistrictInfoWindow.tsx    # Info popup with charts
├── MapControls.tsx           # Sidebar controls
└── index.ts                  # Exports

services/
├── mapService.ts             # Data fetching/processing
├── googleMapsService.ts      # Google Maps API wrapper
└── mock/
    └── googleMapsMockData.ts  # Mock district data

hooks/
├── useGoogleMaps.ts          # Google Maps loading hook
└── useDistrictData.ts        # District data management hook

utils/
├── colorUtils.ts             # Density color mapping
├── mapUtils.ts               # Coordinate calculations
└── animationUtils.ts          # Animation helpers
```

## Troubleshooting

### Map Not Loading
- Check if API key is set in `.env.local`
- Verify API key has "Maps JavaScript API" enabled
- Check browser console for errors
- Ensure API key restrictions allow your domain

### No Data Showing
- Check if `NEXT_PUBLIC_USE_MOCK_DATA=true` is set
- Verify backend endpoint if using real data
- Check browser console for API errors

### Performance Issues
- Reduce number of districts if needed
- Adjust heatmap point density in `mapService.ts`
- Use React.memo for expensive components

## Security Notes

- ⚠️ Never commit `.env.local` with real API keys
- ✅ Restrict Google Maps API key to specific domains
- ✅ Use environment variables for all sensitive data
- ✅ Validate and sanitize all user inputs

## License

Part of the DHR (Digital Health Records) project.

