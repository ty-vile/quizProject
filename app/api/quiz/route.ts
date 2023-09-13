import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { AnswerProps, QuestionProps } from "@/components/modal/CreateQuizModal";

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { category, score, questions } = body;

  const newQuiz = await prisma.quiz.create({
    data: {
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
    question.answers.map(async (answer: AnswerProps) => {
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

  return NextResponse;
}
