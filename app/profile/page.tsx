// components
import PageHeading from "@/app/components/utility/text/PageHeading";
import QuizGrid from "../quiz/components/QuizGrid";
import ProfileQuizData from "./components/ProfileQuizData";
import { Button } from "@/app/components/ui/button";
// actions
import getCurrentUser from "../actions/getUser/getCurrentUser";
import getUserQuizzes from "../actions/getUser/getUserQuizzes";
import getUserTakes from "../actions/getUser/getUserTakes";
import getNotUserQuizzes from "../actions/getNotUser/getNotUserQuizzes";
import getNotCurrentUserTakes from "../actions/getNotUser/getNotUserTakes";
import getUserCompleteQuizzes from "../actions/getUser/getUserCompleteQuizzes";
// utils
import {
  calculateAverageScorePercentage,
  calculateUniqueUsersLength,
  filterUniqueCompletedQuizzes,
  filterUniqueTakenQuizzes,
  filterUniqueTakesArr,
} from "@/lib/utils";
import Link from "next/link";

const CurrentUserProfile = async () => {
  let currentUser = await getCurrentUser();
  let userCompletedQuizzes = await getUserCompleteQuizzes(currentUser?.id!);
  let userQuizzes = await getUserQuizzes(currentUser?.id!);
  let userTakes = await getUserTakes(currentUser?.id!);
  let notUserQuizzes = await getNotUserQuizzes(currentUser?.id!);
  let notUserTakes = await getNotCurrentUserTakes(currentUser?.id!);

  // GET DATA FOR MY QUIZZES TAB

  let filteredTakesNonCurrentUser = filterUniqueTakesArr(
    notUserTakes!,
    userQuizzes!
  );

  let notUserAverageScorePercentage = calculateAverageScorePercentage(
    filteredTakesNonCurrentUser
  );

  // GET DATA FOR QUIZZES TAKEN TAB

  let filteredTakesCurrentUser = filterUniqueTakesArr(
    userTakes!,
    notUserQuizzes!
  );

  let userAverageScorePercentage = calculateAverageScorePercentage(
    filteredTakesCurrentUser
  );

  let uniqueUsersLength = calculateUniqueUsersLength(userTakes);

  // GET DATA FOR RECENTLY COMPLETED QUIZZES

  let recentlyCompletedQuizzes = filterUniqueCompletedQuizzes(
    notUserQuizzes!,
    userCompletedQuizzes
  );

  if (recentlyCompletedQuizzes === undefined) {
    recentlyCompletedQuizzes = [];
  }

  if (userQuizzes === undefined) {
    userQuizzes = [];
  }

  if (userTakes === undefined) {
    userTakes = [];
  }

  if (filteredTakesNonCurrentUser === undefined) {
    filteredTakesNonCurrentUser = [];
  }

  const displayRecentlyCompleted = recentlyCompletedQuizzes.slice(0, 5);

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Your Profile"} />
      </div>
      <div>
        <ProfileQuizData
          user={currentUser}
          createdQuizzesLength={userQuizzes?.length}
          userTakesLength={userTakes?.length}
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
        <QuizGrid quizzes={displayRecentlyCompleted} path="/quiz/completed/" />
      </div>
    </>
  );
};

export default CurrentUserProfile;
