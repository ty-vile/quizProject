// actions
import getUserQuizzes from "@/app/actions/getCurrentUserQuizzes";
// components
import QuizGrid from "../components/QuizGrid";
// fonts
import { bungee } from "@/app/layout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PageHeading from "@/components/utility/PageHeading";

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
