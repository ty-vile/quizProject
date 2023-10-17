// components
import PageHeading from "@/components/utility/text/PageHeading";
import StatsQuizTable from "./components/StatsQuizTable";
import QuizGrid from "../../components/QuizGrid";

// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getUserQuizzes from "@/app/actions/getUser/getUserQuizzes";
import getUserTakes from "@/app/actions/getUser/getUserTakes";
import getNotUserQuizzes from "@/app/actions/getNotUser/getNotUserQuizzes";
import getNotCurrentUserTakes from "@/app/actions/getNotUser/getNotUserTakes";

// utils
import {
  calculateAveragePercentage,
  calculateUniqueUsersLength,
  filterUniqueTakesArr,
} from "@/lib/utils";

const CurrentUserProfile = async () => {
  const currentUser = await getCurrentUser();
  const currentUserQuizzes = await getUserQuizzes(currentUser?.id!);
  const currentUserTakes = await getUserTakes(currentUser?.id!);
  const nonCurrentUserQuizzes = await getNotUserQuizzes(currentUser?.id!);
  const nonCurrentUserTakes = await getNotCurrentUserTakes(currentUser?.id!);

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
        <StatsQuizTable
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
