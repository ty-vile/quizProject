"use client";

import { Button } from "@/components/ui/button";
import Checkbox from "@/components/utility/Inputs/Checkbox";
import Input from "@/components/utility/Inputs/Input";
import SquareCheckbox from "@/components/utility/Inputs/SquareCheckbox";
import Textarea from "@/components/utility/Inputs/Textarea";
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

export type AnswerProps = {
  answer: string;
  correctAnswer: string;
};

export type QuestionProps = {
  question: string;
  correctAnswer: string;
  answer: string;
};

type QuizData = {
  questions: QuestionProps[];
};

const TakeQuizTable: React.FC<Props> = ({ quiz, questions, answers, user }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INTRO);
  const [quizData, setQuizData] = useState<QuizData>({
    questions: [],
  });

  const initQuiz = () => {
    const correctAnswers: Answer[] = [];

    answers.map((answerSet: any) => {
      answerSet.map((answer: Answer) => {
        if (answer.isCorrect) {
          correctAnswers.push(answer);
        }
      });
    });

    questions?.map((question) => {
      correctAnswers.map((answer) => {
        if (answer.questionId === question.id) {
          const newQuizObject = {
            question: question.question,
            correctAnswer: answer.answer,
            answer: "",
          };
          setQuizData((prevQuizData) => ({
            questions: [...prevQuizData.questions, newQuizObject],
          }));
        }
      });
      return null; // Mapping doesn't return anything
    });

    setStep(STEPS.QUESTIONS);
  };

  const nextQuestion = () => {
    if (currentQuestion === quiz?.score! - 1) {
      return setStep(STEPS.REVIEW);
    }

    return setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    // if only one question in quiz and on review step
    if (currentQuestion === 0 && step === STEPS.REVIEW) {
      setStep(STEPS.QUESTIONS);
      return;
    }

    // if on first question
    if (currentQuestion === 0) {
      return setStep(STEPS.INTRO);
      // DELETE TAKE & SETSTEPS(STEP.INTRO)
    }

    // if on review step
    if (step === STEPS.REVIEW) {
      return setStep(STEPS.QUESTIONS);
    }

    return setCurrentQuestion(currentQuestion - 1);
  };

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
              onClick={initQuiz}
            >
              START QUIZ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.QUESTIONS) {
    bodyContent = (
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-4">
          <h2 className="text-primary font-bungee text-3xl  lg:text-5xl">Q:</h2>
          <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl">
            {questions?.[currentQuestion].question}
          </h2>
        </div>
        {questions?.[currentQuestion].type === "Single Select" ? (
          <div className="mt-8 lg:mt-16">
            <Textarea
              id="answer1"
              label="Answer"
              disabled={isLoading}
              required={true}
              handleChange={() => {}}
              value=""
              rows={8}
              // handleChange={(e) => handleChange(e, 0)}
              // value={quizData.questions[currentQuestion].answers[0].answer}
            />
          </div>
        ) : (
          <div className="mt-8 lg:mt-16">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
              <SquareCheckbox
                type="checkbox"
                id="isCorrect4"
                name="isCorrect"
                label="Answer One"
                disabled={isLoading}
                required={true}
                handleChange={() => {}}
                value={false}
                // handleChange={(e) => handleChange(e, 3)}
                // value={quizData.questions[currentQuestion].answers[3].isCorrect}
              />
              <SquareCheckbox
                type="checkbox"
                id="isCorrect3"
                name="isCorrect"
                label="Answer Two"
                disabled={isLoading}
                required={true}
                handleChange={() => {}}
                value={false}
                // handleChange={(e) => handleChange(e, 3)}
                // value={quizData.questions[currentQuestion].answers[3].isCorrect}
              />
              <SquareCheckbox
                type="checkbox"
                id="isCorrect2"
                name="isCorrect"
                label="Answer Three"
                disabled={isLoading}
                required={true}
                handleChange={() => {}}
                value={false}
                // handleChange={(e) => handleChange(e, 3)}
                // value={quizData.questions[currentQuestion].answers[3].isCorrect}
              />
              <SquareCheckbox
                type="checkbox"
                id="isCorrect2"
                name="isCorrect"
                label="Answer Four"
                disabled={isLoading}
                required={true}
                handleChange={() => {}}
                value={false}
                // handleChange={(e) => handleChange(e, 3)}
                // value={quizData.questions[currentQuestion].answers[3].isCorrect}
              />
            </div>
          </div>
        )}
        <div className="mt-8 lg:mt-16 flex flex-row items-center justify-center gap-4">
          <Button
            className="w-full p-6 max-w-[300px]"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>
          <Button className="w-full p-6 max-w-[300px]" onClick={nextQuestion}>
            Next
          </Button>
        </div>
      </div>
    );
  }

  return <>{bodyContent}</>;
};

export default TakeQuizTable;
