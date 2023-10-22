// components
import PageHeading from "@/app/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getNotUserQuizzes from "@/app/actions/getNotUser/getNotUserQuizzes";
import getUserTakenQuizzes from "@/app/actions/getUser/getUserTakenQuizzes";
import { filterUniqueTakenQuizzes } from "@/lib/utils";
import EmptyComponent from "@/app/components/empty/EmptyComponent";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeQuiz = async () => {
  const currentUser = await getCurrentUser();
  const userTakenQuizzes = await getUserTakenQuizzes(currentUser?.id!);
  const notUserQuizzes = await getNotUserQuizzes(currentUser?.id!);

  // filters out quizzes already taken by user
  const quizzesToTake = filterUniqueTakenQuizzes(
    notUserQuizzes!,
    userTakenQuizzes
  );

  if (quizzesToTake.length === 0) {
    return <EmptyComponent title="Currently no quizzes to take" />;
  }

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Take Quiz"} />
      </div>
      <QuizGrid quizzes={quizzesToTake!} path="/quiz/take" />
    </>
  );
};

export default TakeQuiz;
