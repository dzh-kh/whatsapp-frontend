import React, { FC, forwardRef } from "react";

import "./input.scss";

const Input: FC<any> = forwardRef<HTMLInputElement, any>(
  ({ children, name, ...props }, ref) => {
    return (
      <div className="input-ui__wrapper">
        {children}
        <input name={name} {...props} ref={ref} className="input-ui__input" />
      </div>
    );
  }
);

export default Input;
