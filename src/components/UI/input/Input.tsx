import React, { FC, forwardRef } from "react";

import "./input.scss";
import IInputProps from "./types";

const Input: FC<any> = forwardRef<HTMLInputElement, IInputProps>(
  ({ children, name, error, ...props }, ref) => {
    return (
      <>
        <div className="input-ui__wrapper">
          {children}
          <input name={name} {...props} ref={ref} className="input-ui__input" />
        </div>
        {error && <div className="input-ui__error">{error}</div>}
      </>
    );
  }
);

export default Input;
