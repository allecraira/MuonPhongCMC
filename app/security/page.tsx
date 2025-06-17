"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, AlertTriangle, Clock, MapPin, Bell, Settings, LogOut, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SecurityPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect if not Security
  if (user?.vai_tro !== "bao_ve") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const currentRoomStatus = [
    {
      room: "VPC2_201",
      status: "occupied",
      user: "Nguyễn Văn An",
      time: "18:00 - 19:00",
      purpose: "Học nhóm",
    },
    {
      room: "VPC2_202",
      status: "available",
      user: null,
      time: null,
      purpose: null,
    },
    {
      room: "VPC2_301",
      status: "occupied",
      user: "Trần Thị Bình",
      time: "19:00 - 21:00",
      purpose: "Thuyết trình",
    },
    {
      room: "VPC2_502",
      status: "maintenance",
      user: null,
      time: null,
      purpose: "Bảo trì thiết bị",
    },
  ]

  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Phòng VPC2_301 có tiếng ồn bất thường",
      time: "5 phút trước",
      room: "VPC2_301",
    },
    {
      id: 2,
      type: "info",
      message: "Sinh viên yêu cầu hỗ trợ tại VPC2_201",
      time: "10 phút trước",
      room: "VPC2_201",
    },
  ]

  const stats = [
    { title: "Phòng đang sử dụng", value: "8", icon: Eye, color: "text-blue-600" },
    { title: "Phòng trống", value: "12", icon: CheckCircle, color: "text-green-600" },
    { title: "Cảnh báo hôm nay", value: "3", icon: AlertTriangle, color: "text-yellow-600" },
    { title: "Tổng số phòng", value: "25", icon: MapPin, color: "text-gray-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Security Dashboard</h1>
                <p className="text-sm text-gray-600">Giám sát và bảo vệ</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Badge className="bg-orange-500 text-white">
                <Shield className="w-4 h-4 mr-1" />
                Bảo vệ
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
          <p className="text-gray-600">Giám sát tình trạng phòng học và đảm bảo an ninh</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="w-5 h-5" />
                Cảnh báo mới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600">
                        {alert.room} • {alert.time}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Xử lý
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Tabs */}
        <Tabs defaultValue="monitor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monitor">Giám sát phòng</TabsTrigger>
            <TabsTrigger value="schedule">Lịch phòng</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          <TabsContent value="monitor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Tình trạng phòng real-time
                </CardTitle>
                <CardDescription>Theo dõi tình trạng sử dụng các phòng học</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentRoomStatus.map((room, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        room.status === "occupied"
                          ? "bg-red-50 border-red-200"
                          : room.status === "available"
                            ? "bg-green-50 border-green-200"
                            : "bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{room.room}</h3>
                        <Badge
                          variant={
                            room.status === "occupied"
                              ? "destructive"
                              : room.status === "available"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {room.status === "occupied"
                            ? "Đang sử dụng"
                            : room.status === "available"
                              ? "Trống"
                              : "Bảo trì"}
                        </Badge>
                      </div>
                      {room.user && (
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">{room.user}</p>
                          <p className="text-gray-600">{room.time}</p>
                          <p className="text-gray-600">{room.purpose}</p>
                        </div>
                      )}
                      {room.status === "maintenance" && <p className="text-sm text-gray-600">{room.purpose}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Lịch sử dụng phòng hôm nay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Lịch sử dụng phòng theo thời gian...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  Báo cáo an ninh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Báo cáo tình hình an ninh và sự cố...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
