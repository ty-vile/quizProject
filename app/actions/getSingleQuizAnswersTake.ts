import prisma from "@/lib/prismadb";

// gets single quiz based on id passed as param and returns quiz, questions and answers for singular quiz

export default async function getSingleQuizAnswersTake(id: string) {
  try {
    const takeAnswer = await prisma.takeAnswer.findMany({
      where: {
        takeId: id,
      },
    });

    return takeAnswer;
  } catch (error) {
    return null;
  }
}
