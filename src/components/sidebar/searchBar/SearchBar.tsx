import React, { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./searchBar.module.scss";
import Input from "../../UI/input/Input";
import useActions from "../../../hooks/useActions";

const SearchBar: FC = () => {
  const [number, setNumber] = useState("");
  const [validationError, setValidationError] = useState<string | null>();
  const { fetchChat } = useActions();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };
  const hadleClick = (e: React.MouseEvent<SVGAElement>) => {
    const id = number.replace(/[^0-9]/g, "");
    if (id.length < 11) {
      setValidationError("Введите полный номер");
    } else {
      setValidationError("");
      setNumber("");
      fetchChat(id);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      const id = number.replace(/[^0-9]/g, "");
      if (id.length < 11) {
        setValidationError("Введите полный номер");
      } else {
        setValidationError("");
        setNumber("");
        fetchChat(id);
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <Input
        onKeyDown={handleKeyDown}
        placeholder="Ввведите номер телефона"
        value={number}
        onChange={handleChange}
        error={validationError}
      >
        <FaSearch onClick={hadleClick} />
      </Input>
    </div>
  );
};

export default SearchBar;
