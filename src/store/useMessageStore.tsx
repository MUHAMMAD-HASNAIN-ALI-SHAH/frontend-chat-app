import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";
import { useAuthStore } from "./useAuthStore";
import { toast } from "react-toastify";

export interface Message {
  _id?: string;
  userId: string;
  recieverId: string;
  chatId: string;
  text?: string;
  image?: string;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface MessageState {
  messages: Message[] | [];
  getMessages: (chatId: string) => Promise<void>;
  sendMessage: (text: string, image: string) => Promise<void>;
  deleteAllMessages: () => void;
  subscribeToMessages: () => void;
  unSubscribeFromMessages: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],

  getMessages: async (chatId: string) => {
    try {
      const response = await axiosInstance.get(
        `/message/get-messages/${chatId}`
      );
      set({ messages: response.data.messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },

  sendMessage: async (text: string, image: string) => {
    const { selectedChat } = useChatStore.getState();
    const userId = useAuthStore.getState().user._id;
    if (!selectedChat) return;

    const recieverId =
      selectedChat.secondUserId._id === userId
        ? selectedChat.firstUserId._id
        : selectedChat.secondUserId._id;

    const form = {
      recieverId,
      chatId: selectedChat._id,
      text: text || "",
      image: image || "",
    };

    try {
      const response = await axiosInstance.post("/message/send-message", form);
      set({ messages: [...get().messages, response.data] });
    } catch (error) {
      toast.error("Error sending message:", error);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (message: Message) => {
      const selectedChat = useChatStore.getState().selectedChat;

      if (selectedChat && selectedChat._id === message.chatId) {
        set({
          messages: [...get().messages, message],
        });
      }
    });
  },

  unSubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

  deleteAllMessages: () => set({ messages: [] }),
}));
