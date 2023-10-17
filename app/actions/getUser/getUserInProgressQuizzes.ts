import prisma from "@/lib/prismadb";

// gets list of all quizzes that have been taken by user

export default async function getUserInProgressQuizzes(id: string) {
  try {
    if (!id) {
      return null;
    }

    // get all quizzes that have been taken and completed by user
    const userInProgress = await prisma.take.findMany({
      where: {
        userId: id,
        status: "In Progress",
      },
      include: {
        quiz: true,
        user: true,
      },
    });

    return userInProgress!.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
