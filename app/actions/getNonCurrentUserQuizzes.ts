import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

// gets all quizzes that were NOT created by current user

export default async function getNonCurrentUserQuizzes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    // gets all quizzes NOT created by current user
    const nonCurrentUserQuizzes = await prisma.quiz.findMany({
      where: {
        userId: { not: currentUser.id },
      },
      include: { user: true },
    });

    return nonCurrentUserQuizzes.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
