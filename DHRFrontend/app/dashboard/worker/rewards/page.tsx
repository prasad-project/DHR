"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Syringe,
  Stethoscope,
  BookOpen,
  Upload,
  Pill,
  Heart,
  GraduationCap,
  FileText,
  Gift,
  Smartphone,
} from "lucide-react"

export default function RewardsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Rewards</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Stay Healthy → Earn Rewards</h1>
            <Trophy className="h-8 w-8" />
          </div>
          <p className="text-lg mb-6">Every healthy choice you make earns you valuable points and amazing rewards!</p>

          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Syringe className="h-4 w-4" />
              <span>Get Vaccinated</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              <span>Regular Checkups</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Health Education</span>
            </div>
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Upload Records</span>
            </div>
          </div>
        </div>

        {/* Health Points Card */}
        <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Health Points</h2>
                <div className="text-5xl font-bold">
                  2,847 <span className="text-lg font-normal">points</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-3 mb-2">
                  <Trophy className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Health Champion</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Next Level</span>
                <span className="text-blue-200">2,847 / 3,000</span>
              </div>
              <Progress value={94.9} className="h-2" />
              <p className="text-sm text-blue-100">Only 153 points to reach Gold Level!</p>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="bg-yellow-500 rounded-full p-3 w-fit mx-auto mb-3">
                <Syringe className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Vaccination Hero</h3>
              <p className="text-sm text-gray-600">5 vaccinations</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="bg-green-500 rounded-full p-3 w-fit mx-auto mb-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Health Tracker</h3>
              <p className="text-sm text-gray-600">12 checkups</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-500 rounded-full p-3 w-fit mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Health Scholar</h3>
              <p className="text-sm text-gray-600">8 courses completed</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-500 rounded-full p-3 w-fit mx-auto mb-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Record Keeper</h3>
              <p className="text-sm text-gray-600">25 documents</p>
            </CardContent>
          </Card>
        </div>

        {/* Earn Points Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Earn Points Through Healthy Activities</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Vaccinations */}
            <Card className="border-l-4 border-l-pink-500">
              <CardContent className="p-4">
                <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Syringe className="h-5 w-5" />
                    <span className="font-semibold">Vaccinations</span>
                  </div>
                  <p className="text-sm">Stay protected</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">COVID-19 Booster</span>
                    <span className="text-green-600 font-semibold">+500 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Flu Shot</span>
                    <span className="text-green-600 font-semibold">+300 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hepatitis B</span>
                    <span className="text-green-600 font-semibold">+400 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tetanus</span>
                    <span className="text-green-600 font-semibold">+350 pts</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Earned</span>
                      <span className="text-green-600 text-lg">1,550 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkups */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="h-5 w-5" />
                    <span className="font-semibold">Checkups</span>
                  </div>
                  <p className="text-sm">Regular health monitoring</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Annual Physical</span>
                    <span className="text-green-600 font-semibold">+400 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Blood Pressure Check</span>
                    <span className="text-green-600 font-semibold">+100 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dental Checkup</span>
                    <span className="text-green-600 font-semibold">+250 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Eye Examination</span>
                    <span className="text-green-600 font-semibold">+200 pts</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Earned</span>
                      <span className="text-green-600 text-lg">950 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Awareness */}
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="font-semibold">Awareness</span>
                  </div>
                  <p className="text-sm">Learn and grow</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nutrition Course</span>
                    <span className="text-green-600 font-semibold">+150 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mental Health Workshop</span>
                    <span className="text-green-600 font-semibold">+200 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">First Aid Training</span>
                    <span className="text-green-600 font-semibold">+300 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hygiene Seminar</span>
                    <span className="text-green-600 font-semibold">+100 pts</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Earned</span>
                      <span className="text-green-600 text-lg">750 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploads */}
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-5 w-5" />
                    <span className="font-semibold">Uploads</span>
                  </div>
                  <p className="text-sm">Keep records updated</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medical Certificate</span>
                    <span className="text-green-600 font-semibold">+75 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lab Results</span>
                    <span className="text-green-600 font-semibold">+50 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prescription</span>
                    <span className="text-green-600 font-semibold">+25 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Insurance Card</span>
                    <span className="text-green-600 font-semibold">+30 pts</span>
                  </div>
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Earned</span>
                      <span className="text-green-600 text-lg">180 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Redeem Rewards Section */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Redeem Your Rewards</h2>
              <Gift className="h-6 w-6" />
            </div>
            <p className="text-gray-600">Turn your health points into valuable rewards!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pharmacy Discounts */}
            <div className="space-y-4">
              <Card className="bg-green-500 text-white">
                <CardContent className="p-4 text-center">
                  <div className="bg-white/20 rounded-full p-3 w-fit mx-auto mb-2">
                    <Pill className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Pharmacy Discounts</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">10% Off Prescription</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">500 pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Valid at partner pharmacies</p>
                  <Button className="w-full bg-green-500 hover:bg-green-600">Redeem</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">20% Off OTC Medicine</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">800 pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Over-the-counter medications</p>
                  <Button className="w-full bg-green-500 hover:bg-green-600">Redeem</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Free Health Checkup</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                      1200 pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Complete health screening</p>
                  <Button className="w-full bg-green-500 hover:bg-green-600">Redeem</Button>
                </CardContent>
              </Card>
            </div>

            {/* Food Coupons */}
            <div className="space-y-4">
              <Card className="bg-orange-500 text-white">
                <CardContent className="p-4 text-center">
                  <div className="bg-white/20 rounded-full p-3 w-fit mx-auto mb-2">
                    <Gift className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Food Coupons</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">$5 Grocery Voucher</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-semibold">
                      300 pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Use at local grocery stores</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Redeem</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">$10 Restaurant Coupon</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-semibold">
                      600 pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Healthy meal options</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Redeem</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Fresh Fruit Basket</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-semibold">
                      450 pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Weekly fresh fruits delivery</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Redeem</Button>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Recharges */}
            <div className="space-y-4">
              <Card className="bg-blue-500 text-white">
                <CardContent className="p-4 text-center">
                  <div className="bg-white/20 rounded-full p-3 w-fit mx-auto mb-2">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Mobile Recharges</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">$5 Mobile Credit</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">250 pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Instant mobile top-up</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Redeem</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">$10 Data Package</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">500 pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">High-speed internet data</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Redeem</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Free International Call</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">400 pts</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">30 minutes international</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Redeem</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}


