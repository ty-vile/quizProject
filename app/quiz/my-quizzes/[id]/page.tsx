// components
import PageHeading from "@/components/utility/text/PageHeading";
// actions
import StatsQuizTable from "./components/StatsQuizTable";
import getSingleQuiz from "@/app/actions/getSingle/getSingleQuiz";
import getSingleQuizAnswersTake from "@/app/actions/getSingle/getSingleQuizAnswersTake";
import getNotUserSingleQuizTake from "@/app/actions/getSingle/getNotUserSingleQuizTake";
import getNotCurrentUserTakes from "@/app/actions/getNotUser/getNotUserTakes";
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getUserTakes from "@/app/actions/getUser/getUserTakes";

// utils
import {
  calculateAverageScorePercentage,
  calculateUniqueUsersLength,
  filterUniqueTakeAnswersArr,
  filterUniqueTakenQuizzes,
  filterUniqueTakesArr,
} from "@/lib/utils";

const StatsSingleQuiz = async ({ params }: any) => {
  const currentUser = await getCurrentUser();
  // all takes by current user
  const userTakes = await getUserTakes(currentUser?.id!);
  // all takes not by current user
  const notUserTakes = await getNotCurrentUserTakes(currentUser?.id!);
  // this quiz
  const quiz = await getSingleQuiz(params.id);
  // all takes not by current user for this quiz
  const notUserQuizTakes = await getNotUserSingleQuizTake(
    quiz?.quiz?.id!,
    currentUser?.id!
  );
  //

  const takeAnswer = await getSingleQuizAnswersTake();

  // GET DATA FOR QUIZ DATA TAB

  const filteredTakesQuiz = filterUniqueTakesArr(notUserTakes!, [quiz?.quiz!]);

  const filteredTakeAnswers = filterUniqueTakeAnswersArr(
    notUserQuizTakes!,
    takeAnswer!
  );

  const quizAverageScore = calculateAverageScorePercentage(filteredTakesQuiz);

  const uniqueUsersLength = calculateUniqueUsersLength(userTakes);

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={quiz?.quiz?.title!} />
      </div>
      <div>
        <StatsQuizTable
          quiz={quiz?.quiz!}
          questions={quiz?.questions!}
          answers={quiz?.answers!}
          takeAnswers={filteredTakeAnswers}
          quizTakenUniqueUsers={uniqueUsersLength}
          quizTakenTotal={filteredTakesQuiz.length}
          quizAverageScore={quizAverageScore}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2>Your Quizzes</h2>
        {/* <QuizGrid
          quizzes={recentlyCompletedQuizzes!}
          path="/quiz/statistics/"
        /> */}
      </div>
    </>
  );
};

export default StatsSingleQuiz;
