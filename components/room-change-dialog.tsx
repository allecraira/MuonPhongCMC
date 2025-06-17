"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, MapPin, Users, AlertCircle } from "lucide-react"
import { rooms } from "@/lib/data"
import { useNotifications } from "@/lib/notification-context"

interface RoomChangeDialogProps {
  booking: any
  trigger?: React.ReactNode
  onRoomChange?: (bookingId: string, newRoomId: string, reason: string) => void
}

export default function RoomChangeDialog({ booking, trigger, onRoomChange }: RoomChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState("")
  const [reason, setReason] = useState("")
  const [isChanging, setIsChanging] = useState(false)
  const { showToast } = useNotifications()

  // Filter available rooms (exclude current room and check capacity)
  const availableRooms = rooms.filter(
    (room) => room.id !== booking.room.id && room.available && room.capacity >= booking.attendees,
  )

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId)

  const handleRoomChange = async () => {
    if (!selectedRoomId || !reason.trim()) {
      showToast("Vui lòng chọn phòng và nhập lý do đổi phòng!", "warning")
      return
    }

    setIsChanging(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Call parent callback
      onRoomChange?.(booking.id, selectedRoomId, reason)

      showToast("Đã đổi phòng thành công!", "success")
      setIsOpen(false)
      setSelectedRoomId("")
      setReason("")
    } catch (error) {
      showToast("Có lỗi xảy ra khi đổi phòng!", "error")
    } finally {
      setIsChanging(false)
    }
  }

  const resetForm = () => {
    setSelectedRoomId("")
    setReason("")
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Đổi phòng
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Đổi phòng cho đặt phòng
          </DialogTitle>
          <DialogDescription>Chọn phòng mới và nhập lý do để thực hiện đổi phòng</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Booking Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Thông tin đặt phòng hiện tại</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Sinh viên:</p>
                <p className="font-medium">
                  {booking.studentName} ({booking.studentId})
                </p>
              </div>
              <div>
                <p className="text-gray-600">Phòng hiện tại:</p>
                <p className="font-medium">{booking.room.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Thời gian:</p>
                <p className="font-medium">
                  {booking.date} | {booking.startTime} - {booking.endTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Số người:</p>
                <p className="font-medium">{booking.attendees} người</p>
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-2">
            <Label>Chọn phòng mới *</Label>
            <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn phòng thay thế" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.length > 0 ? (
                  availableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{room.name}</span>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {room.location}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Users className="w-3 h-3 mr-1" />
                            {room.capacity}
                          </Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    Không có phòng phù hợp
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {availableRooms.length === 0 && (
              <div className="flex items-center gap-2 text-amber-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Không có phòng nào phù hợp với yêu cầu (sức chứa >= {booking.attendees} người)</span>
              </div>
            )}
          </div>

          {/* Selected Room Details */}
          {selectedRoom && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3 text-blue-900">Thông tin phòng mới</h4>
              <divv>
                v className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700">Tên phòng:</p>
                  <p className="font-medium text-blue-900">{selectedRoom.name}</p>
                </div>
                <div>
                  <p className="text-blue-700">Vị trí:</p>
                  <p className="font-medium text-blue-900">{selectedRoom.location}</p>
                </div>
                <div>
                  <p className="text-blue-700">Sức chứa:</p>
                  <p className="font-medium text-blue-900">{selectedRoom.capacity} người</p>
                </div>
                <div>
                  <p className="text-blue-700">Loại phòng:</p>
                  <p className="font-medium text-blue-900">
                    {selectedRoom.type === "group"
                      ? "Phòng học nhóm"
                      : selectedRoom.type === "conference"
                        ? "Phòng hội thảo"
                        : selectedRoom.type === "lab"
                          ? "Phòng thực hành"
                          : selectedRoom.type === "auditorium"
                            ? "Hội trường"
                            : selectedRoom.type}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-blue-700 text-sm mb-2">Thiết bị có sẵn:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedRoom.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Lý do đổi phòng *</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do cần đổi phòng (ví dụ: phòng hiện tại có sự cố kỹ thuật, cần phòng lớn hơn...)"
              rows={3}
            />
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Lưu ý khi đổi phòng:</p>
                <ul className="text-amber-700 space-y-1">
                  <li>• Sinh viên sẽ được thông báo qua email về việc đổi phòng</li>
                  <li>• Thời gian đặt phòng không thay đổi</li>
                  <li>• Việc đổi phòng sẽ được ghi lại trong hệ thống</li>
                  <li>• Không thể hoàn tác sau khi xác nhận</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1" disabled={isChanging}>
              Hủy
            </Button>
            <Button
              onClick={handleRoomChange}
              disabled={isChanging || !selectedRoomId || !reason.trim() || availableRooms.length === 0}
              className="flex-1"
            >
              {isChanging ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang đổi phòng...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Xác nhận đổi phòng
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
