import React, { FC, useEffect, useState } from "react";
import Messages from "./messages/Messages";
import AddMessage from "./messages/AddMessage";
import styles from "./chatBox.module.scss";
import { ITextMessage } from "../../types/textMessage.interface";
import { ChatService } from "../../api/services/chat.service";
import { useActions, useAppSelector } from "../../hooks";
import IChat from "../../types/chat.interface";
import chatbox from "../../assets/images/chatbox.png";

const ChatBox: FC = () => {
  const { currentChat } = useAppSelector((state) => state.chat);
  return (
    <div className={styles.chatbox_wrapper}>
      {currentChat ? (
        <ChatRoom currentChat={currentChat} />
      ) : (
        <img height={200} src={chatbox} alt="My Happy SVG" />
      )}
    </div>
  );
};

export default React.memo(ChatBox);

const ChatRoom: FC<{ currentChat: IChat }> = ({ currentChat }) => {
  const { avatar, name, chatId, lastSeen } = currentChat;
  const [messages, setMessages] = useState<ITextMessage[] | []>([]);
  const [count, setCount] = useState(0);
  const { setChatHistory } = useActions();
  useEffect(() => {
    setChatHistory(messages);
    setMessages(currentChat.history ? currentChat.history : []);
  }, [currentChat]);

  useEffect(() => {
    const interval = setInterval(() => {
      ChatService.receiveNotification()
        .then((res) => {
          if (
            chatId === res?.chatId &&
            res?.type === "incomingMessageReceived"
          ) {
            ChatService.deleteNotification(res.receiptId);

            setMessages((prev) => [...prev, { ...res, type: "incoming" }]);
            ChatService.readChat(chatId);
          }
        })
        .catch((e: any) => console.log(e));
      setCount(count + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [count]);

  const handleAddMessage = (value: string) => {
    ChatService.sendMessage(chatId, value)
      .then((res) => setMessages([...messages, res]))
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.chat_room}>
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
