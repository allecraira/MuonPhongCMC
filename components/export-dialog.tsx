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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, FileText, CalendarIcon } from "lucide-react"
import { vi } from "date-fns/locale"
import { useBookings } from "@/lib/booking-context"
import { useNotifications } from "@/lib/notification-context"
import { rooms } from "@/lib/data"

interface ExportDialogProps {
  trigger?: React.ReactNode
  defaultType?: "bookings" | "rooms" | "users" | "reports"
}

export default function ExportDialog({ trigger, defaultType = "bookings" }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exportType, setExportType] = useState(defaultType)
  const [format, setFormat] = useState("excel")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [includeFields, setIncludeFields] = useState({
    personalInfo: true,
    roomDetails: true,
    timestamps: true,
    status: true,
    purpose: false,
  })
  const [isExporting, setIsExporting] = useState(false)

  const { bookings } = useBookings()
  const { showToast } = useNotifications()

  const exportTypes = {
    bookings: "Danh sách đặt phòng",
    rooms: "Danh sách phòng",
    users: "Danh sách người dùng",
    reports: "Báo cáo thống kê",
  }

  const formatOptions = {
    excel: { label: "Excel (.xlsx)", icon: "📊" },
    csv: { label: "CSV (.csv)", icon: "📄" },
    pdf: { label: "PDF (.pdf)", icon: "📋" },
  }

  // Generate data based on export type and filters
  const generateExportData = () => {
    let data: any[] = []
    let filteredBookings = [...bookings]

    // Apply date filter
    if (dateRange.from || dateRange.to) {
      filteredBookings = filteredBookings.filter((booking) => {
        const bookingDate = new Date(booking.date)
        if (dateRange.from && bookingDate < dateRange.from) return false
        if (dateRange.to && bookingDate > dateRange.to) return false
        return true
      })
    }

    switch (exportType) {
      case "bookings":
        data = filteredBookings.map((booking, index) => ({
          STT: index + 1,
          "Mã đặt phòng": booking.id,
          "Tên sinh viên": includeFields.personalInfo ? booking.studentName : "***",
          "Mã sinh viên": includeFields.personalInfo ? booking.studentId : "***",
          Email: includeFields.personalInfo ? booking.email : "***",
          "Số điện thoại": includeFields.personalInfo ? booking.phone : "***",
          Phòng: includeFields.roomDetails ? booking.room.name : "***",
          "Vị trí": includeFields.roomDetails ? booking.room.location : "***",
          "Sức chứa": includeFields.roomDetails ? booking.room.capacity : "***",
          Ngày: booking.date,
          "Giờ bắt đầu": booking.startTime,
          "Giờ kết thúc": booking.endTime,
          "Số người tham gia": booking.attendees,
          "Trạng thái": includeFields.status ? getStatusText(booking.status) : "***",
          "Mục đích": includeFields.purpose ? booking.purpose : "***",
          "Ngày tạo": includeFields.timestamps ? formatDate(booking.createdAt) : "***",
        }))
        break

      case "rooms":
        data = rooms.map((room, index) => ({
          STT: index + 1,
          "Mã phòng": room.id,
          "Tên phòng": room.name,
          "Vị trí": room.location,
          "Sức chứa": room.capacity,
          "Loại phòng": getRoomTypeText(room.type),
          "Trạng thái": room.available ? "Có sẵn" : "Bảo trì",
          "Thiết bị": room.equipment.join(", "),
          "Số lần đặt": filteredBookings.filter((b) => b.room.id === room.id).length,
        }))
        break

      case "reports":
        const totalBookings = filteredBookings.length
        const confirmedBookings = filteredBookings.filter((b) => b.status === "confirmed").length
        const pendingBookings = filteredBookings.filter((b) => b.status === "pending").length
        const cancelledBookings = filteredBookings.filter((b) => b.status === "cancelled").length

        data = [
          { "Chỉ số": "Tổng số đặt phòng", "Giá trị": totalBookings },
          { "Chỉ số": "Đã xác nhận", "Giá trị": confirmedBookings },
          { "Chỉ số": "Chờ duyệt", "Giá trị": pendingBookings },
          { "Chỉ số": "Đã hủy", "Giá trị": cancelledBookings },
          { "Chỉ số": "Tỷ lệ xác nhận", "Giá trị": `${((confirmedBookings / totalBookings) * 100).toFixed(1)}%` },
          { "Chỉ số": "Tỷ lệ hủy", "Giá trị": `${((cancelledBookings / totalBookings) * 100).toFixed(1)}%` },
        ]
        break

      default:
        data = []
    }

    return data
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận"
      case "pending":
        return "Chờ duyệt"
      case "cancelled":
        return "Đã hủy"
      case "completed":
        return "Đã hoàn thành"
      default:
        return status
    }
  }

  const getRoomTypeText = (type: string) => {
    switch (type) {
      case "group":
        return "Phòng học nhóm"
      case "conference":
        return "Phòng hội thảo"
      case "lab":
        return "Phòng thực hành"
      case "auditorium":
        return "Hội trường"
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi })
    } catch {
      return dateString
    }
  }

  // Generate different file formats
  const generateFile = (data: any[], filename: string, format: string) => {
    let content = ""
    let mimeType = ""
    let extension = ""

    switch (format) {
      case "csv":
        if (data.length > 0) {
          const headers = Object.keys(data[0]).join(",")
          const rows = data.map((row) => Object.values(row).join(",")).join("\n")
          content = `${headers}\n${rows}`
        }
        mimeType = "text/csv;charset=utf-8;"
        extension = "csv"
        break

      case "excel":
        // For demo purposes, we'll generate CSV format
        // In production, you'd use a library like xlsx
        if (data.length > 0) {
          const headers = Object.keys(data[0]).join("\t")
          const rows = data.map((row) => Object.values(row).join("\t")).join("\n")
          content = `${headers}\n${rows}`
        }
        mimeType = "application/vnd.ms-excel;charset=utf-8;"
        extension = "xls"
        break

      case "pdf":
        // For demo purposes, we'll generate text format
        // In production, you'd use a library like jsPDF
        content = JSON.stringify(data, null, 2)
        mimeType = "application/pdf;charset=utf-8;"
        extension = "txt" // Changed to txt for demo
        break

      default:
        content = JSON.stringify(data, null, 2)
        mimeType = "application/json;charset=utf-8;"
        extension = "json"
    }

    // Create and download file
    const blob = new Blob(["\ufeff" + content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Generate data
      const data = generateExportData()

      if (data.length === 0) {
        showToast("Không có dữ liệu để xuất!", "warning")
        setIsExporting(false)
        return
      }

      // Generate filename
      const timestamp = format(new Date(), "yyyy-MM-dd-HHmm")
      const filename = `${exportTypes[exportType].toLowerCase().replace(/\s+/g, "-")}-${timestamp}`

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate and download file
      generateFile(data, filename, format)

      showToast(`Đã xuất ${data.length} bản ghi thành công!`, "success")
      setIsOpen(false)
    } catch (error) {
      showToast("Có lỗi xảy ra khi xuất dữ liệu!", "error")
    } finally {
      setIsExporting(false)
    }
  }

  const toggleField = (field: keyof typeof includeFields) => {
    setIncludeFields((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const estimatedRecords = generateExportData().length

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Xuất dữ liệu
          </DialogTitle>
          <DialogDescription>Chọn loại dữ liệu và định dạng file để xuất</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Type */}
          <div className="space-y-2">
            <Label>Loại dữ liệu</Label>
            <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(exportTypes).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Format */}
          <div className="space-y-2">
            <Label>Định dạng file</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(formatOptions).map(([key, option]) => (
                  <SelectItem key={key} value={key}>
                    <span className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Khoảng thời gian (tùy chọn)</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "PPP", { locale: vi }) : "Từ ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "PPP", { locale: vi }) : "Đến ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Fields to Include */}
          {exportType === "bookings" && (
            <div className="space-y-2">
              <Label>Thông tin bao gồm</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personalInfo"
                    checked={includeFields.personalInfo}
                    onCheckedChange={() => toggleField("personalInfo")}
                  />
                  <Label htmlFor="personalInfo" className="text-sm">
                    Thông tin cá nhân
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="roomDetails"
                    checked={includeFields.roomDetails}
                    onCheckedChange={() => toggleField("roomDetails")}
                  />
                  <Label htmlFor="roomDetails" className="text-sm">
                    Chi tiết phòng
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="timestamps"
                    checked={includeFields.timestamps}
                    onCheckedChange={() => toggleField("timestamps")}
                  />
                  <Label htmlFor="timestamps" className="text-sm">
                    Thời gian tạo
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status" checked={includeFields.status} onCheckedChange={() => toggleField("status")} />
                  <Label htmlFor="status" className="text-sm">
                    Trạng thái
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="purpose"
                    checked={includeFields.purpose}
                    onCheckedChange={() => toggleField("purpose")}
                  />
                  <Label htmlFor="purpose" className="text-sm">
                    Mục đích sử dụng
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Xem trước</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Loại: {exportTypes[exportType]}</p>
              <p>• Định dạng: {formatOptions[format].label}</p>
              {dateRange.from && <p>• Từ: {format(dateRange.from, "dd/MM/yyyy")}</p>}
              {dateRange.to && <p>• Đến: {format(dateRange.to, "dd/MM/yyyy")}</p>}
              <p>
                • Ước tính: <strong>{estimatedRecords}</strong> bản ghi
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Hủy
            </Button>
            <Button onClick={handleExport} disabled={isExporting || estimatedRecords === 0} className="flex-1">
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang xuất...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Xuất file ({estimatedRecords} bản ghi)
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
