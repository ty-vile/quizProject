import prisma from "@/lib/prismadb";

// gets single quiz based on id passed as param and returns quiz, questions and answers for singular quiz

export default async function getNotUserSingleQuizTake(
  id: string,
  userId: string
) {
  try {
    const take = await prisma.take.findMany({
      where: {
        quizId: id,
        userId: { not: userId },
      },
    });

    return take;
  } catch (error) {
    return null;
  }
}
