// Mock Database Service for preview
export class DatabaseService {
  private static instance: DatabaseService

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  // Mock data based on CMC structure
  private mockRooms = [
    {
      _id: "1",
      Ma_phong: "VPC2_201",
      So_phong: 201,
      Co_so: "VPC2",
      Dien_tich_m2: 45,
      Co_so_vat_chat: ["Máy chiếu", "Bàn", "Ghế", "Dây HDMI", "Bảng trắng"],
      Suc_chua: 55,
      Mo_ta: "Phòng học lý thuyết có đầy đủ thiết bị trình chiếu",
      Quy_dinh: "Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng",
      trang_thai: "hoat_dong",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: "2",
      Ma_phong: "VPC2_502",
      So_phong: 502,
      Co_so: "VPC2",
      Dien_tich_m2: 60,
      Co_so_vat_chat: ["Máy chiếu", "Bàn", "Ghế", "Máy tính", "Điều hòa"],
      Suc_chua: 40,
      Mo_ta: "Phòng học thực hành máy tính",
      Quy_dinh: "Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng",
      trang_thai: "hoat_dong",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: "3",
      Ma_phong: "VPC1_101",
      So_phong: 101,
      Co_so: "VPC1",
      Dien_tich_m2: 50,
      Co_so_vat_chat: ["Máy chiếu", "Bàn", "Ghế", "Micro", "Loa"],
      Suc_chua: 60,
      Mo_ta: "Phòng hội thảo lớn",
      Quy_dinh: "Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng",
      trang_thai: "hoat_dong",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  private mockUsers = [
    {
      _id: "1",
      ma_nguoi_dung: "ADMIN",
      ten_nguoi_dung: "Quản trị viên",
      ngay_sinh: "01/01/1990",
      gioi_tinh: "Nam",
      email: "admin@cmc.edu.vn",
      so_dien_thoai: "0123456789",
      vai_tro: "admin",
      trang_thai: "hoat_dong",
    },
    {
      _id: "2",
      ma_nguoi_dung: "BIT230372",
      ten_nguoi_dung: "Nguyễn Thị Tâm",
      ngay_sinh: "26/03/2005",
      gioi_tinh: "Nữ",
      email: "BIT230372@st.cmcu.edu.vn",
      so_dien_thoai: "365666321",
      vai_tro: "sinh_vien",
      khoa: "Công nghệ thông tin",
      lop: "BIT2301",
      trang_thai: "hoat_dong",
    },
    {
      _id: "3",
      ma_nguoi_dung: "CTSV001",
      ten_nguoi_dung: "Trần Văn CTSV",
      ngay_sinh: "15/05/1985",
      gioi_tinh: "Nam",
      email: "ctsv@cmc.edu.vn",
      so_dien_thoai: "0987654321",
      vai_tro: "ctsv",
      trang_thai: "hoat_dong",
    },
    {
      _id: "4",
      ma_nguoi_dung: "BV001",
      ten_nguoi_dung: "Lê Văn Bảo vệ",
      ngay_sinh: "20/08/1980",
      gioi_tinh: "Nam",
      email: "baove@cmc.edu.vn",
      so_dien_thoai: "0912345678",
      vai_tro: "bao_ve",
      trang_thai: "hoat_dong",
    },
  ]

  private mockBookings = [
    {
      _id: "1",
      Ma_phong: "VPC2_201",
      Ngay: "2025-01-20",
      Email: "BIT230372@st.cmcu.edu.vn",
      Ma_nguoi_dung: "BIT230372",
      Ten_nguoi_dung: "Nguyễn Thị Tâm",
      Ly_do: "Học nhóm môn Lập trình Web",
      Ca: "Tiết 1-3 (7:00-9:30)",
      Ngay_dat: "2025-01-18",
      trang_thai: "cho_duyet",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: "2",
      Ma_phong: "VPC2_502",
      Ngay: "2025-01-21",
      Email: "nvhung@cmcu.edu.vn",
      Ma_nguoi_dung: "nvhung",
      Ten_nguoi_dung: "Nguyễn Văn Hùng",
      Ly_do: "Thực hành lập trình",
      Ca: "Tiết 7-9 (13:00-15:30)",
      Ngay_dat: "2025-01-19",
      trang_thai: "da_duyet",
      nguoi_duyet: "CTSV001",
      ngay_duyet: "2025-01-19",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  async getRooms(filters?: any) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredRooms = [...this.mockRooms]

    if (filters?.search) {
      filteredRooms = filteredRooms.filter(
        (room) =>
          room.Ma_phong.toLowerCase().includes(filters.search.toLowerCase()) ||
          room.Mo_ta.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters?.Co_so) {
      filteredRooms = filteredRooms.filter((room) => room.Co_so === filters.Co_so)
    }

    if (filters?.Suc_chua_min) {
      filteredRooms = filteredRooms.filter((room) => room.Suc_chua >= filters.Suc_chua_min)
    }

    if (filters?.Suc_chua_max) {
      filteredRooms = filteredRooms.filter((room) => room.Suc_chua <= filters.Suc_chua_max)
    }

    return filteredRooms
  }

  async getRoomById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.mockRooms.find((room) => room._id === id) || null
  }

  async createRoom(roomData: any) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newRoom = {
      ...roomData,
      _id: Date.now().toString(),
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.mockRooms.push(newRoom)
    return newRoom
  }

  async updateRoom(id: string, roomData: any) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = this.mockRooms.findIndex((room) => room._id === id)
    if (index !== -1) {
      this.mockRooms[index] = { ...this.mockRooms[index], ...roomData, updated_at: new Date() }
    }
    return { modifiedCount: index !== -1 ? 1 : 0 }
  }

  async deleteRoom(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = this.mockRooms.findIndex((room) => room._id === id)
    if (index !== -1) {
      this.mockRooms.splice(index, 1)
    }
    return { deletedCount: index !== -1 ? 1 : 0 }
  }

  async getUserByCredentials(ma_nguoi_dung: string, mat_khau: string) {
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock authentication - in real app, compare hashed passwords
    if (mat_khau === "123456") {
      return this.mockUsers.find((user) => user.ma_nguoi_dung === ma_nguoi_dung) || null
    }
    return null
  }

  async getUsers(filters?: any) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    let filteredUsers = [...this.mockUsers]

    if (filters?.vai_tro) {
      filteredUsers = filteredUsers.filter((user) => user.vai_tro === filters.vai_tro)
    }

    if (filters?.trang_thai) {
      filteredUsers = filteredUsers.filter((user) => user.trang_thai === filters.trang_thai)
    }

    return filteredUsers
  }

  async createUser(userData: any) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newUser = {
      ...userData,
      _id: Date.now().toString(),
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.mockUsers.push(newUser)
    return newUser
  }

  async updateUser(id: string, userData: any) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = this.mockUsers.findIndex((user) => user._id === id)
    if (index !== -1) {
      this.mockUsers[index] = { ...this.mockUsers[index], ...userData, updated_at: new Date() }
    }
    return { modifiedCount: index !== -1 ? 1 : 0 }
  }

  async deleteUser(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = this.mockUsers.findIndex((user) => user._id === id)
    if (index !== -1) {
      this.mockUsers.splice(index, 1)
    }
    return { deletedCount: index !== -1 ? 1 : 0 }
  }

  async getBookings(filters?: any) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    let filteredBookings = [...this.mockBookings]

    if (filters?.Ma_nguoi_dung) {
      filteredBookings = filteredBookings.filter((booking) => booking.Ma_nguoi_dung === filters.Ma_nguoi_dung)
    }

    if (filters?.Ma_phong) {
      filteredBookings = filteredBookings.filter((booking) => booking.Ma_phong === filters.Ma_phong)
    }

    if (filters?.trang_thai) {
      filteredBookings = filteredBookings.filter((booking) => booking.trang_thai === filters.trang_thai)
    }

    if (filters?.Ngay) {
      filteredBookings = filteredBookings.filter((booking) => booking.Ngay === filters.Ngay)
    }

    return filteredBookings
  }

  async createBooking(bookingData: any) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newBooking = {
      ...bookingData,
      _id: Date.now().toString(),
      trang_thai: "cho_duyet",
      Ngay_dat: new Date().toISOString().split("T")[0],
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.mockBookings.push(newBooking)
    return newBooking
  }

  async updateBookingStatus(id: string, trang_thai: string, nguoi_duyet?: string, ly_do_tu_choi?: string) {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.mockBookings.findIndex((booking) => booking._id === id)
    if (index !== -1) {
      this.mockBookings[index] = {
        ...this.mockBookings[index],
        trang_thai,
        nguoi_duyet,
        ly_do_tu_choi,
        ngay_duyet: new Date().toISOString().split("T")[0],
        updated_at: new Date(),
      }
    }

    return { modifiedCount: index !== -1 ? 1 : 0 }
  }

  async getSchedule(Ma_phong?: string, Ngay?: string) {
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Mock schedule data
    const mockSchedule = [
      {
        _id: "1",
        Ma_phong: "VPC2_201",
        Ngay: "2025-01-20",
        Ca: "Tiết 1-3 (7:00-9:30)",
        trang_thai: "da_dat",
        Ma_nguoi_dung: "BIT230372",
      },
      {
        _id: "2",
        Ma_phong: "VPC2_502",
        Ngay: "2025-01-21",
        Ca: "Tiết 7-9 (13:00-15:30)",
        trang_thai: "da_dat",
        Ma_nguoi_dung: "nvhung",
      },
    ]

    let filteredSchedule = [...mockSchedule]

    if (Ma_phong) {
      filteredSchedule = filteredSchedule.filter((item) => item.Ma_phong === Ma_phong)
    }

    if (Ngay) {
      filteredSchedule = filteredSchedule.filter((item) => item.Ngay === Ngay)
    }

    return filteredSchedule
  }

  async createSchedule(scheduleData: any) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      ...scheduleData,
      _id: Date.now().toString(),
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  async getStatistics() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      totalRooms: this.mockRooms.length,
      totalUsers: this.mockUsers.length,
      totalBookings: this.mockBookings.length,
      pendingBookings: this.mockBookings.filter((b) => b.trang_thai === "cho_duyet").length,
      approvedBookings: this.mockBookings.filter((b) => b.trang_thai === "da_duyet").length,
      rejectedBookings: this.mockBookings.filter((b) => b.trang_thai === "tu_choi").length,
    }
  }
}
