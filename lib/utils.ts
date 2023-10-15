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

export function calculateAveragePercentage(takesArray: any) {
  const percentageArr: any = [];
  let averageScore: number = 0;

  takesArray.map((userTake: Take) => {
    percentageArr.push(calculatePercentage(userTake.score, userTake.maxScore));
  });

  averageScore = percentageArr.reduce((a: string, b: string) => {
    return Number(a) + Number(b);
  }, []);

  averageScore = averageScore / takesArray.length;

  const finalAverage = averageScore.toFixed();

  return finalAverage;
}

export function userIsFollowing(
  currentUserFollowing: UserFollow[],
  createQuizUser: User
) {
  return currentUserFollowing?.some(
    (user) => user.followingId === createQuizUser?.id
  );
}

export function filterUniqueTakesArr(takesArr: Take[], quizzesArr: Quiz[]) {
  const filteredTakesArr = takesArr?.filter((take) => {
    return quizzesArr?.some((quiz) => quiz.id === take.quizId);
  });

  const filteredTakesLen = filteredTakesArr.length;

  return { filteredTakesArr, filteredTakesLen };
}

export function calculateUniqueUsersLength(arr: any) {
  const uniqueUsers = new Set(arr?.map((item: any) => item.userId));

  return Array.from(uniqueUsers).length;
}
