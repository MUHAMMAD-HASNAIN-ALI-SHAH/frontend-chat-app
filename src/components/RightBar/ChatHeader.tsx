import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const ChatHeader = () => {
  const { selectedChat } = useChatStore();
  const { user } = useAuthStore();
  return (
    <>
      {selectedChat && (
        <div className="h-[10%] w-full border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <img
                src="/profile-img.webp"
                alt="User Avatar"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div className="font-semibold flex flex-col justify-evenly">
                <span>{selectedChat.firstUserId._id === user._id ? selectedChat.secondUserId.username : selectedChat.firstUserId.username}</span>
                <span>Online</span>
              </div>
            </div>
            <button className=" bg-red-500 px-4 py-2 rounded hover:bg-red-400">
              Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
