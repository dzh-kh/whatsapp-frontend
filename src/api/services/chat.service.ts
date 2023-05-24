import { $api } from "../http";
import getChatId from "../../utils/functions/getChatId";
import { IChat } from "../../types/chat.interface";
import { ITextNotification } from "../../types/textNotification.interface";
import { ITextMessage } from "./../../types/textMessage.interface";

// const idInstance = localStorage.getItem("idInstance");
// const apiTokenInstance = localStorage.getItem("apiTokenInstance");

const idInstance = "1101823894";
const apiTokenInstance = "932a74533f114882bb11ceb906a67ada85b4114c5d794f2fab";

const getBaseUrl = (path: string) =>
  `/waInstance${idInstance}/${path}/${apiTokenInstance}`;

const _transformMessageData = (data: any) => {
  return {
    receiptId: data.receptId,
    chatId: data.body.senderData.chatId,
    textMessage: data.body.messageData.textMessageData.textMessage,
  };
};

export const ChatService = {
  async getChatInfo(phone: string): Promise<IChat> {
    const baseUrl = getBaseUrl("getContactInfo");
    const chatId = getChatId(phone);
    const { data } = await $api.post(`${baseUrl}`, { chatId });
    return { ...data };
  },

  async getChatHistory(chatId: string, count = 10): Promise<ITextMessage[]> {
    const baseUrl = getBaseUrl("GetChatHistory");
    const { data } = await $api.post(`${baseUrl}`, { chatId, count });
    return data;
  },

  async readChat(chatId: string): Promise<void> {
    const baseUrl = getBaseUrl("ReadChat");
    await $api.post(`${baseUrl}`, { chatId });
  },

  async sendMessage(
    chatId: string,
    message: string
  ): Promise<{ idMessage: string }> {
    const baseUrl = getBaseUrl("SendMessage");
    const { data } = await $api.post(`${baseUrl}`, { chatId, message });
    return data;
  },

  async receiveNotification(): Promise<ITextNotification> {
    const baseUrl = getBaseUrl("ReceiveNotification");
    const { data } = await $api.get(`${baseUrl}`);
    return _transformMessageData(data);
  },

  async deleteNotification(receptId: number): Promise<void> {
    const baseUrl = getBaseUrl("DeleteNotification");
    await $api.delete(`${baseUrl}/${receptId}`);
  },
};
