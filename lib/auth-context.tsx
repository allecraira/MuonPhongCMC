"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  ma_nguoi_dung: string
  ten_nguoi_dung: string
  email: string
  vai_tro: "sinh_vien" | "ctsv" | "bao_ve" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (ma_nguoi_dung: string, mat_khau: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users database
  const mockUsers = {
    BIT230372: {
      id: "1",
      ma_nguoi_dung: "BIT230372",
      ten_nguoi_dung: "Nguyễn Thị Tâm",
      email: "BIT230372@st.cmcu.edu.vn",
      vai_tro: "sinh_vien" as const,
      mat_khau: "123456",
    },
    CTSV001: {
      id: "2",
      ma_nguoi_dung: "CTSV001",
      ten_nguoi_dung: "Trần Văn CTSV",
      email: "ctsv@cmcu.edu.vn",
      vai_tro: "ctsv" as const,
      mat_khau: "123456",
    },
    BV001: {
      id: "3",
      ma_nguoi_dung: "BV001",
      ten_nguoi_dung: "Lê Văn Bảo vệ",
      email: "baove@cmcu.edu.vn",
      vai_tro: "bao_ve" as const,
      mat_khau: "123456",
    },
    ADMIN: {
      id: "4",
      ma_nguoi_dung: "ADMIN",
      ten_nguoi_dung: "Phạm Thị Admin",
      email: "admin@cmcu.edu.vn",
      vai_tro: "admin" as const,
      mat_khau: "123456",
    },
  }

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("cmc_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem("cmc_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (ma_nguoi_dung: string, mat_khau: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers[ma_nguoi_dung as keyof typeof mockUsers]

    if (mockUser && mockUser.mat_khau === mat_khau) {
      const { mat_khau: _, ...userWithoutPassword } = mockUser
      setUser(userWithoutPassword)
      localStorage.setItem("cmc_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("cmc_user")
    // Don't redirect here, let components handle it
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
