import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import BookingConfirmation from '@/pages/BookingConfirmation';
import React from 'react';
import { AuthContext, AuthContextType, User } from '@/lib/auth';

const mockBookingData = {
  id: '123456',
  roomName: 'Phòng 101',
  roomBuilding: 'Tòa A',
  roomFloor: 'Tầng 1',
  date: '01/07/2024',
  time: '07:00-08:30',
  attendees: 5,
  purpose: 'Họp nhóm',
  bookerName: 'Nguyễn Văn A',
  bookerEmail: 'a@cmc.edu.vn',
  status: 'confirmed',
  phone: '0123456789',
  studentId: 'SV001',
};

let mockLocation = {
  state: { bookingData: mockBookingData },
};

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => mockLocation,
    Link: (props: any) => <a {...props} />,
  };
});

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@cmc.edu.vn',
  role: 'student',
  hasChangedPassword: true,
};

function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const value: AuthContextType = {
    user: mockUser,
    login: async () => true,
    logout: () => {},
    isLoading: false,
    updateUser: () => {},
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

describe('BookingConfirmation', () => {
  it('renders booking confirmation with provided data', () => {
    render(
      <MockAuthProvider>
        <BookingConfirmation />
      </MockAuthProvider>
    );
    expect(screen.getByText(/Đặt phòng thành công/i)).toBeInTheDocument();
    expect(screen.getByText(/Phòng 101/i)).toBeInTheDocument();
    expect(screen.getByText(/Tòa A/i)).toBeInTheDocument();
    expect(screen.getByText(/Tầng 1/i)).toBeInTheDocument();
    expect(screen.getByText(/01\/07\/2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Họp nhóm/i)).toBeInTheDocument();
    expect(screen.getByText(/Nguyễn Văn A/i)).toBeInTheDocument();
    expect(screen.getByText(/a@cmc.edu.vn/i)).toBeInTheDocument();
    expect(screen.getByText(/0123456789/i)).toBeInTheDocument();
    expect(screen.getByText(/SV001/i)).toBeInTheDocument();
    expect(screen.getByText(/Đã xác nhận/i)).toBeInTheDocument();
  });

  it('renders default info when no booking data provided', () => {
    mockLocation = { state: {} };
    render(
      <MockAuthProvider>
        <BookingConfirmation />
      </MockAuthProvider>
    );
    // Kiểm tra có ít nhất 1 phần tử chứa "Chưa có thông tin"
    expect(screen.getAllByText(/Chưa có thông tin/i).length).toBeGreaterThan(0);
  });

  it('has navigation and print buttons', () => {
    mockLocation = { state: { bookingData: mockBookingData } };
    render(
      <MockAuthProvider>
        <BookingConfirmation />
      </MockAuthProvider>
    );
    expect(screen.getByText(/In phiếu đặt phòng/i)).toBeInTheDocument();
    expect(screen.getByText(/Đặt phòng khác/i)).toBeInTheDocument();
    expect(screen.getByText(/Về trang chủ/i)).toBeInTheDocument();
    // Kiểm tra nút in gọi window.print
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    fireEvent.click(screen.getByText(/In phiếu đặt phòng/i));
    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });
});