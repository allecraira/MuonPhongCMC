import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Building2,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cmcBlue-600 via-cmcBlue-700 to-cmcBlue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Liên hệ
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn với hệ thống đặt phòng CMC
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Địa chỉ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Số 236 Hoàng Quốc Việt
                  <br />
                  Cổ Nhuế, Bắc Từ Liêm
                  <br />
                  Hà Nội, Việt Nam
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Điện thoại</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Hotline: 024 3755 6666
                  <br />
                  PCTSV: 024 3755 6667
                  <br />
                  Kỹ thuật: 024 3755 6668
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  support@cmc.edu.vn
                  <br />
                  pctsv@cmc.edu.vn
                  <br />
                  admin@cmc.edu.vn
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Giờ làm việc</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Thứ 2 - Thứ 6: 8:00 - 17:00
                  <br />
                  Thứ 7: 8:00 - 12:00
                  <br />
                  Chủ nhật: Nghỉ
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Gửi tin nhắn
                </CardTitle>
                <CardDescription>
                  Điền thông tin dưới đây và chúng tôi sẽ phản hồi sớm nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input id="name" placeholder="Nhập họ và tên" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your-email@cmc.edu.vn"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" placeholder="0123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Vai trò</Label>
                      <select
                        id="role"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="student">Sinh viên</option>
                        <option value="teacher">Giảng viên</option>
                        <option value="staff">Nhân viên</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Chủ đề *</Label>
                    <Input
                      id="subject"
                      placeholder="Vấn đề cần hỗ trợ"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung *</Label>
                    <Textarea
                      id="message"
                      placeholder="Mô tả chi tiết vấn đề của bạn..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cmcBlue-600 hover:bg-cmcBlue-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Departments */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Bộ phận hỗ trợ
              </h3>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                    Phòng Công tác Sinh viên (PCTSV)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Chức năng:</strong> Quản lý đặt phòng, thêm/sửa
                      thông tin phòng
                    </p>
                    <p>
                      <strong>Liên hệ:</strong> pctsv@cmc.edu.vn | 024 3755 6667
                    </p>
                    <p>
                      <strong>Địa điểm:</strong> Tầng 1, Tòa CS1
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-green-600" />
                    Bộ phận Kỹ thuật
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Chức năng:</strong> Hỗ trợ kỹ thuật hệ thống, sửa
                      lỗi
                    </p>
                    <p>
                      <strong>Liên hệ:</strong> support@cmc.edu.vn | 024 3755
                      6668
                    </p>
                    <p>
                      <strong>Thời gian:</strong> 24/7 qua email
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-purple-600" />
                    Quản trị hệ thống
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Chức năng:</strong> Quản lý tài khoản, phân quyền
                    </p>
                    <p>
                      <strong>Liên hệ:</strong> admin@cmc.edu.vn | 024 3755 6666
                    </p>
                    <p>
                      <strong>Địa điểm:</strong> Tầng 2, Tòa CS1
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-orange-600" />
                    Bảo vệ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Chức năng:</strong> Kiểm tra đặt phòng, giám sát
                      sử dụng
                    </p>
                    <p>
                      <strong>Liên hệ:</strong> Trực tiếp tại cổng trường
                    </p>
                    <p>
                      <strong>Thời gian:</strong> 6:00 - 22:00 hàng ngày
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Một số câu hỏi và câu trả lời phổ biến về hệ thống đặt phòng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Làm thế nào để đặt phòng?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Đăng nhập bằng email trường học, tìm kiếm phòng phù hợp, chọn
                  thời gian và điền thông tin đặt phòng. Hệ thống sẽ tự động
                  duyệt nếu phòng trống và gửi email xác nhận.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mật khẩu mặc định là gì?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Mật khẩu mặc định cho tất cả tài khoản là "123456". Bạn nên
                  đổi mật khẩu ngay sau lần đăng nhập đầu tiên trong phần "Thông
                  tin cá nhân".
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thời gian nào có thể đặt phòng?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bạn có thể đặt phòng 24/7 qua hệ thống online. Tuy nhiên, việc
                  sử dụng phòng chỉ được phép trong giờ hành chính và theo quy
                  định của trường.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Làm thế nào để hủy đặt phòng?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Liên hệ với PCTSV qua email pctsv@cmc.edu.vn hoặc điện thoại
                  024 3755 6667 để hủy đặt phòng. Nên hủy ít nhất 2 giờ trước
                  thời gian sử dụng.
                </CardDescription>
              </CardContent>
            </Card>
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
                  <a href="#" className="hover:text-white transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hướng dẫn sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Quy định sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Chính sách bảo mật
                  </a>
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

export default Contact;
