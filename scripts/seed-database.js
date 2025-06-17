const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://allecraira:123@muonphongcmc.q0vnmrp.mongodb.net/"

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db("muonphongcmc")

    // Seed phong_hoc
    const phongHocData = [
      {
        Ma_phong: "VPC2_201",
        So_phong: 201,
        Co_so: "VPC2",
        Dien_tich_m2: 45,
        Co_so_vat_chat: ["Máy chiếu", "Bàn", "Ghế", "Dây HDMI", "Bảng trắng"],
        Suc_chua: 55,
        Mo_ta: "Phòng học lý thuyết có đầy đủ thiết bị trình chiếu",
        Quy_dinh: "Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng",
      },
      {
        Ma_phong: "VPC2_502",
        So_phong: 502,
        Co_so: "VPC2",
        Dien_tich_m2: 60,
        Co_so_vat_chat: ["Máy chiếu", "Bàn", "Ghế", "Máy tính", "Điều hòa"],
        Suc_chua: 40,
        Mo_ta: "Phòng học thực hành máy tính",
        Quy_dinh: "Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng",
      },
    ]

    await db.collection("phong_hoc").insertMany(phongHocData)

    // Seed nguoi_dung
    const nguoiDungData = [
      {
        ma_nguoi_dung: "ADMIN",
        ten_nguoi_dung: "Quản trị viên",
        ngay_sinh: "01/01/1990",
        gioi_tinh: "Nam",
        email: "admin@cmc.edu.vn",
        so_dien_thoai: "0123456789",
        mat_khau: "123456",
        vai_tro: "admin",
        trang_thai: "hoat_dong",
      },
      {
        ma_nguoi_dung: "BIT230372",
        ten_nguoi_dung: "Nguyễn Thị Tâm",
        ngay_sinh: "26/03/2005",
        gioi_tinh: "Nữ",
        email: "BIT230372@st.cmcu.edu.vn",
        so_dien_thoai: "365666321",
        mat_khau: "123456",
        vai_tro: "sinh_vien",
        khoa: "Công nghệ thông tin",
        lop: "BIT2301",
        trang_thai: "hoat_dong",
      },
      {
        ma_nguoi_dung: "CTSV001",
        ten_nguoi_dung: "Trần Văn CTSV",
        ngay_sinh: "15/05/1985",
        gioi_tinh: "Nam",
        email: "ctsv@cmc.edu.vn",
        so_dien_thoai: "0987654321",
        mat_khau: "123456",
        vai_tro: "ctsv",
        trang_thai: "hoat_dong",
      },
      {
        ma_nguoi_dung: "BV001",
        ten_nguoi_dung: "Lê Văn Bảo vệ",
        ngay_sinh: "20/08/1980",
        gioi_tinh: "Nam",
        email: "baove@cmc.edu.vn",
        so_dien_thoai: "0912345678",
        mat_khau: "123456",
        vai_tro: "bao_ve",
        trang_thai: "hoat_dong",
      },
    ]

    await db.collection("nguoi_dung").insertMany(nguoiDungData)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
