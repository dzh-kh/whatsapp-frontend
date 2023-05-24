import React, { FC, forwardRef } from "react";

import styles from "./input.module.scss";
import IInputProps from "./types";

const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
  ({ children, name, errors, ...props }, ref) => {
    return (
      <>
        <div className={styles.inputWrapper}>
          {children}
          <input name={name} {...props} ref={ref} className={styles.input} />
        </div>
        {name && errors?.[name] && (
          <div className={styles.error}>{errors?.[name]?.message}</div>
        )}
      </>
    );
  }
);

export default Input;
