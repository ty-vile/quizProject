import React from "react";

import DashboardTakeQuizTable from "./takequiz/DashboardTakeQuizTable";
import DashboardUserQuizTable from "./userquiz/DashboardUserQuizTable";

const DashboardTables = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* QUIZZES - BY NON CURRENT USER */}
      <div className="flex flex-col gap-2">
        <div>TITLE HERE</div>
        <DashboardTakeQuizTable />
      </div>
      {/* QUIZZES - BY CURRENT USER */}
      <div className="flex flex-col gap-2">
        <div>TITLE HERE</div>
        <DashboardUserQuizTable />
      </div>
    </div>
  );
};

export default DashboardTables;
