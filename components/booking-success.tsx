"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Clock, Users, MapPin, Mail, Phone, User, Hash } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface BookingSuccessProps {
  bookingData: any
  onBackToHome: () => void
}

export default function BookingSuccess({ bookingData, onBackToHome }: BookingSuccessProps) {
  const bookingId = `CMC${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt phòng thành công!</h1>
          <p className="text-gray-600">
            Yêu cầu đặt phòng của bạn đã được ghi nhận. Vui lòng kiểm tra email để xem chi tiết.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Thông tin đặt phòng
              </CardTitle>
              <CardDescription>
                Mã đặt phòng: <span className="font-mono font-semibold">{bookingId}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{bookingData.room.name}</p>
                    <p className="text-sm text-gray-600">{bookingData.room.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {bookingData.date ? format(bookingData.date, "EEEE, dd MMMM yyyy", { locale: vi }) : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {bookingData.startTime} - {bookingData.endTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{bookingData.attendees} người tham gia</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="font-medium text-gray-900 mb-2">Mục đích sử dụng:</p>
                <p className="text-gray-600 text-sm">{bookingData.purpose}</p>
              </div>

              <div className="pt-4">
                <p className="font-medium text-gray-900 mb-2">Thiết bị có sẵn:</p>
                <div className="flex flex-wrap gap-1">
                  {bookingData.room.equipment.map((item: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin người đặt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{bookingData.studentName}</p>
                    <p className="text-sm text-gray-600">Sinh viên</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{bookingData.studentId}</p>
                    <p className="text-sm text-gray-600">Mã sinh viên</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{bookingData.email}</p>
                    <p className="text-sm text-gray-600">Email liên hệ</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{bookingData.phone}</p>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Các bước tiếp theo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-2">Kiểm tra email</h3>
                <p className="text-sm text-gray-600">Email xác nhận đã được gửi đến {bookingData.email}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium mb-2">Mang thẻ sinh viên</h3>
                <p className="text-sm text-gray-600">Xuất trình thẻ sinh viên khi đến sử dụng phòng</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium mb-2">Đúng giờ</h3>
                <p className="text-sm text-gray-600">Có mặt đúng giờ để không ảnh hưởng đến lịch khác</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button onClick={onBackToHome} size="lg" className="px-8">
            Về trang chủ
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            In thông tin đặt phòng
          </Button>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 p-4 bg-white rounded-lg border">
          <p className="text-sm text-gray-600">
            Cần hỗ trợ? Liên hệ phòng quản lý tại{" "}
            <a href="tel:0123456789" className="text-blue-600 hover:underline">
              0123-456-789
            </a>{" "}
            hoặc email{" "}
            <a href="mailto:support@cmc.edu.vn" className="text-blue-600 hover:underline">
              support@cmc.edu.vn
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
