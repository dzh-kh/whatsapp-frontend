import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ChatSlice from "../store/chat/ChatSlice";
import { fetchChat } from "../store/chat/ChatActionCreators";
import { getNotification } from "../store/notification/NotificationActionCreators";
import NotificationSlice from "../store/notification/NotificationSlice";
import { resetApp } from "../store";

const useActions = () => {
  const dispatch: any = useDispatch();
  return bindActionCreators(
    {
      ...ChatSlice.actions,
      fetchChat,
      getNotification,
      ...NotificationSlice.actions,
      resetApp,
    },
    dispatch
  );
};

export default useActions;
