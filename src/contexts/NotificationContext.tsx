import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface NotificationState {
  visible: boolean;
  type: 'success' | 'error' | 'warning' | 'info' | 'boss';
  title: string;
  message: string;
}

interface NotificationContextType {
  notification: NotificationState;
  showNotification: (type: 'success' | 'error' | 'warning' | 'info' | 'boss', title: string, message: string, duration?: number) => void;
  hideNotification: () => void;
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
  showBoss: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
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

  const value = {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showBoss
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 