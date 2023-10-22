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
  user: User | undefined | null;
  createdQuizzesLength: number | null | undefined;
  notUserTakesLength: number | null | undefined;
  userTakesLength: number | null | undefined;
  notUserAverageScorePercentage?: string;
  userAverageScorePercentage: string;
  userUniqueUserQuizTakes: number;
};

enum TABS {
  MYDATA = 0,
  MYQUIZDATA = 1,
  TAKEQUIZDATA = 2,
}

const ProfileQuizData: React.FC<Props> = ({
  user,
  createdQuizzesLength,
  notUserTakesLength,
  userTakesLength,
  notUserAverageScorePercentage,
  userAverageScorePercentage,
  userUniqueUserQuizTakes,
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
          <StatCard
            iconType="Image"
            title="Profile Image"
            image={user?.image}
          />
          <StatCard iconType="Email" title="Email" content={user?.email} />
          <StatCard
            iconType="Created"
            title="Created At"
            content={formatDate(user?.createdAt)}
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
          <span className="text-sm pt-1 pl-2">{`(Quizzes created by ${user?.name}) `}</span>
        </h2>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <StatCard
            iconType="Created"
            title="Quizzes created"
            content={createdQuizzesLength}
          />
          <StatCard
            iconType="Updated"
            title="How many times quizzes have been taken"
            content={notUserTakesLength}
          />
          <StatCard
            iconType="Score"
            title="Average score of users quizzes taken (%)"
            content={notUserAverageScorePercentage}
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
          <span className="text-sm pt-1 pl-2">{`(Quizzes taken by ${user?.name}) `}</span>
        </h2>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <StatCard title="Quizzes taken by you" content={userTakesLength} />
          <StatCard
            title="Unique users quizzes that you have taken"
            content={userUniqueUserQuizTakes}
          />
          <StatCard
            title="Average score of quizzes taken by you (%)"
            content={userAverageScorePercentage}
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
            currentTab === TABS.MYDATA && "bg-primary text-white"
          }`}
          onClick={() => setCurrentTab(TABS.MYDATA)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">User Profile</h5>
        </div>
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.MYQUIZDATA && "bg-primary text-white"
          }`}
          onClick={() => setCurrentTab(TABS.MYQUIZDATA)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">User Quizzes </h5>
        </div>
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.TAKEQUIZDATA && "bg-primary text-white"
          }`}
          onClick={() => setCurrentTab(TABS.TAKEQUIZDATA)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">User Results</h5>
        </div>
      </div>
      <div className="p-4">{bodyContent}</div>
    </div>
  );
};

export default ProfileQuizData;
