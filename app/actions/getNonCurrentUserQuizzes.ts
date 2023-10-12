import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import getCurrentUserTakenQuizzes from "./getCurrentUserTakenQuizzes";

// gets all quizzes that were NOT created by current user

export default async function getNonCurrentUserQuizzes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    // gets all quizzes NOT created by current user
    const userQuizzes = await prisma.quiz.findMany({
      where: {
        userId: { not: currentUser.id },
      },
      include: { user: true },
    });

    // gets all quizzes TAKEN by current user
    const userTakenQuizzes = await getCurrentUserTakenQuizzes();

    const filteredUserQuizzes = userQuizzes.filter((userQuiz) => {
      return !userTakenQuizzes?.some(
        (userTakenQuiz) => userTakenQuiz.quizId === userQuiz.id
      );
    });

    return filteredUserQuizzes.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
