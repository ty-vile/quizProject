import React from "react";

import DashboardTakeQuizTable from "./takequiz/DashboardTakeQuizTable";
import DashboardUserQuizTable from "./userquiz/DashboardUserQuizTable";
import { Button } from "@/components/ui/button";

const DashboardTables = () => {
  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* QUIZZES - BY NON CURRENT USER */}
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h4 className="font-josefin text-primary font-bold">New Quizzes</h4>
          {/* ADD BUTTON & CLIENT COMP HERE */}
          {/* VIEW ALL */}
        </div>
        <DashboardTakeQuizTable />
      </div>
      {/* QUIZZES - BY CURRENT USER */}
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h4 className="font-josefin text-primary font-bold">My Quizzes</h4>
          {/* ADD BUTTON & CLIENT COMP HERE */}
          {/* VIEW ALL */}
        </div>
        <DashboardUserQuizTable />
      </div>
    </div>
  );
};

export default DashboardTables;
