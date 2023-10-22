import Image from "next/image";

type Props = {
  iconType?: string;
  title: string;
  content?: string | number | null;
  image?: string | null;
};

const StatCard: React.FC<Props> = ({ iconType, title, content, image }) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-between p-4 border-2 border-gray-600 dark:border-gray-300 ">
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <h5>{title}</h5>
      </div>
      <h2
        className={`text-2xl bg-primary rounded-full min-w-[120px] min-h-[120px] w-fit p-4 flex items-center justify-center text-white`}
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
