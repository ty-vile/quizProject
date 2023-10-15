// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "../components/QuizGrid";
// actions
import getCurrentUserCompleteQuizzes from "@/app/actions/getCurrentUserCompleteQuizzes";
import getNonCurrentUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";

// seo
export const metadata = {
  title: "Completed | Quizify",
  description:
    "List of Quizzes that are currently in progress for user to complete",
};

const Completed = async () => {
  const completedQuizzes = await getCurrentUserCompleteQuizzes();
  const nonUserQuizzes = await getNonCurrentUserQuizzes();

  // filters all quizzes NOT by currentUser and returns all completed ones
  const filteredUserCompletedQuizzes = nonUserQuizzes?.filter((userQuiz) => {
    return completedQuizzes?.some(
      (completedQuiz) => completedQuiz.quizId === userQuiz.id
    );
  });

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Completed Quizzes"} />
      </div>
      <QuizGrid
        quizzes={filteredUserCompletedQuizzes!}
        path="/quiz/completed"
      />
    </>
  );
};

export default Completed;
