// actions
import getUserQuizzes from "@/app/actions/getUserQuizzes";
// components
import QuizGrid from "../components/QuizGrid";
// fonts
import { bungee } from "@/app/layout";

// seo
export const metadata = {
  title: "My Quizzes | Quizify",
};

const UserQuiz = async () => {
  const userQuizzes = await getUserQuizzes();

  return (
    <>
      <h1
        className={`mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl w-full font-bungee`}
      >
        MY QUIZZES
      </h1>
      <div className="w-full grid grid-cols-1 gap-8">
        <QuizGrid quizzes={userQuizzes} />
      </div>
    </>
  );
};

export default UserQuiz;
