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
  Loader2,
} from "lucide-react";
import {
  bookingService,
  roomService,
  MongoBookingHistory,
  MongoRoom,
} from "@/lib/mongodb";

const SecurityCalendar = () => {
  const [selectedDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] =
    useState<MongoBookingHistory | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [bookings, setBookings] = useState<MongoBookingHistory[]>([]);
  const [rooms, setRooms] = useState<MongoRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load booking and room data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("📊 Loading security calendar data...");

        const [bookingsData, roomsData] = await Promise.all([
          bookingService.getAllBookings(),
          roomService.getAllRooms(),
        ]);

        setBookings(bookingsData);
        setRooms(roomsData);

        console.log("✅ Security data loaded:", {
          bookings: bookingsData.length,
          rooms: roomsData.length,
        });
      } catch (error) {
        console.error("❌ Error loading security data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Create mock time slots for display
  const timeSlots = [
    "07:00",
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

  // Get unique rooms for display
  const displayRooms = rooms.slice(0, 6).map((room) => ({
    id: room.So_phong.toString(),
    name: `Phòng ${room.So_phong}`,
    building: room.Co_so,
  }));

  const getBookingForSlot = (roomId: string, timeSlot: string) => {
    // Convert timeSlot to a matching format and find bookings
    return bookings.find((booking) => {
      // Simple matching for demonstration
      const roomMatches =
        booking.Ma_phong.includes(roomId) ||
        booking.Ma_phong.includes(`${roomId}`);
      // For demo, show some bookings
      return roomMatches && booking.trang_thai === "confirmed";
    });
  };

  const handleBookingClick = (booking: MongoBookingHistory) => {
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

  const handleCheckIn = (booking: MongoBookingHistory) => {
    console.log("📋 Check-in:", booking._id);

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
          <div class="text-sm">${booking.Ma_phong} - ${booking.Ten_nguoi_dung}</div>
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
  };

  const handleReport = (booking: MongoBookingHistory) => {
    // Create a better reporting interface
    const reportTypes = [
      "Thiết bị hỏng hóc",
      "Vệ sinh không đảm bảo",
      "Mất trật tự",
      "Khác",
    ];

    const reportType = prompt(
      `📝 Chọn loại báo cáo:\n${reportTypes
        .map((type, i) => `${i + 1}. ${type}`)
        .join("\n")}\n\nNhập số (1-${reportTypes.length}):`,
    );

    if (reportType && reportType.match(/^[1-4]$/)) {
      const selectedType = reportTypes[parseInt(reportType) - 1];
      const detail = prompt(`📋 Chi tiết báo cáo về "${selectedType}":`);

      if (detail) {
        console.log("📋 Incident report:", {
          bookingId: booking._id,
          room: booking.Ma_phong,
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
              <div class="text-sm">${selectedType} - ${booking.Ma_phong}</div>
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
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto" />
            <p className="mt-4 text-gray-600">Đang tải lịch phòng...</p>
          </div>
        </div>
      </div>
    );
  }

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
                  {displayRooms.map((room) => (
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
                    {displayRooms.map((room) => {
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
                                {booking.Ten_nguoi_dung}
                              </div>
                              <div className="text-blue-700 mb-1">
                                {booking.Ly_do}
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge className="bg-blue-100 text-blue-800 text-xs">
                                  {booking.Ma_phong}
                                </Badge>
                                <Badge
                                  className={
                                    booking.trang_thai === "confirmed"
                                      ? "bg-green-100 text-green-800 text-xs"
                                      : "bg-yellow-100 text-yellow-800 text-xs"
                                  }
                                >
                                  {booking.trang_thai === "confirmed"
                                    ? "Đã duyệt"
                                    : "Chờ duyệt"}
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
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter((b) => b.trang_thai === "confirmed").length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Đã xác nhận</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Phòng trống
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {rooms.filter((r) => r.trang_thai === "available").length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Có thể đặt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Chờ duyệt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {bookings.filter((b) => b.trang_thai === "pending").length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Yêu cầu mới</p>
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
                  <div className="text-sm">{selectedBooking.Ma_phong}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Ngày</div>
                  <div className="text-sm">{selectedBooking.Ngay}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Ca</div>
                  <div className="text-sm">{selectedBooking.Ca}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Người đặt
                  </div>
                  <div className="text-sm">
                    {selectedBooking.Ten_nguoi_dung}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Mục đích
                </div>
                <div className="text-sm">{selectedBooking.Ly_do}</div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {selectedBooking.Email}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Badge
                  className={
                    selectedBooking.trang_thai === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {selectedBooking.trang_thai === "confirmed"
                    ? "✓ Đã xác nhận"
                    : "⏳ Chờ duyệt"}
                </Badge>
                <div className="text-xs text-gray-500">
                  Mã: {selectedBooking.Ma_nguoi_dung}
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
                    onClick={() => handleCheckIn(selectedBooking)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Check-in
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center text-orange-600 border-orange-200 hover:bg-orange-50"
                    onClick={() => handleReport(selectedBooking)}
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
