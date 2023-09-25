"use client";

// components
import PageHeading from "@/components/utility/PageHeading";
import { User } from "@prisma/client";

type Props = {
  title: string;
  user?: User | null;
  category?: string;
  createdAt?: Date;
};

const SingleQuizHeading: React.FC<Props> = ({ title, category }) => {
  return (
    <div className="flex items-start justify-between">
      <PageHeading heading={title} />
      {category && (
        <h5 className="text-sm border-2 border-primary rounded-lg px-4 py-2 pt-3 w-fit font-light font-josefin ">
          {category}
        </h5>
      )}
    </div>
  );
};

export default SingleQuizHeading;
