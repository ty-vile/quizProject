// components
import PageHeading from "@/components/utility/text/PageHeading";
import { Button } from "@/components/ui/button";
import ProfileQuizData from "../components/ProfileQuizData";
import QuizGrid from "@/app/quiz/components/QuizGrid";
// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getUserCompleteQuizzes from "@/app/actions/getUser/getUserCompleteQuizzes";
import getUserQuizzes from "@/app/actions/getUser/getUserQuizzes";
import getUserTakes from "@/app/actions/getUser/getUserTakes";
import getNotUserQuizzes from "@/app/actions/getNotUser/getNotUserQuizzes";
import getNotCurrentUserTakes from "@/app/actions/getNotUser/getNotUserTakes";
// utils
import {
  calculateAverageScorePercentage,
  calculateUniqueUsersLength,
  filterUniqueCompletedQuizzes,
  filterUniqueTakesArr,
} from "@/lib/utils";
// react
import Link from "next/link";
import getSingleUser from "@/app/actions/getSingle/getSingleUser";

const UserProfile = async ({ params }: any) => {
  const quizUser = await getSingleUser(params.id);
  const userCompletedQuizzes = await getUserCompleteQuizzes(quizUser?.id!);
  const userQuizzes = await getUserQuizzes(quizUser?.id!);
  const userTakes = await getUserTakes(quizUser?.id!);
  const notUserQuizzes = await getNotUserQuizzes(quizUser?.id!);
  const notUserTakes = await getNotCurrentUserTakes(quizUser?.id!);

  // GET DATA FOR MY QUIZZES TAB

  const filteredTakesNonCurrentUser = filterUniqueTakesArr(
    notUserTakes!,
    userQuizzes!
  );

  const notUserAverageScorePercentage = calculateAverageScorePercentage(
    filteredTakesNonCurrentUser
  );

  // GET DATA FOR QUIZZES TAKEN TAB

  const filteredTakesCurrentUser = filterUniqueTakesArr(
    userTakes!,
    notUserQuizzes!
  );

  const userAverageScorePercentage = calculateAverageScorePercentage(
    filteredTakesCurrentUser
  );

  const uniqueUsersLength = calculateUniqueUsersLength(userTakes);

  // GET DATA FOR RECENTLY COMPLETED QUIZZES

  const recentlyCompletedQuizzes = filterUniqueCompletedQuizzes(
    notUserQuizzes!,
    userCompletedQuizzes
  );

  const displayRecentlyCompleted = recentlyCompletedQuizzes.slice(0, 5);

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={`Profile: ${quizUser?.name}`} />
      </div>
      <div>
        <ProfileQuizData
          user={quizUser!}
          createdQuizzesLength={userQuizzes?.length!}
          userTakesLength={userTakes?.length!}
          userAverageScorePercentage={userAverageScorePercentage}
          userUniqueUserQuizTakes={uniqueUsersLength}
          notUserTakesLength={filteredTakesNonCurrentUser.length}
          notUserAverageScorePercentage={notUserAverageScorePercentage}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-0 mt-10 pb-10 pt-10">
          <PageHeading heading={"Recently Taken Quizzes"} />
          <Link href="/quiz/completed" className="w-full lg:w-fit">
            <Button className="w-full" variant="outline">
              View All
            </Button>
          </Link>
        </div>
        <QuizGrid quizzes={displayRecentlyCompleted!} path="/quiz/completed/" />
      </div>
    </>
  );
};

export default UserProfile;
