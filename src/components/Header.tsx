import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import UserAvatar from "./UserAvatar";

interface HeaderProps {
  variant?: "default" | "minimal";
}

const Header = ({ variant = "default" }: HeaderProps) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                alt="CMC Room Booking"
                className="h-8 w-8"
              />
              <div className="text-left">
                <div className="text-lg font-bold text-cmc-600">
                  Đại học AI
                </div>
                <div className="text-xs text-gray-500">Trường Đại học AI</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          {variant === "default" && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-cmc-600 font-medium"
                    : "text-gray-600 hover:text-cmc-600"
                }`}
              >
                Trang chủ
              </Link>
              <Link
                to="/rooms"
                className={`transition-colors ${
                  isActive("/rooms")
                    ? "text-cmc-600 font-medium"
                    : "text-gray-600 hover:text-cmc-600"
                }`}
              >
                Danh sách phòng
              </Link>
              {user && (
                <Link
                  to="/weekly-calendar"
                  className={`transition-colors ${
                    isActive("/weekly-calendar")
                      ? "text-cmc-600 font-medium"
                      : "text-gray-600 hover:text-cmc-600"
                  }`}
                >
                  Lịch tổng
                </Link>
              )}
              <Link
                to="/about"
                className={`transition-colors ${
                  isActive("/about")
                    ? "text-cmc-600 font-medium"
                    : "text-gray-600 hover:text-cmc-600"
                }`}
              >
                Giới thiệu
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${
                  isActive("/contact")
                    ? "text-cmc-600 font-medium"
                    : "text-gray-600 hover:text-cmc-600"
                }`}
              >
                Liên hệ
              </Link>
            </nav>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <UserAvatar />
            ) : (
              <Link to="/login">
                <Button className="bg-cmcBlue-600 hover:bg-cmcBlue-700">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
