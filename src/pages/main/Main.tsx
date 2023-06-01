import React, { FC, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatBox from "../../components/chatBox/ChatBox";
import styles from "./main.module.scss";
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
      setTimeout(() => {
        AuthService.checkInstance(user.idInstance, user.apiTokenInstance)
          .then((res) => {
            console.log(res);
            if (res.stateInstance === "authorized") setIsAuth(true);
          })
          .catch((e) => console.log(e))
          .finally(() => setIsLoading(false));
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuth) {
      console.log(isLoading);
      console.log(isAuth);
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
    </div>
  );
};

export default Main;
