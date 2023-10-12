"use client";

import { formatDate } from "@/lib/utils";
import { Quiz, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  quiz: Quiz;
};

const DashboardUserQuizTableRow: React.FC<Props> = ({ user, quiz }) => {
  const router = useRouter();
  const { title, createdAt, category, id, userId } = quiz;

  return (
    <div
      className="flex items-start justify-between p-2 cursor-pointer rounded-lg hover:bg-gray-100 hover:text-black transition-300"
      onClick={() => router.push(`/dashboard/take/${id}`)}
    >
      <div className="flex items-start gap-4">
        <Image
          src={user.image as string}
          alt="User Image"
          height={50}
          width={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h4 className="font-bungee text-lg">{title}</h4>
          <p className="text-xs font-josefin">{formatDate(createdAt)}</p>
        </div>
      </div>
      <div className="p-1 pt-2 px-4 border-2 border-primary rounded-lg">
        <h5 className="text-sm font-josefin">{category}</h5>
      </div>
    </div>
  );
};

export default DashboardUserQuizTableRow;
