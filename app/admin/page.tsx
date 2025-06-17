"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  Calendar,
  Settings,
  BarChart3,
  Database,
  Bell,
  LogOut,
  TrendingUp,
  Activity,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect if not Admin
  if (user?.vai_tro !== "admin") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const stats = [
    { title: "Tổng người dùng", value: "1,234", icon: Users, color: "text-blue-600", change: "+12%" },
    { title: "Phòng học", value: "25", icon: Calendar, color: "text-green-600", change: "+2%" },
    { title: "Đặt phòng hôm nay", value: "45", icon: Activity, color: "text-purple-600", change: "+8%" },
    { title: "Tỷ lệ sử dụng", value: "78%", icon: TrendingUp, color: "text-orange-600", change: "+5%" },
  ]

  const recentActivities = [
    { action: "Người dùng mới đăng ký", user: "Nguyễn Văn A", time: "5 phút trước" },
    { action: "Phòng VPC2_201 được đặt", user: "Trần Thị B", time: "10 phút trước" },
    { action: "Cập nhật thông tin phòng", user: "Admin", time: "15 phút trước" },
    { action: "Phê duyệt đặt phòng", user: "CTSV", time: "20 phút trước" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Quản trị hệ thống</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Badge className="bg-red-500 text-white">
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.ten_nguoi_dung}</p>
                  <p className="text-xs text-gray-600">{user?.ma_nguoi_dung}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Chào mừng, {user?.ten_nguoi_dung}</h2>
          <p className="text-gray-600">Quản lý toàn bộ hệ thống đặt phòng CMC</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="users">Người dùng</TabsTrigger>
                <TabsTrigger value="rooms">Phòng học</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Thống kê tổng quan
                    </CardTitle>
                    <CardDescription>Tình hình hoạt động của hệ thống</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-900">Đặt phòng tuần này</h4>
                          <p className="text-2xl font-bold text-blue-600">156</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-900">Tỷ lệ phê duyệt</h4>
                          <p className="text-2xl font-bold text-green-600">94%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Quản lý người dùng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Danh sách và quản lý người dùng hệ thống...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rooms">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-purple-600" />
                      Quản lý phòng học
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Thông tin và cấu hình phòng học...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-gray-600" />
                      Cài đặt hệ thống
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Cấu hình và tùy chỉnh hệ thống...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông báo hệ thống</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800">Bảo trì hệ thống</p>
                    <p className="text-xs text-yellow-600">Dự kiến 2:00 AM - 4:00 AM</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">Cập nhật tính năng mới</p>
                    <p className="text-xs text-blue-600">Version 2.1.0 đã được phát hành</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
