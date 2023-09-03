// actions

import Container from "@/components/utility/Container";
import getCurrentUser from "../actions/getCurrentUser";
import { bungee } from "../layout";
import DashboardCard from "./components/DashboardCard";

type Props = {};

export const metadata = {
  title: "Dashboard | Quizify",
};

const Dashboard = async (props: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen min-w-screen pt-40 bg-background duration-300 ">
      <Container>
        <h1
          className={`bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl w-full ${bungee.className}`}
        >
          DASHBOARD
        </h1>
        <div className="flex items-center">
          <DashboardCard />
        </div>
      </Container>
    </main>
  );
};

export default Dashboard;
