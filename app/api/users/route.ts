import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vai_tro = searchParams.get("vai_tro")
    const trang_thai = searchParams.get("trang_thai")

    const filters = {
      vai_tro: vai_tro || undefined,
      trang_thai: trang_thai || undefined,
    }

    const dbService = DatabaseService.getInstance()
    const users = await dbService.getUsers(filters)

    return NextResponse.json({
      success: true,
      data: users,
    })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    const dbService = DatabaseService.getInstance()
    const newUser = await dbService.createUser(userData)

    return NextResponse.json({
      success: true,
      data: newUser,
    })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
