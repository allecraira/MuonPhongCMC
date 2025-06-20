import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { roomService, MongoRoom } from "@/lib/mongodb";
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
  Building2,
} from "lucide-react";

const RoomSearch = () => {
  const [allRooms, setAllRooms] = useState<MongoRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<MongoRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    building: "all",
    capacity: "all",
  });

  // Load rooms from MongoDB on component mount
  useEffect(() => {
    const loadRooms = async () => {
      try {
        console.log("📚 Loading rooms from database...");
        setIsLoading(true);
        const rooms = await roomService.getAllRooms();
        setAllRooms(rooms);
        setFilteredRooms(rooms);
        console.log("✅ Loaded", rooms.length, "rooms from database");
      } catch (error) {
        console.error("❌ Error loading rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, []);

  const handleSearch = () => {
    let filtered = allRooms;

    if (searchFilters.name) {
      filtered = filtered.filter((room) =>
        room.Ma_phong.toLowerCase().includes(searchFilters.name.toLowerCase()),
      );
    }

    if (searchFilters.building && searchFilters.building !== "all") {
      filtered = filtered.filter(
        (room) => room.Co_so === searchFilters.building,
      );
    }

    if (searchFilters.capacity && searchFilters.capacity !== "all") {
      filtered = filtered.filter((room) => {
        if (searchFilters.capacity === "small") return room.Suc_chua <= 30;
        if (searchFilters.capacity === "medium")
          return room.Suc_chua > 30 && room.Suc_chua <= 60;
        if (searchFilters.capacity === "large") return room.Suc_chua > 60;
        return true;
      });
    }

    setFilteredRooms(filtered);
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>;
      case "booked":
        return <Badge className="bg-red-100 text-red-800">Đã đặt</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Bảo trì</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Có sẵn</Badge>;
    }
  };

  const parseEquipment = (equipmentString: string): string[] => {
    try {
      // Remove quotes and parse the array string
      const cleaned = equipmentString.replace(/'/g, '"');
      return JSON.parse(cleaned);
    } catch {
      // Fallback: split by comma
      return equipmentString
        .split(",")
        .map((item) => item.trim().replace(/[\[\]']/g, ""));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
                    <SelectItem value="VPC2">Tòa VPC2</SelectItem>
                    <SelectItem value="VPC1">Tòa VPC1</SelectItem>
                    <SelectItem value="VPC3">Tòa VPC3</SelectItem>
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
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </CardContent>
              </Card>
            ))
          ) : filteredRooms.length === 0 ? (
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
            filteredRooms.map((room) => {
              const equipment = parseEquipment(room.Co_so_vat_chat);

              return (
                <Card
                  key={room._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <Link to={`/rooms/${room.So_phong}`} state={{ room }}>
                    <div className="aspect-video bg-gray-200 relative">
                      <div className="absolute top-4 left-4">
                        {getStatusBadge(room.trang_thai)}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-gray-400">📷 Hình ảnh phòng</div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">
                          Phòng {room.So_phong}
                        </CardTitle>
                        <Badge variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          {room.Suc_chua} người
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        Tòa {room.Co_so} - {room["Dien_tich (m2)"]}m²
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {equipment.slice(0, 3).map((item, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {item === "Máy chiếu" && (
                              <Monitor className="h-3 w-3 mr-1" />
                            )}
                            {item === "Wifi" && (
                              <Wifi className="h-3 w-3 mr-1" />
                            )}
                            {item === "Điều hòa" && (
                              <Coffee className="h-3 w-3 mr-1" />
                            )}
                            {item === "Bảng trắng" && (
                              <Projector className="h-3 w-3 mr-1" />
                            )}
                            {item}
                          </Badge>
                        ))}
                        {equipment.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{equipment.length - 3} khác
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {room.Mo_ta}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })
          )}
        </div>

        {/* Summary */}
        {!isLoading && filteredRooms.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>
              Hiển thị {filteredRooms.length} phòng trong tổng số{" "}
              {allRooms.length} phòng
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSearch;
