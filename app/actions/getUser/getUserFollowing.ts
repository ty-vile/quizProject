import prisma from "@/lib/prismadb";

// gets list of all quizzes that have been taken by user

export default async function getUserFollowing(id: string) {
  try {
    if (!id) {
      return null;
    }

    // get all quizzes that have been taken and completed by user
    const userFollowing = await prisma.userFollow.findMany({
      where: {
        userId: id,
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
