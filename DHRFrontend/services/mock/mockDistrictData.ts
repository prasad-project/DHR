export interface DistrictData {
    id: string;
    name: string;
    path: string; // Real SVG Path
    centroid: [number, number]; // [x, y] for icon placement
    workers: number;
    riskScore: number;
    density: "Low" | "Medium" | "High";
    originBreakdown: {
        Odisha: number;
        WB: number;
        Bihar: number;
        Assam: number;
    };
}

export const mockDistricts: DistrictData[] = [
    // NORTH KERALA
    {
        id: "kasaragod", name: "Kasaragod",
        // Top-most tip
        path: "M 80 10 L 120 20 L 110 50 L 70 40 Z",
        centroid: [95, 30],
        workers: 12500, riskScore: 4, density: "Low",
        originBreakdown: { Odisha: 5000, WB: 3000, Bihar: 2000, Assam: 2500 }
    },
    {
        id: "kannur", name: "Kannur",
        path: "M 70 40 L 110 50 L 130 90 L 80 100 L 60 70 Z",
        centroid: [95, 70],
        workers: 28000, riskScore: 7, density: "High",
        originBreakdown: { Odisha: 10000, WB: 8000, Bihar: 5000, Assam: 5000 }
    },
    {
        id: "wayanad", name: "Wayanad",
        // Hilly region to the east
        path: "M 130 90 L 170 80 L 180 120 L 140 130 Z",
        centroid: [155, 105],
        workers: 15000, riskScore: 3, density: "Medium",
        originBreakdown: { Odisha: 6000, WB: 4000, Bihar: 3000, Assam: 2000 }
    },
    {
        id: "kozhikode", name: "Kozhikode",
        path: "M 80 100 L 140 130 L 130 170 L 70 150 Z",
        centroid: [105, 135],
        workers: 45000, riskScore: 8, density: "High",
        originBreakdown: { Odisha: 20000, WB: 10000, Bihar: 10000, Assam: 5000 }
    },
    {
        id: "malappuram", name: "Malappuram",
        path: "M 70 150 L 130 170 L 140 210 L 80 200 Z",
        centroid: [105, 180],
        workers: 38000, riskScore: 6, density: "High",
        originBreakdown: { Odisha: 15000, WB: 10000, Bihar: 8000, Assam: 5000 }
    },

    // CENTRAL KERALA
    {
        id: "palakkad", name: "Palakkad",
        // Large gap to the east
        path: "M 140 210 L 200 200 L 210 250 L 150 260 Z",
        centroid: [175, 230],
        workers: 32000, riskScore: 5, density: "Medium",
        originBreakdown: { Odisha: 12000, WB: 8000, Bihar: 8000, Assam: 4000 }
    },
    {
        id: "thrissur", name: "Thrissur",
        path: "M 80 200 L 150 260 L 140 300 L 70 280 Z",
        centroid: [110, 250],
        workers: 41000, riskScore: 8, density: "High",
        originBreakdown: { Odisha: 18000, WB: 10000, Bihar: 8000, Assam: 5000 }
    },
    {
        id: "ernakulam", name: "Ernakulam",
        path: "M 70 280 L 140 300 L 130 350 L 60 330 Z",
        centroid: [100, 315],
        workers: 65000, riskScore: 9, density: "High",
        originBreakdown: { Odisha: 30000, WB: 15000, Bihar: 12000, Assam: 8000 }
    },
    {
        id: "idukki", name: "Idukki",
        // Large eastern district
        path: "M 140 300 L 200 290 L 210 360 L 150 370 Z",
        centroid: [175, 330],
        workers: 22000, riskScore: 4, density: "Low",
        originBreakdown: { Odisha: 8000, WB: 6000, Bihar: 5000, Assam: 3000 }
    },

    // SOUTH KERALA
    {
        id: "kottayam", name: "Kottayam",
        path: "M 130 350 L 150 370 L 140 400 L 110 380 Z",
        centroid: [130, 375],
        workers: 28000, riskScore: 5, density: "Medium",
        originBreakdown: { Odisha: 10000, WB: 8000, Bihar: 6000, Assam: 4000 }
    },
    {
        id: "alappuzha", name: "Alappuzha",
        // Coastal strip
        path: "M 60 330 L 110 380 L 100 420 L 50 400 Z",
        centroid: [80, 370],
        workers: 25000, riskScore: 6, density: "Medium",
        originBreakdown: { Odisha: 9000, WB: 7000, Bihar: 5000, Assam: 4000 }
    },
    {
        id: "pathanamthitta", name: "Pathanamthitta",
        path: "M 140 400 L 190 390 L 180 430 L 130 440 Z",
        centroid: [160, 415],
        workers: 18000, riskScore: 3, density: "Low",
        originBreakdown: { Odisha: 7000, WB: 5000, Bihar: 4000, Assam: 2000 }
    },
    {
        id: "kollam", name: "Kollam",
        path: "M 50 400 L 130 440 L 120 480 L 60 460 Z",
        centroid: [90, 440],
        workers: 35000, riskScore: 6, density: "High",
        originBreakdown: { Odisha: 14000, WB: 9000, Bihar: 7000, Assam: 5000 }
    },
    {
        id: "trivandrum", name: "Thiruvananthapuram",
        // Southern tip
        path: "M 60 460 L 120 480 L 110 520 L 70 510 Z",
        centroid: [90, 490],
        workers: 55000, riskScore: 8, density: "High",
        originBreakdown: { Odisha: 25000, WB: 12000, Bihar: 10000, Assam: 8000 }
    }
];
