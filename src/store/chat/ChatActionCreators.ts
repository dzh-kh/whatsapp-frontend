import { AppDispatch } from "..";
import { ChatService } from "../../api/services/chat.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getChatInfo =
//   (chatId: string) => async (dispatch: AppDispatch) => {
//     const { fetchChatLoading, fetchChatError, fetchChatSuccess } = useActions();
//     try {
//       fetchChatLoading();
//       const chatData = await ChatService.getChatInfo(chatId);
//       (chatData);
//       (chatData);
//       fetchChatSuccess(chatData);
//     } catch (e: any) {
//       fetchChatError(e.response.data.message);
//     }
//   };

export const fetchChat = createAsyncThunk(
  "chat/getChat",
  async (chatId: string, thunkApi) => {
    try {
      const chatData = await ChatService.getChatInfo(chatId);
      chatData;
      return chatData;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data.message);
    }
  }
);
