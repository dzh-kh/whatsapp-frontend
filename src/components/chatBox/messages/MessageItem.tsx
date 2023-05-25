import React, { FC } from "react";
import styles from "./message.module.scss";
import { ITextMessage } from "../../../types/textMessage.interface";
import { BsCheck2, BsCheck2All } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import convertTimestamp from "../../../utils/functions/convertTimestamp";

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
          {statusMessage === "read" && (
            <BsCheck2All
              className={styles.message_status__read}
              fontSize="large"
            />
          )}
          {type === "outgoing" && statusMessage === "delivered" && (
            <BsCheck2
              className={styles.message_status__delivered}
              fontSize="large"
            />
          )}
          {statusMessage === "pending" && (
            <CiClock2
              className={styles.message_status__pending}
              fontSize="large"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
