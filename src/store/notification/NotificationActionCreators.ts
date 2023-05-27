import { AppDispatch } from "..";
import { ChatService } from "../../api/services/chat.service";
import NotificationSlice from "./NotificationSlice";

export const getNotification = () => async (dispatch: AppDispatch) => {
  try {
    const notification = await ChatService.receiveNotification();
    if (notification?.receiptId) {
      await ChatService.deleteNotification(notification.receiptId);
      console.log(notification);
      dispatch(NotificationSlice.actions.fetchNotification(notification));
    }
  } catch (e: any) {
    console.log(e);
  }
};
