// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "../components/QuizGrid";
import getNonUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";

// seo
export const metadata = {
  title: "My Quizzes | Quizify",
};

const TakeUserQuiz = async () => {
  const nonUserQuizzes = await getNonUserQuizzes();

  return (
    <>
      <PageHeading heading="Select Quiz" />
      <div className="w-full grid grid-cols-1 gap-8">
        <QuizGrid quizzes={nonUserQuizzes} path="/take-quiz" />
      </div>
    </>
  );
};

export default TakeUserQuiz;
