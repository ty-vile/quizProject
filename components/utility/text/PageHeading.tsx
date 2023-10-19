type Props = {
  heading: string;
  createdBy?: boolean;
};

const PageHeading: React.FC<Props> = ({ heading, createdBy }) => {
  return (
    <h1
      className={`flex bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-5xl grow font-bungee ${
        createdBy && "flex-col xl:flex-row lg:gap-2"
      }`}
    >
      {createdBy && <>{`Created By: `}</>}
      {heading}
    </h1>
  );
};

export default PageHeading;
