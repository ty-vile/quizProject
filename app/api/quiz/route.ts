import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import { Answer, Question } from "@prisma/client";

type QuestionProps = Question & {
  answers: Answer[];
};

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { category, score, title, questions } = body;

  const newQuiz = await prisma.quiz.create({
    data: {
      title: title,
      userId: currentUser?.id,
      category: category,
      score: Number(score),
    },
  });

  // type props from - create quiz modal
  questions.forEach(async (question: QuestionProps) => {
    let newQuestion = await prisma.question.create({
      data: {
        question: question.question,
        type: question.type,
        quizId: newQuiz.id,
      },
    });

    // type props from - create quiz modal
    question.answers.map(async (answer: Answer) => {
      await prisma.answer.create({
        data: {
          quizId: newQuiz.id,
          questionId: newQuestion.id,
          answer: answer.answer,
          isCorrect: answer.isCorrect,
        },
      });
    });
  });

  return NextResponse.json(questions);
}
