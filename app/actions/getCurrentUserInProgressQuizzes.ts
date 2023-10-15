import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

// gets list of all quizzes that have been taken by current user

export default async function getCurrentUserInProgressQuizzes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    // get all quizzes that have been taken and completed by current user
    const userInProgress = await prisma.take.findMany({
      where: {
        userId: currentUser.id,
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
