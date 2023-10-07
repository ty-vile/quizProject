import React from "react";
import DashboardSummaryCard from "./DashboardSummaryCard";

type Props = {};

const DashboardSummaryCards = (props: Props) => {
  return (
    <section className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-8">
      <DashboardSummaryCard title="Create New Quiz" />
      <DashboardSummaryCard title="View My Quizzes" />
      <DashboardSummaryCard title="Take A Quiz" />
      <DashboardSummaryCard title="Take A Quiz" />
    </section>
  );
};

export default DashboardSummaryCards;
