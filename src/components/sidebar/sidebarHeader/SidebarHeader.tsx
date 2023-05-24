import React, { FC } from "react";
import styles from "./sidebarHeader.module.scss";
import { BiDotsVerticalRounded } from "react-icons/bi";
const SidebarHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.user_block}>
        <img src="#" />
        <BiDotsVerticalRounded />
      </div>
    </header>
  );
};

export default SidebarHeader;
