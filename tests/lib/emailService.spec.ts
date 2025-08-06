/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as emailService from '@/lib/emailService';

vi.mock('nodemailer', () => ({
  createTransport: vi.fn(() => ({
    send: vi.fn(() => Promise.resolve({ status: 200 }))
  }))
}));
const { processBookingRequest } = await import("@/lib/emailService");

// Mock window.location.origin cho test
Object.defineProperty(window, 'location', {
  value: { origin: 'http://localhost' },
  writable: true,
});

// Mock fetch để giả lập gửi email API
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Email sent' }),
    })
  ) as any;
});

describe('sendBookingConfirmation', () => {
  it('should send booking confirmation email and return true', async () => {
    const booking = {
      id: '123',
      roomName: 'Phòng A',
      bookerName: 'Nguyễn Văn A',
      bookerEmail: 'a@cmc.edu.vn',
      date: '2024-07-01',
      time: '08:00',
      purpose: 'Học nhóm',
      attendees: 5,
    };
    const result = await emailService.sendBookingConfirmation(booking);
    expect(result).toBe(true);
  });
});

describe('sendBookingRejection', () => {
  it('should send booking rejection email and return true', async () => {
    const booking = {
      id: '124',
      roomName: 'Phòng B',
      bookerName: 'Trần Thị B',
      bookerEmail: 'b@cmc.edu.vn',
      reason: 'Phòng đã được đặt',
    };
    const result = await emailService.sendBookingRejection(booking);
    expect(result).toBe(true);
  });
});

describe('testEmailService', () => {
  it('should return true for test email', async () => {
    const result = await emailService.testEmailService('test@cmc.edu.vn');
    expect(result).toBe(true);
  });
});

describe('processBookingRequest', () => {
  it('should return approved true or false', async () => {
    const booking = {
      id: '125',
      roomId: 'A1',
      date: '2024-07-01',
      time: '09:00',
      bookerEmail: 'c@cmc.edu.vn',
      bookerName: 'Lê Văn C',
      roomName: 'Phòng C',
      purpose: 'Họp',
      attendees: 3,
    };
    const result = await emailService.processBookingRequest(booking);
    expect(typeof result.approved).toBe('boolean');
  });
});