"use client";

// components
import AccordionEl from "@/components/utility/elements/AccordionEl";
import { Button } from "@/components/ui/button";
import PageHeadFollowUser from "@/app/quiz/components/PageHeadFollowUser";
import SquareCheckbox from "@/components/utility/inputs/SquareCheckbox";
import Textarea from "@/components/utility/inputs/Textarea";
// hooks
import useConfirmQuizModal from "@/hooks/useConfirmQuizModal";
// utils
import { formatDate } from "@/lib/utils";
// types
import { Answer, Question, Quiz, User } from "@prisma/client";
// react
import { useState } from "react";
// toast notifications
import { toast } from "react-toastify";

// enum
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
  currentUser: User;
  isFollowing: Boolean;
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

const TakeQuizTable: React.FC<Props> = ({
  quiz,
  questions,
  answers,
  user,
  currentUser,
  isFollowing,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INTRO);
  const [takeId, setTakeId] = useState<String>("");
  const [quizData, setQuizData] = useState<QuizData>({
    questions: [],
  });

  const confirmQuizModal = useConfirmQuizModal();

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
      setIsLoading(true);

      fetch("/api/take", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ takeId }),
      });

      setIsLoading(false);

      return setStep(STEPS.INTRO);
    }

    // if on review step
    if (step === STEPS.REVIEW) {
      return setStep(STEPS.QUESTIONS);
    }

    return setCurrentQuestion(currentQuestion - 1);
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
      userId: currentUser?.id,
      quizId: quiz?.id,
      status: "In Progress",
      score: 0,
      maxScore: quiz?.score,
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

    try {
      fetch("/api/takeanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ takeId, quizData }),
      }).catch((error) => {
        console.log(error);
        toast.error("Error submitting quiz");
      });

      fetch("/api/take", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ takeId, quizData }),
      })
        .then(() => {
          confirmQuizModal.onOpen();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error submitting quiz");
        });

      setIsLoading(false);
    } catch (error) {
      toast.error("Error submitting quiz");
      console.log(error);
    }
  };

  let bodyContent;

  if (step === STEPS.INTRO) {
    bodyContent = (
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between p-4 bg-primary text-white font-josefin">
          <h2 className="text-md md:text-xl lg:text-4xl">{quiz?.title}</h2>
          <h4 className="">{quiz?.category}</h4>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <h5 className="text-2xl font-bold">
              Created On:
              <span className="text-lg font-normal">
                {" "}
                {formatDate(quiz?.createdAt!)}
              </span>
            </h5>
            <h5 className="text-2xl font-bold">
              Total Questions:
              <span className="text-lg font-normal"> {quiz?.score}</span>
            </h5>
            <div className="w-full flex items-center justify-center">
              <Button
                className="w-full lg:max-w-[300px]"
                disabled={isLoading}
                onClick={initQuiz}
              >
                Take Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.QUESTIONS) {
    bodyContent = (
      <div className="w-full flex flex-col">
        <h2 className="bg-primary text-white w-full font-josefin p-4 text-md md:text-xl lg:text-4xl">
          {questions?.[currentQuestion]?.question}
        </h2>

        {questions?.[currentQuestion].type === "Single Select" ? (
          <div className="p-4 ">
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
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 p-4">
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
        )}
        <div className="p-4 flex flex-row items-center justify-center gap-8">
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
      <div className="flex flex-col h-full">
        <h2 className="bg-primary text-white w-full font-josefin p-4 text-md md:text-xl lg:text-4xl">
          Review Your Answers
        </h2>
        <div className="p-4 mb-4">
          <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl mb-4">
            Questions
          </h2>
          {quizData.questions.map((question, index) => {
            return (
              <>
                {
                  <AccordionEl
                    index={index}
                    /* @ts-ignore - ignore extended types in AccordionEl */
                    question={question}
                    takeQuiz={true}
                    key={index}
                  />
                }
              </>
            );
          })}
        </div>
        <div className="-mt-8 p-4 flex flex-row items-center justify-center gap-4 ">
          <Button
            className="w-full lg:max-w-[300px]"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>
          <Button
            className="w-full lg:max-w-[300px]"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeadFollowUser
        user={user!}
        currentUser={currentUser!}
        isFollowing={isFollowing}
      />
      <div className="flex flex-col gap-8 border-2 border-gray-600 dark:border-gray-300 rounded-lg shadow-1">
        {bodyContent}
      </div>
    </>
  );
};

export default TakeQuizTable;
