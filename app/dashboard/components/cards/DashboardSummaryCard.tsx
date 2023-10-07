"use client";
import { useRouter } from "next/navigation";
// icons
import { HiViewGridAdd, HiUserCircle } from "react-icons/hi";
// props
type Props = {
  title: String;
};

const DashboardSummaryCard: React.FC<Props> = ({ title }) => {
  let handleClick: any;
  const router = useRouter();

  const genIcon = (title: String) => {
    if (title === "Create New Quiz") {
      handleClick = function () {
        router.push("/create-quiz");
      };
      return <HiViewGridAdd className="h-6 w-6 lg:h-8 lg:w-8 text-white" />;
    }
    if (title === "View My Quizzes") {
      handleClick = function () {
        router.push("/dashboard/my-quizzes");
      };
      return <HiUserCircle className="h-8 w-8 text-white" />;
    }
    if (title === "Take A Quiz") {
      handleClick = function () {
        router.push("/dashboard/take-quiz");
      };
      return <HiUserCircle className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden bg-background p-2 lg:p-4 ring-2  ring-gray-200 dark:ring-white/20 transition-transform duration-300 hover:-translate-y-1 rounded-lg w-full"
      onClick={() => handleClick()}
    >
      <span className="absolute lg:top-4 h-12 w-12 right-2 lg:right-4 lg:h-16 lg:w-16 z-0  rounded-full bg-primary transition-all duration-300 group-hover:scale-[25] lg:group-hover:scale-[15]"></span>
      <div className="relative z-10 mx-auto flex items-center justify-between">
        <div className="space-y-6 text-base leading-7   group-hover:text-white/90">
          <h4 className="text-lg md:text-xl lg:text-2xl font-normal font-josefin ">
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
