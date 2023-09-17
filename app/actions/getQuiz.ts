import prisma from "@/lib/prismadb";

export default async function getQuiz(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });

    const questions = await prisma.question.findMany({
      where: {
        quizId: id,
      },
    });

    const allAnswers = await Promise.all(
      questions.map(async (question) => {
        const answer = await prisma.answer.findMany({
          where: {
            questionId: question.id,
          },
        });
        return answer;
      })
    );

    const answers = allAnswers.flat();

    return { quiz, questions, answers };
  } catch (error) {
    return null;
  }
}