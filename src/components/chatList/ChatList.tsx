import React, { FC, useState } from "react";
import ChatItem from "./chatItem/ChatItem";
import useActions from "../../hooks/useActions";
import { useAppSelector } from "../../hooks";

// const chatData = [
//   {
//     name: "89899224025",
//     chatId: "79899224025@c.us",
//     lastSeen: "2:30",
//     avatar:
//       "https://habrastorage.org/webt/05/4k/3p/054k3poihwoy0exlwfm9hckejea.jpeg",
//   },
//   {
//     name: "amy",
//     chatId: "79380210921@c.us",
//     lastSeen: "2:50",
//     avatar:
//       "https://habrastorage.org/webt/05/4k/3p/054k3poihwoy0exlwfm9hckejea.jpeg",
//   },
// ];

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
  return <div>{list.length ? list : "no chats yet"}</div>;
};

export default ChatList;
