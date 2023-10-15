import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { userId, followingId } = body;

  const followUser = await prisma.userFollow.create({
    data: {
      userId: userId,
      followingId: followingId,
    },
  });

  return NextResponse.json(followUser);
}
