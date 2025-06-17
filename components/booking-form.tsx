"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarIcon, Users, MapPin, Clock, Plus, Minus } from "lucide-react"
import { format, addMinutes, parse } from "date-fns"
import { vi } from "date-fns/locale"

interface Room {
  id: string
  name: string
  capacity: number
  location: string
  equipment: string[]
  available: boolean
  image: string
}

interface BookingFormProps {
  room: Room
  initialDate?: Date
  initialTime?: string
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function BookingForm({ room, initialDate, initialTime, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    email: "",
    phone: "",
    date: initialDate || (undefined as Date | undefined),
    startTime: initialTime || "",
    endTime: "",
    duration: 2, // Default 2 hours
    purpose: "",
    attendees: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const timeSlots = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ]

  // Auto-calculate end time when start time or duration changes
  useEffect(() => {
    if (formData.startTime && formData.duration) {
      try {
        const startTime = parse(formData.startTime, "HH:mm", new Date())
        const endTime = addMinutes(startTime, formData.duration * 60)
        const endTimeStr = format(endTime, "HH:mm")

        setFormData((prev) => ({ ...prev, endTime: endTimeStr }))
      } catch (error) {
        console.error("Error calculating end time:", error)
      }
    }
  }, [formData.startTime, formData.duration])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.studentName.trim()) {
      newErrors.studentName = "Vui lòng nhập họ tên"
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Vui lòng nhập mã sinh viên"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    }

    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày"
    }

    if (!formData.startTime) {
      newErrors.startTime = "Vui lòng chọn giờ bắt đầu"
    }

    if (!formData.endTime) {
      newErrors.endTime = "Vui lòng chọn giờ kết thúc"
    }

    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "Giờ kết thúc phải sau giờ bắt đầu"
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Vui lòng nhập mục đích sử dụng"
    }

    if (!formData.attendees.trim()) {
      newErrors.attendees = "Vui lòng nhập số người tham gia"
    } else if (Number.parseInt(formData.attendees) > room.capacity) {
      newErrors.attendees = `Số người tham gia không được vượt quá ${room.capacity}`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const adjustDuration = (increment: number) => {
    const newDuration = Math.max(0.5, Math.min(8, formData.duration + increment))
    handleInputChange("duration", newDuration)
  }

  const handleEndTimeChange = (endTime: string) => {
    handleInputChange("endTime", endTime)

    // Calculate duration based on start and end time
    if (formData.startTime && endTime) {
      try {
        const start = parse(formData.startTime, "HH:mm", new Date())
        const end = parse(endTime, "HH:mm", new Date())
        const diffInMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
        const durationInHours = diffInMinutes / 60

        if (durationInHours > 0) {
          setFormData((prev) => ({ ...prev, duration: durationInHours }))
        }
      } catch (error) {
        console.error("Error calculating duration:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Đặt phòng</h1>
              <p className="text-sm text-gray-600">Điền thông tin để đặt phòng</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Room Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="aspect-video relative">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{room.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {room.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm">Sức chứa: {room.capacity} người</span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Thiết bị có sẵn:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Time Summary */}
                {formData.date && formData.startTime && formData.endTime && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Thời gian đặt:</p>
                    <div className="text-sm text-blue-700">
                      <p>{format(formData.date, "EEEE, dd/MM/yyyy", { locale: vi })}</p>
                      <p className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formData.startTime} - {formData.endTime}
                      </p>
                      <p>Thời lượng: {formData.duration} giờ</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin đặt phòng</CardTitle>
                <CardDescription>Vui lòng điền đầy đủ thông tin để hoàn tất đặt phòng</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Họ và tên *</Label>
                      <Input
                        id="studentName"
                        value={formData.studentName}
                        onChange={(e) => handleInputChange("studentName", e.target.value)}
                        placeholder="Nguyễn Văn A"
                      />
                      {errors.studentName && <p className="text-sm text-red-600">{errors.studentName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentId">Mã sinh viên *</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange("studentId", e.target.value)}
                        placeholder="SV001234"
                      />
                      {errors.studentId && <p className="text-sm text-red-600">{errors.studentId}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="student@cmc.edu.vn"
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="0123456789"
                      />
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Ngày sử dụng *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => handleInputChange("date", date)}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Giờ bắt đầu *</Label>
                        <Select
                          value={formData.startTime}
                          onValueChange={(value) => handleInputChange("startTime", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giờ bắt đầu" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.startTime && <p className="text-sm text-red-600">{errors.startTime}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label>Thời lượng (giờ)</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => adjustDuration(-0.5)}
                            disabled={formData.duration <= 0.5}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <Input
                            type="number"
                            step="0.5"
                            min="0.5"
                            max="8"
                            value={formData.duration}
                            onChange={(e) => handleInputChange("duration", Number.parseFloat(e.target.value) || 0.5)}
                            className="text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => adjustDuration(0.5)}
                            disabled={formData.duration >= 8}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Giờ kết thúc *</Label>
                        <Select value={formData.endTime} onValueChange={handleEndTimeChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Giờ kết thúc" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.endTime && <p className="text-sm text-red-600">{errors.endTime}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2">
                    <Label htmlFor="attendees">Số người tham gia *</Label>
                    <Input
                      id="attendees"
                      type="number"
                      min="1"
                      max={room.capacity}
                      value={formData.attendees}
                      onChange={(e) => handleInputChange("attendees", e.target.value)}
                      placeholder={`Tối đa ${room.capacity} người`}
                    />
                    {errors.attendees && <p className="text-sm text-red-600">{errors.attendees}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Mục đích sử dụng *</Label>
                    <Textarea
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      placeholder="Mô tả ngắn gọn về mục đích sử dụng phòng..."
                      rows={3}
                    />
                    {errors.purpose && <p className="text-sm text-red-600">{errors.purpose}</p>}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                      Hủy
                    </Button>
                    <Button type="submit" className="flex-1">
                      Xác nhận đặt phòng
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
