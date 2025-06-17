"use client"

import { useState } from "react"
import RoleBasedWrapper from "@/components/role-based-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, Eye, X, CheckCircle, BookOpen } from "lucide-react"

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Mock bookings data for STUDENT
  const mockBookings = [
    {
      id: "1",
      room: { name: "VPC2_201", location: "Tòa CS1" },
      date: "2025-06-25",
      startTime: "13:00",
      endTime: "14:30",
      status: "confirmed",
      purpose: "Thảo luận nhóm môn Lập trình Web",
      attendees: 5,
    },
    {
      id: "2",
      room: { name: "VPC2_502", location: "Tòa CS2" },
      date: "2025-06-26",
      startTime: "14:45",
      endTime: "16:15",
      status: "pending",
      purpose: "Thực hành Java",
      attendees: 8,
    },
    {
      id: "3",
      room: { name: "VPC1_101", location: "Tòa CS1" },
      date: "2025-06-20",
      startTime: "09:00",
      endTime: "10:30",
      status: "completed",
      purpose: "Thuyết trình đồ án",
      attendees: 3,
    },
  ]

  const upcomingBookings = mockBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const completedBookings = mockBookings.filter((b) => b.status === "completed")
  const cancelledBookings = mockBookings.filter((b) => b.status === "cancelled")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận"
      case "pending":
        return "Chờ duyệt"
      case "completed":
        return "Đã hoàn thành"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    console.log("Cancel booking:", bookingId)
    // Handle cancel booking logic
  }

  return (
    <RoleBasedWrapper title="Lịch đặt phòng của tôi">
      <div className="space-y-6">
        {/* Student-specific header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold">Quản lý lịch đặt phòng</h2>
              <p className="text-teal-100">Theo dõi và quản lý các lịch đặt phòng của bạn</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-teal-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sắp tới</p>
                  <p className="text-3xl font-bold text-teal-600">{upcomingBookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
                  <p className="text-3xl font-bold text-green-600">{completedBookings.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng cộng</p>
                  <p className="text-3xl font-bold text-gray-900">{mockBookings.length}</p>
                </div>
                <Users className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Danh sách đặt phòng</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  Sắp tới ({upcomingBookings.length})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Đã hoàn thành ({completedBookings.length})
                </TabsTrigger>
                <TabsTrigger
                  value="cancelled"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Đã hủy ({cancelledBookings.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4 mt-6">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-teal-500 hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-lg">{booking.room.name}</span>
                                <span className="text-gray-600">- {booking.room.location}</span>
                              </div>
                              <Badge className={`${getStatusColor(booking.status)} text-white`}>
                                {getStatusText(booking.status)}
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{booking.attendees} người</span>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-700">Mục đích:</p>
                              <p className="text-sm text-gray-600">{booking.purpose}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-teal-200 text-teal-600 hover:bg-teal-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Chi tiết
                            </Button>
                            {booking.status === "pending" && (
                              <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                                <X className="w-4 h-4 mr-1" />
                                Hủy
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Không có lịch đặt phòng sắp tới</h3>
                    <p className="text-gray-600 mb-6">Bạn chưa có lịch đặt phòng nào sắp tới.</p>
                    <Button className="bg-teal-600 hover:bg-teal-700">Đặt phòng ngay</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {completedBookings.length > 0 ? (
                  completedBookings.map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-lg">{booking.room.name}</span>
                                <span className="text-gray-600">- {booking.room.location}</span>
                              </div>
                              <Badge className="bg-green-500 text-white">Đã hoàn thành</Badge>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{booking.attendees} người</span>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-700">Mục đích:</p>
                              <p className="text-sm text-gray-600">{booking.purpose}</p>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-200 text-green-600 hover:bg-green-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Xem lại
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch hoàn thành</h3>
                    <p className="text-gray-600">Các lịch đặt phòng đã hoàn thành sẽ hiển thị tại đây.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="space-y-4 mt-6">
                <div className="text-center py-12">
                  <X className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Không có lịch bị hủy</h3>
                  <p className="text-gray-600">Các lịch đặt phòng bị hủy sẽ hiển thị tại đây.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </RoleBasedWrapper>
  )
}
