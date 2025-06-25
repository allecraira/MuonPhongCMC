import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth";
import {
  Eye,
  EyeOff,
  Loader2,
  Building2,
  Users,
  Clock,
  TrendingUp,
  Lock,
  Mail,
  ArrowLeft,
  Shield,
  Sparkles,
} from "lucide-react";

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

  // Demo accounts for auto-fill
  const demoAccounts = [
    {
      label: "Sinh viên",
      sublabel: "BIT230372",
      code: "123456",
      email: "BIT230372@st.cmc.edu.vn",
      password: "123456",
      icon: "👨‍🎓",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "CTSV",
      sublabel: "PCTSV001",
      code: "123456",
      email: "pctsv@cmc.edu.vn",
      password: "123456",
      icon: "🏛️",
      gradient: "from-green-500 to-green-600",
    },
    {
      label: "Giảng viên",
      sublabel: "Teacher",
      code: "123456",
      email: "teacher1@st.cmc.edu.vn",
      password: "123456",
      icon: "👨‍🏫",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      label: "Admin",
      sublabel: "System",
      code: "123456",
      email: "admin@cmc.edu.vn",
      password: "123456",
      icon: "⚙️",
      gradient: "from-red-500 to-red-600",
    },
    {
      label: "security",
      sublabel: "System",
      code: "123456",
      email: "security@cmc.edu.vn",
      password: "123456",
      icon: "👻",
      gradient: "from-yellow-400 to-yellow-500",
    },
  ];

  const fillDemoAccount = (account: (typeof demoAccounts)[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Enhanced Banner */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
          {/* Dynamic Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 transform -rotate-12 scale-110">
                <div className="grid grid-cols-6 gap-8 h-full pt-20">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="text-white text-6xl font-bold opacity-30 animate-pulse"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: "3s",
                      }}
                    >
                      CMC
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            {/* Enhanced Logo and Title */}
            <div className="flex items-center space-x-4 mb-12">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">CMC University</h1>
                <p className="text-blue-100 text-lg">
                  Hệ thống đặt phòng thông minh
                </p>
              </div>
            </div>

            {/* Enhanced Welcome Message */}
            <div className="mb-16">
              <h2 className="text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Chào mừng đến với hệ thống đặt phòng CMC
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                Trải nghiệm đặt phòng học hiện đại, thông minh và tiện lợi. Quản
                lý lịch học một cách dễ dàng với công nghệ tiên tiến.
              </p>
            </div>

            {/* Enhanced Statistics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <Building2 className="h-8 w-8 text-blue-200" />
                  <span className="text-blue-200 text-lg font-medium">
                    Phòng học
                  </span>
                </div>
                <div className="text-4xl font-bold">50+</div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="h-8 w-8 text-blue-200" />
                  <span className="text-blue-200 text-lg font-medium">
                    Hỗ trợ
                  </span>
                </div>
                <div className="text-4xl font-bold">24/7</div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-8 w-8 text-blue-200" />
                  <span className="text-blue-200 text-lg font-medium">
                    Người dùng
                  </span>
                </div>
                <div className="text-4xl font-bold">1000+</div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <TrendingUp className="h-8 w-8 text-blue-200" />
                  <span className="text-blue-200 text-lg font-medium">
                    Uptime
                  </span>
                </div>
                <div className="text-4xl font-bold">99%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay về trang chủ
            </Link>

            {/* Enhanced Form Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Đăng nhập hệ thống
              </h2>
              <p className="text-gray-600">
                Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.
              </p>
            </div>

            {/* Enhanced Login Form */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-6 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="rounded-xl">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email đăng nhập
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@st.cmc.edu.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu của bạn"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 pl-12 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-3 hover:bg-gray-100 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Đăng nhập ngay
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Enhanced Demo Accounts */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tài khoản demo
                </h3>
                <p className="text-sm text-gray-600">
                  Click vào thẻ để tự động điền thông tin đăng nhập
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    className={`bg-gradient-to-r ${account.gradient} text-white rounded-2xl p-4 text-left hover:shadow-lg transition-all duration-200 transform hover:scale-105 group`}
                    onClick={() => fillDemoAccount(account)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{account.icon}</span>
                      <div className="w-2 h-2 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="font-semibold text-sm mb-1">
                      {account.label}
                    </div>
                    <div className="text-xs opacity-90 mb-1">
                      {account.sublabel}
                    </div>
                    <div className="text-xs opacity-75">
                      Pass: {account.code}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        `}
      </style>
    </div>
  );
};

export default Login;
