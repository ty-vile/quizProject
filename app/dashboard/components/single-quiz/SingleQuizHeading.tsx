"use client";

import { Button } from "@/components/ui/button";
// components
import PageHeading from "@/components/utility/PageHeading";
import { formatDate } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  user: User | null;
  category: string;
  createdAt: Date;
};

const SingleQuizHeading: React.FC<Props> = ({
  title,
  user,
  category,
  createdAt,
}) => {
  return (
    <div className="flex items-start justify-between">
      <PageHeading heading={title} />
      <h5 className="text-sm border-2 border-primary rounded-lg px-4 py-2 pt-3 w-fit font-light font-josefin ">
        {category}
      </h5>
    </div>
  );
};

export default SingleQuizHeading;
