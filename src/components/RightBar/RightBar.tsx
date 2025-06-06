import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";

const RightBar = () => {
  return (
    <div className="w-[75%] h-full flex flex-col">
        <ChatHeader />
        <MessageContainer />
        <MessageInput />
    </div>
  );
};

export default RightBar;
