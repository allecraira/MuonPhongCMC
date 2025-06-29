import { useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "@/lib/mongodb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, User, Lock, ArrowLeft, Shield, Calendar, History, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookingHistory from "@/components/BookingHistory";
import WeeklyCalendar from "@/components/WeeklyCalendar";

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    try {
      console.log("🔄 Changing password for:", user.email);

      // Verify current password and update in MongoDB
      const currentUser = await userService.findByEmail(user.email);

      if (!currentUser || currentUser.mat_khau !== currentPassword) {
        setError("Mật khẩu hiện tại không đúng");
        return;
      }

      // Update password in MongoDB
      const updateSuccess = await userService.updatePassword(
        user.email,
        newPassword,
      );

      if (updateSuccess) {
        // Update local user state
        updateUser({ hasChangedPassword: true });
        setMessage(
          "Đổi mật khẩu thành công! Mật khẩu đã được cập nhật trong cơ sở dữ liệu.",
        );
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        console.log("✅ Password updated successfully");
      } else {
        setError("Có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("❌ Password change error:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  const getRoleName = (role: string) => {
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
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25";
      case "teacher":
        return "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25";
      case "admin":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25";
      case "pctsv":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25";
      case "security":
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/25";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return "👨‍🎓";
      case "teacher":
        return "👨‍🏫";
      case "admin":
        return "⚡";
      case "pctsv":
        return "🏢";
      case "security":
        return "🛡️";
      default:
        return "👤";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img
                    src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                    alt="CMC Room Booking"
                    className="h-10 w-10 rounded-lg shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white drop-shadow-lg">
                    CMC Room Booking
                  </div>
                  <div className="text-xs text-white/70">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 font-medium"
              >
                Trang chủ
              </Link>
              <Link
                to="/rooms"
                className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 font-medium"
              >
                Danh sách phòng
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-2xl">{getRoleIcon(user.role)}</span>
                <span className="text-sm text-white font-medium">
                  {user.name}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-white/80 hover:text-white transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Quay về trang chủ
          </Link>
        </div>

        {/* Profile Header */}
        <div className="mb-10 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl shadow-2xl">
              {getRoleIcon(user.role)}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Chào mừng, {user.name}!
          </h1>
          <p className="text-white/70 text-lg">
            Quản lý thông tin tài khoản và cài đặt của bạn
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/10 backdrop-blur-md border-0 p-1 rounded-2xl">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl transition-all duration-300 flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Thông tin</span>
            </TabsTrigger>
            <TabsTrigger 
              value="password"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl transition-all duration-300 flex items-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Bảo mật</span>
            </TabsTrigger>
            {(user.role === "student" || user.role === "teacher") && (
              <>
                <TabsTrigger 
                  value="booking-history"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">Lịch sử</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="weekly-calendar"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Lịch tổng</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-white text-2xl">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  Thông tin tài khoản
                </CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Thông tin cơ bản về tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-white/90 font-medium text-sm uppercase tracking-wider">Họ và tên</Label>
                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white font-medium">
                      {user.name}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/90 font-medium text-sm uppercase tracking-wider">Email</Label>
                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white font-medium">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-white/90 font-medium text-sm uppercase tracking-wider">Vai trò</Label>
                    <div className="mt-1">
                      <Badge className={`${getRoleBadgeColor(user.role)} px-4 py-2 text-base font-semibold rounded-xl border-0`}>
                        <span className="mr-2">{getRoleIcon(user.role)}</span>
                        {getRoleName(user.role)}
                      </Badge>
                    </div>
                  </div>
                  {user.studentId && (
                    <div className="space-y-3">
                      <Label className="text-white/90 font-medium text-sm uppercase tracking-wider">Mã sinh viên</Label>
                      <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white font-medium">
                        {user.studentId}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-white/90 font-medium text-sm uppercase tracking-wider">Trạng thái tài khoản</Label>
                  <div className="mt-1">
                    {user.hasChangedPassword ? (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-base font-semibold rounded-xl border-0 shadow-lg shadow-green-500/25">
                        <Shield className="h-4 w-4 mr-2" />
                        Bảo mật hoàn tất
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 text-base font-semibold rounded-xl border-0 shadow-lg shadow-amber-500/25 animate-pulse">
                        <Shield className="h-4 w-4 mr-2" />
                        Cần cập nhật bảo mật
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-white text-2xl">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg mr-3">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  Cập nhật mật khẩu
                </CardTitle>
                <CardDescription className="text-white/70 text-base">
                  Thay đổi mật khẩu để bảo mật tài khoản
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  {message && (
                    <Alert className="bg-green-500/20 border-green-500/30 backdrop-blur-sm">
                      <AlertDescription className="text-green-100">{message}</AlertDescription>
                    </Alert>
                  )}

                  {error && (
                    <Alert className="bg-red-500/20 border-red-500/30 backdrop-blur-sm">
                      <AlertDescription className="text-red-100">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="current-password" className="text-white/90 font-medium text-sm uppercase tracking-wider">
                      Mật khẩu hiện tại
                    </Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPasswords.current ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder-white/50 rounded-xl h-12 pr-12 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70 hover:text-white rounded-r-xl"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="new-password" className="text-white/90 font-medium text-sm uppercase tracking-wider">
                      Mật khẩu mới
                    </Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showPasswords.new ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder-white/50 rounded-xl h-12 pr-12 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        placeholder="Nhập mật khẩu mới"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70 hover:text-white rounded-r-xl"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirm-password" className="text-white/90 font-medium text-sm uppercase tracking-wider">
                      Xác nhận mật khẩu mới
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder-white/50 rounded-xl h-12 pr-12 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        placeholder="Xác nhận mật khẩu mới"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70 hover:text-white rounded-r-xl"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 h-12"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Cập nhật mật khẩu
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking History and Calendar tabs remain the same but with enhanced styling */}
          {(user.role === "student" || user.role === "teacher") && (
            <>
              <TabsContent value="booking-history">
                <div className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                  <BookingHistory />
                </div>
              </TabsContent>

              <TabsContent value="weekly-calendar">
                <div className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                  <WeeklyCalendar />
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;