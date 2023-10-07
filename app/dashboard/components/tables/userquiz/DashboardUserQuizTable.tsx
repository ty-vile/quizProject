import getCurrentUserQuizzes from "@/app/actions/getCurrentUserQuizzes";
import DashboardUserQuizTableRow from "./DashboardUserQuizTableRow";
import getCurrentUser from "@/app/actions/getCurrentUser";

const DashboardUserQuizTable = async () => {
  const currentUserQuizzes = await getCurrentUserQuizzes();
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col gap-4 p-2 lg:p-4 ring-2 ring-gray-200 dark:ring-white/20 rounded-lg">
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
