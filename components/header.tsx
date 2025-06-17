"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Menu, User, LogOut, Settings, Bell, School } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useNotifications } from "@/lib/notification-context"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

  const navigationItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/rooms", label: "Danh sách phòng" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "sinh_vien":
        return { label: "Sinh viên", color: "bg-blue-500" }
      case "ctsv":
        return { label: "CTSV", color: "bg-green-500" }
      case "bao_ve":
        return { label: "Bảo vệ", color: "bg-amber-500" }
      case "admin":
        return { label: "Admin", color: "bg-red-500" }
      default:
        return { label: "User", color: "bg-gray-500" }
    }
  }

  const roleBadge = user ? getRoleBadge(user.vai_tro) : null

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <School className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                CMC Room Booking
              </h1>
              <p className="text-xs text-gray-600">Trường Đại học CMC</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-4 h-4" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Thông báo</h3>
                        {unreadCount > 0 && (
                          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            Đánh dấu đã đọc
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? "bg-blue-50" : ""
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.timestamp.toLocaleTimeString("vi-VN")}
                                </p>
                              </div>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">Không có thông báo mới</p>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* User Badge */}
                {roleBadge && <Badge className={`${roleBadge.color} text-white border-0`}>{roleBadge.label}</Badge>}

                {/* User Menu */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="hidden sm:inline font-medium">{user.ten_nguoi_dung}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-64 p-2">
                          <div className="p-3 border-b">
                            <p className="font-medium">{user.ten_nguoi_dung}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-600">Mã: {user.ma_nguoi_dung}</p>
                          </div>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/dashboard"
                              className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100"
                            >
                              <User className="w-4 h-4" />
                              <span>Bảng điều khiển</span>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/profile"
                              className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100"
                            >
                              <Settings className="w-4 h-4" />
                              <span>Cài đặt tài khoản</span>
                            </Link>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <button
                              onClick={logout}
                              className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 text-red-600"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Đăng xuất</span>
                            </button>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                    Đăng nhập
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* User Info on Mobile */}
                  {isAuthenticated && user && (
                    <div className="pb-4 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{user.ten_nguoi_dung}</p>
                          <p className="text-sm text-gray-600">{roleBadge?.label}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Auth Actions */}
                  {isAuthenticated ? (
                    <div className="pt-4 border-t space-y-3">
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="w-4 h-4 mr-2" />
                          Bảng điều khiển
                        </Button>
                      </Link>
                      <Button variant="outline" onClick={logout} className="w-full justify-start text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">Đăng nhập</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
