import getQuiz from "@/app/actions/getQuiz";
import getUser from "@/app/actions/getUser";
import PageHeading from "@/components/utility/PageHeading";

// seo
export const metadata = {
  title: "Take Quiz | Quizify",
};

const TakeSingleUserQuiz = async ({ params }: any) => {
  const quiz = await getQuiz(params.id);
  const user = await getUser(quiz!.quiz!.userId);

  return (
    <>
      <PageHeading heading={quiz!.quiz!.title} />
      <div>ABC</div>
      <div>CDE</div>
    </>
  );
};

export default TakeSingleUserQuiz;
