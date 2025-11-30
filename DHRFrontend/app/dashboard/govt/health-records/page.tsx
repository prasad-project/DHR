"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
// Import useMemo and useCallback for performance optimization (good developer habit!)
import { useState, useEffect, useMemo, useCallback } from "react"
import {
  Users,
  Heart,
  Flag,
  Activity,
  Download,
  // Settings, // Not used in this version
  TrendingUp,
  AlertTriangle,
  MapPin,
  User,
  ArrowLeft,
  Search,
  Grid3X3,
  List,
  Filter,
  UserPlus,
  Calendar,
  FileText,
  Syringe,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown, // Added for sorting icon
} from "lucide-react"
import { useRouter } from "next/navigation"

// --- Interface for type safety ---
interface PatientRecord {
  id: string
  age: number
  location: string
  status: 'Healthy' | 'Treatment' | 'High Risk'
  statusColor: string
  diseases: string
  medication: string
  vaccination: number
  vaccinationColor: string
}

// --- Dummy Data (Kept as is for functionality) ---
const DUMMY_RECORDS: PatientRecord[] = [
  {
    id: "MW-001",
    age: 34,
    location: "Bihar",
    status: "Healthy",
    statusColor: "bg-green-100 text-green-800",
    diseases: "No active diseases",
    medication: "No prescriptions",
    vaccination: 100,
    vaccinationColor: "bg-green-500",
  },
  {
    id: "MW-002",
    age: 28,
    location: "Uttar Pradesh",
    status: "Treatment",
    statusColor: "bg-orange-100 text-orange-800",
    diseases: "Tuberculosis",
    medication: "Rifampin 600mg",
    vaccination: 75,
    vaccinationColor: "bg-orange-500",
  },
  {
    id: "MW-003",
    age: 45,
    location: "West Bengal",
    status: "High Risk",
    statusColor: "bg-red-100 text-red-800",
    diseases: "Dengue + Malaria",
    medication: "Paracetamol 500mg",
    vaccination: 45,
    vaccinationColor: "bg-red-500",
  },
  {
    id: "MW-004",
    age: 31,
    location: "Rajasthan",
    status: "Healthy",
    statusColor: "bg-green-100 text-green-800",
    diseases: "No active diseases",
    medication: "Vitamin D3 1000IU",
    vaccination: 100,
    vaccinationColor: "bg-green-500",
  },
  {
    id: "MW-005",
    age: 39,
    location: "Odisha",
    status: "Treatment",
    statusColor: "bg-orange-100 text-orange-800",
    diseases: "Respiratory Infection",
    medication: "Azithromycin 250mg",
    vaccination: 85,
    vaccinationColor: "bg-orange-500",
  },
  {
    id: "MW-006",
    age: 26,
    location: "Jharkhand",
    status: "Healthy",
    statusColor: "bg-green-100 text-green-800",
    diseases: "No active diseases",
    medication: "No prescriptions",
    vaccination: 100,
    vaccinationColor: "bg-green-500",
  },
  {
    id: "MW-007",
    age: 52,
    location: "Chhattisgarh",
    status: "High Risk",
    statusColor: "bg-red-100 text-red-800",
    diseases: "TB + COVID-19",
    medication: "Isoniazid 300mg",
    vaccination: 30,
    vaccinationColor: "bg-red-500",
  },
  {
    id: "MW-008",
    age: 37,
    location: "Madhya Pradesh",
    status: "Treatment",
    statusColor: "bg-orange-100 text-orange-800",
    diseases: "Malaria",
    medication: "Artemether 80mg",
    vaccination: 65,
    vaccinationColor: "bg-orange-500",
  },
]

export default function HealthRecordsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // --- NEW STATE FOR SEARCH, FILTER, AND SORT ---
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all") // 'all', 'Healthy', 'Treatment', 'High Risk'
  const [filterDisease, setFilterDisease] = useState("all") // e.g., 'all', 'tb', 'dengue'
  const [filterVaccination, setFilterVaccination] = useState("all") // 'all', 'complete', 'partial', 'none'
  const [sortBy, setSortBy] = useState("id") // 'id', 'age', 'vaccination'
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = useCallback((path: string) => {
    try {
      router.push(path)
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }, [router])
  
  // --- CORE INTERACTION LOGIC: Filtering and Sorting ---
  const filteredAndSortedRecords = useMemo(() => {
    let records = DUMMY_RECORDS

    // 1. SEARCH LOGIC
    if (searchTerm) {
      records = records.filter(record =>
        record.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 2. FILTER LOGIC
    records = records.filter(record => {
      // Filter by Status
      if (filterStatus !== 'all' && record.status !== filterStatus) {
        return false
      }
      // Filter by Disease (Simple contains check for multi-disease entries)
      if (filterDisease !== 'all') {
        // Simple case-insensitive check
        const diseaseMatch = filterDisease === 'tb' ? 'tb' : filterDisease
        if (!record.diseases.toLowerCase().includes(diseaseMatch)) {
          return false
        }
      }
      // Filter by Vaccination Status
      if (filterVaccination !== 'all') {
        if (filterVaccination === 'complete' && record.vaccination < 100) return false
        if (filterVaccination === 'partial' && (record.vaccination === 100 || record.vaccination === 0)) return false
        if (filterVaccination === 'none' && record.vaccination > 0) return false
      }
      
      return true
    })

    // 3. SORT LOGIC
    records.sort((a, b) => {
      let valA: string | number
      let valB: string | number
      
      if (sortBy === 'age' || sortBy === 'vaccination') {
        valA = a[sortBy]
        valB = b[sortBy]
      } else { // 'id'
        valA = a.id
        valB = b.id
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return records
  }, [searchTerm, filterStatus, filterDisease, filterVaccination, sortBy, sortDirection])


  // --- HANDLERS ---
  const handleSort = (key: 'id' | 'age' | 'vaccination') => {
    // If clicking the same column, toggle direction
    if (sortBy === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      // If clicking a new column, set it as the new sort key and reset direction to asc
      setSortBy(key)
      setSortDirection('asc')
    }
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setFilterStatus("all")
    setFilterDisease("all")
    setFilterVaccination("all")
  }

  // --- View Helpers ---
  const getSortIcon = (key: string) => {
    if (sortBy !== key) return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />
    if (sortDirection === 'asc') return <span className="ml-1">▲</span>
    return <span className="ml-1">▼</span>
  }

  // --- RENDER BLOCK ---
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Health Records...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* The dedicated <header> block has been removed, assuming a common 
        Layout or Wrapper component will provide the main navigation/header.
      */}
      
      {/* --- Main Content --- */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        
        {/* Stats Cards (Same as before) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Registered</p>
                  <p className="text-3xl font-bold text-gray-900">12,847</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+234 this month</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vaccination Coverage</p>
                  <p className="text-3xl font-bold text-gray-900">78.4%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "78.4%" }}></div>
                  </div>
                </div>
                <Syringe className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Cases</p>
                  <p className="text-3xl font-bold text-gray-900">1,523</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3 text-orange-600" />
                    <span className="text-xs text-orange-600">Ongoing treatment</span>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">High-Risk Patients</p>
                  <p className="text-3xl font-bold text-gray-900">342</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Flag className="h-3 w-3 text-red-600" />
                    <span className="text-xs text-red-600">Requires attention</span>
                  </div>
                </div>
                <Flag className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters (UPDATED with state management) */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by Anonymous ID..." 
              className="pl-10" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          
          <Select value={filterDisease} onValueChange={(val) => setFilterDisease(val)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Diseases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Diseases</SelectItem>
              <SelectItem value="tb">Tuberculosis</SelectItem>
              <SelectItem value="dengue">Dengue</SelectItem>
              <SelectItem value="malaria">Malaria</SelectItem>
              <SelectItem value="respiratory">Respiratory</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val as PatientRecord['status'] | 'all')}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Healthy">Healthy</SelectItem>
              <SelectItem value="Treatment">Treatment</SelectItem>
              <SelectItem value="High Risk">High Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterVaccination} onValueChange={(val) => setFilterVaccination(val)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Vaccination Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="complete">Complete (100%)</SelectItem>
              <SelectItem value="partial">Partial (1% - 99%)</SelectItem>
              <SelectItem value="none">Not Vaccinated (0%)</SelectItem>
            </SelectContent>
          </Select>

          {/* District Select remains passive for now, as data is static */}
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
              <SelectItem value="kochi">Kochi</SelectItem>
              <SelectItem value="kozhikode">Kozhikode</SelectItem>
              <SelectItem value="thrissur">Thrissur</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              <Filter className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Patient Records (CLEANED BLOCK) */}
        <div className="mb-6">
          {/* --- The main heading and dynamic count --- */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
            <p className="text-sm text-gray-600">
              Showing **{filteredAndSortedRecords.length}** records (Filtered)
            </p>
          </div>
          
          {/* --- SORTING CONTROLS --- */}
          <div className="flex gap-4 mb-4 border-b pb-2"> 
            <span className="text-sm text-gray-600 font-medium">Sort By:</span>
            <Button variant="ghost" size="sm" onClick={() => handleSort('id')} className="p-0 h-auto">
              ID {getSortIcon('id')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSort('age')} className="p-0 h-auto">
              Age {getSortIcon('age')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleSort('vaccination')} className="p-0 h-auto">
              Vaccination % {getSortIcon('vaccination')}
            </Button>
          </div>
          
          {/* --- DISPLAY FILTERED RECORDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {filteredAndSortedRecords.length > 0 ? (
              filteredAndSortedRecords.map((patient) => (
                <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{patient.id}</p>
                          <p className="text-xs text-gray-600">Age: {patient.age}</p>
                        </div>
                      </div>
                      <Badge className={patient.statusColor}>{patient.status}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{patient.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Activity className="h-3 w-3" />
                        <span className="font-medium text-gray-800">{patient.diseases}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Heart className="h-3 w-3" />
                        <span>{patient.medication}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Vaccination</span>
                        <span className="text-xs font-medium">{patient.vaccination}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${patient.vaccinationColor} h-2 rounded-full`}
                          style={{ width: `${patient.vaccination}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button variant="link" className="w-full mt-3 p-0 h-auto text-blue-600 hover:text-blue-800">
                      View Full Record →
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Empty state when no records match the criteria
              <div className="col-span-4 text-center py-10 bg-white rounded-lg border border-dashed">
                <Search className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                <p className="text-lg font-medium text-gray-700">No Records Found</p>
                <p className="text-sm text-gray-500">Try adjusting your search term or clearing your filters.</p>
                <Button variant="link" onClick={handleClearFilters} className="mt-2">
                    Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination (Styling is kept, functionality is not added as it needs backend) */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-blue-600 text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="text-sm text-gray-500">...</span>
            <Button variant="outline" size="sm">
              1071
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions (Same as before) */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="flex items-center gap-2 h-12 bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4" />
                Add New Patient
              </Button>
              <Button className="flex items-center gap-2 h-12 bg-green-600 hover:bg-green-700">
                <Calendar className="h-4 w-4" />
                Schedule Vaccination
              </Button>
              <Button className="flex items-center gap-2 h-12 bg-yellow-600 hover:bg-yellow-700">
                <Flag className="h-4 w-4" />
                Flag High Risk
              </Button>
              <Button className="flex items-center gap-2 h-12 bg-purple-600 hover:bg-purple-700">
                <FileText className="h-4 w-4" />
                Bulk Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}