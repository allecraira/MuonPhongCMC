import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { testEmailService } from "@/lib/emailService";
import { Mail, Send, Loader2 } from "lucide-react";

const EmailTestDialog = () => {
  const [testEmail, setTestEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTestEmail = async () => {
    if (!testEmail) {
      alert("Vui lòng nhập email để test!");
      return;
    }

    if (!testEmail.includes("@")) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await testEmailService(testEmail);
      if (result) {
        setIsOpen(false);
        setTestEmail("");
      }
    } catch (error) {
      console.error("Email test error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          Test Email
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Test Email Service
          </DialogTitle>
          <DialogDescription>
            Gửi email test để kiểm tra tính năng thông báo của hệ thống
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-email">Email nhận</Label>
            <Input
              id="test-email"
              type="email"
              placeholder="your-email@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            <p className="font-medium mb-1">📧 Email test sẽ bao gồm:</p>
            <ul className="text-xs space-y-1">
              <li>• Template email đặt phòng thành công</li>
              <li>• Thông tin mẫu về phòng và lịch đặt</li>
              <li>• HTML format với logo CMC</li>
              <li>• Kiểm tra console để xem email content</li>
            </ul>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              onClick={handleTestEmail}
              disabled={isLoading || !testEmail}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Gửi Test
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTestDialog;
