// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "../components/QuizGrid";
// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getUserCompleteQuizzes from "@/app/actions/getUser/getUserCompleteQuizzes";
import getNotUserQuizzes from "@/app/actions/getNotUser/getNotUserQuizzes";
import {
  filterUniqueCompletedQuizzes,
  filterUniqueTakenQuizzes,
} from "@/lib/utils";
import EmptyComponent from "@/components/empty/EmptyComponent";

// seo
export const metadata = {
  title: "Completed | Quizify",
  description:
    "List of Quizzes that are currently in progress for user to complete",
};

const Completed = async () => {
  const currentUser = await getCurrentUser();
  const userCompletedQuizzes = await getUserCompleteQuizzes(currentUser?.id!);
  const notUserQuizzes = await getNotUserQuizzes(currentUser?.id!);

  const completedQuizzes = filterUniqueCompletedQuizzes(
    notUserQuizzes!,
    userCompletedQuizzes
  );

  if (completedQuizzes.length === 0) {
    return <EmptyComponent title="You have not completed any quizzes!" />;
  }

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Completed Quizzes"} />
      </div>
      <QuizGrid quizzes={completedQuizzes!} path="/quiz/completed" />
    </>
  );
};

export default Completed;
