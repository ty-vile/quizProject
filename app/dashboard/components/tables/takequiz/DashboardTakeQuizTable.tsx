import getNonCurrentUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";
import DashboardTakeQuizTableRowWrapper from "./DashboardTakeQuizTableRowWrapper";

const DashboardTakeQuizTable = async () => {
  const nonUserQuizzes = await getNonCurrentUserQuizzes();
  return (
    <div className="flex flex-col gap-4 p-2 lg:p-4 ring-2 ring-gray-200 dark:ring-white/20 rounded-lg">
      {nonUserQuizzes?.map((quiz) => {
        return <DashboardTakeQuizTableRowWrapper key={quiz.id} quiz={quiz} />;
      })}
    </div>
  );
};

export default DashboardTakeQuizTable;
