import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Shield,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Mock booking data
const bookings = [
  {
    id: "1",
    room: "Phòng 201",
    building: "Tòa CS1",
    time: "08:00 - 10:00",
    date: "2025-01-17",
    booker: "Nguyễn Văn A",
    role: "Sinh viên",
    purpose: "Họp nhóm dự án",
    attendees: 15,
    phone: "0123456789",
    email: "student1@cmc.edu.vn",
    status: "confirmed",
  },
  {
    id: "2",
    room: "Phòng 202",
    building: "Tòa CS1",
    time: "10:00 - 12:00",
    date: "2025-01-17",
    booker: "TS. Trần Thị B",
    role: "Giảng viên",
    purpose: "Lớp học Lập trình Java",
    attendees: 30,
    phone: "0987654321",
    email: "teacher1@cmc.edu.vn",
    status: "confirmed",
  },
  {
    id: "3",
    room: "Phòng 301",
    building: "Tòa CS2",
    time: "14:00 - 16:00",
    date: "2025-01-17",
    booker: "Lê Văn C",
    role: "Sinh viên",
    purpose: "Thực hành máy tính",
    attendees: 25,
    phone: "0369258147",
    email: "student2@cmc.edu.vn",
    status: "confirmed",
  },
  {
    id: "4",
    room: "Phòng 201",
    building: "Tòa CS1",
    time: "16:00 - 18:00",
    date: "2025-01-17",
    booker: "Phạm Thị D",
    role: "Sinh viên",
    purpose: "Họp CLB Lập trình",
    attendees: 20,
    phone: "0147258369",
    email: "student3@cmc.edu.vn",
    status: "confirmed",
  },
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const rooms = [
  { id: "201", name: "Phòng 201", building: "CS1" },
  { id: "202", name: "Phòng 202", building: "CS1" },
  { id: "203", name: "Phòng 203", building: "CS1" },
  { id: "301", name: "Phòng 301", building: "CS2" },
  { id: "302", name: "Phòng 302", building: "CS2" },
  { id: "401", name: "Phòng 401", building: "CS3" },
];

const SecurityCalendar = () => {
  const [selectedDate] = useState(new Date("2025-01-17"));
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);

  const getBookingForSlot = (roomId: string, timeSlot: string) => {
    return bookings.find((booking) => {
      const [startTime] = booking.time.split(" - ");
      return (
        booking.room === `Phòng ${roomId}` &&
        booking.date === "2025-01-17" &&
        startTime === timeSlot
      );
    });
  };

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking);
    setShowDialog(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-gray-900">
                    Bảo vệ - Lịch phòng
                  </div>
                  <div className="text-xs text-gray-500">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">Bảo vệ trực</div>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Đăng xuất
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay về trang chủ
          </Link>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Lịch sử dụng phòng
            </h1>
            <p className="text-gray-600 mt-2">{formatDate(selectedDate)}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Ngày trước
            </Button>
            <Button variant="outline" size="sm">
              Hôm nay
            </Button>
            <Button variant="outline" size="sm">
              Ngày sau
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Lịch đặt phòng theo giờ
            </CardTitle>
            <CardDescription>
              Click vào ô đặt phòng để xem chi tiết thông tin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Header Row */}
                <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-2">
                  <div className="p-3 text-center font-medium text-gray-700">
                    Giờ
                  </div>
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      className="p-3 text-center font-medium text-gray-700 bg-gray-100 rounded"
                    >
                      <div className="text-sm font-semibold">{room.name}</div>
                      <div className="text-xs text-gray-500">
                        Tòa {room.building}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((timeSlot) => (
                  <div
                    key={timeSlot}
                    className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-1"
                  >
                    <div className="p-3 text-center font-medium text-gray-600 bg-gray-50 rounded flex items-center justify-center">
                      {timeSlot}
                    </div>
                    {rooms.map((room) => {
                      const booking = getBookingForSlot(room.id, timeSlot);
                      return (
                        <div
                          key={`${room.id}-${timeSlot}`}
                          className={`p-2 min-h-[80px] rounded border ${
                            booking
                              ? "bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100"
                              : "bg-white border-gray-200"
                          } transition-colors`}
                          onClick={() => booking && handleBookingClick(booking)}
                        >
                          {booking ? (
                            <div className="text-xs">
                              <div className="font-semibold text-blue-900 mb-1">
                                {booking.booker}
                              </div>
                              <div className="text-blue-700 mb-1">
                                {booking.purpose}
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge className="bg-blue-100 text-blue-800 text-xs">
                                  {booking.attendees} người
                                </Badge>
                                <Badge
                                  variant={
                                    booking.role === "Giảng viên"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {booking.role}
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 text-xs py-4">
                              Trống
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng số đặt phòng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {bookings.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Hôm nay</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Phòng đang sử dụng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">2</div>
              <p className="text-xs text-gray-500 mt-1">Giờ hiện tại</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Phòng trống
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="text-xs text-gray-500 mt-1">Có thể đặt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tỷ lệ sử dụng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">75%</div>
              <p className="text-xs text-gray-500 mt-1">Trung bình ngày</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Chi tiết đặt phòng
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về lịch đặt phòng và tính năng kiểm tra
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Phòng</div>
                  <div className="text-sm">{selectedBooking.room}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Tòa nhà
                  </div>
                  <div className="text-sm">{selectedBooking.building}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Thời gian
                  </div>
                  <div className="text-sm">{selectedBooking.time}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Số người
                  </div>
                  <div className="text-sm">
                    {selectedBooking.attendees} người
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Người đặt
                </div>
                <div className="text-sm">{selectedBooking.booker}</div>
                <Badge
                  variant={
                    selectedBooking.role === "Giảng viên"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs mt-1"
                >
                  {selectedBooking.role}
                </Badge>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Mục đích
                </div>
                <div className="text-sm">{selectedBooking.purpose}</div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {selectedBooking.phone}
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {selectedBooking.email}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Badge className="bg-green-100 text-green-800">
                  ✓ Đã xác nhận
                </Badge>
                <div className="text-xs text-gray-500">
                  Mã: CMC{selectedBooking.id.padStart(6, "0")}
                </div>
              </div>

              {/* Check-in and Report Actions */}
              <div className="pt-4 border-t space-y-3">
                <div className="text-sm font-medium text-gray-900">
                  Hành động bảo vệ
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                    onClick={() => {
                      console.log("📋 Check-in:", selectedBooking.id);

                      // Create success notification
                      const notification = document.createElement("div");
                      notification.className =
                        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full";
                      notification.innerHTML = `
                        <div class="flex items-center">
                          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <div>
                            <div class="font-medium">Check-in thành công!</div>
                            <div class="text-sm">${selectedBooking.room} - ${selectedBooking.booker}</div>
                          </div>
                        </div>
                      `;

                      document.body.appendChild(notification);

                      // Animate in
                      setTimeout(() => {
                        notification.classList.remove("translate-x-full");
                      }, 100);

                      // Auto-remove after 3 seconds
                      setTimeout(() => {
                        notification.classList.add("translate-x-full");
                        setTimeout(() => {
                          document.body.removeChild(notification);
                        }, 300);
                      }, 3000);

                      // Also show traditional alert as backup
                      alert(
                        `✅ Check-in thành công cho ${selectedBooking.room}\n\nThời gian: ${new Date().toLocaleTimeString("vi-VN")}\nNgười đặt: ${selectedBooking.booker}`,
                      );
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Check-in
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center text-orange-600 border-orange-200 hover:bg-orange-50"
                    onClick={() => {
                      // Create a better reporting interface
                      const reportTypes = [
                        "Thiết bị hỏng hóc",
                        "Vệ sinh không đảm bảo",
                        "Mất trật tự",
                        "Khác",
                      ];

                      const reportType = prompt(
                        `📝 Chọn loại báo cáo:\n${reportTypes.map((type, i) => `${i + 1}. ${type}`).join("\n")}\n\nNhập số (1-${reportTypes.length}):`,
                      );

                      if (reportType && reportType.match(/^[1-4]$/)) {
                        const selectedType =
                          reportTypes[parseInt(reportType) - 1];
                        const detail = prompt(
                          `📋 Chi tiết báo cáo về "${selectedType}":`,
                        );

                        if (detail) {
                          console.log("📋 Incident report:", {
                            bookingId: selectedBooking.id,
                            room: selectedBooking.room,
                            type: selectedType,
                            detail: detail,
                            reporter: "Bảo vệ",
                            timestamp: new Date().toISOString(),
                          });

                          // Create success notification
                          const notification = document.createElement("div");
                          notification.className =
                            "fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full";
                          notification.innerHTML = `
                            <div class="flex items-center">
                              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                              </svg>
                              <div>
                                <div class="font-medium">Báo cáo đã gửi!</div>
                                <div class="text-sm">${selectedType} - ${selectedBooking.room}</div>
                              </div>
                            </div>
                          `;

                          document.body.appendChild(notification);

                          setTimeout(() => {
                            notification.classList.remove("translate-x-full");
                          }, 100);

                          setTimeout(() => {
                            notification.classList.add("translate-x-full");
                            setTimeout(() => {
                              document.body.removeChild(notification);
                            }, 300);
                          }, 4000);

                          alert(
                            `📝 Báo cáo đã được ghi nhận!\n\nPhòng: ${selectedBooking.room}\nLoại: ${selectedType}\nChi tiết: ${detail}\nThời gian: ${new Date().toLocaleString("vi-VN")}`,
                          );
                        }
                      }
                    }}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Báo cáo
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Click "Check-in" khi sinh viên/GV đến sử dụng phòng
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityCalendar;
