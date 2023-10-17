import prisma from "@/lib/prismadb";

// gets list of all quizzes that have been taken by user

export default async function getUserTakenQuizzes(id: string) {
  try {
    if (!id) {
      return null;
    }

    const userTakenQuizzes = await prisma.take.findMany({
      where: {
        userId: id,
      },
      include: {
        quiz: true,
        user: true,
      },
    });

    return userTakenQuizzes!.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
