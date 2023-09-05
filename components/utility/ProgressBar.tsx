import React from "react";

type Props = {
  percentage: number | undefined;
  current: number | undefined;
  max: number | undefined;
  showModal: boolean | undefined;
};

const ProgressBar: React.FC<Props> = ({
  percentage,
  current,
  max,
  showModal,
}) => {
  return (
    <div
      className={`w-full translate duration-300  
      ${showModal ? "translate-y-0" : "translate-y-[500px]"}
      ${showModal ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative h-2 overflow-hidden bg-background">
        <div
          className={`absolute top-0 bottom-0 left-0  bg-gradient-to-r from-primary to-secondary transition-all duration-1000 w-3/12`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
