import React, { FC } from "react";
import styles from "./chat.module.scss";
import IChat from "../../types/chat.interface";

export interface IChatProps {
  chatData: IChat;
  handleClick: Function;
  currentChat: string;
}

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
          handleClick(chatId);
        }}
      >
        <img
          src={avatar}
          className={styles.avatar}
          width={50}
          height={50}
          alt="avatar"
        />
        <div className={styles.chat_info}>
          <span className={styles.chat_name}>{name}</span>
        </div>
      </div>
    </div>
  );
};
export default ChatItem;
