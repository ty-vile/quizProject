// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
import getCurrentUserQuizzes from "@/app/actions/getCurrentUserQuizzes";

// seo
export const metadata = {
  title: "My Quizzes | Quizify",
};

const MyQuizzes = async () => {
  const nonUserQuizzes = await getCurrentUserQuizzes();

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"My Quizzes"} />
      </div>
      <QuizGrid quizzes={nonUserQuizzes} path="/take-quiz" />
    </>
  );
};

export default MyQuizzes;
