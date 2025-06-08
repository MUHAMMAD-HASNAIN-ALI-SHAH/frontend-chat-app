import { useChatStore } from "@/store/useChatStore";
import NoChatSelected from "./NoChatSelected";
import { useMessageStore } from "@/store/useMessageStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const MessageContainer = () => {
  const { selectedChat } = useChatStore();
  const {
    messages,
    getMessages,
    deleteAllMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useMessageStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat._id);
    }
    subscribeToMessages();
    return () => {
      deleteAllMessages();
      unSubscribeFromMessages();
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

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`h-[80%] w-full ${
        selectedChat ? "" : "flex justify-center items-center"
      }`}
    >
      {selectedChat ? (
        <div className="flex flex-col h-full w-full overflow-y-auto p-4 space-y-4 transition-all duration-300 ease-in-out" ref={scrollRef}>
          {messages && messages.length > 0 ? (
            messages.map((message, index) => {
              const isSender = user._id === message.userId;
              return (
                <div
                  key={index}
                  className={`flex items-end gap-3 transition-all duration-300 ease-in-out ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isSender && (
                    <img
                      src="/profile-img.webp"
                      alt="Receiver Avatar"
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                  )}

                  <div className={`max-w-xs flex flex-col space-y-2`}>
                    <div
                      className={`p-3 rounded-lg ${
                        isSender
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="sent"
                          className="w-full max-h-52 rounded mb-2 object-cover"
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                    <span className="text-xs text-gray-500">{formatted}</span>
                  </div>

                  {isSender && (
                    <img
                      src="/profile-img.webp"
                      alt="Sender Avatar"
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 w-full">
              No messages yet.
            </div>
          )}
        </div>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;
