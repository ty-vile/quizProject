import prisma from "@/lib/prismadb";

// gets all quizzes that were created by user

export default async function getUserQuizzes(id: string) {
  try {
    if (!id) {
      return null;
    }

    const userQuizzes = await prisma.quiz.findMany({
      where: {
        userId: id,
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
