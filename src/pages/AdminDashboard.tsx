import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { userService, roomService, bookingService, MongoUser, MongoRoom } from "@/lib/mongodb";
import { PieChart, BarChart3 } from "lucide-react";

// Báo cáo phòng cho bảo vệ
interface RoomReport {
  id: string;
  room: string;
  date: string;
  status: string;
  note: string;
}

const getTopRooms = (bookings: any[], rooms: MongoRoom[], top = 5) => {
  const roomCount: Record<string, number> = {};
  bookings.forEach(b => {
    roomCount[b.Ma_phong] = (roomCount[b.Ma_phong] || 0) + 1;
  });
  const sorted = Object.entries(roomCount).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, top).map(([maPhong, count]) => {
    const room = rooms.find(r => r.Ma_phong === maPhong);
    return { maPhong, soPhong: room?.So_phong, coSo: room?.Co_so, count };
  });
};

const getRecentActivities = (bookings: any[], users: MongoUser[], limit = 10) => {
  return bookings.slice(-limit).reverse().map(b => {
    const user = users.find(u => u.ma_nguoi_dung === b.Ma_nguoi_dung);
    return {
      room: b.Ma_phong,
      user: user?.ten_nguoi_dung || b.Ten_nguoi_dung,
      date: b.Ngay,
      status: b.trang_thai,
    };
  });
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [rooms, setRooms] = useState<MongoRoom[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Thêm/sửa người dùng
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editUser, setEditUser] = useState<MongoUser | null>(null);
  const [userForm, setUserForm] = useState<Omit<MongoUser, "_id">>({
    ma_nguoi_dung: "",
    ten_nguoi_dung: "",
    ngay_sinh: "",
    gioi_tinh: "Nam",
    email: "",
    so_dien_thoai: 0,
    mat_khau: "123456",
    vai_tro: "student",
  });

  // Báo cáo phòng bảo vệ
  const [roomReports, setRoomReports] = useState<RoomReport[]>([]);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportForm, setReportForm] = useState<Omit<RoomReport, "id">>({
    room: "",
    date: "",
    status: "Bình thường",
    note: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, roomsData, bookingsData] = await Promise.all([
          userService.getAllUsers(),
          roomService.getAllRooms(),
          bookingService.getAllBookings(),
        ]);
        setUsers(usersData);
        setRooms(roomsData);
        setBookings(bookingsData);
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Thống kê tự động
  const stats = {
    totalUsers: users.length,
    totalRooms: rooms.length,
    totalBookings: bookings.length,
    students: users.filter(u => u.vai_tro === "student").length,
    teachers: users.filter(u => u.vai_tro === "teacher").length,
    admins: users.filter(u => u.vai_tro === "admin").length,
    pctsv: users.filter(u => u.vai_tro === "pctsv").length,
    security: users.filter(u => u.vai_tro === "security").length,
    confirmedBookings: bookings.filter((b: any) => b.trang_thai === "confirmed").length,
    pendingBookings: bookings.filter((b: any) => b.trang_thai === "pending").length,
    cancelledBookings: bookings.filter((b: any) => b.trang_thai === "cancelled").length,
  };

  // Xử lý thêm/sửa/xóa người dùng
  const openAddUser = () => {
    setEditUser(null);
    setUserForm({
      ma_nguoi_dung: "",
      ten_nguoi_dung: "",
      ngay_sinh: "",
      gioi_tinh: "Nam",
      email: "",
      so_dien_thoai: 0,
      mat_khau: "123456",
      vai_tro: "student",
    });
    setShowUserDialog(true);
  };
  const openEditUser = (user: MongoUser) => {
    setEditUser(user);
    setUserForm({
      ma_nguoi_dung: user.ma_nguoi_dung,
      ten_nguoi_dung: user.ten_nguoi_dung,
      ngay_sinh: user.ngay_sinh,
      gioi_tinh: user.gioi_tinh,
      email: user.email,
      so_dien_thoai: user.so_dien_thoai,
      mat_khau: user.mat_khau || "123456",
      vai_tro: user.vai_tro || "student",
    });
    setShowUserDialog(true);
  };
  const handleUserFormChange = (field: keyof Omit<MongoUser, "_id">, value: any) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
  };
  const handleSaveUser = async () => {
    if (editUser) {
      // Sửa
      await userService.updateUser(editUser._id!, userForm);
      setUsers(users.map(u => (u._id === editUser._id ? { ...u, ...userForm } : u)));
    } else {
      // Thêm
      const newUser = await userService.createUser(userForm);
      setUsers([...users, newUser]);
    }
    setShowUserDialog(false);
  };
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      await userService.deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
    }
  };

  // Xử lý báo cáo phòng bảo vệ
  const openAddReport = () => {
    setReportForm({ room: "", date: "", status: "Bình thường", note: "" });
    setShowReportDialog(true);
  };
  const handleReportFormChange = (field: keyof Omit<RoomReport, "id">, value: any) => {
    setReportForm(prev => ({ ...prev, [field]: value }));
  };
  const handleSaveReport = () => {
    setRoomReports([
      ...roomReports,
      { id: `report_${Date.now()}`, ...reportForm },
    ]);
    setShowReportDialog(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/">
          <Button variant="outline">Quay về trang chủ</Button>
        </Link>
      </div>
      {/* Thống kê */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="rounded-xl shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader><CardTitle>Người dùng</CardTitle></CardHeader>
          <CardContent><span className="text-3xl font-bold text-blue-700">{stats.totalUsers}</span></CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader><CardTitle>Phòng</CardTitle></CardHeader>
          <CardContent><span className="text-3xl font-bold text-green-700">{stats.totalRooms}</span></CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardHeader><CardTitle>Lượt đặt</CardTitle></CardHeader>
          <CardContent><span className="text-3xl font-bold text-yellow-700">{stats.totalBookings}</span></CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader><CardTitle>Đặt thành công</CardTitle></CardHeader>
          <CardContent><span className="text-3xl font-bold text-purple-700">{stats.confirmedBookings}</span></CardContent>
        </Card>
      </div>
      <Tabs defaultValue="report" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="report">Báo cáo tổng</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="rooms">Phòng</TabsTrigger>
        </TabsList>
        {/* Tab Báo cáo tổng */}
        <TabsContent value="report">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Biểu đồ tròn phân loại vai trò người dùng */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-500" />
                <CardTitle>Phân loại vai trò người dùng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div style={{ width: 120, height: 120, position: 'relative' }}>
                    <svg width="120" height="120" viewBox="0 0 32 32">
                      {(() => {
                        const roles = [
                          { label: 'Sinh viên', value: stats.students, color: '#3b82f6' },
                          { label: 'Giảng viên', value: stats.teachers, color: '#22c55e' },
                          { label: 'Admin', value: stats.admins, color: '#a21caf' },
                          { label: 'CTSV', value: stats.pctsv, color: '#f59e42' },
                          { label: 'Bảo vệ', value: stats.security, color: '#64748b' },
                        ];
                        const total = roles.reduce((sum, r) => sum + r.value, 0) || 1;
                        let acc = 0;
                        return roles.map((r, i) => {
                          const start = acc / total * 100;
                          acc += r.value;
                          const end = acc / total * 100;
                          const large = end - start > 50 ? 1 : 0;
                          const a = (start / 100) * 2 * Math.PI;
                          const b = (end / 100) * 2 * Math.PI;
                          const x1 = 16 + 16 * Math.sin(a);
                          const y1 = 16 - 16 * Math.cos(a);
                          const x2 = 16 + 16 * Math.sin(b);
                          const y2 = 16 - 16 * Math.cos(b);
                          return (
                            <path
                              key={r.label}
                              d={`M16,16 L${x1},${y1} A16,16 0 ${large} 1 ${x2},${y2} Z`}
                              fill={r.color}
                            />
                          );
                        });
                      })()}
                    </svg>
                  </div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div><span className="inline-block w-3 h-3 rounded-full mr-1" style={{background:'#3b82f6'}} />Sinh viên: {stats.students}</div>
                    <div><span className="inline-block w-3 h-3 rounded-full mr-1" style={{background:'#22c55e'}} />Giảng viên: {stats.teachers}</div>
                    <div><span className="inline-block w-3 h-3 rounded-full mr-1" style={{background:'#a21caf'}} />Admin: {stats.admins}</div>
                    <div><span className="inline-block w-3 h-3 rounded-full mr-1" style={{background:'#f59e42'}} />CTSV: {stats.pctsv}</div>
                    <div><span className="inline-block w-3 h-3 rounded-full mr-1" style={{background:'#64748b'}} />Bảo vệ: {stats.security}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Biểu đồ cột số lượt đặt theo trạng thái */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <CardTitle>Trạng thái đặt phòng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4 h-32 mt-4">
                  {[
                    { label: 'Đã duyệt', value: stats.confirmedBookings, color: '#22c55e' },
                    { label: 'Chờ duyệt', value: stats.pendingBookings, color: '#f59e42' },
                    { label: 'Đã hủy', value: stats.cancelledBookings, color: '#ef4444' },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center">
                      <div style={{height: `${(s.value / (stats.totalBookings||1)) * 100}px`, width: 24, background: s.color, borderRadius: 4}}></div>
                      <span className="text-xs mt-1">{s.label}</span>
                      <span className="text-xs font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-xl shadow-sm">
              <CardHeader><CardTitle>Top phòng được đặt nhiều nhất</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Cơ sở</TableHead>
                      <TableHead>Số lượt đặt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getTopRooms(bookings, rooms).map(r => (
                      <TableRow key={r.maPhong} className="hover:bg-blue-50 transition">
                        <TableCell>{r.maPhong}</TableCell>
                        <TableCell>{r.coSo}</TableCell>
                        <TableCell>{r.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-sm">
              <CardHeader><CardTitle>Hoạt động gần đây</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getRecentActivities(bookings, users).map((a, i) => (
                      <TableRow key={i} className="hover:bg-green-50 transition">
                        <TableCell>{a.user}</TableCell>
                        <TableCell>{a.room}</TableCell>
                        <TableCell>{a.date}</TableCell>
                        <TableCell>{a.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* Tab Người dùng */}
        <TabsContent value="users">
          <div className="mb-2 flex justify-end">
            <Button onClick={openAddUser}>Thêm người dùng</Button>
          </div>
          <Table className="rounded-xl overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id} className="hover:bg-gray-50 transition">
                  <TableCell>{u.ten_nguoi_dung}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.vai_tro}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => openEditUser(u)}>Sửa</Button>{' '}
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(u._id!)}>Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        {/* Tab Phòng */}
        <TabsContent value="rooms">
          <Table className="rounded-xl overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Mã phòng</TableHead>
                <TableHead>Số phòng</TableHead>
                <TableHead>Cơ sở</TableHead>
                <TableHead>Sức chứa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((r) => (
                <TableRow key={r._id} className="hover:bg-gray-50 transition">
                  <TableCell>{r.Ma_phong}</TableCell>
                  <TableCell>{r.So_phong}</TableCell>
                  <TableCell>{r.Co_so}</TableCell>
                  <TableCell>{r.Suc_chua}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      {/* Dialog Thêm/Sửa người dùng */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editUser ? "Sửa người dùng" : "Thêm người dùng"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input placeholder="Mã người dùng" value={userForm.ma_nguoi_dung} onChange={e => handleUserFormChange("ma_nguoi_dung", e.target.value)} />
            <Input placeholder="Tên người dùng" value={userForm.ten_nguoi_dung} onChange={e => handleUserFormChange("ten_nguoi_dung", e.target.value)} />
            <Input placeholder="Ngày sinh" value={userForm.ngay_sinh} onChange={e => handleUserFormChange("ngay_sinh", e.target.value)} />
            <Input placeholder="Giới tính" value={userForm.gioi_tinh} onChange={e => handleUserFormChange("gioi_tinh", e.target.value)} />
            <Input placeholder="Email" value={userForm.email} onChange={e => handleUserFormChange("email", e.target.value)} />
            <Input placeholder="Số điện thoại" type="number" value={userForm.so_dien_thoai} onChange={e => handleUserFormChange("so_dien_thoai", Number(e.target.value))} />
            <Input placeholder="Mật khẩu" value={userForm.mat_khau} onChange={e => handleUserFormChange("mat_khau", e.target.value)} />
            <Input placeholder="Vai trò" value={userForm.vai_tro} onChange={e => handleUserFormChange("vai_tro", e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveUser}>{editUser ? "Lưu" : "Thêm"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {loading && <div className="mt-4 text-center">Đang tải dữ liệu...</div>}
    </div>
  );
};

export default AdminDashboard; 