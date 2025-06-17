"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import StudentLayout from "./layouts/student-layout"
import AdminLayout from "./layouts/admin-layout"
import CTSVLayout from "./layouts/ctsv-layout"
import SecurityLayout from "./layouts/security-layout"

interface RoleBasedWrapperProps {
  children: React.ReactNode
  title?: string
}

export default function RoleBasedWrapper({ children, title }: RoleBasedWrapperProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // CRITICAL: Render layout based on EXACT user role
  switch (user.vai_tro) {
    case "sinh_vien":
      return <StudentLayout title={title}>{children}</StudentLayout>
    case "admin":
      return <AdminLayout title={title}>{children}</AdminLayout>
    case "ctsv":
      return <CTSVLayout title={title}>{children}</CTSVLayout>
    case "bao_ve":
      return <SecurityLayout title={title}>{children}</SecurityLayout>
    default:
      // Fallback to student layout for unknown roles
      return <StudentLayout title={title}>{children}</StudentLayout>
  }
}
