import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotification } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import {
  userService,
  roomService,
  bookingService,
  MongoUser,
  MongoRoom,
  MongoBookingHistory,
} from "@/lib/mongodb";
import {
  sendBookingConfirmation,
  sendBookingRejection,
} from "@/lib/emailService";
import {
  Users,
  Building2,
  Calendar,
  BarChart3,
  Settings,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  ArrowLeft,
  Mail,
  Phone,
  Hash,
  Loader2,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

const PCTSVDashboard = () => {
  const { user, logout } = useAuth();
  const { showBoss, showError, showWarning, showSuccess } = useNotification();
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [rooms, setRooms] = useState<MongoRoom[]>([]);
  const [bookings, setBookings] = useState<MongoBookingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<MongoRoom | null>(null);
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<MongoBookingHistory | null>(null);
  const [showAddRoomDialog, setShowAddRoomDialog] = useState(false);
  const [newRoom, setNewRoom] = useState<Partial<MongoRoom>>({
    Ma_phong: "",
    So_phong: 0,
    Co_so: "CS2",
    Suc_chua: 0,
    "Dien_tich (m2)": 0,
    trang_thai: "available",
    Co_so_vat_chat: "",
    Mo_ta: "",
    Quy_dinh: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRoom, setEditingRoom] = useState<MongoRoom | null>(null);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("📊 Loading PCTSV dashboard data...");

        const [roomsData, bookingsData] = await Promise.all([
          roomService.getAllRooms(),
          bookingService.getAllBookings(),
        ]);

        setRooms(roomsData);
        setBookings(bookingsData);

        console.log("✅ PCTSV data loaded:", {
          rooms: roomsData.length,
          bookings: bookingsData.length,
        });
      } catch (error) {
        console.error("❌ Error loading PCTSV data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Đã duyệt</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không rõ</Badge>;
    }
  };

  const handleApproveBooking = async (booking: MongoBookingHistory) => {
    try {
      const success = await bookingService.updateBookingStatus(booking._id || "", "confirmed");
      if (success) {
        setBookings(bookings.map(b => 
          b._id === booking._id ? { ...b, trang_thai: "confirmed" } : b
        ));
        showSuccess("Thành công!", "Duyệt đặt phòng thành công! Boss đã approve! 👑");
      } else {
        showError("Lỗi!", "Không thể duyệt đặt phòng!");
      }
    } catch (error) {
      console.error("Error approving booking:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi duyệt đặt phòng! ❌");
    }
  };

  const handleRejectBooking = async (booking: MongoBookingHistory) => {
    if (!confirm("🚫 Bạn có chắc chắn muốn từ chối đặt phòng này?")) {
      return;
    }

    try {
      const success = await bookingService.updateBookingStatus(booking._id || "", "cancelled");
      if (success) {
        setBookings(bookings.map(b => 
          b._id === booking._id ? { ...b, trang_thai: "cancelled" } : b
        ));
        showWarning("Đã từ chối!", "Từ chối đặt phòng thành công! Boss đã approve! 👑");
      } else {
        showError("Lỗi!", "Không thể từ chối đặt phòng!");
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi từ chối đặt phòng! ❌");
    }
  };

  const handleAddRoom = async () => {
    if (!newRoom.Ma_phong || !newRoom.So_phong || !newRoom.Suc_chua) {
      showWarning("Thiếu thông tin!", "Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    setIsSubmitting(true);
    try {
      const roomData = {
        ...newRoom,
        Ma_phong: newRoom.Ma_phong,
        So_phong: newRoom.So_phong,
        Suc_chua: newRoom.Suc_chua,
      } as Omit<MongoRoom, "_id">;
      
      const createdRoom = await roomService.createRoom(roomData);
      setRooms([...rooms, createdRoom]);
      setNewRoom({
        Ma_phong: "",
        So_phong: 0,
        Co_so: "CS2",
        Suc_chua: 0,
        "Dien_tich (m2)": 0,
        trang_thai: "available",
        Co_so_vat_chat: "",
        Mo_ta: "",
        Quy_dinh: "",
      });
      setShowAddRoomDialog(false);
      showBoss("Thành công!", "Thêm phòng thành công! Boss đã approve! 👑");
    } catch (error) {
      console.error("Error adding room:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi thêm phòng! ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRoom = async (room: MongoRoom) => {
    try {
      const success = await roomService.updateRoom(room.Ma_phong, {
        So_phong: room.So_phong,
        Co_so: room.Co_so,
        "Dien_tich (m2)": room["Dien_tich (m2)"],
        Co_so_vat_chat: room.Co_so_vat_chat,
        Suc_chua: room.Suc_chua,
        Mo_ta: room.Mo_ta,
        Quy_dinh: room.Quy_dinh,
        trang_thai: room.trang_thai
      });

      if (success) {
        setRooms(rooms.map(r => r._id === room._id ? room : r));
        setShowRoomDialog(false);
        alert("Cập nhật phòng thành công!");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Có lỗi xảy ra khi cập nhật phòng");
    }
  };

  const handleEditRoom = (room: MongoRoom) => {
    setEditingRoom({ ...room });
    setSelectedRoom(room);
    setShowRoomDialog(true);
  };

  const handleSaveRoomEdit = async () => {
    if (!selectedRoom) return;

    setIsSubmitting(true);
    try {
      const success = await roomService.updateRoom(selectedRoom.Ma_phong, selectedRoom);
      if (success) {
        setRooms(rooms.map(r => r._id === selectedRoom._id ? selectedRoom : r));
        setShowRoomDialog(false);
        setSelectedRoom(null);
        showBoss("Thành công!", "Cập nhật phòng thành công! Boss đã approve! 👑");
      } else {
        showError("Lỗi!", "Không thể cập nhật phòng!");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi cập nhật phòng! ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm("🗑️ Bạn có chắc chắn muốn xóa phòng này?")) {
      return;
    }

    try {
      const success = await roomService.deleteRoom(roomId);
      if (success) {
        setRooms(rooms.filter(r => r._id !== roomId));
        showBoss("Thành công!", "Xóa phòng thành công! Boss đã approve! 👑");
      } else {
        showError("Lỗi!", "Không tìm thấy phòng để xóa!");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi xóa phòng! ❌");
    }
  };

  // Calculate room stats
  const roomStats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter((r) => r.trang_thai === "available").length,
    bookedRooms: rooms.filter((r) => r.trang_thai === "booked").length,
    monthlyBookings: bookings.length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto" />
            <p className="mt-4 text-gray-600">Đang tải dữ liệu PCTSV...</p>
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
                <div className="p-2 bg-purple-100 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-gray-900">
                    PCTSV Dashboard
                  </div>
                  <div className="text-xs text-gray-500">Quản lý phòng học</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Xin chào, {user?.name}
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay về trang chủ
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bảng điều khiển PCTSV
          </h1>
          <p className="text-gray-600">
            Quản lý phòng học, đặt phòng và thống kê sử dụng
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Tổng số phòng</span>
                <Building2 className="h-4 w-4 text-purple-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roomStats.totalRooms}</div>
              <p className="text-xs text-muted-foreground">
                {[...new Set(rooms.map((r) => r.Co_so))].length} tòa nhà
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Phòng trống</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roomStats.availableRooms}
              </div>
              <p className="text-xs text-muted-foreground">Có thể đặt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Đang sử dụng</span>
                <Users className="h-4 w-4 text-blue-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roomStats.bookedRooms}</div>
              <p className="text-xs text-muted-foreground">Đã đặt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Đặt phòng</span>
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roomStats.monthlyBookings}
              </div>
              <p className="text-xs text-muted-foreground">
                {bookings.filter((b) => b.trang_thai === "pending").length} chờ
                duyệt
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList>
            <TabsTrigger value="rooms">Quản lý phòng</TabsTrigger>
            <TabsTrigger value="bookings">Duyệt đặt phòng</TabsTrigger>
            <TabsTrigger value="statistics">Thống kê</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý phòng học</CardTitle>
                    <CardDescription>
                      Xem và quản lý thông tin phòng học trong hệ thống
                    </CardDescription>
                  </div>
                  <Dialog open={showAddRoomDialog} onOpenChange={setShowAddRoomDialog}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setShowAddRoomDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm phòng
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Thêm phòng mới</DialogTitle>
                        <DialogDescription>
                          Nhập thông tin phòng học mới
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="room-id">Mã phòng *</Label>
                            <Input
                              id="room-id"
                              placeholder="CS2_101"
                              value={newRoom.Ma_phong}
                              onChange={(e) => setNewRoom({...newRoom, Ma_phong: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="room-number">Số phòng *</Label>
                            <Input
                              id="room-number"
                              placeholder="101"
                              type="number"
                              value={newRoom.So_phong || ""}
                              onChange={(e) => setNewRoom({...newRoom, So_phong: parseInt(e.target.value) || 0})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="building">Tòa nhà</Label>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={newRoom.Co_so}
                              onChange={(e) => setNewRoom({...newRoom, Co_so: e.target.value})}
                            >
                              <option value="CS2">Tòa CS2</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="capacity">Sức chứa *</Label>
                            <Input
                              id="capacity"
                              type="number"
                              placeholder="50"
                              value={newRoom.Suc_chua || ""}
                              onChange={(e) => setNewRoom({...newRoom, Suc_chua: parseInt(e.target.value) || 0})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="area">Diện tích (m²)</Label>
                            <Input 
                              id="area" 
                              type="number" 
                              placeholder="45"
                              value={newRoom["Dien_tich (m2)"] || ""}
                              onChange={(e) => setNewRoom({...newRoom, "Dien_tich (m2)": parseInt(e.target.value) || 0})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="status">Trạng thái</Label>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={newRoom.trang_thai}
                              onChange={(e) => setNewRoom({...newRoom, trang_thai: e.target.value as any})}
                            >
                              <option value="available">Có sẵn</option>
                              <option value="maintenance">Bảo trì</option>
                              <option value="booked">Đã đặt</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="equipment">Trang thiết bị</Label>
                          <Textarea
                            id="equipment"
                            placeholder="Máy chiếu, Wifi, Điều hòa..."
                            rows={3}
                            value={newRoom.Co_so_vat_chat}
                            onChange={(e) => setNewRoom({...newRoom, Co_so_vat_chat: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Mô tả</Label>
                          <Textarea
                            id="description"
                            placeholder="Mô tả chi tiết về phòng học..."
                            rows={2}
                            value={newRoom.Mo_ta}
                            onChange={(e) => setNewRoom({...newRoom, Mo_ta: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rules">Quy định</Label>
                          <Textarea
                            id="rules"
                            placeholder="Quy định sử dụng phòng..."
                            rows={2}
                            value={newRoom.Quy_dinh}
                            onChange={(e) => setNewRoom({...newRoom, Quy_dinh: e.target.value})}
                          />
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={handleAddRoom}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Đang thêm..." : "Thêm phòng"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Tòa nhà</TableHead>
                      <TableHead>Diện tích</TableHead>
                      <TableHead>Sức chứa</TableHead>
                      <TableHead>Trang thiết bị</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => {
                      const equipment = parseEquipment(room.Co_so_vat_chat);
                      return (
                        <TableRow key={room._id}>
                          <TableCell className="font-medium">
                            Phòng {room.So_phong}
                          </TableCell>
                          <TableCell>Tòa {room.Co_so}</TableCell>
                          <TableCell>{room["Dien_tich (m2)"]}m²</TableCell>
                          <TableCell>{room.Suc_chua} người</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {equipment.slice(0, 2).map((item, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {item}
                                </Badge>
                              ))}
                              {equipment.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{equipment.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                room.trang_thai === "available"
                                  ? "bg-green-100 text-green-800"
                                  : room.trang_thai === "maintenance"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {room.trang_thai === "available"
                                ? "Có sẵn"
                                : room.trang_thai === "maintenance"
                                  ? "Bảo trì"
                                  : "Đã đặt"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  handleEditRoom(room);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteRoom(room._id || "")}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Duyệt yêu cầu đặt phòng</CardTitle>
                <CardDescription>
                  Xem và duyệt các yêu cầu đặt phòng từ sinh viên và giảng viên
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Người đặt</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Ca</TableHead>
                      <TableHead>Mục đích</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell className="font-medium">
                          {booking.Ma_phong}
                        </TableCell>
                        <TableCell>{booking.Ten_nguoi_dung}</TableCell>
                        <TableCell>{booking.Ngay}</TableCell>
                        <TableCell>{booking.Ca}</TableCell>
                        <TableCell>{booking.Ly_do}</TableCell>
                        <TableCell>
                          {getStatusBadge(booking.trang_thai || "pending")}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowBookingDialog(true);
                              }}
                            >
                              Chi tiết
                            </Button>
                            {booking.trang_thai === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveBooking(booking)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectBooking(booking)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Thống kê sử dụng phòng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...new Set(rooms.map((r) => r.Co_so))].map((building) => {
                      const buildingRooms = rooms.filter(
                        (r) => r.Co_so === building,
                      );
                      const availableCount = buildingRooms.filter(
                        (r) => r.trang_thai === "available",
                      ).length;
                      const percentage =
                        buildingRooms.length > 0
                          ? (availableCount / buildingRooms.length) * 100
                          : 0;

                      return (
                        <div
                          key={building}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm">Tòa {building}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {availableCount}/{buildingRooms.length}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Thống kê đặt phòng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {bookings.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Tổng số đặt phòng
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-semibold text-green-600">
                          {
                            bookings.filter((b) => b.trang_thai === "confirmed")
                              .length
                          }
                        </div>
                        <div className="text-xs text-gray-600">Đã duyệt</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-yellow-600">
                          {
                            bookings.filter((b) => b.trang_thai === "pending")
                              .length
                          }
                        </div>
                        <div className="text-xs text-gray-600">Chờ duyệt</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-red-600">
                          {
                            bookings.filter((b) => b.trang_thai === "cancelled")
                              .length
                          }
                        </div>
                        <div className="text-xs text-gray-600">Đã hủy</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Room Edit Dialog */}
      <Dialog open={showRoomDialog} onOpenChange={setShowRoomDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa phòng</DialogTitle>
            <DialogDescription>Cập nhật thông tin phòng học</DialogDescription>
          </DialogHeader>
          {editingRoom && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-room-id">Mã phòng</Label>
                  <Input
                    id="edit-room-id"
                    value={editingRoom.Ma_phong}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-room-number">Số phòng</Label>
                  <Input
                    id="edit-room-number"
                    value={editingRoom.So_phong}
                    type="number"
                    onChange={(e) => setEditingRoom({...editingRoom, So_phong: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-building">Tòa nhà</Label>
                  <select
                    id="edit-building"
                    value={editingRoom.Co_so}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    onChange={(e) => setEditingRoom({...editingRoom, Co_so: e.target.value})}
                  >
                    <option value="CS2">Tòa CS2</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Sức chứa</Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    value={editingRoom.Suc_chua}
                    onChange={(e) => setEditingRoom({...editingRoom, Suc_chua: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-area">Diện tích (m²)</Label>
                  <Input
                    id="edit-area"
                    type="number"
                    value={editingRoom["Dien_tich (m2)"]}
                    onChange={(e) => setEditingRoom({...editingRoom, "Dien_tich (m2)": parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Trạng thái</Label>
                  <select
                    id="edit-status"
                    value={editingRoom.trang_thai}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    onChange={(e) => setEditingRoom({...editingRoom, trang_thai: e.target.value as any})}
                  >
                    <option value="available">Có sẵn</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="booked">Đã đặt</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-equipment">Trang thiết bị</Label>
                <Textarea
                  id="edit-equipment"
                  value={editingRoom.Co_so_vat_chat}
                  rows={3}
                  onChange={(e) => setEditingRoom({...editingRoom, Co_so_vat_chat: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={editingRoom.Mo_ta}
                  rows={2}
                  onChange={(e) => setEditingRoom({...editingRoom, Mo_ta: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-rules">Quy định</Label>
                <Textarea
                  id="edit-rules"
                  value={editingRoom.Quy_dinh}
                  rows={2}
                  onChange={(e) => setEditingRoom({...editingRoom, Quy_dinh: e.target.value})}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  className="flex-1" 
                  onClick={handleSaveRoomEdit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowRoomDialog(false);
                    setEditingRoom(null);
                  }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết đặt phòng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về yêu cầu đặt phòng
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
                  <div className="text-sm font-medium text-gray-600">
                    Người đặt
                  </div>
                  <div className="text-sm">
                    {selectedBooking.Ten_nguoi_dung}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Ngày</div>
                  <div className="text-sm">{selectedBooking.Ngay}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Ca học
                  </div>
                  <div className="text-sm">{selectedBooking.Ca}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Mục đích
                </div>
                <div className="text-sm">{selectedBooking.Ly_do}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Email liên hệ
                </div>
                <div className="text-sm">{selectedBooking.Email}</div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                {getStatusBadge(selectedBooking.trang_thai || "pending")}
                <div className="text-xs text-gray-500">
                  Ngày đặt: {selectedBooking.Ngay_dat}
                </div>
              </div>
              {selectedBooking.trang_thai === "pending" && (
                <div className="flex space-x-2 pt-4">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApproveBooking(selectedBooking);
                      setShowBookingDialog(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Duyệt
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleRejectBooking(selectedBooking);
                      setShowBookingDialog(false);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Từ chối
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PCTSVDashboard;
