import { useChatStore } from "@/store/useChatStore";
import NoChatSelected from "./NoChatSelected";
import { useMessageStore } from "@/store/useMessageStore";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const MessageContainer = () => {
  const { selectedChat, removeSelectedUser } = useChatStore();
  const { messages, getMessages, deleteAllMessages } = useMessageStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat._id);
    }
    return () => {
      deleteAllMessages();
    };
  }, [selectedChat, getMessages]);

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
          {messages && messages.length > 0 ? (
            messages.map((message,index) => (
              <div key={index} className={`mb-4 ${user._id === message.userId ? "self-end" : "self-start"} flex items-center gap-3`}>
                <img
                  src="/profile-img.webp"
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full border border-gray-300 mb-2"
                />
                <div>
                  <div className="bg-green-500 p-3 rounded-lg shadow-md">
                    <p className="text-gray-800">{message.text}</p>
                  </div>
                  <p>{formatted}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No messages yet.</div>
          )}
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
