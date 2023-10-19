"use client";

import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  score: number;
  maxScore: number;
  quizTakenAt: Date;
  name: string;
  image: string;
  id: string;
};

const UserCard: React.FC<Props> = ({
  score,
  quizTakenAt,
  name,
  image,
  maxScore,
  id,
}) => {
  const router = useRouter();

  return (
    <div
      className="w-full flex gap-2 items-center justify-between p-4 border-2 border-gray-600 dark:border-gray-300 shadow-1 rounded-lg h-translate-1 transition-300 cursor-pointer"
      onClick={() => router.push(`/profile/${id}`)}
    >
      <div className="flex items-start gap-4">
        <Image
          src={image}
          alt="User Image"
          height={50}
          width={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h4 className="font-bungee text-lg">{name}</h4>
          <p className="text-xs font-josefin">{formatDate(quizTakenAt)}</p>
        </div>
      </div>
      <div className="p-1 pt-2 px-4 border-2 border-primary rounded-lg">
        <h5 className="text-sm font-josefin">
          {score}/{maxScore}
        </h5>
      </div>
    </div>
  );
};

export default UserCard;
