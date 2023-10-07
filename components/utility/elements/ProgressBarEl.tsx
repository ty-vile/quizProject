import React from "react";

type Props = {
  percentage: string | undefined;
  showModal: boolean | undefined;
};

const ProgressBarEl: React.FC<Props> = ({ percentage, showModal }) => {
  return (
    <div
      className={`w-full translate duration-300 -z-1
      ${showModal ? "translate-y-0" : "translate-y-[150px]"}
      ${showModal ? "opacity-100" : "opacity-0"}`}
    >
      <div className=" h-2 w-full  bg-background">
        <div
          className="h-2 bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
          style={{ width: percentage + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarEl;
