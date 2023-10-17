import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { takeId, quizData } = body;
  const { questions } = quizData;

  questions.map(async (question: any) => {
    await prisma.takeAnswer.create({
      data: {
        takeId: takeId,
        questionId: question.questionId,
        answerId: question.answerId,
        answer: question.answer,
      },
    });
  });

  return NextResponse.json(questions);
}
