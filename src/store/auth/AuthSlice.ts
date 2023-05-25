import IChat from "../../types/chat.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ChatState {
  chats: IChat[];
  currentChat: IChat | null;
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
    fetchChatLoading(state) {
      state.isLoading = true;
    },
    fetchChatSuccess(state, action: PayloadAction<IChat>) {
      state.isLoading = false;
      state.chats.push(action.payload);
    },
    fetchChatError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentChat(state, action: PayloadAction<string>) {
      state.currentChat = state.chats.filter(
        (chat) => chat.chatId === action.payload
      )[0];
    },
  },
});

export default ChatSlice;
