"use client";

import { Button } from "@/components/ui/button";
import SquareCheckbox from "@/components/utility/Inputs/SquareCheckbox";
import Textarea from "@/components/utility/Inputs/Textarea";
import { formatDate } from "@/lib/utils";
// types
import { Answer, Question, Quiz, User } from "@prisma/client";
// react
import { useState } from "react";
// icons
import { MdEdit, MdPublishedWithChanges } from "react-icons/md";
import { toast } from "react-toastify";

// types
enum STEPS {
  INTRO = 0,
  QUESTIONS = 1,
  REVIEW = 2,
}

type Props = {
  quiz: Quiz | null;
  questions: Question[] | null;
  answers: Answer[][];
  user: User;
};

export type AnswerProps = {
  answer: string;
  correctAnswer: string;
};

export type QuestionProps = {
  questionId: string;
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
  const [takeId, setTakeId] = useState<String>("");
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
            questionId: question.id,
            question: question.question,
            correctAnswer: answer.answer,
            answerId: answer.id,
            answer: "",
          };
          setQuizData((prevQuizData) => ({
            questions: [...prevQuizData.questions, newQuizObject],
          }));
        }
      });
      return null; // Mapping doesn't return anything
    });

    // CREATE TAKE QUIZ HERE - /acitions/createTakeQuiz.ts
    handleSubmitTake();
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

  const editQuestion = (index: number) => {
    setCurrentQuestion(index);
    setStep(STEPS.QUESTIONS);
  };

  const handleChange = (event: any, index?: number) => {
    let { name, value, id } = event.target;

    if (name === "answer") {
      const duplicateQuestionsArray = quizData.questions.map((question, i) => {
        if (i === currentQuestion) {
          return {
            ...question,
            answer: value,
          };
        }
        // for other questions, return them as they are
        return question;
      });

      setQuizData({
        questions: duplicateQuestionsArray,
      });
    }

    if (name === "checkboxAnswer") {
      const duplicateQuestionsArray = quizData.questions.map((question, i) => {
        if (i === currentQuestion) {
          return {
            ...question,
            answer: id,
          };
        }
        // for other questions, return them as they are
        return question;
      });

      setQuizData({
        questions: duplicateQuestionsArray,
      });
    }
  };

  const handleSubmitTake = () => {
    setIsLoading(true);

    const takeData = {
      userId: user.id,
      quizId: quiz?.id,
      status: "In Progress",
      score: 0,
    };

    fetch("/api/take", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(takeData),
    })
      .then(async (res) => {
        const response = await res.json();
        setTakeId(response.id);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmitQuiz = () => {
    setIsLoading(true);

    fetch("/api/takeanswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ takeId, quizData }),
    })
      .then(() => {
        toast.success("Quiz Submitted");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error submitting quiz");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <div className="mt-8 lg:mt-10">
            <Textarea
              id="answer"
              label="Answer"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              value={quizData.questions[currentQuestion].answer}
              rows={6}
            />
          </div>
        ) : (
          <div className="mt-8 lg:mt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
              <SquareCheckbox
                type="checkbox"
                id={answers?.[currentQuestion]?.[0]?.answer}
                name="checkboxAnswer"
                label="Answer One"
                disabled={isLoading}
                required={true}
                handleChange={(e) => handleChange(e, 0)}
                value={
                  quizData?.questions[currentQuestion]?.answer ==
                  answers?.[currentQuestion]?.[0]?.answer
                }
              />
              <SquareCheckbox
                type="checkbox"
                id={answers?.[currentQuestion]?.[1]?.answer}
                name="checkboxAnswer"
                label="Answer Two"
                disabled={isLoading}
                required={true}
                handleChange={handleChange}
                value={
                  quizData?.questions[currentQuestion]?.answer ==
                  answers?.[currentQuestion]?.[1]?.answer
                }
              />
              <SquareCheckbox
                type="checkbox"
                id={answers?.[currentQuestion]?.[2]?.answer}
                name="checkboxAnswer"
                label="Answer Three"
                disabled={isLoading}
                required={true}
                handleChange={handleChange}
                value={
                  quizData?.questions[currentQuestion]?.answer ==
                  answers?.[currentQuestion]?.[2]?.answer
                }
              />
              <SquareCheckbox
                type="checkbox"
                id={answers?.[currentQuestion]?.[3]?.answer}
                name="checkboxAnswer"
                label="Answer Four"
                disabled={isLoading}
                required={true}
                handleChange={handleChange}
                value={
                  quizData?.questions[currentQuestion]?.answer ==
                  answers?.[currentQuestion]?.[3]?.answer
                }
              />
            </div>
          </div>
        )}
        <div className="mt-8 lg:mt-10 mb-8 lg:mb-10 flex flex-row items-center justify-center gap-8">
          <Button
            className="w-full p-6 lg:max-w-[300px]"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>
          <Button
            className="w-full p-6 lg:max-w-[300px]"
            onClick={nextQuestion}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  if (step === STEPS.REVIEW) {
    bodyContent = (
      <div className="flex flex-col gap-6 mt-3  h-full">
        <div className="flex items-center gap-4 ">
          <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl">
            Review Answers
          </h2>
        </div>
        {quizData.questions.map((question, index) => {
          return (
            <div className="flex flex-col gap-4 mt-10 mb-10">
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 cursor-pointer z-50 ">
                  <Textarea
                    value={question.question}
                    id={`Question${index + 1}`}
                    label={`Question ${index + 1}`}
                    handleChange={() => {}}
                    rows={6}
                    disabled={true}
                  />
                  <Textarea
                    value={question.answer}
                    id={`Answer${index + 1}`}
                    label={`Answer ${index + 1}`}
                    handleChange={() => {}}
                    rows={6}
                    disabled={true}
                  />
                  <div
                    className="p-2 rounded-full bg-red-100 transition-300 hover:bg-red-200 hover:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    onClick={() => editQuestion(index)}
                  >
                    <h4 className="block md:hidden font-josefin">
                      Edit Answer
                    </h4>
                    <MdEdit className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="-mt-8 mb-8 lg:mb-10 flex flex-row items-center justify-center gap-4 lg:pr-14">
          <Button
            className="w-full p-6 max-w-[300px]"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>
          <Button
            className="w-full p-6 lg:max-w-[300px]"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    );
  }

  return <>{bodyContent}</>;
};

export default TakeQuizTable;
