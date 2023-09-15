// next
import Link from "next/link";
// fonts
import { bungee } from "@/app/layout";
// functions
import { formatDate } from "@/lib/utils";

type Props = {
  title: string;
  score: number;
  category: string;
  id: string;
  createdAt: Date;
};

const QuizCard: React.FC<Props> = ({
  title,
  score,
  category,
  id,
  createdAt,
}) => {
  // Example usage:

  return (
    <Link
      href={`/dashboard/my-quizzes/${id}`}
      className={`flex flex-col gap-2  rounded-lg shadow-1 h-translate-1 p-4 text-xl font-bold border-2 border-black dark:border-white  ${bungee.className}`}
    >
      <div className="w-full flex items-center flex-wrap justify-between">
        <h5 className="text-sm border-2 border-primary rounded-lg px-2 py-1 w-fit font-light">
          {category}
        </h5>
        <h5>{formatDate(createdAt)}</h5>
      </div>

      <h2 className="text-2xl text-primary dark:text-white">{title}</h2>
      <h5 className="font-light text-sm">{`Questions: ${score}`}</h5>
    </Link>
  );
};

export default QuizCard;
