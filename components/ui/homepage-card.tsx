import React from "react";

type Props = { step: string; title: string; content: string };

const HomepageCard: React.FC<Props> = ({ step, title, content }) => {
  return (
    <div className="flex flex-col w-full max-w-[1000px] p-2 lg:p-4 border-2 border-gray-600 dark:border-gray-300 shadow-1 transition-transform duration-300 hover:-translate-y-1 rounded-lg z-10 bg-background gap-4">
      <div className="flex flex-col gap-4 text-4xl text-primary font-bungee">
        <h2>{step}.</h2>
        <h2 className="text-white">{title}</h2>
      </div>
      <p className="font-josefin text-lg">{content}</p>
    </div>
  );
};

export default HomepageCard;
