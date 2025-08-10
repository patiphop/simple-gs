import React, { useEffect } from 'react';

interface MessageProps {
  type: 'error' | 'success';
  message: string;
  onClose: () => void;
  duration?: number;
}

const Message: React.FC<MessageProps> = ({ 
  type, 
  message, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getMessageStyles = () => {
    if (type === 'error') {
      return 'bg-red-100 border-red-300 text-red-800';
    }
    return 'bg-green-100 border-green-300 text-green-800';
  };

  const getIcon = () => {
    return type === 'error' ? '❌' : '✅';
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg max-w-md ${getMessageStyles()}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{getIcon()}</span>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close message"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Message;
