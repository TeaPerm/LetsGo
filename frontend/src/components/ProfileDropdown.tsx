import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUser } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const ProfileDropdown = () => {
  const user = useUser();

  const handleLogout = () => {
    localStorage.removeItem("accesToken");
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  if (!user) {
    return (
      <Button
        variant="link"
        className="text-foreground hover:text-foreground/80"
        asChild
      >
        <Link to="/login">Log in</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Logged in as</DropdownMenuLabel>
        <DropdownMenuItem >{user.email}</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/orders">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/" className="cursor-pointer text-foreground/80" onClick={handleLogout}>
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
