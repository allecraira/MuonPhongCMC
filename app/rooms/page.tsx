"use client"

import { useState } from "react"
import RoleBasedWrapper from "@/components/role-based-wrapper"
import AdvancedRoomFilter from "@/components/advanced-room-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Wifi, Monitor, Calendar, Clock } from "lucide-react"
import { rooms } from "@/lib/data"

export default function RoomsPage() {
  const [filteredRooms, setFilteredRooms] = useState(rooms)

  const handleFilterChange = (newFilteredRooms: any[]) => {
    setFilteredRooms(newFilteredRooms)
  }

  const handleFilterReset = () => {
    setFilteredRooms(rooms)
  }

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "máy chiếu":
        return <Monitor className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <RoleBasedWrapper title="Tìm kiếm phòng học">
      <div className="space-y-6">
        {/* Filter Component */}
        <AdvancedRoomFilter onFilterChange={handleFilterChange} onReset={handleFilterReset} />

        {/* Results */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Kết quả tìm kiếm ({filteredRooms.length} phòng)</h3>
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        {room.location}
                      </div>
                    </div>
                    <Badge variant={room.available ? "default" : "secondary"}>
                      {room.available ? "Có sẵn" : "Bận"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Sức chứa: {room.capacity} người</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Loại:</span>
                      <Badge variant="outline">
                        {room.type === "group"
                          ? "Phòng nhóm"
                          : room.type === "conference"
                            ? "Hội thảo"
                            : room.type === "lab"
                              ? "Thực hành"
                              : "Hội trường"}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Thiết bị:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.equipment.slice(0, 3).map((eq, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getEquipmentIcon(eq)}
                            {eq}
                          </Badge>
                        ))}
                        {room.equipment.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{room.equipment.length - 3} khác
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Available Time Slots Today */}
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Ca trống hôm nay:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["7-8", "9-10", "11-12"].map((slot) => (
                          <Badge key={slot} variant="outline" className="text-xs bg-green-50 text-green-700">
                            Tiết {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Đặt phòng
                      </Button>
                      <Button variant="outline" size="sm">
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy phòng phù hợp</h3>
              <p className="text-gray-600">Thử điều chỉnh bộ lọc để tìm thấy phòng phù hợp hơn.</p>
              <Button variant="outline" className="mt-4" onClick={handleFilterReset}>
                Xóa bộ lọc
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </RoleBasedWrapper>
  )
}
