import React, { FC } from "react";
import { ITextMessage } from "../../../types/textMessage.interface";
import MessageItem from "./MessageItem";
import styles from "./message.module.scss";
interface IProps {
  messages: ITextMessage[];
}

const Messages: FC<IProps> = ({ messages }) => {
  const messageList = messages.map((message) => {
    return <MessageItem key={message.idMessage} message={message} />;
  });

  return <div className={styles.list_wrapper}>{messageList}</div>;
};

export default Messages;
