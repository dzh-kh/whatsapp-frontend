import IChat from "../../types/chat.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChat } from "./NotificationActionCreators";
import { ITextNotification } from "../../types/textNotification.interface";

interface ChatState {
  notifications: ITextNotification[];
  isLoading: boolean;
  error: string | null;
}
const initialState: ChatState = {
  chats: [],
  currentChat: null,
  isLoading: false,
  error: null,
};

const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    changeCurrentChat(state, action: PayloadAction<string>) {
      state.currentChat = state.chats.filter(
        (chat) => chat.chatId === action.payload
      )[0];
    },
  },
  extraReducers: {
    [fetchChat.fulfilled.type]: (state, action: PayloadAction<IChat>) => {
      state.isLoading = false;
      state.error = "";
      state.chats.unshift(action.payload);
    },
    [fetchChat.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [fetchChat.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ChatSlice;
