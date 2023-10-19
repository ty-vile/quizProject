// components
import PageHeading from "@/components/utility/text/PageHeading";
import UserGrid from "./components/UserGrid";
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
  filterUniqueTakesArr,
  mapUserQuizData,
} from "@/lib/utils";

export type ExtendedQuizTakenUser = {
  score: number;
  maxScore: number;
  quizTakenAt: Date;
  name: string;
  image: string;
  id: string;
};

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

  const mappedUserQuizData = await mapUserQuizData(notUserQuizTakes!);

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
      {mappedUserQuizData && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 lg:gap-0 mt-10 pb-10 pt-10">
            <div className="pb-10">
              <PageHeading heading={"Users who took quiz"} />
            </div>
            <UserGrid users={mappedUserQuizData!} />
          </div>
        </div>
      )}
    </>
  );
};

export default StatsSingleQuiz;
