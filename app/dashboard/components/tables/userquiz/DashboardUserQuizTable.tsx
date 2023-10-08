import getCurrentUserQuizzes from "@/app/actions/getCurrentUserQuizzes";
import DashboardUserQuizTableRow from "./DashboardUserQuizTableRow";
import getCurrentUser from "@/app/actions/getCurrentUser";

const DashboardUserQuizTable = async () => {
  const currentUserQuizzes = await getCurrentUserQuizzes();
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col gap-4 p-2 lg:p-4 border-2 border-gray-600 dark:border-gray-300 rounded-lg shadow-1">
      {currentUserQuizzes?.map((quiz) => {
        return (
          <DashboardUserQuizTableRow
            key={quiz.id}
            quiz={quiz}
            user={currentUser!}
          />
        );
      })}
    </div>
  );
};

export default DashboardUserQuizTable;
