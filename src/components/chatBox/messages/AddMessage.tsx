import React, { FC, useState, useRef } from "react";
import styles from "./message.module.scss";
import { IoSendSharp } from "react-icons/io5";
import Input from "../../UI/input/Input";

const AddMessage: FC<{ addMessage: Function }> = ({ addMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitCb = (e: any) => {
    addMessage(message);
    setMessage("");
    inputRef?.current?.focus();
  };
  const handleSubmit = (e: any) => submitCb(e);

  const handleKeyDown = (e: any) => e.key === "Enter" && submitCb(e);

  return (
    <div className={styles.form_wrapper}>
      <Input
        type="text"
        placeholder="Write a message..."
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      >
        <button className={styles.button} onClick={handleSubmit}>
          <IoSendSharp />
        </button>
      </Input>
    </div>
  );
};

export default React.memo(AddMessage);
