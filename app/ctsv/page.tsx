"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, CheckCircle, XCircle, Clock, BarChart3, Bell, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CTSVPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect if not CTSV
  if (user?.vai_tro !== "ctsv") {
    router.push("/dashboard")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const pendingBookings = [
    {
      id: 1,
      room: "VPC2_201",
      student: "Nguyễn Văn An",
      studentId: "BIT230372",
      date: "2025-06-25",
      time: "18:00 - 19:00",
      purpose: "Học nhóm môn Lập trình Web",
      status: "pending",
    },
    {
      id: 2,
      room: "VPC2_502",
      student: "Trần Thị Bình",
      studentId: "BIT230373",
      date: "2025-06-26",
      time: "14:00 - 16:00",
      purpose: "Thuyết trình đồ án tốt nghiệp",
      status: "pending",
    },
  ]

  const stats = [
    { title: "Đặt phòng chờ duyệt", value: "12", icon: Clock, color: "text-yellow-600" },
    { title: "Đã phê duyệt hôm nay", value: "8", icon: CheckCircle, color: "text-green-600" },
    { title: "Đã từ chối", value: "2", icon: XCircle, color: "text-red-600" },
    { title: "Tổng đặt phòng", value: "156", icon: Calendar, color: "text-blue-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CTSV Dashboard</h1>
                <p className="text-sm text-gray-600">Phòng Công tác Sinh viên</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Badge className="bg-purple-500 text-white">
                <Users className="w-4 h-4 mr-1" />
                CTSV
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
          <p className="text-gray-600">Quản lý và phê duyệt các yêu cầu đặt phòng từ sinh viên</p>
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

        {/* Main Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>
            <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
            <TabsTrigger value="rejected">Đã từ chối</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  Đặt phòng chờ phê duyệt
                </CardTitle>
                <CardDescription>Các yêu cầu đặt phòng cần được xem xét và phê duyệt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-purple-600 border-purple-600">
                              {booking.room}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {booking.date} • {booking.time}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {booking.student} ({booking.studentId})
                            </p>
                            <p className="text-sm text-gray-600">{booking.purpose}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Phê duyệt
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="w-4 h-4 mr-1" />
                            Từ chối
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Đặt phòng đã phê duyệt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Danh sách các đặt phòng đã được phê duyệt...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Đặt phòng đã từ chối
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Danh sách các đặt phòng đã bị từ chối...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Báo cáo thống kê
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Thống kê và báo cáo sử dụng phòng...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
