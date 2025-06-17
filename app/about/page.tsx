import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Award, Target, Heart, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Về Trường Đại học CMC</h1>
            <p className="text-xl text-blue-100 mb-8">
              Trường Đại học CMC - Nơi đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ thông tin và Kinh
              tế
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-blue-200">Năm kinh nghiệm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-blue-200">Sinh viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-blue-200">Tỷ lệ có việc làm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Giới thiệu chung */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Lịch sử hình thành</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Trường Đại học CMC được thành lập vào năm 2009, là một trong những trường đại học tư thục hàng đầu
                  Việt Nam trong lĩnh vực đào tạo Công nghệ thông tin và Kinh tế.
                </p>
                <p>
                  Với sứ mệnh đào tạo nguồn nhân lực chất lượng cao, sáng tạo và có khả năng thích ứng với sự phát triển
                  của khoa học công nghệ, CMU luôn không ngừng đổi mới và nâng cao chất lượng giáo dục.
                </p>
                <p>
                  Trường hiện có 3 tòa nhà hiện đại (CS1, CS2, CS3) với đầy đủ trang thiết bị học tập, phòng thí nghiệm
                  và không gian sinh hoạt cho sinh viên.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Trường Đại học CMC"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* Tầm nhìn - Sứ mệnh */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  Tầm nhìn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Trở thành trường đại học hàng đầu trong khu vực về đào tạo công nghệ thông tin và kinh tế, góp phần
                  xây dựng xã hội tri thức và phát triển bền vững đất nước.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-600" />
                  Sứ mệnh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Đào tạo nguồn nhân lực chất lượng cao, có tư duy sáng tạo, kỹ năng thực hành tốt và khả năng thích ứng
                  với môi trường làm việc quốc tế.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Giá trị cốt lõi */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  Chất lượng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cam kết mang đến chất lượng giáo dục cao nhất với đội ngũ giảng viên giàu kinh nghiệm và chương trình
                  đào tạo cập nhật.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  Sáng tạo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Khuyến khích tinh thần sáng tạo, đổi mới trong học tập và nghiên cứu, tạo môi trường thuận lợi cho
                  sinh viên phát triển ý tưởng.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  Hợp tác
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Xây dựng môi trường học tập hợp tác, gắn kết giữa sinh viên, giảng viên và doanh nghiệp để tạo ra giá
                  trị bền vững.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Khoa và ngành đào tạo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Khoa và ngành đào tạo</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Khoa Công nghệ thông tin</CardTitle>
                <CardDescription>Đào tạo chuyên sâu về lĩnh vực IT</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Kỹ thuật phần mềm</Badge>
                    <Badge variant="outline">Khoa học máy tính</Badge>
                    <Badge variant="outline">Hệ thống thông tin</Badge>
                    <Badge variant="outline">An toàn thông tin</Badge>
                    <Badge variant="outline">Trí tuệ nhân tạo</Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Chương trình đào tạo hiện đại, kết hợp lý thuyết và thực hành, hợp tác với các doanh nghiệp công
                    nghệ hàng đầu.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Khoa Kinh tế</CardTitle>
                <CardDescription>Đào tạo nhân lực kinh tế chất lượng cao</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Quản trị kinh doanh</Badge>
                    <Badge variant="outline">Kế toán - Kiểm toán</Badge>
                    <Badge variant="outline">Tài chính - Ngân hàng</Badge>
                    <Badge variant="outline">Marketing</Badge>
                    <Badge variant="outline">Kinh tế số</Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Chương trình đào tạo theo chuẩn quốc tế, trang bị kiến thức và kỹ năng cần thiết cho thị trường lao
                    động hiện đại.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cơ sở vật chất */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Cơ sở vật chất</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Tòa CS1</CardTitle>
                <CardDescription>Tòa nhà chính - 5 tầng</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Tòa CS1"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Hội trường lớn (150 chỗ)</li>
                  <li>• Phòng học lý thuyết</li>
                  <li>• Văn phòng hành chính</li>
                  <li>• Thư viện trung tâm</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tòa CS2</CardTitle>
                <CardDescription>Tòa học tập - 4 tầng</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Tòa CS2"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Phòng học nhóm nhỏ</li>
                  <li>• Phòng seminar</li>
                  <li>• Khu vực nghỉ ngơi</li>
                  <li>• Căng tin sinh viên</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tòa CS3</CardTitle>
                <CardDescription>Tòa thực hành - 4 tầng</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Tòa CS3"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Phòng lab máy tính</li>
                  <li>• Phòng thí nghiệm</li>
                  <li>• Studio thiết kế</li>
                  <li>• Trung tâm khởi nghiệp</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Thành tích */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Thành tích nổi bật</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Top 10</h3>
                <p className="text-sm text-gray-600">Trường đại học tư thục tốt nhất Việt Nam</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">500+</h3>
                <p className="text-sm text-gray-600">Doanh nghiệp đối tác tuyển dụng</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">50+</h3>
                <p className="text-sm text-gray-600">Chương trình đào tạo chất lượng cao</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">95%</h3>
                <p className="text-sm text-gray-600">Sinh viên có việc làm sau tốt nghiệp</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
