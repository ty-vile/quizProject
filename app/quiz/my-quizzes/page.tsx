// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getUserQuizzes from "@/app/actions/getUser/getUserQuizzes";

// seo
export const metadata = {
  title: "My Quizzes | Quizify",
};

const MyQuizzes = async () => {
  const currentUser = await getCurrentUser();
  const userQuizzes = await getUserQuizzes(currentUser?.id!);

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"My Quizzes"} />
      </div>
      <QuizGrid quizzes={userQuizzes} path="/quiz/stats/" />
    </>
  );
};

export default MyQuizzes;
