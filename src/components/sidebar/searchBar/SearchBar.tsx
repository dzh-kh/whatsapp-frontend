import React, { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./searchBar.module.scss";
import Input from "../../UI/input/Input";
import InputMask from "react-input-mask";
import { useAppSelector, useActions } from "../../../hooks";
import getChatId from "../../../utils/functions/getChatId";

const SearchBar: FC = () => {
  const [number, setNumber] = useState("");
  const chats = useAppSelector((state) => state.chat.chats);
  const { fetchChat } = useActions();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const searchCb = (e: any) => {
    const phone = number.replace(/[^0-9]/g, "");
    const chatId = getChatId(phone);

    const isChatExist = chats.filter((chat) => chat.chatId === chatId);
    if (chatId.length >= 16 && !isChatExist.length) {
      setNumber("");
      fetchChat(chatId);
    }
  };

  const handleClick = (e: React.MouseEvent<SVGAElement>) => searchCb(e);

  const handleKeyDown = (e: any) => e.key === "Enter" && searchCb(e);

  return (
    <div className={styles.wrapper}>
      <InputMask
        mask="+7 (999) 999-99-99"
        value={number}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      >
        {(inputProps: any) => (
          <Input {...inputProps} placeholder="Введите номер телефона">
            <FaSearch onClick={handleClick} />
          </Input>
        )}
      </InputMask>
    </div>
  );
};

export default SearchBar;
