// components
import PageHeading from "@/components/utility/text/PageHeading";

import getNonUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";
import QuizGrid from "@/app/quiz/components/QuizGrid";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeQuiz = async () => {
  const nonUserQuizzes = await getNonUserQuizzes();

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Take Quiz"} />
      </div>
      <QuizGrid quizzes={nonUserQuizzes} path="/quiz/take-quiz" />
    </>
  );
};

export default TakeQuiz;
