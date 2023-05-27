import React, { FC } from "react";
import styles from "./message.module.scss";
import { ITextMessage } from "../../../types/textMessage.interface";
import { convertTimestamp } from "../../../utils/functions";

interface IProps {
  message: ITextMessage;
}

const MessageItem: FC<IProps> = ({ message }) => {
  const { type, timestamp, chatId, textMessage, statusMessage } = message;
  const time = convertTimestamp(timestamp);
  return (
    <div
      className={
        type === "outgoing" ? styles.own_msg__wrapper : styles.msg__wrapper
      }
    >
      <div className={styles.message_item}>
        {textMessage}
        <div className={styles.message_item__info}>
          <span className={styles.message_item__time}>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
