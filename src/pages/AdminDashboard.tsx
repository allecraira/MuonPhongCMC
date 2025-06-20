import { useState } from "react";
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
} from "lucide-react";

// Mock data
const systemStats = {
  totalUsers: 1247,
  activeBookings: 23,
  totalRooms: 15,
  monthlyBookings: 342,
};

const mockUsers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "student1@cmc.edu.vn",
    role: "student",
    status: "active",
    lastLogin: "2025-01-17",
  },
  {
    id: "2",
    name: "TS. Trần Thị B",
    email: "teacher1@cmc.edu.vn",
    role: "teacher",
    status: "active",
    lastLogin: "2025-01-16",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "pctsv@cmc.edu.vn",
    role: "pctsv",
    status: "active",
    lastLogin: "2025-01-17",
  },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      student: { label: "Sinh viên", color: "bg-blue-100 text-blue-800" },
      teacher: { label: "Giảng viên", color: "bg-green-100 text-green-800" },
      admin: { label: "Admin", color: "bg-red-100 text-red-800" },
      pctsv: { label: "PCTSV", color: "bg-purple-100 text-purple-800" },
      security: { label: "Bảo vệ", color: "bg-orange-100 text-orange-800" },
    };
    const config = roleConfig[role as keyof typeof roleConfig];
    return (
      <Badge className={config?.color || "bg-gray-100 text-gray-800"}>
        {config?.label || role}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <Shield className="h-6 w-6 text-red-600" />
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
              <EmailTestDialog />
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
            Quản lý người dùng, hệ thống và theo dõi hoạt động
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Tổng người dùng</span>
                <Users className="h-4 w-4 text-blue-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12 tháng này</p>
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
              <p className="text-xs text-muted-foreground">Hiện tại</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Tổng số phòng</span>
                <Building2 className="h-4 w-4 text-purple-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalRooms}</div>
              <p className="text-xs text-muted-foreground">3 tòa nhà</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Đặt phòng/tháng</span>
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemStats.monthlyBookings}
              </div>
              <p className="text-xs text-muted-foreground">
                +8% so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
            <TabsTrigger value="system">Cài đặt hệ thống</TabsTrigger>
            <TabsTrigger value="logs">Nhật ký hoạt động</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý người dùng</CardTitle>
                    <CardDescription>
                      Xem và quản lý tài khoản người dùng trong hệ thống
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
                          Tạo tài khoản người dùng mới trong hệ thống
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Họ và tên</Label>
                          <Input id="name" placeholder="Nhập họ và tên" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="user@cmc.edu.vn"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Vai trò</Label>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="student">Sinh viên</option>
                            <option value="teacher">Giảng viên</option>
                            <option value="pctsv">PCTSV</option>
                            <option value="security">Bảo vệ</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                        <Button className="w-full">Tạo tài khoản</Button>
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
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Đăng nhập cuối</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Hoạt động
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
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
                    Cài đặt chung
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tên hệ thống</Label>
                    <Input defaultValue="CMC Room Booking System" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email thông báo</Label>
                    <Input defaultValue="admin@cmc.edu.vn" />
                  </div>
                  <div className="space-y-2">
                    <Label>Thời gian đặt phòng tối đa (giờ)</Label>
                    <Input defaultValue="4" type="number" />
                  </div>
                  <Button>Lưu cài đặt</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Quản lý cơ sở dữ liệu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>Kết nối MongoDB: ✅ Hoạt động</p>
                    <p>Phiên bản: 7.0.5</p>
                    <p>Dung lượng sử dụng: 245 MB / 1 GB</p>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Sao lưu dữ liệu
                    </Button>
                    <Button variant="outline" className="w-full">
                      Khôi phục dữ liệu
                    </Button>
                    <Button variant="outline" className="w-full">
                      Dọn dẹp log cũ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Nhật ký hoạt động hệ thống</CardTitle>
                <CardDescription>
                  Theo dõi các hoạt động quan trọng trong hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="text-sm font-medium">
                      Người dùng đăng nhập
                    </div>
                    <div className="text-xs text-gray-600">
                      student1@cmc.edu.vn đăng nhập lúc 14:30, 17/01/2025
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="text-sm font-medium">Đặt phòng mới</div>
                    <div className="text-xs text-gray-600">
                      Phòng 201 được đặt bởi teacher1@cmc.edu.vn lúc 14:25,
                      17/01/2025
                    </div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="text-sm font-medium">Cập nhật hệ thống</div>
                    <div className="text-xs text-gray-600">
                      Admin cập nhật cài đặt email thông báo lúc 14:20,
                      17/01/2025
                    </div>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <div className="text-sm font-medium">
                      Đăng nhập thất bại
                    </div>
                    <div className="text-xs text-gray-600">
                      Thử đăng nhập với email unknown@cmc.edu.vn lúc 14:15,
                      17/01/2025
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Edit Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin tài khoản người dùng
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Họ và tên</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedUser.name}
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedUser.email}
                  placeholder="user@cmc.edu.vn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Vai trò</Label>
                <select
                  id="edit-role"
                  defaultValue={selectedUser.role}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="student">Sinh viên</option>
                  <option value="teacher">Giảng viên</option>
                  <option value="pctsv">PCTSV</option>
                  <option value="security">Bảo vệ</option>
                  <option value="admin">Admin</option>
                </select>
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
