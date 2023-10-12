// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "@/app/quiz/components/QuizGrid";
import getCurrentUserQuizzes from "@/app/actions/getCurrentUserQuizzes";

// seo
export const metadata = {
  title: "In Progress | Quizify",
  description:
    "List of Quizzes that are currently in progress for user to complete",
};

const Compelted = async () => {
  // add action which gets current user quizzes from take where status = 'complete'

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"My Quizzes"} />
      </div>
      {/* <QuizGrid quizzes={nonUserQuizzes} path="/take-quiz" /> */}
    </>
  );
};

export default Compelted;
