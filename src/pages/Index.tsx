import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { getCMCUniversityInfo, CMCUniversityInfo } from "@/lib/cmcApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Building2,
  GraduationCap,
  Award,
  Target,
  Heart,
  Handshake,
  BookOpen,
  Calculator,
  Trophy,
  UserCheck,
  Globe,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [cmcInfo, setCmcInfo] = useState<CMCUniversityInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCMCInfo = async () => {
      try {
        const info = await getCMCUniversityInfo();
        setCmcInfo(info);
      } catch (error) {
        console.error("Error loading CMC info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCMCInfo();
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Show loading state
  if (isLoading || !cmcInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex items-center justify-center py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cmcBlue-600 mx-auto"></div>
            <p className="mt-6 text-gray-700 text-lg font-medium animate-pulse">
              Đang tải thông tin trường...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section with Banner */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-br from-cmcBlue-700 via-cmcBlue-800 to-cmcBlue-900 text-white py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/Main.webp"
            alt="CMC University Campus"
            className="w-full h-full object-cover opacity-70 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cmcBlue-700/20 via-cmcBlue-800/20 to-cmcBlue-900/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            {cmcInfo.fullName}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            {cmcInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/rooms">
              <Button
                size="lg"
                className="bg-white text-cmcBlue-700 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Đặt phòng ngay
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-4 border-blue-400 bg-blue-500/70 text-white hover:bg-blue-600 hover:border-blue-600 px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 font-bold text-xl"
              >
                <BookOpen className="mr-2 h-6 w-6" />
                Tìm hiểu thêm
              </Button>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {[
              { value: `${cmcInfo.statistics.yearsOfOperation}+`, label: "Năm kinh nghiệm" },
              { value: `${cmcInfo.statistics.totalStudents.toLocaleString()}+`, label: "Sinh viên" },
              { value: `${cmcInfo.statistics.employmentRate}%`, label: "Tỷ lệ có việc làm" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Lịch sử hình thành
              </h2>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  {cmcInfo.fullName} được thành lập vào năm{" "}
                  {cmcInfo.established}, là một trong những trường đại học tư
                  thục hàng đầu Việt Nam trong lĩnh vực đào tạo Công nghệ thông
                  tin và Kinh tế.
                </p>
                <p>
                  Với {cmcInfo.statistics.totalStudents.toLocaleString()} sinh
                  viên và {cmcInfo.statistics.totalTeachers} giảng viên, trường
                  luôn không ngừng đổi mới và nâng cao chất lượng giáo dục, đạt
                  tỷ lệ có việc làm {cmcInfo.statistics.employmentRate}% sau tốt
                  nghiệp.
                </p>
                <p>
                  Trường hiện có {cmcInfo.facilities.length} khu nhà hiện đại
                  với đầy đủ trang thiết bị học tập, phòng thí nghiệm và không
                  gian sinh hoạt cho sinh viên.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative rounded-xl shadow-2xl overflow-hidden"
              variants={fadeIn}
            >
              <img
                src="/images/Banner.jpg"
                alt="CMC University Building"
                className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Tầm nhìn",
                icon: <Target className="h-8 w-8 text-blue-600" />,
                bgColor: "bg-blue-100",
                description:
                  "Trở thành trường đại học hàng đầu trong khu vực về đào tạo công nghệ thông tin và kinh tế, góp phần xây dựng giáo dục Việt Nam đạt chuẩn quốc tế và chương trình đào tạo tiên tiến.",
              },
              {
                title: "Sứ mệnh",
                icon: <Heart className="h-8 w-8 text-red-600" />,
                bgColor: "bg-red-100",
                description:
                  "Đào tạo nguồn nhân lực chất lượng cao, có tư duy sáng tạo, kỹ năng thực hành tốt và năng lực thích ứng với môi trường làm việc quốc tế.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeIn} transition={{ delay: index * 0.2 }}>
                <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-4 ${item.bgColor} rounded-full`}>
                        {item.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-700 leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Giá trị cốt lõi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Chất lượng",
                icon: <Award className="h-8 w-8 text-green-600" />,
                bgColor: "bg-green-100",
                description:
                  "Cam kết đạt được chất lượng giáo dục cao với đội ngũ giảng viên giàu kinh nghiệm và chương trình đào tạo cập nhật.",
              },
              {
                title: "Sáng tạo",
                icon: <Star className="h-8 w-8 text-yellow-600" />,
                bgColor: "bg-yellow-100",
                description:
                  "Khuyến khích tính sáng tạo và đổi mới trong đào tạo để mỗi thành viên đều có cơ hội phát triển tài năng và sự nghiệp.",
              },
              {
                title: "Hợp tác",
                icon: <Handshake className="h-8 w-8 text-purple-600" />,
                bgColor: "bg-purple-100",
                description:
                  "Xây dựng văn hóa hợp tác học tập giữa sinh viên, giảng viên và doanh nghiệp để tạo giá trị bền vững.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div
                      className={`p-4 ${value.bgColor} rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}
                    >
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl font-bold mb-2">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-700 leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Departments */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Khoa và ngành đào tạo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cmcInfo.faculties.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4 flex items-center">
                      {index === 0 && (
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                      )}
                      {index === 1 && (
                        <Calculator className="h-8 w-8 text-green-600 mr-3" />
                      )}
                      {index === 2 && (
                        <GraduationCap className="h-8 w-8 text-purple-600 mr-3" />
                      )}
                      {faculty.name}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700 mb-6 leading-relaxed">
                      {faculty.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2 text-sm mb-4">
                      {faculty.majors.slice(0, 4).map((major) => (
                        <div key={major} className="font-semibold text-gray-800">
                          • {major}
                        </div>
                      ))}
                      {faculty.majors.length > 4 && (
                        <div className="text-gray-500">
                          +{faculty.majors.length - 4} chuyên ngành khác
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Trưởng khoa:</strong> {faculty.dean}
                      </p>
                      <p>
                        <strong>Sinh viên:</strong>{" "}
                        {faculty.students.toLocaleString()} sinh viên
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Facilities */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Cơ sở vật chất
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tòa CS1",
                description: "Tòa học chính - 8 tầng",
                features: [
                  "Hội trường lớn (500 chỗ)",
                  "Phòng họp 2 ngôn ngữ",
                  "Văn phòng hành chính",
                  "Thư viện trung tâm",
                ],
                image: "/images/CS1.1.jpg",
              },
              {
                title: "Tòa CS2",
                description: "Tòa học chính - 4 tầng",
                features: [
                  "Phòng học màn hình lớn",
                  "Phòng seminar",
                  "Phục vụ nghỉ ngơi",
                  "Cảng lưu sinh viên",
                ],
                image: "/images/CS1.jpg",
              },
              {
                title: "Tòa CS3",
                description: "Tòa học chính - 4 tầng",
                features: [
                  "Phòng lab máy tính",
                  "Phòng thí nghiệm",
                  "Studio thiết kế",
                  "Trung tâm sức khỏe nghiên",
                ],
                image: "/images/CS3.jpg",
              },
            ].map((facility, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-48 object-cover rounded-lg mb-4 transform hover:scale-105 transition-transform duration-300"
                    />
                    <CardTitle className="text-xl font-bold">{facility.title}</CardTitle>
                    <CardDescription className="text-gray-700">{facility.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {facility.features.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Thành tích nổi bật
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Trophy className="h-8 w-8 text-blue-600" />,
                bgColor: "bg-blue-100",
                value: "Top 10",
                label: "Trường đại học tư thức tốt nhất Việt Nam",
              },
              {
                icon: <UserCheck className="h-8 w-8 text-green-600" />,
                bgColor: "bg-green-100",
                value: "500+",
                label: "Doanh nghiệp đối tác tuyển dụng",
              },
              {
                icon: <Globe className="h-8 w-8 text-purple-600" />,
                bgColor: "bg-purple-100",
                value: "50+",
                label: "Chương trình đào tào quốc tế hợp tác",
              },
              {
                icon: <Clock className="h-8 w-8 text-orange-600" />,
                bgColor: "bg-orange-100",
                value: "95%",
                label: "Sinh viên có việc làm sau tốt nghiệp",
              },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  className={`p-4 ${achievement.bgColor} rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}
                >
                  {achievement.icon}
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-2">
                  {achievement.value}
                </div>
                <div className="text-gray-600 text-base">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="bg-gray-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                  alt="CMC Room Booking"
                  className="h-10 w-10"
                />
                <div>
                  <div className="font-bold text-white text-lg">CMC Room Booking</div>
                  <div className="text-xs text-gray-400">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Hệ thống đặt phòng trực tuyến hiện đại, tiện lợi và nhanh chóng
                dành cho sinh viên Trường Đại học CMC.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Liên kết nhanh</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  { to: "/", label: "Trang chủ" },
                  { to: "/rooms", label: "Danh sách phòng" },
                  { to: "#about", label: "Giới thiệu" },
                  { to: "#contact", label: "Liên hệ" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Hỗ trợ</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  "Trung tâm trợ giúp",
                  "Liên hệ CTSY",
                  "Quy định sử dụng",
                  "Chính sách bảo mật",
                ].map((item, index) => (
                  <li key={index}>
                    <Link to="#" className="hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Liên hệ</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>📍 {cmcInfo.address}</li>
                <li>📞 {cmcInfo.phone}</li>
                <li>✉️ {cmcInfo.email}</li>
                <li>🌐 {cmcInfo.website}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Trường Đại học CMC. Tất cả quyền được hội sở hữu bởi Hội Bàn Tròn hẹ hẹ hẹ 
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;