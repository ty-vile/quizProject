// actions
import getUserQuizzes from "@/app/actions/getUserQuizzes";
// components
import QuizCard from "./components/QuizCard";
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
        className={`mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl w-full ${bungee.className}`}
      >
        MY QUIZZES
      </h1>
      <div className="w-full grid grid-cols-1 gap-8">
        {userQuizzes?.map((quiz, i) => {
          const { title, createdAt, updatedAt, category, score, id } = quiz;

          return (
            <QuizCard
              key={id}
              id={id}
              title={title}
              category={category}
              score={score}
              createdAt={createdAt}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserQuiz;
