"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { SuccessAnimation } from "@/components/ui/success-animation"
import { Eye, EyeOff, LogIn, School } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [ma_nguoi_dung, setMaNguoiDung] = useState("")
  const [mat_khau, setMatKhau] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ma_nguoi_dung || !mat_khau) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      })
      return
    }

    const success = await login(ma_nguoi_dung, mat_khau)

    if (success) {
      setIsSuccess(true)
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn đến với hệ thống đặt phòng CMC",
      })

      // Redirect based on user role after successful login
      setTimeout(() => {
        // Get user role from localStorage after login
        const savedUser = localStorage.getItem("cmc_user")
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          switch (userData.vai_tro) {
            case "admin":
              router.push("/admin")
              break
            case "ctsv":
              router.push("/ctsv")
              break
            case "bao_ve":
              router.push("/security")
              break
            case "sinh_vien":
            default:
              router.push("/dashboard")
              break
          }
        }
      }, 1500)
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: "Thông tin đăng nhập không chính xác",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/login-bg.jpg" alt="CMC Campus" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-cyan-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6 lg:pr-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <School className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">CMC University</h1>
                <p className="text-blue-200">Hệ thống đặt phòng thông minh</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Chào mừng đến với hệ thống đặt phòng CMC</h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Hệ thống quản lý và đặt phòng học hiện đại, giúp tối ưu hóa việc sử dụng không gian học tập tại Trường
                Đại học CMC.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200 text-sm">Phòng học</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Hỗ trợ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-blue-200 text-sm">Người dùng</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-blue-200 text-sm">Uptime</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800">Đăng nhập hệ thống</CardTitle>
                <CardDescription className="text-gray-600">Nhập thông tin đăng nhập của bạn</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <SuccessAnimation text="Đăng nhập thành công!" />
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="ma_nguoi_dung" className="text-sm font-medium text-gray-700">
                        Mã người dùng
                      </Label>
                      <Input
                        id="ma_nguoi_dung"
                        type="text"
                        value={ma_nguoi_dung}
                        onChange={(e) => setMaNguoiDung(e.target.value)}
                        placeholder="Nhập mã sinh viên hoặc mã nhân viên"
                        className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300"
                      />
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="mat_khau" className="text-sm font-medium text-gray-700">
                        Mật khẩu
                      </Label>
                      <div className="relative">
                        <Input
                          id="mat_khau"
                          type={showPassword ? "text" : "password"}
                          value={mat_khau}
                          onChange={(e) => setMatKhau(e.target.value)}
                          placeholder="Nhập mật khẩu"
                          className="h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 text-white font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <LoadingSpinner size="sm" text="Đang đăng nhập..." />
                        ) : (
                          <>
                            <LogIn className="mr-2 h-4 w-4" />
                            Đăng nhập hệ thống
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}

                {/* Test Accounts */}
                {!isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="border-t pt-4"
                  >
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-3">Tài khoản test hệ thống:</p>
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-blue-50 p-2 rounded border">
                            <div className="font-medium text-blue-700">Sinh viên</div>
                            <div className="text-blue-600">BIT230372</div>
                            <div className="text-gray-500">Pass: 123456</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded border">
                            <div className="font-medium text-green-700">CTSV</div>
                            <div className="text-green-600">CTSV001</div>
                            <div className="text-gray-500">Pass: 123456</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-amber-50 p-2 rounded border">
                            <div className="font-medium text-amber-700">Bảo vệ</div>
                            <div className="text-amber-600">BV001</div>
                            <div className="text-gray-500">Pass: 123456</div>
                          </div>
                          <div className="bg-red-50 p-2 rounded border">
                            <div className="font-medium text-red-700">Admin</div>
                            <div className="text-red-600">ADMIN</div>
                            <div className="text-gray-500">Pass: 123456</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
