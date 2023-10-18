"use client";

// types
import { Answer, Question, Quiz, TakeAnswer, User } from "@prisma/client";
// icons
import { HiUser } from "react-icons/hi";
// react
import { useState } from "react";
// utils
import {
  calculateAverageScorePercentage,
  calculatePercentage,
  formatDate,
  getQuestionTotalScores,
} from "@/lib/utils";
// components
import StatCard from "@/app/quiz/components/StatCard";
import AccordionEl from "@/components/utility/elements/AccordionEl";

export type ExtendedQuestion = Question & {
  answer?: string;
  takeAnswer?: string;
};

type Props = {
  quiz: Quiz | null;
  questions: ExtendedQuestion[];
  answers: Answer[][];
  takeAnswers: TakeAnswer[] | null;
  quizTakenTotal: number;
  quizAverageScore: string;
  quizTakenUniqueUsers: number;
};

enum TABS {
  QUIZINFO = 0,
  QUIZSTATS = 1,
  ANSWERSSTATS = 2,
}

const StatsQuizTable: React.FC<Props> = ({
  quizTakenTotal,
  quizAverageScore,
  quizTakenUniqueUsers,
  questions,
  answers,
  takeAnswers,
}) => {
  const [currentTab, setCurrentTab] = useState(TABS.QUIZINFO);

  questions.forEach((question, index) => {
    answers.map((answer, i) => {
      if (index === i) {
        answer.map((ans) => {
          if (ans.isCorrect === true) {
            question.answer = ans.answer;
          }
        });
      }
    });
  });

  const questionScores = getQuestionTotalScores(questions, takeAnswers!);

  console.log(questionScores);

  let bodyContent;

  if (currentTab === TABS.QUIZINFO) {
    bodyContent = (
      <div className="flex flex-col gap-4  font-josefin">
        <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl">
          Answers
        </h2>
        <div>
          {questions?.map((question, index) => {
            return (
              <>
                <AccordionEl
                  index={index}
                  question={question}
                  key={index}
                  takeQuiz={true}
                />
              </>
            );
          })}
        </div>
      </div>
    );
  }

  if (currentTab === TABS.QUIZSTATS) {
    bodyContent = (
      <div className="flex flex-col gap-4 mb-8 font-josefin">
        <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl flex items-center">
          Quiz Data -{" "}
          <span className="text-sm pt-1 pl-2">{`(Quizzes created by you) `}</span>
        </h2>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <StatCard
            iconType="Created"
            title="Unique users that have taken this quiz"
            content={quizTakenUniqueUsers}
          />
          <StatCard
            iconType="Updated"
            title="How many times this quiz has been taken"
            content={quizTakenTotal}
          />
          <StatCard
            iconType="Score"
            title="Average score of users taking this quiz (%)"
            content={quizAverageScore}
          />
        </div>
      </div>
    );
  }

  if (currentTab === TABS.ANSWERSSTATS) {
    bodyContent = (
      <div className="flex flex-col gap-4 mb-8 font-josefin">
        <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl flex items-center">
          Average score of users taking this question (%)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4">
          {questionScores.map((questionScore, index) => {
            return (
              <StatCard
                iconType="Created"
                title={questionScore.title}
                content={Number(
                  calculatePercentage(
                    questionScore.count,
                    questionScore.correct
                  )
                )}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  gap-8 border-2 border-gray-600 dark:border-gray-300 rounded-lg shadow-1">
      <div className="flex-wrap flex flex-col lg:flex-row">
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.QUIZINFO && "bg-primary text-white"
          }`}
          onClick={() => setCurrentTab(TABS.QUIZINFO)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">Quiz Info</h5>
        </div>
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.QUIZSTATS && "bg-primary text-white"
          }`}
          onClick={() => setCurrentTab(TABS.QUIZSTATS)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">Quiz Data</h5>
        </div>
        <div
          className={`grow flex items-center lg:justify-center gap-2 p-2 hover:bg-primary transition-300 cursor-pointer ${
            currentTab === TABS.ANSWERSSTATS && "bg-primary text-white"
          }`}
          onClick={() => setCurrentTab(TABS.ANSWERSSTATS)}
        >
          <HiUser className="text-3xl" />
          <h5 className="font-josefin">Answers Data</h5>
        </div>
      </div>
      <div className="p-4">{bodyContent}</div>
    </div>
  );
};

export default StatsQuizTable;
