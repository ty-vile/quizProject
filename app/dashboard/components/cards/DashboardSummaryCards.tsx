import React from "react";
import DashboardSummaryCard from "./DashboardSummaryCard";

type Props = {};

const DashboardSummaryCards = (props: Props) => {
  return (
    <section className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8">
      <DashboardSummaryCard title="Take Quiz" />
      <DashboardSummaryCard title="My Quizzes" />
      <DashboardSummaryCard title="Completed Quizzes" />
    </section>
  );
};

export default DashboardSummaryCards;
