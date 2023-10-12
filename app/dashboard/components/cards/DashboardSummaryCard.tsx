"use client";
import React from "react";
import { useRouter } from "next/navigation";
// icons
import { HiViewGridAdd, HiUserCircle } from "react-icons/hi";
import { TbProgressBolt } from "react-icons/tb";
import { BiSolidMessageSquareCheck } from "react-icons/bi";
// props
type Props = {
  title: String;
};

const DashboardSummaryCard: React.FC<Props> = ({ title }) => {
  let handleClick: any;
  const router = useRouter();

  const genIcon = (title: String) => {
    if (title === "Take Quiz") {
      handleClick = function () {
        router.push("/quiz/take");
      };
      return <HiViewGridAdd className="h-6 w-6 lg:h-8 lg:w-8 text-white" />;
    }
    if (title === "My Quizzes") {
      handleClick = function () {
        router.push("/quiz/my-quizzes");
      };
      return <HiUserCircle className="h-8 w-8 text-white" />;
    }
    if (title === "In Progress") {
      handleClick = function () {
        // add in progress route
        router.push("");
      };
      return <TbProgressBolt className="h-8 w-8 text-white" />;
    }
    if (title === "Completed Quizzes") {
      handleClick = function () {
        // add complete routes
        router.push("");
      };
      return <BiSolidMessageSquareCheck className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden bg-background p-2 lg:p-4 border-2 border-gray-600 dark:border-gray-300 shadow-1 transition-transform duration-300 hover:-translate-y-1 rounded-lg w-full"
      onClick={() => handleClick()}
    >
      <span className="absolute lg:top-4 h-12 w-12 right-2 lg:right-4 lg:h-16 lg:w-16 z-0  rounded-full bg-primary transition-all duration-300 group-hover:scale-[1.9] lg:group-hover:scale-[5]"></span>
      <div className="relative z-10 mx-auto flex items-center justify-between">
        <div className="space-y-6 text-base leading-7">
          <h4 className="text-sm md:text-lg lg:text-xl font-normal font-josefin ">
            {title}
          </h4>
        </div>
        <span className="grid h-12 w-12 lg:h-16 lg:w-16 place-items-center rounded-full bg-primary group-hover:bg-secondary">
          {genIcon(title)}
        </span>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;
