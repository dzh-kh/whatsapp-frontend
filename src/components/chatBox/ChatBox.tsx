import React, { FC, useEffect, useState } from "react";
import Messages from "./messages/Messages";
import AddMessage from "./messages/AddMessage";
import styles from "./chatBox.module.scss";
import { ITextMessage } from "../../types/textMessage.interface";
import { ChatService } from "../../api/services/chat.service";
import { useAppSelector } from "../../hooks";
import IChat from "../../types/chat.interface";
import chatbox from "../../assets/images/chatbox.png";
import useRequest from "../../hooks/useRequest";
import FullPageLoader from "../fullPageLoader/FullPageLoader";

const ChatBox: FC = () => {
  const { currentChat } = useAppSelector((state) => state.chat);
  console.log(currentChat);
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
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const { fetch, isLoading } = useRequest(async () => {
    const textChatHistory = await ChatService.getChatHistory(
      currentChat.chatId
    );
    await ChatService.readChat(currentChat.chatId);
    console.log(textChatHistory);
    setMessages(textChatHistory);
  });
  useEffect(() => {
    setMessages([]);
    fetch();
  }, [currentChat]);

  useEffect(() => {
    notifications.filter((not) => {
      console.log(not);
      if (not.body?.senderData.chatId === currentChat.chatId) {
        const mg = {
          textMessage: not?.body?.messageData?.textMessageData.textMessage,
          timestamp: not.body.timestamp,
          type: "incoming",
          idMessage: not.body.idMessage,
        };
        setMessages([...messages, mg]);
      }
    });
  }, [notifications]);

  const handleAddMessage = (value: string) => {
    setMessages([
      ...messages,
      {
        textMessage: value,
        timestamp: Date.now(),
        type: "outgoing",
        idMessage: `templeId${Date.now()}`,
        statusMessage: "pending",
      },
    ]);
    ChatService.sendMessage(chatId, value);
    // ChatService.sendMessage(chatId, value).then((res) => {
    //   // let lastMessage = messages[messages.length - 1];
    //   console.log(messages);
    //   let changedMg = messages.map((i) => {
    //     if (i.timestamp === res.timestamp) {
    //       i.statusMessage = res.statusMessage;
    //       console.log(i);
    //     }
    //     return i;
    //   });
    //   console.log(changedMg);
    //   setMessages(changedMg);
    // });
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
      {isLoading ? <FullPageLoader /> : <Messages messages={messages} />}
      <AddMessage addMessage={(value: string) => handleAddMessage(value)} />
    </div>
  );
};
