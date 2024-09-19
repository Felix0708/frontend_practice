// src/components/Toast.tsx
import React, { useEffect } from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import * as styles from './toast.css';

const Toast = () => {
  const { message, clearMessage } = useNotificationStore();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000); // 3초 후에 자동으로 사라지도록 설정
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!message) return null;

  return <div className={styles.toast}>{message}</div>;
};

export default Toast;