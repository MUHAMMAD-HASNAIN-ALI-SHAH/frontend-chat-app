import { useChatStore } from "@/store/useChatStore";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
  const { selectedChat } = useChatStore();
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div
      className={`h-[80%] w-full ${
        selectedChat ? "" : "flex justify-center items-center"
      }`}
    >
      {selectedChat ? (
        <div className="flex flex-col h-full overflow-y-auto p-4">
          <div className="mb-4 self-start flex items-center gap-3">
            <img
              src="/profile-img.webp"
              alt="User Avatar"
              className="w-14 h-14 rounded-full border border-gray-300 mb-2"
            />
            <div>
              <div className="bg-green-500 p-3 rounded-lg shadow-md">
                <p className="text-gray-800">Hello! How are you?</p>
              </div>
              <p>{formatted}</p>
            </div>
          </div>
          <div className="mb-4 self-end flex items-center gap-3">
            <div>
              <div className="bg-blue-500 p-3 rounded-lg shadow-md">
                <p className="text-gray-800">Hello! How are you?</p>
              </div>
              <p>{formatted}</p>
            </div>
            <img
              src="/profile-img.webp"
              alt="User Avatar"
              className="w-14 h-14 rounded-full border border-gray-300 mb-2"
            />
          </div>
        </div>
      ) : (
        <>
          <NoChatSelected />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
