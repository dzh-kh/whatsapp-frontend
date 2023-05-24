import { IChat } from "../../../types/chat.interface";

// export interface IContactsProps {
//   setCurrentChat: React.Dispatch<React.SetStateAction<number>>;
//   currentChat: number;
//   contacts: IChat[];
//   updateChatCheckedTime: Function;
// }

export interface IChatProps {
  chatData: IChat;
  handleClick: Function;
  currentChat: string;
}
