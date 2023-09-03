// actions

import Container from "@/components/utility/Container";
import getCurrentUser from "../actions/getCurrentUser";
import { bungee } from "../layout";
import DashboardCard from "./components/DashboardCard";
import { HiViewGridAdd } from "react-icons/hi";

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
          className={`mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl w-full ${bungee.className}`}
        >
          DASHBOARD
        </h1>
        <div className="flex flex-wrap items-start gap-10">
          <DashboardCard
            title="Create New Quiz"
            description="Create a new quiz so other people can challenge themselves to solve your questions"
            // icon={<HiViewGridAdd />}
          />
        </div>
      </Container>
    </main>
  );
};

export default Dashboard;
