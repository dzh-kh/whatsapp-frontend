import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../types/notification.interface";

interface NotificationState {
  notifications: INotification[];
}
const initialState: NotificationState = {
  notifications: [],
};

const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    removeNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(
        (not) => not.receiptId !== action.payload
      );
    },
    fetchNotification(state, action: PayloadAction<INotification>) {
      "incomingMessageReceived";
      if (action.payload.body.typeWebhook === "incomingMessageReceived") {
        state.notifications.push(action.payload);
      }
    },
  },
});

export default NotificationSlice;
