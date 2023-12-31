// components
import PageHeading from "@/app/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getUserQuizzes from "@/app/actions/getUser/getUserQuizzes";
import EmptyComponent from "@/app/components/empty/EmptyComponent";

// seo
export const metadata = {
  title: "My Quizzes | Quizify",
};

const MyQuizzes = async () => {
  const currentUser = await getCurrentUser();
  const userQuizzes = await getUserQuizzes(currentUser?.id!);

  if (userQuizzes === undefined || userQuizzes === null) {
    return <EmptyComponent title="You have not completed any quizzes!" />;
  }

  if (userQuizzes?.length === 0) {
    return <EmptyComponent title="You haven't created any Quizzes" />;
  }

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"My Quizzes"} />
      </div>
      <QuizGrid quizzes={userQuizzes} path="/quiz/my-quizzes/" />
    </>
  );
};

export default MyQuizzes;
