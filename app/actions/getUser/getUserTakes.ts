import prisma from "@/lib/prismadb";

// gets all takes where user is NOT current user

export default async function getUserTakes(id: string) {
  try {
    if (!id) {
      return null;
    }

    const takes = await prisma.take.findMany({
      where: {
        userId: id,
      },
    });

    return takes;
  } catch (error) {
    return null;
  }
}
