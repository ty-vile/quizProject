// components
import PageHeading from "@/components/utility/PageHeading";
import DashboardCard from "./components/DashboardCard";

// seo
export const metadata = {
  title: "Dashboard | Quizify",
};

const Dashboard = async () => {
  return (
    <>
      <PageHeading heading="Dashboard" />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <DashboardCard
          title="Create New Quiz"
          description="Create a new quiz so other people can challenge themselves to solve your questions"
        />
        <DashboardCard
          title="View My Quizzes"
          description="View your quizzes, edit them and see data about who has taken your quizzes, and what scores they have"
        />
        <DashboardCard
          title="Take A Quiz"
          description="Take a quiz and test yourself and your knowledge with our various user related quizzes"
        />
      </section>
    </>
  );
};

export default Dashboard;
