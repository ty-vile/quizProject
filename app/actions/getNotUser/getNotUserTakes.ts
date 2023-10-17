import prisma from "@/lib/prismadb";

// gets all takes where user is NOT user

export default async function getNotCurrentUserTakes(id: string) {
  try {
    if (!id) {
      return null;
    }

    const takes = await prisma.take.findMany({
      where: {
        userId: { not: id },
      },
    });

    return takes;
  } catch (error) {
    return null;
  }
}
