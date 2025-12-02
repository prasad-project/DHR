"use client"

import { useState } from "react"
import { AlertTriangle, Users, CheckCircle, MoreVertical, MessageCircle, X } from "lucide-react"

export default function SehatSetuDashboard() {
  const [isBotOpen, setIsBotOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Migrant Population Overview</h1>
          <p className="text-sm text-gray-600">Real-time health monitoring across Kerala migrant camps</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">System Online</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1v10M4 8l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            Export Report
          </button>
          <button className="relative text-gray-600 hover:text-gray-900 p-2">
            <MessageCircle size={20} />
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              1
            </span>
          </button>
          <button className="text-gray-600 hover:text-gray-900 p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-18.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24"></path>
            </svg>
          </button>
          <button className="text-gray-700 hover:text-gray-900 font-medium text-sm">Logout</button>
        </div>
      </header>

      <div className="flex relative">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <Users className="text-blue-400" size={28} />
                <span className="text-green-500 text-sm font-semibold">+12.5%</span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Migrant Workers</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">48,247</p>
              <p className="text-xs text-gray-400">Registered in Kerala</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <Users className="text-purple-400" size={28} />
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">14 States</span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Workers by State</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">14</p>
              <p className="text-xs text-gray-400">Origin states tracked</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <AlertTriangle className="text-red-400" size={28} />
                <span className="text-red-500 text-sm font-semibold">Alert</span>
              </div>
              <p className="text-gray-500 text-sm mb-1">High-Risk Workers Flagged</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">1,847</p>
              <p className="text-xs text-gray-400">Require immediate attention</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <CheckCircle className="text-green-400" size={28} />
                <span className="text-green-500 text-xs font-semibold">Live</span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Active Registrations Today</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">342</p>
              <p className="text-xs text-gray-400">Updated 5 mins ago</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex gap-12">
              {/* State Overview Card */}
              <div className="w-64 flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-900 mb-6">State Overview</h3>

                {/* Total Workers */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-3">Total Workers</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">2,847,593</p>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                      👥
                    </div>
                  </div>
                </div>

                {/* High-Risk Workers */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-3">High-Risk Workers</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">487,234</p>
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                      ⚠️
                    </div>
                  </div>
                </div>

                {/* Active Cases */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-3">Active Cases</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">12,847</p>
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                      🏥
                    </div>
                  </div>
                </div>

                {/* Districts Monitored */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 font-medium mb-3">Districts Monitored</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">14</p>
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                      📊
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-gray-600 font-medium">Last updated: 2 minutes ago</p>
                </div>
              </div>

              {/* Kerala Hexagonal Map */}
              <div className="flex-1 flex items-center justify-center">
                <svg
                  viewBox="0 0 500 650"
                  className="w-full h-auto max-w-md"
                  style={{ filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))" }}
                >
                  {/* Top - Kasaragod/Kannur region - Green */}
                  <polygon
                    points="250,40 290,60 310,100 290,130 250,140 210,130 190,100 210,60"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="250"
                    y="95"
                    fontSize="16"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    145K
                  </text>

                  {/* Right Upper - Kannur/Kozhikode - Red */}
                  <polygon
                    points="330,100 370,120 390,160 370,190 330,190 310,160"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="350"
                    y="150"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    267K
                  </text>

                  {/* Left Upper - Wayanad - Green */}
                  <polygon
                    points="170,100 210,80 230,120 210,150 170,150 150,120"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="190"
                    y="120"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    78K
                  </text>

                  {/* Center Upper - Kozhikode - Yellow */}
                  <polygon
                    points="250,150 290,140 330,160 310,200 270,210 230,190"
                    fill="#fbbf24"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="280"
                    y="180"
                    fontSize="15"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    235K
                  </text>

                  {/* Left Middle - Malappuram - Red */}
                  <polygon
                    points="170,160 210,150 240,180 220,220 180,220 150,190"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="195"
                    y="190"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    312K
                  </text>

                  {/* Right Middle - Palakkad - Yellow */}
                  <polygon
                    points="330,200 370,190 400,210 390,250 350,260 310,240"
                    fill="#fbbf24"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="360"
                    y="225"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    108K
                  </text>

                  {/* Center - Thrissur - Red */}
                  <polygon
                    points="250,220 290,210 330,240 310,280 270,290 230,270"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="280"
                    y="255"
                    fontSize="15"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    388K
                  </text>

                  {/* Left Lower-Middle - Ernakulam - Green */}
                  <polygon
                    points="170,220 210,220 250,240 230,280 190,280 150,260"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="200"
                    y="250"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    64K
                  </text>

                  {/* Right Lower-Middle - Idukki - Yellow */}
                  <polygon
                    points="330,260 370,250 400,270 390,310 350,320 310,300"
                    fill="#fbbf24"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="360"
                    y="285"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    168K
                  </text>

                  {/* Center Lower-Middle - Kottayam - Green */}
                  <polygon
                    points="250,290 290,280 330,300 310,340 270,350 230,330"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="280"
                    y="315"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    97K
                  </text>

                  {/* Left Lower - Alappuzha - Yellow */}
                  <polygon
                    points="170,280 210,280 250,300 230,340 190,340 150,320"
                    fill="#fbbf24"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="205"
                    y="310"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    188K
                  </text>

                  {/* Lower Center - Pathanamthitta - Red */}
                  <polygon
                    points="250,360 290,350 330,370 310,410 270,420 230,400"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="280"
                    y="385"
                    fontSize="14"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    388K
                  </text>

                  {/* Bottom - Thiruvananthapuram - Red */}
                  <polygon
                    points="250,430 290,420 330,440 310,480 270,490 230,470"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x="280"
                    y="455"
                    fontSize="15"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    298K
                  </text>
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-12">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700 font-medium">Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span className="text-sm text-gray-700 font-medium">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-700 font-medium">High-Risk</span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Workers by Origin State - Bar Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Workers by Origin State</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {/* West Bengal */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">West Bengal</span>
                    <span className="text-sm font-bold text-gray-900">15k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>

                {/* Assam */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Assam</span>
                    <span className="text-sm font-bold text-gray-900">12k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                {/* Odisha */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Odisha</span>
                    <span className="text-sm font-bold text-gray-900">10.5k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>

                {/* Bihar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Bihar</span>
                    <span className="text-sm font-bold text-gray-900">9k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-300 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Occupation Distribution - Donut Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Occupation Distribution</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="flex items-center justify-center mb-6">
                <svg viewBox="0 0 200 200" className="w-48 h-48">
                  {/* Construction - Blue - 42% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="40"
                    strokeDasharray="211 503"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Manufacturing - Orange - 23% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="40"
                    strokeDasharray="115 503"
                    strokeDashoffset="-211"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Services - Purple - 17% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="40"
                    strokeDasharray="86 503"
                    strokeDashoffset="-326"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Hospitality - Green - 18% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="40"
                    strokeDasharray="91 503"
                    strokeDashoffset="-412"
                    transform="rotate(-90 100 100)"
                  />
                  {/* Center white circle */}
                  <circle cx="100" cy="100" r="50" fill="white" />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Construction</span>
                  <span className="text-sm font-bold text-gray-900 ml-auto">42%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Manufacturing</span>
                  <span className="text-sm font-bold text-gray-900 ml-auto">23%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Services</span>
                  <span className="text-sm font-bold text-gray-900 ml-auto">17%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Hospitality</span>
                  <span className="text-sm font-bold text-gray-900 ml-auto">18%</span>
                </div>
              </div>
            </div>

            {/* Monthly Registration Trend - Line Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Monthly Registration Trend</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-40">
                {/* Grid lines */}
                <line x1="40" y1="30" x2="380" y2="30" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="90" x2="380" y2="90" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="120" x2="380" y2="120" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="40" y1="150" x2="380" y2="150" stroke="#e5e7eb" strokeWidth="1" />

                {/* Area fill */}
                <path
                  d="M 50 135 L 80 110 L 110 85 L 140 60 L 170 50 L 200 35 L 230 50 L 260 70 L 290 85 L 320 95 L 350 105 L 370 115 L 380 150 L 40 150 Z"
                  fill="#3b82f6"
                  opacity="0.1"
                />

                {/* Line */}
                <polyline
                  points="50,135 80,110 110,85 140,60 170,50 200,35 230,50 260,70 290,85 320,95 350,105 370,115"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* X-axis labels */}
                <text x="50" y="170" fontSize="11" fill="#6b7280" textAnchor="middle">
                  Jan
                </text>
                <text x="110" y="170" fontSize="11" fill="#6b7280" textAnchor="middle">
                  Mar
                </text>
                <text x="170" y="170" fontSize="11" fill="#6b7280" textAnchor="middle">
                  May
                </text>
                <text x="230" y="170" fontSize="11" fill="#6b7280" textAnchor="middle">
                  Jul
                </text>
                <text x="290" y="170" fontSize="11" fill="#6b7280" textAnchor="middle">
                  Sep
                </text>
                <text x="350" y="170" fontSize="11" fill="#6b7280" textAnchor="middle">
                  Nov
                </text>

                {/* Y-axis labels */}
                <text x="30" y="160" fontSize="10" fill="#6b7280" textAnchor="end">
                  0
                </text>
                <text x="30" y="130" fontSize="10" fill="#6b7280" textAnchor="end">
                  1k
                </text>
                <text x="30" y="100" fontSize="10" fill="#6b7280" textAnchor="end">
                  2.5k
                </text>
                <text x="30" y="70" fontSize="10" fill="#6b7280" textAnchor="end">
                  4k
                </text>
                <text x="30" y="40" fontSize="10" fill="#6b7280" textAnchor="end">
                  5k
                </text>
              </svg>
            </div>
          </div>
        </main>

        {/* AI Chat Bot */}
        <button
          onClick={() => setIsBotOpen(!isBotOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 flex items-center justify-center transition-all z-40"
          aria-label="Toggle AI Bot"
        >
          {isBotOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>

        {isBotOpen && (
          <div className="fixed bottom-20 right-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col max-h-96 z-40">
            {/* AI Bot Header */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-t-lg p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">🤖</div>
                <div>
                  <h3 className="font-bold">SehatSetu AI GovBot</h3>
                  <p className="text-xs text-purple-100">Government Analytics Assistant</p>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Bot Message */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0">
                    🤖
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Hello! I'm your SehatSetu AI Assistant.</p>
                    <p className="text-xs text-gray-600">
                      I can help you analyze worker data, health trends, and district-wise statistics. How can I assist
                      you today?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Tabs */}
            <div className="flex gap-2 p-4 border-t border-gray-200">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium py-2 px-3 rounded-lg border border-blue-200">
                Worker stats
              </button>
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium py-2 px-3 rounded-lg border border-blue-200">
                Health alerts
              </button>
            </div>

            {/* Chat Input Section */}
            <div className="flex gap-2 p-4 border-t border-gray-200 rounded-b-lg bg-gray-50">
              <input
                type="text"
                placeholder="Ask about worker data..."
                className="flex-1 bg-white text-sm text-gray-700 placeholder-gray-400 outline-none border border-gray-300 rounded-lg px-3 py-2"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1v10M4 8l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
