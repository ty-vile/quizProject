import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

// gets all takes where user is NOT current user

export default async function getCurrentUserTakes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const takes = await prisma.take.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return takes;
  } catch (error) {
    return null;
  }
}
