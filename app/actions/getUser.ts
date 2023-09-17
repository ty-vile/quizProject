import prisma from "@/lib/prismadb";

export default async function getUser(id: string) {
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
