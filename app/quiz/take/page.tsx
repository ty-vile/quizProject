// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
// actions
import getNonCurrentUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeQuiz = async () => {
  const nonUserQuizzes = await getNonCurrentUserQuizzes();

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Take Quiz"} />
      </div>
      <QuizGrid quizzes={nonUserQuizzes} path="/quiz/take" />
    </>
  );
};

export default TakeQuiz;
