import Link from "next/link";
import { bungee } from "@/app/layout";

type Props = {
  title: string;
  score: number;
  category: string;
  id: string;
};

const QuizCard: React.FC<Props> = ({ title, score, category, id }) => {
  return (
    <Link
      href={`/dashboard/my-quizzes/${id}`}
      className={`flex flex-col rounded-lg shadow-1 h-translate-1 p-4 text-xl font-bold border-2 border-black dark:border-white md:block ${bungee.className}`}
    >
      <h3 className="text-xl text-primary dark:text-white">{title}</h3>
    </Link>
  );
};

export default QuizCard;
