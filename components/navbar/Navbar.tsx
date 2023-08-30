import getCurrentUser from "@/app/actions/getCurrentUser";
import React from "react";
import Container from "../utility/Container";
import Link from "next/link";

type Props = {};

const Navbar: React.FC<Props> = async () => {
  // const currentUser = await getCurrentUser();

  // if (currentUser) {
  //   return (
  //     <div>
  //       <h1>{currentUser?.name}</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="fixed w-full bg-white z-10 shadow-xl">
      <div className="py-4 border-b border-1">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Link href="">
              <p className="rounded-lg shadow-1 h-translate-1 px-2 py-1 text-xl font-bold border-2  md:block border-black dark:border-white">
                Quizify
              </p>
            </Link>
            <h1>Logo</h1>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
