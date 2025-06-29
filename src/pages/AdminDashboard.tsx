import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmailTestDialog from "@/components/EmailTestDialog";
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
} from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { showBoss, showError, showWarning, showSuccess } = useNotification();
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [rooms, setRooms] = useState<MongoRoom[]>([]);
  const [bookings, setBookings] = useState<MongoBookingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<MongoUser | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddRoomDialog, setShowAddRoomDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<MongoRoom | null>(null);
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    ten_nguoi_dung: "",
    email: "",
    ma_nguoi_dung: "",
    vai_tro: "student" as "student" | "teacher" | "admin" | "pctsv" | "security",
    so_dien_thoai: 0,
    ngay_sinh: "",
    gioi_tinh: "Nam",
    mat_khau: "123456"
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

  const loadData = async () => {
    try {
      const [usersData, roomsData] = await Promise.all([
        userService.getAllUsers(),
        roomService.getAllRooms(),
      ]);
      setUsers(usersData);
      setRooms(roomsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getRoleName = (role?: string) => {
    switch (role) {
      case "student":
        return "Sinh viên";
      case "teacher":
        return "Giảng viên";
      case "admin":
        return "Quản trị viên";
      case "pctsv":
        return "Phòng CTSV";
      case "security":
        return "Bảo vệ";
      default:
        return "Không xác định";
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800";
      case "teacher":
        return "bg-green-100 text-green-800";
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "pctsv":
        return "bg-orange-100 text-orange-800";
      case "security":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const systemStats = {
    totalUsers: users.length,
    activeBookings: bookings.filter((b) => b.trang_thai === "confirmed").length,
    totalRooms: rooms.length,
    pendingApprovals: bookings.filter((b) => b.trang_thai === "pending").length,
  };

  const handleAddUser = async () => {
    if (!newUser.ten_nguoi_dung || !newUser.email || !newUser.ma_nguoi_dung) {
      showWarning("Thiếu thông tin!", "Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    setIsSubmitting(true);
    try {
      const createdUser = await userService.createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({
        ten_nguoi_dung: "",
        email: "",
        ma_nguoi_dung: "",
        vai_tro: "student",
        so_dien_thoai: 0,
        ngay_sinh: "",
        gioi_tinh: "Nam",
        mat_khau: "123456"
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
  const parseEquipment = (equipmentString: string): string[] => {
    try {
      if (equipmentString.startsWith('[') && equipmentString.endsWith(']')) {
        return JSON.parse(equipmentString);
      }
      return equipmentString.split(',').map(item => item.trim());
    } catch {
      return equipmentString.split(',').map(item => item.trim());
    }
  };

  const handleAddRoom = async () => {
    if (!newRoom.Ma_phong || !newRoom.So_phong || !newRoom.Suc_chua) {
      showWarning("Thiếu thông tin!", "Vui lòng điền đầy đủ thông tin bắt buộc");
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
      
      await roomService.createRoom(roomData);
      showSuccess("Thành công!", "Đã thêm phòng mới!");
      setNewRoom({
        Ma_phong: "",
        So_phong: 0,
        Co_so: "CS2",
        "Dien_tich (m2)": 0,
        trang_thai: "available",
        Co_so_vat_chat: "",
        Mo_ta: "",
        Quy_dinh: "",
        Suc_chua: 0,
      });
      setShowAddRoomDialog(false);
      loadData();
    } catch (error) {
      console.error("Error adding room:", error);
      showError("Lỗi!", "Không thể thêm phòng. Vui lòng thử lại.");
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

  const handleEditRoom = (room: MongoRoom) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto" />
            <p className="mt-4 text-gray-600">Đang tải dữ liệu quản trị...</p>
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
                    Admin Dashboard
                  </div>
                  <div className="text-xs text-gray-500">Quản trị hệ thống</div>
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
            Bảng điều khiển Admin
          </h1>
          <p className="text-gray-600">
            Quản lý người dùng, phòng học và thống kê hệ thống
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Tổng người dùng</span>
                <Users className="h-4 w-4 text-purple-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {users.filter((u) => u.vai_tro === "student").length} sinh viên,{" "}
                {users.filter((u) => u.vai_tro === "teacher").length} giảng viên
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Đặt phòng active</span>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemStats.activeBookings}
              </div>
              <p className="text-xs text-muted-foreground">Đã xác nhận</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Tổng phòng</span>
                <Building2 className="h-4 w-4 text-blue-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalRooms}</div>
              <p className="text-xs text-muted-foreground">
                {rooms.filter((r) => r.trang_thai === "available").length} có
                sẵn
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Chờ duyệt</span>
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemStats.pendingApprovals}
              </div>
              <p className="text-xs text-muted-foreground">Yêu cầu đặt phòng</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
            <TabsTrigger value="rooms">Quản lý phòng</TabsTrigger>
            <TabsTrigger value="system">Cài đặt hệ thống</TabsTrigger>
            <TabsTrigger value="statistics">Thống kê</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý người dùng</CardTitle>
                    <CardDescription>
                      Xem và quản lý tất cả người dùng trong hệ thống
                    </CardDescription>
                  </div>
                  <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setShowAddUserDialog(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Thêm người dùng
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Thêm người dùng mới</DialogTitle>
                        <DialogDescription>
                          Nhập thông tin người dùng mới
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-name">Họ và tên *</Label>
                            <Input 
                              id="user-name" 
                              placeholder="Nguyễn Văn A"
                              value={newUser.ten_nguoi_dung}
                              onChange={(e) => setNewUser({...newUser, ten_nguoi_dung: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-email">Email *</Label>
                            <Input
                              id="user-email"
                              placeholder="user@st.cmc.edu.vn"
                              value={newUser.email}
                              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-id">Mã người dùng *</Label>
                            <Input
                              id="user-id"
                              placeholder="BIT230001"
                              value={newUser.ma_nguoi_dung}
                              onChange={(e) => setNewUser({...newUser, ma_nguoi_dung: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-role">Vai trò</Label>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={newUser.vai_tro}
                              onChange={(e) => setNewUser({...newUser, vai_tro: e.target.value as any})}
                            >
                              <option value="student">Sinh viên</option>
                              <option value="teacher">Giảng viên</option>
                              <option value="admin">Quản trị viên</option>
                              <option value="pctsv">PCTSV</option>
                              <option value="security">Bảo vệ</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-phone">Số điện thoại</Label>
                            <Input 
                              id="user-phone" 
                              placeholder="0123456789"
                              type="number"
                              value={newUser.so_dien_thoai || ""}
                              onChange={(e) => setNewUser({...newUser, so_dien_thoai: parseInt(e.target.value) || 0})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-birth">Ngày sinh</Label>
                            <Input 
                              id="user-birth" 
                              type="date"
                              value={newUser.ngay_sinh}
                              onChange={(e) => setNewUser({...newUser, ngay_sinh: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="user-gender">Giới tính</Label>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={newUser.gioi_tinh}
                            onChange={(e) => setNewUser({...newUser, gioi_tinh: e.target.value})}
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={handleAddUser}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Đang tạo..." : "Tạo người dùng"}
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
                      <TableHead>Tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Mã</TableHead>
                      <TableHead>Điện thoại</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userData) => (
                      <TableRow key={userData._id}>
                        <TableCell className="font-medium">
                          {userData.ten_nguoi_dung}
                        </TableCell>
                        <TableCell>{userData.email}</TableCell>
                        <TableCell>
                          <Badge
                            className={getRoleBadgeColor(userData.vai_tro)}
                          >
                            {getRoleName(userData.vai_tro)}
                          </Badge>
                        </TableCell>
                        <TableCell>{userData.ma_nguoi_dung}</TableCell>
                        <TableCell>{userData.so_dien_thoai}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(userData);
                                setShowUserDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteUser(userData._id || "")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

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
                                onClick={() => handleEditRoom(room)}
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

            {/* Edit Room Dialog */}
            <Dialog open={showRoomDialog} onOpenChange={setShowRoomDialog}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa phòng</DialogTitle>
                  <DialogDescription>
                    Cập nhật thông tin phòng học
                  </DialogDescription>
                </DialogHeader>
                {selectedRoom && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-room-id">Mã phòng</Label>
                        <Input
                          id="edit-room-id"
                          value={selectedRoom.Ma_phong}
                          onChange={(e) => setSelectedRoom({...selectedRoom, Ma_phong: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-room-number">Số phòng</Label>
                        <Input
                          id="edit-room-number"
                          type="number"
                          value={selectedRoom.So_phong || ""}
                          onChange={(e) => setSelectedRoom({...selectedRoom, So_phong: parseInt(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-building">Tòa nhà</Label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={selectedRoom.Co_so}
                          onChange={(e) => setSelectedRoom({...selectedRoom, Co_so: e.target.value})}
                        >
                          <option value="CS2">Tòa CS2</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-capacity">Sức chứa</Label>
                        <Input
                          id="edit-capacity"
                          type="number"
                          value={selectedRoom.Suc_chua || ""}
                          onChange={(e) => setSelectedRoom({...selectedRoom, Suc_chua: parseInt(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-area">Diện tích (m²)</Label>
                        <Input 
                          id="edit-area" 
                          type="number" 
                          value={selectedRoom["Dien_tich (m2)"] || ""}
                          onChange={(e) => setSelectedRoom({...selectedRoom, "Dien_tich (m2)": parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Trạng thái</Label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={selectedRoom.trang_thai}
                          onChange={(e) => setSelectedRoom({...selectedRoom, trang_thai: e.target.value as any})}
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
                        rows={3}
                        value={selectedRoom.Co_so_vat_chat}
                        onChange={(e) => setSelectedRoom({...selectedRoom, Co_so_vat_chat: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Mô tả</Label>
                      <Textarea
                        id="edit-description"
                        rows={2}
                        value={selectedRoom.Mo_ta}
                        onChange={(e) => setSelectedRoom({...selectedRoom, Mo_ta: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-rules">Quy định</Label>
                      <Textarea
                        id="edit-rules"
                        rows={2}
                        value={selectedRoom.Quy_dinh}
                        onChange={(e) => setSelectedRoom({...selectedRoom, Quy_dinh: e.target.value})}
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
                        onClick={() => setShowRoomDialog(false)}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="system">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Cài đặt email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <EmailTestDialog />
                    <div className="text-sm text-gray-600">
                      Kiểm tra và cấu hình hệ thống email tự động
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt hệ thống</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tự động duyệt đặt phòng</span>
                      <Badge className="bg-green-100 text-green-800">Bật</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Gửi email thông báo</span>
                      <Badge className="bg-green-100 text-green-800">Bật</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Backup tự động</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Hàng ngày
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê người dùng theo vai trò</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["student", "teacher", "admin", "pctsv", "security"].map(
                      (role) => {
                        const count = users.filter(
                          (u) => u.vai_tro === role,
                        ).length;
                        const percentage =
                          users.length > 0 ? (count / users.length) * 100 : 0;

                        return (
                          <div
                            key={role}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm">{getRoleName(role)}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12">
                                {count}
                              </span>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thống kê đặt phòng</CardTitle>
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

      {/* User Edit Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>Cập nhật thông tin người dùng</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Họ và tên</Label>
                  <Input
                    id="edit-name"
                    defaultValue={selectedUser.ten_nguoi_dung}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" defaultValue={selectedUser.email} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Vai trò</Label>
                  <select
                    id="edit-role"
                    defaultValue={selectedUser.vai_tro}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="student">Sinh viên</option>
                    <option value="teacher">Giảng viên</option>
                    <option value="admin">Quản trị viên</option>
                    <option value="pctsv">PCTSV</option>
                    <option value="security">Bảo vệ</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Số điện thoại</Label>
                  <Input
                    id="edit-phone"
                    defaultValue={selectedUser.so_dien_thoai}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">Lưu thay đổi</Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowUserDialog(false)}
                >
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
