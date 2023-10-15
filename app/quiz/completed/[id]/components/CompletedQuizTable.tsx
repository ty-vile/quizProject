"use client";

// components
import AccordionEl from "@/components/utility/elements/AccordionEl";
import PageHeading from "@/components/utility/text/PageHeading";
import useConfirmQuizModal from "@/hooks/useConfirmQuizModal";
import Image from "next/image";
// utility functions
import { calculatePercentage, formatDate } from "@/lib/utils";
// types
import { Answer, Question, Quiz, Take, TakeAnswer, User } from "@prisma/client";
// react
import { useState } from "react";
import ProgressBarEl from "@/components/utility/elements/ProgressBarEl";
import { Button } from "@/components/ui/button";
import PageHeadFollowUser from "@/app/quiz/components/PageHeadFollowUser";

type ExtendedQuestion = Question & {
  answer?: string;
  takeAnswer?: string;
};

type Props = {
  quiz: Quiz | null;
  questions: ExtendedQuestion[];
  answers: Answer[][];
  takeAnswers: TakeAnswer[] | null;
  user: User;
  currentUser: User;
  take: Take;
  isFollowing: Boolean;
};

const CompletedQuizTable: React.FC<Props> = ({
  quiz,
  user,
  questions,
  answers,
  takeAnswers,
  currentUser,
  take,
  isFollowing,
}) => {
  // MAPS DATA FOR ACCORDION

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

  questions.forEach((question, index) => {
    takeAnswers?.map((takeAnswer, i) => {
      if (question.id === takeAnswer.questionId) {
        question.takeAnswer = takeAnswer.answer;
      }
    });
  });

  const bodyContent = (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between p-4 bg-primary text-white font-josefin">
        <h2 className="text-md md:text-xl lg:text-4xl">{quiz?.title}</h2>
        <h4 className="">{quiz?.category}</h4>
      </div>
      <div className="p-4">
        <div className="flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="grow">
              <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl mb-4">
                Your Quiz Results
              </h2>
            </div>
            <div className="grow flex items-center justify-end">
              <Image
                src={currentUser?.image!}
                height={50}
                width={50}
                className="rounded-full"
                alt="User Image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center">
              <h5 className="text-2xl font-bold">
                Quiz Taken:{" "}
                <span className="text-lg font-normal">
                  {formatDate(take?.createdAt)}
                </span>
              </h5>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h5 className="text-2xl font-bold">
                  Score:
                  <span className="text-lg font-normal">
                    {" "}
                    {calculatePercentage(take?.score, quiz?.score!) + "%"}
                  </span>
                </h5>
              </div>
              <span className="text-lg font-normal">
                {" " + take?.score + "/" + quiz?.score}
              </span>
            </div>
            <ProgressBarEl
              percentage={calculatePercentage(take?.score, quiz?.score!)}
            />
            <div className="flex items-center gap-4"></div>
          </div>

          <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl mb-4">
            Answers
          </h2>

          {questions?.map((question, index) => {
            return (
              <>
                <AccordionEl
                  index={index}
                  question={question}
                  key={index}
                  completedQuiz={true}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHeadFollowUser
        user={user}
        currentUser={currentUser!}
        isFollowing={isFollowing}
      />
      <div className="flex flex-col gap-8 border-2 border-gray-600 dark:border-gray-300 rounded-lg shadow-1">
        {bodyContent}
      </div>
    </>
  );
};

export default CompletedQuizTable;
