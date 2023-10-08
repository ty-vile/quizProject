// actions
import getUserQuizzes from "@/app/actions/getCurrentUserQuizzes";
// components
import QuizGrid from "../../quiz/components/QuizGrid";
// fonts
import PageHeading from "@/components/utility/text/PageHeading";

// seo
export const metadata = {
  title: "My Quizzes | Quizify",
};

const UserQuiz = async () => {
  const userQuizzes = await getUserQuizzes();

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
