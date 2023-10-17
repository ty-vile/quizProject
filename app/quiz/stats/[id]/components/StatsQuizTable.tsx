"use client";

// types
import { User } from "@prisma/client";
// icons
import { HiUser } from "react-icons/hi";
// react
import { useState } from "react";
// utils
import { formatDate } from "@/lib/utils";
// components
import StatCard from "@/app/quiz/components/StatCard";

type Props = {
  user: User;
  createdQuizzesLength: number;
  nonCurrentUserTakesLength: number;
  currentUserTakesLength: number;
  nonCurrentUserAverageScorePercentage: string;
  currentUserAverageScorePercentage: string;
  currentUserUniqueUserQuizTakes: number;
};

enum TABS {
  MYDATA = 0,
  MYQUIZDATA = 1,
  TAKEQUIZDATA = 2,
}

const StatsQuizTable: React.FC<Props> = ({
  user,
  createdQuizzesLength,
  nonCurrentUserTakesLength,
  currentUserTakesLength,
  nonCurrentUserAverageScorePercentage,
  currentUserAverageScorePercentage,
  currentUserUniqueUserQuizTakes,
}) => {
  const [currentTab, setCurrentTab] = useState(TABS.MYDATA);

  let bodyContent;

  if (currentTab === TABS.MYDATA) {
    bodyContent = (
      <div className="flex flex-col gap-4 mb-8 font-josefin">
        <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl">
          Profile Data
        </h2>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <StatCard iconType="Image" title="Profile Image" image={user.image} />
          <StatCard iconType="Email" title="Email" content={user.email} />
          <StatCard
            iconType="Created"
            title="Created At"
            content={formatDate(user.createdAt)}
          />
        </div>
      </div>
    );
  }

  if (currentTab === TABS.MYQUIZDATA) {
    bodyContent = (
      <div className="flex flex-col gap-4 mb-8 font-josefin">
        <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl flex items-center">
          Quiz Data -{" "}
          <span className="text-sm pt-1 pl-2">{`(Quizzes created by you) `}</span>
        </h2>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <StatCard
            iconType="Created"
            title="Quizzes created by you"
            content={createdQuizzesLength}
          />
          <StatCard
            iconType="Updated"
            title="How many times your quizzes have been taken"
            content={nonCurrentUserTakesLength}
          />
          <StatCard
            iconType="Score"
            title="Average score of users taking your quizzes (%)"
            content={nonCurrentUserAverageScorePercentage}
          />
        </div>
      </div>
    );
  }

  if (currentTab === TABS.TAKEQUIZDATA) {
    bodyContent = (
      <div className="flex flex-col gap-4 mb-8 font-josefin">
        <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl flex items-center">
          Quiz Data -{" "}
          <span className="text-sm pt-1 pl-2">{`(Quizzes taken by you) `}</span>
        </h2>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <StatCard
            iconType="Created"
            title="Quizzes taken by you"
            content={currentUserTakesLength}
          />
          <StatCard
            iconType="Updated"
            title="Unique users quizzes that you have taken"
            content={currentUserUniqueUserQuizTakes}
          />
          <StatCard
            iconType="Score"
            title="Average score of quizzes taken by you (%)"
            content={currentUserAverageScorePercentage}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  gap-8 border-2 border-gray-600 dark:border-gray-300 rounded-lg shadow-1">
      <div className="flex-wrap flex flex-col lg:flex-row">
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.MYDATA && "bg-primary"
          }`}
          onClick={() => setCurrentTab(TABS.MYDATA)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">My Profile</h5>
        </div>
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.MYQUIZDATA && "bg-primary"
          }`}
          onClick={() => setCurrentTab(TABS.MYQUIZDATA)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">My Quizzes </h5>
        </div>
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.TAKEQUIZDATA && "bg-primary"
          }`}
          onClick={() => setCurrentTab(TABS.TAKEQUIZDATA)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">Quizzes Taken</h5>
        </div>
      </div>
      <div className="p-4">{bodyContent}</div>
    </div>
  );
};

export default StatsQuizTable;
