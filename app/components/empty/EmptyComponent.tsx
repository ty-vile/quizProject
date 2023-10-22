"use client";

// react
import Image from "next/image";
// component
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
};

const EmptyComponent: React.FC<Props> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="w-full h-[80vh] flex flex-col gap-10 items-center justify-center">
      <h1
        className={`flex bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-5xl font-bungee text-center`}
      >
        {title}
      </h1>
      <Image src={"/emptyData.svg"} height={300} width={200} alt="Empty Icon" />
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Return to dashboard
      </Button>
    </div>
  );
};

export default EmptyComponent;
