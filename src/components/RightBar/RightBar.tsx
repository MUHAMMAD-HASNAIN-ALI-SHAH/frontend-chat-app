import { useChatStore } from "@/store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";

const RightBar = () => {
  const { selectedChat } = useChatStore();
  return (
    <div className="w-[75%] h-full flex flex-col">
        <ChatHeader />
        <MessageContainer />
        {
          selectedChat && <MessageInput />
        }
    </div>
  );
};

export default RightBar;
