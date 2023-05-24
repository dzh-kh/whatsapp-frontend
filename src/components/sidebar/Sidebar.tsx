import React, { FC } from "react";
import styles from "./sidebar.module.scss";
import SearchBar from "./searchBar/SearchBar";
import ChatList from "../chatList/ChatList";
import SidebarHeader from "./sidebarHeader/SidebarHeader";

const Sidebar: FC = () => {
  return (
    <div>
      <SidebarHeader />
      <SearchBar />
      <ChatList />
    </div>
  );
};

export default Sidebar;
