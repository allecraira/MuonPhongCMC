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
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedBooking, setSelectedBooking] =
    useState<MongoBookingHistory | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [bookings, setBookings] = useState<MongoBookingHistory[]>([]);
  const [rooms, setRooms] = useState<MongoRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tạo danh sách các ngày trong tuần
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Bắt đầu từ thứ 2

    const days: { date: string; dayName: string; fullDate: string }[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      
      days.push({
        date: day.toISOString().split('T')[0],
        dayName: day.toLocaleDateString('vi-VN', { weekday: 'long' }),
        fullDate: day.toLocaleDateString('vi-VN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      });
    }
    return days;
  };

  // Tạo lịch tháng
  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Ngày đầu tiên của tháng
    const firstDay = new Date(year, month, 1);
    // Ngày cuối cùng của tháng
    const lastDay = new Date(year, month + 1, 0);
    
    // Ngày đầu tiên của tuần chứa ngày đầu tháng
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay() + 1);
    
    // Ngày cuối cùng của tuần chứa ngày cuối tháng
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    const days: { date: string; dayName: string; fullDate: string; isCurrentMonth: boolean }[] = [];
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push({
        date: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('vi-VN', { weekday: 'long' }),
        fullDate: d.toLocaleDateString('vi-VN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        isCurrentMonth: d.getMonth() === month
      });
    }
    
    return days;
  };

  // Kiểm tra xem có phải hôm nay không
  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.toDateString() === today.toDateString();
  };

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
        
        // Debug: Log một số booking mẫu
        console.log("🔍 Sample bookings:", bookingsData.slice(0, 3));
        console.log("🔍 Sample rooms:", roomsData.slice(0, 3));
      } catch (error) {
        console.error("❌ Error loading security data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Create time slots phù hợp với format booking
  const timeSlots = [
    { id: "07:00-08:30", time: "07:00", period: "Tiết 1-2" },
    { id: "08:40-10:10", time: "08:40", period: "Tiết 3-4" },
    { id: "10:15-11:45", time: "10:15", period: "Tiết 5-6" },
    { id: "13:00-14:30", time: "13:00", period: "Tiết 7-8" },
    { id: "14:35-16:05", time: "14:35", period: "Tiết 9-10" },
    { id: "16:10-17:40", time: "16:10", period: "Tiết 11-12" },
    { id: "18:00-19:30", time: "18:00", period: "Tối 1" },
    { id: "19:40-21:10", time: "19:40", period: "Tối 2" },
  ];

  // Get unique rooms for display
  const displayRooms = rooms.slice(0, 6).map((room) => ({
    id: room.So_phong.toString(),
    name: `Phòng ${room.So_phong}`,
    building: room.Co_so,
  }));

  const getBookingForSlot = (roomId: string, timeSlot: string, dayDate: string) => {
    // Lọc booking theo phòng, thời gian và ngày
    return bookings.find((booking) => {
      // Kiểm tra phòng
      const roomMatches = booking.Ma_phong.includes(roomId) || booking.Ma_phong.includes(`${roomId}`);
      
      // Kiểm tra ngày
      let bookingDate: Date;
      if (booking.Ngay.includes('/')) {
        const [day, month, year] = booking.Ngay.split('/');
        bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        bookingDate = new Date(booking.Ngay);
      }
      const targetDate = new Date(dayDate);
      const dateMatches = bookingDate.toDateString() === targetDate.toDateString();
      
      // Kiểm tra thời gian (chuyển đổi ca sang giờ)
      const formatTime = (ca: string) => {
        if (ca.includes('-') && ca.match(/\d{2}:\d{2}/)) {
          return [ca];
        }
        const tietToSlots: { [key: string]: string[] } = {
          'Tiết 1-2': ['07:00-08:30'],
          'Tiết 3-4': ['08:40-10:10'],
          'Tiết 5-6': ['10:15-11:45'],
          'Tiết 7-8': ['13:00-14:30'],
          'Tiết 9-10': ['14:35-16:05'],
          'Tiết 11-12': ['16:10-17:40'],
          'Tiết 13': ['18:00-18:45'],
          'Tiết 14': ['18:45-19:30'],
          'Tiết 7-9': ['13:00-14:30','14:35-16:05','16:10-17:40'],
          'Tiết 10-12': ['15:00-17:40','16:10-17:40'],
          'Tiết 3-6': ['08:40-10:10','10:15-11:45','13:00-14:30','14:35-16:05'],
          'Tiết 13-14': ['18:00-19:30'],
        };
        if (tietToSlots[ca]) return tietToSlots[ca];
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
        return [timeSlots[ca] || ca];
      };
      
      const bookingTimes = formatTime(booking.Ca);
      const timeMatches = bookingTimes.includes(timeSlot);
      
      return roomMatches && dateMatches && timeMatches && booking.trang_thai === "confirmed";
    });
  };

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

  const goToPreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  const getWeekRange = () => {
    const weekDays = getWeekDays(currentWeek);
    if (weekDays.length === 0) return '';
    const startDate = new Date(weekDays[0].date);
    const endDate = new Date(weekDays[6].date);
    
    return `${startDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' })} - ${endDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  };

  const getMonthRange = () => {
    return currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
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

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "numeric"
    });
  };

  const formatFullDate = (date: Date) => {
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

  // Weekly Calendar View Component
  const WeeklyCalendarView = () => (
    <div className="overflow-x-auto">
      <div className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-[120px_repeat(7,1fr)] bg-gray-50 border-b border-gray-200">
          <div className="p-4 text-center font-bold text-gray-800 border-r border-gray-200">
            <div className="text-sm">Khung giờ</div>
            <div className="text-xs text-gray-600">Thời gian</div>
          </div>
          {getWeekDays(currentWeek).map((day, index) => (
            <div
              key={index}
              className={`p-4 text-center font-bold text-gray-800 border-r border-gray-200 ${
                isToday(day.date) ? 'bg-orange-50' : ''
              }`}
            >
              <div className={`text-sm font-semibold ${
                isToday(day.date) ? 'text-orange-800' : 'text-gray-800'
              }`}>
                {day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1)}
              </div>
              <div className={`text-xs ${
                isToday(day.date) ? 'text-orange-600' : 'text-gray-600'
              }`}>
                {day.date.split('-')[2]}/{day.date.split('-')[1]}
              </div>
              {isToday(day.date) && (
                <div className="text-xs text-orange-700 font-bold mt-1">
                  HÔM NAY
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {timeSlots.map((timeSlot) => (
          <div
            key={timeSlot.id}
            className="grid grid-cols-[120px_repeat(7,1fr)] border-b border-gray-200 min-h-[100px]"
          >
            <div className="p-4 text-center font-medium text-gray-700 bg-gray-50 border-r border-gray-200 flex flex-col justify-center">
              <div className="text-sm font-bold">{timeSlot.period}</div>
              <div className="text-xs text-gray-500">
                {timeSlot.time}
              </div>
            </div>
            {getWeekDays(currentWeek).map((day, dayIndex) => {
              // Lấy tất cả booking cho ngày và giờ này
              const dayBookings = bookings.filter(booking => {
                // Kiểm tra ngày
                let bookingDate: Date;
                if (booking.Ngay.includes('/')) {
                  const [day, month, year] = booking.Ngay.split('/');
                  bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                } else {
                  bookingDate = new Date(booking.Ngay);
                }
                const targetDate = new Date(day.date);
                const dateMatches = bookingDate.toDateString() === targetDate.toDateString();
                
                // Kiểm tra thời gian (chuyển đổi ca sang khung giờ)
                const formatTime = (ca: string) => {
                  if (ca.includes('-') && ca.match(/\d{2}:\d{2}/)) {
                    return [ca];
                  }
                  const tietToSlots: { [key: string]: string[] } = {
                    'Tiết 1-2': ['07:00-08:30'],
                    'Tiết 3-4': ['08:40-10:10'],
                    'Tiết 5-6': ['10:15-11:45'],
                    'Tiết 7-8': ['13:00-14:30'],
                    'Tiết 9-10': ['14:35-16:05'],
                    'Tiết 11-12': ['16:10-17:40'],
                    'Tiết 13': ['18:00-18:45'],
                    'Tiết 14': ['18:45-19:30'],
                    'Tiết 7-9': ['13:00-14:30','14:35-16:05','16:10-17:40'],
                    'Tiết 10-12': ['15:00-17:40','16:10-17:40'],
                    'Tiết 3-6': ['08:40-10:10','10:15-11:45','13:00-14:30','14:35-16:05'],
                    'Tiết 13-14': ['18:00-19:30'],
                  };
                  if (tietToSlots[ca]) return tietToSlots[ca];
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
                  return [timeSlots[ca] || ca];
                };
                
                const bookingTimes = formatTime(booking.Ca);
                const timeMatches = bookingTimes.includes(timeSlot.id);
                
                console.log(`🔒 Security: Booking ${booking.Ma_phong} ca ${booking.Ca} -> time ${bookingTimes}, slot ${timeSlot.id}, match: ${timeMatches}`);
                
                return dateMatches && timeMatches && booking.trang_thai === "confirmed";
              });

              return (
                <div
                  key={dayIndex}
                  className={`p-3 border-r border-gray-200 ${
                    isToday(day.date) ? 'bg-orange-25' : 'bg-white'
                  }`}
                >
                  {dayBookings.length > 0 ? (
                    <div className="space-y-2">
                      {dayBookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking._id}
                          className="p-2 bg-blue-100 rounded border-l-3 border-blue-500 shadow-sm text-xs hover:bg-blue-200 transition-colors cursor-pointer"
                          onClick={() => handleBookingClick(booking)}
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
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            {booking.trang_thai === "confirmed" ? "Đã duyệt" : "Chờ duyệt"}
                          </Badge>
                        </div>
                      ))}
                      {dayBookings.length > 3 && (
                        <div className="text-center text-blue-600 text-xs">
                          +{dayBookings.length - 3} phòng khác
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-300 text-xs py-6">
                      -
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  // Monthly Calendar View Component
  const MonthlyCalendarView = () => {
    const monthDays = getMonthDays(currentMonth);
    const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

    return (
      <div className="overflow-x-auto">
        <div className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {weekDays.map((day, index) => (
              <div key={index} className="p-4 text-center font-bold text-gray-800 border-r border-gray-200">
                <div className="text-sm">{day}</div>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {monthDays.map((day, index) => {
              // Lấy tất cả booking cho ngày này
              const dayBookings = bookings.filter(booking => {
                // Kiểm tra ngày
                let bookingDate: Date;
                if (booking.Ngay.includes('/')) {
                  const [day, month, year] = booking.Ngay.split('/');
                  bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                } else {
                  bookingDate = new Date(booking.Ngay);
                }
                const targetDate = new Date(day.date);
                const dateMatches = bookingDate.toDateString() === targetDate.toDateString();
                
                return dateMatches && booking.trang_thai === "confirmed";
              });

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-3 border-r border-b border-gray-200 ${
                    !day.isCurrentMonth ? 'bg-gray-50' : 
                    isToday(day.date) ? 'bg-orange-25' : 'bg-white'
                  }`}
                >
                  {/* Date Header */}
                  <div className={`text-sm font-semibold mb-2 ${
                    !day.isCurrentMonth ? 'text-gray-400' :
                    isToday(day.date) ? 'text-orange-800' : 'text-gray-800'
                  }`}>
                    {day.date.split('-')[2]}
                    {isToday(day.date) && (
                      <span className="ml-1 text-xs text-orange-600">●</span>
                    )}
                  </div>

                  {/* Bookings */}
                  <div className="space-y-1">
                    {dayBookings.slice(0, 4).map((booking) => (
                      <div
                        key={booking._id}
                        className="p-1 bg-blue-100 rounded border-l-2 border-blue-500 shadow-sm text-xs hover:bg-blue-200 transition-colors cursor-pointer"
                        onClick={() => handleBookingClick(booking)}
                      >
                        <div className="font-bold text-blue-900 truncate">
                          {booking.Ma_phong}
                        </div>
                        <div className="text-blue-700 truncate">
                          {booking.Ten_nguoi_dung}
                        </div>
                        <div className="text-blue-600 truncate text-xs">
                          {booking.Ca}
                        </div>
                      </div>
                    ))}
                    {dayBookings.length > 4 && (
                      <div className="text-center text-blue-600 text-xs">
                        +{dayBookings.length - 4} phòng khác
                      </div>
                    )}
                    {dayBookings.length === 0 && day.isCurrentMonth && (
                      <div className="text-center text-gray-300 text-xs py-4">
                        -
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
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
            <p className="text-gray-600 mt-2">
              {viewMode === "week" ? `Tuần ${getWeekRange()}` : `Tháng ${getMonthRange()}`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={viewMode === "week" ? "bg-white shadow-sm" : ""}
              >
                Tuần
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={viewMode === "month" ? "bg-white shadow-sm" : ""}
              >
                Tháng
              </Button>
            </div>

            {/* Navigation Buttons */}
            {viewMode === "week" ? (
              <>
                <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Tuần trước
                </Button>
                <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
                  Hôm nay
                </Button>
                <Button variant="outline" size="sm" onClick={goToNextWeek}>
                  Tuần sau
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Tháng trước
                </Button>
                <Button variant="outline" size="sm" onClick={goToCurrentMonth}>
                  Hôm nay
                </Button>
                <Button variant="outline" size="sm" onClick={goToNextMonth}>
                  Tháng sau
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {viewMode === "week" 
                ? `Lịch đặt phòng theo giờ - Tuần ${getWeekRange()}`
                : `Lịch đặt phòng theo tháng - ${getMonthRange()}`
              }
            </CardTitle>
            <CardDescription>
              Click vào ô đặt phòng để xem chi tiết thông tin
            </CardDescription>
          </CardHeader>
          <CardContent>
            {viewMode === "week" ? (
              <WeeklyCalendarView />
            ) : (
              <MonthlyCalendarView />
            )}
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
                {viewMode === "week" 
                  ? bookings.filter(b => {
                      const weekDays = getWeekDays(currentWeek);
                      const weekDates = weekDays.map(d => d.date);
                      let bookingDate: Date;
                      if (b.Ngay.includes('/')) {
                        const [day, month, year] = b.Ngay.split('/');
                        bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      } else {
                        bookingDate = new Date(b.Ngay);
                      }
                      return weekDates.includes(bookingDate.toISOString().split('T')[0]);
                    }).length
                  : bookings.filter(b => {
                      const monthDays = getMonthDays(currentMonth);
                      const monthDates = monthDays.filter(d => d.isCurrentMonth).map(d => d.date);
                      let bookingDate: Date;
                      if (b.Ngay.includes('/')) {
                        const [day, month, year] = b.Ngay.split('/');
                        bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      } else {
                        bookingDate = new Date(b.Ngay);
                      }
                      return monthDates.includes(bookingDate.toISOString().split('T')[0]);
                    }).length
                }
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {viewMode === "week" ? "Tuần này" : "Tháng này"}
              </p>
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
