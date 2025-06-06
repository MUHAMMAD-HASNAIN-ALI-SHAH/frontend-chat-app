import { File, Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="h-[10%] w-full">
      <form
        action=""
        className="flex gap-2 h-full justify-center items-center px-3"
      >
        <input
          type="text"
          className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter message to send..."
        />
        <div className="flex items-center justify-center rounded-full border border-gray-400 w-12 h-12 cursor-pointer hover:border-gray-600 transition-colors">
          <File className="" />
        </div>
        <div className="flex items-center justify-center rounded-full border border-gray-400 w-12 h-12 cursor-pointer hover:border-gray-600 transition-colors">
          <Send className="" />
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
