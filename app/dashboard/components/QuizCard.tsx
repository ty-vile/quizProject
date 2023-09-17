"use client";

// next
import Link from "next/link";
// functions
import { formatDate } from "@/lib/utils";

type Props = {
  title: string;
  score: number;
  category: string;
  id: string;
  createdAt: Date;
  userId: string;
  path: string;
};

const QuizCard: React.FC<Props> = ({
  title,
  score,
  category,
  id,
  createdAt,
  path,
}) => {
  return (
    <Link
      href={`/dashboard/${path}/${id}`}
      className={`flex flex-col gap-2  rounded-lg shadow-1 h-translate-1 p-4 text-xl font-bold border-2 border-black dark:border-white font-bungee`}
    >
      <div className="w-full flex items-center flex-wrap justify-between">
        <h5 className="text-sm border-2 border-primary rounded-lg px-4 py-2 pt-3 w-fit font-light font-josefin ">
          {category}
        </h5>
        <h5 className="text-sm font-josefin">{formatDate(createdAt)}</h5>
      </div>
      <h2 className="text-2xl text-primary dark:text-white mt-2">{title}</h2>
      <h5 className="font-light text-sm font-josefin">{`Questions: ${score}`}</h5>
    </Link>
  );
};

export default QuizCard;
