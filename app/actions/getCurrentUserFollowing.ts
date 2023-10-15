import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

// gets list of all quizzes that have been taken by current user

export default async function getCurrentUserFollowing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    // get all quizzes that have been taken and completed by current user
    const userFollowing = await prisma.userFollow.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        user: true,
      },
    });

    return userFollowing.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  } catch (error) {
    return null;
  }
}
