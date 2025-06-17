// API service for handling all backend communications
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export class ApiService {
  private static instance: ApiService
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "/api"

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  // Generic request method
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      }

      // Add auth token if available
      const token = localStorage.getItem("auth_token")
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }

      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Authentication APIs
  async login(credentials: { username: string; password: string; role: string }) {
    return this.request<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async logout() {
    return this.request("/auth/logout", { method: "POST" })
  }

  async refreshToken() {
    return this.request<{ token: string }>("/auth/refresh", { method: "POST" })
  }

  // Room APIs
  async getRooms(params?: {
    search?: string
    building?: string
    capacity?: number[]
    equipment?: string[]
    type?: string
    available?: boolean
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(","))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })
    }

    return this.request<PaginatedResponse<any>>(`/rooms?${queryParams}`)
  }

  async getRoomById(id: string) {
    return this.request<any>(`/rooms/${id}`)
  }

  async createRoom(roomData: any) {
    return this.request<any>("/rooms", {
      method: "POST",
      body: JSON.stringify(roomData),
    })
  }

  async updateRoom(id: string, roomData: any) {
    return this.request<any>(`/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(roomData),
    })
  }

  async deleteRoom(id: string) {
    return this.request(`/rooms/${id}`, { method: "DELETE" })
  }

  // Booking APIs
  async getBookings(params?: {
    userId?: string
    roomId?: string
    status?: string
    date?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<PaginatedResponse<any>>(`/bookings?${queryParams}`)
  }

  async getBookingById(id: string) {
    return this.request<any>(`/bookings/${id}`)
  }

  async createBooking(bookingData: any) {
    return this.request<any>("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    })
  }

  async updateBooking(id: string, bookingData: any) {
    return this.request<any>(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(bookingData),
    })
  }

  async deleteBooking(id: string) {
    return this.request(`/bookings/${id}`, { method: "DELETE" })
  }

  async approveBooking(id: string, note?: string) {
    return this.request<any>(`/bookings/${id}/approve`, {
      method: "POST",
      body: JSON.stringify({ note }),
    })
  }

  async rejectBooking(id: string, reason: string) {
    return this.request<any>(`/bookings/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    })
  }

  async checkInBooking(id: string) {
    return this.request<any>(`/bookings/${id}/checkin`, {
      method: "POST",
    })
  }

  async changeRoom(bookingId: string, newRoomId: string, reason: string) {
    return this.request<any>(`/bookings/${bookingId}/change-room`, {
      method: "POST",
      body: JSON.stringify({ newRoomId, reason }),
    })
  }

  // User APIs
  async getUsers(params?: {
    role?: string
    search?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<PaginatedResponse<any>>(`/users?${queryParams}`)
  }

  async getUserById(id: string) {
    return this.request<any>(`/users/${id}`)
  }

  async createUser(userData: any) {
    return this.request<any>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id: string, userData: any) {
    return this.request<any>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, { method: "DELETE" })
  }

  // Statistics APIs
  async getStatistics(params?: {
    startDate?: string
    endDate?: string
    roomId?: string
    userId?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<any>(`/statistics?${queryParams}`)
  }

  async getReports(type: "bookings" | "rooms" | "users", params?: any) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(","))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })
    }

    return this.request<any>(`/reports/${type}?${queryParams}`)
  }

  // Notification APIs
  async getNotifications(params?: {
    userId?: string
    read?: boolean
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<PaginatedResponse<any>>(`/notifications?${queryParams}`)
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: "POST" })
  }

  async markAllNotificationsAsRead() {
    return this.request("/notifications/read-all", { method: "POST" })
  }

  // File upload APIs
  async uploadFile(file: File, type: "room-image" | "avatar" | "document") {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    return this.request<{ url: string; filename: string }>("/upload", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    })
  }

  // Email APIs
  async sendEmail(template: {
    to: string
    subject: string
    html: string
    text?: string
  }) {
    return this.request("/email/send", {
      method: "POST",
      body: JSON.stringify(template),
    })
  }

  async sendBookingConfirmation(bookingId: string) {
    return this.request(`/email/booking-confirmation/${bookingId}`, {
      method: "POST",
    })
  }

  async sendBookingReminder(bookingId: string) {
    return this.request(`/email/booking-reminder/${bookingId}`, {
      method: "POST",
    })
  }

  // System APIs
  async getSystemSettings() {
    return this.request<any>("/system/settings")
  }

  async updateSystemSettings(settings: any) {
    return this.request<any>("/system/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    })
  }

  async getSystemHealth() {
    return this.request<{
      status: "healthy" | "unhealthy"
      database: boolean
      email: boolean
      storage: boolean
    }>("/system/health")
  }

  // Export APIs
  async exportData(type: "bookings" | "rooms" | "users", format: "csv" | "excel") {
    return this.request<any>(`/export/${type}?format=${format}`)
  }
}
