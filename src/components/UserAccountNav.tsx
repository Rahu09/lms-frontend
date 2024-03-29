import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { Gem } from "lucide-react";
import { Link } from "react-router-dom";

interface UserAccountNavProps {
  email: string | undefined;
  name: string;
  imageUrl: string;
}

const UserAccountNav = ({ email, imageUrl, name }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow;-visible">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <div className="relative ">
            {imageUrl.length > 0 ? (
              <div className="relative aspect-square h-full w-full">
                <img
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div>
                <span className="sr-only">{name}</span>
                <Icons.user className="h-4 w-4 " />
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="font-medium text-sm text-black"> {name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-zinc-700">
                {" "}
                {email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/pricing">
            Upgrade <Gem className="text-blue-600 h-4 w-4 ml-1.5" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Link to={"/"}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
