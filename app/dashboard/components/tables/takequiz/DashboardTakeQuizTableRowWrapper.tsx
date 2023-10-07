import getUser from "@/app/actions/getUser";

import { Quiz } from "@prisma/client";
import DashboardTakeQuizTableRow from "./DashboardTakeQuizTableRow";

type Props = {
  quiz: Quiz;
};

const DashboardTakeQuizTableRowWrapper: React.FC<Props> = async ({ quiz }) => {
  const { title, createdAt, category, id, userId } = quiz;

  const user = await getUser(userId);

  return (
    <>
      <DashboardTakeQuizTableRow
        user={user!}
        title={title}
        createdAt={createdAt}
        category={category}
        id={id}
      />
    </>
  );
};

export default DashboardTakeQuizTableRowWrapper;
