import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database-service"

export async function POST(request: NextRequest) {
  try {
    const { ma_nguoi_dung, mat_khau } = await request.json()

    if (!ma_nguoi_dung || !mat_khau) {
      return NextResponse.json({ success: false, message: "Thiếu thông tin đăng nhập" }, { status: 400 })
    }

    const dbService = DatabaseService.getInstance()
    const user = await dbService.getUserByCredentials(ma_nguoi_dung, mat_khau)

    if (!user) {
      return NextResponse.json({ success: false, message: "Thông tin đăng nhập không chính xác" }, { status: 401 })
    }

    if (user.trang_thai !== "hoat_dong") {
      return NextResponse.json({ success: false, message: "Tài khoản đã bị khóa" }, { status: 403 })
    }

    // Create simple token for demo
    const token = Buffer.from(
      JSON.stringify({
        id: user._id,
        ma_nguoi_dung: user.ma_nguoi_dung,
        vai_tro: user.vai_tro,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    ).toString("base64")

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          ma_nguoi_dung: user.ma_nguoi_dung,
          ten_nguoi_dung: user.ten_nguoi_dung,
          email: user.email,
          vai_tro: user.vai_tro,
        },
        token,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
