import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Home, Calendar } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container max-w-md py-10 px-4 md:px-6">
      <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardHeader className="text-center pb-2">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-300">Đặt phòng thành công!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Yêu cầu đặt phòng của bạn đã được ghi nhận. Chúng tôi sẽ gửi email xác nhận trong thời gian sớm nhất.
          </p>
          <div className="bg-background rounded-lg p-4 mt-4 text-left space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Mã đặt phòng:</span>
              <span className="text-sm font-bold">BK{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Vui lòng lưu lại mã đặt phòng để tra cứu hoặc hủy đặt phòng khi cần thiết.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/rooms">
              <Calendar className="mr-2 h-4 w-4" />
              Xem lịch đặt phòng
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
