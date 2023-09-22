import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { quizId, userId, status, score } = body;

  const newTake = await prisma.take.create({
    data: {
      quizId,
      userId,
      status,
      score,
    },
  });

  return NextResponse.json(newTake);
}
