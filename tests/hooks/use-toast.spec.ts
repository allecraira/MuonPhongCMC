import { describe, it, expect } from "vitest";
import { reducer } from "@/hooks/use-toast";

const baseToast = {
  id: '1',
  title: 'Test',
  description: 'Test desc',
  open: true,
};

describe('toast reducer', () => {
  it('should add a toast', () => {
    const state = { toasts: [] };
    const action = { type: 'ADD_TOAST', toast: baseToast };
    const newState = reducer(state, action);
    expect(newState.toasts.length).toBe(1);
    expect(newState.toasts[0].id).toBe('1');
  });

  it('should update a toast', () => {
    const state = { toasts: [baseToast] };
    const action = { type: 'UPDATE_TOAST', toast: { id: '1', title: 'Updated' } };
    const newState = reducer(state, action);
    expect(newState.toasts[0].title).toBe('Updated');
  });

  it('should dismiss a toast', () => {
    const state = { toasts: [baseToast] };
    const action = { type: 'DISMISS_TOAST', toastId: '1' };
    const newState = reducer(state, action);
    expect(newState.toasts[0].open).toBe(false);
  });

  it('should remove a toast', () => {
    const state = { toasts: [baseToast] };
    const action = { type: 'REMOVE_TOAST', toastId: '1' };
    const newState = reducer(state, action);
    expect(newState.toasts.length).toBe(0);
  });

  it('should remove all toasts if toastId is undefined', () => {
    const state = { toasts: [baseToast, { ...baseToast, id: '2' }] };
    const action = { type: 'REMOVE_TOAST', toastId: undefined };
    const newState = reducer(state, action);
    expect(newState.toasts.length).toBe(0);
  });
});