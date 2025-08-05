import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent, cleanup, act } from '@testing-library/react';
import PCTSVDashboard from '@/pages/PCTSVDashboard';
import React from 'react';

// Mock data
vi.mock('@/lib/mongodb', () => {
  const mockRooms = [
    { _id: 'r1', Ma_phong: 'A101', So_phong: 101, Co_so: 'CS2', Suc_chua: 30, 'Dien_tich (m2)': 40, trang_thai: 'available', Co_so_vat_chat: '["Máy chiếu","Wifi"]', Mo_ta: '', Quy_dinh: '' },
    { _id: 'r2', Ma_phong: 'A102', So_phong: 102, Co_so: 'CS2', Suc_chua: 40, 'Dien_tich (m2)': 50, trang_thai: 'booked', Co_so_vat_chat: '["Máy chiếu"]', Mo_ta: '', Quy_dinh: '' },
  ];
  const mockBookings = [
    { _id: 'b1', Ma_phong: 'A101', Ten_nguoi_dung: 'Nguyen Van A', Ngay: '01/07/2024', Ca: '07:00-08:30', Ly_do: 'Họp nhóm', Email: 'a@cmc.edu.vn', Ngay_dat: '30/06/2024', trang_thai: 'pending' },
    { _id: 'b2', Ma_phong: 'A102', Ten_nguoi_dung: 'Le Thi B', Ngay: '01/07/2024', Ca: '08:40-10:10', Ly_do: 'Seminar', Email: 'b@cmc.edu.vn', Ngay_dat: '30/06/2024', trang_thai: 'confirmed' },
  ];

  return {
    roomService: {
      getAllRooms: vi.fn().mockResolvedValue(mockRooms),
      createRoom: vi.fn().mockResolvedValue({ ...mockRooms[0], _id: 'r3', Ma_phong: 'A103', So_phong: 103 }),
      updateRoom: vi.fn().mockResolvedValue(true),
      deleteRoom: vi.fn().mockResolvedValue(true),
    },
    bookingService: {
      getAllBookings: vi.fn().mockResolvedValue(mockBookings),
      updateBookingStatus: vi.fn().mockResolvedValue(true),
    },
    userService: { getAllUsers: vi.fn().mockResolvedValue([]) },
  };
});

// Mock other services
vi.mock('@/lib/auth', () => ({
  useAuth: () => ({
    user: { name: 'Boss', role: 'pctsv', id: 'u1' },
    logout: vi.fn()
  })
}));

vi.mock('@/contexts/NotificationContext', () => ({
  useNotification: () => ({
    showBoss: vi.fn(),
    showError: vi.fn(),
    showWarning: vi.fn(),
    showSuccess: vi.fn(),
  })
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: (props: any) => <a {...props} />
  };
});

// Fix the test suite
describe('PCTSVDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    global.alert = vi.fn(); // Mock window.alert
  });

  it('renders loading state initially', () => {
    render(<PCTSVDashboard />);
    expect(screen.getByText(/Đang tải dữ liệu PCTSV/i)).toBeInTheDocument();
  });

  it('renders dashboard with basic elements', async () => {
    await act(async () => {
      render(<PCTSVDashboard />);
    });
    
    // Đợi component load hoàn toàn
    await waitFor(() => {
      expect(screen.getByText(/Bảng điều khiển PCTSV/i)).toBeInTheDocument();
    }, { timeout: 8000 });
    
    // Kiểm tra các element cơ bản
    await waitFor(() => {
      expect(screen.getByText(/Tổng số phòng/i)).toBeInTheDocument();
      expect(screen.getByText(/Phòng trống/i)).toBeInTheDocument();
      expect(screen.getByText(/Đang sử dụng/i)).toBeInTheDocument();
      // Sử dụng getAllByText cho "Đặt phòng" vì có nhiều element
      const bookingElements = screen.getAllByText(/Đặt phòng/i);
      expect(bookingElements.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  });

  it('renders tabs correctly', async () => {
    await act(async () => {
      render(<PCTSVDashboard />);
    });
    
    // Đợi component load
    await waitFor(() => {
      expect(screen.getByText(/Bảng điều khiển PCTSV/i)).toBeInTheDocument();
    }, { timeout: 8000 });
    
    // Kiểm tra có các tab cơ bản
    await waitFor(() => {
      // Kiểm tra có text "Quản lý phòng học" (có thể có nhiều chỗ)
      const roomManagementElements = screen.getAllByText(/Quản lý phòng học/i);
      expect(roomManagementElements.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  });

  it('can render add room button', async () => {
    await act(async () => {
      render(<PCTSVDashboard />);
    });
    
    // Đợi component load
    await waitFor(() => {
      expect(screen.getByText(/Bảng điều khiển PCTSV/i)).toBeInTheDocument();
    }, { timeout: 8000 });
    
    // Kiểm tra có button "Thêm phòng"
    await waitFor(() => {
      const addRoomButtons = screen.getAllByText(/Thêm phòng/i);
      expect(addRoomButtons.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
  });

  it('can render approve booking tab', async () => {
    await act(async () => {
      render(<PCTSVDashboard />);
    });
    
    // Đợi component load
    await waitFor(() => {
      expect(screen.getByText(/Bảng điều khiển PCTSV/i)).toBeInTheDocument();
    }, { timeout: 8000 });
    
    // Kiểm tra có tab "Duyệt đặt phòng"
    await waitFor(() => {
      const approveTab = screen.getByText(/Duyệt đặt phòng/i);
      expect(approveTab).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
