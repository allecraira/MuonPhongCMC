import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      console.log("📝 Login form submitting:", { email, password });
      const success = await login(email, password);
      if (success) {
        console.log("🎉 Login form - success, navigating to:", from);
        navigate(from, { replace: true });
      } else {
        console.log("❌ Login form - failed");
        setError(
          "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại thông tin đăng nhập.",
        );
      }
    } catch (err) {
      console.error("🚨 Login form error:", err);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cmcBlue-50 to-cmc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img
              src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
              alt="CMC Room Booking"
              className="h-12 w-12"
            />
            <div className="text-left">
              <div className="text-xl font-bold text-cmc-600">
                CMC Room Booking
              </div>
              <div className="text-sm text-gray-500">Trường Đại học CMC</div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Đăng nhập</h1>
          <p className="text-gray-600 mt-2">Đăng nhập vào hệ thống đặt phòng</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin đăng nhập</CardTitle>
            <CardDescription>
              Nhập email và mật khẩu của bạn để tiếp tục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@st.cmc.edu.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-cmcBlue-600 hover:bg-cmcBlue-700"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Đăng nhập
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Tài khoản demo</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div className="space-y-1">
              <div>
                <strong>Sinh viên:</strong> BIT230372@st.cmc.edu.vn / 123456
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 text-xs py-1 h-6"
                  onClick={() => {
                    setEmail("BIT230372@st.cmc.edu.vn");
                    setPassword("123456");
                  }}
                >
                  Tự động điền
                </Button>
              </div>
              <div>
                <strong>Giảng viên:</strong> teacher1@st.cmc.edu.vn / 123456
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 text-xs py-1 h-6"
                  onClick={() => {
                    setEmail("teacher1@st.cmc.edu.vn");
                    setPassword("123456");
                  }}
                >
                  Tự động điền
                </Button>
              </div>
              <div>
                <strong>Admin:</strong> admin@cmc.edu.vn / 123456
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 text-xs py-1 h-6"
                  onClick={() => {
                    setEmail("admin@cmc.edu.vn");
                    setPassword("123456");
                  }}
                >
                  Tự động điền
                </Button>
              </div>
              <div>
                <strong>PCTSV:</strong> pctsv@cmc.edu.vn / 123456
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 text-xs py-1 h-6"
                  onClick={() => {
                    setEmail("pctsv@cmc.edu.vn");
                    setPassword("123456");
                  }}
                >
                  Tự động điền
                </Button>
              </div>
              <div>
                <strong>Bảo vệ:</strong> security@cmc.edu.vn / 123456
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 text-xs py-1 h-6"
                  onClick={() => {
                    setEmail("security@cmc.edu.vn");
                    setPassword("123456");
                  }}
                >
                  Tự động điền
                </Button>
              </div>
            </div>

            {/* Debug Section */}
            <div className="border-t pt-2 mt-2">
              <div className="text-xs text-gray-500 mb-1">Debug Tools:</div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs py-1 h-6 w-full"
                onClick={() => {
                  // @ts-ignore
                  if (window.debugCMC) {
                    // @ts-ignore
                    window.debugCMC.checkConnection();
                  } else {
                    console.log("Debug tools not available yet");
                  }
                }}
              >
                Check Connection & Users
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-cmc-600 hover:text-cmc-700 transition-colors"
          >
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
