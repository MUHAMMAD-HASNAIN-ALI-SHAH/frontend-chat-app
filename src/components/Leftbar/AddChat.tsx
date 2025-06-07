import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Send, File } from "lucide-react";
import { toast } from "react-toastify";

export function AddChat() {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const { findUser, newChat, getChats } = useChatStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = await findUser(username);
    if (foundUser) {
      setUser(foundUser);
      setUsername("");
    } else {
      toast.error("User not found");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = messageRef.current?.value.trim();
    if (!message) return toast.error("Message cannot be empty");

    await newChat(user, message);
    messageRef.current!.value = "";
    setUser(null);
    setOpen(false);
    getChats(); // refresh chat list
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Chat</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Chat</DialogTitle>
          <DialogDescription>
            Enter the username you want to start a chat with.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSearch} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="submit">Search User</Button>
        </form>

        {user && (
          <div className="mt-6">
            <p className="mb-2">
              Send a message to <strong>{user.username}</strong>
            </p>
            <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
              <input
                type="text"
                ref={messageRef}
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter message to send..."
              />
              <div className="flex items-center justify-center rounded-full border border-gray-400 w-12 h-12 cursor-pointer hover:border-gray-600 transition-colors">
                <File />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center rounded-full border border-gray-400 w-12 h-12 cursor-pointer hover:border-gray-600 transition-colors"
              >
                <Send />
              </button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
