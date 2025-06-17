import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function GET() {
  try {
    const dbService = DatabaseService.getInstance()
    const stats = await dbService.getStatistics()

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error("Get statistics error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
