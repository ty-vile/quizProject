"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
// types
import { Answer, Question, Quiz, User } from "@prisma/client";
// react
import { useState } from "react";

// types
enum STEPS {
  INTRO = 0,
  QUESTIONS = 1,
  REVIEW = 2,
}

type Props = {
  quiz: Quiz | null;
  questions: Question[] | null;
  answers: Answer[];
  user: User;
};

const TakeQuizTable: React.FC<Props> = ({ quiz, questions, answers, user }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [step, setStep] = useState(STEPS.INTRO);

  let bodyContent;

  if (step === STEPS.INTRO) {
    bodyContent = (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="group w-full lg:w-4/12 flex flex-col items-center justify-center gap-10 py-20 border-2 border-primary hover:bg-primary duration-1000">
          <div className="flex flex-col items-center gap-2 dark:text-white group-hover:text-white">
            <h4 className="font-bungee text-xl">Quiz By: {user?.name}</h4>
            <h5 className="font-josefin">{formatDate(quiz?.createdAt!)}</h5>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="dark:text-white group-hover:text-white font-josefin">
              Are you ready to take this quiz?
            </h3>
            <Button
              size="lg"
              className="group-hover:bg-white group-hover:text-primary"
              onClick={() => setStep(STEPS.QUESTIONS)}
            >
              START QUIZ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{bodyContent}</>;
};

export default TakeQuizTable;
