import { useState, useEffect } from "react";
import { bookingService } from "@/lib/mongodb";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, FileText } from "lucide-react";

interface BookingHistoryItem {
  _id?: string;
  Ma_phong: string;
  Ngay: string;
  Email: string;
  Ma_nguoi_dung: string;
  Ten_nguoi_dung: string;
  Ly_do: string;
  Ca: string;
  Ngay_dat: string;
  trang_thai?: "pending" | "confirmed" | "cancelled";
}

const BookingHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (user?.email) {
        try {
          // Lấy tất cả booking và lọc theo email của user
          const allBookings = await bookingService.getAllBookings();
          const userBookings = allBookings.filter(booking => booking.Email === user.email);
          // Sắp xếp theo ngày đặt mới nhất
          const sortedBookings = userBookings.sort((a, b) => {
            let dateA: Date, dateB: Date;
            
            // Xử lý format ngày cho a
            if (a.Ngay_dat.includes('/')) {
              const [day, month, year] = a.Ngay_dat.split('/');
              dateA = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            } else {
              dateA = new Date(a.Ngay_dat);
            }
            
            // Xử lý format ngày cho b
            if (b.Ngay_dat.includes('/')) {
              const [day, month, year] = b.Ngay_dat.split('/');
              dateB = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            } else {
              dateB = new Date(b.Ngay_dat);
            }
            
            return dateB.getTime() - dateA.getTime();
          });
          setBookings(sortedBookings);
        } catch (error) {
          console.error("Error fetching booking history:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookingHistory();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Đã xác nhận</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xác nhận</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    let date: Date;
    
    // Xử lý các format ngày khác nhau
    if (dateString.includes('/')) {
      // Format: DD/MM/YYYY
      const [day, month, year] = dateString.split('/');
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      // Format: YYYY-MM-DD
      date = new Date(dateString);
    }
    
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (ca: string) => {
    const timeSlots: { [key: string]: string } = {
      "1": "07:00 - 09:00",
      "2": "09:00 - 11:00",
      "3": "13:00 - 15:00",
      "4": "15:00 - 17:00",
      "5": "17:00 - 19:00"
    };
    return timeSlots[ca] || ca;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Lịch sử đặt phòng
          </CardTitle>
          <CardDescription>
            Danh sách các phòng bạn đã đặt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cmcBlue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang tải lịch sử đặt phòng...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Lịch sử đặt phòng
        </CardTitle>
        <CardDescription>
          Danh sách các phòng bạn đã đặt ({bookings.length} đặt phòng)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có lịch sử đặt phòng
            </h3>
            <p className="text-gray-600">
              Bạn chưa đặt phòng nào. Hãy bắt đầu đặt phòng để xem lịch sử ở đây.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-lg">{booking.Ma_phong}</span>
                      {getStatusBadge(booking.trang_thai || "pending")}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Ngày: {formatDate(booking.Ngay)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Ca: {formatTime(booking.Ca)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Người đặt: {booking.Ten_nguoi_dung}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Lý do: {booking.Ly_do}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      Đặt lúc: {formatDate(booking.Ngay_dat)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingHistory; 