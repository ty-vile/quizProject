import React from "react";

type Props = {
  percentage: number | string;
};

const ProgressBarEl: React.FC<Props> = ({ percentage }) => {
  return (
    <div className={`w-full translate duration-300 -z-1`}>
      <div className=" h-2 w-full bg-background">
        <div
          className="relative h-2 bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
          style={{ width: 100 + "%" }}
        >
          <div
            className="absolute h-8 w-2 bg-primary top-1/2 -translate-y-1/2"
            style={{ left: percentage + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarEl;
