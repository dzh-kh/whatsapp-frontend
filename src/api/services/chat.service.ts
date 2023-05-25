import { $api } from "../http";
import getChatId from "../../utils/functions/getChatId";
import IChat from "../../types/chat.interface";
import { ITextNotification } from "../../types/textNotification.interface";
import { ITextMessage } from "./../../types/textMessage.interface";
import noAvatar from "../../assets/images/no_avatar.png";

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

function setTimerForAsyncFn(callback: any, ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback());
    }, ms);
  });
}

const _transformChatData = (data: any) => {
  data;
  return {
    ...data,
    avatar: data.avatar ? data.avatar : noAvatar,
    name: data.avatar ? data.name : `${data.chatId.slice(0, 11)}`,
  };
};

export const ChatService = {
  async getChatInfo(phone: string): Promise<IChat> {
    const baseUrl = getBaseUrl("getContactInfo");
    const chatId = getChatId(phone);
    const { data } = await $api.post(`${baseUrl}`, { chatId });
    return _transformChatData(data);
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

  async getMessageById(
    idMessage: string,
    chatId: string
  ): Promise<ITextMessage> {
    const baseUrl = getBaseUrl("GetMessage");
    idMessage;
    chatId;
    const { data } = await $api.post(`${baseUrl}`, { chatId, idMessage });
    return data;
  },

  async sendMessage(chatId: string, message: string): Promise<any> {
    const baseUrl = getBaseUrl("SendMessage");
    const { data } = await $api.post(`${baseUrl}`, { chatId, message });
    const mg = await setTimerForAsyncFn(
      async () => await this.getMessageById(data.idMessage, chatId),
      5000
    );
    console.log(mg);
    return mg;
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
