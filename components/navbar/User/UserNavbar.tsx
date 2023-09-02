"use client";
import { User } from "@prisma/client";
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

type Props = {
  user: User;
};

const UserNavbar: React.FC<Props> = ({ user }) => {
  return (
    <>
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

          <DropdownMenuItem onClick={() => signOut()} className="">
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserNavbar;
