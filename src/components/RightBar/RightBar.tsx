import { useChatStore } from "@/store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";

const RightBar = () => {
  const { selectedChat } = useChatStore();
  return (
    <>
      <ChatHeader />
      <MessageContainer />
      {selectedChat && <MessageInput />}
    </>
  );
};

export default RightBar;
