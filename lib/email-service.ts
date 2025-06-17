// Email service for sending notifications
export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

export class EmailService {
  private static instance: EmailService
  private apiKey: string = process.env.RESEND_API_KEY || "demo-key"

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendBookingConfirmation(booking: any): Promise<boolean> {
    const template = this.generateBookingConfirmationTemplate(booking)
    return this.sendEmail(template)
  }

  async sendBookingApproval(booking: any): Promise<boolean> {
    const template = this.generateBookingApprovalTemplate(booking)
    return this.sendEmail(template)
  }

  async sendBookingRejection(booking: any, reason?: string): Promise<boolean> {
    const template = this.generateBookingRejectionTemplate(booking, reason)
    return this.sendEmail(template)
  }

  async sendRoomChangeNotification(booking: any, oldRoom: any, newRoom: any, reason: string): Promise<boolean> {
    const template = this.generateRoomChangeTemplate(booking, oldRoom, newRoom, reason)
    return this.sendEmail(template)
  }

  async sendBookingReminder(booking: any): Promise<boolean> {
    const template = this.generateBookingReminderTemplate(booking)
    return this.sendEmail(template)
  }

  private async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      // In production, this would use a real email service like Resend, SendGrid, etc.
      console.log("Sending email:", template)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll just log the email
      console.log(`Email sent to ${template.to}: ${template.subject}`)

      return true
    } catch (error) {
      console.error("Failed to send email:", error)
      return false
    }
  }

  private generateBookingConfirmationTemplate(booking: any): EmailTemplate {
    const bookingId = `CMC${Date.now().toString().slice(-6)}`

    return {
      to: booking.email,
      subject: `[CMC] Xác nhận đặt phòng - ${booking.room.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1>Xác nhận đặt phòng</h1>
            <p>Trường Đại học CMC</p>
          </div>
          
          <div style="padding: 20px;">
            <p>Xin chào <strong>${booking.studentName}</strong>,</p>
            
            <p>Yêu cầu đặt phòng của bạn đã được ghi nhận thành công. Dưới đây là thông tin chi tiết:</p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1f2937;">Thông tin đặt phòng</h3>
              <p><strong>Mã đặt phòng:</strong> ${bookingId}</p>
              <p><strong>Phòng:</strong> ${booking.room.name}</p>
              <p><strong>Vị trí:</strong> ${booking.room.location}</p>
              <p><strong>Ngày:</strong> ${booking.date}</p>
              <p><strong>Thời gian:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Số người tham gia:</strong> ${booking.attendees}</p>
              <p><strong>Mục đích:</strong> ${booking.purpose}</p>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #92400e;">Lưu ý quan trọng:</h4>
              <ul style="color: #92400e; margin: 0;">
                <li>Vui lòng mang theo thẻ sinh viên khi đến sử dụng phòng</li>
                <li>Có mặt đúng giờ để không ảnh hưởng đến lịch khác</li>
                <li>Giữ gìn vệ sinh và tài sản trong phòng</li>
                <li>Liên hệ bảo vệ nếu cần hỗ trợ: 024-3755-6666</li>
              </ul>
            </div>
            
            <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ:</p>
            <p>📧 Email: support@cmc.edu.vn<br>
            📞 Điện thoại: 024-3755-6666</p>
            
            <p>Trân trọng,<br>
            <strong>Phòng Công tác Sinh viên<br>
            Trường Đại học CMC</strong></p>
          </div>
          
          <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>Email này được gửi tự động từ hệ thống đặt phòng CMC. Vui lòng không trả lời email này.</p>
          </div>
        </div>
      `,
      text: `
        Xác nhận đặt phòng - CMC
        
        Xin chào ${booking.studentName},
        
        Yêu cầu đặt phòng của bạn đã được ghi nhận:
        - Mã đặt phòng: ${bookingId}
        - Phòng: ${booking.room.name}
        - Vị trí: ${booking.room.location}
        - Ngày: ${booking.date}
        - Thời gian: ${booking.startTime} - ${booking.endTime}
        - Số người: ${booking.attendees}
        
        Vui lòng mang thẻ sinh viên khi đến sử dụng phòng.
        
        Liên hệ: support@cmc.edu.vn | 024-3755-6666
      `,
    }
  }

  private generateBookingApprovalTemplate(booking: any): EmailTemplate {
    return {
      to: booking.email,
      subject: `[CMC] Đặt phòng đã được phê duyệt - ${booking.room.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #059669; color: white; padding: 20px; text-align: center;">
            <h1>✅ Đặt phòng đã được phê duyệt</h1>
            <p>Trường Đại học CMC</p>
          </div>
          
          <div style="padding: 20px;">
            <p>Xin chào <strong>${booking.studentName}</strong>,</p>
            
            <p>Chúng tôi vui mừng thông báo rằng yêu cầu đặt phòng của bạn đã được <strong>PHÊ DUYỆT</strong>.</p>
            
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h3 style="margin-top: 0; color: #065f46;">Thông tin đặt phòng</h3>
              <p><strong>Phòng:</strong> ${booking.room.name}</p>
              <p><strong>Vị trí:</strong> ${booking.room.location}</p>
              <p><strong>Ngày:</strong> ${booking.date}</p>
              <p><strong>Thời gian:</strong> ${booking.startTime} - ${booking.endTime}</p>
            </div>
            
            <p>Bạn có thể sử dụng phòng theo đúng thời gian đã đăng ký. Vui lòng đến đúng giờ và mang theo thẻ sinh viên.</p>
            
            <p>Chúc bạn có buổi học/làm việc hiệu quả!</p>
            
            <p>Trân trọng,<br>
            <strong>Phòng Công tác Sinh viên</strong></p>
          </div>
        </div>
      `,
    }
  }

  private generateBookingRejectionTemplate(booking: any, reason?: string): EmailTemplate {
    return {
      to: booking.email,
      subject: `[CMC] Đặt phòng không được phê duyệt - ${booking.room.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
            <h1>❌ Đặt phòng không được phê duyệt</h1>
            <p>Trường Đại học CMC</p>
          </div>
          
          <div style="padding: 20px;">
            <p>Xin chào <strong>${booking.studentName}</strong>,</p>
            
            <p>Rất tiếc, yêu cầu đặt phòng của bạn không được phê duyệt.</p>
            
            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="margin-top: 0; color: #991b1b;">Thông tin đặt phòng</h3>
              <p><strong>Phòng:</strong> ${booking.room.name}</p>
              <p><strong>Ngày:</strong> ${booking.date}</p>
              <p><strong>Thời gian:</strong> ${booking.startTime} - ${booking.endTime}</p>
              ${reason ? `<p><strong>Lý do:</strong> ${reason}</p>` : ""}
            </div>
            
            <p>Bạn có thể đặt phòng khác hoặc chọn thời gian khác. Nếu có thắc mắc, vui lòng liên hệ CTSV.</p>
            
            <p>Trân trọng,<br>
            <strong>Phòng Công tác Sinh viên</strong></p>
          </div>
        </div>
      `,
    }
  }

  private generateRoomChangeTemplate(booking: any, oldRoom: any, newRoom: any, reason: string): EmailTemplate {
    return {
      to: booking.email,
      subject: `[CMC] Thông báo đổi phòng - ${booking.date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f59e0b; color: white; padding: 20px; text-align: center;">
            <h1>🔄 Thông báo đổi phòng</h1>
            <p>Trường Đại học CMC</p>
          </div>
          
          <div style="padding: 20px;">
            <p>Xin chào <strong>${booking.studentName}</strong>,</p>
            
            <p>Chúng tôi xin thông báo về việc thay đổi phòng cho lịch đặt của bạn:</p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #92400e;">Thông tin thay đổi</h3>
              <p><strong>Ngày:</strong> ${booking.date}</p>
              <p><strong>Thời gian:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Phòng cũ:</strong> ${oldRoom.name} (${oldRoom.location})</p>
              <p><strong>Phòng mới:</strong> ${newRoom.name} (${newRoom.location})</p>
              <p><strong>Lý do đổi:</strong> ${reason}</p>
            </div>
            
            <p><strong>Lưu ý:</strong> Vui lòng đến đúng phòng mới theo thông tin trên. Thời gian không thay đổi.</p>
            
            <p>Xin lỗi vì sự bất tiện này. Nếu có thắc mắc, vui lòng liên hệ CTSV.</p>
            
            <p>Trân trọng,<br>
            <strong>Phòng Công tác Sinh viên</strong></p>
          </div>
        </div>
      `,
    }
  }

  private generateBookingReminderTemplate(booking: any): EmailTemplate {
    return {
      to: booking.email,
      subject: `[CMC] Nhắc nhở: Bạn có lịch đặt phòng sắp tới`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #3b82f6; color: white; padding: 20px; text-align: center;">
            <h1>🔔 Nhắc nhở đặt phòng</h1>
            <p>Trường Đại học CMC</p>
          </div>
          
          <div style="padding: 20px;">
            <p>Xin chào <strong>${booking.studentName}</strong>,</p>
            
            <p>Đây là lời nhắc về lịch đặt phòng sắp tới của bạn:</p>
            
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">Thông tin đặt phòng</h3>
              <p><strong>Phòng:</strong> ${booking.room.name}</p>
              <p><strong>Vị trí:</strong> ${booking.room.location}</p>
              <p><strong>Thời gian:</strong> ${booking.startTime} - ${booking.endTime}</p>
              <p><strong>Ngày:</strong> ${booking.date}</p>
            </div>
            
            <p>Vui lòng chuẩn bị và có mặt đúng giờ. Nhớ mang theo thẻ sinh viên!</p>
            
            <p>Chúc bạn có buổi học/làm việc hiệu quả!</p>
          </div>
        </div>
      `,
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance()
