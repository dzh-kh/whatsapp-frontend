import { ITextMessage } from "./textMessage.interface";

export default interface IChat {
  avatar: string;
  name: string;
  chatId: string;
  lastSeen: string;
  history?: ITextMessage[];
}
