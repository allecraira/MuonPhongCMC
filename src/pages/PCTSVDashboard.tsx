import { useState } from "react";
import { Link } from "react-router-dom";
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
  Building2,
  Calendar,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Shield,
} from "lucide-react";

// Mock data
const roomStats = {
  totalRooms: 15,
  availableRooms: 12,
  bookedRooms: 3,
  monthlyBookings: 342,
};

const mockRooms = [
  {
    id: "201",
    name: "Phòng 201",
    building: "CS1",
    floor: 2,
    capacity: 50,
    equipment: ["Máy chiếu", "Wifi", "Điều hòa"],
    status: "active",
  },
  {
    id: "202",
    name: "Phòng 202",
    building: "CS1",
    floor: 2,
    capacity: 30,
    equipment: ["Máy chiếu", "Wifi"],
    status: "active",
  },
  {
    id: "301",
    name: "Phòng 301",
    building: "CS2",
    floor: 3,
    capacity: 80,
    equipment: ["Máy chiếu", "Bảng trắng", "Wifi"],
    status: "active",
  },
];

const mockBookings = [
  {
    id: "1",
    room: "Phòng 201",
    booker: "Nguyễn Văn A",
    date: "2025-01-17",
    time: "08:00 - 10:00",
    status: "confirmed",
    purpose: "Họp nhóm dự án",
    attendees: 15,
  },
  {
    id: "2",
    room: "Phòng 202",
    booker: "TS. Trần Thị B",
    date: "2025-01-17",
    time: "10:00 - 12:00",
    status: "pending",
    purpose: "Lớp học Lập trình Java",
    attendees: 30,
  },
  {
    id: "3",
    room: "Phòng 301",
    booker: "Lê Văn C",
    date: "2025-01-18",
    time: "14:00 - 16:00",
    status: "confirmed",
    purpose: "Thực hành máy tính",
    attendees: 25,
  },
];

const PCTSVDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

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

  const handleApproveBooking = (bookingId: string) => {
    // In real app, this would call an API
    console.log(`Approving booking ${bookingId}`);
  };

  const handleRejectBooking = (bookingId: string) => {
    // In real app, this would call an API
    console.log(`Rejecting booking ${bookingId}`);
  };

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
              <p className="text-xs text-muted-foreground">3 tòa nhà</p>
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
              <p className="text-xs text-muted-foreground">Hiện tại</p>
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
                <span className="text-sm font-medium">Đặt phòng/tháng</span>
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roomStats.monthlyBookings}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% so với tháng trước
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
                      Thêm, sửa, xóa thông tin phòng và trang thiết bị
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm phòng
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm phòng mới</DialogTitle>
                        <DialogDescription>
                          Nhập thông tin phòng học mới
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="room-name">Tên phòng</Label>
                            <Input id="room-name" placeholder="Phòng 101" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="building">Tòa nhà</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                              <option value="CS1">Tòa CS1</option>
                              <option value="CS2">Tòa CS2</option>
                              <option value="CS3">Tòa CS3</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="floor">Tầng</Label>
                            <Input id="floor" type="number" placeholder="1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="capacity">Sức chứa</Label>
                            <Input
                              id="capacity"
                              type="number"
                              placeholder="30"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="equipment">Trang thiết bị</Label>
                          <Textarea
                            id="equipment"
                            placeholder="Máy chiếu, Wifi, Điều hòa..."
                            rows={3}
                          />
                        </div>
                        <Button className="w-full">Thêm phòng</Button>
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
                      <TableHead>Tầng</TableHead>
                      <TableHead>Sức chứa</TableHead>
                      <TableHead>Trang thiết bị</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">
                          {room.name}
                        </TableCell>
                        <TableCell>Tòa {room.building}</TableCell>
                        <TableCell>Tầng {room.floor}</TableCell>
                        <TableCell>{room.capacity} người</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {room.equipment.slice(0, 2).map((item, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {item}
                              </Badge>
                            ))}
                            {room.equipment.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{room.equipment.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Hoạt động
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedRoom(room);
                                setShowRoomDialog(true);
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
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Mục đích</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.room}
                        </TableCell>
                        <TableCell>{booking.booker}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>{booking.purpose}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
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
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() =>
                                    handleApproveBooking(booking.id)
                                  }
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleRejectBooking(booking.id)
                                  }
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
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phòng 201</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phòng 202</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                        </div>
                        <span className="text-sm text-gray-600">50%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phòng 301</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full w-5/6"></div>
                        </div>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Thống kê theo thời gian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        342
                      </div>
                      <div className="text-sm text-gray-600">
                        Lượt đặt tháng này
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-semibold">89</div>
                        <div className="text-xs text-gray-600">Tuần này</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold">23</div>
                        <div className="text-xs text-gray-600">Hôm nay</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-green-600">
                        ↗ +12% so với tháng trước
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa phòng</DialogTitle>
            <DialogDescription>Cập nhật thông tin phòng học</DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-room-name">Tên phòng</Label>
                  <Input id="edit-room-name" defaultValue={selectedRoom.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-building">Tòa nhà</Label>
                  <select
                    id="edit-building"
                    defaultValue={selectedRoom.building}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="CS1">Tòa CS1</option>
                    <option value="CS2">Tòa CS2</option>
                    <option value="CS3">Tòa CS3</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-floor">Tầng</Label>
                  <Input
                    id="edit-floor"
                    type="number"
                    defaultValue={selectedRoom.floor}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Sức chứa</Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    defaultValue={selectedRoom.capacity}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-equipment">Trang thiết bị</Label>
                <Textarea
                  id="edit-equipment"
                  defaultValue={selectedRoom.equipment.join(", ")}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">Lưu thay đổi</Button>
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
                  <div className="text-sm">{selectedBooking.room}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Người đặt
                  </div>
                  <div className="text-sm">{selectedBooking.booker}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Ngày</div>
                  <div className="text-sm">{selectedBooking.date}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Thời gian
                  </div>
                  <div className="text-sm">{selectedBooking.time}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Mục đích
                </div>
                <div className="text-sm">{selectedBooking.purpose}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Số người tham gia
                </div>
                <div className="text-sm">{selectedBooking.attendees} người</div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                {getStatusBadge(selectedBooking.status)}
                <div className="text-xs text-gray-500">
                  Mã: CMC{selectedBooking.id.padStart(6, "0")}
                </div>
              </div>
              {selectedBooking.status === "pending" && (
                <div className="flex space-x-2 pt-4">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApproveBooking(selectedBooking.id);
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
                      handleRejectBooking(selectedBooking.id);
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
