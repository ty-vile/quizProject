import { Quiz, Take, User, UserFollow } from "@prisma/client";
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
    return 0; // To avoid division by zero
  }

  let number = (part / whole) * 100;

  return number.toFixed(2);
}

// calculates the average score of all quizzes taken - which are stored in the scoreArray
export function calculateAverageScorePercentage(scoreArray: any) {
  const percentageArr: any = [];
  let averageScore: number = 0;

  scoreArray.map((userTake: Take) => {
    percentageArr.push(calculatePercentage(userTake.score, userTake.maxScore));
  });

  averageScore = percentageArr.reduce((a: string, b: string) => {
    return Number(a) + Number(b);
  }, []);

  averageScore = averageScore / scoreArray.length;

  const finalAverage = averageScore.toFixed();

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

// return all QUIZZES where take.quizId === quiz.id
export function filterUniqueTakenQuizzes(quizArr: any, takenQuizArr: any) {
  const filteredQuizzesArr = quizArr?.filter((quiz: Quiz) => {
    return takenQuizArr?.some((take: Take) => quiz.id === take.quizId);
  });

  return filteredQuizzesArr;
}

export function calculateUniqueUsersLength(arr: any) {
  const uniqueUsers = new Set(arr?.map((item: any) => item.userId));

  return Array.from(uniqueUsers).length;
}
