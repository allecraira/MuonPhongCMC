import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Users,
  Clock,
  Shield,
  BookOpen,
  Globe,
  Award,
  Target,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                  alt="CMC Room Booking"
                  className="h-8 w-8"
                />
                <div className="text-left">
                  <div className="text-lg font-bold text-cmc-600">
                    CMC Room Booking
                  </div>
                  <div className="text-xs text-gray-500">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/rooms"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Danh sách phòng
              </Link>
              <Link
                to="/about"
                className="text-gray-900 hover:text-cmc-600 transition-colors"
              >
                Giới thiệu
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Liên hệ
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button className="bg-cmcBlue-600 hover:bg-cmcBlue-700">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cmcBlue-600 via-cmcBlue-700 to-cmcBlue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Giới thiệu
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Hệ thống đặt phòng thông minh của Trường Đại học CMC
          </p>
        </div>
      </section>

      {/* About System */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Về hệ thống đặt phòng
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hệ thống Mượn phòng CMC là giải pháp công nghệ hiện đại giúp tự
              động hóa quy trình đặt phòng học, phòng chức năng tại trường đại
              học, mang lại sự tiện lợi và hiệu quả cho toàn thể cộng đồng
              trường học.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Đa người dùng</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Hỗ trợ sinh viên, giảng viên, PCTSV, admin và bảo vệ với các
                  quyền hạn phù hợp
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Tự động hóa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Duyệt đặt phòng tự động khi phòng trống, gửi email xác nhận
                  tức thì
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Bảo mật</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Phân quyền chặt chẽ, đăng nhập an toàn với email trường học
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Tiện lợi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Truy cập mọi lúc mọi nơi, giao diện thân thiện trên mọi thiết
                  bị
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tính năng chính
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hệ thống cung cấp đầy đủ các tính năng cần thiết cho việc quản lý
              và sử dụng phòng học hiệu quả
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Cho sinh viên & giảng viên
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Tìm kiếm phòng thông minh</h4>
                    <p className="text-gray-600 text-sm">
                      Lọc theo thời gian, địa điểm, sức chứa và trang thiết bị
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Đặt phòng nhanh chóng</h4>
                    <p className="text-gray-600 text-sm">
                      Đặt phòng online, nhận email xác nhận tự động
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-purple-100 rounded-full">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Quản lý lịch cá nhân</h4>
                    <p className="text-gray-600 text-sm">
                      Xem lịch sử đặt phòng và các buổi sắp tới
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Cho quản trị viên
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-red-100 rounded-full">
                    <Building2 className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Quản lý phòng học</h4>
                    <p className="text-gray-600 text-sm">
                      Thêm, sửa, xóa thông tin phòng và trang thiết bị
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Award className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Thống kê & báo cáo</h4>
                    <p className="text-gray-600 text-sm">
                      Xem báo cáo sử dụng phòng và thống kê hệ thống
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-1 bg-teal-100 rounded-full">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Quản lý người dùng</h4>
                    <p className="text-gray-600 text-sm">
                      Phân quyền và quản lý tài khoản người dùng
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Mục tiêu</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li>✅ Tự động hóa quy trình đặt phòng</li>
                  <li>✅ Tránh xung đột lịch đặt phòng</li>
                  <li>✅ Hỗ trợ quản lý hiệu quả</li>
                  <li>✅ Đảm bảo tính minh bạch và tiện lợi</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Cam kết</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li>🔒 Bảo mật thông tin tuyệt đối</li>
                  <li>⚡ Xử lý nhanh chóng trong 3 giây</li>
                  <li>📱 Tương thích mọi thiết bị</li>
                  <li>🔄 Cập nhật liên tục theo nhu cầu</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cmcBlue-600 to-cmc-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bắt đầu sử dụng ngay</h2>
          <p className="text-xl text-blue-100 mb-8">
            Đăng nhập với tài khoản trường học ��ể trải nghiệm hệ thống đặt
            phòng hiện đại
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/rooms">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-cmcBlue-600"
              >
                Xem danh sách phòng
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                  alt="CMC Room Booking"
                  className="h-8 w-8"
                />
                <div>
                  <div className="font-bold text-white">CMC Room Booking</div>
                  <div className="text-xs text-gray-400">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Hệ thống đặt phòng trực tuyến hiện đại, tiện lợi và nhanh chóng
                dành cho sinh viên Trường Đại học CMC.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rooms"
                    className="hover:text-white transition-colors"
                  >
                    Danh sách phòng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Hướng dẫn sử dụng
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Quy định sử dụng
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📍 Số 236 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội</li>
                <li>📞 024 3755 6666</li>
                <li>✉️ support@cmc.edu.vn</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Trường Đại học CMC. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
