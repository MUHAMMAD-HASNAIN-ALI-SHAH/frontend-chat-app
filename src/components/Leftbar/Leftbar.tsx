import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AddChat } from "./AddChat";

const Leftbar = () => {
  const { getChats, chats, addChat, setSelectedUser, selectedChat } =
    useChatStore();
  const { user, socket } = useAuthStore();

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewChat = (data: { chat: any }) => {
      addChat(data.chat);
    };

    socket.on("new-chat", handleNewChat);

    return () => {
      socket.off("new-chat", handleNewChat);
    };
  }, [socket, addChat]);

  return (
    <div className="w-[25%] h-full overflow-y-auto p-2 flex flex-col gap-3">
      <AddChat />

      

      <div className="overflow-y-auto h-full flex flex-col gap-2">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const otherUser =
              chat.firstUserId.username === user?.username
                ? chat.secondUserId
                : chat.firstUserId;

            return (
              <div
                key={chat._id}
                onClick={() => {
                  setSelectedUser(chat);
                }}
                className={`flex items-center gap-2 p-2 border ${
                  chat === selectedChat ? "bg-gray-300" : ""
                } border-gray-300 hover:bg-gray-300 cursor-pointer transition-colors rounded`}
              >
                <img
                  src={otherUser.profilePic || "https://i.pravatar.cc/150"}
                  alt={otherUser.username}
                  className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{otherUser.username}</span>
                  <span
                    className={`text-sm ${
                      otherUser.status === "online"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {otherUser.status || "offline"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500">No chats found.</div>
        )}
      </div>
    </div>
  );
};

export default Leftbar;
