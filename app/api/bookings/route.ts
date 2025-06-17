import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const Ma_nguoi_dung = searchParams.get("Ma_nguoi_dung")
    const Ma_phong = searchParams.get("Ma_phong")
    const trang_thai = searchParams.get("trang_thai")
    const Ngay = searchParams.get("Ngay")

    const filters = {
      Ma_nguoi_dung: Ma_nguoi_dung || undefined,
      Ma_phong: Ma_phong || undefined,
      trang_thai: trang_thai || undefined,
      Ngay: Ngay || undefined,
    }

    const dbService = DatabaseService.getInstance()
    const bookings = await dbService.getBookings(filters)

    return NextResponse.json({
      success: true,
      data: bookings,
    })
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    const dbService = DatabaseService.getInstance()
    const newBooking = await dbService.createBooking(bookingData)

    return NextResponse.json({
      success: true,
      data: newBooking,
    })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
