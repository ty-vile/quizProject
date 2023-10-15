import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { quizId, userId, status, score, maxScore } = body;

  const newTake = await prisma.take.create({
    data: {
      quizId,
      userId,
      status,
      score,
      maxScore,
    },
  });

  return NextResponse.json(newTake);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const { takeId, quizData } = body;

  let score = 0;

  quizData.questions.forEach(
    (question: {
      questionId: string;
      question: string;
      correctAnswer: string;
      answerId: string;
      answer: string;
    }) => {
      if (
        question.correctAnswer.toLowerCase() === question.answer.toLowerCase()
      ) {
        score += 1;
      }
    }
  );

  // REPLACE WITH CORRECT DATA

  const updatedTake = await prisma.take.update({
    where: {
      id: takeId,
    },
    data: {
      status: "Complete",
      score: score,
    },
  });

  return NextResponse.json(updatedTake);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const { takeId } = body;

  const deletedTake = await prisma.take.delete({
    where: {
      id: takeId,
    },
  });

  return NextResponse.json(deletedTake);
}
