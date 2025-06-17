import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Calendar, ArrowRight, Search, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { rooms } from "@/lib/data"
import HeroSection from "@/components/hero-section"
import RoomFilter from "@/components/room-filter"

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* Room Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tìm phòng phù hợp</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hệ thống đặt phòng CMC cung cấp nhiều loại phòng khác nhau phù hợp với mọi nhu cầu học tập và hoạt động
              của sinh viên.
            </p>
          </div>

          <RoomFilter />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {rooms.slice(0, 8).map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge variant={room.available ? "default" : "secondary"}>
                      {room.available ? "Có sẵn" : "Đã đặt"}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {room.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{room.capacity} người</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Thiết bị:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.equipment.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {room.equipment.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{room.equipment.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link href={`/rooms/${room.id}`} className="w-full">
                    <Button className="w-full" disabled={!room.available}>
                      {room.available ? "Xem chi tiết" : "Không có sẵn"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rooms">
              <Button size="lg" className="gap-2">
                Xem tất cả phòng
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cách thức hoạt động</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đặt phòng tại CMC chỉ với vài bước đơn giản, nhanh chóng và tiện lợi
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tìm phòng</h3>
              <p className="text-gray-600">Tìm và chọn phòng phù hợp với nhu cầu của bạn</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chọn thời gian</h3>
              <p className="text-gray-600">Chọn ngày và khung giờ bạn muốn sử dụng phòng</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Điền thông tin</h3>
              <p className="text-gray-600">Cung cấp thông tin cá nhân và mục đích sử dụng</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Xác nhận</h3>
              <p className="text-gray-600">Nhận xác nhận đặt phòng qua email và sử dụng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Các loại phòng</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CMC cung cấp nhiều loại phòng khác nhau phù hợp với mọi nhu cầu học tập và hoạt động
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Phòng học nhóm</CardTitle>
                <CardDescription>Phù hợp cho nhóm nhỏ từ 5-20 người</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Phòng học nhóm"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Bàn ghế linh hoạt, dễ dàng sắp xếp
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Bảng trắng và màn hình TV
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Không gian yên tĩnh, phù hợp thảo luận
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/rooms?type=group" className="w-full">
                  <Button variant="outline" className="w-full">
                    Xem phòng học nhóm
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phòng hội thảo</CardTitle>
                <CardDescription>Phù hợp cho sự kiện lớn từ 30-100 người</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Phòng hội thảo"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Hệ thống âm thanh chuyên nghiệp
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Máy chiếu độ phân giải cao
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Sắp xếp chỗ ngồi linh hoạt
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/rooms?type=conference" className="w-full">
                  <Button variant="outline" className="w-full">
                    Xem phòng hội thảo
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phòng thực hành</CardTitle>
                <CardDescription>Phòng máy tính và thiết bị chuyên dụng</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Phòng thực hành"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Máy tính cấu hình cao
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Phần mềm chuyên ngành
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Thiết bị thực hành chuyên dụng
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/rooms?type=lab" className="w-full">
                  <Button variant="outline" className="w-full">
                    Xem phòng thực hành
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Những thắc mắc phổ biến về hệ thống đặt phòng tại CMC</p>
          </div>

          <div className="max-w-3xl mx-auto divide-y">
            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">Ai có thể đặt phòng tại CMC?</h3>
              <p className="text-gray-600">
                Tất cả sinh viên đang theo học tại CMC đều có thể đặt phòng. Bạn cần có thẻ sinh viên hợp lệ và tài
                khoản đăng nhập hệ thống.
              </p>
            </div>

            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">Tôi có thể đặt phòng trước bao lâu?</h3>
              <p className="text-gray-600">
                Bạn có thể đặt phòng trước tối đa 2 tuần và tối thiểu 2 giờ trước thời gian sử dụng, tùy thuộc vào loại
                phòng và mục đích sử dụng.
              </p>
            </div>

            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">Làm thế nào để hủy đặt phòng?</h3>
              <p className="text-gray-600">
                Bạn có thể hủy đặt phòng thông qua trang "Lịch sử đặt phòng" trong tài khoản của mình. Việc hủy phòng
                nên được thực hiện ít nhất 6 giờ trước thời gian sử dụng.
              </p>
            </div>

            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">Tôi có thể đặt phòng trong bao lâu?</h3>
              <p className="text-gray-600">
                Thời gian đặt phòng tối thiểu là 1 giờ và tối đa là 4 giờ cho một lần đặt. Nếu cần sử dụng lâu hơn, bạn
                cần được sự phê duyệt từ quản lý.
              </p>
            </div>

            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">Tôi cần mang theo gì khi đến sử dụng phòng?</h3>
              <p className="text-gray-600">
                Bạn cần mang theo thẻ sinh viên và mã xác nhận đặt phòng (được gửi qua email). Nhân viên quản lý sẽ kiểm
                tra trước khi bạn vào phòng.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/faq">
              <Button variant="outline" size="lg">
                Xem tất cả câu hỏi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bắt đầu đặt phòng ngay hôm nay</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Đăng nhập vào hệ thống để trải nghiệm dịch vụ đặt phòng nhanh chóng và tiện lợi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-blue-700">
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
