import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";
import prisma from "@/lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

// gets current user

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    return currentUser;
  } catch (error) {
    return null;
  }
}
