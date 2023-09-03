"use client";

import useCreateQuizModal from "@/hooks/useCreateQuizModal";
import { IconType } from "react-icons";

type Props = {
  title: String;
  description: String;
  // icon: IconType;
};

const DashboardCard: React.FC<Props> = ({ title, description }) => {
  const createQuizModal = useCreateQuizModal();

  const test = () => {
    console.log("123");
    createQuizModal.onOpen();
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden bg-background px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl  sm:max-w-sm sm:rounded-lg"
      onClick={test}
    >
      <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
      <div className="relative z-10 mx-auto max-w-md">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary">
          {/* <Icon className="text-white text-4xl" /> */}
        </span>
        <div className="space-y-6 pt-5 text-base leading-7  transition-all duration-300 group-hover:text-white/90">
          <h4 className="text-2xl font-bold">{title}</h4>
        </div>
        <div className="space-y-6 pt-5 text-base leading-7  transition-all duration-300 group-hover:text-white/90">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
