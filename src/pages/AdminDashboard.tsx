import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { userService, roomService, bookingService, MongoUser, MongoRoom, MongoBookingHistory } from "@/lib/mongodb";
import { useAuth } from "@/lib/auth";
import { useNotification } from "@/contexts/NotificationContext";
import { 
  PieChart, 
  BarChart3, 
  Users, 
  Building2, 
  Calendar, 
  UserPlus, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Settings,
  Shield,
  Crown
} from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { showBoss, showError, showWarning, showSuccess } = useNotification();
  
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [rooms, setRooms] = useState<MongoRoom[]>([]);
  const [bookings, setBookings] = useState<MongoBookingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dialog states
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddRoomDialog, setShowAddRoomDialog] = useState(false);
  
  // Selected items
  const [selectedUser, setSelectedUser] = useState<MongoUser | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<MongoRoom | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<MongoBookingHistory | null>(null);
  const [editingUser, setEditingUser] = useState<MongoUser | null>(null);
  const [editingRoom, setEditingRoom] = useState<MongoRoom | null>(null);
  
  // Form states
  const [newUser, setNewUser] = useState<Partial<MongoUser>>({
    ma_nguoi_dung: "",
    ten_nguoi_dung: "",
    ngay_sinh: "",
    gioi_tinh: "Nam",
    email: "",
    so_dien_thoai: 0,
    mat_khau: "123456",
    vai_tro: "student",
  });

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

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("👑 Loading Admin dashboard data...");

        const [usersData, roomsData, bookingsData] = await Promise.all([
          userService.getAllUsers(),
          roomService.getAllRooms(),
          bookingService.getAllBookings(),
        ]);

        setUsers(usersData);
        setRooms(roomsData);
        setBookings(bookingsData);

        console.log("✅ Admin data loaded:", {
          users: usersData.length,
          rooms: roomsData.length,
          bookings: bookingsData.length,
        });
      } catch (error) {
        console.error("❌ Error loading admin data:", error);
        showError("Lỗi!", "Không thể tải dữ liệu dashboard! ❌");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [showError]);

  // Pagination logic
  const filteredUsers = users.filter(user =>
    user.ten_nguoi_dung.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.ma_nguoi_dung.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRooms = rooms.filter(room =>
    room.Ma_phong.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.So_phong.toString().includes(searchTerm)
  );
  
  const filteredBookings = bookings.filter(booking =>
    booking.Ma_phong.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.Ten_nguoi_dung.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Parse equipment function
  const parseEquipment = (equipmentString: string): string[] => {
    if (!equipmentString) return [];
    try {
      const cleaned = equipmentString.replace(/'/g, '"');
      return JSON.parse(cleaned);
    } catch {
      return equipmentString.split(",").map((item: string) =>
        item.trim().replace(/[\[\]']/g, "")
      );
    }
  };

  // User management functions
  const handleAddUser = async () => {
    if (!newUser.ma_nguoi_dung || !newUser.ten_nguoi_dung || !newUser.email) {
      showWarning("Thiếu thông tin!", "Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        ...newUser,
        ma_nguoi_dung: newUser.ma_nguoi_dung,
        ten_nguoi_dung: newUser.ten_nguoi_dung,
        email: newUser.email,
      } as Omit<MongoUser, "_id">;
      
      const createdUser = await userService.createUser(userData);
      setUsers([...users, createdUser]);
      setNewUser({
      ma_nguoi_dung: "",
      ten_nguoi_dung: "",
      ngay_sinh: "",
      gioi_tinh: "Nam",
      email: "",
      so_dien_thoai: 0,
      mat_khau: "123456",
      vai_tro: "student",
    });
      setShowAddUserDialog(false);
      showBoss("Thành công!", "Thêm người dùng thành công! Boss đã approve! 👑");
    } catch (error) {
      console.error("Error adding user:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi thêm người dùng! ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (user: MongoUser) => {
    try {
      const success = await userService.updateUser(user.ma_nguoi_dung, {
      ten_nguoi_dung: user.ten_nguoi_dung,
      ngay_sinh: user.ngay_sinh,
      gioi_tinh: user.gioi_tinh,
      email: user.email,
      so_dien_thoai: user.so_dien_thoai,
        vai_tro: user.vai_tro
      });

      if (success) {
        setUsers(users.map(u => u._id === user._id ? user : u));
        setShowUserDialog(false);
        showBoss("Thành công!", "Cập nhật người dùng thành công! Boss đã approve! 👑");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi cập nhật người dùng! ❌");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("🗑️ Bạn có chắc chắn muốn xóa người dùng này?")) {
      return;
    }

    try {
      const success = await userService.deleteUser(userId);
      if (success) {
      setUsers(users.filter(u => u._id !== userId));
        showBoss("Thành công!", "Xóa người dùng thành công! Boss đã approve! 👑");
      } else {
        showError("Lỗi!", "Không tìm thấy người dùng để xóa!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi xóa người dùng! ❌");
    }
  };

  // Room management functions
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
        showBoss("Thành công!", "Cập nhật phòng thành công! Boss đã approve! 👑");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi cập nhật phòng! ❌");
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

  // Booking management functions
  const handleApproveBooking = async (booking: MongoBookingHistory) => {
    try {
      const success = await bookingService.updateBookingStatus(booking._id!, "confirmed");
      if (success) {
        setBookings(bookings.map(b => b._id === booking._id ? { ...b, trang_thai: "confirmed" } : b));
        showBoss("Thành công!", "Duyệt đặt phòng thành công! Boss đã approve! 👑");
      }
    } catch (error) {
      console.error("Error approving booking:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi duyệt đặt phòng! ❌");
    }
  };

  const handleRejectBooking = async (booking: MongoBookingHistory) => {
    try {
      const success = await bookingService.updateBookingStatus(booking._id!, "cancelled");
      if (success) {
        setBookings(bookings.map(b => b._id === booking._id ? { ...b, trang_thai: "cancelled" } : b));
        showBoss("Thành công!", "Từ chối đặt phòng thành công! Boss đã approve! 👑");
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
      showError("Lỗi!", "Có lỗi xảy ra khi từ chối đặt phòng! ❌");
    }
  };

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    totalRooms: rooms.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.trang_thai === "pending").length,
    confirmedBookings: bookings.filter(b => b.trang_thai === "confirmed").length,
    rejectedBookings: bookings.filter(b => b.trang_thai === "cancelled").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cmcBlue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-8 w-8 text-cmcBlue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              <Badge variant="secondary" className="bg-cmcBlue-100 text-cmcBlue-800">
                <Shield className="h-4 w-4 mr-1" />
                Super Admin
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Xin chào, {user?.name || "Admin"}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
        </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng phòng</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRooms}</div>
            </CardContent>
        </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng đặt phòng</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
        </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
            </CardContent>
        </Card>
      </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
            <TabsTrigger value="rooms">Quản lý phòng</TabsTrigger>
            <TabsTrigger value="bookings">Quản lý đặt phòng</TabsTrigger>
        </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Quản lý người dùng</CardTitle>
                  <Button onClick={() => setShowAddUserDialog(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Thêm người dùng
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã người dùng</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.ma_nguoi_dung}</TableCell>
                        <TableCell>{user.ten_nguoi_dung}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.vai_tro === "admin" ? "default" : "secondary"}>
                            {user.vai_tro}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingUser(user);
                                setShowUserDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user._id!)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-700">
                    Hiển thị {startIndex + 1} đến {Math.min(endIndex, filteredUsers.length)} trong tổng số {filteredUsers.length} người dùng
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Trang {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Quản lý phòng</CardTitle>
                  <Button onClick={() => setShowAddRoomDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm phòng
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm phòng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã phòng</TableHead>
                      <TableHead>Số phòng</TableHead>
                      <TableHead>Cơ sở</TableHead>
                      <TableHead>Sức chứa</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.map((room) => {
                      const equipment = parseEquipment(room.Co_so_vat_chat);
                      return (
                        <TableRow key={room._id}>
                          <TableCell className="font-medium">{room.Ma_phong}</TableCell>
                          <TableCell>Phòng {room.So_phong}</TableCell>
                          <TableCell>Tòa {room.Co_so}</TableCell>
                          <TableCell>{room.Suc_chua} người</TableCell>
                          <TableCell>
                            <Badge variant={room.trang_thai === "available" ? "default" : "secondary"}>
                              {room.trang_thai}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingRoom(room);
                                  setShowRoomDialog(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteRoom(room._id!)}
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

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý đặt phòng</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm đặt phòng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Người đặt</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Khung giờ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell className="font-medium">{booking.Ma_phong}</TableCell>
                        <TableCell>{booking.Ten_nguoi_dung}</TableCell>
                        <TableCell>{booking.Ngay}</TableCell>
                        <TableCell>{booking.Ca}</TableCell>
                        <TableCell>
                          <Badge 
                                                         variant={
                               booking.trang_thai === "confirmed" ? "default" : 
                               booking.trang_thai === "cancelled" ? "destructive" : "secondary"
                             }
                          >
                            {booking.trang_thai}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {booking.trang_thai === "pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleApproveBooking(booking)}
                                >
                                  Duyệt
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectBooking(booking)}
                                >
                                  Từ chối
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
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-id">Mã người dùng *</Label>
                <Input
                  id="user-id"
                  placeholder="SV001"
                  value={newUser.ma_nguoi_dung}
                  onChange={(e) => setNewUser({...newUser, ma_nguoi_dung: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-name">Họ tên *</Label>
                <Input
                  id="user-name"
                  placeholder="Nguyễn Văn A"
                  value={newUser.ten_nguoi_dung}
                  onChange={(e) => setNewUser({...newUser, ten_nguoi_dung: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-email">Email *</Label>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="user@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">Vai trò</Label>
                <select
                  id="user-role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newUser.vai_tro}
                  onChange={(e) => setNewUser({...newUser, vai_tro: e.target.value as any})}
                >
                  <option value="student">Sinh viên</option>
                  <option value="teacher">Giảng viên</option>
                  <option value="admin">Admin</option>
                  <option value="pctsv">PCTSV</option>
                  <option value="security">Bảo vệ</option>
                </select>
              </div>
          </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddUser} disabled={isSubmitting}>
              {isSubmitting ? "Đang thêm..." : "Thêm người dùng"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Room Dialog */}
      <Dialog open={showAddRoomDialog} onOpenChange={setShowAddRoomDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm phòng mới</DialogTitle>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRoomDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddRoom} disabled={isSubmitting}>
              {isSubmitting ? "Đang thêm..." : "Thêm phòng"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard; 