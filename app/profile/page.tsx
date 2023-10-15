// components
import PageHeading from "@/components/utility/text/PageHeading";
import QuizGrid from "../quiz/components/QuizGrid";
import ProfileQuizData from "./components/ProfileQuizData";
// actions
import getCurrentUser from "../actions/getCurrentUser";
import getCurrentUserQuizzes from "../actions/getCurrentUserQuizzes";
import getNonCurrentUserTakes from "../actions/getNonCurrentUserTakes";
import {
  calculateAveragePercentage,
  calculateUniqueUsersLength,
  filterUniqueTakesArr,
} from "@/lib/utils";
import getCurrentUserTakes from "../actions/getCurrentUserTakes";
import getNonCurrentUserQuizzes from "../actions/getNonCurrentUserQuizzes";

const CurrentUserProfile = async () => {
  const currentUser = await getCurrentUser();
  const currentUserQuizzes = await getCurrentUserQuizzes();
  const currentUserTakes = await getCurrentUserTakes();
  const nonCurrentUserQuizzes = await getNonCurrentUserQuizzes();
  const nonCurrentUserTakes = await getNonCurrentUserTakes();

  // CALC DATA FOR MY QUIZZES TAB
  // E.G HOW MANY TIME NON CURRENT USERS HAVE TAKEN CURRENT USER QUIZZES

  const filteredTakesNonCurrentUser = filterUniqueTakesArr(
    nonCurrentUserTakes!,
    currentUserQuizzes!
  );

  const {
    filteredTakesArr: ncFilteredTakesArr,
    filteredTakesLen: ncFilteredTakesArrLen,
  } = filteredTakesNonCurrentUser;

  const ncAverageScorePercentage =
    calculateAveragePercentage(ncFilteredTakesArr);

  // CALC DATA FOR QUIZZES TAKEN TAB
  // E.G HOW MANY TIME CURRENT USERS HAVE TAKEN NON CURRENT USER QUIZZES

  const filteredTakesCurrentUser = filterUniqueTakesArr(
    currentUserTakes!,
    nonCurrentUserQuizzes!
  );

  const { filteredTakesArr: cFilteredTakesArr } = filteredTakesCurrentUser;

  const currentUserAverageScorePercentage =
    calculateAveragePercentage(cFilteredTakesArr);

  const uniqueUsersLength = calculateUniqueUsersLength(currentUserTakes);

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Your Profile"} />
      </div>
      <div>
        <ProfileQuizData
          user={currentUser!}
          createdQuizzesLength={currentUserQuizzes?.length!}
          currentUserTakesLength={currentUserTakes?.length!}
          currentUserAverageScorePercentage={currentUserAverageScorePercentage}
          currentUserUniqueUserQuizTakes={uniqueUsersLength}
          nonCurrentUserTakesLength={ncFilteredTakesArrLen}
          nonCurrentUserAverageScorePercentage={ncAverageScorePercentage}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2>Your Quizzes</h2>
        <QuizGrid quizzes={currentUserQuizzes!} path="/quiz/statistics" />
      </div>
    </>
  );
};

export default CurrentUserProfile;
