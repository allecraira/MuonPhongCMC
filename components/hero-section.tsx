"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const features = [
    {
      icon: Calendar,
      title: "Đặt phòng dễ dàng",
      description: "Giao diện thân thiện, đặt phòng chỉ trong vài click",
    },
    {
      icon: Clock,
      title: "Quản lý thời gian",
      description: "Theo dõi lịch trình và thời gian sử dụng phòng",
    },
    {
      icon: MapPin,
      title: "Tìm phòng nhanh chóng",
      description: "Tìm kiếm phòng theo vị trí và tiện nghi",
    },
    {
      icon: Users,
      title: "Phân quyền rõ ràng",
      description: "Hệ thống phân quyền cho từng đối tượng người dùng",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/cmc-campus.jpg" alt="CMC Campus" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-800/70 to-cyan-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/cmc-logo.png"
                  alt="CMC Room Booking"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hệ thống đặt phòng
                  <span className="block text-teal-300">thông minh CMC</span>
                </h1>
                <p className="text-xl lg:text-2xl text-teal-100 leading-relaxed">
                  Quản lý và đặt phòng học hiện đại, tối ưu hóa không gian học tập tại Trường Đại học CMC
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Đăng nhập hệ thống
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-teal-900 px-8 py-3 text-lg"
                  >
                    Tìm hiểu thêm
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl lg:text-3xl font-bold">50+</div>
                  <div className="text-teal-200 text-sm">Phòng học</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl lg:text-3xl font-bold">24/7</div>
                  <div className="text-teal-200 text-sm">Hỗ trợ</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl lg:text-3xl font-bold">1000+</div>
                  <div className="text-teal-200 text-sm">Người dùng</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl lg:text-3xl font-bold">99%</div>
                  <div className="text-teal-200 text-sm">Uptime</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Tính năng nổi bật</h2>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="bg-teal-500 rounded-lg p-2">
                              <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                              <p className="text-sm text-teal-100">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
