// src/store/notificationStore.ts
import { create } from 'zustand';

type NotificationState = {
  message: string | null;
  showMessage: (msg: string) => void;
  clearMessage: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  showMessage: (msg: string) => set({ message: msg }),
  clearMessage: () => set({ message: null }),
}));