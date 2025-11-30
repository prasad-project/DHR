// /app/dashboard/govt/high-risk-camps/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Users,
  Activity,
  Search,
  Filter,
  Grid,
  List,
  Syringe,
} from "lucide-react"

export default function HighRiskCampsPage() {
  return (
    <div className="space-y-8">
      
      {/* ------------------------------------------------------------- */}
      {/* Status Overview (Kept for visual summary) */}
      <div className="flex items-center gap-4 flex-wrap pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-red-700">High Risk: 7 camps</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm font-medium text-yellow-700">Monitor: 12 camps</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Safe: 31 camps</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Stats Cards (Added hover/transition animations) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Camps */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Camps</p>
                <p className="text-3xl font-extrabold text-blue-600">50</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600">2 new this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Population */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Population</p>
                <p className="text-3xl font-extrabold text-green-600">18.4K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600">3.2% increase</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Cases */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Cases</p>
                <p className="text-3xl font-extrabold text-red-600">234</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                  <span className="text-xs text-red-600">12% increase this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vaccination Rate */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vaccination Rate</p>
                <p className="text-3xl font-extrabold text-yellow-600">78%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600">5% improvement</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Syringe className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Critical Health Alerts (Added subtle box-shadow for urgency) */}
      <Card className="shadow-lg shadow-red-200/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
              <CardTitle className="text-xl font-bold text-gray-900">Critical Health Alerts</CardTitle>
            </div>
            <span className="text-md font-extrabold text-red-600">5 Active</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Alert Card 1 (TB) */}
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Kochi Industrial Camp A</h3>
                  <Badge className="bg-red-600 text-white text-xs">URGENT</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-red-500" />
                      <span>TB Outbreak</span>
                    </div>
                    <span className="font-bold text-red-600">23 cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Population: 450</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Card 2 (Dengue) */}
            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Thrissur Construction Hub</h3>
                  <Badge className="bg-orange-600 text-white text-xs">CRITICAL</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-orange-500" />
                      <span>Dengue Outbreak</span>
                    </div>
                    <span className="font-bold text-orange-600">18 cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Population: 320</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Card 3 (Malaria) */}
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Kollam Port Workers</h3>
                  <Badge className="bg-red-600 text-white text-xs">URGENT</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-red-500" />
                      <span>Malaria Outbreak</span>
                    </div>
                    <span className="font-bold text-red-600">15 cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Population: 280</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------- */}
      {/* Filters and Controls (Added focus styles) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {/* Enhanced input focus style */}
            <Input 
                placeholder="Search camps..." 
                className="pl-10 w-full sm:w-64 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200" 
            />
          </div>
          {/* Select components remain, but look cleaner */}
          <Select>
            <SelectTrigger className="w-full sm:w-40 focus:ring-green-500">
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="kochi">Kochi</SelectItem>
              <SelectItem value="thrissur">Thrissur</SelectItem>
              <SelectItem value="kollam">Kollam</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-40 focus:ring-green-500">
              <SelectValue placeholder="All Risk Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="monitor">Monitor</SelectItem>
              <SelectItem value="safe">Safe</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-1" />
            More Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-400 transition-colors">
            <Grid className="h-4 w-4 text-green-600" />
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-gray-50 transition-colors">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Dashboard Visuals (Simplified and styled placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Kerala Camp Distribution Map */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Camp Distribution Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-72 bg-blue-50 rounded-lg border-4 border-dashed border-blue-200 flex items-center justify-center animate-pulse-slow">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-700 font-bold">Interactive Kerala Map (Placeholder)</p>
                <p className="text-blue-500 text-sm">Pinpoint risk zones live.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Analytics Dashboard */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Health Analytics</CardTitle>
              <Select>
                <SelectTrigger className="w-full sm:w-32 focus:ring-green-500">
                  <SelectValue placeholder="Last 30 Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Disease Distribution (Pie Chart) */}
              <div className="text-center">
                <h4 className="font-semibold mb-4 text-gray-700">Disease Distribution</h4>
                <div className="relative w-32 h-32 mx-auto">
                  {/* Tailwind doesn't do pie charts easily, so we use a styled circle */}
                  <div className="w-full h-full rounded-full border-[10px] border-red-500 border-t-[10px] border-orange-500 border-r-[10px] border-green-500 border-b-[10px] border-gray-200 shadow-md"></div>
                </div>
                <div className="mt-4 space-y-1 text-xs text-left inline-block">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div><span>TB (45%)</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div><span>Dengue (30%)</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div><span>Malaria (20%)</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div><span>Other (5%)</span></div>
                </div>
              </div>

              {/* Risk Level Distribution (Center Stat) */}
              <div className="text-center">
                <h4 className="font-semibold mb-4 text-gray-700">High-Risk Share</h4>
                <div className="relative w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center ring-4 ring-red-200 shadow-inner">
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-red-600">14%</div>
                    <div className="text-xs text-gray-600 font-medium">Of All Camps</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-red-600 font-semibold">
                    Immediate Action Required
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Camp Health Status (Added hover/transition animations) */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Detailed Camp Health Status</CardTitle>
            <Select>
              <SelectTrigger className="w-40 focus:ring-green-500">
                <SelectValue placeholder="Sort by Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="risk">Risk Level</SelectItem>
                <SelectItem value="population">Population</SelectItem>
                <SelectItem value="cases">Active Cases</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Camp Card 1: High Risk */}
            <Card className="border-l-4 border-l-red-500 transition-all duration-300 hover:shadow-lg hover:border-red-600 cursor-pointer">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-base text-gray-900">Kochi Industrial Camp A</h3>
                  <Badge className="bg-red-500 text-white text-xs">High Risk</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /><span>District</span></div>
                    <span className="font-semibold">Kochi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-gray-500" /><span>Population</span></div>
                    <span className="font-semibold">450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-red-500" /><span>TB Cases</span></div>
                    <span className="font-bold text-red-600">23</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Vaccination</span>
                    <span className="text-red-600">65% (Urgent)</span>
                  </div>
                  <div className="w-full bg-red-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camp Card 2: Monitor */}
            <Card className="border-l-4 border-l-yellow-500 transition-all duration-300 hover:shadow-lg hover:border-yellow-600 cursor-pointer">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-base text-gray-900">Thrissur Construction Hub</h3>
                  <Badge className="bg-yellow-500 text-white text-xs">Monitor</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /><span>District</span></div>
                    <span className="font-semibold">Thrissur</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-gray-500" /><span>Population</span></div>
                    <span className="font-semibold">320</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-orange-500" /><span>Dengue Cases</span></div>
                    <span className="font-bold text-orange-600">8</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Vaccination</span>
                    <span className="text-yellow-700">72% (Needs Boost)</span>
                  </div>
                  <div className="w-full bg-yellow-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camp Card 3: Safe */}
            <Card className="border-l-4 border-l-green-500 transition-all duration-300 hover:shadow-lg hover:border-green-600 cursor-pointer">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-base text-gray-900">Kollam Port Workers</h3>
                  <Badge className="bg-green-500 text-white text-xs">Safe</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /><span>District</span></div>
                    <span className="font-semibold">Kollam</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-gray-500" /><span>Population</span></div>
                    <span className="font-semibold">280</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span>Active Cases</span></div>
                    <span className="font-bold text-green-600">0</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Vaccination</span>
                    <span className="text-green-600">95% (Excellent)</span>
                  </div>
                  <div className="w-full bg-green-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}