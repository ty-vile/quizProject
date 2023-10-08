import getCurrentUser from "@/app/actions/getCurrentUser";
import React from "react";
import Container from "../utility/Container";
import Link from "next/link";
import SignInButton from "./SignInButton";
import UserNavbar from "./User/UserNavbar";
import { ModeToggle } from "./ToggleTheme";

type Props = {};

const Navbar: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full z-50 shadow-xl bg-background transition-300">
      <div className="z-100 py-4 border-b border-1">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Link href="/dashboard">
              <p className="rounded-lg shadow-1 h-translate-1 px-2 py-1 text-xl font-bold border-2 border-black dark:border-white md:block">
                Quizify
              </p>
            </Link>
            <div className="flex items-center gap-4">
              <ModeToggle />
              {!currentUser ? (
                <div className="flex items-center">
                  <SignInButton text="Sign In" />
                </div>
              ) : (
                <UserNavbar user={currentUser} />
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
