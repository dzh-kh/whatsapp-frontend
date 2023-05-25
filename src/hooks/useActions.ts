import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ChatSlice from "../store/chat/ChatSlice";

const useActions = () => {
  const dispatch: any = useDispatch();
  return bindActionCreators({ ...ChatSlice.actions }, dispatch);
};

export default useActions;
