export interface INotification {
  receiptId: number;
  body: {
    textMessage?: string;
    chatId: string;
    typeWebhook: string;
    timestamp: number;
    status?: string;
    idMessage?: string;
  };
}

// incomingMessageReceived;
// outgoingMessageReceived;
// outgoingAPIMessageReceived;
// outgoingMessageStatus;
