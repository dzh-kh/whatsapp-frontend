import React, { FC, useState, useRef } from "react";
import styles from "./message.module.scss";
import { IoSendSharp } from "react-icons/io5";
import Input from "../../UI/input/Input";

const AddMessage: FC<any> = ({ addMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (event: any) => {
    // event.preventDefault();
    addMessage(message);
    setMessage("");
    inputRef?.current?.focus();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      addMessage(message);
      setMessage("");
      inputRef?.current?.focus();
    }
  };
  // useEffect();

  return (
    <div className={styles.form_wrapper}>
      {/* <form className={styles.add_message_form}> */}
      <Input
        type="text"
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      >
        <button className={styles.button} onClick={handleSubmit}>
          <IoSendSharp />
        </button>
      </Input>
      {/* </form> */}
    </div>
  );
};

export default AddMessage;
