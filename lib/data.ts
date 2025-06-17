export interface Room {
  id: string
  name: string
  capacity: number
  location: string
  equipment: string[]
  available: boolean
  image: string
  type: string
}

export interface Booking {
  id: string
  room: Room
  date: string
  startTime: string
  endTime: string
  attendees: number
  purpose: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  studentName: string
  studentId: string
  email: string
  phone: string
  createdAt: string
}

export const rooms: Room[] = [
  {
    id: "1",
    name: "Phòng 201",
    capacity: 50,
    location: "Tầng 2, Tòa CS1",
    equipment: ["Máy chiếu", "Micro", "Bảng trắng", "Điều hòa", "Hệ thống âm thanh"],
    available: true,
    image: "/placeholder.svg?height=200&width=300",
    type: "conference",
  },
  {
    id: "2",
    name: "Phòng 105",
    capacity: 20,
    location: "Tầng 1, Tòa CS2",
    equipment: ["TV màn hình lớn", "Bảng trắng", "Điều hòa", "Bàn ghế linh hoạt"],
    available: true,
    image: "/placeholder.svg?height=200&width=300",
    type: "group",
  },
  {
    id: "3",
    name: "Phòng Lab 301",
    capacity: 30,
    location: "Tầng 3, Tòa CS3",
    equipment: ["Máy tính", "Máy chiếu", "Điều hòa", "Bảng trắng", "Phần mềm chuyên ngành"],
    available: false,
    image: "/placeholder.svg?height=200&width=300",
    type: "lab",
  },
  {
    id: "4",
    name: "Hội trường A",
    capacity: 150,
    location: "Tầng 1, Tòa CS1",
    equipment: ["Hệ thống âm thanh chuyên nghiệp", "Máy chiếu 4K", "Micro không dây", "Điều hòa", "Sân khấu"],
    available: true,
    image: "/placeholder.svg?height=200&width=300",
    type: "auditorium",
  },
  {
    id: "5",
    name: "Phòng 302",
    capacity: 15,
    location: "Tầng 3, Tòa CS2",
    equipment: ["Bảng trắng", "Điều hòa", "Bàn ghế linh hoạt", "TV thông minh"],
    available: true,
    image: "/placeholder.svg?height=200&width=300",
    type: "group",
  },
  {
    id: "6",
    name: "Phòng Lab 102",
    capacity: 25,
    location: "Tầng 1, Tòa CS3",
    equipment: ["Máy tính", "Phần mềm thiết kế", "Điều hòa", "Máy chiếu"],
    available: true,
    image: "/placeholder.svg?height=200&width=300",
    type: "lab",
  },
  {
    id: "7",
    name: "Phòng 401",
    capacity: 60,
    location: "Tầng 4, Tòa CS1",
    equipment: ["Máy chiếu 4K", "Hệ thống âm thanh", "Micro", "Điều hòa", "Bảng tương tác"],
    available: false,
    image: "/placeholder.svg?height=200&width=300",
    type: "conference",
  },
  {
    id: "8",
    name: "Phòng 203",
    capacity: 12,
    location: "Tầng 2, Tòa CS2",
    equipment: ["TV thông minh", "Bảng trắng", "Điều hòa", "Ghế sofa"],
    available: true,
    image: "/placeholder.svg?height=200&width=300",
    type: "group",
  },
]

export const bookings: Booking[] = [
  {
    id: "1",
    room: rooms[0],
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "11:00",
    attendees: 25,
    purpose: "Thuyết trình đồ án cuối kỳ môn Lập trình Web",
    status: "confirmed",
    studentName: "Nguyễn Văn An",
    studentId: "21IT001",
    email: "nguyenvanan@student.cmc.edu.vn",
    phone: "0123456789",
    createdAt: "2024-01-10T10:30:00Z",
  },
  {
    id: "2",
    room: rooms[1],
    date: "2024-01-12",
    startTime: "14:00",
    endTime: "16:00",
    attendees: 8,
    purpose: "Họp nhóm dự án Khoa học máy tính",
    status: "completed",
    studentName: "Nguyễn Văn An",
    studentId: "21IT001",
    email: "nguyenvanan@student.cmc.edu.vn",
    phone: "0123456789",
    createdAt: "2024-01-08T14:20:00Z",
  },
  {
    id: "3",
    room: rooms[3],
    date: "2024-01-10",
    startTime: "10:00",
    endTime: "12:00",
    attendees: 80,
    purpose: "Hội thảo Công nghệ AI trong giáo dục",
    status: "cancelled",
    studentName: "Nguyễn Văn An",
    studentId: "21IT001",
    email: "nguyenvanan@student.cmc.edu.vn",
    phone: "0123456789",
    createdAt: "2024-01-05T09:15:00Z",
  },
]
