"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2500px] h-full w-full mx-auto xl:px-20 md:px-10 px-4 ">
      {children}
    </div>
  );
};

export default Container;
