import { create } from "zustand";

export interface Message {
  _id?: string;
  userId: string;
  recieverId: string;
  chatId: string;
  text: string;
  image?: string;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface MessageState {
  messages: Message[] | [];
  getMessages: (chatId: string) => Promise<void>;
}

export const useChatStore = create<MessageState>((set, get) => ({}));
