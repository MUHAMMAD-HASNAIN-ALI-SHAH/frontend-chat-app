import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { create } from "zustand";

interface User {
  _id?: string;
  fullName?: string;
  profilePic?: string;
  email: string;
  password?: string;
}

interface AuthStore {
  user: User | null;
  authButtonLoader: boolean;
  signin: (userData: User) => Promise<number>;
  signup: (userData: User) => Promise<number>;
  profileUpdate: (profilePic: string) => void;
  verify: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  authButtonLoader: false,
  onlineUsers: [],

  signin: async (userData) => {
    try {
      set({ authButtonLoader: true });
      const response = await axiosInstance.post("/auth/login", userData);
      set({ user: response.data });
      set({ isAuthenticated: true });
      toast.success("Login successful!");
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
      return 1;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
      return 0;
    } finally {
      set({ authButtonLoader: false });
    }
  },

  profileUpdate: async (profilePic) => {
    try {
      const userData = {
        profilePic: profilePic,
      };
      console.log("userData", userData);
      set({ authButtonLoader: true });
      const response = await axiosInstance.put(
        "/auth/update-profile",
        userData
      );
      set({ user: response.data });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Update failed. Please try again."
      );
    } finally {
      set({ authButtonLoader: false });
    }
  },

  verify: async () => {
    try {
      const response = await axiosInstance.get("/auth/verify");
      set({ user: response.data });
      set({ isAuthenticated: true });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Verification failed. Please try again."
      );
    }
  },

  logout: () => {
    try {
      set({ user: null });
      set({ isAuthenticated: false });
      axiosInstance.get("/auth/logout");
      toast.success("Logout successful!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  },
}));
