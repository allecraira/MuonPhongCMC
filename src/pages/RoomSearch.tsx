import { useState, useEffect, useCallback } from "react";
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
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { debounce } from "lodash";

const RoomSearch = () => {
  const [allRooms, setAllRooms] = useState<MongoRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<MongoRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    building: "all",
    capacity: "all",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((filters: typeof searchFilters) => {
      let filtered = allRooms;

      if (filters.name) {
        filtered = filtered.filter((room) =>
          room.Ma_phong.toLowerCase().includes(filters.name.toLowerCase()),
        );
      }

      if (filters.building && filters.building !== "all") {
        filtered = filtered.filter((room) => room.Co_so === filters.building);
      }

      if (filters.capacity && filters.capacity !== "all") {
        filtered = filtered.filter((room) => {
          if (filters.capacity === "small") return room.Suc_chua <= 30;
          if (filters.capacity === "medium")
            return room.Suc_chua > 30 && room.Suc_chua <= 60;
          if (filters.capacity === "large") return room.Suc_chua > 60;
          return true;
        });
      }

      setFilteredRooms(filtered);
    }, 300),
    [allRooms],
  );

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

  // Trigger search when filters change
  useEffect(() => {
    debouncedSearch(searchFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchFilters, debouncedSearch]);

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setSearchFilters({
      name: "",
      building: "all",
      capacity: "all",
    });
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Có sẵn
          </Badge>
        );
      case "booked":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Đã đặt
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Bảo trì
          </Badge>
        );
      default:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Có sẵn
          </Badge>
        );
    }
  };

  const parseEquipment = (equipmentString: string): string[] => {
    try {
      const cleaned = equipmentString.replace(/'/g, '"');
      return JSON.parse(cleaned);
    } catch {
      return equipmentString
        .split(",")
        .map((item) => item.trim().replace(/[\[\]']/g, ""));
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRooms = filteredRooms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Quay lại trang chủ"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại trang chủ
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Tìm kiếm phòng
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá và đặt phòng phù hợp với nhu cầu của bạn
          </p>
        </div>

        <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Search className="h-6 w-6 mr-3 text-blue-600" />
              Bộ lọc tìm kiếm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tên phòng
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Nhập mã phòng..."
                          value={searchFilters.name}
                          onChange={(e) =>
                            handleFilterChange("name", e.target.value)
                          }
                          className="pl-10 transition-all duration-200"
                          aria-label="Tìm kiếm theo mã phòng"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Nhập mã phòng (ví dụ: 101, 202) để tìm kiếm</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <label
                  htmlFor="building"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tòa nhà
                </label>
                <Select
                  value={searchFilters.building}
                  onValueChange={(value) => handleFilterChange("building", value)}
                >
                  <SelectTrigger
                    id="building"
                    className="transition-all duration-200"
                    aria-label="Chọn tòa nhà"
                  >
                    <SelectValue placeholder="Chọn tòa nhà" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="CS2">Tòa CS2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Sức chứa
                </label>
                <Select
                  value={searchFilters.capacity}
                  onValueChange={(value) => handleFilterChange("capacity", value)}
                >
                  <SelectTrigger
                    id="capacity"
                    className="transition-all duration-200"
                    aria-label="Chọn sức chứa"
                  >
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
              <div className="flex items-end gap-4">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="w-full transition-transform hover:scale-105"
                  aria-label="Xóa bộ lọc"
                >
                  <X className="h-5 w-5 mr-2" />
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden animate-pulse shadow-md"
              >
                <div className="aspect-video bg-gray-200"></div>
                <CardHeader>
                  <div className="h-7 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))
          ) : filteredRooms.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-md">
              <Building2 className="h-16 w-16 mx-auto mb-4 text-blue-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Không tìm thấy phòng
              </h3>
              <p className="text-gray-600 mb-4">
                Thử xóa bộ lọc hoặc thay đổi tiêu chí tìm kiếm để xem thêm kết quả.
              </p>
              <Button
                onClick={handleClearFilters}
                className="bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105"
              >
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            currentRooms.map((room) => {
              const equipment = parseEquipment(room.Co_so_vat_chat);

              return (
                <Card
                  key={room._id}
                  className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link
                    to={`/rooms/${room.So_phong}`}
                    state={{ room }}
                    aria-label={`Xem chi tiết phòng ${room.So_phong}`}
                  >
                    <div className="aspect-video bg-gray-200 relative">
                      <div className="absolute top-4 left-4">
                        {getStatusBadge(room.trang_thai)}
                      </div>
                      <img
                        src={`https://flc.cmc-u.edu.vn/wp-content/uploads/2023/03/307378429_160761036556717_8736783004804453023_n-600x600.jpg`}
                        alt={`Phòng ${room.So_phong}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 hidden">
                        <div className="text-gray-400 text-lg">
                          📷 Không có hình ảnh
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-semibold">
                          Phòng {room.So_phong}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="text-sm border-blue-200"
                        >
                          <Users className="h-4 w-4 mr-1 text-blue-600" />
                          {room.Suc_chua} người
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center text-gray-600 text-base">
                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                        Tòa {room.Co_so} - {room["Dien_tich (m2)"]}m²
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3 mb-4">
                        {equipment.slice(0, 3).map((item, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm px-3 py-1 bg-blue-100 text-blue-800"
                          >
                            {item === "Máy chiếu" && (
                              <Monitor className="h-4 w-4 mr-1" />
                            )}
                            {item === "Wifi" && (
                              <Wifi className="h-4 w-4 mr-1" />
                            )}
                            {item === "Điều hòa" && (
                              <Coffee className="h-4 w-4 mr-1" />
                            )}
                            {item === "Bảng trắng" && (
                              <Projector className="h-4 w-4 mr-1" />
                            )}
                            {item}
                          </Badge>
                        ))}
                        {equipment.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-sm px-3 py-1 bg-blue-100 text-blue-800"
                          >
                            +{equipment.length - 3} khác
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 line-clamp-2 text-base">
                        {room.Mo_ta || "Phòng học hiện đại, phù hợp cho học tập và hội thảo."}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })
          )}
        </div>

        {!isLoading && filteredRooms.length > 0 && (
          <div className="mt-10 space-y-6">
            {/* Pagination Info */}
            <div className="text-center text-gray-600 text-lg">
              <p>
                Hiển thị{" "}
                <span className="font-semibold">{startIndex + 1}</span> đến{" "}
                <span className="font-semibold">{Math.min(endIndex, filteredRooms.length)}</span> 
                trong tổng số{" "}
                <span className="font-semibold">{filteredRooms.length}</span> phòng
              </p>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Trước</span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const shouldShow = 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1;
                    
                    if (shouldShow) {
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-10 h-10"
                        >
                          {page}
                        </Button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1"
                >
                  <span>Sau</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSearch;