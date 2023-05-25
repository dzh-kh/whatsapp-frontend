import React, { FC } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatBox from "../../components/chatBox/ChatBox";
import styles from "./main.module.scss";

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <Sidebar />
      <ChatBox chatId={"79380210921@c.us"} />
    </div>
  );
};

export default Main;
