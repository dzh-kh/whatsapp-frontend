import { $api } from "../http";
import IChat from "../../types/chat.interface";
import { INotification } from "../../types/notification.interface";
import { ITextMessage } from "./../../types/textMessage.interface";
import noAvatar from "../../assets/images/no_avatar.png";

const getBaseUrl = (path: string) => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    return `/waInstance${userData.idInstance}/${path}/${userData.apiTokenInstance}`;
  }
  return "";
};

const _transformMessageData = (data: any) => {
  const obj = {
    incomingMessageReceived: [],
    outgoingMessageReceived: [],
    outgoingAPIMessageReceived: [],
    outgoingMessageStatus: [],
  };
  // return {
  //   receiptId: data.receptId,
  //   chatId: data.body.senderData.chatId,
  //   textMessage?: string;
  //   receiptId: number;
  //   chatId: string;
  //   typeWebhook: string;
  //   status?: string;
  //   textMessage: data.body.messageData.textMessageData.textMessage,
  // };
};

function setTimerForAsyncFn(callback: any, ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback());
    }, ms);
  });
}

const _transformChatData = (data: any) => {
  return {
    ...data,
    avatar: data.avatar ? data.avatar : noAvatar,
    name: data.name ? data.name : `8${data.chatId.slice(1, 11)}`,
  };
};

export const ChatService = {
  async getChatInfo(chatId: string): Promise<IChat> {
    const baseUrl = getBaseUrl("getContactInfo");
    const { data } = await $api.post(`${baseUrl}`, { chatId });
    return _transformChatData(data);
  },

  async getChatHistory(chatId: string, count = 10): Promise<ITextMessage[]> {
    const baseUrl = getBaseUrl("GetChatHistory");
    const { data } = await $api.post(`${baseUrl}`, { chatId, count });
    return data
      .filter((mg: ITextMessage) =>
        mg?.typeMessage?.toLowerCase().includes("text")
      )
      .reverse();
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
    const { data } = await $api.post(`${baseUrl}`, { chatId, idMessage });
    return data;
  },

  async sendMessage(chatId: string, message: string): Promise<any> {
    const baseUrl = getBaseUrl("SendMessage");
    const { data } = await $api.post(`${baseUrl}`, { chatId, message });
    const mg = await setTimerForAsyncFn(
      async () => await this.getMessageById(data.idMessage, chatId),
      2000
    );
    console.log(mg);
    return mg;
  },

  async receiveNotification(): Promise<INotification> {
    const baseUrl = getBaseUrl("ReceiveNotification");
    const { data } = await $api.get(`${baseUrl}`);
    return data;
  },

  async deleteNotification(receptId: number): Promise<void> {
    const baseUrl = getBaseUrl("DeleteNotification");
    await $api.delete(`${baseUrl}/${receptId}`);
  },
};
