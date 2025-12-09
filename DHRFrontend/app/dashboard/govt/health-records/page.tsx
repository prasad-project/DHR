"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useMemo } from "react"
import {
  Users,
  AlertCircle,
  MapPin,
  User,
  Search,
  Filter,
  Phone,
  Mail,
  Home,
  Briefcase,
  Droplets,
  ShieldCheck,
  Eye,
  Globe,
  Download,
  Building,
  Factory,
  Ship,
  Trees,
  Heart,
  Stethoscope,
  Pill,
  Syringe,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Activity,
  Map,
  PieChart,
  BarChart3,
  List,
  Grid3x3,
  X,
  Plus,
  MoreVertical,
  ExternalLink
} from "lucide-react"

// --- Interface & Data ---
interface EnhancedPatientRecord {
  health_id: string
  patient_id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  origin_state: string
  origin_city: string
  current_state: string
  current_city: string
  current_address: string
  workplace: 'Construction' | 'Factory' | 'Fishing' | 'Farming' | 'Other'
  blood_group: string
  emergency_contact_name: string
  emergency_contact_phone: string
  is_verified: boolean
  status: 'Healthy' | 'Treatment' | 'High Risk'
  diseases: string
  medication: string
  vaccination: number
}

const ENHANCED_RECORDS: EnhancedPatientRecord[] = [
  { health_id: "ABHA-1234567890", patient_id: "MW-001", name: "Ramesh Kumar", age: 34, gender: "Male", phone: "+91 98765 43210", email: "ramesh.k@example.com", origin_state: "Bihar", origin_city: "Patna", current_state: "Kerala", current_city: "Kochi", current_address: "Construction Site, Ernakulam", workplace: "Construction", blood_group: "O+", emergency_contact_name: "Priya Kumar", emergency_contact_phone: "+91 98765 43211", is_verified: true, status: "Healthy", diseases: "No active diseases", medication: "No prescriptions", vaccination: 100 },
  { health_id: "ABHA-0987654321", patient_id: "MW-002", name: "Sunita Devi", age: 28, gender: "Female", phone: "+91 98765 43212", email: "sunita.d@example.com", origin_state: "Uttar Pradesh", origin_city: "Lucknow", current_state: "Kerala", current_city: "Kozhikode", current_address: "Textile Factory, Calicut", workplace: "Factory", blood_group: "A+", emergency_contact_name: "Rahul Singh", emergency_contact_phone: "+91 98765 43213", is_verified: true, status: "Treatment", diseases: "Tuberculosis", medication: "Rifampin 600mg", vaccination: 75 },
  { health_id: "ABHA-1122334455", patient_id: "MW-003", name: "Abdul Rahman", age: 45, gender: "Male", phone: "+91 98765 43214", email: "abdul.r@example.com", origin_state: "West Bengal", origin_city: "Kolkata", current_state: "Kerala", current_city: "Alappuzha", current_address: "Fishing Harbor, Alappuzha", workplace: "Fishing", blood_group: "B+", emergency_contact_name: "Fatima Begum", emergency_contact_phone: "+91 98765 43215", is_verified: false, status: "High Risk", diseases: "Dengue + Malaria", medication: "Paracetamol 500mg", vaccination: 45 },
  { health_id: "ABHA-5566778899", patient_id: "MW-004", name: "Priya Meena", age: 31, gender: "Female", phone: "+91 98765 43216", email: "priya.m@example.com", origin_state: "Rajasthan", origin_city: "Jaipur", current_state: "Kerala", current_city: "Thrissur", current_address: "Farm House, Thrissur", workplace: "Farming", blood_group: "AB+", emergency_contact_name: "Rajesh Meena", emergency_contact_phone: "+91 98765 43217", is_verified: true, status: "Healthy", diseases: "No active diseases", medication: "Vitamin D3 1000IU", vaccination: 100 },
  { health_id: "ABHA-6677889900", patient_id: "MW-005", name: "Suresh Patel", age: 42, gender: "Male", phone: "+91 98765 43218", email: "suresh.p@example.com", origin_state: "Odisha", origin_city: "Bhubaneswar", current_state: "Kerala", current_city: "Thiruvananthapuram", current_address: "Construction Site, Kazhakootam", workplace: "Construction", blood_group: "O-", emergency_contact_name: "Meena Patel", emergency_contact_phone: "+91 98765 43219", is_verified: false, status: "Treatment", diseases: "Respiratory Infection", medication: "Amoxicillin 500mg", vaccination: 60 },
]

const getWorkplaceIcon = (workplace: string) => {
  switch(workplace) {
    case 'Construction': return <Building className="h-4 w-4" />
    case 'Factory': return <Factory className="h-4 w-4" />
    case 'Fishing': return <Ship className="h-4 w-4" />
    case 'Farming': return <Trees className="h-4 w-4" />
    default: return <Briefcase className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Healthy': return "bg-emerald-500"
    case 'Treatment': return "bg-amber-500"
    case 'High Risk': return "bg-rose-500"
    default: return "bg-gray-500"
  }
}

export default function HealthRegistryDashboard() {
  // --- State Management ---
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<EnhancedPatientRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterOrigin, setFilterOrigin] = useState("all")
  const [filterWorkplace, setFilterWorkplace] = useState("all")
  const [filterBloodGroup, setFilterBloodGroup] = useState("all")
  const [filterVerification, setFilterVerification] = useState("all")

  // --- Statistics Calculation ---
  const stats = useMemo(() => {
    const total = ENHANCED_RECORDS.length
    const verified = ENHANCED_RECORDS.filter(r => r.is_verified).length
    const verifiedPercentage = Math.round((verified / total) * 100)
    
    const originMap: Record<string, number> = {}
    const workplaceMap: Record<string, number> = {}
    const bloodGroupMap: Record<string, number> = {}
    
    ENHANCED_RECORDS.forEach(r => {
      originMap[r.origin_state] = (originMap[r.origin_state] || 0) + 1
      workplaceMap[r.workplace] = (workplaceMap[r.workplace] || 0) + 1
      bloodGroupMap[r.blood_group] = (bloodGroupMap[r.blood_group] || 0) + 1
    })
    
    const topOrigin = Object.entries(originMap).sort((a, b) => b[1] - a[1]).slice(0, 3)
    const withEmergency = ENHANCED_RECORDS.filter(r => r.emergency_contact_phone).length
    
    return {
      total,
      verified,
      verifiedPercentage,
      topOrigin,
      workplaceMap,
      bloodGroupMap,
      withEmergency,
      emergencyPercentage: Math.round((withEmergency / total) * 100)
    }
  }, [])

  // --- Filtered Records ---
  const filteredRecords = useMemo(() => {
    return ENHANCED_RECORDS.filter(record => {
      if (searchTerm && 
          !record.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !record.patient_id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (filterStatus !== 'all' && record.status !== filterStatus) return false
      if (filterOrigin !== 'all' && record.origin_state !== filterOrigin) return false
      if (filterWorkplace !== 'all' && record.workplace !== filterWorkplace) return false
      if (filterBloodGroup !== 'all' && record.blood_group !== filterBloodGroup) return false
      if (filterVerification !== 'all') {
        if (filterVerification === 'verified' && !record.is_verified) return false
        if (filterVerification === 'unverified' && record.is_verified) return false
      }
      if (showEmergencyOnly && !record.emergency_contact_phone) return false
      return true
    })
  }, [searchTerm, filterStatus, filterOrigin, filterWorkplace, filterBloodGroup, filterVerification, showEmergencyOnly])

  const clearFilters = () => {
    setSearchTerm("")
    setFilterStatus("all")
    setFilterOrigin("all")
    setFilterWorkplace("all")
    setFilterBloodGroup("all")
    setFilterVerification("all")
    setShowEmergencyOnly(false)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Main Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Migrant Health Registry</h1>
                <p className="text-slate-600 mt-1">Track and manage migrant worker health records across Kerala</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Worker
                </Button>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              System Live • Last updated: Today 14:30
            </div>
          </div>

          {/* Three Column Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Statistics */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Stats Cards */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Quick Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">Total Registered</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-600">+234 this month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">Verified IDs</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stats.verifiedPercentage}%</p>
                      <Progress value={stats.verifiedPercentage} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">Emergency Contacts</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stats.withEmergency}</p>
                      <span className="text-sm text-slate-500">of {stats.total} workers</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">High Risk</span>
                      </div>
                      <p className="text-2xl font-bold text-rose-600">342</p>
                      <span className="text-sm text-slate-500">requires attention</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Origin States */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Top Origin States
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topOrigin.map(([state, count], index) => (
                      <div key={state} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0 ? 'bg-blue-100 text-blue-700' :
                              index === 1 ? 'bg-slate-100 text-slate-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              <span className="font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{state}</p>
                              <p className="text-sm text-slate-500">{count} workers</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="font-medium">
                            {Math.round((count / stats.total) * 100)}%
                          </Badge>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-slate-500' :
                              'bg-amber-500'
                            }`}
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Column: Records & Filters */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                          placeholder="Search by name or ID..." 
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant={viewMode === 'grid' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setViewMode('grid')}
                        >
                          <Grid3x3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={viewMode === 'list' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setViewMode('list')}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Filter Row */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Filters:</span>
                      </div>
                      
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Healthy">Healthy</SelectItem>
                          <SelectItem value="Treatment">Treatment</SelectItem>
                          <SelectItem value="High Risk">High Risk</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filterOrigin} onValueChange={setFilterOrigin}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Origin State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All States</SelectItem>
                          {Array.from(new Set(ENHANCED_RECORDS.map(r => r.origin_state))).map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={filterBloodGroup} onValueChange={setFilterBloodGroup}>
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Blood Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Blood Groups</SelectItem>
                          {Array.from(new Set(ENHANCED_RECORDS.map(r => r.blood_group))).map(blood => (
                            <SelectItem key={blood} value={blood}>{blood}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                        <Switch
                          checked={showEmergencyOnly}
                          onCheckedChange={setShowEmergencyOnly}
                        />
                        <span className="text-sm font-medium">Emergency Contact</span>
                      </div>

                      {searchTerm || filterStatus !== 'all' || filterOrigin !== 'all' || filterBloodGroup !== 'all' || showEmergencyOnly ? (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-600">
                          <X className="h-4 w-4 mr-1" />
                          Clear All
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Records Count & View */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Patient Records</h2>
                  <p className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-blue-600">{filteredRecords.length}</span> of {ENHANCED_RECORDS.length} records
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verified Only
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    <Calendar className="h-3 w-3 mr-1" />
                    Updated Today
                  </Badge>
                </div>
              </div>

              {/* Records Display */}
              {filteredRecords.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-700 mb-2">No records found</h3>
                    <p className="text-slate-500 mb-4">Try adjusting your search or filters</p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : viewMode === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRecords.map((record) => (
                    <Card key={record.patient_id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-slate-200">
                              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                                {record.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-slate-900">{record.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {record.patient_id}
                                </Badge>
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(record.status)}`} />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {record.is_verified ? (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-600 border-amber-200">
                                Unverified
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Key Information */}
                        <div className="space-y-3 mb-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin className="h-3 w-3" />
                                <span>From</span>
                              </div>
                              <p className="font-medium text-slate-900">{record.origin_city}, {record.origin_state}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Briefcase className="h-3 w-3" />
                                <span>Works in</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getWorkplaceIcon(record.workplace)}
                                <span className="font-medium">{record.workplace}</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Droplets className="h-3 w-3" />
                                <span>Blood Group</span>
                              </div>
                              <Badge className={`font-bold ${
                                record.blood_group.includes('+') 
                                  ? 'bg-red-100 text-red-700 border-red-200' 
                                  : 'bg-blue-100 text-blue-700 border-blue-200'
                              }`}>
                                {record.blood_group}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone className="h-3 w-3" />
                                <span>Emergency</span>
                              </div>
                              <p className={`text-sm font-medium ${record.emergency_contact_phone ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {record.emergency_contact_phone ? 'Available ✓' : 'Not Set ✗'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Health Status Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(record.status)}`} />
                              <span className="text-sm font-medium">{record.status}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Syringe className="h-3 w-3 text-slate-400" />
                              <span className="text-sm font-medium">{record.vaccination}%</span>
                            </div>
                          </div>
                          <Progress value={record.vaccination} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                // List View
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-slate-50">
                            <th className="text-left p-4 font-medium text-slate-600">Worker</th>
                            <th className="text-left p-4 font-medium text-slate-600">Origin</th>
                            <th className="text-left p-4 font-medium text-slate-600">Workplace</th>
                            <th className="text-left p-4 font-medium text-slate-600">Blood Group</th>
                            <th className="text-left p-4 font-medium text-slate-600">Status</th>
                            <th className="text-left p-4 font-medium text-slate-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRecords.map((record) => (
                            <tr key={record.patient_id} className="border-b hover:bg-slate-50">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                                      {record.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-slate-900">{record.name}</p>
                                    <p className="text-sm text-slate-500">{record.patient_id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="space-y-1">
                                  <p className="font-medium">{record.origin_city}</p>
                                  <p className="text-sm text-slate-500">{record.origin_state}</p>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {getWorkplaceIcon(record.workplace)}
                                  <span>{record.workplace}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge className={`font-medium ${
                                  record.blood_group.includes('+') 
                                    ? 'bg-red-100 text-red-700 border-red-200' 
                                    : 'bg-blue-100 text-blue-700 border-blue-200'
                                }`}>
                                  {record.blood_group}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${getStatusColor(record.status)}`} />
                                  <span>{record.status}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}