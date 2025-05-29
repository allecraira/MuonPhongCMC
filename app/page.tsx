import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Home, Info, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <span className="text-lg font-bold">CMC Room Booking</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Trang chủ
            </Link>
            <Link href="/rooms" className="text-sm font-medium hover:underline underline-offset-4">
              Danh sách phòng
            </Link>
            <Link href="/booking" className="text-sm font-medium hover:underline underline-offset-4">
              Đặt phòng
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              Giới thiệu
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/booking">
              <Button>Đặt phòng ngay</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Hệ Thống Đặt Phòng Học CMC
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Đặt phòng học một cách nhanh chóng và tiện lợi cho các hoạt động học tập và ngoại khóa.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/booking">
                  <Button size="lg">Đặt phòng ngay</Button>
                </Link>
                <Link href="/rooms">
                  <Button variant="outline" size="lg">
                    Xem phòng trống
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Đơn giản & Nhanh chóng</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Đặt phòng chỉ với vài bước đơn giản
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hệ thống đặt phòng CMC giúp sinh viên dễ dàng tìm và đặt phòng học cho các hoạt động học tập, họp
                  nhóm, và sự kiện.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Xem lịch phòng trống</h3>
                    <p className="text-muted-foreground">
                      Dễ dàng kiểm tra phòng nào đang trống theo ngày và giờ bạn cần.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-8 w-8 text-primary" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Đặt phòng nhanh chóng</h3>
                    <p className="text-muted-foreground">
                      Hoàn thành việc đặt phòng chỉ trong vài phút với form đơn giản.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Phù hợp mọi nhu cầu</h3>
                    <p className="text-muted-foreground">
                      Đa dạng loại phòng phù hợp cho học nhóm, hội thảo, hay sự kiện lớn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Các phòng phổ biến</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Khám phá các phòng được sinh viên CMC sử dụng nhiều nhất
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Phòng học A101",
                    capacity: "30 người",
                    features: "Máy chiếu, Bảng thông minh",
                  },
                  {
                    name: "Phòng hội thảo B205",
                    capacity: "50 người",
                    features: "Hệ thống âm thanh, Máy chiếu HD",
                  },
                  {
                    name: "Phòng học nhóm C103",
                    capacity: "15 người",
                    features: "Bảng trắng, Bàn tròn",
                  },
                ].map((room, index) => (
                  <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-2">
                      <h3 className="text-xl font-bold">{room.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>Sức chứa: {room.capacity}</p>
                        <p>Trang thiết bị: {room.features}</p>
                      </div>
                      <Link href="/booking">
                        <Button className="w-full mt-4">Đặt ngay</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Quy trình đặt phòng</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Đặt phòng dễ dàng chỉ với 3 bước đơn giản
              </p>
              <div className="grid gap-8 sm:grid-cols-3">
                <div className="space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Chọn phòng và thời gian</h3>
                  <p className="text-muted-foreground">Lựa chọn phòng phù hợp và khung thời gian bạn cần sử dụng</p>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Điền thông tin đặt phòng</h3>
                  <p className="text-muted-foreground">Cung cấp thông tin cá nhân và mục đích sử dụng phòng</p>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Nhận xác nhận</h3>
                  <p className="text-muted-foreground">Nhận thông báo xác nhận đặt phòng thành công qua email</p>
                </div>
              </div>
              <div className="flex justify-center pt-8">
                <Link href="/booking">
                  <Button size="lg">Bắt đầu đặt phòng</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:py-8 px-4 md:px-6">
          <div className="flex flex-col gap-2 md:gap-4 md:flex-1">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span className="text-lg font-bold">CMC Room Booking</span>
            </div>
            <p className="text-sm text-muted-foreground">Hệ thống đặt phòng học dành cho sinh viên CMC</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:flex-1">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Liên kết</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:underline">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/rooms" className="text-muted-foreground hover:underline">
                    Danh sách phòng
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="text-muted-foreground hover:underline">
                    Đặt phòng
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Trợ giúp</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:underline">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-muted-foreground hover:underline">
                    Hướng dẫn
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Thông tin</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:underline">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="text-muted-foreground hover:underline">
                    Chính sách
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:underline">
                    Điều khoản
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CMC Room Booking. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Info className="h-4 w-4" />
                <span className="sr-only">Info</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
