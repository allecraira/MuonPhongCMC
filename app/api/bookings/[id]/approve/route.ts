import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { nguoi_duyet } = await request.json()

    const dbService = DatabaseService.getInstance()
    const result = await dbService.updateBookingStatus(params.id, "da_duyet", nguoi_duyet)

    return NextResponse.json({
      success: true,
      message: "Đã phê duyệt đặt phòng",
      data: result,
    })
  } catch (error) {
    console.error("Approve booking error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
