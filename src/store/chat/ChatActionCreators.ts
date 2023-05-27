import { ChatService } from "../../api/services/chat.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChat = createAsyncThunk(
  "chat/getChat",
  async (chatId: string, thunkApi) => {
    try {
      const chatData = await ChatService.getChatInfo(chatId);
      const chats = localStorage.getItem("chats");
      if (chats) {
        localStorage.setItem(
          "chats",
          JSON.stringify(JSON.parse(chats).push(chatData))
        );
      } else {
        localStorage.setItem("chats", JSON.stringify([chatData]));
      }
      return chatData;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data.message);
    }
  }
);
