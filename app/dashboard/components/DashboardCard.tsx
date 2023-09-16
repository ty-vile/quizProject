"use client";

// hooks
import useCreateQuizModal from "@/hooks/useCreateQuizModal";
import { useRouter } from "next/navigation";
// icons
import { HiViewGridAdd, HiUserCircle } from "react-icons/hi";
// props
type Props = {
  title: String;
  description: String;
};

const DashboardCard: React.FC<Props> = ({ title, description }) => {
  let handleClick: any;
  const router = useRouter();
  const createQuizModal = useCreateQuizModal();

  const genIcon = (title: String) => {
    if (title === "Create New Quiz") {
      handleClick = function () {
        console.log(123);
        createQuizModal.onOpen();
      };
      return <HiViewGridAdd className="h-8 w-8 text-white" />;
    }
    if (title === "View My Quizzes") {
      handleClick = function () {
        router.push("/dashboard/my-quizzes");
      };
      return <HiUserCircle className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden bg-background px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg w-full"
      onClick={() => handleClick()}
    >
      <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>
      <div className="relative z-10 mx-auto">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-primary group-hover:bg-secondary">
          {genIcon(title)}
        </span>
        <div className="space-y-6 pt-5 text-base leading-7   group-hover:text-white/90">
          <h4 className="text-2xl font-normal font-bungee ">{title}</h4>
        </div>
        <div className="space-y-6 pt-5 text-base leading-7   group-hover:text-white/90">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
