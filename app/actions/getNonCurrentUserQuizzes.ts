import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getNonCurrentUserQuizzes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const userQuizzes = await prisma.quiz.findMany({
      where: {
        userId: { not: currentUser.id },
      },
    });

    return userQuizzes.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
