import getQuiz from "@/app/actions/getQuiz";
import getUser from "@/app/actions/getUser";
import { Button } from "@/components/ui/button";
import PageHeading from "@/components/utility/PageHeading";
import SingleQuizHeading from "../../components/single-quiz/SingleQuizHeading";
import TakeQuizTable from "./components/TakeQuizTable";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeSingleUserQuiz = async ({ params }: any) => {
  const quiz = await getQuiz(params.id);
  const user = await getUser(quiz!.quiz!.userId);

  return (
    <>
      <div className="mb-16">
        <SingleQuizHeading
          title={quiz?.quiz?.title!}
          user={user}
          category={quiz?.quiz?.category!}
          createdAt={quiz?.quiz?.createdAt!}
        />
      </div>
      <TakeQuizTable
        quiz={quiz!.quiz}
        questions={quiz!.questions}
        answers={quiz!.answers}
        user={user!}
      />
    </>
  );
};

export default TakeSingleUserQuiz;
