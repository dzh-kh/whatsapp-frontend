import React, { FC, useEffect, useState } from "react";
import Messages from "./messages/Messages";
import AddMessage from "./messages/AddMessage";
import styles from "./chatBox.module.scss";
import { ITextMessage } from "../../types/textMessage.interface";
import { ChatService } from "../../api/services/chat.service";
import { useAppSelector } from "../../hooks";
import IChat from "../../types/chat.interface";

const ChatBox: FC = () => {
  const { currentChat } = useAppSelector((state) => state.chat);
  currentChat;
  if (currentChat) return <ChatRoom currentChat={currentChat} />;
  else {
    return <div>no chat room</div>;
  }
};

export default ChatBox;

const ChatRoom: FC<{ currentChat: IChat }> = ({ currentChat }) => {
  const { avatar, name, chatId, lastSeen } = currentChat;
  const [messages, setMessages] = useState<ITextMessage[] | []>([]);
  useEffect(() => {
    setMessages([]);
  }, [currentChat]);
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
  return (
    <div className={styles.chatBox}>
      <header className={styles.header}>
        <div className={styles.chat_block}>
          <img className={styles.chat_avatar} src={avatar} />
          <span>{name}</span>
          <span>{lastSeen}</span>
        </div>
      </header>
      <Messages messages={messages} />
      <AddMessage addMessage={(value: string) => handleAddMessage(value)} />
    </div>
  );
};
