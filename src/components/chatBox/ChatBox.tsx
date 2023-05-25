import React, { FC, useEffect, useState } from "react";
import Messages from "./messages/Messages";
import AddMessage from "./messages/AddMessage";
import styles from "./chatBox.module.scss";
import { ITextMessage } from "../../types/textMessage.interface";
import { ChatService } from "../../api/services/chat.service";

const ChatBox: FC<{ chatId: string }> = ({ chatId }) => {
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
    ChatService.sendMessage(chatId, value).then((res) => {
      let lastMessage = messages[messages.length - 1];
      setMessages([...messages, (lastMessage = res)]);
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
};

export default ChatBox;
