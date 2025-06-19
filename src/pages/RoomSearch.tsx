import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Projector,
  Coffee,
} from "lucide-react";

// Mock room data
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

const RoomSearch = () => {
  const { user, logout } = useAuth();
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    building: "all",
    capacity: "all",
  });
  const [filteredRooms, setFilteredRooms] = useState(allRooms);

  const handleSearch = () => {
    let filtered = allRooms;

    if (searchFilters.name) {
      filtered = filtered.filter((room) =>
        room.name.toLowerCase().includes(searchFilters.name.toLowerCase()),
      );
    }

    if (searchFilters.building && searchFilters.building !== "all") {
      filtered = filtered.filter(
        (room) => room.building === searchFilters.building,
      );
    }

    if (searchFilters.capacity && searchFilters.capacity !== "all") {
      const capacity = parseInt(searchFilters.capacity);
      filtered = filtered.filter((room) => {
        if (searchFilters.capacity === "small") return room.capacity <= 30;
        if (searchFilters.capacity === "medium")
          return room.capacity > 30 && room.capacity <= 60;
        if (searchFilters.capacity === "large") return room.capacity > 60;
        return true;
      });
    }

    setFilteredRooms(filtered);
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>;
      case "booked":
        return <Badge className="bg-red-100 text-red-800">Đã đặt</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Bảo trì</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không rõ</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                  alt="CMC Room Booking"
                  className="h-8 w-8"
                />
                <div className="text-left">
                  <div className="text-lg font-bold text-cmc-600">
                    CMC Room Booking
                  </div>
                  <div className="text-xs text-gray-500">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/rooms"
                className="text-gray-900 hover:text-cmc-600 transition-colors"
              >
                Danh sách phòng
              </Link>
              <Link
                to="#"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Giới thiệu
              </Link>
              <Link
                to="#"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Liên hệ
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <Link to="/profile">
                    <Button variant="outline" size="sm">
                      {user.name}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button className="bg-cmcBlue-600 hover:bg-cmcBlue-700">
                    Đăng nhập
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại trang chủ
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Danh sách phòng
          </h1>
          <p className="text-gray-600">
            Tìm kiếm và đặt phòng phù hợp với nhu cầu của bạn
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Tìm kiếm phòng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên phòng
                </label>
                <Input
                  placeholder="Nhập tên phòng..."
                  value={searchFilters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tòa nhà
                </label>
                <Select
                  value={searchFilters.building}
                  onValueChange={(value) =>
                    handleFilterChange("building", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tòa nhà" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="CS1">Tòa CS1</SelectItem>
                    <SelectItem value="CS2">Tòa CS2</SelectItem>
                    <SelectItem value="CS3">Tòa CS3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sức chứa
                </label>
                <Select
                  value={searchFilters.capacity}
                  onValueChange={(value) =>
                    handleFilterChange("capacity", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Số người" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="small">10-30 người</SelectItem>
                    <SelectItem value="medium">30-60 người</SelectItem>
                    <SelectItem value="large">60+ người</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-cmcBlue-600 hover:bg-cmcBlue-700"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">
                  Không tìm thấy phòng
                </h3>
                <p>Thử điều chỉnh tiêu chí tìm kiếm để xem thêm kết quả</p>
              </div>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <Card
                key={room.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Link to={`/rooms/${room.id}`}>
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(room.status)}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-400">📷 Hình ảnh phòng</div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{room.name}</CardTitle>
                      <Badge variant="outline">{room.capacity} người</Badge>
                    </div>
                    <CardDescription className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {room.floor}, Tòa {room.building}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.equipment.map((item, index) => (
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
                    </div>
                    <p className="text-sm text-gray-600">{room.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))
          )}

          {/* Room 202 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/rooms/202">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-100 text-red-800">Đã đặt</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400">📷 Hình ảnh phòng</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Phòng 202</CardTitle>
                  <Badge variant="outline">30 người</Badge>
                </div>
                <CardDescription className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  Tầng 2, Tòa CS1
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    <Monitor className="h-3 w-3 mr-1" />
                    Máy chiếu
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    Wifi
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Phòng họp nhỏ thích hợp cho các buổi thảo luận nhóm và
                  seminar.
                </p>
              </CardContent>
            </Link>
          </Card>

          {/* Room 301 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/rooms/301">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400">📷 Hình ảnh phòng</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Phòng 301</CardTitle>
                  <Badge variant="outline">80 người</Badge>
                </div>
                <CardDescription className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  Tầng 3, Tòa CS2
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    <Monitor className="h-3 w-3 mr-1" />
                    Máy chiếu
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Projector className="h-3 w-3 mr-1" />
                    Bảng trắng
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    Wifi
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Hội trường lớn phù hợp cho các sự kiện, hội thảo và buổi
                  thuyết trình.
                </p>
              </CardContent>
            </Link>
          </Card>

          {/* Additional rooms */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/rooms/302">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400">📷 Hình ảnh phòng</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Phòng 302</CardTitle>
                  <Badge variant="outline">25 người</Badge>
                </div>
                <CardDescription className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  Tầng 3, Tòa CS2
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    <Monitor className="h-3 w-3 mr-1" />
                    Máy chiếu
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    Wifi
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Phòng lab máy tính với trang thiết bị hiện đại cho thực hành
                  lập trình.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/rooms/401">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Bảo trì
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400">📷 Hình ảnh phòng</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Phòng 401</CardTitle>
                  <Badge variant="outline">40 người</Badge>
                </div>
                <CardDescription className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  Tầng 4, Tòa CS3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    <Monitor className="h-3 w-3 mr-1" />
                    Máy chiếu
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    Wifi
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Phòng đa năng thích hợp cho các hoạt động học tập và sự kiện
                  sinh viên.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/rooms/402">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400">📷 Hình ảnh phòng</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Phòng 402</CardTitle>
                  <Badge variant="outline">60 người</Badge>
                </div>
                <CardDescription className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  Tầng 4, Tòa CS3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    <Monitor className="h-3 w-3 mr-1" />
                    Máy chiếu
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Coffee className="h-3 w-3 mr-1" />
                    Điều hòa
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    Wifi
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Phòng học lớn với âm thanh ánh sáng tốt, phù hợp cho các bài
                  giảng.
                </p>
              </CardContent>
            </Link>
          </Card>
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
                dành cho sinh viên Tr��ờng Đại học CMC.
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

export default RoomSearch;
