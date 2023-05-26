import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Input from "../../components/UI/input/Input";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../api/services/auth.service";
import useRequest from "../../hooks/useRequest";

const Login: FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [idInstance, setIdInstance] = useState<string>("");
  const { fetch, isLoading, error } = useRequest(async () => {
    const res = await AuthService.login(idInstance, token);
    if (res.stateInstance === "authorized") {
      localStorage.setItem(
        "user",
        JSON.stringify({ idInstance, apiTokenInstance: token })
      );

      navigate("/", { replace: true });
    }
  });

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdInstance(e.target.value);
  };
  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.window}>
        <form onSubmit={handleSubmit} className={styles.form} action="">
          <div>
            <label className={styles.label} htmlFor="apiTokenInstance">
              Api token instance
            </label>
            <Input
              name="apiTokenInstance"
              value={token}
              onChange={handleTokenChange}
              placeholder="Введите apiTokenInstance"
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="idInstance">
              Id instance
            </label>
            <Input
              name="idInstance"
              value={idInstance}
              onChange={handleIdChange}
              placeholder="Введите idInstance"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submit_btn}
          >
            Войти
          </button>
        </form>
        <div>
          {" "}
          Для входа в систему небходимы данные инстанса c{" "}
          <a
            target="_blank"
            className={styles.info_anchor}
            href="https://green-api.com/"
          >
            green-api.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
