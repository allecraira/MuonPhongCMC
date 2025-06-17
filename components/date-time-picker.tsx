"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface DateTimePickerProps {
  selectedDate?: Date
  selectedTimeSlot?: string
  onDateChange?: (date: Date | undefined) => void
  onTimeSlotChange?: (timeSlot: string) => void
  onDataUpdate?: (data: any) => void
}

// Time slots for different periods
const timeSlots = [
  { value: "07:00-08:30", label: "Tiết 1-2 (07:00 - 08:30)", period: "morning" },
  { value: "08:45-10:15", label: "Tiết 3-4 (08:45 - 10:15)", period: "morning" },
  { value: "10:30-12:00", label: "Tiết 5-6 (10:30 - 12:00)", period: "morning" },
  { value: "13:00-14:30", label: "Tiết 7-8 (13:00 - 14:30)", period: "afternoon" },
  { value: "14:45-16:15", label: "Tiết 9-10 (14:45 - 16:15)", period: "afternoon" },
  { value: "16:30-18:00", label: "Tiết 11-12 (16:30 - 18:00)", period: "afternoon" },
  { value: "18:00-19:30", label: "Tiết 13-14 (18:00 - 19:30)", period: "evening" },
  { value: "19:45-21:15", label: "Tiết 15-16 (19:45 - 21:15)", period: "evening" },
]

export default function DateTimePicker({
  selectedDate,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotChange,
  onDataUpdate,
}: DateTimePickerProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  const [timeSlot, setTimeSlot] = useState<string>(selectedTimeSlot || "")

  // Mock booked slots for demo
  const bookedSlots = ["08:45-10:15", "14:45-16:15"]

  useEffect(() => {
    if (date && timeSlot) {
      const formattedData = {
        date: date,
        timeSlot: timeSlot,
        dayOfWeek: format(date, "EEEE", { locale: vi }),
        dateDisplay: format(date, "dd/MM/yyyy", { locale: vi }),
        timeRange: timeSlots.find((slot) => slot.value === timeSlot)?.label || timeSlot,
      }

      onDataUpdate?.({
        selectedDate: date,
        selectedTimeSlot: timeSlot,
        formattedData,
      })
    }
  }, [date, timeSlot, onDataUpdate])

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    onDateChange?.(newDate)
  }

  const handleTimeSlotChange = (newTimeSlot: string) => {
    setTimeSlot(newTimeSlot)
    onTimeSlotChange?.(newTimeSlot)
  }

  const getAvailableSlots = () => {
    if (!date) return timeSlots

    // Mock logic: some slots are booked on certain dates
    return timeSlots.map((slot) => ({
      ...slot,
      isBooked: bookedSlots.includes(slot.value),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Chọn ngày và giờ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar */}
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>

        {/* Time Slot Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Chọn khung giờ
          </label>
          <Select value={timeSlot} onValueChange={handleTimeSlotChange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn khung giờ học" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableSlots().map((slot) => (
                <SelectItem
                  key={slot.value}
                  value={slot.value}
                  disabled={slot.isBooked}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{slot.label}</span>
                    {slot.isBooked && (
                      <Badge variant="destructive" className="ml-2">
                        Đã đặt
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Info */}
        {date && timeSlot && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Thông tin đã chọn:</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>📅 {format(date, "EEEE, dd/MM/yyyy", { locale: vi })}</p>
              <p>⏰ {timeSlots.find((slot) => slot.value === timeSlot)?.label}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
