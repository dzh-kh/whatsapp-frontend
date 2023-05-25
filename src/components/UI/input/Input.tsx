import React, { FC, forwardRef } from "react";

import "./input.scss";
import IInputProps from "./types";

const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>(
  ({ children, name, errors, ...props }, ref) => {
    return (
      <>
        <div className="input-ui__wrapper">
          {children}
          <input name={name} {...props} ref={ref} className="input-ui__input" />
        </div>
        {/* {name && errors?.[name] && (
          <div className={styles.error}>{errors?.[name]?.message}</div>
        )} */}
      </>
    );
  }
);

export default Input;
