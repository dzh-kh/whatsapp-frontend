import { AppDispatch } from "..";
import { ChatService } from "../../api/services/chat.service";
import useActions from "../../hooks/useActions";

export const getChatInfo =
  (chatId: string) => async (dispatch: AppDispatch) => {
    const { fetchChatLoading, fetchChatError, fetchChatSuccess } = useActions();
    try {
      fetchChatLoading();
      const chatData = await ChatService.getChatInfo(chatId);
      fetchChatSuccess(chatData);
    } catch (e: any) {
      fetchChatError(e.response.data.message);
    }
  };
