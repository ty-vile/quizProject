import getNonCurrentUserQuizzes from "@/app/actions/getNonCurrentUserQuizzes";
import DashboardTakeQuizTableRowWrapper from "./DashboardTakeQuizTableRowWrapper";

const DashboardTakeQuizTable = async () => {
  const nonUserQuizzes = await getNonCurrentUserQuizzes();
  return (
    <div className="flex flex-col gap-4 p-2 lg:p-4 border-2 border-gray-600 dark:border-gray-300  rounded-lg shadow-1">
      {nonUserQuizzes?.map((quiz) => {
        return <DashboardTakeQuizTableRowWrapper key={quiz.id} quiz={quiz} />;
      })}
    </div>
  );
};

export default DashboardTakeQuizTable;
