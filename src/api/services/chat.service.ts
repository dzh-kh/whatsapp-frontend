import { $api } from "../http";
import IChat from "../../types/chat.interface";
import { INotification } from "../../types/notification.interface";
import { ITextMessage } from "./../../types/textMessage.interface";
import noAvatar from "../../assets/images/no_avatar.png";
import { getLocalStorage } from "../../utils/functions/getLocalStorage";

const getBaseUrl = (path: string) => {
  const user = getLocalStorage("user");
  if (user) {
    return `/waInstance${user.idInstance}/${path}/${user.apiTokenInstance}`;
  }
  return "";
};

const _transformNotificationData = (data: any) => {
  console.log(data);
  return {
    receiptId: data.receiptId,
    type: data.body.typeWebhook,
    chatId: data.body?.chatId ? data.body.chatId : data.body.senderData.chatId,
    messageStatus: data.body.status,
    messageText: data.body?.messageData
      ? data.body?.messageData?.textMessageData?.textMessage
      : null,
    messageId: data.body.idMessage,
    timestamp: data.body.timestamp,
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
      1000
    );
    console.log(mg);
    return mg;
  },

  async receiveNotification(): Promise<INotification> {
    const baseUrl = getBaseUrl("ReceiveNotification");
    const { data } = await $api.get(`${baseUrl}`);
    const newData = data ? _transformNotificationData(data) : data;
    return newData;
  },

  async deleteNotification(receptId: number): Promise<void> {
    const baseUrl = getBaseUrl("DeleteNotification");
    await $api.delete(`${baseUrl}/${receptId}`);
  },
};
