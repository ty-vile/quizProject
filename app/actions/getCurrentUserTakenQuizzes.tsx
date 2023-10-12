import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

// gets list of all quizzes that have been taken by current user

export default async function getCurrentUserTakenQuizzes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const userTakenQuizzes = await prisma.take.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        quiz: true,
        user: true,
      },
    });

    return userTakenQuizzes.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
