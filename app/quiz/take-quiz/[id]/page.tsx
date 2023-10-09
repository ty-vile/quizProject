import getQuiz from "@/app/actions/getQuiz";
import getUser from "@/app/actions/getUser";
import TakeQuizTable from "./components/TakeQuizTable";
import PageHeading from "@/components/utility/text/PageHeading";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeSingleUserQuiz = async ({ params }: any) => {
  const quiz = await getQuiz(params.id);
  const user = await getUser(quiz?.quiz?.userId!);

  return (
    <>
      <TakeQuizTable
        quiz={quiz?.quiz!}
        questions={quiz?.questions!}
        answers={quiz?.answers!}
        user={user!}
      />
    </>
  );
};

export default TakeSingleUserQuiz;
