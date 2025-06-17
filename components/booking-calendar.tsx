"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, Clock, Users } from "lucide-react"
import { useBookings } from "@/lib/booking-context"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from "date-fns"
import { vi } from "date-fns/locale"

interface BookingCalendarProps {
  roomId?: string
  selectedDate?: Date
  selectedTime?: string
  onDateSelect?: (date: Date) => void
  onTimeSelect?: (time: string) => void
  onBookingClick?: (bookingId: string) => void
}

export default function BookingCalendar({
  roomId,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onBookingClick,
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date())
  const [viewMode, setViewMode] = useState<"week" | "month">("week")
  const { bookings } = useBookings()

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const timeSlots = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ]

  const getBookingsForDateAndTime = (date: Date, time: string) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return bookings.filter((booking) => {
      if (roomId && booking.room.id !== roomId) return false
      if (booking.date !== dateStr) return false

      const bookingStart = booking.startTime
      const bookingEnd = booking.endTime
      return time >= bookingStart && time < bookingEnd
    })
  }

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentDate((prev) => addDays(prev, direction === "next" ? 7 : -7))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-amber-500"
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleDateClick = (date: Date) => {
    setCurrentDate(date)
    onDateSelect?.(date)
  }

  const handleTimeClick = (time: string) => {
    onTimeSelect?.(time)
  }

  const isTimeSlotAvailable = (date: Date, time: string) => {
    const bookingsAtTime = getBookingsForDateAndTime(date, time)
    return bookingsAtTime.length === 0
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Lịch đặt phòng
            {roomId && <span className="text-sm font-normal text-gray-600">- Phòng {roomId}</span>}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>
              Tuần
            </Button>
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Tháng
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-medium">
              {format(weekStart, "dd/MM", { locale: vi })} - {format(weekEnd, "dd/MM/yyyy", { locale: vi })}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Hôm nay
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {viewMode === "week" && (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header with days */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="p-2 text-sm font-medium text-gray-500">Giờ</div>
                {weekDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className={`p-2 text-center text-sm font-medium cursor-pointer rounded-lg transition-colors ${
                      isToday(day)
                        ? "bg-blue-100 text-blue-700"
                        : selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div>{format(day, "EEE", { locale: vi })}</div>
                    <div className="text-lg">{format(day, "dd")}</div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="space-y-1">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 gap-1">
                    <div className="p-2 text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </div>
                    {weekDays.map((day) => {
                      const dayBookings = getBookingsForDateAndTime(day, time)
                      const isAvailable = isTimeSlotAvailable(day, time)
                      const isSelected =
                        selectedTime === time &&
                        selectedDate &&
                        format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")

                      return (
                        <div
                          key={`${day.toISOString()}-${time}`}
                          className={`min-h-[60px] border border-gray-200 rounded p-1 cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-green-100 border-green-500"
                              : isAvailable
                                ? "hover:bg-gray-50"
                                : "bg-gray-50"
                          }`}
                          onClick={() => {
                            handleDateClick(day)
                            handleTimeClick(time)
                          }}
                        >
                          {dayBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className={`text-xs p-1 rounded mb-1 text-white cursor-pointer ${getStatusColor(booking.status)}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                onBookingClick?.(booking.id)
                              }}
                            >
                              <div className="font-medium truncate">{booking.room.name}</div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{booking.attendees}</span>
                              </div>
                              <div className="truncate">{booking.studentName}</div>
                            </div>
                          ))}
                          {isAvailable && <div className="text-xs text-gray-400 p-1">Trống</div>}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm">Đã xác nhận</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span className="text-sm">Chờ duyệt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm">Đã hoàn thành</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm">Đã hủy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-500 rounded"></div>
            <span className="text-sm">Đã chọn</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
