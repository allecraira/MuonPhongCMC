import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Coffee,
  Clock,
  CheckCircle,
  ImageIcon,
} from "lucide-react";
import { useState } from "react";

// Mock room data - in production this would come from MongoDB
const allRooms = [
  {
    id: "201",
    name: "Phòng 201",
    building: "CS1",
    floor: "Tầng 2",
    capacity: 50,
    status: "available",
    equipment: ["Máy chiếu", "Wifi", "Điều hòa"],
    description:
      "Phòng học hiện đại với đầy đủ trang thiết bị phục vụ việc học tập và họp nhóm.",
  },
  {
    id: "202",
    name: "Phòng 202",
    building: "CS1",
    floor: "Tầng 2",
    capacity: 30,
    status: "booked",
    equipment: ["Máy chiếu", "Wifi"],
    description:
      "Phòng họp nhỏ thích hợp cho các buổi thảo luận nhóm và seminar.",
  },
  {
    id: "301",
    name: "Phòng 301",
    building: "CS2",
    floor: "Tầng 3",
    capacity: 80,
    status: "available",
    equipment: ["Máy chiếu", "Bảng trắng", "Wifi"],
    description:
      "Hội trường lớn phù hợp cho các sự kiện, hội thảo và buổi thuyết trình.",
  },
  {
    id: "302",
    name: "Phòng 302",
    building: "CS2",
    floor: "Tầng 3",
    capacity: 25,
    status: "available",
    equipment: ["Máy chiếu", "Wifi"],
    description:
      "Phòng lab máy tính với trang thiết bị hiện đại cho thực hành lập trình.",
  },
  {
    id: "401",
    name: "Phòng 401",
    building: "CS3",
    floor: "Tầng 4",
    capacity: 40,
    status: "maintenance",
    equipment: ["Máy chiếu", "Wifi"],
    description:
      "Phòng đa năng thích hợp cho các hoạt động học tập và sự kiện sinh viên.",
  },
  {
    id: "402",
    name: "Phòng 402",
    building: "CS3",
    floor: "Tầng 4",
    capacity: 60,
    status: "available",
    equipment: ["Máy chiếu", "Điều hòa", "Wifi"],
    description:
      "Phòng học lớn với âm thanh ánh sáng tốt, phù hợp cho các bài giảng.",
  },
];

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  // Get room data from location state or find by ID
  const room = location.state?.room || allRooms.find((r) => r.id === id);

  // Helper function to parse equipment from MongoDB format
  const parseEquipment = (room: any): string[] => {
    if (room?.equipment) {
      return room.equipment; // Original format
    }
    if (room?.Co_so_vat_chat) {
      try {
        // MongoDB format - parse JSON string
        const cleaned = room.Co_so_vat_chat.replace(/'/g, '"');
        return JSON.parse(cleaned);
      } catch {
        // Fallback: split by comma
        return room.Co_so_vat_chat.split(",").map((item: string) =>
          item.trim().replace(/[\[\]']/g, ""),
        );
      }
    }
    return []; // Default empty array
  };

  // Get equipment array safely
  const equipment = parseEquipment(room);

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Không tìm thấy phòng
            </h1>
            <p className="text-gray-600 mt-2">
              Phòng bạn tìm kiếm không tồn tại.
            </p>
            <Link to="/rooms">
              <Button className="mt-4">Quay lại danh sách phòng</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate("/booking", { state: { room, selectedDate } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/rooms"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách phòng
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Room Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {room.name || `Phòng ${room.So_phong}`}
                </h1>
                <Badge
                  className={
                    (room.status || room.trang_thai) === "available"
                      ? "bg-green-100 text-green-800"
                      : (room.status || room.trang_thai) === "booked"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {(room.status || room.trang_thai) === "available"
                    ? "Có sẵn"
                    : (room.status || room.trang_thai) === "booked"
                      ? "Đã đặt"
                      : "Bảo trì"}
                </Badge>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {room.floor || `Tòa ${room.Co_so}`}
                  {room.building && `, Tòa ${room.building}`}
                  {room["Dien_tich (m2)"] && ` - ${room["Dien_tich (m2)"]}m²`}
                </span>
                <Users className="h-5 w-5 ml-6 mr-2" />
                <span>{room.capacity || room.Suc_chua} người</span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="images">Hình ảnh</TabsTrigger>
                <TabsTrigger value="schedule">Lịch phòng</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin phòng</CardTitle>
                    <CardDescription>
                      Chi tiết và tiện nghi có sẵn
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Mô tả
                      </h4>
                      <p className="text-gray-600">{room.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Thiết bị có sẵn
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {equipment.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <div className="p-2 bg-blue-100 rounded-full">
                              {item === "Máy chiếu" && (
                                <Monitor className="h-4 w-4 text-blue-600" />
                              )}
                              {item === "Wifi" && (
                                <Wifi className="h-4 w-4 text-green-600" />
                              )}
                              {item === "Điều hòa" && (
                                <Coffee className="h-4 w-4 text-purple-600" />
                              )}
                              {item === "Bảng trắng" && (
                                <CheckCircle className="h-4 w-4 text-orange-600" />
                              )}
                              {![
                                "Máy chiếu",
                                "Wifi",
                                "Điều hòa",
                                "Bảng trắng",
                              ].includes(item) && (
                                <CheckCircle className="h-4 w-4 text-gray-600" />
                              )}
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Quy định sử dụng
                      </h4>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Giữ gìn vệ sinh và tài sản trong phòng</li>
                        <li>
                          • Không mang đồ ăn, thức uống vào phòng (trừ nước lọc)
                        </li>
                        <li>
                          • Không gây ồn ào, ảnh hưởng đến phòng xung quanh
                        </li>
                        <li>• Tắt điện, điều hòa khi ra khỏi phòng</li>
                        <li>• Báo cáo ngay khi có sự cố về thiết bị</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hình ảnh phòng</CardTitle>
                    <CardDescription>
                      Xem hình ảnh thực tế của phòng
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                          <p>Hình ảnh tổng quan phòng</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                          <p>Góc nhìn từ phía sau</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                          <p>Thiết bị máy chiếu</p>
                        </div>
                      </div>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                          <p>Bảng trắng và ghế ngồi</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch sử dụng phòng</CardTitle>
                    <CardDescription>
                      Xem lịch trình và tình trạng phòng
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">08:00 - 10:00</p>
                            <p className="text-sm text-gray-600">Hôm nay</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Có sẵn
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium">10:00 - 12:00</p>
                            <p className="text-sm text-gray-600">
                              Lớp Lập trình Java
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          Đã đặt
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">13:00 - 15:00</p>
                            <p className="text-sm text-gray-600">Hôm nay</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Có sẵn
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium">15:00 - 17:00</p>
                            <p className="text-sm text-gray-600">
                              Họp nhóm dự án
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          Đã đặt
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Đặt phòng này</CardTitle>
                <CardDescription>
                  Chọn thời gian và đặt phòng ngay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn ngày
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn khung giờ
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khung giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">
                        08:00 - 10:00 (Sáng)
                      </SelectItem>
                      <SelectItem value="afternoon">
                        13:00 - 15:00 (Chiều)
                      </SelectItem>
                      <SelectItem value="evening">
                        15:00 - 17:00 (Chiều muộn)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleBookNow}
                  className="w-full bg-cmcBlue-600 hover:bg-cmcBlue-700"
                  size="lg"
                >
                  Tiếp tục đặt phòng
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Vui lòng chọn ngày để đặt phòng trước
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                  alt="CMC Room Booking"
                  className="h-8 w-8"
                />
                <div>
                  <div className="font-bold text-white">CMC Room Booking</div>
                  <div className="text-xs text-gray-400">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Hệ thống đặt phòng trực tuyến hiện đại, tiện lợi và nhanh chóng
                dành cho sinh viên Trường Đại học CMC.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rooms"
                    className="hover:text-white transition-colors"
                  >
                    Danh sách phòng
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Liên hệ CTSY
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Quy định sử dụng
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📍 Số 236 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội</li>
                <li>📞 024 3755 6666</li>
                <li>✉️ support@cmc.edu.vn</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Trường Đại học CMC. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoomDetails;
