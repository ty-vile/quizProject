// components
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import TakeQuizTable from "./components/TakeQuizTable";
// actions
import getSingleQuiz from "@/app/actions/getSingle/getSingleQuiz";
import getSingleUser from "@/app/actions/getSingle/getSingleUser";
import getCurrentUserFollowing from "@/app/actions/getCurrentUserFollowing";
// utils
import { userIsFollowing } from "@/lib/utils";

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
  // GET CURRENT USER FOLLOWING LIST
  const currentUserFollowing = await getCurrentUserFollowing();

  const isFollowing = userIsFollowing(currentUserFollowing!, createQuizUser!);

  return (
    <>
      <TakeQuizTable
        quiz={quiz?.quiz!}
        questions={quiz?.questions!}
        answers={quiz?.answers!}
        user={createQuizUser!}
        currentUser={currentUser!}
        isFollowing={isFollowing!}
      />
    </>
  );
};

export default TakeSingleUserQuiz;
