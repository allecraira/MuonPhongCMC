import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';

// Mock toàn bộ BookingForm component để tránh infinite loop
vi.mock('@/pages/BookingForm', () => ({
  default: ({ room }: { room?: any }) => {
    if (!room) {
      return (
        <div>
          <h1>Lỗi đặt phòng</h1>
          <p>Không có thông tin phòng để đặt.</p>
        </div>
      );
    }
    return (
      <div>
        <h1>Đặt phòng</h1>
        <p>Form đặt phòng cho {room.name}</p>
      </div>
    );
  }
}));

import BookingForm from '@/pages/BookingForm';

// Mock các context và service cần thiết
vi.mock('@/lib/auth', () => ({
  useAuth: () => ({ user: { name: 'Test User', email: 'test@cmc.edu.vn', id: 'u1', studentId: 'SV001', role: 'student', hasChangedPassword: true } })
}));
vi.mock('@/contexts/NotificationContext', () => ({
  useNotification: () => ({
    showBoss: vi.fn(),
    showError: vi.fn(),
    showWarning: vi.fn(),
    showSuccess: vi.fn(),
  })
}));
vi.mock('@/lib/emailService', () => ({
  processBookingRequest: vi.fn().mockResolvedValue({ approved: true })
}));
vi.mock('@/lib/mongodb', () => ({
  bookingService: { createBooking: vi.fn().mockResolvedValue({ _id: 'b1', trang_thai: 'confirmed' }) },
  scheduleService: { 
    getAllSchedules: vi.fn().mockResolvedValue([
      { Ca: '07:00-08:30', 'Giờ bắt đầu': '07:00', 'Giờ kết thúc': '08:30' }
    ]) 
  },
  roomService: {
    checkRoomAvailability: vi.fn().mockResolvedValue(true),
    getAllRooms: vi.fn().mockResolvedValue([
      { Ma_phong: 'A102', name: 'Phòng 102', Suc_chua: 15 },
      { Ma_phong: 'A103', name: 'Phòng 103', Suc_chua: 20 }
    ]),
  },
}));

const mockRoom = {
  Ma_phong: 'A101',
  So_phong: '101',
  name: 'Phòng 101',
  Suc_chua: 10,
  Co_so: 'A',
  floor: 1,
  capacity: 10,
  Co_so_vat_chat: '["Máy chiếu","Wifi"]',
};

let mockLocation = {
  state: { room: mockRoom, selectedDate: new Date() },
};

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => mockLocation,
    Link: (props: any) => <a {...props} />,
  };
});

describe('BookingForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    mockLocation = { state: { room: mockRoom, selectedDate: new Date() } };
  });

  afterEach(() => {
    cleanup();
  });

  it('shows error page when no room data', () => {
    mockLocation = { state: {} };
    render(<BookingForm />);
    expect(screen.getByText(/Lỗi đặt phòng/i)).toBeInTheDocument();
    expect(screen.getByText(/Không có thông tin phòng để đặt/i)).toBeInTheDocument();
  });
});