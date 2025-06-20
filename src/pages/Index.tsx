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

  // Show loading state
  if (isLoading || !cmcInfo) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cmc-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải thông tin trường...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cmcBlue-600 via-cmcBlue-700 to-cmcBlue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Về {cmcInfo.fullName}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto">
            {cmcInfo.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {cmcInfo.statistics.yearsOfOperation}+
              </div>
              <div className="text-blue-200">Năm kinh nghiệm</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {cmcInfo.statistics.totalStudents.toLocaleString()}+
              </div>
              <div className="text-blue-200">Sinh viên</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {cmcInfo.statistics.employmentRate}%
              </div>
              <div className="text-blue-200">Tỷ lệ có việc làm</div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Lịch sử hình thành
              </h2>
              <div className="space-y-4 text-gray-600">
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
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <Building2 className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Tầm nhìn</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Trở thành trường đại học hàng đầu trong khu vực về đào tạo
                  công nghệ thông tin và kinh tế, góp phần xây dựng giáo dục
                  Việt Nam đạt chuẩn quốc tế và chương trình đào tạo tiên tiến.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl">Sứ mệnh</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Đào tạo nguồn nhân lực chất lượng cao, có tư duy sáng tạo, kỹ
                  năng thực hành tốt và năng lực thích ứng với môi trường làm
                  việc quốc tế.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-2">Chất lượng</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cam kết đạt được chất lượng giáo dục cao với đội ngũ giảng
                  viên giàu kinh nghiệm và chương trình đào tạo cập nhật.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="p-4 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl mb-2">Sáng tạo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Khuyến khích tính sáng tạo và đổi mới trong đào tạo để mỗi
                  thành viên đều có cơ hội phát triển tài năng và sự nghiệp.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl mb-2">Hợp tác</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Xây dựng văn hóa hợp tác học tập giữa sinh viên, giảng viên và
                  doanh nghiệp để tạo giá trị bền vững.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Khoa và ngành đào tạo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cmcInfo.faculties.map((faculty, index) => (
              <Card key={faculty.id} className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4 flex items-center">
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
                  <CardDescription className="text-base mb-6">
                    {faculty.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2 text-sm mb-4">
                    {faculty.majors.slice(0, 4).map((major) => (
                      <div key={major} className="font-semibold">
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
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cơ sở vật ch���t
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-gray-400" />
                </div>
                <CardTitle className="text-xl">Tòa CS1</CardTitle>
                <CardDescription>Tòa học chính - 8 tầng</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Hội trường lớn (500 chỗ)</li>
                  <li>• Phòng họp 2 ngôn ngữ</li>
                  <li>• Văn phòng hành chính</li>
                  <li>• Thư viện trung tâm</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-gray-400" />
                </div>
                <CardTitle className="text-xl">Tòa CS2</CardTitle>
                <CardDescription>Tòa học chính - 4 tầng</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Phòng học màn hình lớn</li>
                  <li>• Phòng seminar</li>
                  <li>• Phục vụ nghỉ ngơi</li>
                  <li>• Cảng lưu sinh viên</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-gray-400" />
                </div>
                <CardTitle className="text-xl">Tòa CS3</CardTitle>
                <CardDescription>Tòa học chính - 4 tầng</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Phòng lab máy tính</li>
                  <li>• Phòng thí nghiệm</li>
                  <li>• Studio thiết kế</li>
                  <li>• Trung tâm sức khỏe nghiên</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thành tích nổi bật
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                Top 10
              </div>
              <div className="text-gray-600">
                Trường đại học tư thức tốt nhất Việt Nam
              </div>
            </div>

            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">
                Doanh nghiệp đối tác tuyển dụng
              </div>
            </div>

            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">
                Chương trình đào tào quốc tế hợp tác
              </div>
            </div>

            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">
                Sinh viên có việc làm sau tốt nghiệp
              </div>
            </div>
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
                    to="#about"
                    className="hover:text-white transition-colors"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact"
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
                    Liên hệ CTSY
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
                <li>📍 {cmcInfo.address}</li>
                <li>📞 {cmcInfo.phone}</li>
                <li>✉️ {cmcInfo.email}</li>
                <li>🌐 {cmcInfo.website}</li>
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

export default Index;
