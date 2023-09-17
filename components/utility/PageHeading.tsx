import React from "react";

type Props = {
  heading: string;
};

const PageHeading: React.FC<Props> = ({ heading }) => {
  return (
    <h1
      className={`mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl w-full font-bungee`}
    >
      {heading}
    </h1>
  );
};

export default PageHeading;
