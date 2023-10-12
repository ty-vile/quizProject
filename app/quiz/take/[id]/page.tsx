// components
import getCurrentUser from "@/app/actions/getCurrentUser";
import TakeQuizTable from "./components/TakeQuizTable";
// actions
import getSingleQuiz from "@/app/actions/getSingleQuiz";
import getSingleUser from "@/app/actions/getSingleUser";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeSingleUserQuiz = async ({ params }: any) => {
  const quiz = await getSingleQuiz(params.id);
  // USER THAT CREATED QUIZ
  const createQuizUser = await getSingleUser(quiz?.quiz?.userId!);
  // USER TAKING QUIZ
  const currentUser = await getCurrentUser();

  return (
    <>
      <TakeQuizTable
        quiz={quiz?.quiz!}
        questions={quiz?.questions!}
        answers={quiz?.answers!}
        user={createQuizUser!}
        currentUser={currentUser!}
      />
    </>
  );
};

export default TakeSingleUserQuiz;
