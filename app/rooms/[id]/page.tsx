"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, MapPin, Clock, CheckCircle, Info, ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { rooms } from "@/lib/data"
import BookingForm from "@/components/booking-form"
import BookingSuccess from "@/components/booking-success"

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const room = rooms.find((r) => r.id === params.id)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy phòng</h1>
        <p className="mb-8">Phòng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link href="/rooms">
          <Button>Quay lại danh sách phòng</Button>
        </Link>
      </div>
    )
  }

  const handleBookRoom = () => {
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (data: any) => {
    setBookingData({ ...data, room })
    setShowBookingForm(false)
    setShowSuccess(true)
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  if (showSuccess) {
    return <BookingSuccess bookingData={bookingData} onBackToHome={handleBackToHome} />
  }

  if (showBookingForm) {
    return <BookingForm room={room} onSubmit={handleBookingSubmit} onCancel={() => setShowBookingForm(false)} />
  }

  const timeSlots = [
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <Link href="/rooms" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay lại danh sách phòng
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
          <div className="flex items-center gap-4">
            <Badge variant={room.available ? "default" : "secondary"}>{room.available ? "Có sẵn" : "Đã đặt"}</Badge>
            <p className="text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {room.location}
            </p>
            <p className="text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {room.capacity} người
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Thông tin
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Hình ảnh
                </TabsTrigger>
                <TabsTrigger value="availability" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Lịch phòng
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin phòng</CardTitle>
                    <CardDescription>Chi tiết và tiện nghi có sẵn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-2">Mô tả</h3>
                      <p className="text-gray-600">
                        {room.name} là một không gian hiện đại, được trang bị đầy đủ tiện nghi phục vụ cho việc học tập
                        và làm việc nhóm. Phòng có ánh sáng tự nhiên, không gian thoáng đãng và yên tĩnh, phù hợp cho
                        các hoạt động học tập, thảo luận nhóm và tổ chức các buổi seminar nhỏ.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2">Thiết bị có sẵn</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {room.equipment.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2">Quy định sử dụng</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-600 mr-2">•</span>
                          <span>Giữ gìn vệ sinh và tài sản trong phòng</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 mr-2">•</span>
                          <span>Không mang đồ ăn, thức uống vào phòng (trừ nước lọc)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 mr-2">•</span>
                          <span>Không gây ồn ào, ảnh hưởng đến các phòng xung quanh</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 mr-2">•</span>
                          <span>Tắt điện, điều hòa khi ra khỏi phòng</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-600 mr-2">•</span>
                          <span>Báo cáo ngay khi có sự cố về thiết bị</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="photos">
                <Card>
                  <CardHeader>
                    <CardTitle>Hình ảnh phòng</CardTitle>
                    <CardDescription>Xem hình ảnh chi tiết về phòng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Hình ảnh phòng 1"
                        className="rounded-lg w-full h-48 object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Hình ảnh phòng 2"
                        className="rounded-lg w-full h-48 object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Hình ảnh phòng 3"
                        className="rounded-lg w-full h-48 object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Hình ảnh phòng 4"
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch sử dụng phòng</CardTitle>
                    <CardDescription>Kiểm tra thời gian phòng còn trống</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-4">Chọn ngày</h3>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="border rounded-md p-3"
                        />
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Khung giờ trống</h3>
                        {selectedDate ? (
                          <div className="space-y-2">
                            {timeSlots.map((slot, index) => (
                              <div
                                key={index}
                                className={`p-3 border rounded-md flex justify-between items-center ${
                                  index % 3 === 0 ? "bg-gray-100" : "bg-white"
                                }`}
                              >
                                <span>{slot}</span>
                                <Badge variant={index % 3 === 0 ? "secondary" : "default"}>
                                  {index % 3 === 0 ? "Đã đặt" : "Còn trống"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full border rounded-md p-8 bg-gray-50">
                            <p className="text-gray-500">Vui lòng chọn ngày để xem lịch trống</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Đặt phòng này</CardTitle>
                <CardDescription>Chọn thời gian và đặt phòng ngay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Chọn ngày</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="border rounded-md p-3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Chọn khung giờ</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khung giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot, index) => (
                        <SelectItem key={index} value={slot} disabled={index % 3 === 0}>
                          {slot} {index % 3 === 0 && "(Đã đặt)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full mt-4"
                  size="lg"
                  disabled={!room.available || !selectedDate || !selectedTime}
                  onClick={handleBookRoom}
                >
                  Tiếp tục đặt phòng
                </Button>

                {!room.available && (
                  <p className="text-center text-sm text-red-600">Phòng này hiện không có sẵn để đặt</p>
                )}

                {!selectedDate && room.available && (
                  <p className="text-center text-sm text-amber-600">Vui lòng chọn ngày để tiếp tục</p>
                )}

                {selectedDate && !selectedTime && room.available && (
                  <p className="text-center text-sm text-amber-600">Vui lòng chọn khung giờ để tiếp tục</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
