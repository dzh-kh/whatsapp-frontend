import { ChatService } from "../../api/services/chat.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalStorageItem } from "../../utils/functions";

export const fetchChat = createAsyncThunk(
  "chat/getChat",
  async (chatId: string, thunkApi) => {
    try {
      const chatData = await ChatService.getChatInfo(chatId);
      const chats = getLocalStorageItem("chats");
      if (chats) {
        chats.push(chatData);
        localStorage.setItem("chats", JSON.stringify(chats));
      } else localStorage.setItem("chats", JSON.stringify([chatData]));
      return chatData;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data.message);
    }
  }
);
