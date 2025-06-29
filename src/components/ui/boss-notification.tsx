import React from 'react';
import { X } from 'lucide-react';

interface BossNotificationProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'boss';
  title: string;
  message: string;
  onClose: () => void;
  visible: boolean;
}

const BossNotification: React.FC<BossNotificationProps> = ({
  type,
  title,
  message,
  onClose,
  visible
}) => {
  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '🎉';
      case 'error':
        return '💥';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'boss':
        return '👑';
      default:
        return '💡';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
      case 'error':
        return 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200';
      case 'boss':
        return 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-lg';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-900';
      case 'error':
        return 'text-red-900';
      case 'warning':
        return 'text-yellow-900';
      case 'info':
        return 'text-blue-900';
      case 'boss':
        return 'text-purple-900';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`${getBgColor()} border-2 rounded-lg p-4 shadow-xl max-w-sm`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-lg ${getTextColor()} mb-1`}>
              {title}
            </h3>
            <p className={`text-sm ${getTextColor()} opacity-90`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BossNotification; 