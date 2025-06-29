import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import WeeklyCalendar from "@/components/WeeklyCalendar";

const WeeklyCalendarPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/assets/60e774fd1c3a405983c80f4cf952afe6/chatgpt_image_jun_17__2025__03_55_26_pm-removebg-preview-a4ecb1?format=webp&width=800"
                  alt="CMC Room Booking"
                  className="h-8 w-8"
                />
                <div className="text-left">
                  <div className="text-lg font-bold text-cmc-600">
                    CMC Room Booking
                  </div>
                  <div className="text-xs text-gray-500">
                    Trường Đại học CMC
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/rooms"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Danh sách phòng
              </Link>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-cmc-600 transition-colors"
              >
                Thông tin tài khoản
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay về trang chủ
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lịch tổng đặt phòng
          </h1>
          <p className="text-gray-600">
            Xem tất cả các đặt phòng trong tuần hiện tại
          </p>
        </div>

        <WeeklyCalendar />
      </div>
    </div>
  );
};

export default WeeklyCalendarPage; 