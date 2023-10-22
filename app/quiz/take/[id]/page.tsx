// components
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import TakeQuizTable from "./components/TakeQuizTable";
// actions
import getSingleQuiz from "@/app/actions/getSingle/getSingleQuiz";
import getSingleUser from "@/app/actions/getSingle/getSingleUser";

// utils
import { userIsFollowing } from "@/lib/utils";
import getUserFollowing from "@/app/actions/getUser/getUserFollowing";

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
  const currentUserFollowing = await getUserFollowing(currentUser?.id!);

  // console.log("CUF", currentUserFollowing);

  const isFollowing = userIsFollowing(currentUserFollowing!, createQuizUser!);

  console.log("IFCL", isFollowing);

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
