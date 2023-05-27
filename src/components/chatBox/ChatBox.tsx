import React, { FC, useEffect, useState } from "react";
import Messages from "./messages/Messages";
import AddMessage from "./messages/AddMessage";
import styles from "./chatBox.module.scss";
import { ITextMessage } from "../../types/textMessage.interface";
import { ChatService } from "../../api/services/chat.service";
import { useActions, useAppSelector } from "../../hooks";
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
  const { notifications, newMessageTrigger } = useAppSelector(
    (state) => state.notification
  );
  const incomingMessages = notifications.incomingMessageReceived;

  const { removeNotifications } = useActions();
  const { fetch, isLoading } = useRequest(async () => {
    const textChatHistory = await ChatService.getChatHistory(
      currentChat.chatId
    );
    setMessages(textChatHistory);
  });

  useEffect(() => {
    setMessages([]);
    removeNotifications(currentChat.chatId);
    fetch();
  }, [currentChat]);

  useEffect(() => {
    incomingMessages.filter((not) => {
      if (not.chatId === currentChat.chatId) {
        const isMessageThere = messages.filter(
          (i) => i.idMessage === not.messageId
        )[0];
        if (!isMessageThere) {
          const mg = {
            textMessage: not.messageText,
            timestamp: not.timestamp,
            type: "incoming",
            idMessage: not.messageId,
          };
          setMessages([...messages, mg]);
        }
      }
    });

    ChatService.readChat(currentChat.chatId);
    removeNotifications(currentChat.chatId);
  }, [newMessageTrigger]);

  const handleAddMessage = (value: string) => {
    const lastmg = {
      textMessage: value,
      timestamp: Date.now(),
      type: "outgoing",
      idMessage: `templeId${Date.now()}`,
      statusMessage: "pending",
    };
    setMessages([...messages, lastmg]);
    console.log(lastmg);
    // ChatService.sendMessage(chatId, value);
    ChatService.sendMessage(chatId, value).then((res) => {
      // let lastMessage = messages[messages.length - 1];
      console.log(res);
      // let changedMg = messages.map((i) => {
      //   if (i.timestamp === res.timestamp) {
      //     i.statusMessage = res.statusMessage;
      //     console.log(i);
      //   }
      //   return i;
      // });
      // console.log(changedMg);
      // setMessages(changedMg);
    });
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
