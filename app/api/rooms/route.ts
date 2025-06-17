import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const Co_so = searchParams.get("Co_so")
    const Suc_chua_min = searchParams.get("Suc_chua_min")
    const Suc_chua_max = searchParams.get("Suc_chua_max")

    const filters = {
      search: search || undefined,
      Co_so: Co_so || undefined,
      Suc_chua_min: Suc_chua_min ? Number.parseInt(Suc_chua_min) : undefined,
      Suc_chua_max: Suc_chua_max ? Number.parseInt(Suc_chua_max) : undefined,
    }

    const dbService = DatabaseService.getInstance()
    const rooms = await dbService.getRooms(filters)

    return NextResponse.json({
      success: true,
      data: rooms,
    })
  } catch (error) {
    console.error("Get rooms error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const roomData = await request.json()

    const dbService = DatabaseService.getInstance()
    const newRoom = await dbService.createRoom(roomData)

    return NextResponse.json({
      success: true,
      data: newRoom,
    })
  } catch (error) {
    console.error("Create room error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
