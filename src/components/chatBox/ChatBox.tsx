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

export default ChatBox;

const ChatRoom: FC<{ currentChat: IChat }> = ({ currentChat }) => {
  const { avatar, name, chatId, lastSeen } = currentChat;
  const [messages, setMessages] = useState<ITextMessage[] | []>([]);
  const { fetch, isLoading, error } = useRequest(async () => {
    const textChatHistory = await ChatService.getChatHistory(
      currentChat.chatId
    );
    await ChatService.readChat(currentChat.chatId);
    console.log(textChatHistory);
    setMessages(
      textChatHistory.filter((mg) =>
        mg?.typeMessage?.toLowerCase().includes("text")
      )
    );
  });
  useEffect(() => {
    setMessages([]);
    fetch();
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
    <div className={styles.chat_room}>
      <header className={styles.header}>
        <div className={styles.chat_block}>
          <img className={styles.chat_avatar} src={avatar} />
          <span>{name}</span>
          <span>{lastSeen}</span>
        </div>
      </header>
      {isLoading ? <div>..loading</div> : <Messages messages={messages} />}
      <AddMessage addMessage={(value: string) => handleAddMessage(value)} />
    </div>
  );
};
