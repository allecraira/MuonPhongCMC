import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import React from 'react';

vi.mock('@/lib/mongodb', () => {
  const mockBookings = [
    {
      _id: 'b1',
      Ma_phong: 'A101',
      Ngay: new Date().toISOString().split('T')[0],
      Email: 'a@cmc.edu.vn',
      Ma_nguoi_dung: 'u1',
      Ten_nguoi_dung: 'Nguyen Van A',
      Ly_do: 'Họp nhóm',
      Ca: '07:00-08:30',
      Ngay_dat: new Date().toISOString().split('T')[0],
      trang_thai: 'confirmed',
    },
    {
      _id: 'b2',
      Ma_phong: 'A102',
      Ngay: new Date().toISOString().split('T')[0],
      Email: 'b@cmc.edu.vn',
      Ma_nguoi_dung: 'u2',
      Ten_nguoi_dung: 'Le Thi B',
      Ly_do: 'Seminar',
      Ca: '08:40-10:10',
      Ngay_dat: new Date().toISOString().split('T')[0],
      trang_thai: 'pending',
    },
    {
      _id: 'b3',
      Ma_phong: 'A101',
      Ngay: new Date().toISOString().split('T')[0],
      Email: 'c@cmc.edu.vn',
      Ma_nguoi_dung: 'u3',
      Ten_nguoi_dung: 'Tran Van C',
      Ly_do: 'Học nhóm',
      Ca: '10:15-11:45',
      Ngay_dat: new Date().toISOString().split('T')[0],
      trang_thai: 'cancelled',
    },
  ];

  return {
    bookingService: {
      getAllBookings: vi.fn().mockResolvedValue(mockBookings),
    },
  };
});

describe('WeeklyCalendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders loading state initially', () => {
    render(<WeeklyCalendar />);
    expect(screen.getByText(/Đang tải lịch tuần/i)).toBeInTheDocument();
  });

  it('renders weekly calendar with bookings', async () => {
    render(<WeeklyCalendar />);
    await waitFor(() => {
      expect(screen.getByText(/Lịch tổng tuần/i)).toBeInTheDocument();
      expect(screen.getByText(/Tổng cộng: 3 đặt phòng/i)).toBeInTheDocument();
      expect(screen.getByText(/Phòng đã đặt: 2 phòng/i)).toBeInTheDocument();
      expect(screen.getByText(/Đã xác nhận: 1/)).toBeInTheDocument();
      expect(screen.getByText(/Chờ xác nhận: 1/)).toBeInTheDocument();
      expect(screen.getByText(/Đã hủy: 1/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('can navigate to previous and next week', async () => {
    render(<WeeklyCalendar />);
    await waitFor(() => screen.getByText(/Lịch tổng tuần/i), { timeout: 3000 });
    fireEvent.click(screen.getByText(/Tuần trước/i));
    fireEvent.click(screen.getByText(/Tuần sau/i));
    // Sử dụng getAllByText cho "Hôm nay" vì có nhiều element
    const todayButtons = screen.getAllByText(/Hôm nay/i);
    fireEvent.click(todayButtons[0]); // Click button đầu tiên
    // Không có lỗi là pass
  });
});