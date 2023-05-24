import { ReactElement } from "react";
import { ChangeEventHandler, FocusEventHandler } from "react";
import { IconType } from "react-icons";

export default interface IInputProps {
  placeholder?: string;
  name?: string;
  errors?: any;
  type?: string;
  children?: ReactElement<IconType>;
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  props?: any;
  ref?: any;
}
