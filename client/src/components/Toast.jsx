import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <FaCheckCircle className="toast-icon" />
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
