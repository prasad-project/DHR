"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Star,
  Clock,
  Navigation,
  Shield,
  AlertTriangle,
  Heart,
  Pill,
  User,
  Building2,
  Video,
  Globe,
} from "lucide-react"
import Image from "next/image"

export default function EmergencyPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Emergency Call Section */}
      <div className="text-center bg-gradient-to-br from-red-50 to-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Assistance</h2>
        <p className="text-gray-600 mb-8">Instant access to emergency services</p>

        <div className="relative inline-block">
          <div className="w-48 h-48 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors cursor-pointer">
            <div className="text-center text-white">
              <Phone className="w-12 h-12 mx-auto mb-2" />
              <div className="font-bold text-lg">EMERGENCY CALL</div>
              <div className="text-sm">Tap to Call 911</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">Primary Contact: +1 (555) 911-0000</div>
      </div>

      {/* Health Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-red-500" />
            Health Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <Image
                src="/placeholder-user.jpg"
                alt="Maria Rodriguez"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Maria Rodriguez</h3>
              <p className="text-gray-600">DOB: March 15, 1985</p>
              <p className="text-gray-600">Age: 38 years</p>
              <p className="text-gray-600">ID: MHS-2024-7801</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium text-red-700">Blood Group</span>
                </div>
                <div className="text-2xl font-bold text-red-600">O+</div>
                <div className="text-sm text-red-600">Universal Donor Compatible</div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <span className="font-medium text-yellow-700">Critical Allergies</span>
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    Penicillin
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    Shellfish
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    Latex
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-blue-700">Chronic Conditions</span>
                </div>
                <div className="space-y-1 text-sm text-blue-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Type 2 Diabetes
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Hypertension
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Asthma (Mild)
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Pill className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-green-700">Current Medications</span>
                </div>
                <div className="space-y-1 text-sm text-green-600">
                  <div>Metformin - 500mg 2x/day</div>
                  <div>Lisinopril - 10mg 1x/day</div>
                  <div>Albuterol - As needed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-700">Emergency Notes</span>
              </div>
              <p className="text-sm text-red-600">
                Patient has history of panic attacks during medical procedures. Prefers Spanish communication.
                Emergency contact is daughter (Sofia Rodriguez). Patient is compliant with medication regimen.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-500" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sofia Rodriguez - Daughter */}
            <Card className="border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Sofia Rodriguez"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Sofia Rodriguez</h4>
                    <p className="text-sm text-gray-600">Daughter (Primary)</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-red-500 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Call: +1 (555) 123-4567
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dr. James Wilson */}
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/indian-doctor.jpg"
                    alt="Dr. James Wilson"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Dr. James Wilson</h4>
                    <p className="text-sm text-gray-600">Primary Care Physician</p>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Call: +1 (555) 987-6543
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-500 text-gray-600 hover:bg-gray-50 bg-transparent"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Services */}
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Emergency Services</h4>
                    <p className="text-sm text-gray-600">24/7 Emergency Line</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 911
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Poison Control
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* HealthCare Plus */}
            <Card className="border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">HealthCare Plus</h4>
                    <p className="text-sm text-gray-600">Insurance Provider</p>
                  </div>
                </div>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: +1 (800) 555-0199
                </Button>
                <p className="text-xs text-gray-500 mt-2">Policy: HCP-789456123</p>
              </CardContent>
            </Card>

            {/* Sarah Chen */}
            <Card className="border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Sarah Chen"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Sarah Chen</h4>
                    <p className="text-sm text-gray-600">Social Case Worker</p>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-teal-500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Call: +1 (555) 246-8135
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Language Line */}
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Language Line</h4>
                    <p className="text-sm text-gray-600">24/7 Interpreter Service</p>
                  </div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Spanish: +1 (800) 555-0177
                </Button>
                <p className="text-xs text-gray-500 mt-2">Available in 200+ languages</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Hospitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-red-500" />
            Nearby Hospitals & Medical Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map Placeholder */}
          <div className="relative h-64 bg-gray-200 rounded-lg mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400"></div>
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              You are here
            </div>
            <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Interactive Map Loading...</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-xs text-gray-600">Showing 15 active monitoring zones</div>
            <div className="absolute bottom-4 right-4 text-xs text-blue-600 cursor-pointer hover:underline">
              View Full Screen Map
            </div>
          </div>

          {/* Hospital Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Metro General Hospital */}
            <Card className="border-red-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-red-500" />
                    <div>
                      <h4 className="font-semibold">Metro General Hospital</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        0.8 miles away
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300">OPEN 24/7</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    +1 (555) 123-7890
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Est. arrival: 12 minutes
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.8 rating (2,341 reviews)</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
                    <Navigation className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Emergency Room
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Trauma Center
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ICU
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* St. Mary's Medical Center */}
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">St. Mary's Medical Center</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        1.2 miles away
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300">OPEN 24/7</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    +1 (555) 456-7890
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Est. arrival: 15 minutes
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.6 rating (1,892 reviews)</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
                    <Navigation className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Emergency Room
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Pediatric
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Maternity
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* QuickCare Urgent Center */}
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold">QuickCare Urgent Center</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        0.5 miles away
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">CLOSES 10PM</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    +1 (555) 789-0123
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Est. arrival: 8 minutes
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.4 rating (756 reviews)</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
                    <Navigation className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Urgent Care
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    X-Ray
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Lab Services
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 text-center">
                <Building2 className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">1,247</div>
                <div className="text-sm text-red-600">Active Cases</div>
                <div className="text-xs text-red-500 mt-1">+23% from last week</div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">4,892</div>
                <div className="text-sm text-green-600">Recovered</div>
                <div className="text-xs text-green-500 mt-1">+15% recovery rate</div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <Building2 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">127</div>
                <div className="text-sm text-blue-600">Hospitals</div>
                <div className="text-xs text-blue-500 mt-1">Ready for patients</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
