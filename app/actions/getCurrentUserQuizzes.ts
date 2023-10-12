import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import getCurrentUserTakenQuizzes from "./getCurrentUserTakenQuizzes";

// gets all quizzes that were created by current user

export default async function getCurrentUserQuizzes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const userQuizzes = await prisma.quiz.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        user: true,
      },
    });

    return userQuizzes.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
