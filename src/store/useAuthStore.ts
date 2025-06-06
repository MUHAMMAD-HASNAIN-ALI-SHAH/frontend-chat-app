import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:8080";

interface User {
  _id?: string;
  username?: string;
  profilePic?: string;
  email: string;
  password?: string;
}

interface AuthStore {
  user: User | null;
  authButtonLoader: boolean;
  profilePicLoader: boolean;
  signin: (userData: User) => Promise<number>;
  signup: (userData: User) => Promise<number>;
  profileUpdate: (profilePic: string) => void;
  verify: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  authButtonLoader: false,
  onlineUsers: [],
  socket: null,
  profilePicLoader: false,

  signin: async (userData) => {
    try {
      set({ authButtonLoader: true });
      const response = await axiosInstance.post("/auth/login", userData);
      set({ user: response.data });
      set({ isAuthenticated: true });
      toast.success("Login successful!");
      get().connectSocket();
      return 1;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      return 0;
    } finally {
      set({ authButtonLoader: false });
    }
  },

  signup: async (userData) => {
    try {
      set({ authButtonLoader: true });
      const response = await axiosInstance.post("/auth/register", userData);
      set({ user: response.data });
      set({ isAuthenticated: true });
      toast.success("Registration successful!");
      get().connectSocket();
      return 1;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      return 0;
    } finally {
      set({ authButtonLoader: false });
    }
  },

  profileUpdate: async (profilePic) => {
    try {
      set({ profilePicLoader: true });
      const userData = {
        profilePic: profilePic,
      };
      console.log("userData", userData);
      const response = await axiosInstance.put(
        "/auth/update-profile",
        userData
      );
      set({ user: response.data });
      toast.success("Profile updated successfully!");
      set({ profilePicLoader: false });
    } catch (error: any) {
      set({ profilePicLoader: false });
      toast.error(
        error.response?.data?.message || "Update failed. Please try again."
      );
    } finally {
      set({ profilePicLoader: false });
    }
  },

  verify: async () => {
    try {
      const response = await axiosInstance.get("/auth/verify");
      set({ user: response.data });
      set({ isAuthenticated: true });
      get().connectSocket();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  },

  logout: () => {
    try {
      set({ user: null });
      set({ isAuthenticated: false });
      axiosInstance.get("/auth/logout");
      toast.success("Logout successful!");
      get().disconnectSocket();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  },

  connectSocket: () => {
    try {
      const user = get().user;

      if (user && get().socket?.connect) return;

      const socket: Socket = io(BASE_URL, {
        query: {
          userId: user?._id,
        },
      });

      set({ socket });

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });
    } catch (error) {
      console.log(error);
    }
  },

  disconnectSocket: () => {
    if (get().socket) {
      get().socket.disconnect();
      console.log("Socket disconnected");
    }
  },
}));
