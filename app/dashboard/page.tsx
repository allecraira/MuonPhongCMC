"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, Plus, Eye } from "lucide-react"
import RoleBasedWrapper from "@/components/role-based-wrapper"
import DateTimePicker from "@/components/date-time-picker"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [bookingData, setBookingData] = useState<any>(null)

  // Mock bookings data
  const mockBookings = [
    {
      id: "1",
      room: { name: "Phòng 201", location: "Tòa CS1" },
      date: "2025-06-25",
      startTime: "13:00",
      endTime: "14:30",
      status: "confirmed",
      purpose: "Thảo luận nhóm môn Lập trình Web",
    },
    {
      id: "2",
      room: { name: "Phòng Lab 1", location: "Tòa CS2" },
      date: "2025-06-26",
      startTime: "14:45",
      endTime: "16:15",
      status: "pending",
      purpose: "Thực hành Java",
    },
  ]

  const handleDataUpdate = (data: any) => {
    setBookingData(data)
    console.log("Updated booking data:", data)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
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
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  return (
    <RoleBasedWrapper title="Dashboard">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lịch sắp tới</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Trong tuần này</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Cần xác nhận</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng đặt phòng</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Tháng này</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Date Time Picker */}
          <div className="lg:col-span-1">
            <DateTimePicker
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              onDateChange={setSelectedDate}
              onTimeSlotChange={setSelectedTimeSlot}
              onDataUpdate={handleDataUpdate}
            />

            {/* Quick Book Button */}
            {bookingData && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <Button className="w-full" size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Đặt phòng ngay
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    {bookingData.formattedData?.dayOfWeek}, {bookingData.formattedData?.dateDisplay}
                    <br />
                    {bookingData.formattedData?.timeRange}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Bookings List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Lịch đặt phòng của tôi</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
                    <TabsTrigger value="completed">Đã hoàn thành</TabsTrigger>
                    <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4 mt-4">
                    {mockBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">{booking.room.name}</span>
                                <span className="text-sm text-gray-600">- {booking.room.location}</span>
                              </div>
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
                              <p className="text-sm text-gray-600">{booking.purpose}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(booking.status)} text-white`}>
                                {getStatusText(booking.status)}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="completed" className="mt-4">
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch hoàn thành</h3>
                      <p className="text-gray-600">Các lịch đặt phòng đã hoàn thành sẽ hiển thị tại đây.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="cancelled" className="mt-4">
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Không có lịch bị hủy</h3>
                      <p className="text-gray-600">Các lịch đặt phòng bị hủy sẽ hiển thị tại đây.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleBasedWrapper>
  )
}
