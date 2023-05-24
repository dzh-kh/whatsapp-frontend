export interface ITextMessage {
  type: string;
  timestamp: number;
  idMessage: string;
  typeMessage: string;
  chatId: string;
  textMessage: string;
  statusMessage?: "read" | "sent" | "delivered" | "pending";
}
