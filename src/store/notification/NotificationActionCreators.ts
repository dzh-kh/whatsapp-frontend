// import { AppDispatch } from "..";
// import { ChatService } from "../../api/services/chat.service";
// import NotificationSlice from "./NotificationSlice";
// import { getLocalStorageItem } from "../../utils/functions/getLocalStorageItem";

// export const getNotification = () => async (dispatch: AppDispatch) => {
//   try {
//     const notification = await ChatService.receiveNotification();
//     if (notification?.receiptId) {
//       const chats = getLocalStorageItem("chats");
//       if (
//         chats?.filter((chat: any) => chat.chatId === notification.chatId)[0]
//       ) {
//         await ChatService.deleteNotification(notification.receiptId);
//         console.log(notification);
//         dispatch(NotificationSlice.actions.fetchNotification(notification));
//       }
//     }
//   } catch (e: any) {
//     console.log(e);
//   }
// };

import { ChatService } from "../../api/services/chat.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalStorageItem } from "../../utils/functions";

export const getNotification = createAsyncThunk(
  "notification/getNotification",
  async (_, thunkApi) => {
    try {
      const notification = await ChatService.receiveNotification();
      if (notification?.receiptId) {
        console.log("first barrier");
        const chats = getLocalStorageItem("chats");
        await ChatService.deleteNotification(notification.receiptId);
        if (
          chats?.filter((chat: any) => chat.chatId === notification.chatId)[0]
        ) {
          console.log("second barrier");
          await ChatService.deleteNotification(notification.receiptId);
          return notification;
        }
      }
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data.message);
    }
  }
);
