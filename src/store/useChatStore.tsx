import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { useMessageStore } from "./useMessageStore";

interface User {
  _id: string;
  username: string;
  profilePic: string;
  email: string;
  password?: string;
}

interface Chat {
  _id?: string;
  firstUserId: User;
  secondUserId: User;
  isBlocked?: boolean;
  lastMessageTime?: Date;
  lastMessage?: string;
  unseenMessagesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ChatState {
  chats: Chat[] | [];
  selectedChat: Chat | null;
  findUser: (username: string) => Promise<User | null>;
  newChat: (recieverUser: User, message: string) => void;
  getChats: () => void;
  addChat: (chat: Chat) => void;
  setSelectedUser: (chat: Chat) => void;
  removeSelectedUser: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chatData: null,
  chats: [],
  selectedChat: null,

  addChat: (chat) => {
    const existing = get().chats;
    set({ chats: [chat, ...existing] });
  },

  findUser: async (username: string) => {
    try {
      const form = {
        username,
      };
      const response = await axiosInstance.post(`/chat/find-user`, form);
      return response.data.user as User;
    } catch (error) {
      toast.error("User not found");
      return null;
    }
  },

  newChat: async (recieverUser: User, message: string) => {
    try {
      const form = {
        recieverId: recieverUser._id,
        message,
      };
      await axiosInstance.post(`/chat/new-chat`, form);
      toast.success("Message send successfully");
      get().getChats();
    } catch (error) {
      toast.error("Failed to create chat");
      console.error("Error creating chat:", error);
    }
  },

  getChats: async () => {
    try {
      const response = await axiosInstance.get(`/chat/get-chats`);
      set({ chats: response.data.chats });
    } catch (error) {
      toast.error("Failed to fetch chats");
    }
  },

  setSelectedUser: (chat) => {
    set({ selectedChat: chat });
  },
  removeSelectedUser: () => {
    set({ selectedChat: null });
  },
}));
