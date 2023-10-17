// components
import DashboardTakeQuizTableRowWrapper from "./DashboardTakeQuizTableRowWrapper";
// actions
import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import getNotUserQuizzes from "@/app/actions/getNotUser/getNotUserQuizzes";

const DashboardTakeQuizTable = async () => {
  const currentUser = await getCurrentUser();
  const nonUserQuizzes = await getNotUserQuizzes(currentUser?.id!);
  return (
    <div className="flex flex-col gap-4 p-2 lg:p-4 border-2 border-gray-600 dark:border-gray-300  rounded-lg shadow-1">
      {nonUserQuizzes?.map((quiz) => {
        return <DashboardTakeQuizTableRowWrapper key={quiz.id} quiz={quiz} />;
      })}
    </div>
  );
};

export default DashboardTakeQuizTable;
