import { useState } from "react";
import { AuthService } from "../api/services/auth.service";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  let user = localStorage.getItem("user");

  if (user) {
    const userData = JSON.parse(user);
    AuthService.login(userData.idInstance, userData.apiTokenInstance).then(
      (res) => (res.stateInstance === "authorized" ? setIsAuth(true) : null)
    );
    return isAuth;
  }
  return isAuth;
};

// export const useAuth = () => {
//   let user = localStorage.getItem("user");
//   if (!user) return false;
//   const userData = JSON.parse(user);
//   if (userData.idInstance && userData.apiTokenInstance) return true;
// };
