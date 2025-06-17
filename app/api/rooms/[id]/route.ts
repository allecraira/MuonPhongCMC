import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const dbService = DatabaseService.getInstance()
    const room = await dbService.getRoomById(params.id)

    if (!room) {
      return NextResponse.json({ success: false, message: "Không tìm thấy phòng" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: room,
    })
  } catch (error) {
    console.error("Get room error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const roomData = await request.json()
    const dbService = DatabaseService.getInstance()
    const result = await dbService.updateRoom(params.id, roomData)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Update room error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const dbService = DatabaseService.getInstance()
    const result = await dbService.deleteRoom(params.id)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Delete room error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
