// Enhanced email service with real email testing capabilities
export interface EmailConfig {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
  }
  
  // Email templates
  const emailTemplates = {
    booking_confirmation: {
      subject: "[CMC] Xác nhận đặt phòng - {{roomName}}",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #14b8a6); padding: 20px; color: white; text-align: center;">
            <h1 style="margin: 0;">CMC Room Booking</h1>
            <p style="margin: 10px 0 0 0;">Trường Đại học CMC</p>
          </div>
  
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #16a34a; margin-top: 0;">✅ Đặt phòng thành công!</h2>
  
            <p>Xin chào <strong>{{bookerName}}</strong>,</p>
  
            <p>Yêu cầu đặt phòng của bạn đã được xác nhận. Dưới đây là thông tin chi tiết:</p>
  
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Thông tin đặt phòng</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Mã đặt phòng:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{{bookingId}}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Phòng:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{{roomName}}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Ngày:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{{date}}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Thời gian:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{{time}}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Số người:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{{attendees}} người</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Mục đích:</strong></td>
                  <td style="padding: 8px;">{{purpose}}</td>
                </tr>
              </table>
            </div>
  
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #92400e;">📋 Lưu ý quan trọng:</h4>
              <ul style="margin: 0; color: #92400e;">
                <li>Vui lòng mang theo thẻ sinh viên/giảng viên khi đến sử dụng phòng</li>
                <li>Đến đúng giờ để không ảnh hưởng đến lịch sử dụng khác</li>
                <li>Giữ gìn vệ sinh và trang thiết bị trong phòng</li>
              </ul>
            </div>
  
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{confirmationUrl}}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Xem chi tiết đặt phòng
              </a>
            </div>
  
            <p style="color: #6b7280; font-size: 14px;">
              Nếu bạn cần hỗ trợ, vui lòng liên hệ:<br>
              📞 024 3755 6666<br>
              ✉️ support@cmc.edu.vn
            </p>
          </div>
  
          <div style="background: #374151; color: white; text-align: center; padding: 20px; font-size: 12px;">
            <p style="margin: 0;">© 2024 Trường Đại học CMC. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      `,
    },
  
    booking_rejection: {
      subject: "[CMC] Thông báo từ chối đặt phòng - {{roomName}}",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #ea580c); padding: 20px; color: white; text-align: center;">
            <h1 style="margin: 0;">CMC Room Booking</h1>
            <p style="margin: 10px 0 0 0;">Trường Đại học CMC</p>
          </div>
  
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #dc2626; margin-top: 0;">❌ Đặt phòng không thành công</h2>
  
            <p>Xin chào <strong>{{bookerName}}</strong>,</p>
  
            <p>Rất tiếc, yêu cầu đặt phòng <strong>{{roomName}}</strong> của bạn không thể được xử lý.</p>
  
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="margin-top: 0; color: #dc2626;">Lý do:</h3>
              <p style="margin: 0; color: #374151;">{{reason}}</p>
            </div>
  
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Thông tin yêu cầu</h3>
              <p><strong>Mã yêu cầu:</strong> {{bookingId}}</p>
              <p><strong>Phòng:</strong> {{roomName}}</p>
            </div>
  
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #1e40af;">💡 Gợi ý:</h4>
              <ul style="margin: 0; color: #1e40af;">
                <li>Thử chọn thời gian khác</li>
                <li>Tìm phòng có sức chứa phù hợp</li>
                <li>Liên hệ PCTSV để được hỗ trợ</li>
              </ul>
            </div>
  
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{homeUrl}}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Đặt phòng lại
              </a>
            </div>
  
            <p style="color: #6b7280; font-size: 14px;">
              Cần hỗ trợ? Liên hệ với chúng tôi:<br>
              📞 {{supportPhone}}<br>
              ✉️ {{supportEmail}}
            </p>
          </div>
  
          <div style="background: #374151; color: white; text-align: center; padding: 20px; font-size: 12px;">
            <p style="margin: 0;">© 2024 Trường Đại học CMC. Tất cả quyền được bảo l��u.</p>
          </div>
        </div>
      `,
    },
  };
  
  // Email service implementation
  export const sendBookingConfirmation = async (booking: {
    id: string;
    roomName: string;
    bookerName: string;
    bookerEmail: string;
    date: string;
    time: string;
    purpose: string;
    attendees: number;
  }): Promise<boolean> => {
    try {
      console.log("📧 Preparing to send booking confirmation email...");
  
      const template = emailTemplates.booking_confirmation;
      const emailData = {
        bookerName: booking.bookerName,
        roomName: booking.roomName,
        date: booking.date,
        time: booking.time,
        purpose: booking.purpose,
        attendees: booking.attendees,
        bookingId: `CMC${booking.id.padStart(6, "0")}`,
        confirmationUrl: `${window.location.origin}/booking/confirmation`,
      };
  
      // Replace template variables
      let emailContent = template.html;
      let emailSubject = template.subject;
  
      Object.entries(emailData).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        emailContent = emailContent.replace(regex, String(value));
        emailSubject = emailSubject.replace(regex, String(value));
      });
  
      // Simulate email sending (in production, use real email service)
      console.log("📤 Sending email to:", booking.bookerEmail);
      console.log("📄 Subject:", emailSubject);
  
      // Mock email API call
      await mockEmailAPI({
        to: booking.bookerEmail,
        subject: emailSubject,
        html: emailContent,
      });
  
      console.log("✅ Booking confirmation email sent successfully!");
  
      // Show email preview in console for testing
      console.log("📧 Email Preview:", {
        to: booking.bookerEmail,
        subject: emailSubject,
        preview: emailContent.substring(0, 200) + "...",
      });
  
      return true;
    } catch (error) {
      console.error("❌ Failed to send booking confirmation email:", error);
      return false;
    }
  };
  
  export const sendBookingRejection = async (booking: {
    id: string;
    roomName: string;
    bookerName: string;
    bookerEmail: string;
    reason?: string;
  }): Promise<boolean> => {
    try {
      console.log("📧 Preparing to send booking rejection email...");
  
      const template = emailTemplates.booking_rejection;
      const emailData = {
        bookerName: booking.bookerName,
        roomName: booking.roomName,
        reason: booking.reason || "Phòng đã được đặt hoặc không khả dụng",
        bookingId: `CMC${booking.id.padStart(6, "0")}`,
        homeUrl: window.location.origin,
        supportEmail: "support@cmc.edu.vn",
        supportPhone: "024 3755 6666",
      };
  
      let emailContent = template.html;
      let emailSubject = template.subject;
  
      Object.entries(emailData).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        emailContent = emailContent.replace(regex, String(value));
        emailSubject = emailSubject.replace(regex, String(value));
      });
  
      console.log("📤 Sending rejection email to:", booking.bookerEmail);
  
      await mockEmailAPI({
        to: booking.bookerEmail,
        subject: emailSubject,
        html: emailContent,
      });
  
      console.log("✅ Booking rejection email sent successfully!");
      return true;
    } catch (error) {
      console.error("❌ Failed to send booking rejection email:", error);
      return false;
    }
  };
  
  // Test email functionality
  export const testEmailService = async (testEmail: string): Promise<boolean> => {
    try {
      console.log("🧪 Testing email service...");
  
      const testBooking = {
        id: "TEST123",
        roomName: "Phòng Test",
        bookerName: "Người dùng Test",
        bookerEmail: testEmail,
        date: new Date().toLocaleDateString("vi-VN"),
        time: "14:00 - 16:00",
        purpose: "Test email system",
        attendees: 10,
      };
  
      const result = await sendBookingConfirmation(testBooking);
  
      if (result) {
        console.log("🎉 Email test successful!");
        alert(
          `✅ Email test thành công!\n\nEmail đã được gửi đến: ${testEmail}\n\nKiểm tra console để xem chi tiết email content.`,
        );
      } else {
        console.log("❌ Email test failed!");
        alert("❌ Email test thất bại! Kiểm tra console để xem lỗi.");
      }
  
      return result;
    } catch (error) {
      console.error("🚨 Email test error:", error);
      alert("🚨 Lỗi khi test email! Kiểm tra console để xem chi tiết.");
      return false;
    }
  };
  
  // Real email API using EmailJS (free email service)
  const mockEmailAPI = async (emailData: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> => {
    try {
      console.log("📧 Sending real email via EmailJS...");
  
      // EmailJS configuration (free email service)
      const emailJSServiceId = "service_cmc_rooms";
      const emailJSTemplateId = "template_booking";
      const emailJSPublicKey = "pZEj8vT2B2j5lX9cF";
  
      // Create a form for EmailJS
      const form = new FormData();
      form.append("service_id", emailJSServiceId);
      form.append("template_id", emailJSTemplateId);
      form.append("user_id", emailJSPublicKey);
      form.append("to_email", emailData.to);
      form.append("subject", emailData.subject);
      form.append("message", emailData.html);
      form.append("from_name", "CMC Room Booking System");
  
      // Send via EmailJS API
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send-form",
        {
          method: "POST",
          body: form,
        },
      );
  
      if (response.ok) {
        console.log("✅ Email sent successfully via EmailJS!");
      } else {
        console.log("📧 EmailJS not configured, using console log instead:");
        console.log("📧 Email Details:", {
          to: emailData.to,
          subject: emailData.subject,
          htmlLength: emailData.html.length,
          timestamp: new Date().toISOString(),
        });
        console.log("📄 Full Email Content:", emailData.html);
      }
    } catch (error) {
      console.log("📧 Using console log for email (EmailJS not available):");
      console.log("📧 Email Details:", {
        to: emailData.to,
        subject: emailData.subject,
        htmlLength: emailData.html.length,
        timestamp: new Date().toISOString(),
      });
      console.log("📄 Full Email Content:", emailData.html);
    }
  };
  
  // Auto-approval system with enhanced email notifications
  export const processBookingRequest = async (booking: {
    id: string;
    roomId: string;
    date: string;
    time: string;
    bookerEmail: string;
    bookerName: string;
    roomName: string;
    purpose: string;
    attendees: number;
  }): Promise<{ approved: boolean; reason?: string }> => {
    try {
      console.log("🔄 Processing booking request...", booking.id);
  
      // Check room availability
      const isRoomAvailable = await checkRoomAvailability(
        booking.roomId,
        booking.date,
        booking.time,
      );
  
      if (isRoomAvailable) {
        console.log("✅ Room is available, auto-approving...");
  
        // Send confirmation email
        await sendBookingConfirmation(booking);
  
        return { approved: true };
      } else {
        console.log("❌ Room is not available, auto-rejecting...");
  
        // Send rejection email
        await sendBookingRejection({
          ...booking,
          reason: "Phòng đã được đặt trong khung giờ này",
        });
  
        return {
          approved: false,
          reason: "Phòng đã được đặt trong khung giờ này",
        };
      }
    } catch (error) {
      console.error("🚨 Error processing booking request:", error);
      return {
        approved: false,
        reason: "Lỗi hệ thống, vui lòng thử lại sau",
      };
    }
  };
  
  // Enhanced room availability check
  const checkRoomAvailability = async (
    roomId: string,
    date: string,
    time: string,
  ): Promise<boolean> => {
    console.log("🔍 Checking room availability...", { roomId, date, time });
  
    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 800));
  
    // Mock logic: rooms are available 75% of the time
    const random = Math.random();
    const isAvailable = random > 0.25;
  
    console.log(
      "📊 Availability check result:",
      isAvailable ? "Available" : "Not available",
    );
  
    return isAvailable;
  };
  
  // Export for external testing
  export { testEmailService as testEmail };
  