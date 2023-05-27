import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ChatSlice from "../store/chat/ChatSlice";
import { fetchChat } from "../store/chat/ChatActionCreators";
import { resetApp } from "../store";

const useActions = () => {
  const dispatch: any = useDispatch();
  return bindActionCreators(
    {
      ...ChatSlice.actions,
      fetchChat,
      resetApp,
    },
    dispatch
  );
};

export default useActions;
