"use client";
// prisma
import { User } from "@prisma/client";
// react
import Image from "next/image";
// dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
// toast
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

const UserNavbar: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/dashboard");
    signOut();
  };

  return (
    <div className="bg-background">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={user.image as string}
            alt="User Image"
            height={40}
            width={40}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-6 ">
          <DropdownMenuLabel className="flex flex-col">
            <div className="text-xl font-bold">{user?.name}</div>
            <div className="text-md">{user?.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="">Profile</DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleSignOut()} className="">
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNavbar;
