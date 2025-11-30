"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Users,
  Flag,
  Activity,
  Download,
  Settings,
  Bell,
  TrendingUp,
  AlertTriangle,
  MapPin,
  User,
  RefreshCw,
  FileText,
  Calendar,
  X,
  Search,
  UserPlus,
  Package,
  Stethoscope,
  Building2,
  ArrowUp,
  Tent,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResourcePlanningPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Resource Planning & Workforce</h1>
              <p className="text-sm text-gray-600">
                Monitor hospital loads, track medicine usage, and assign health workers to high-risk camps
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Select defaultValue="today">
              <SelectTrigger className="w-32">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-1" />
              Excel
            </Button>
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src="/indian-doctor.jpg" alt="Dr. Sarah Khan" className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium">Dr. Sarah Khan</span>
            </div>
          </div>
        </header>

        {/* Critical Alerts Bar */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4 rounded-r-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-800">Critical Alerts</span>
            </div>
            <X className="h-4 w-4 text-red-600 cursor-pointer" />
          </div>
          <p className="text-sm text-red-700 mt-1">
            2 hospitals at 90% capacity • Stock critical: Dengue kits running low • 3 camps require immediate worker
            assignment
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="flex gap-6">
            {/* Main Panels */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hospital Load Monitor */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      Hospital Load Monitor
                      <RefreshCw className="h-4 w-4 text-gray-400 ml-auto cursor-pointer" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* City General Hospital */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">City General Hospital</h3>
                        <Badge className="bg-red-600 text-white">Over Capacity</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">District: Central • Patients: 347 this week</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                        <span className="text-sm font-semibold text-red-600">95% Capacity</span>
                      </div>
                    </div>

                    {/* Regional Medical Center */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Regional Medical Center</h3>
                        <Badge className="bg-yellow-600 text-white">Med-Hi</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">District: North • Patients: 159 this week</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "73%" }}></div>
                        </div>
                        <span className="text-sm font-semibold text-yellow-600">73% Capacity</span>
                      </div>
                    </div>

                    {/* Community Health Center */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Community Health Center</h3>
                        <Badge className="bg-green-600 text-white">Low Load</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">District: South • Patients: 89 this week</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm font-semibold text-green-600">45% Capacity</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medicine & Kit Usage */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Package className="h-5 w-5 text-green-600" />
                      Medicine & Kit Usage
                      <Download className="h-4 w-4 text-gray-400 ml-auto cursor-pointer" />
                      <RefreshCw className="h-4 w-4 text-gray-400 cursor-pointer" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* TB Test Kits */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">TB Test Kits</h3>
                        <Badge className="bg-red-600 text-white">Critical</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Stock Available</p>
                          <p className="font-semibold">23 units</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Usage Rate</p>
                          <p className="font-semibold">15/week</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Stock Level</p>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-red-600">15%</p>
                      </div>
                    </div>

                    {/* Malaria Rapid Tests */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Malaria Rapid Tests</h3>
                        <Badge className="bg-yellow-600 text-white">Low Stock</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Stock Available</p>
                          <p className="font-semibold">87 units</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Usage Rate</p>
                          <p className="font-semibold">22/week</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Stock Level</p>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-yellow-600">45%</p>
                      </div>
                    </div>

                    {/* Dengue Test Kits */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Dengue Test Kits</h3>
                        <Badge className="bg-green-600 text-white">Good Stock</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Stock Available</p>
                          <p className="font-semibold">156 units</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Usage Rate</p>
                          <p className="font-semibold">8/week</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Stock Level</p>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-green-600">78%</p>
                      </div>
                    </div>

                    {/* COVID-19 Rapid Tests */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">COVID-19 Rapid Tests</h3>
                        <Badge className="bg-red-600 text-white">Critical</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Stock Available</p>
                          <p className="font-semibold">12 units</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Usage Rate</p>
                          <p className="font-semibold">25/week</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Stock Level</p>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: "8%" }}></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-red-600">8%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Worker Assignment */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <UserPlus className="h-5 w-5 text-purple-600" />
                      Health Worker Assignment
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 ml-auto">
                        Assign Worker
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input placeholder="Search workers by district, role..." className="pl-10" />
                    </div>

                    {/* Camp Alpha */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Camp Alpha</h3>
                        <Badge className="bg-red-600 text-white">Urgent</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Assigned Worker:</span>
                          <span className="text-red-600 font-medium">Unassigned</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Visit:</span>
                          <span>5 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Visit:</span>
                          <span className="text-red-600">Overdue</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Population:</span>
                          <span>847 migrants</span>
                        </div>
                      </div>
                      <Button className="w-full mt-3 bg-red-600 hover:bg-red-700">Assign Worker Urgently</Button>
                    </div>

                    {/* Camp Beta */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Camp Beta</h3>
                        <Badge className="bg-green-600 text-white">Active</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Assigned Worker:</span>
                          <span className="font-medium">Dr. Ahmed Hassan</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Role:</span>
                          <span>Field Doctor</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Visit:</span>
                          <span>Yesterday</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Visit:</span>
                          <span className="text-green-600">Tomorrow</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="w-80 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Total Patients */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-600">Total Patients</span>
                      </div>
                      <ArrowUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">2,847</p>
                    <p className="text-xs text-gray-600">This Week</p>
                  </div>

                  {/* Health Workers */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600">Health Workers</span>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-2xl font-bold text-green-600">156</p>
                    <p className="text-xs text-gray-600">On Duty</p>
                  </div>

                  {/* Critical Kits */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-red-600" />
                        <span className="text-sm text-gray-600">Critical Kits</span>
                      </div>
                      <Flag className="h-4 w-4 text-red-600" />
                    </div>
                    <p className="text-2xl font-bold text-red-600">23</p>
                    <p className="text-xs text-gray-600">Remaining</p>
                  </div>

                  {/* High-Risk Camps */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Tent className="h-5 w-5 text-purple-600" />
                        <span className="text-sm text-gray-600">High-Risk Camps</span>
                      </div>
                      <AlertTriangle className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                    <p className="text-xs text-gray-600">Monitored</p>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Health Camps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    Upcoming Health Camps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Camp Delta - TB Screening</p>
                      <p className="text-xs text-gray-600">Tomorrow, 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Camp Gamma - Vaccination</p>
                      <p className="text-xs text-gray-600">Jan 24, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Camp Beta - General Health</p>
                      <p className="text-xs text-gray-600">Jan 25, 8:00 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </div>
  )
}
