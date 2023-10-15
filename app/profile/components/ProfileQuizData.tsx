"use client";

// types
import { User } from "@prisma/client";
// icons
import { HiUser } from "react-icons/hi";
import {
  MdEmail,
  MdImage,
  MdPermContactCalendar,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { PiMathOperationsFill } from "react-icons/pi";
// react
import { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

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

const ProfileQuizData: React.FC<Props> = ({
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
        <div className="flex flex-col  lg:flex-row w-full gap-4">
          <div className="grow flex flex-col gap-2 items-center justify-between p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <MdImage className="text-3xl" />
            <h5>Profile Image</h5>
            <Image
              src={user?.image!}
              height={50}
              width={50}
              alt="User Image"
              className="rounded-full"
            />
          </div>
          <div className="grow flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <MdEmail className="text-3xl" />
            <h5>Email</h5>
            <h2 className="text-xl bg-primary p-2">{user?.email}</h2>
          </div>
          <div className="grow flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <MdEmail className="text-3xl" />
            <h5>Created At</h5>
            <h2 className="text-xl bg-primary p-2">
              {formatDate(user.createdAt)}
            </h2>
          </div>
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
          <div className="w-full text-center flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <IoMdCreate className="text-3xl" />
            <h5>Quizzes created by you</h5>
            <h2 className="text-5xl bg-primary rounded-full   w-32 h-32 flex items-center justify-center pt-2">
              {createdQuizzesLength}
            </h2>
          </div>
          <div className="w-full text-center flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <MdOutlineTipsAndUpdates className="text-3xl" />
            <h5>How many times your quizzes have been taken</h5>
            <h2 className="text-5xl bg-primary rounded-full   w-32 h-32 flex items-center justify-center pt-2">
              {nonCurrentUserTakesLength}
            </h2>
          </div>
          <div className="w-full text-center flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <PiMathOperationsFill className="text-3xl" />
            <h5>Average score of users taking your quizzes (%)</h5>
            <h2 className="text-5xl bg-primary rounded-full  w-32 h-32 flex items-center justify-center pt-2">
              {nonCurrentUserAverageScorePercentage}
            </h2>
          </div>
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
          <div className="w-full flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <IoMdCreate className="text-3xl" />
            <h5>Quizzes taken by you</h5>
            <h2 className="text-5xl bg-primary rounded-full   w-32 h-32 flex items-center justify-center pt-2">
              {currentUserTakesLength}
            </h2>
          </div>
          <div className="w-full flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <MdOutlineTipsAndUpdates className="text-3xl" />
            <h5>Unique users quizzes that you have taken</h5>
            <h2 className="text-5xl bg-primary rounded-full   w-32 h-32 flex items-center justify-center pt-2">
              {currentUserUniqueUserQuizTakes}
            </h2>
          </div>
          <div className="w-full flex flex-col gap-2 items-center p-4 border-2 border-gray-600 dark:border-gray-300 ">
            <PiMathOperationsFill className="text-3xl" />
            <h5>Average score of quizzes taken by you (%)</h5>
            <h2 className="text-5xl bg-primary rounded-full  w-32 h-32 flex items-center justify-center pt-2">
              {currentUserAverageScorePercentage}
            </h2>
          </div>
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

export default ProfileQuizData;
