import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Users, Monitor, Wifi, Coffee, Presentation } from "lucide-react"

export default function RoomsPage() {
  // Danh sách các phòng học
  const rooms = [
    {
      id: "A101",
      name: "Phòng học A101",
      type: "classroom",
      capacity: 30,
      features: ["Máy chiếu", "Bảng thông minh", "Điều hòa"],
      availability: "available",
      location: "Tòa nhà A - Tầng 1",
      description: "Phòng học rộng rãi, phù hợp cho các lớp học nhỏ và vừa.",
    },
    {
      id: "A102",
      name: "Phòng học A102",
      type: "classroom",
      capacity: 30,
      features: ["Máy chiếu", "Bảng thông minh", "Điều hòa"],
      availability: "booked",
      location: "Tòa nhà A - Tầng 1",
      description: "Phòng học rộng rãi, phù hợp cho các lớp học nhỏ và vừa.",
    },
    {
      id: "B205",
      name: "Phòng hội thảo B205",
      type: "conference",
      capacity: 50,
      features: ["Hệ thống âm thanh", "Máy chiếu HD", "Điều hòa", "Micro không dây"],
      availability: "available",
      location: "Tòa nhà B - Tầng 2",
      description: "Phòng hội thảo hiện đại, phù hợp cho các buổi hội thảo và sự kiện.",
    },
    {
      id: "C103",
      name: "Phòng học nhóm C103",
      type: "group",
      capacity: 15,
      features: ["Bảng trắng", "Bàn tròn", "Điều hòa"],
      availability: "available",
      location: "Tòa nhà C - Tầng 1",
      description: "Phòng học nhóm nhỏ, phù hợp cho các nhóm học tập và thảo luận.",
    },
    {
      id: "D001",
      name: "Phòng máy tính D001",
      type: "computer",
      capacity: 40,
      features: ["40 máy tính", "Máy chiếu", "Điều hòa", "Phần mềm chuyên dụng"],
      availability: "maintenance",
      location: "Tòa nhà D - Tầng trệt",
      description: "Phòng máy tính hiện đại với đầy đủ phần mềm phục vụ học tập và nghiên cứu.",
    },
    {
      id: "E105",
      name: "Phòng đa năng E105",
      type: "multipurpose",
      capacity: 60,
      features: ["Sân khấu nhỏ", "Hệ thống âm thanh", "Máy chiếu", "Điều hòa"],
      availability: "available",
      location: "Tòa nhà E - Tầng 1",
      description: "Phòng đa năng phù hợp cho các sự kiện, biểu diễn nhỏ và hoạt động ngoại khóa.",
    },
  ]

  // Hiển thị trạng thái phòng
  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Còn trống</Badge>
      case "booked":
        return <Badge variant="secondary">Đã đặt</Badge>
      case "maintenance":
        return <Badge variant="destructive">Bảo trì</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  // Lấy biểu tượng cho loại phòng
  const getRoomIcon = (type: string) => {
    switch (type) {
      case "classroom":
        return <Presentation className="h-5 w-5" />
      case "conference":
        return <Users className="h-5 w-5" />
      case "group":
        return <Coffee className="h-5 w-5" />
      case "computer":
        return <Monitor className="h-5 w-5" />
      case "multipurpose":
        return <Wifi className="h-5 w-5" />
      default:
        return <Presentation className="h-5 w-5" />
    }
  }

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="flex items-center mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Quay lại trang chủ
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh sách phòng học</h1>
          <p className="text-muted-foreground mt-2">Xem thông tin và tình trạng các phòng học tại CMC</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="classroom">Phòng học</TabsTrigger>
            <TabsTrigger value="conference">Hội thảo</TabsTrigger>
            <TabsTrigger value="group">Học nhóm</TabsTrigger>
            <TabsTrigger value="computer">Máy tính</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="all" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </TabsContent>
            <TabsContent value="classroom" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms
                .filter((room) => room.type === "classroom")
                .map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
            </TabsContent>
            <TabsContent value="conference" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms
                .filter((room) => room.type === "conference")
                .map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
            </TabsContent>
            <TabsContent value="group" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms
                .filter((room) => room.type === "group")
                .map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
            </TabsContent>
            <TabsContent value="computer" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms
                .filter((room) => room.type === "computer")
                .map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

function RoomCard({ room }: { room: any }) {
  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Còn trống</Badge>
      case "booked":
        return <Badge variant="secondary">Đã đặt</Badge>
      case "maintenance":
        return <Badge variant="destructive">Bảo trì</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "classroom":
        return <Presentation className="h-5 w-5" />
      case "conference":
        return <Users className="h-5 w-5" />
      case "group":
        return <Coffee className="h-5 w-5" />
      case "computer":
        return <Monitor className="h-5 w-5" />
      case "multipurpose":
        return <Wifi className="h-5 w-5" />
      default:
        return <Presentation className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{room.name}</CardTitle>
            <CardDescription>{room.location}</CardDescription>
          </div>
          <div className="flex items-center">{getRoomIcon(room.type)}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{room.capacity} người</span>
            </div>
            {getAvailabilityBadge(room.availability)}
          </div>
          <p className="text-sm text-muted-foreground">{room.description}</p>
          <div>
            <h4 className="text-sm font-medium mb-2">Trang thiết bị:</h4>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature: string, index: number) => (
                <Badge key={index} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" disabled={room.availability !== "available"}>
          <Link href={`/booking?room=${room.id}`}>
            {room.availability === "available" ? "Đặt phòng" : "Không khả dụng"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
