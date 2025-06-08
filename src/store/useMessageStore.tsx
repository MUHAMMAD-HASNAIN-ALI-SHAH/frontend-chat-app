import axiosInstance from "@/lib/axios";
import { create } from "zustand";

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

  deleteAllMessages: () => set({ messages: [] })
}));
