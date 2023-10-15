// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
// actions
import getNonCurrentUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";
import getCurrentUserTakenQuizzes from "@/app/actions/getCurrentUserTakenQuizzes";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeQuiz = async () => {
  const nonUserQuizzes = await getNonCurrentUserQuizzes();
  const userTakenQuizzes = await getCurrentUserTakenQuizzes();

  // filters out quizzes already taken by user
  const filteredUserQuizzes = nonUserQuizzes?.filter((userQuiz) => {
    return !userTakenQuizzes?.some(
      (userTakenQuiz) => userTakenQuiz.quizId === userQuiz.id
    );
  });
  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Take Quiz"} />
      </div>
      <QuizGrid quizzes={filteredUserQuizzes!} path="/quiz/take" />
    </>
  );
};

export default TakeQuiz;
