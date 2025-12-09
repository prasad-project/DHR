"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DynamicHeader } from "@/components/dynamic-header"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface WorkerLayoutProps {
  children: React.ReactNode
}

export default function WorkerLayout({ children }: WorkerLayoutProps) {
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <DynamicHeader 
          leftChildren={isMobile ? <SidebarTrigger className="-ml-1" /> : null}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="bg-transparent text-white border-white/30 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </DynamicHeader>

        <div className="flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}