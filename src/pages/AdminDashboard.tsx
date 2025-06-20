import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmailTestDialog from "@/components/EmailTestDialog";
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
} from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [rooms, setRooms] = useState<MongoRoom[]>([]);
  const [bookings, setBookings] = useState<MongoBookingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<MongoUser | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);

  // Load all data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("📊 Loading admin dashboard data...");

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
      } finally {
        setIsLoading(false);
      }
    };

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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Thêm người dùng
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm người dùng mới</DialogTitle>
                        <DialogDescription>
                          Nhập thông tin người dùng mới
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-name">Họ và tên</Label>
                            <Input id="user-name" placeholder="Nguyễn Văn A" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-email">Email</Label>
                            <Input
                              id="user-email"
                              placeholder="user@st.cmc.edu.vn"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-role">Vai trò</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                              <option value="student">Sinh viên</option>
                              <option value="teacher">Giảng viên</option>
                              <option value="admin">Quản trị viên</option>
                              <option value="pctsv">PCTSV</option>
                              <option value="security">Bảo vệ</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-phone">Số điện thoại</Label>
                            <Input id="user-phone" placeholder="0123456789" />
                          </div>
                        </div>
                        <Button className="w-full">Tạo người dùng</Button>
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
                            <Button variant="outline" size="sm">
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
