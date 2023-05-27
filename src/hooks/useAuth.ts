import { useState } from "react";
import { AuthService } from "../api/services/auth.service";
import { useEffect } from "react";
import useRequest from "./useRequest";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const { isLoading, fetch } = useRequest(async () => {
  //   let user = localStorage.getItem("user");
  //   if (user) {
  //     console.log(isLoading);
  //     let userData = JSON.parse(user);
  //     const res = await AuthService.login(
  //       userData.idInstance,
  //       userData.apiTokenInstance
  //     );
  //     res.stateInstance === "authorized" ? setIsAuth(true) : null;
  //   }
  // });
  // useEffect(() => {
  //   fetch();
  // }, []);
  useEffect(() => {
    // setIsLoading(true);
    let user = localStorage.getItem("user");
    if (user) {
      let userData = JSON.parse(user);
      AuthService.login(userData.idInstance, userData.apiTokenInstance)
        .then((res) => setIsAuth(res.stateInstance === "authorized"))
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    }
  }, []);
  return { isAuth, isLoading };
};
