import prisma from "@/lib/prismadb";

// gets list of all quizzes that have been taken by user

export default async function getUserCompleteQuizzes(id: string) {
  try {
    if (!id) {
      return null;
    }

    // get all quizzes that have been taken and completed by user
    const userCompletedQuizzes = await prisma.take.findMany({
      where: {
        userId: id,
        status: "Complete",
      },
      include: {
        quiz: true,
        user: true,
      },
    });

    return userCompletedQuizzes!.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
