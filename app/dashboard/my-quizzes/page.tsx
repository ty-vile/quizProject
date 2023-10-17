// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getUserQuizzes from "@/app/actions/getUser/getUserQuizzes";
// components
import QuizGrid from "../../quiz/components/QuizGrid";
import PageHeading from "@/components/utility/text/PageHeading";

// seo
export const metadata = {
  title: "My Quizzes | Quizify",
};

const UserQuiz = async () => {
  const currentUser = await getCurrentUser();
  const userQuizzes = await getUserQuizzes(currentUser?.id!);

  return (
    <>
      <PageHeading heading="View your quizzes" />
      <div className="w-full grid grid-cols-1 gap-8">
        <QuizGrid quizzes={userQuizzes} path="/my-quizzes" />
      </div>
    </>
  );
};

export default UserQuiz;
