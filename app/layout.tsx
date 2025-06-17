import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { BookingProvider } from "@/lib/booking-context"
import { NotificationProvider } from "@/lib/notification-context"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CMC Room Booking - Hệ thống đặt phòng sinh viên",
  description: "Hệ thống đặt phòng trực tuyến dành cho sinh viên CMC",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <BookingProvider>
              <NotificationProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </NotificationProvider>
            </BookingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
