import React, { FC } from "react";
import { IChatProps } from "./types";
import styles from "./chatItem.module.scss";

const ChatItem: FC<IChatProps> = ({ chatData, currentChat, handleClick }) => {
  const { avatar, name, chatId } = chatData;
  return (
    <div className={styles.wrapper}>
      <div
        className={
          currentChat !== chatId
            ? styles.contact_item
            : styles.current_contact_item
        }
        onClick={() => {
          handleClick();
          // setUnreadMsgCount(0);
        }}
      >
        <img
          src={avatar}
          className={styles.avatar}
          width={50}
          height={50}
          alt=""
        />
        <div className={styles.chat_info}>
          <span className={styles.chat_name}>{name}</span>
          {/* {unreadMsgCount >= 1 && <span>{unreadMsgCount}</span>} */}
        </div>
      </div>
    </div>
  );
};
export default ChatItem;
