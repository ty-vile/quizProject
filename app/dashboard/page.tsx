// components
import DashboardHead from "./components/DashboardHead";
import DashboardSummaryCards from "./components/cards/DashboardSummaryCards";
import DashboardTables from "./components/tables/DashboardTables";

// seo
export const metadata = {
  title: "Dashboard | Quizify",
};

const Dashboard = async () => {
  return (
    <div className="flex flex-col h-[80vh]">
      <DashboardHead />
      <DashboardSummaryCards />
      <DashboardTables />
    </div>
  );
};

export default Dashboard;
