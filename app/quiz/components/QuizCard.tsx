"use client";

// next
import Link from "next/link";
// functions
import { formatDate } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";

type Props = {
  title: string;
  score: number;
  category: string;
  id: string;
  createdAt: Date;
  userId: string;
  path: string;
  user: User;
};

const QuizCard: React.FC<Props> = ({
  title,
  score,
  category,
  id,
  createdAt,
  path,
  user,
}) => {
  return (
    <Link
      href={`${path}/${id}`}
      className={`flex flex-col gap-2  rounded-lg shadow-1 h-translate-1 p-4 text-xl font-bold border-2 border-black dark:border-white font-bungee w-full md:w-9/12 grow h-fit`}
    >
      <div className="w-full flex flex-wrap justify-between">
        <div className="flex flex-col gap-2">
          <h5 className="text-sm border-2 border-primary rounded-lg px-4 py-2 pt-3 w-fit font-light font-josefin ">
            {category}
          </h5>
          <h2 className="text-2xl text-primary dark:text-white mt-2">
            {title}
          </h2>
          <h5 className="font-light text-sm font-josefin">{`Questions: ${score}`}</h5>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={user.image!}
            height={40}
            width={40}
            alt="User Profile"
            className="rounded-full"
          />
          <h5 className="text-sm font-josefin font-light">
            {formatDate(createdAt)}
          </h5>
        </div>
      </div>
      {/* <div className="w-full flex items-center flex-wrap justify-between">
        <h5 className="text-sm border-2 border-primary rounded-lg px-4 py-2 pt-3 w-fit font-light font-josefin ">
          {category}
        </h5>
        <div className="flex flex-col gap-2">
          <Image src={user.image!} height={40} width={40} alt="User Profile" />
          <h5 className="text-sm font-josefin">{formatDate(createdAt)}</h5>
        </div>
      </div>
      <h2 className="text-2xl text-primary dark:text-white mt-2">{title}</h2>
      <h5 className="font-light text-sm font-josefin">{`Questions: ${score}`}</h5> */}
    </Link>
  );
};

export default QuizCard;
