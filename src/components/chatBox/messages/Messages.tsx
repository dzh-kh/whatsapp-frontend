import React, { FC } from "react";
import { ITextMessage } from "../../../types/textMessage.interface";
import MessageItem from "./MessageItem";

interface IProps {
  messages: ITextMessage[];
}

const Messages: FC<IProps> = ({ messages }) => {
  const messageList = messages.map((message) => {
    return <MessageItem key={message.idMessage} message={message} />;
  });

  return <div>{messageList}</div>;
};

export default Messages;
