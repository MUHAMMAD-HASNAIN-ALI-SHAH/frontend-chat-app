const ChatHeader = () => {
  return (
    <div className="h-[10%] w-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img
            src="/profile-img.webp"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
          <div className="font-semibold flex flex-col justify-evenly">
            <span>Chat Title</span>
            <span>Online</span>
          </div>
        </div>
        <button className=" bg-red-500 px-4 py-2 rounded hover:bg-red-400">
          Settings
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
