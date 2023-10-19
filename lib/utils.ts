import getSingleUser from "@/app/actions/getSingle/getSingleUser";
import { ExtendedQuestion } from "@/app/quiz/my-quizzes/[id]/components/StatsQuizTable";
import { ExtendedQuizTakenUser } from "@/app/quiz/my-quizzes/[id]/page";
import {
  Question,
  Quiz,
  Take,
  TakeAnswer,
  User,
  UserFollow,
} from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(inputDate: Date) {
  if (inputDate instanceof Date) {
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
  } else {
    return "Invalid date format";
  }
}

export function calculatePercentage(part: number, whole: number) {
  if (whole === 0) {
    return "0%";
  }

  let number = (part / whole) * 100;

  return number.toFixed().toString() + "%";
}

// calculates the average score of all quizzes taken - which are stored in the scoreArray
export function calculateAverageScorePercentage(scoreArray: any) {
  const percentageArr: any = [];
  let averageScore: number = 0;

  scoreArray.map((userTake: Take) => {
    percentageArr.push(calculatePercentage(userTake.score, userTake.maxScore));
  });

  const numericValues = percentageArr.map((item: string) =>
    item.replace("%", "")
  );

  averageScore = numericValues.reduce((a: string, b: string) => {
    return Number(a) + Number(b);
  }, []);

  averageScore = averageScore / scoreArray.length;

  const finalAverage = averageScore.toFixed() + "%";

  return finalAverage;
}

// returns boolean based on wether isFollowingUser contains isFollowedUser id
export function userIsFollowing(
  isFollowingUser: UserFollow[],
  isFollowedUser: User
) {
  return isFollowingUser?.some(
    (user) => user.followingId === isFollowedUser?.id
  );
}

// returns all TAKES where take.quizId is === quiz.id
export function filterUniqueTakesArr(takesArr: Take[], quizzesArr: Quiz[]) {
  const filteredTakesArr = takesArr?.filter((take) => {
    return quizzesArr?.some((quiz) => quiz.id === take.quizId);
  });

  return filteredTakesArr;
}

// return all TAKEANSWERS where takeAnswer.id === take.id
export function filterUniqueTakeAnswersArr(
  takesArr: Take[],
  takeAnswersArr: TakeAnswer[]
) {
  const filteredTakeAnswerArr = takeAnswersArr?.filter((takeAnswer) => {
    return takesArr?.some((take) => takeAnswer.takeId === take.id);
  });

  return filteredTakeAnswerArr;
}

// return all QUIZZES where take.quizId !== quiz.id
export function filterUniqueTakenQuizzes(quizArr: any, takenQuizArr: any) {
  const filteredQuizzesArr = quizArr?.filter((quiz: Quiz) => {
    return !takenQuizArr?.some((take: Take) => quiz.id === take.quizId);
  });

  return filteredQuizzesArr;
}

// return all QUIZZES where take.quizId !== quiz.id
export function filterUniqueCompletedQuizzes(
  quizArr: any,
  completedQuizArr: any
) {
  const filteredQuizzesArr = quizArr?.filter((quiz: Quiz) => {
    return !completedQuizArr?.some(
      (completed: Quiz) => quiz.id === completed.id
    );
  });

  return filteredQuizzesArr;
}

// returns a number which represents unique users
export function calculateUniqueUsersLength(arr: any) {
  const uniqueUsers = new Set(arr?.map((item: any) => item.userId));

  return Array.from(uniqueUsers).length;
}

// returns array of objects which contain question name, amount of times question has been answered, and amount of times question has been answered correctly
export function getQuestionTotalScores(
  questions: ExtendedQuestion[],
  takeAnswers: TakeAnswer[]
) {
  const NewArray = [];

  // init new map
  const resultMap = new Map();

  // loop over questions and set all of the required properties & key to question.id
  for (const question of questions) {
    resultMap.set(question.id, {
      title: question.question,
      count: 0,
      correct: 0,
    });
  }

  // loop over takeAnswers
  for (const answer of takeAnswers!) {
    // if any questions have a question.id === answer.questionId store that question in variable
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      // select map object using the question.id set as a key previously
      const result = resultMap.get(question.id);
      result.count += 1;
      if (answer.answer === question.answer) {
        result.correct += 1;
      }
    }
  }

  // push result map objects into array
  for (const result of Array.from(resultMap.values())) {
    NewArray.push(result);
  }

  return NewArray;
}

export async function mapUserQuizData(quizTakes: Take[]) {
  const userTakeQuizData: ExtendedQuizTakenUser[] = [];

  quizTakes?.map(async (user: any) => {
    let userObject = {
      score: user.score,
      maxScore: user.maxScore,
      quizTakenAt: user.createdAt,
      id: user.userId,
      name: "",
      image: "",
    };

    let userData = await getSingleUser(user?.userId);

    userObject = {
      ...userObject,
      name: userData?.name!,
      image: userData?.image!,
    };

    return userTakeQuizData.push(userObject);
  });

  return userTakeQuizData;
}
