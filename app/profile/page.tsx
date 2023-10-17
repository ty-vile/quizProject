// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "../quiz/components/QuizGrid";
import ProfileQuizData from "./components/ProfileQuizData";
// actions
import getCurrentUser from "../actions/getUser/getCurrentUser";
import getUserQuizzes from "../actions/getUser/getUserQuizzes";
import getUserTakes from "../actions/getUser/getUserTakes";
import getNotUserQuizzes from "../actions/getNotUser/getNotUserQuizzes";
import getNotCurrentUserTakes from "../actions/getNotUser/getNotUserTakes";
// utils
import {
  calculateAverageScorePercentage,
  calculateUniqueUsersLength,
  filterUniqueTakenQuizzes,
  filterUniqueTakesArr,
} from "@/lib/utils";
import getUserTakenQuizzes from "../actions/getUser/getUserTakenQuizzes";
import getUserCompleteQuizzes from "../actions/getUser/getUserCompleteQuizzes";

const CurrentUserProfile = async () => {
  const currentUser = await getCurrentUser();
  const userCompletedQuizzes = await getUserCompleteQuizzes(currentUser?.id!);
  const userQuizzes = await getUserQuizzes(currentUser?.id!);
  const userTakes = await getUserTakes(currentUser?.id!);
  const notUserQuizzes = await getNotUserQuizzes(currentUser?.id!);
  const notUserTakes = await getNotCurrentUserTakes(currentUser?.id!);

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

  const recentlyCompletedQuizzes = filterUniqueTakenQuizzes(
    notUserQuizzes!,
    userCompletedQuizzes
  );

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Your Profile"} />
      </div>
      <div>
        <ProfileQuizData
          user={currentUser!}
          createdQuizzesLength={userQuizzes?.length!}
          userTakesLength={userTakes?.length!}
          userAverageScorePercentage={userAverageScorePercentage}
          userUniqueUserQuizTakes={uniqueUsersLength}
          notUserTakesLength={filteredTakesNonCurrentUser.length}
          notUserAverageScorePercentage={notUserAverageScorePercentage}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2>Your Quizzes</h2>
        <QuizGrid quizzes={recentlyCompletedQuizzes!} path="/quiz/statistics" />
      </div>
    </>
  );
};

export default CurrentUserProfile;
