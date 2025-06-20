import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  MapPin,
  Users,
  CalendarIcon,
  Clock,
  Minus,
  Plus,
  Wifi,
  Monitor,
  Coffee,
  UserCheck,
  Mail,
  Phone,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { processBookingRequest } from "@/lib/emailService";
import { useAuth } from "@/lib/auth";
import { bookingService } from "@/lib/mongodb";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get room data from location state
  const room = location.state?.room;
  const initialDate = location.state?.selectedDate;

  // Form state with auto-filled user information
  const [formData, setFormData] = useState({
    bookerName: user?.name || "",
    bookerEmail: user?.email || "",
    phone: "",
    studentId: user?.studentId || "",
    purpose: "",
    attendees: 2,
    selectedTime: "",
    notes: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate || new Date(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill form when user data is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        bookerName: user.name,
        bookerEmail: user.email,
        studentId: user.studentId || "",
      }));
    }
  }, [user]);

  // Redirect if no room data
  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Lỗi đặt phòng</h1>
            <p className="text-gray-600 mt-2">
              Không có thông tin phòng để đặt.
            </p>
            <Link to="/rooms">
              <Button className="mt-4">Quay lại danh sách phòng</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Time slots for selection
  const timeSlots = [
    { value: "07:00-08:30", label: "07:00 - 08:30 (Tiết 1-2)" },
    { value: "08:40-10:10", label: "08:40 - 10:10 (Tiết 3-4)" },
    { value: "10:15-11:45", label: "10:15 - 11:45 (Tiết 5-6)" },
    { value: "13:00-14:30", label: "13:00 - 14:30 (Tiết 7-8)" },
    { value: "14:35-16:05", label: "14:35 - 16:05 (Tiết 9-10)" },
    { value: "16:10-17:40", label: "16:10 - 17:40 (Tiết 11-12)" },
  ];

  const parseEquipment = (room: any): string[] => {
    if (room?.equipment) {
      return room.equipment;
    }
    if (room?.Co_so_vat_chat) {
      try {
        const cleaned = room.Co_so_vat_chat.replace(/'/g, '"');
        return JSON.parse(cleaned);
      } catch {
        return room.Co_so_vat_chat.split(",").map((item: string) =>
          item.trim().replace(/[\[\]']/g, ""),
        );
      }
    }
    return [];
  };

  const equipment = parseEquipment(room);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedDate || !formData.selectedTime) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create booking in MongoDB
      const bookingData = {
        Ma_phong: room.Ma_phong || room.id,
        Ngay: format(selectedDate, "dd/MM/yyyy"),
        Email: formData.bookerEmail,
        Ma_nguoi_dung: formData.studentId || user.id,
        Ten_nguoi_dung: formData.bookerName,
        Ly_do: formData.purpose,
        Ca: formData.selectedTime,
        Ngay_dat: format(new Date(), "dd/MM/yyyy"),
      };

      const newBooking = await bookingService.createBooking(bookingData);

      // Process with email system
      const emailResult = await processBookingRequest({
        id: newBooking._id || Date.now().toString(),
        roomId: room.Ma_phong || room.id,
        roomName: room.name || `Phòng ${room.So_phong}`,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: formData.selectedTime,
        bookerEmail: formData.bookerEmail,
        bookerName: formData.bookerName,
        purpose: formData.purpose,
        attendees: formData.attendees,
      });

      if (emailResult.approved || newBooking.trang_thai === "confirmed") {
        navigate("/booking/confirmation", {
          state: {
            bookingData: {
              id: newBooking._id,
              roomName: room.name || `Phòng ${room.So_phong}`,
              roomBuilding: `Tòa ${room.Co_so || room.building}`,
              roomFloor:
                room.floor ||
                `Tầng ${Math.floor((room.So_phong || 200) / 100)}`,
              date: format(selectedDate, "dd/MM/yyyy"),
              time: formData.selectedTime,
              attendees: formData.attendees,
              purpose: formData.purpose,
              bookerName: formData.bookerName,
              bookerEmail: formData.bookerEmail,
              phone: formData.phone,
              studentId: formData.studentId,
              notes: formData.notes,
              status: newBooking.trang_thai || "confirmed",
            },
          },
        });
      } else {
        alert(`Đặt phòng bị từ chối: ${emailResult.reason}`);
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("Có lỗi xảy ra khi đặt phòng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to={`/rooms/${room.So_phong || room.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại chi tiết phòng
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đặt phòng {room.name || `Phòng ${room.So_phong}`}
          </h1>
          <p className="text-gray-600">
            Điền thông tin để hoàn tất việc đặt phòng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2" />
                    Thông tin người đặt
                  </CardTitle>
                  <CardDescription>
                    Thông tin được tự động điền từ tài khoản của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bookerName">Họ và tên *</Label>
                      <Input
                        id="bookerName"
                        value={formData.bookerName}
                        onChange={(e) =>
                          handleInputChange("bookerName", e.target.value)
                        }
                        required
                        className="bg-blue-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentId">Mã sinh viên/Mã GV</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) =>
                          handleInputChange("studentId", e.target.value)
                        }
                        className="bg-blue-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bookerEmail">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="bookerEmail"
                          type="email"
                          value={formData.bookerEmail}
                          onChange={(e) =>
                            handleInputChange("bookerEmail", e.target.value)
                          }
                          required
                          className="pl-10 bg-blue-50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="pl-10"
                          placeholder="0123456789"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Chi tiết đặt phòng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Ngày sử dụng *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "dd/MM/yyyy", { locale: vi })
                            ) : (
                              <span>Chọn ngày</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="selectedTime">Khung giờ *</Label>
                      <Select
                        value={formData.selectedTime}
                        onValueChange={(value) =>
                          handleInputChange("selectedTime", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khung giờ" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="purpose">Mục đích sử dụng *</Label>
                      <Input
                        id="purpose"
                        value={formData.purpose}
                        onChange={(e) =>
                          handleInputChange("purpose", e.target.value)
                        }
                        required
                        placeholder="Ví dụ: Họp nhóm môn ABC, Seminar..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="attendees">Số lượng người tham gia</Label>
                      <div className="flex items-center space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleInputChange(
                              "attendees",
                              Math.max(1, formData.attendees - 1),
                            )
                          }
                          disabled={formData.attendees <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-medium w-12 text-center">
                          {formData.attendees}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleInputChange(
                              "attendees",
                              Math.min(
                                room.Suc_chua || room.capacity || 50,
                                formData.attendees + 1,
                              ),
                            )
                          }
                          disabled={
                            formData.attendees >=
                            (room.Suc_chua || room.capacity || 50)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Ghi chú thêm</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      placeholder="Yêu cầu đặc biệt hoặc ghi chú thêm..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="flex-1 bg-cmcBlue-600 hover:bg-cmcBlue-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt phòng"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(-1)}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </div>

          {/* Room Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Tóm tắt đặt phòng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Room Image */}
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=400&h=200&fit=crop&crop=center"
                    alt="Room preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Room Info */}
                <div>
                  <h3 className="font-semibold text-lg">
                    {room.name || `Phòng ${room.So_phong}`}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      Tòa {room.Co_so || room.building}
                      {room["Dien_tich (m2)"] &&
                        ` - ${room["Dien_tich (m2)"]}m²`}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      Sức chứa: {room.Suc_chua || room.capacity} người
                    </span>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tiện nghi</h4>
                  <div className="flex flex-wrap gap-2">
                    {equipment.slice(0, 4).map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {item === "Máy chiếu" && (
                          <Monitor className="h-3 w-3 mr-1" />
                        )}
                        {item === "Wifi" && <Wifi className="h-3 w-3 mr-1" />}
                        {item === "Điều hòa" && (
                          <Coffee className="h-3 w-3 mr-1" />
                        )}
                        {item}
                      </Badge>
                    ))}
                    {equipment.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{equipment.length - 4} khác
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Booking Summary */}
                {selectedDate && formData.selectedTime && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Chi tiết đặt phòng
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Ngày:</span>
                        <span>{format(selectedDate, "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Giờ:</span>
                        <span>{formData.selectedTime.replace("-", " - ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Số người:</span>
                        <span>{formData.attendees} người</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Auto-approval notice */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center text-green-800">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Tự động duyệt</span>
                  </div>
                  <p className="text-green-700 text-xs mt-1">
                    Hệ thống sẽ tự động duyệt và gửi email xác nhận nếu phòng
                    còn trống.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
