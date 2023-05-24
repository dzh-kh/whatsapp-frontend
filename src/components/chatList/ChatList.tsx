import React, { FC } from "react";
import ChatItem from "./chatItem/ChatItem";

const chatData = [
  {
    name: "89899224025",
    chatId: "898992240252c",
    lastSeen: "2:30",
    avatar:
      "https://habrastorage.org/webt/05/4k/3p/054k3poihwoy0exlwfm9hckejea.jpeg",
  },
  {
    name: "amy",
    chatId: "898992240256c",
    lastSeen: "2:50",
    avatar:
      "https://habrastorage.org/webt/05/4k/3p/054k3poihwoy0exlwfm9hckejea.jpeg",
  },
];
const ChatList: FC = () => {
  const list = chatData.map((chat) => (
    <ChatItem
      chatData={chat}
      currentChat="898992240252c"
      handleClick={() => console.log("choosen one")}
    />
  ));
  return <div>{list.length ? list : "no chats yet"}</div>;
};

export default ChatList;
