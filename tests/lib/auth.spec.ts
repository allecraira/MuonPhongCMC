import { describe, it, expect } from 'vitest';
import { useAuth, mockUsers, AuthContextType, AuthContext } from '@/lib/auth';
import { renderHook } from '@testing-library/react';
import React from 'react';

// Test useAuth throws error when used outside AuthProvider

describe('useAuth', () => {
  it('throws error if used outside AuthProvider', () => {
    // Suppress error log for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderHook(() => useAuth());
    }).toThrowError('useAuth must be used within an AuthProvider');
    spy.mockRestore();
  });
});

describe('mockUsers', () => {
  it('should be an array of valid User objects', () => {
    expect(Array.isArray(mockUsers)).toBe(true);
    for (const user of mockUsers) {
      expect(typeof user.id).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.name).toBe('string');
      expect(['student', 'teacher', 'admin', 'pctsv', 'security']).toContain(user.role);
      expect(typeof user.hasChangedPassword).toBe('boolean');
    }
  });
});