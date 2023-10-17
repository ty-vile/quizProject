import prisma from "@/lib/prismadb";

// gets single quiz based on id passed as param and returns quiz, questions and answers for singular quiz

export default async function getSingleQuiz(id: string) {
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

    const answers = [];

    // Create a mapping of questionIds to their corresponding arrays
    const questionIdMap: any = {};

    allAnswers.forEach((answerSet) => {
      answerSet.forEach((answer) => {
        const { questionId } = answer;

        if (!questionIdMap[questionId]) {
          // If the questionId is not in the map, create a new array for it
          questionIdMap[questionId] = [answer];
        } else {
          // If the questionId is already in the map, push the answer to its array
          questionIdMap[questionId].push(answer);
        }
      });
    });

    // Push each array from the map into answers
    for (const questionId in questionIdMap) {
      if (questionIdMap.hasOwnProperty(questionId)) {
        answers.push(questionIdMap[questionId]);
      }
    }

    // CREATE EMPTY ARRAY THEN SORT ANSWERS THAT HAVE MATCHING QUESTION ID INTO OBJECTS
    // RETURN THAT
    // id ANSWERS = [[{id: 123, answer: 'example', isCorrect: no},{id: 123, answer: 'testing', isCorrect: yes}], [{id: 456, answer: 'example', isCorrect: no},{id: 123, answer: 'testing', isCorrect: yes}]]

    return { quiz, questions, answers };
  } catch (error) {
    return null;
  }
}
