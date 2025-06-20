import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  User,
  Hash,
  Phone,
  MessageCircle,
  UserCheck,
  Download,
  Printer,
} from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();

  // Get real booking data from location state with proper defaults
  const bookingData = location.state?.bookingData || {
    roomName: "Phòng không xác định",
    roomBuilding: "Chưa có thông tin",
    roomFloor: "Chưa có thông tin",
    date: new Date().toLocaleDateString("vi-VN"),
    time: "Chưa có thông tin",
    attendees: 0,
    purpose: "Chưa có thông tin",
    bookerName: "Chưa có thông tin",
    bookerEmail: "Chưa có thông tin",
    status: "confirmed",
    id: "000000",
  };

  // Generate booking code
  const bookingCode = `CMC${(bookingData.id || Date.now().toString()).slice(-6).padStart(6, "0")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đặt phòng thành công!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Yêu cầu đặt phòng của bạn đã được{" "}
            {bookingData.status === "confirmed" ? "xác nhận" : "ghi nhận"}.
            {bookingData.status === "confirmed"
              ? " Bạn có thể sử dụng phòng theo lịch đã đặt."
              : " Chúng tôi sẽ xử lý và gửi email xác nhận trong vòng 15 phút."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Thông tin đặt phòng
              </CardTitle>
              <CardDescription>
                Mã đặt phòng: <strong>{bookingCode}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{bookingData.roomName}</div>
                  <div className="text-sm text-gray-600">
                    {bookingData.roomFloor}, {bookingData.roomBuilding}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{bookingData.date}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">
                    {bookingData.time?.replace("-", " - ") ||
                      "Chưa có thông tin"}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">
                    {bookingData.attendees} người tham gia
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">Mục đích</div>
                  <div className="text-sm text-gray-600">
                    {bookingData.purpose}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Badge
                  className={
                    bookingData.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {bookingData.status === "confirmed"
                    ? "✓ Đã xác nhận"
                    : "⏳ Chờ xử lý"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Booker Information - Now displaying real data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2" />
                Thông tin người đặt
              </CardTitle>
              <CardDescription>Chi tiết liên hệ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{bookingData.bookerName}</div>
                  <div className="text-sm text-gray-600">Người đặt phòng</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{bookingData.bookerEmail}</div>
                  <div className="text-sm text-gray-600">Email liên hệ</div>
                </div>
              </div>

              {bookingData.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">{bookingData.phone}</div>
                    <div className="text-sm text-gray-600">Số điện thoại</div>
                  </div>
                </div>
              )}

              {bookingData.studentId && (
                <div className="flex items-center space-x-3">
                  <Hash className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">{bookingData.studentId}</div>
                    <div className="text-sm text-gray-600">Mã sinh viên/GV</div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Email xác nhận đã được gửi đến địa chỉ email trên
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Bước tiếp theo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Trước khi sử dụng phòng
                </h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Mang theo thẻ sinh viên/giảng viên</li>
                  <li>• Đến đúng giờ đã đặt</li>
                  <li>• Báo với bảo vệ trước khi vào phòng</li>
                  <li>• Kiểm tra trang thiết bị trong phòng</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Quy định sử dụng
                </h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Giữ gìn vệ sinh và tài sản</li>
                  <li>• Không ăn uống trong phòng</li>
                  <li>• Tắt điện, điều hòa khi ra về</li>
                  <li>• Báo cáo ngay nếu có sự cố</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="flex items-center"
          >
            <Print className="h-4 w-4 mr-2" />
            In phiếu đặt phòng
          </Button>

          <Link to="/rooms">
            <Button className="bg-cmcBlue-600 hover:bg-cmcBlue-700">
              <Calendar className="h-4 w-4 mr-2" />
              Đặt phòng khác
            </Button>
          </Link>

          <Link to="/">
            <Button variant="outline">Về trang chủ</Button>
          </Link>
        </div>

        {/* Support Information */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-semibold text-blue-900 mb-2">Cần hỗ trợ?</h4>
              <p className="text-blue-700 text-sm mb-4">
                Liên hệ với chúng tôi nếu bạn cần thay đổi hoặc hủy đặt phòng
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <div className="flex items-center text-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  024 3755 6666
                </div>
                <div className="flex items-center text-blue-700">
                  <Mail className="h-4 w-4 mr-2" />
                  support@cmc.edu.vn
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;
