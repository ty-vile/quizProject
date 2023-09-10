"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import useCreateQuizModal from "@/hooks/useCreateQuizModal";
import Heading from "../utility/Heading";
import Input from "../utility/Inputs/Input";
import Select from "../utility/Inputs/Select";
import { Button } from "../ui/button";
import ProgressBar from "../utility/ProgressBar";
import Textarea from "../utility/Inputs/Textarea";
import next from "next/types";

enum STEPS {
  CREATE = 0,
  QUESTIONS = 1,
  REVIEW = 2,
}

type Question = {
  type: string;
  question: string;
  answers: AnswerObject[];
};

type QuizData = {
  questions: Question[];
  category: string;
  score: number;
};

type AnswerObject = {
  answer: string;
  isCorrect: boolean;
};

type QuizState = AnswerObject[][];

const CreateQuizModal = ({}) => {
  // form state
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CREATE);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // progress state
  const [percentageProgress, setPercentageProgress] = useState<string>("1");

  const [quizData, setQuizData] = useState<QuizData>({
    category: "",
    score: 1,
    questions: [],
  });

  const createQuizModal = useCreateQuizModal();

  const initQuiz = () => {
    // ADD CHECK FOR SCORE >= 1 && <= 10
    // ADD CHECK FOR CATEGORY !== ''
    // ADD ERROR MESSAGES TO INPUTS

    const questionsArray = Array(Number(quizData.score)).fill({
      type: "Single Select",
      question: "",
      answers: [{ answer: "", isCorrect: true }],
    });

    setQuizData({
      ...quizData,
      questions: [...questionsArray],
    });
    setStep(STEPS.QUESTIONS);
  };

  const handleChange = (event: any, index?: number) => {
    const { name, value } = event.target;

    // handle initial quiz values
    if (name === "category" || name === "score") {
      setQuizData({
        ...quizData,
        [name]: value,
      });
    }

    // handle changing type of question - multiple choice & single select
    if (name === "questionType") {
      const duplicateQuestionsArray = quizData.questions.map((question, i) => {
        if (i === currentQuestion) {
          // create a deep copy of the question and update its type - also populate answers according to type - multiple choice
          if (value === "Multiple Choice") {
            const answersArray = Array(4).fill({
              answer: "",
              isCorrect: false,
            });

            return {
              ...question,
              type: value,
              answers: answersArray,
            };
          }
          // create a deep copy of the question and update its type - also populate answers according to type - single select
          if (value === "Single Select") {
            const answersArray = Array(1).fill({
              answer: "",
              isCorrect: true,
            });

            return {
              ...question,
              type: value,
              answers: answersArray,
            };
          }
        }
        // for other questions, return them as they are
        return question;
      });

      setQuizData({
        ...quizData,
        questions: duplicateQuestionsArray,
      });
    }

    // handle changing  question - multiple choice & single select
    if (name === "question") {
      const duplicateQuestionsArray = quizData.questions.map((question, i) => {
        if (i === currentQuestion) {
          // create a deep copy of the question and update its type - also populate answers according to type - single select

          return {
            ...question,
            question: value,
          };
        }
        // for other questions, return them as they are
        return question;
      });

      setQuizData({
        ...quizData,
        questions: duplicateQuestionsArray,
      });
    }

    if (name === "answer") {
      const duplicateQuestionsArray = quizData.questions.map((question, i) => {
        if (i === currentQuestion) {
          const updatedAnswers = question.answers.map((answer, j) => {
            // if j === index of input update answer
            if (j === index) {
              return {
                ...answer,
                answer: value,
              };
            }
            // for other answers, return them as they are
            return answer;
          });

          // if i === current question update values with new answer
          return {
            ...question,
            answers: updatedAnswers,
          };
        }
        // for other questions, return them as they are
        return question;
      });

      setQuizData({
        ...quizData,
        questions: duplicateQuestionsArray,
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === quizData.score - 1) {
      console.log(quizData);
      return setStep(STEPS.REVIEW);
    }

    return setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    if (currentQuestion === 0) {
      return setStep(STEPS.CREATE);
    }

    return setCurrentQuestion(currentQuestion - 1);
  };

  let bodyContent;

  if (step === STEPS.CREATE) {
    bodyContent = (
      <div className="flex flex-col gap-12 mt-3">
        <Input
          id="category"
          name="category"
          label="Category"
          type="text"
          disabled={isLoading}
          required={true}
          handleChange={handleChange}
          value={quizData.category}
        />
        <Input
          id="score"
          label="Total Questions"
          type="number"
          name="score"
          disabled={isLoading}
          required={true}
          handleChange={handleChange}
          value={quizData.score}
        />
        <Button
          disabled={isLoading}
          onClick={initQuiz}
          variant="outline"
          className="p-6"
        >
          Create Quiz
        </Button>
      </div>
    );
  }

  if (step === STEPS.QUESTIONS) {
    bodyContent = (
      <div className="flex flex-col gap-6 mt-3  h-full">
        <Select
          label="Question Type"
          id="questionType"
          handleChange={handleChange}
          value={quizData.questions[currentQuestion].type}
        >
          <option value="Single Select">Single Select</option>
          <option value="Multiple Choice">Multiple Choice</option>
        </Select>
        <Textarea
          id="question"
          label="Question"
          disabled={isLoading}
          handleChange={handleChange}
          value={quizData.questions[currentQuestion].question}
        />
        <h3>
          Answer
          {quizData.questions[currentQuestion].type === "Multiple Choice" &&
            "s"}
        </h3>
        <Input
          id="answerOne"
          name="answer"
          label="Answer One"
          type="text"
          disabled={isLoading}
          required={true}
          handleChange={(e) => handleChange(e, 0)}
          value={quizData.questions[currentQuestion].answers[0].answer}
        />
        {quizData.questions[currentQuestion].type === "Multiple Choice" && (
          <>
            <Input
              id="answerTwo"
              label="Answer Two"
              name="answer"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={(e) => handleChange(e, 1)}
              value={quizData.questions[currentQuestion].answers[1].answer}
            />
            <Input
              id="answerThree"
              label="Answer Three"
              name="answer"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={(e) => handleChange(e, 2)}
              value={quizData.questions[currentQuestion].answers[2].answer}
            />
            <Input
              id="answerFour"
              label="Answer Four"
              name="answer"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={(e) => handleChange(e, 3)}
              value={quizData.questions[currentQuestion].answers[3].answer}
            />
          </>
        )}
        <div className="flex flex-row items-center gap-4">
          <Button
            className="w-full p-6"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>
          <Button className="w-full p-6" onClick={nextQuestion}>
            Next
          </Button>
        </div>
      </div>
    );
  }

  const modalTitle = useMemo(() => {
    if (step === STEPS.CREATE) {
      return "Create Quiz";
    }

    if (step === STEPS.QUESTIONS) {
      return (
        "Question:" +
        " " +
        (currentQuestion + 1) +
        "/" +
        quizData.score.toString()
      );
    }

    if (step === STEPS.REVIEW) {
      return "Review Quiz Info";
    }
  }, [step, currentQuestion, quizData]);

  return (
    <Modal
      disabled={isLoading}
      isOpen={createQuizModal.isOpen}
      onClose={createQuizModal.onClose}
      title={modalTitle}
      body={bodyContent}
      percentage={percentageProgress}
      current={currentQuestion}
      max={quizData.score}
    />
  );
};

export default CreateQuizModal;
