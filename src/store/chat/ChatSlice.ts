import IChat from "../../types/chat.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChat } from "./ChatActionCreators";
import { getLocalStorageItem } from "../../utils/functions";
import { ITextMessage } from "../../types/textMessage.interface";
interface ChatState {
  chats: IChat[];
  currentChat: IChat | null;
  isLoading: boolean;
  error: string | null;
}
const chats = getLocalStorageItem("chats");
const initialState: ChatState = {
  chats: chats ? chats : [],
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

    setChatHistoryMessage(
      state,
      action: PayloadAction<{ message: ITextMessage; chatId: string }>
    ) {
      state.chats.forEach((i, index) => {
        if (i.chatId === action.payload.chatId) {
          state.chats[index].history?.push(action.payload.message);
        }
      });
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
