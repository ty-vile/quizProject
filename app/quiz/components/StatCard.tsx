import {
  MdEmail,
  MdImage,
  MdPermContactCalendar,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { PiMathOperationsFill } from "react-icons/pi";
import Image from "next/image";

type Props = {
  iconType: string;
  title: string;
  content?: string | number | null;
  image?: string | null;
};

const StatCard: React.FC<Props> = ({ iconType, title, content, image }) => {
  const genIcon = (title: String) => {
    if (title === "Email") {
      return <MdEmail className="h-6 w-6 lg:h-8 lg:w-8 text-white" />;
    }
    if (title === "Image") {
      return <MdImage className="h-6 w-6 lg:h-8 lg:w-8 text-white" />;
    }
    if (title === "Calendar") {
      return (
        <MdPermContactCalendar className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
      );
    }
    if (title === "Created") {
      return <IoMdCreate className="h-6 w-6 lg:h-8 lg:w-8 text-white" />;
    }
    if (title === "Updated") {
      return (
        <MdOutlineTipsAndUpdates className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
      );
    }
    if (title === "Score") {
      return (
        <PiMathOperationsFill className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
      <div className="flex flex-col items-center justify-center gap-2">
        {genIcon(iconType)}
        <h5>{title}</h5>
      </div>
      <h2
        className={`text-2xl bg-primary rounded-full min-w-[120px] min-h-[120px] w-fit p-4 flex items-center justify-center`}
      >
        {content && content}
        {image && (
          <Image
            src={image}
            height={50}
            width={50}
            className="rounded-full"
            alt="User Image"
          />
        )}
      </h2>
    </div>
  );
};

export default StatCard;
