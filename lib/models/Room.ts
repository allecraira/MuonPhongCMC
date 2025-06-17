export interface Room {
  _id?: string
  Ma_phong: string
  So_phong: number
  Co_so: string
  Dien_tich_m2: number
  Co_so_vat_chat: string[]
  Suc_chua: number
  Mo_ta: string
  Quy_dinh: string
  trang_thai?: string
  created_at?: Date
  updated_at?: Date
}

export interface User {
  _id?: string
  ma_nguoi_dung: string
  ten_nguoi_dung: string
  ngay_sinh: string
  gioi_tinh: string
  email: string
  so_dien_thoai: string
  mat_khau: string
  vai_tro: "sinh_vien" | "ctsv" | "bao_ve" | "admin"
  khoa?: string
  lop?: string
  trang_thai: string
  created_at?: Date
  updated_at?: Date
}

export interface BookingHistory {
  _id?: string
  Ma_phong: string
  Ngay: string
  Email: string
  Ma_nguoi_dung: string
  Ten_nguoi_dung: string
  Ly_do: string
  Ca: string
  Ngay_dat: string
  trang_thai: string
  nguoi_duyet?: string
  ngay_duyet?: string
  ly_do_tu_choi?: string
  created_at?: Date
  updated_at?: Date
}

export interface Schedule {
  _id?: string
  Ma_phong: string
  Ngay: string
  Ca: string
  Ma_nguoi_dung: string
  Ten_nguoi_dung: string
  trang_thai: string
  created_at?: Date
  updated_at?: Date
}
