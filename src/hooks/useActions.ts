import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ChatSlice from "../store/chat/ChatSlice";
import { fetchChat } from "../store/chat/ChatActionCreators";

const useActions = () => {
  const dispatch: any = useDispatch();
  return bindActionCreators({ ...ChatSlice.actions, fetchChat }, dispatch);
};

export default useActions;
