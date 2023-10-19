import React from "react";
import { ExtendedQuizTakenUser } from "../page";
import UserCard from "./UserCard";

type Props = {
  users: ExtendedQuizTakenUser[];
};

const UserGrid: React.FC<Props> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4">
      {users.map((user, index) => {
        return (
          <UserCard
            key={index}
            score={user.score}
            maxScore={user.maxScore}
            name={user.name}
            quizTakenAt={user.quizTakenAt}
            image={user.image}
            id={user.id}
          />
        );
      })}
    </div>
  );
};

export default UserGrid;
