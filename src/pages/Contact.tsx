import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
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
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";

const Contact = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Form state for validation feedback
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", role: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative bg-gradient-to-br from-cmcBlue-700 via-cmcBlue-800 to-cmcBlue-900 text-white py-28 overflow-hidden"
        style={{ backgroundPositionY: backgroundY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('/images/Contact.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
          >
            Liên hệ
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Chúng tôi luôn sẵn sàng hỗ trợ bạn với hệ thống đặt phòng CMC
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section
        ref={infoRef}
        initial="hidden"
        animate={infoInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <MapPin className="h-8 w-8 text-blue-600" />,
                title: "Địa chỉ",
                description: "Số 236 Hoàng Quốc Việt\nCổ Nhuế, Bắc Từ Liêm\nHà Nội, Việt Nam",
                bgColor: "bg-blue-50",
                hoverBg: "hover:bg-blue-100",
              },
              {
                icon: <Phone className="h-8 w-8 text-green-600" />,
                title: "Điện thoại",
                description: "Hotline: 024 3755 6666\nPCTSV: 024 3755 6667\nKỹ thuật: 024 3755 6668",
                bgColor: "bg-green-50",
                hoverBg: "hover:bg-green-100",
              },
              {
                icon: <Mail className="h-8 w-8 text-purple-600" />,
                title: "Email",
                description: "support@cmc.edu.vn\npctsv@cmc.edu.vn\nadmin@cmc.edu.vn",
                bgColor: "bg-purple-50",
                hoverBg: "hover:bg-purple-100",
              },
              {
                icon: <Clock className="h-8 w-8 text-orange-600" />,
                title: "Giờ làm việc",
                description: "Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00\nChủ nhật: Nghỉ làm việc",
                bgColor: "bg-orange-50",
                hoverBg: "hover:bg-orange-100",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Card className={`text-center p-6 ${item.bgColor} ${item.hoverBg} transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl`} role="region" aria-label={item.title}>
                  <CardHeader>
                    <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base whitespace-pre-line">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-semibold text-gray-800">
                    <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                    Gửi tin nhắn
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Điền thông tin dưới đây và chúng tôi sẽ phản hồi sớm nhất
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Họ và tên *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Nhập họ và tên"
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                          aria-required="true"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your-email@cmc.edu.vn"
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">Số điện thoại</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0123456789"
                          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-gray-700">Vai trò</Label>
                        <select
                          id="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500"
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
                      <Label htmlFor="subject" className="text-gray-700">Chủ đề *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Vấn đề cần hỗ trợ"
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                        aria-required="true"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">Nội dung *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mô tả chi tiết vấn đề của bạn..."
                        rows={5}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                        aria-required="true"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cmcBlue-600 to-blue-500 hover:from-cmcBlue-700 hover:to-blue-600 text-white transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
                      aria-label="Gửi tin nhắn"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Đang gửi...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Gửi tin nhắn
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Departments */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Bộ phận hỗ trợ</h3>
              {[
                {
                  icon: <Building2 className="h-5 w-5 text-blue-600" />,
                  title: "Phòng Công tác Sinh viên (PCTSV)",
                  details: [
                    { label: "Chức năng", value: "Quản lý đặt phòng, thêm/sửa thông tin phòng" },
                    { label: "Liên hệ", value: "pctsv@cmc.edu.vn | 024 3755 6667" },
                    { label: "Địa điểm", value: "Tầng 1, Tòa CS1" },
                  ],
                  bgColor: "bg-blue-50",
                  hoverBg: "hover:bg-blue-100",
                },
                {
                  icon: <Building2 className="h-5 w-5 text-green-600" />,
                  title: "Bộ phận Kỹ thuật",
                  details: [
                    { label: "Chức năng", value: "Hỗ trợ kỹ thuật hệ thống, sửa lỗi" },
                    { label: "Liên hệ", value: "support@cmc.edu.vn | 024 3755 6668" },
                    { label: "Thời gian", value: "24/7 qua email" },
                  ],
                  bgColor: "bg-green-50",
                  hoverBg: "hover:bg-green-100",
                },
                {
                  icon: <Building2 className="h-5 w-5 text-purple-600" />,
                  title: "Quản trị hệ thống",
                  details: [
                    { label: "Chức năng", value: "Quản lý tài khoản, phân quyền" },
                    { label: "Liên hệ", value: "admin@cmc.edu.vn | 024 3755 6666" },
                    { label: "Địa điểm", value: "Tầng 2, Tòa CS1" },
                  ],
                  bgColor: "bg-purple-50",
                  hoverBg: "hover:bg-purple-100",
                },
                {
                  icon: <Building2 className="h-5 w-5 text-orange-600" />,
                  title: "Bảo vệ",
                  details: [
                    { label: "Chức năng", value: "Kiểm tra đặt phòng, giám sát sử dụng" },
                    { label: "Liên hệ", value: "Trực tiếp tại cổng trường" },
                    { label: "Thời gian", value: "6:00 - 22:00 hàng ngày" },
                  ],
                  bgColor: "bg-orange-50",
                  hoverBg: "hover:bg-orange-100",
                },
              ].map((dept, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <Card className={`p-6 ${dept.bgColor} ${dept.hoverBg} transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl`} role="region" aria-label={dept.title}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
                        {dept.icon}
                        <span className="ml-2">{dept.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        {dept.details.map((detail, idx) => (
                          <p key={idx}>
                            <strong>{detail.label}:</strong> {detail.value}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-28 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Một số câu hỏi và câu trả lời phổ biến về hệ thống đặt phòng
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Làm thế nào để đặt phòng?",
                answer: "Đăng nhập bằng email trường học, tìm kiếm phòng phù hợp, chọn thời gian và điền thông tin đặt phòng. Hệ thống sẽ tự động duyệt nếu phòng trống và gửi email xác nhận.",
              },
              {
                question: "Mật khẩu mặc định là gì?",
                answer: "Mật khẩu mặc định cho tất cả tài khoản là '123456'. Bạn nên đổi mật khẩu ngay sau lần đăng nhập đầu tiên trong phần 'Thông tin cá nhân'.",
              },
              {
                question: "Thời gian nào có thể đặt phòng?",
                answer: "Bạn có thể đặt phòng 24/7 qua hệ thống online. Tuy nhiên, việc sử dụng phòng chỉ được phép trong giờ hành chính và theo quy định của trường.",
              },
              {
                question: "Làm thế nào để hủy đặt phòng?",
                answer: "Liên hệ với PCTSV qua email pctsv@cmc.edu.vn hoặc điện thoại 024 3755 6667 để hủy đặt phòng. Nên hủy ít nhất 2 giờ trước thời gian sử dụng.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Card className="p-6 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base">{faq.answer}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                  alt="CMC Room Booking Logo"
                  className="h-12 w-12"
                />
                <div>
                  <div className="font-bold text-white text-lg">CMC Room Booking</div>
                  <div className="text-xs text-gray-400">Trường Đại học CMC</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Hệ thống đặt phòng trực tuyến hiện đại, tiện lợi và nhanh chóng dành cho sinh viên Trường Đại học CMC.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  { to: "/", text: "Trang chủ" },
                  { to: "/rooms", text: "Danh sách phòng" },
                  { to: "/about", text: "Giới thiệu" },
                  { to: "/contact", text: "Liên hệ" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="hover:text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 outline-none"
                      aria-label={link.text}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-semibold text-lg mb-4">Hỗ trợ</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  { to: "#", text: "Trung tâm trợ giúp" },
                  { to: "#", text: "Hướng dẫn sử dụng" },
                  { to: "#", text: "Quy định sử dụng" },
                  { to: "#", text: "Chính sách bảo mật" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.to}
                      className="hover:text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 outline-none"
                      aria-label={link.text}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>📍 Số 236 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội</li>
                <li>📞 024 3755 6666</li>
                <li>✉️ support@cmc.edu.vn</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border-t border-gray-800 mt-12 pt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              © 2025 Trường Đại học CMC. Tất cả quyền được hội sở hữu bởi Hội Bàn Tròn hẹ hẹ hẹ 
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;