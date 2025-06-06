import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b h-[10vh]">
      {/* Left Side: App Name */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        Chat
      </Link>

      {/* Right Side: User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center gap-2">
              <User size={16} /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => logout()}
            className="text-red-500 focus:text-red-600 flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
