// Toast.js - Modern bildirim sistemi
import React, { useEffect } from 'react';
import './Toast.css';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from './Icons';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon size={20} color="#10b981" />;
      case 'error':
        return <XCircleIcon size={20} color="#ef4444" />;
      case 'warning':
        return <ExclamationTriangleIcon size={20} color="#f59e0b" />;
      case 'info':
      default:
        return <InformationCircleIcon size={20} color="#3b82f6" />;
    }
  };

  return (
    <div className={`toast toast-${type}`} onClick={onClose}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
