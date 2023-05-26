import React, { FC, useState } from "react";
import ChatItem from "./ChatItem";
import useActions from "../../hooks/useActions";
import { useAppSelector } from "../../hooks";
import styles from "./chat.module.scss";

const ChatList: FC = () => {
  const [currentChat, setCurrentChat] = useState<string>("");
  const { changeCurrentChat } = useActions();
  const { chats } = useAppSelector((state) => state.chat);
  const handleClick = (id: string) => {
    setCurrentChat(id);
    changeCurrentChat(id);
  };
  const list = chats.map((chat) => (
    <ChatItem
      key={chat.chatId}
      chatData={chat}
      currentChat={currentChat}
      handleClick={handleClick}
    />
  ));
  return (
    <div className={styles.list_wrapper}>
      {list.length ? (
        list
      ) : (
        <div className={styles.empty_list}>Чаты не найдены</div>
      )}
    </div>
  );
};

export default ChatList;
