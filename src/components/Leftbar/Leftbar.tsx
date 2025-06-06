const users = [
  {
    id: 1,
    name: "John Doe",
    status: "online",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "offline",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Alice Johnson",
    status: "online",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Bob Brown",
    status: "offline",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Sarah Connor",
    status: "online",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Michael Scott",
    status: "offline",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Dwight Schrute",
    status: "online",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Jim Halpert",
    status: "offline",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

const Leftbar = () => {
  return (
    <div className="w-[25%] h-full overflow-y-auto p-2 flex flex-col gap-3 overflow-hidden">
      <input
        type="text"
        className="w-full border input py-3 px-2"
        placeholder="Search user..."
      />
      <div className="overflow-y-auto h-full">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 p-2 rounded-md mb-2 border"
          >
            {/* Left 30%: Profile Picture */}
            <div className="w-[30%] flex justify-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            {/* Right 70%: Name & Status */}
            <div className="w-[70%]">
              <p className="font-semibold">{user.name}</p>
              <p
                className={`text-sm ${
                  user.status === "online" ? "text-gray-700" : "text-gray-900"
                }`}
              >
                {user.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leftbar;
