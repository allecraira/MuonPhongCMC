"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, CalendarIcon, Clock, Users, MapPin, Map } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { rooms } from "@/lib/data"

interface FilterState {
  search: string
  building: string
  capacity: number[]
  equipment: string[]
  date: Date | undefined
  timeSlot: string
  availability: string
  roomType: string
}

interface AdvancedRoomFilterProps {
  onFilterChange: (filteredRooms: any[]) => void
  onReset: () => void
}

export default function AdvancedRoomFilter({ onFilterChange, onReset }: AdvancedRoomFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    building: "",
    capacity: [1, 200],
    equipment: [],
    date: undefined,
    timeSlot: "",
    availability: "",
    roomType: "",
  })

  const buildings = ["Tòa CS1", "Tòa CS2", "Tòa CS3"]
  const equipmentOptions = [
    "Máy chiếu",
    "Micro",
    "Bảng trắng",
    "Điều hòa",
    "Hệ thống âm thanh",
    "TV màn hình lớn",
    "Máy tính",
    "Phần mềm chuyên ngành",
  ]

  // Time slots based on selected date
  const getTimeSlots = (selectedDate?: Date) => {
    const baseSlots = [
      { value: "1-2", label: "Tiết 1-2 (07:00-08:30)", time: "07:00-08:30" },
      { value: "3-4", label: "Tiết 3-4 (08:45-10:15)", time: "08:45-10:15" },
      { value: "5-6", label: "Tiết 5-6 (10:30-12:00)", time: "10:30-12:00" },
      { value: "7-8", label: "Tiết 7-8 (13:00-14:30)", time: "13:00-14:30" },
      { value: "9-10", label: "Tiết 9-10 (14:45-16:15)", time: "14:45-16:15" },
      { value: "11-12", label: "Tiết 11-12 (16:30-18:00)", time: "16:30-18:00" },
      { value: "13-14", label: "Tiết 13-14 (18:15-19:45)", time: "18:15-19:45" },
    ]

    // If date is selected, you can add logic to check availability
    if (selectedDate) {
      // Mock logic: some slots might be unavailable on certain dates
      return baseSlots.map((slot) => ({
        ...slot,
        available: Math.random() > 0.3, // Random availability for demo
      }))
    }

    return baseSlots.map((slot) => ({ ...slot, available: true }))
  }

  const roomTypes = ["group", "conference", "lab", "auditorium"]

  // Filter rooms based on current filters
  const filterRooms = (currentFilters: FilterState) => {
    let filteredRooms = [...rooms]

    // Search filter
    if (currentFilters.search) {
      filteredRooms = filteredRooms.filter(
        (room) =>
          room.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
          room.location.toLowerCase().includes(currentFilters.search.toLowerCase()),
      )
    }

    // Building filter
    if (currentFilters.building && currentFilters.building !== "all") {
      filteredRooms = filteredRooms.filter((room) => room.location.includes(currentFilters.building))
    }

    // Capacity filter
    filteredRooms = filteredRooms.filter(
      (room) => room.capacity >= currentFilters.capacity[0] && room.capacity <= currentFilters.capacity[1],
    )

    // Equipment filter
    if (currentFilters.equipment.length > 0) {
      filteredRooms = filteredRooms.filter((room) =>
        currentFilters.equipment.every((eq) => room.equipment.includes(eq)),
      )
    }

    // Room type filter
    if (currentFilters.roomType && currentFilters.roomType !== "all") {
      filteredRooms = filteredRooms.filter((room) => room.type === currentFilters.roomType)
    }

    // Availability filter
    if (currentFilters.availability && currentFilters.availability !== "all") {
      if (currentFilters.availability === "available") {
        filteredRooms = filteredRooms.filter((room) => room.available)
      } else if (currentFilters.availability === "occupied") {
        filteredRooms = filteredRooms.filter((room) => !room.available)
      }
    }

    // Date and time slot filter
    if (currentFilters.date && currentFilters.timeSlot) {
      // Mock logic: filter based on date and time availability
      filteredRooms = filteredRooms.filter((room) => {
        // In real app, this would check actual bookings
        return Math.random() > 0.2 // Random availability for demo
      })
    }

    return filteredRooms
  }

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Apply filters and notify parent
    const filteredRooms = filterRooms(newFilters)
    onFilterChange(filteredRooms)
  }

  const toggleEquipment = (equipment: string) => {
    const newEquipment = filters.equipment.includes(equipment)
      ? filters.equipment.filter((e) => e !== equipment)
      : [...filters.equipment, equipment]
    updateFilter("equipment", newEquipment)
  }

  const resetFilters = () => {
    const resetState: FilterState = {
      search: "",
      building: "",
      capacity: [1, 200],
      equipment: [],
      date: undefined,
      timeSlot: "",
      availability: "",
      roomType: "",
    }
    setFilters(resetState)
    onFilterChange(rooms) // Return all rooms
    onReset()
  }

  // Handle Enter key press for search
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const filteredRooms = filterRooms(filters)
      onFilterChange(filteredRooms)
    }
  }

  // Initialize with all rooms
  useEffect(() => {
    onFilterChange(rooms)
  }, [])

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "search" && value) return true
    if (key === "building" && value && value !== "all") return true
    if (key === "capacity" && (value[0] > 1 || value[1] < 200)) return true
    if (key === "equipment" && value.length > 0) return true
    if (key === "date" && value) return true
    if (key === "timeSlot" && value && value !== "all") return true
    if (key === "availability" && value && value !== "all") return true
    if (key === "roomType" && value && value !== "all") return true
    return false
  }).length

  const timeSlots = getTimeSlots(filters.date)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Tìm kiếm và lọc phòng
            </CardTitle>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount} bộ lọc</Badge>}
              <Button variant="outline" size="sm" onClick={() => setShowMap(!showMap)}>
                <Map className="w-4 h-4 mr-2" />
                {showMap ? "Ẩn bản đồ" : "Xem bản đồ"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                <Filter className="w-4 h-4 mr-2" />
                {isExpanded ? "Thu gọn" : "Mở rộng"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên phòng, vị trí... (Nhấn Enter để tìm)"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="pl-10"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.availability === "available" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("availability", filters.availability === "available" ? "" : "available")}
            >
              Có sẵn ngay
            </Button>
            <Button
              variant={filters.roomType === "lab" ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("roomType", filters.roomType === "lab" ? "" : "lab")}
            >
              Phòng Lab
            </Button>
            <Button
              variant={filters.equipment.includes("Máy chiếu") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleEquipment("Máy chiếu")}
            >
              Có máy chiếu
            </Button>
          </div>

          {/* Advanced Filters */}
          {isExpanded && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t">
              {/* Building */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Tòa nhà
                </Label>
                <Select value={filters.building} onValueChange={(value) => updateFilter("building", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tòa nhà" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {buildings.map((building) => (
                      <SelectItem key={building} value={building}>
                        {building}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Room Type */}
              <div className="space-y-2">
                <Label>Loại phòng</Label>
                <Select value={filters.roomType} onValueChange={(value) => updateFilter("roomType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="group">Phòng học nhóm</SelectItem>
                    <SelectItem value="conference">Phòng hội thảo</SelectItem>
                    <SelectItem value="lab">Phòng thực hành</SelectItem>
                    <SelectItem value="auditorium">Hội trường</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Ngày sử dụng
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.date ? format(filters.date, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.date}
                      onSelect={(date) => updateFilter("date", date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot - Updated based on selected date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Ca học {filters.date && `(${format(filters.date, "dd/MM/yyyy")})`}
                </Label>
                <Select
                  value={filters.timeSlot}
                  onValueChange={(value) => updateFilter("timeSlot", value)}
                  disabled={!filters.date}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={filters.date ? "Chọn ca học" : "Chọn ngày trước"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value} disabled={!slot.available}>
                        <div className="flex items-center justify-between w-full">
                          <span>{slot.label}</span>
                          {!slot.available && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Đã đặt
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Sức chứa: {filters.capacity[0]} - {filters.capacity[1]} người
                </Label>
                <Slider
                  value={filters.capacity}
                  onValueChange={(value) => updateFilter("capacity", value)}
                  max={200}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <Label>Tình trạng</Label>
                <Select value={filters.availability} onValueChange={(value) => updateFilter("availability", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tình trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="available">Có sẵn</SelectItem>
                    <SelectItem value="occupied">Đang sử dụng</SelectItem>
                    <SelectItem value="maintenance">Bảo trì</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Equipment Filter */}
          {isExpanded && (
            <div className="space-y-3">
              <Label>Thiết bị cần thiết</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {equipmentOptions.map((equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment}
                      checked={filters.equipment.includes(equipment)}
                      onCheckedChange={() => toggleEquipment(equipment)}
                    />
                    <Label htmlFor={equipment} className="text-sm cursor-pointer">
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <span className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</span>
              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  Tìm kiếm: {filters.search}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("search", "")} />
                </Badge>
              )}
              {filters.building && (
                <Badge variant="secondary" className="gap-1">
                  {filters.building}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("building", "")} />
                </Badge>
              )}
              {filters.date && (
                <Badge variant="secondary" className="gap-1">
                  {format(filters.date, "dd/MM/yyyy")}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("date", undefined)} />
                </Badge>
              )}
              {filters.timeSlot && (
                <Badge variant="secondary" className="gap-1">
                  Ca {filters.timeSlot}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("timeSlot", "")} />
                </Badge>
              )}
              {filters.equipment.map((equipment) => (
                <Badge key={equipment} variant="secondary" className="gap-1">
                  {equipment}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => toggleEquipment(equipment)} />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2">
                Xóa tất cả
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campus Map */}
      {showMap && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5" />
              Bản đồ khuôn viên CMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center space-y-2">
                <Map className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-gray-500">Bản đồ khuôn viên sẽ được hiển thị tại đây</p>
                <p className="text-sm text-gray-400">Tích hợp Google Maps hoặc bản đồ tùy chỉnh</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
