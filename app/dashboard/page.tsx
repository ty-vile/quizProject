// components
import DashboardCard from "./components/DashboardCard";
// fonts
import { bungee } from "@/app/layout";
// seo
export const metadata = {
  title: "Dashboard | Quizify",
};

const Dashboard = async () => {
  return (
    <>
      <h1
        className={`mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl w-full ${bungee.className}`}
      >
        DASHBOARD
      </h1>
      <DashboardCard
        title="Create New Quiz"
        description="Create a new quiz so other people can challenge themselves to solve your questions"
      />
    </>
  );
};

export default Dashboard;
