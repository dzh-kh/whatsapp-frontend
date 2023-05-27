export interface INotification {
  receiptId: number;
  type: string;
  chatId: string;
  messageStatus?: string;
  messageText: string;
  messageId: string;
  timestamp: number;
}
