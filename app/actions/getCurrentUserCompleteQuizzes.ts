import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

// gets list of all quizzes that have been taken by current user

export default async function getCurrentUserCompleteQuizzes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    // get all quizzes that have been taken and completed by current user
    const userCompletedQuizzes = await prisma.take.findMany({
      where: {
        userId: currentUser.id,
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
