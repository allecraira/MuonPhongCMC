import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { nguoi_duyet, ly_do_tu_choi } = await request.json()

    const dbService = DatabaseService.getInstance()
    const result = await dbService.updateBookingStatus(params.id, "tu_choi", nguoi_duyet, ly_do_tu_choi)

    return NextResponse.json({
      success: true,
      message: "Đã từ chối đặt phòng",
      data: result,
    })
  } catch (error) {
    console.error("Reject booking error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
