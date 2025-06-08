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
      console.log("Message sent:", response.data);
      set({ messages: [...get().messages, response.data] });
    } catch (error) {
      toast.error("Error sending message:", error);
    }
  },

  deleteAllMessages: () => set({ messages: [] }),
}));
