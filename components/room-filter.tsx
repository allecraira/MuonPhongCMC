"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

export default function RoomFilter() {
  const [filters, setFilters] = useState({
    search: "",
    capacity: "",
    location: "",
    equipment: "",
  })

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      capacity: "",
      location: "",
      equipment: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm phòng theo tên..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Bộ lọc
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {Object.values(filters).filter((value) => value !== "").length}
                </span>
              )}
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Xóa bộ lọc
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {isFilterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sức chứa</label>
                <Select value={filters.capacity} onValueChange={(value) => handleFilterChange("capacity", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sức chứa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 người</SelectItem>
                    <SelectItem value="11-20">11-20 người</SelectItem>
                    <SelectItem value="21-50">21-50 người</SelectItem>
                    <SelectItem value="50+">Trên 50 người</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Vị trí</label>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tòa nhà" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toa-a">Tòa A</SelectItem>
                    <SelectItem value="toa-b">Tòa B</SelectItem>
                    <SelectItem value="toa-c">Tòa C</SelectItem>
                    <SelectItem value="toa-d">Tòa D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Thiết bị</label>
                <Select value={filters.equipment} onValueChange={(value) => handleFilterChange("equipment", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thiết bị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="projector">Máy chiếu</SelectItem>
                    <SelectItem value="computer">Máy tính</SelectItem>
                    <SelectItem value="whiteboard">Bảng trắng</SelectItem>
                    <SelectItem value="sound-system">Hệ thống âm thanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
