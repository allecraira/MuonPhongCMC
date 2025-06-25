import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
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
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

const About = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [systemRef, systemInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.3 });

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

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      {/* Hero Section with Banner */}
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
            backgroundImage: `url('/images/About1.webp')`, // Replace with your background image
          }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
          >
            Giới thiệu
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Hệ thống đặt phòng thông minh của Trường Đại học CMC
          </motion.p>
        </div>
      </motion.section>

      {/* About System */}
      <motion.section
        ref={systemRef}
        initial="hidden"
        animate={systemInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Về hệ thống đặt phòng
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hệ thống Mượn phòng CMC là giải pháp công nghệ hiện đại giúp tự động hóa quy trình đặt phòng học, phòng chức năng tại trường đại học, mang lại sự tiện lợi và hiệu quả cho toàn thể tệ cộng đồng trường học.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Đa người dùng",
                description: "Hỗ trợ sinh viên, giảng viên, PCTSV, admin và bảo vệ với các quyền hạn phù hợp",
                bgColor: "bg-blue-50",
                hoverBg: "hover:bg-blue-100",
              },
              {
                icon: <Clock className="h-8 w-8 text-green-600" />,
                title: "Tự động hóa",
                description: "Duyệt đặt phòng tự động khi phòng trống, gửi email xác nhận tức thì",
                bgColor: "bg-green-50",
                hoverBg: "hover:bg-green-100",
              },
              {
                icon: <Shield className="h-8 w-8 text-purple-600" />,
                title: "Bảo mật",
                description: "Phân quyền chặt chẽ, đăng nhập an toàn với email trường học",
                bgColor: "bg-purple-50",
                hoverBg: "hover:bg-purple-100",
              },
              {
                icon: <Globe className="h-8 w-8 text-orange-600" />,
                title: "Tiện lợi",
                description: "Truy cập mọi lúc mọi nơi, giao diện thân thiện trên mọi thiết bị",
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
                    <CardDescription className="text-gray-600 text-base">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-28 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Tính năng chính
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hệ thống cung cấp đầy đủ các tính năng cần thiết cho việc quản lý và sử dụng phòng học hiệu quả
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Cho sinh viên & giảng viên
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                    title: "Tìm kiếm phòng thông minh",
                    description: "Lọc theo thời gian, địa điểm, sức chứa và trang thiết bị",
                    bgColor: "bg-blue-50",
                    hoverBg: "hover:bg-blue-100",
                  },
                  {
                    icon: <Clock className="h-6 w-6 text-green-600" />,
                    title: "Đặt phòng nhanh chóng",
                    description: "Đặt phòng online, nhận email xác nhận tự động",
                    bgColor: "bg-green-50",
                    hoverBg: "hover:bg-green-100",
                  },
                  {
                    icon: <Users className="h-6 w-6 text-purple-600" />,
                    title: "Quản lý lịch cá nhân",
                    description: "Xem lịch sử đặt phòng và các buổi sắp tới",
                    bgColor: "bg-purple-50",
                    hoverBg: "hover:bg-purple-100",
                  },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-4 group"
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                    role="listitem"
                  >
                    <div className={`p-3 ${item.bgColor} ${item.hoverBg} rounded-full transition-transform duration-300 group-hover:scale-125`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-lg">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Cho quản trị viên
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Building2 className="h-6 w-6 text-red-600" />,
                    title: "Quản lý phòng học",
                    description: "Thêm, sửa, xóa thông tin phòng và trang thiết bị",
                    bgColor: "bg-red-50",
                    hoverBg: "hover:bg-red-100",
                  },
                  {
                    icon: <Award className="h-6 w-6 text-yellow-600" />,
                    title: "Thống kê & báo cáo",
                    description: "Xem báo cáo sử dụng phòng và thống kê hệ thống",
                    bgColor: "bg-yellow-50",
                    hoverBg: "hover:bg-yellow-100",
                  },
                  {
                    icon: <Shield className="h-6 w-6 text-teal-600" />,
                    title: "Quản lý người dùng",
                    description: "Phân quyền và quản lý tài khoản người dùng",
                    bgColor: "bg-teal-50",
                    hoverBg: "hover:bg-teal-100",
                  },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-4 group"
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                    role="listitem"
                  >
                    <div className={`p-3 ${item.bgColor} ${item.hoverBg} rounded-full transition-transform duration-300 group-hover:scale-125`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-lg">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        ref={missionRef}
        initial="hidden"
        animate={missionInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Mục tiêu",
                icon: <Target className="h-7 w-7 text-blue-600" />,
                bgColor: "bg-blue-50",
                hoverBg: "hover:bg-blue-100",
                items: [
                  "Tự động hóa quy trình đặt phòng",
                  "Tránh xung đột lịch đặt phòng",
                  "Hỗ trợ quản lý hiệu quả",
                  "Đảm bảo tính minh bạch và tiện lợi",
                ],
              },
              {
                title: "Cam kết",
                icon: <Award className="h-7 w-7 text-green-600" />,
                bgColor: "bg-green-50",
                hoverBg: "hover:bg-green-100",
                items: [
                  "Bảo mật thông tin tuyệt đối",
                  "Xử lý nhanh chóng trong 3 giây",
                  "Tương thích mọi thiết bị",
                  "Cập nhật liên tục theo nhu cầu",
                ],
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Card className={`p-8 ${card.bgColor} ${card.hoverBg} transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl`} role="region" aria-label={card.title}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-full transition-transform duration-300 hover:scale-110`}>
                        {card.icon}
                      </div>
                      <CardTitle className="text-2xl font-semibold text-gray-800">{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      {card.items.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5, transition: { duration: 0.3 } }}
                        >
                          <span className="text-blue-600">✅</span>
                          <span className="text-base">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-28 bg-gradient-to-r from-cmcBlue-700 to-cmcBlue-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-extrabold mb-4"
          >
            Bắt đầu sử dụng ngay
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Đăng nhập với tài khoản trường học để trải nghiệm hệ thống đặt phòng hiện đại
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/login">
              <Button
                size="lg"
                variant="secondary"
                className="relative bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
                aria-label="Đăng nhập vào hệ thống"
              >
                <span className="relative z-10">Đăng nhập</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link to="/rooms">
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-cmcBlue-600 to-blue-500 text-white border-none hover:from-cmcBlue-700 hover:to-blue-600 transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg hover:shadow-2xl"
                aria-label="Xem danh sách phòng"
              >
                <span className="relative z-10">Xem danh sách phòng</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-lg" />
              </Button>
            </Link>
          </motion.div>
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

export default About;