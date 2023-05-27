import React, { FC, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatBox from "../../components/chatBox/ChatBox";
import styles from "./main.module.scss";
import PollingIntegrator from "./PollingIntegrator";
import { Navigate } from "react-router-dom";
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader";
import { useAuth } from "../../hooks";

const Main: FC = () => {
  const { isLoading, isAuth } = useAuth();
  if (isLoading) return <FullPageLoader />;
  if (!isLoading && !isAuth) return <Navigate to={"/login"} />;

  if (!isLoading && isAuth)
    return (
      <div className={styles.main}>
        <Sidebar />
        <ChatBox />
        <PollingIntegrator />
      </div>
    );
};

export default Main;
