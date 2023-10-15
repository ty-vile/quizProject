// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
import getCurrentUserQuizzes from "@/app/actions/getCurrentUserQuizzes";
import getCurrentUserInProgressQuizzes from "@/app/actions/getCurrentUserInProgressQuizzes";
import getNonCurrentUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";

// seo
export const metadata = {
  title: "In Progress | Quizify",
  description:
    "List of Quizzes that are currently in progress for user to complete",
};

const InProgress = async () => {
  const inProgressQuizzes = await getCurrentUserInProgressQuizzes();
  const nonUserQuizzes = await getNonCurrentUserQuizzes();

  // filters all quizzes NOT by currentUser and returns all completed ones
  const filteredUserInProgressQuizzes = nonUserQuizzes?.filter((userQuiz) => {
    return inProgressQuizzes?.some(
      (inProgressQuiz) => inProgressQuiz.quizId === userQuiz.id
    );
  });

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Completed Quizzes"} />
      </div>
      <QuizGrid quizzes={filteredUserInProgressQuizzes!} path="/take" />
    </>
  );
};

export default InProgress;
