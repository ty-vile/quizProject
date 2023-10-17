import prisma from "@/lib/prismadb";

// gets all quizzes that were NOT created by user

export default async function getNotUserQuizzes(id: string) {
  try {
    if (!id) {
      return null;
    }

    // gets all quizzes NOT created by user
    const nonCurrentUserQuizzes = await prisma.quiz.findMany({
      where: {
        userId: { not: id },
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
