import { useState, useCallback } from 'react';

interface NotificationState {
  visible: boolean;
  type: 'success' | 'error' | 'warning' | 'info' | 'boss';
  title: string;
  message: string;
}

export const useBossNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    visible: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showNotification = useCallback((
    type: 'success' | 'error' | 'warning' | 'info' | 'boss',
    title: string,
    message: string,
    duration: number = 4000
  ) => {
    setNotification({
      visible: true,
      type,
      title,
      message
    });

    // Auto hide after duration
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, duration);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, visible: false }));
  }, []);

  // Convenience methods
  const showSuccess = useCallback((title: string, message: string) => {
    showNotification('success', title, message);
  }, [showNotification]);

  const showError = useCallback((title: string, message: string) => {
    showNotification('error', title, message);
  }, [showNotification]);

  const showWarning = useCallback((title: string, message: string) => {
    showNotification('warning', title, message);
  }, [showNotification]);

  const showInfo = useCallback((title: string, message: string) => {
    showNotification('info', title, message);
  }, [showNotification]);

  const showBoss = useCallback((title: string, message: string) => {
    showNotification('boss', title, message);
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showBoss
  };
}; 