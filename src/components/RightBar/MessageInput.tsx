import { useMessageStore } from "@/store/useMessageStore";
import { File, Send, X } from "lucide-react";
import { useState, useRef } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const fileInputRef = useRef(null);
  const { sendMessage } = useMessageStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageBase64(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !imageBase64) return;

    sendMessage(message.trim() || "", imageBase64 || "");

    setMessage("");
    setImageBase64("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setImageBase64("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-[10%] w-full">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 h-full justify-center items-center px-3 relative"
      >
        {imageBase64 && (
          <div className="absolute bottom-[110%] left-3 bg-white p-2 rounded-md shadow-md flex items-center gap-2 max-w-[200px]">
            <img
              src={imageBase64}
              alt="preview"
              className="w-16 h-16 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={removeImage}
              className="text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </div>
        )}

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter message to send..."
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="image-upload"
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center rounded-full border border-gray-400 w-12 h-12 cursor-pointer hover:border-gray-600 transition-colors"
        >
          <File />
        </label>

        <button
          type="submit"
          className="flex items-center justify-center rounded-full border border-gray-400 w-12 h-12 cursor-pointer hover:border-gray-600 transition-colors"
        >
          <Send />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
