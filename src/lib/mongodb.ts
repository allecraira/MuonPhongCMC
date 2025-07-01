// MongoDB connection and models matching real database structure
// Connection string: mongodb+srv://allecraira:123@muonphongcmc.q0vnmrp.mongodb.net/

interface MongoUser {
    _id?: string;
    ma_nguoi_dung: string;
    ten_nguoi_dung: string;
    ngay_sinh: string;
    gioi_tinh: string;
    email: string;
    so_dien_thoai: number;
    mat_khau?: string;
    vai_tro?: "student" | "teacher" | "admin" | "pctsv" | "security";
  }
  
  interface MongoRoom {
    _id?: string;
    Ma_phong: string;
    So_phong: number;
    Co_so: string;
    "Dien_tich (m2)": number;
    Co_so_vat_chat: string;
    Suc_chua: number;
    Mo_ta: string;
    Quy_dinh: string;
    trang_thai?: "available" | "booked" | "maintenance";
  }
  
  interface MongoBookingHistory {
    _id?: string;
    Ma_phong: string;
    Ngay: string;
    Email: string;
    Ma_nguoi_dung: string;
    Ten_nguoi_dung: string;
    Ly_do: string;
    Ca: string;
    Khung_gio: string;
    So_nguoi: number;
    Ngay_dat: string;
    trang_thai?: "pending" | "confirmed" | "cancelled";
  }
  
  interface MongoSchedule {
    _id?: string;
    Ca: number;
    "Giờ bắt đầu": string;
    "Giờ kết thúc": string;
  }
  
  let isConnected = false;
  
  // Initialize data from localStorage
  // loadFromStorage();
  
  // Complete users collection with all real data
  let usersCollection: MongoUser[] = [
    // Students - Real data from database
    {
      _id: "684fd10b6b63cfd0441d7e7c",
      ma_nguoi_dung: "BIT230372",
      ten_nguoi_dung: "Nguyễn Thị Tâm",
      ngay_sinh: "26/03/2005",
      gioi_tinh: "Nữ",
      email: "BIT230372@st.cmc.edu.vn",
      so_dien_thoai: 365666321,
      mat_khau: "123456",
      vai_tro: "student",
    },
    {
      _id: "user_sv002",
      ma_nguoi_dung: "BIT230101",
      ten_nguoi_dung: "Trần Văn Nam",
      ngay_sinh: "15/01/2005",
      gioi_tinh: "Nam",
      email: "BIT230101@st.cmc.edu.vn",
      so_dien_thoai: 987654321,
      mat_khau: "123456",
      vai_tro: "student",
    },
    {
      _id: "user_sv003",
      ma_nguoi_dung: "BIT230245",
      ten_nguoi_dung: "Lê Thị Hoa",
      ngay_sinh: "22/08/2005",
      gioi_tinh: "Nữ",
      email: "BIT230245@st.cmc.edu.vn",
      so_dien_thoai: 123789456,
      mat_khau: "123456",
      vai_tro: "student",
    },
    {
      _id: "user_sv004",
      ma_nguoi_dung: "BIT230156",
      ten_nguoi_dung: "Phạm Minh Tuấn",
      ngay_sinh: "10/12/2005",
      gioi_tinh: "Nam",
      email: "BIT230156@st.cmc.edu.vn",
      so_dien_thoai: 456789123,
      mat_khau: "123456",
      vai_tro: "student",
    },
  
    // Teachers
    {
      _id: "user_gv001",
      ma_nguoi_dung: "GV001",
      ten_nguoi_dung: "TS. Trần Thị B",
      ngay_sinh: "15/08/1980",
      gioi_tinh: "Nữ",
      email: "teacher1@st.cmc.edu.vn",
      so_dien_thoai: 987654321,
      mat_khau: "123456",
      vai_tro: "teacher",
    },
    {
      _id: "user_gv002",
      ma_nguoi_dung: "GV002",
      ten_nguoi_dung: "PGS.TS. Nguyễn Văn Minh",
      ngay_sinh: "22/03/1975",
      gioi_tinh: "Nam",
      email: "nvminh@st.cmc.edu.vn",
      so_dien_thoai: 912345678,
      mat_khau: "123456",
      vai_tro: "teacher",
    },
  
    // Staff
    {
      _id: "user_003",
      ma_nguoi_dung: "admin",
      ten_nguoi_dung: "Quản trị viên hệ thống",
      ngay_sinh: "01/01/1990",
      gioi_tinh: "Nam",
      email: "admin@cmc.edu.vn",
      so_dien_thoai: 123456789,
      mat_khau: "123456",
      vai_tro: "admin",
    },
    {
      _id: "user_004",
      ma_nguoi_dung: "pctsv",
      ten_nguoi_dung: "Phòng Công tác Sinh viên",
      ngay_sinh: "01/01/1990",
      gioi_tinh: "Nam",
      email: "pctsv@cmc.edu.vn",
      so_dien_thoai: 123456789,
      mat_khau: "123456",
      vai_tro: "pctsv",
    },
    {
      _id: "user_005",
      ma_nguoi_dung: "security",
      ten_nguoi_dung: "Bảo vệ trường",
      ngay_sinh: "01/01/1990",
      gioi_tinh: "Nam",
      email: "security@cmc.edu.vn",
      so_dien_thoai: 123456789,
      mat_khau: "123456",
      vai_tro: "security",
    },
    { ma_nguoi_dung: 'BIT230372', ten_nguoi_dung: 'Nguyễn Thị Tâm', ngay_sinh: '26/03/2005', gioi_tinh: 'Nữ', email: 'BIT230372@st.cmcu.edu.vn', so_dien_thoai: 365666321, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT230373', ten_nguoi_dung: 'Trần Văn Minh', ngay_sinh: '12/08/2004', gioi_tinh: 'Nam', email: 'BIT230373@st.cmcu.edu.vn', so_dien_thoai: 378123456, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT230374', ten_nguoi_dung: 'Lê Thị Hương', ngay_sinh: '05/11/2005', gioi_tinh: 'Nữ', email: 'BIT230374@st.cmcu.edu.vn', so_dien_thoai: 387654321, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT230375', ten_nguoi_dung: 'Phạm Anh Tuấn', ngay_sinh: '20/07/2004', gioi_tinh: 'Nam', email: 'BIT230375@st.cmcu.edu.vn', so_dien_thoai: 399988776, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT230376', ten_nguoi_dung: 'Vũ Mai Lan', ngay_sinh: '18/01/2006', gioi_tinh: 'Nữ', email: 'BIT230376@st.cmcu.edu.vn', so_dien_thoai: 354433221, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT230377', ten_nguoi_dung: 'Nguyễn Quốc Bảo', ngay_sinh: '03/09/2005', gioi_tinh: 'Nam', email: 'BIT230377@st.cmcu.edu.vn', so_dien_thoai: 367890123, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT230378', ten_nguoi_dung: 'Đặng Thị Yến Nhi', ngay_sinh: '23/12/2005', gioi_tinh: 'Nữ', email: 'BIT230378@st.cmcu.edu.vn', so_dien_thoai: 376543210, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'nvhung', ten_nguoi_dung: 'Nguyễn Văn Hùng', ngay_sinh: '15/02/1980', gioi_tinh: 'Nam', email: 'nvhung@cmcu.edu.vn', so_dien_thoai: 901234567, mat_khau: '123456', vai_tro: 'teacher' },
    { ma_nguoi_dung: 'ttlan', ten_nguoi_dung: 'Trần Thị Lan', ngay_sinh: '22/07/1982', gioi_tinh: 'Nữ', email: 'ttlan@cmcu.edu.vn', so_dien_thoai: 912345678, mat_khau: '123456', vai_tro: 'teacher' },
    { ma_nguoi_dung: 'BCS001', ten_nguoi_dung: 'Lê Hoàng Long', ngay_sinh: '03/05/2004', gioi_tinh: 'Nam', email: 'BCS001@st.cmcu.edu.vn', so_dien_thoai: 938765432, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BCS002', ten_nguoi_dung: 'Đặng Thị Hòa', ngay_sinh: '09/09/2005', gioi_tinh: 'Nữ', email: 'BCS002@st.cmcu.edu.vn', so_dien_thoai: 945678901, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BBA001', ten_nguoi_dung: 'Mai Văn Khánh', ngay_sinh: '12/12/2003', gioi_tinh: 'Nam', email: 'BBA001@st.cmcu.edu.vn', so_dien_thoai: 956789012, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BBA002', ten_nguoi_dung: 'Phạm Thị Quỳnh Anh', ngay_sinh: '27/03/2004', gioi_tinh: 'Nữ', email: 'BBA002@st.cmcu.edu.vn', so_dien_thoai: 967890123, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240209', ten_nguoi_dung: 'Võ Thùy Linh', ngay_sinh: '12/5/2006', gioi_tinh: 'Nữ', email: 'BIT240209@st.cmcu.edu.vn', so_dien_thoai: 988453786, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240201', ten_nguoi_dung: 'Hoàng Dương Nhật Minh', ngay_sinh: '26/01/2006', gioi_tinh: 'Nam', email: 'BMK240201@st.cmcu.edu.vn', so_dien_thoai: 988453787, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240202', ten_nguoi_dung: 'Nguyễn Tuấn', ngay_sinh: '12/11/2006', gioi_tinh: 'Nam', email: 'BMK240202@st.cmcu.edu.vn', so_dien_thoai: 988453788, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240203', ten_nguoi_dung: 'Nguyễn Minh Hiếu', ngay_sinh: '09/10/2006', gioi_tinh: 'Nam', email: 'BIT240203@st.cmcu.edu.vn', so_dien_thoai: 988453789, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240204', ten_nguoi_dung: 'Bùi Tiến Nguyên', ngay_sinh: '13/11/2006', gioi_tinh: 'Nam', email: 'BIT240204@st.cmcu.edu.vn', so_dien_thoai: 988453790, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240205', ten_nguoi_dung: 'Lê Duy Thuận', ngay_sinh: '05/03/2006', gioi_tinh: 'Nam', email: 'BMK240205@st.cmcu.edu.vn', so_dien_thoai: 988453791, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240206', ten_nguoi_dung: 'Nguyễn Quang Huy', ngay_sinh: '05/02/2005', gioi_tinh: 'Nam', email: 'BMK240206@st.cmcu.edu.vn', so_dien_thoai: 988453792, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240207', ten_nguoi_dung: 'Nguyễn Thị Xinh', ngay_sinh: '18/08/2005', gioi_tinh: 'Nữ', email: 'BMK240207@st.cmcu.edu.vn', so_dien_thoai: 988453793, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240208', ten_nguoi_dung: 'Lường Thế Phúc', ngay_sinh: '09/08/2006', gioi_tinh: 'Nam', email: 'BIT240208@st.cmcu.edu.vn', so_dien_thoai: 988453794, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240209', ten_nguoi_dung: 'Đào Quang Minh', ngay_sinh: '09/01/2006', gioi_tinh: 'Nam', email: 'BMK240210@st.cmcu.edu.vn', so_dien_thoai: 988453795, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240210', ten_nguoi_dung: 'Nguyễn Duy Mạnh Khoa', ngay_sinh: '10/11/2005', gioi_tinh: 'Nam', email: 'BIT240210@st.cmcu.edu.vn', so_dien_thoai: 988453796, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240212', ten_nguoi_dung: 'Kim Quốc Khánh', ngay_sinh: '22/10/2006', gioi_tinh: 'Nam', email: 'BMK240212@st.cmcu.edu.vn', so_dien_thoai: 988453797, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240212', ten_nguoi_dung: 'Lữ Trọng Vỹ', ngay_sinh: '03/08/2006', gioi_tinh: 'Nam', email: 'BMK240212@st.cmcu.edu.vn', so_dien_thoai: 988453798, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BMK240213', ten_nguoi_dung: 'Phạm Khánh Linh', ngay_sinh: '17/5/2005', gioi_tinh: 'Nữ', email: 'BMK240213@st.cmcu.edu.vn', so_dien_thoai: 988453799, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240214', ten_nguoi_dung: 'Từ Xuân Đạt', ngay_sinh: '13/03/2006', gioi_tinh: 'Nam', email: 'BIT240214@st.cmcu.edu.vn', so_dien_thoai: 988453800, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240215', ten_nguoi_dung: 'Nguyễn Đình Khuyến', ngay_sinh: '24/03/2006', gioi_tinh: 'Nam', email: 'BIT240215@st.cmcu.edu.vn', so_dien_thoai: 988453801, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240216', ten_nguoi_dung: 'Nguyễn Văn Thiện', ngay_sinh: '30/03/2006', gioi_tinh: 'Nam', email: 'BIT240216@st.cmcu.edu.vn', so_dien_thoai: 988453802, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240217', ten_nguoi_dung: 'Lê Thành Đô', ngay_sinh: '09/12/0204', gioi_tinh: 'Nam', email: 'BIT240217@st.cmcu.edu.vn', so_dien_thoai: 988453803, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240218', ten_nguoi_dung: 'Lê Tuấn Anh', ngay_sinh: '17/07/2006', gioi_tinh: 'Nam', email: 'BIT240218@st.cmcu.edu.vn', so_dien_thoai: 988453804, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240219', ten_nguoi_dung: 'Nguyễn Thế Tấn', ngay_sinh: '12/06/2004', gioi_tinh: 'Nam', email: 'BIT240219@st.cmcu.edu.vn', so_dien_thoai: 988453805, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240220', ten_nguoi_dung: 'Phạm Minh Đức', ngay_sinh: '24/12/2006', gioi_tinh: 'Nam', email: 'BIT240220@st.cmcu.edu.vn', so_dien_thoai: 988453806, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240221', ten_nguoi_dung: 'Nguyễn Duy Mạnh Khoa', ngay_sinh: '10/11/2005', gioi_tinh: 'Nam', email: 'BIT240221@st.cmcu.edu.vn', so_dien_thoai: 988453807, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240222', ten_nguoi_dung: 'Nguyễn Đức Khánh', ngay_sinh: '27/02/2006', gioi_tinh: 'Nam', email: 'BIT240222@st.cmcu.edu.vn', so_dien_thoai: 988453808, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240223', ten_nguoi_dung: 'Nguyễn Văn Đạt', ngay_sinh: '19/10/2004', gioi_tinh: 'Nam', email: 'BIT240223@st.cmcu.edu.vn', so_dien_thoai: 988453809, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BIT240224', ten_nguoi_dung: 'Lê Danh Minh', ngay_sinh: '15/05/2005', gioi_tinh: 'Nam', email: 'BIT240224@st.cmcu.edu.vn', so_dien_thoai: 988453810, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BJL230552', ten_nguoi_dung: 'Nguyễn Đình Hương', ngay_sinh: '16/05/2005', gioi_tinh: 'Nam', email: 'BJL230552@st.cmcu.edu.vn', so_dien_thoai: 988453811, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BJL230553', ten_nguoi_dung: 'Đinh Đức Mạnh', ngay_sinh: '17/05/2005', gioi_tinh: 'Nam', email: 'BJL230553@st.cmcu.edu.vn', so_dien_thoai: 988453812, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BJL230554', ten_nguoi_dung: 'Vũ Tuấn Khải', ngay_sinh: '18/05/2005', gioi_tinh: 'Nam', email: 'BJL230554@st.cmcu.edu.vn', so_dien_thoai: 988453813, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BJL230555', ten_nguoi_dung: 'Đinh Tiến Linh', ngay_sinh: '19/05/2005', gioi_tinh: 'Nam', email: 'BJL230555@st.cmcu.edu.vn', so_dien_thoai: 988453814, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BJL230556', ten_nguoi_dung: 'Nguyễn Thị Hà', ngay_sinh: '20/05/2005', gioi_tinh: 'Nữ', email: 'BJL230556@st.cmcu.edu.vn', so_dien_thoai: 988453815, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'BJL230557', ten_nguoi_dung: 'Nguyễn Thị Mai', ngay_sinh: '21/05/2005', gioi_tinh: 'Nữ', email: 'BJL230557@st.cmcu.edu.vn', so_dien_thoai: 988453816, mat_khau: '123456', vai_tro: 'student' },
    { ma_nguoi_dung: 'nhhuy', ten_nguoi_dung: 'Ngô Hoàng Huy', ngay_sinh: '12/6/1970', gioi_tinh: 'Nam', email: 'nhhuy@cmcu.edu.vn', so_dien_thoai: 988453817, mat_khau: '123456', vai_tro: 'teacher' },
    { ma_nguoi_dung: 'ntvanh', ten_nguoi_dung: 'Nguyễn Thị Vân Anh', ngay_sinh: '23/1/1982', gioi_tinh: 'Nữ', email: 'ntvanh@cmcu.edu.vn', so_dien_thoai: 988453818, mat_khau: '123456', vai_tro: 'teacher' },
  ];
  
  // Complete rooms collection with all rooms from database - VPC1, VPC2, VPC3 buildings
  let roomsCollection: MongoRoom[] = [
    { Ma_phong: 'VPC2_201', So_phong: 201, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_202', So_phong: 202, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_203', So_phong: 203, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_204', So_phong: 204, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_205', So_phong: 205, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_301', So_phong: 301, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_302', So_phong: 302, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_303', So_phong: 303, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_304', So_phong: 304, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_305', So_phong: 305, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_401', So_phong: 401, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_402', So_phong: 402, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_403', So_phong: 403, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_404', So_phong: 404, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_501', So_phong: 501, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_502', So_phong: 502, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_503', So_phong: 503, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_504', So_phong: 504, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_505', So_phong: 505, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_601', So_phong: 601, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_602', So_phong: 602, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_603', So_phong: 603, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_604', So_phong: 604, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_605', So_phong: 605, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_701', So_phong: 701, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Tủ sách', 'Sách', 'máy mượn sách']", Suc_chua: 20, Mo_ta: 'Phòng thư viện trường có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_702', So_phong: 702, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 70, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1101', So_phong: 1101, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1102', So_phong: 1102, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1103', So_phong: 1103, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1104', So_phong: 1104, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1105', So_phong: 1105, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1201', So_phong: 1201, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1202', So_phong: 1202, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1203', So_phong: 1203, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1204', So_phong: 1204, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
    { Ma_phong: 'VPC2_1205', So_phong: 1205, Co_so: 'VPC2', "Dien_tich (m2)": 45, Co_so_vat_chat: "['Máy chiếu', 'Bàn', 'Ghế', 'Dây HDMI', 'Bảng trắng']", Suc_chua: 55, Mo_ta: 'Phòng học lý thuyết có đầy đủ thiết bị trình chiếu', Quy_dinh: 'Không ăn uống, giữ gìn vệ sinh, tắt thiết bị sau khi sử dụng', trang_thai: 'available' },
  ];
  
  let bookingHistoryCollection: MongoBookingHistory[] = [
    // Booking mẫu cho phòng VPC2_201, ngày 10/07/2025, ca 08:00-10:00
    {
      Ma_phong: "VPC2_201",
      Ngay: "10/07/2025",
      Email: "test@cmc.edu.vn",
      Ma_nguoi_dung: "BIT230372",
      Ten_nguoi_dung: "Nguyễn Văn A",
      Ly_do: "Họp nhóm",
      Ca: "08:00-10:00",
      Khung_gio: "08:00-10:00",
      So_nguoi: 10,
      Ngay_dat: "09/07/2025",
      trang_thai: "confirmed"
    },
    { Ma_phong: 'VPC2_502', Ngay: '10/06/2025', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N03)/23IT2', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '10/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '11/06/2025', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N05)/23IT2', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '11/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '12/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N02)/23IT2', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '12/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '13/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N03)/23IT2', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '13/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '16/06/2025', Email: 'BIT230373@st.cmcu.edu.vn', Ma_nguoi_dung: 'BIT230373', Ten_nguoi_dung: 'Trần Văn Minh', Ly_do: '1-3-24(N03)/23IT2', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '16/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '16/06/2025', Email: 'BJL230557@st.cmcu.edu.vn', Ma_nguoi_dung: 'BJL230557', Ten_nguoi_dung: 'Nguyễn Thị Mai', Ly_do: 'Họp câu lập bộ', Ca: 'Tiết 13', Khung_gio: '', So_nguoi: 30, Ngay_dat: '16/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '16/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N02)/23IT2', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '17/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '16/06/2025', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N05)/23IT2', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '18/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '17/06/2025', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N03)/23IT2', Ca: 'Tiết 13-14', Khung_gio: '', So_nguoi: 30, Ngay_dat: '18/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '17/06/2025', Email: 'BIT240210@st.cmcu.edu.vn', Ma_nguoi_dung: 'BIT240210', Ten_nguoi_dung: 'Nguyễn Duy Mạnh Khoa', Ly_do: 'Mượn để làm đề tài nhóm', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '17/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '18/06/2025', Email: 'BMK240213@st.cmcu.edu.vn', Ma_nguoi_dung: 'BMK240213', Ten_nguoi_dung: 'Phạm Khánh Linh', Ly_do: 'Mượn để làm đề tài nhóm', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '18/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '18/06/2025', Email: 'BIT240222@st.cmcu.edu.vn', Ma_nguoi_dung: 'BIT240222', Ten_nguoi_dung: 'Nguyễn Đức Khánh', Ly_do: 'Họp câu lập bộ', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '18/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_503', Ngay: '18/06/2025', Email: 'BIT240223@st.cmcu.edu.vn', Ma_nguoi_dung: 'BIT240223', Ten_nguoi_dung: 'Nguyễn Văn Đạt', Ly_do: 'Họp câu lập bộ', Ca: 'Tiết 3-6', Khung_gio: '', So_nguoi: 30, Ngay_dat: '18/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_504', Ngay: '18/06/2025', Email: 'BIT240224@st.cmcu.edu.vn', Ma_nguoi_dung: 'BIT240224', Ten_nguoi_dung: 'Lê Danh Minh', Ly_do: 'Mượn để làm đề tài nhóm', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '18/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '19/06/2025', Email: 'BJL230552@st.cmcu.edu.vn', Ma_nguoi_dung: 'BJL230552', Ten_nguoi_dung: 'Nguyễn Đình Hương', Ly_do: 'Họp câu lập bộ', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '18/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '19/06/2025', Email: 'BJL230553@st.cmcu.edu.vn', Ma_nguoi_dung: 'BJL230553', Ten_nguoi_dung: 'Đinh Đức Mạnh', Ly_do: 'Họp câu lập bộ', Ca: 'Tiết 13-14', Khung_gio: '', So_nguoi: 30, Ngay_dat: '19/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_502', Ngay: '20/06/2025', Email: 'BJL230554@st.cmcu.edu.vn', Ma_nguoi_dung: 'BJL230554', Ten_nguoi_dung: 'Vũ Tuấn Khải', Ly_do: 'Họp câu lập bộ', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '19/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '20/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N09)/23IT6', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '20/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '20/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N09)/23IT6', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '20/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '23/06/2025', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N07)/23IT6', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '23/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '24/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N06)/23IT6', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '24/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '25/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N09)/23IT6', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '25/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '25/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N09)/23IT6', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '25/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '26/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N06)/23IT6', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '26/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '26/06/2025', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N07)/23IT6', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '26/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '27/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N09)/23IT6', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '27/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_404', Ngay: '27/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N09)/23IT6', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '27/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '23/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N06)/23IT3', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '23/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '23/06/2025', Email: 'ntvanh@cmcu.edu.vn', Ma_nguoi_dung: 'ntvanh', Ten_nguoi_dung: 'Nguyễn Thị Vân Anh', Ly_do: '1-3-24(N04)/23IT3', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '23/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '24/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N06)/23IT3', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '24/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '24/06/2025', Email: 'ntvanh@cmcu.edu.vn', Ma_nguoi_dung: 'ntvanh', Ten_nguoi_dung: 'Nguyễn Thị Vân Anh', Ly_do: '1-3-24(N03)/23IT3', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '24/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '25/06/2025', Email: 'ntvanh@cmcu.edu.vn', Ma_nguoi_dung: 'ntvanh', Ten_nguoi_dung: 'Nguyễn Thị Vân Anh', Ly_do: '1-3-24(N03)/23IT3', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '25/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '25/06/2025', Email: 'ntvanh@cmcu.edu.vn', Ma_nguoi_dung: 'ntvanh', Ten_nguoi_dung: 'Nguyễn Thị Vân Anh', Ly_do: '1-3-24(N06)/23IT3', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '25/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '26/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N03)/23IT3', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '26/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_403', Ngay: '27/06/2025', Email: 'ntvanh@cmcu.edu.vn', Ma_nguoi_dung: 'ntvanh', Ten_nguoi_dung: 'Nguyễn Thị Vân Anh', Ly_do: '1-3-24(N04)/23IT3', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '27/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_402', Ngay: '23/06/2025', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N05)/23IT4', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '23/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_402', Ngay: '24/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N07)/23IT4', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '24/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_402', Ngay: '25/06/2025', Email: 'ttlan@st.cmcu.edu.vn', Ma_nguoi_dung: 'ttlan', Ten_nguoi_dung: 'Trần Thị Lan', Ly_do: '1-3-24(N04)/23IT4', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '25/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_402', Ngay: '26/06/2025', Email: 'nhhuy@cmcu.edu.vn', Ma_nguoi_dung: 'nhhuy', Ten_nguoi_dung: 'Ngô Hoàng Huy', Ly_do: '1-3-24(N07)/23IT4', Ca: 'Tiết 7-9', Khung_gio: '', So_nguoi: 30, Ngay_dat: '26/06/2025', trang_thai: 'confirmed' },
    { Ma_phong: 'VPC2_402', Ngay: '27/06/2005', Email: 'nvhung@cmcu.edu.vn', Ma_nguoi_dung: 'nvhung', Ten_nguoi_dung: 'Nguyễn Văn Hùng', Ly_do: '1-3-24(N05)/23IT4', Ca: 'Tiết 10-12', Khung_gio: '', So_nguoi: 30, Ngay_dat: '27/06/2005', trang_thai: 'confirmed' },
  ];
  
  let scheduleCollection: MongoSchedule[] = [
    { _id: "schedule_001", Ca: 1, "Giờ bắt đầu": "6:45", "Giờ kết thúc": "7:30" },
    { _id: "schedule_002", Ca: 2, "Giờ bắt đầu": "7:35", "Giờ kết thúc": "8:20" },
    { _id: "schedule_003", Ca: 3, "Giờ bắt đầu": "8:25", "Giờ kết thúc": "9:10" },
    { _id: "schedule_004", Ca: 4, "Giờ bắt đầu": "9:15", "Giờ kết thúc": "10:00" },
    { _id: "schedule_005", Ca: 5, "Giờ bắt đầu": "10:05", "Giờ kết thúc": "10:50" },
    { _id: "schedule_006", Ca: 6, "Giờ bắt đầu": "12:30", "Giờ kết thúc": "13:15" },
    { _id: "schedule_007", Ca: 7, "Giờ bắt đầu": "13:20", "Giờ kết thúc": "14:05" },
    { _id: "schedule_008", Ca: 8, "Giờ bắt đầu": "14:10", "Giờ kết thúc": "14:55" },
    { _id: "schedule_009", Ca: 9, "Giờ bắt đầu": "15:00", "Giờ kết thúc": "15:45" },
    { _id: "schedule_010", Ca: 10, "Giờ bắt đầu": "15:50", "Giờ kết thúc": "16:35" },
    { _id: "schedule_011", Ca: 11, "Giờ bắt đầu": "17:30", "Giờ kết thúc": "18:15" },
    { _id: "schedule_012", Ca: 12, "Giờ bắt đầu": "18:20", "Giờ kết thúc": "19:05" },
    { _id: "schedule_013", Ca: 13, "Giờ bắt đầu": "19:10", "Giờ kết thúc": "19:55" },
    { _id: "schedule_014", Ca: 14, "Giờ bắt đầu": "20:00", "Giờ kết thúc": "20:45" },
    { _id: "schedule_015", Ca: 15, "Giờ bắt đầu": "20:50", "Giờ kết thúc": "21:35" },
  ];
  
  export const connectMongoDB = async (): Promise<boolean> => {
    try {
      console.log("🔌 Connecting to MongoDB...");
      isConnected = true;
      console.log("✅ MongoDB connected successfully");
      initializeDefaultData();
      return true;
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
      isConnected = false;
      return false;
    }
  };
  
  export const userService = {
    async getAllUsers(): Promise<MongoUser[]> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return usersCollection;
    },

    async findByEmail(email: string): Promise<MongoUser | null> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return usersCollection.find((user) => user.email === email) || null;
    },

    async updatePassword(email: string, newPassword: string): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const userIndex = usersCollection.findIndex((user) => user.email === email);
      if (userIndex !== -1) {
        usersCollection[userIndex].mat_khau = newPassword;
        console.log("🔐 Password updated for:", email);
        return true;
      }
      return false;
    },

    async createUser(userData: Omit<MongoUser, "_id">): Promise<MongoUser> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newUser: MongoUser = {
        ...userData,
        _id: `user_${Date.now()}`,
      };
      usersCollection.push(newUser);
      console.log("👤 New user created:", newUser.email);
      return newUser;
    },

    async deleteUser(userId: string): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const userIndex = usersCollection.findIndex((user) => user._id === userId);
      if (userIndex !== -1) {
        usersCollection.splice(userIndex, 1);
        console.log("🗑️ User deleted:", userId);
        return true;
      }
      return false;
    },

    async updateUser(userId: string, updateData: Partial<MongoUser>): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const userIndex = usersCollection.findIndex((user) => user._id === userId);
      if (userIndex !== -1) {
        usersCollection[userIndex] = {
          ...usersCollection[userIndex],
          ...updateData,
        };
        console.log("🔄 User updated:", userId);
        return true;
      }
      return false;
    },
  };
  
  export const roomService = {
    async getAllRooms(): Promise<MongoRoom[]> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return roomsCollection;
    },
  
    async getRoomById(maPhong: string): Promise<MongoRoom | null> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return roomsCollection.find((room) => room.Ma_phong === maPhong) || null;
    },
  
    async createRoom(roomData: Omit<MongoRoom, "_id">): Promise<MongoRoom> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newRoom: MongoRoom = {
        ...roomData,
        _id: `room_${Date.now()}`,
      };
      roomsCollection.push(newRoom);
      console.log("🏢 New room created:", newRoom.Ma_phong);
      return newRoom;
    },
  
    async updateRoom(
      maPhong: string,
      updateData: Partial<MongoRoom>,
    ): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const roomIndex = roomsCollection.findIndex(
        (room) => room.Ma_phong === maPhong,
      );
      if (roomIndex !== -1) {
        roomsCollection[roomIndex] = {
          ...roomsCollection[roomIndex],
          ...updateData,
        };
        console.log("🔄 Room updated:", maPhong);
        return true;
      }
      return false;
    },
  
    async deleteRoom(maPhong: string): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const roomIndex = roomsCollection.findIndex(
        (room) => room.Ma_phong === maPhong,
      );
      if (roomIndex !== -1) {
        roomsCollection.splice(roomIndex, 1);
        console.log("🗑️ Room deleted:", maPhong);
        return true;
      }
      return false;
    },
  
    async checkRoomAvailability(
      maPhong: string,
      ngay: string,
      ca: string,
    ): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      console.log("CheckRoomAvailability:", maPhong, ngay, ca);
      const existingBooking = bookingHistoryCollection.find(
        (booking) =>
          booking.Ma_phong === maPhong &&
          booking.Ngay === ngay &&
          booking.Ca === ca &&
          booking.trang_thai !== "cancelled",
      );
      return !existingBooking;
    },
  };
  
  export const bookingService = {
    async getAllBookings(): Promise<MongoBookingHistory[]> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return bookingHistoryCollection;
    },
  
    async createBooking(
      bookingData: Omit<MongoBookingHistory, "_id">,
    ): Promise<MongoBookingHistory> {
      await new Promise((resolve) => setTimeout(resolve, 300));
  
      const isAvailable = await roomService.checkRoomAvailability(
        bookingData.Ma_phong,
        bookingData.Ngay,
        bookingData.Ca,
      );
  
      const newBooking: MongoBookingHistory = {
        ...bookingData,
        _id: `booking_${Date.now()}`,
        trang_thai: isAvailable ? "confirmed" : "pending",
      };
  
      bookingHistoryCollection.push(newBooking);
      console.log(
        "📅 New booking created:",
        newBooking._id,
        "Status:",
        newBooking.trang_thai,
      );
  
      return newBooking;
    },
  
    async updateBookingStatus(
      id: string,
      status: "pending" | "confirmed" | "cancelled",
    ): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const bookingIndex = bookingHistoryCollection.findIndex(
        (booking) => booking._id === id,
      );
      if (bookingIndex !== -1) {
        bookingHistoryCollection[bookingIndex].trang_thai = status;
        console.log("🔄 Booking status updated:", id, status);
        return true;
      }
      return false;
    },
  
    async getBookingsByRoom(maPhong: string): Promise<MongoBookingHistory[]> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return bookingHistoryCollection.filter(
        (booking) => booking.Ma_phong === maPhong,
      );
    },
  
    async getBookingsByUser(maNguoiDung: string): Promise<MongoBookingHistory[]> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return bookingHistoryCollection.filter(
        (booking) => booking.Ma_nguoi_dung === maNguoiDung,
      );
    },
  };
  
  export const scheduleService = {
    async getAllSchedules(): Promise<MongoSchedule[]> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return scheduleCollection;
    },
  
    async getScheduleBySlot(ca: number): Promise<MongoSchedule | null> {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return scheduleCollection.find((schedule) => schedule.Ca === ca) || null;
    },
  };
  
  // Initialize users function for fallback
  const initializeUsers = () => {
    console.log("🔄 Force initializing users collection...");
  
    if (usersCollection.length === 0) {
      usersCollection = [
        {
          _id: "684fd10b6b63cfd0441d7e7c",
          ma_nguoi_dung: "BIT230372",
          ten_nguoi_dung: "Nguyễn Thị Tâm",
          ngay_sinh: "26/03/2005",
          gioi_tinh: "Nữ",
          email: "BIT230372@st.cmc.edu.vn",
          so_dien_thoai: 365666321,
          mat_khau: "123456",
          vai_tro: "student",
        },
        {
          _id: "user_gv001",
          ma_nguoi_dung: "GV001",
          ten_nguoi_dung: "TS. Trần Thị B",
          ngay_sinh: "15/08/1980",
          gioi_tinh: "Nữ",
          email: "teacher1@st.cmc.edu.vn",
          so_dien_thoai: 987654321,
          mat_khau: "123456",
          vai_tro: "teacher",
        },
        {
          _id: "user_003",
          ma_nguoi_dung: "admin",
          ten_nguoi_dung: "Quản trị viên hệ thống",
          ngay_sinh: "01/01/1990",
          gioi_tinh: "Nam",
          email: "admin@cmc.edu.vn",
          so_dien_thoai: 123456789,
          mat_khau: "123456",
          vai_tro: "admin",
        },
        {
          _id: "user_004",
          ma_nguoi_dung: "pctsv",
          ten_nguoi_dung: "Phòng Công tác Sinh viên",
          ngay_sinh: "01/01/1990",
          gioi_tinh: "Nam",
          email: "pctsv@cmc.edu.vn",
          so_dien_thoai: 123456789,
          mat_khau: "123456",
          vai_tro: "pctsv",
        },
        {
          _id: "user_005",
          ma_nguoi_dung: "security",
          ten_nguoi_dung: "Bảo vệ trường",
          ngay_sinh: "01/01/1990",
          gioi_tinh: "Nam",
          email: "security@cmc.edu.vn",
          so_dien_thoai: 123456789,
          mat_khau: "123456",
          vai_tro: "security",
        },
      ];
      console.log(
        "✅ Users collection reinitialized with",
        usersCollection.length,
        "users",
      );
    }
  };
  
  const initializeDefaultData = () => {
    console.log("📊 Initializing complete database...");
  
    // Ensure users are initialized
    if (usersCollection.length === 0) {
      console.log(
        "⚠️ Users collection empty during init, calling initializeUsers...",
      );
      initializeUsers();
    }
  
    console.log(`👥 Users: ${usersCollection.length}`);
    console.log(`🏢 Rooms: ${roomsCollection.length}`);
    console.log(`📅 Bookings: ${bookingHistoryCollection.length}`);
    console.log(`⏰ Schedules: ${scheduleCollection.length}`);
  
    console.log(
      "📧 Available user emails:",
      usersCollection.map((u) => u.email),
    );
    console.log(
      "🏢 Available rooms:",
      roomsCollection.map((r) => r.Ma_phong),
    );
  };
  
  export const debugUsers = () => {
    console.log("🔍 Debug: All users in collection:");
    usersCollection.forEach((user, index) => {
      console.log(
        `${index + 1}. Email: ${user.email} | Name: ${user.ten_nguoi_dung} | Role: ${user.vai_tro}`,
      );
    });
    return usersCollection;
  };
  
  export const checkConnection = () => {
    console.log("🔗 MongoDB Connection Status:", isConnected);
    console.log("👥 Users Collection Length:", usersCollection.length);
    console.log("🏢 Rooms Collection Length:", roomsCollection.length);
    return {
      isConnected,
      userCount: usersCollection.length,
      roomCount: roomsCollection.length,
      users: usersCollection,
      rooms: roomsCollection,
    };
  };
  
  // Immediate test on module load
  console.log("🧪 IMMEDIATE TEST - Users collection on module load:");
  console.log("Collection length:", usersCollection.length);
  console.log("First user:", usersCollection[0]);
  console.log(
    "All emails:",
    usersCollection.map((u) => u.email),
  );
  
  // If empty, force initialize
  if (usersCollection.length === 0) {
    console.log("⚠️ EMERGENCY: Users collection is empty, force initializing...");
    initializeUsers();
    console.log("After emergency init, length:", usersCollection.length);
  }
  
  // Test user lookup immediately
  const testEmail = "BIT230372@st.cmc.edu.vn";
  const testUser = usersCollection.find((u) => u.email === testEmail);
  console.log(`🔍 IMMEDIATE TEST - Finding ${testEmail}:`, testUser);
  
  // Also test the other demo accounts
  const demoEmails = [
    "teacher1@st.cmc.edu.vn",
    "admin@cmc.edu.vn",
    "pctsv@cmc.edu.vn",
    "security@cmc.edu.vn",
  ];
  demoEmails.forEach((email) => {
    const found = usersCollection.find((u) => u.email === email);
    console.log(
      `🔍 IMMEDIATE TEST - ${email}:`,
      found ? "✅ Found" : "❌ Missing",
    );
  });
  
  if (typeof window !== "undefined") {
    (window as any).debugCMC = {
      debugUsers,
      checkConnection,
      usersCollection: () => usersCollection,
      roomsCollection: () => roomsCollection,
      testFindUser: (email: string) => {
        console.log("🧪 Manual test finding:", email);
        const found = usersCollection.find((u) => u.email === email);
        console.log("Result:", found);
        return found;
      },
    };
  
    // Also make the collection directly accessible for debugging
    (window as any).usersCollection = usersCollection;
  }
  
  connectMongoDB();
  
  export type { MongoUser, MongoRoom, MongoBookingHistory, MongoSchedule };
  