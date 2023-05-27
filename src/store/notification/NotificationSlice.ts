import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../types/notification.interface";
import { getNotification } from "./NotificationActionCreators";

interface NotificationState {
  notifications: {
    incomingMessageReceived: INotification[];
    outgoingAPIMessageReceived: INotification[];
    outgoingMessageStatus: INotification[];
  };
  newMessageTrigger: boolean;
}

const initialState: NotificationState = {
  notifications: {
    incomingMessageReceived: [],
    outgoingAPIMessageReceived: [],
    outgoingMessageStatus: [],
  },
  newMessageTrigger: false,
};

const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    removeNotifications(state, action: PayloadAction<string>) {
      const types: string[] = Object.keys(state.notifications);
      for (let type of types) {
        let typedNot =
          state.notifications[type as keyof typeof state.notifications];
        state.notifications[type as keyof typeof state.notifications] =
          typedNot.filter((i) => i.chatId === action.payload);
      }
    },
    // fetchNotification(state, action: PayloadAction<INotification>) {
    //   const types: string[] = Object.keys(state.notifications);
    //   for (let type of types) {
    //     if (type === action.payload.type) {
    //       state.notifications[type as keyof typeof state.notifications].push(
    //         action.payload
    //       );
    //     }
    //   }
    // },
  },
  extraReducers: {
    [getNotification.fulfilled.type]: (
      state,
      action: PayloadAction<INotification>
    ) => {
      const types: string[] = Object.keys(state.notifications);
      for (let type of types) {
        if (type === action?.payload?.type) {
          state.notifications[type as keyof typeof state.notifications].push(
            action.payload
          );
          state.newMessageTrigger = !state.newMessageTrigger;
        }
      }
    },
    // [getNotification.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
  },
});

export default NotificationSlice;
