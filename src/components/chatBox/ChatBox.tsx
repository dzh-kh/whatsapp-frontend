import React, { useEffect, useState } from "react";
import Messages from "./messages/Messages";
import AddMessage from "./messages/AddMessage";
import styles from "./chatBox.module.scss";
import { ITextMessage } from "../../types/textMessage.interface";
import convertTimestamp from "../../utils/functions/convertTimestamp";
import { ChatService } from "../../api/services/chat.service";

function ChatBox() {
  const [messages, setMessages] = useState<ITextMessage[] | []>([]);

  const handleAddMessage = (value: string) => {
    setMessages([
      ...messages,
      {
        textMessage: value,
        timestamp: Date.now(),
        type: "outgoing",
        idMessage: `templeId${value}`,
        statusMessage: "pending",
      },
    ]);
    ChatService.sendMessage("79380210921@c.us", value).then((res) => {
      console.log(res);
      setMessages([...messages.pop(), res]);
    });
  };
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <div className={styles.chatBox}>
      <header className={styles.header}>
        <div className={styles.user_block}>
          <img src="#" />
        </div>
      </header>
      <Messages messages={messages} />
      <AddMessage addMessage={(value: string) => handleAddMessage(value)} />
    </div>
  );
}

export default ChatBox;

const mg = [
  {
    type: "outgoing",
    idMessage: "470E1C0D78ED21E3B86210BC8821769E",
    timestamp: 1684947580,
    typeMessage: "textMessage",
    chatId: "79380210921@c.us",
    textMessage: "Оке",
    statusMessage: "delivered",
  },
  {
    type: "incoming",
    idMessage: "3EB0EB1194CC66BA827294",
    timestamp: 1684947426,
    typeMessage: "textMessage",
    chatId: "79380210921@c.us",
    textMessage: "hava",
  },
];
