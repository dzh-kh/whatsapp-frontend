import React, { FC, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatBox from "../../components/chatBox/ChatBox";
import styles from "./main.module.scss";
import PollingIntegrator from "./PollingIntegrator";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader";
import { AuthService } from "../../api/services/auth.service";
import { getLocalStorageItem } from "../../utils/functions";
import { LOGIN_PAGE_ROUTE } from "../../consts";

const Main: FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let user = getLocalStorageItem("user");
    if (user) {
      AuthService.checkInstance(user.idInstance, user.apiTokenInstance)
        .then((res) => {
          if (res.stateInstance === "authorized") setIsAuth(true);
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuth) {
      navigate(LOGIN_PAGE_ROUTE);
    }
  }, [isLoading, isAuth]);

  if (isLoading || !isAuth) {
    return <FullPageLoader />;
  }
  return (
    <div className={styles.main}>
      <Sidebar />
      <ChatBox />
      <PollingIntegrator />
    </div>
  );
};

export default Main;
