import { useState, useEffect } from "react";
import { bookingService } from "@/lib/mongodb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";

interface BookingItem {
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

interface DaySchedule {
  date: string;
  dayName: string;
  bookings: BookingItem[];
}

const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);

  // Tạo danh sách các ngày trong tuần
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Bắt đầu từ thứ 2

    const days: DaySchedule[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      
      days.push({
        date: day.toISOString().split('T')[0],
        dayName: day.toLocaleDateString('vi-VN', { weekday: 'long' }),
        bookings: []
      });
    }
    return days;
  };

  // Tạo danh sách khung giờ từ 7h sáng đến 22h tối (phù hợp với booking)
  const timeSlots = [
    { id: "07:00-08:30", time: "07:00-08:30", label: "07:00", period: "Tiết 1-2" },
    { id: "08:40-10:10", time: "08:40-10:10", label: "08:40", period: "Tiết 3-4" },
    { id: "10:15-11:45", time: "10:15-11:45", label: "10:15", period: "Tiết 5-6" },
    { id: "13:00-14:30", time: "13:00-14:30", label: "13:00", period: "Tiết 7-8" },
    { id: "14:35-16:05", time: "14:35-16:05", label: "14:35", period: "Tiết 9-10" },
    { id: "16:10-17:40", time: "16:10-17:40", label: "16:10", period: "Tiết 11-12" },
    { id: "18:00-19:30", time: "18:00-19:30", label: "18:00", period: "Tối 1" },
    { id: "19:40-21:10", time: "19:40-21:10", label: "19:40", period: "Tối 2" },
  ];

  // Kiểm tra xem có phải hôm nay không
  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.toDateString() === today.toDateString();
  };

  useEffect(() => {
    const fetchWeekBookings = async () => {
      try {
        const allBookings = await bookingService.getAllBookings();
        console.log("📅 All bookings:", allBookings);
        
        const weekDays = getWeekDays(currentWeek);
        console.log("📅 Week days:", weekDays);
        
        // Lọc booking trong tuần hiện tại
        const weekBookings = allBookings.filter(booking => {
          let bookingDate: Date;
          
          // Xử lý các format ngày khác nhau
          if (booking.Ngay.includes('/')) {
            // Format: DD/MM/YYYY
            const [day, month, year] = booking.Ngay.split('/');
            bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          } else {
            // Format: YYYY-MM-DD
            bookingDate = new Date(booking.Ngay);
          }
          
          const startOfWeek = new Date(currentWeek);
          startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);
          startOfWeek.setHours(0, 0, 0, 0);
          
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);
          
          const isInWeek = bookingDate >= startOfWeek && bookingDate <= endOfWeek;
          console.log(`📅 Booking ${booking.Ma_phong} on ${booking.Ngay}:`, {
            bookingDate: bookingDate.toDateString(),
            startOfWeek: startOfWeek.toDateString(),
            endOfWeek: endOfWeek.toDateString(),
            isInWeek
          });
          
          return isInWeek;
        });

        console.log("📅 Week bookings:", weekBookings);

        // Phân loại booking theo ngày
        const updatedWeekDays = weekDays.map(day => {
          const dayBookings = weekBookings.filter(booking => {
            let bookingDate: Date;
            
            // Xử lý các format ngày khác nhau
            if (booking.Ngay.includes('/')) {
              const [day, month, year] = booking.Ngay.split('/');
              bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            } else {
              bookingDate = new Date(booking.Ngay);
            }
            
            const dayDate = new Date(day.date);
            const isSameDay = bookingDate.toDateString() === dayDate.toDateString();
            console.log(`📅 Comparing ${booking.Ma_phong} on ${booking.Ngay}:`, {
              bookingDate: bookingDate.toDateString(),
              dayDate: dayDate.toDateString(),
              isSameDay
            });
            return isSameDay;
          });
          
          return {
            ...day,
            bookings: dayBookings
          };
        });

        console.log("📅 Updated week days:", updatedWeekDays);
        setWeekSchedule(updatedWeekDays);
      } catch (error) {
        console.error("Error fetching week bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekBookings();
  }, [currentWeek]);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newDate);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  const formatTime = (ca: string) => {
    // Nếu ca đã là format thời gian, trả về nguyên
    if (ca.includes('-') || ca.includes(':')) {
      return ca;
    }
    
    // Mapping từ số ca sang khung giờ
    const timeSlots: { [key: string]: string } = {
      "1": "07:00-08:30",
      "2": "08:40-10:10", 
      "3": "10:15-11:45",
      "4": "13:00-14:30",
      "5": "14:35-16:05",
      "6": "16:10-17:40",
      "7": "18:00-19:30",
      "8": "19:40-21:10"
    };
    return timeSlots[ca] || ca;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'numeric'
    });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getWeekRange = () => {
    if (weekSchedule.length === 0) return '';
    const startDate = new Date(weekSchedule[0].date);
    const endDate = new Date(weekSchedule[6].date);
    
    return `${startDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' })} - ${endDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Lịch tổng tuần
          </CardTitle>
          <CardDescription>
            Tất cả các đặt phòng trong tuần
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cmcBlue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang tải lịch tuần...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Lịch tổng tuần
        </CardTitle>
        <CardDescription>
          Tất cả các đặt phòng trong tuần
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Tuần trước
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="font-medium text-lg">
              Tuần {getWeekRange()}
            </span>
            <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
              Hôm nay
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={goToNextWeek}>
            Tuần sau
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Weekly Calendar Grid */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
            {/* Time column header */}
            <div className="p-3 border-r border-gray-200 bg-gray-100">
              <div className="font-bold text-sm text-gray-800">
                Khung giờ
              </div>
            </div>

            {/* Day headers */}
            {weekSchedule.map((day, index) => (
              <div 
                key={index} 
                className={`p-3 text-center border-r border-gray-200 ${
                  isToday(day.date) 
                    ? 'bg-orange-50 border-orange-200' 
                    : 'bg-white'
                }`}
              >
                <div className={`font-bold text-sm mb-1 ${
                  isToday(day.date) ? 'text-orange-800' : 'text-gray-800'
                }`}>
                  {day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1)}
                </div>
                <div className={`text-lg font-semibold ${
                  isToday(day.date) ? 'text-orange-900' : 'text-gray-900'
                }`}>
                  {formatDate(day.date)}
                </div>
                {isToday(day.date) && (
                  <div className="text-xs text-orange-700 font-bold mt-1">
                    HÔM NAY
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Time slots rows */}
          {timeSlots.map((slot) => (
            <div key={slot.id} className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]">
              {/* Time slot label */}
              <div className="p-3 border-r border-gray-200 bg-gray-50 flex flex-col justify-center">
                <div className="font-bold text-sm text-gray-800">{slot.label}</div>
                <div className="text-xs text-gray-600">{slot.time}</div>
              </div>

              {/* Day cells */}
              {weekSchedule.map((day, dayIndex) => {
                const slotBookings = day.bookings.filter(booking => {
                  // Chuyển đổi ca booking sang khung giờ tương ứng
                  const bookingTime = formatTime(booking.Ca);
                  console.log(`📅 Booking ${booking.Ma_phong} ca ${booking.Ca} -> time ${bookingTime}, slot ${slot.time}, match: ${bookingTime === slot.time}`);
                  
                  return bookingTime === slot.time;
                });
                
                console.log(`📅 Day ${day.date} slot ${slot.time}: ${slotBookings.length} bookings`);
                
                return (
                  <div 
                    key={dayIndex} 
                    className={`p-2 border-r border-gray-200 ${
                      isToday(day.date) ? 'bg-orange-25' : 'bg-white'
                    }`}
                  >
                    {slotBookings.length > 0 ? (
                      <div className="space-y-1">
                        {slotBookings.map((booking) => (
                          <div
                            key={booking._id}
                            className="p-2 bg-blue-100 rounded border-l-3 border-blue-500 shadow-sm text-xs hover:bg-blue-200 transition-colors cursor-pointer"
                          >
                            <div className="font-bold text-blue-900 truncate">
                              {booking.Ma_phong}
                            </div>
                            <div className="text-blue-700 truncate">
                              {booking.Ten_nguoi_dung}
                            </div>
                            <div className="text-blue-600 truncate text-xs">
                              {booking.Ly_do}
                            </div>
                            <Badge className={`text-xs ${getStatusColor(booking.trang_thai || 'pending')}`}>
                              {booking.trang_thai === 'confirmed' ? 'Đã xác nhận' : 
                               booking.trang_thai === 'pending' ? 'Chờ xác nhận' : 'Đã hủy'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-300 text-xs py-4">
                        -
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Tổng cộng: {weekSchedule.reduce((total, day) => total + day.bookings.length, 0)} đặt phòng
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Phòng đã đặt: {new Set(weekSchedule.flatMap(day => day.bookings.map(b => b.Ma_phong))).size} phòng
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 border border-green-200">
                Đã xác nhận: {weekSchedule.reduce((total, day) => 
                  total + day.bookings.filter(b => b.trang_thai === 'confirmed').length, 0
                )}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
                Chờ xác nhận: {weekSchedule.reduce((total, day) => 
                  total + day.bookings.filter(b => b.trang_thai === 'pending').length, 0
                )}
              </Badge>
              <Badge className="bg-red-100 text-red-800 border border-red-200">
                Đã hủy: {weekSchedule.reduce((total, day) => 
                  total + day.bookings.filter(b => b.trang_thai === 'cancelled').length, 0
                )}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCalendar; 