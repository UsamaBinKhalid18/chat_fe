import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Notification = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
};

interface NotificationState {
  notifications: Notification[];
  loginModal: boolean;
}
const initialState: NotificationState = {
  notifications: [],
  loginModal: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<
        Omit<Notification, 'duration'> & Partial<Pick<Notification, 'duration'>>
      >,
    ) => {
      state.notifications.push({ ...action.payload, duration: action.payload.duration ?? 3000 });
    },
    removeNotificationById: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    setLoginModal: (state, action: PayloadAction<boolean>) => {
      state.loginModal = action.payload;
    },
  },
});

export const { addNotification, removeNotificationById, setLoginModal } = notificationSlice.actions;

export default notificationSlice.reducer;
export const selectNotifications = (state: RootState) => state.notification.notifications;
export const selectLoginModal = (state: RootState) => state.notification.loginModal;
