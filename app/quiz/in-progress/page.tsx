// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
// actions
import getNotUserQuizzes from "@/app/actions/getNotUser/getNotUserQuizzes";
import getUserInProgressQuizzes from "@/app/actions/getUser/getUserInProgressQuizzes";
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";

// seo
export const metadata = {
  title: "In Progress | Quizify",
  description:
    "List of Quizzes that are currently in progress for user to complete",
};

const InProgress = async () => {
  const currentUser = await getCurrentUser();
  const inProgressQuizzes = await getUserInProgressQuizzes(currentUser?.id!);
  const nonUserQuizzes = await getNotUserQuizzes(currentUser?.id!);

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
