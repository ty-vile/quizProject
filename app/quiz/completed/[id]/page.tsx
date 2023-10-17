// components
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import CompletedQuizTable from "./components/CompletedQuizTable";
// actions
import getSingleQuiz from "@/app/actions/getSingle/getSingleQuiz";
import getSingleUser from "@/app/actions/getSingle/getSingleUser";
import getSingleQuizTake from "@/app/actions/getSingle/getSingleQuizTake";
import getSingleQuizAnswersTake from "@/app/actions/getSingle/getSingleQuizAnswersTake";

// util
import { userIsFollowing } from "@/lib/utils";
import getUserFollowing from "@/app/actions/getUser/getUserFollowing";

// seo
export const metadata = {
  title: "Quiz Results | Quizify",
};

const CompletedUserQuiz = async ({ params }: any) => {
  // GET QUIZ
  let quiz = await getSingleQuiz(params.id);
  // USER THAT CREATED QUIZ
  const createQuizUser = await getSingleUser(quiz?.quiz?.userId!);
  // USER TAKING QUIZ
  const currentUser = await getCurrentUser();
  // GET CURRENT USER'S - FOLLOWING
  const currentUserFollowing = await getUserFollowing(currentUser?.id!);
  // GET COMPLETED TAKE
  const take = await getSingleQuizTake(params.id, currentUser?.id!);
  // GET ANSWERS FROM TAKE
  const takeAnswer = await getSingleQuizAnswersTake(take?.[0].id!);

  const isFollowing = userIsFollowing(currentUserFollowing!, createQuizUser!);

  return (
    <>
      <CompletedQuizTable
        quiz={quiz?.quiz!}
        questions={quiz?.questions!}
        answers={quiz?.answers!}
        user={createQuizUser!}
        takeAnswers={takeAnswer}
        currentUser={currentUser!}
        take={take?.[0]!}
        isFollowing={isFollowing!}
      />
    </>
  );
};

export default CompletedUserQuiz;
