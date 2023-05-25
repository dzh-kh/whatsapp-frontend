import React, { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./searchBar.module.scss";
import { ChatService } from "../../../api/services/chat.service";

import Input from "../../UI/input/Input";
const SearchBar: FC = () => {
  const [number, setNumber] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNumber(e.target.value.replace(/[^0-9]/g, ""));
  const hadleClick = (e: React.MouseEvent<SVGAElement>) => {
    const chat = ChatService.getChatInfo(number).then((res) => {});
  };
  return (
    <div className={styles.wrapper}>
      <Input
        placeholder="Ввведите номер телефона"
        value={number}
        onChange={handleChange}
      >
        <FaSearch onClick={hadleClick} />
      </Input>
    </div>
  );
};

export default SearchBar;
