import prisma from "@/lib/prismadb";

// gets singular user based on id passed as param

export default async function getSingleUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
