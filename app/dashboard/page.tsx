// components
import DashboardCard from "./components/DashboardCard";

// seo
export const metadata = {
  title: "Dashboard | Quizify",
};

const Dashboard = async () => {
  return (
    <>
      <h1
        className={`mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl w-full font-bungee`}
      >
        DASHBOARD
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <DashboardCard
          title="Create New Quiz"
          description="Create a new quiz so other people can challenge themselves to solve your questions"
        />
        <DashboardCard
          title="View My Quizzes"
          description="View your quizzes, edit them and see data about who has taken your quizzes, and what scores they have"
        />
      </section>
    </>
  );
};

export default Dashboard;
