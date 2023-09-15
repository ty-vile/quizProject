"use client";

// react
import { useMemo, useState } from "react";
// hooks
import useCreateQuizModal from "@/hooks/useCreateQuizModal";
import { useRouter } from "next/navigation";
// components
import Modal from "./Modal";
import Input from "../utility/Inputs/Input";
import Select from "../utility/Inputs/Select";
import { Button } from "../ui/button";
import Textarea from "../utility/Inputs/Textarea";
import Checkbox from "../utility/Inputs/Checkbox";

// types
enum STEPS {
  CREATE = 0,
  QUESTIONS = 1,
  REVIEW = 2,
}

export type AnswerProps = {
  answer: string;
  isCorrect: boolean;
};

export type QuestionProps = {
  type: string;
  question: string;
  answers: AnswerProps[];
};

type QuizData = {
  questions: QuestionProps[];
  category: string;
  title: string;
  score: number;
};

type QuizState = AnswerProps[][];

const CreateQuizModal = ({}) => {
  // form state
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CREATE);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // quiz state
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    category: "",
    score: 1,
    questions: [],
  });

  const createQuizModal = useCreateQuizModal();
  const router = useRouter();

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
    if (name === "category" || name === "score" || name === "title") {
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

    // handle changing answers
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

    // handle correct answer
    if (name === "isCorrect") {
      const duplicateQuestionsArray = quizData.questions.map((question, i) => {
        if (i === currentQuestion) {
          const updatedIsCorrect = question.answers.map((answer, j) => {
            // if j === index of input update answer
            if (j === index) {
              return {
                ...answer,
                isCorrect: true,
              };
            }
            // for other answers, return them as they are
            return {
              ...answer,
              isCorrect: false,
            };
          });

          // if i === current question update values with new answer
          return {
            ...question,
            answers: updatedIsCorrect,
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
      return setStep(STEPS.CREATE);
    }

    // if on review step
    if (step === STEPS.REVIEW) {
      return setStep(STEPS.QUESTIONS);
    }

    return setCurrentQuestion(currentQuestion - 1);
  };

  function calcStepPercentage(num1: number, num2: number) {
    const ratio = num2 / num1;
    const closestDivisibleBy12 = Math.round(ratio * 100); // Divide by 12 to convert to a percentage
    return closestDivisibleBy12;
  }

  const progress = useMemo(() => {
    if (!quizData.score) {
      return 0;
    }

    if (step === STEPS.CREATE) {
      return 0;
    }

    if (quizData.score) {
      return calcStepPercentage(quizData.score, currentQuestion + 1);
    }
  }, [quizData.score, currentQuestion, step, STEPS]);

  const handleSubmit = async () => {
    setIsLoading(true);

    fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    })
      .then(() => {
        createQuizModal.onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setQuizData({
      title: "",
      category: "",
      score: 1,
      questions: [],
    });

    return router.refresh();
  };

  let bodyContent;

  // creating quiz
  if (step === STEPS.CREATE) {
    bodyContent = (
      <div className="flex flex-col gap-12 mt-3">
        <Input
          id="title"
          name="title"
          label="Quiz Title"
          type="text"
          disabled={isLoading}
          required={true}
          handleChange={handleChange}
          value={quizData.title}
        />
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

  // creating / editing questions
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
          rows={3}
        />
        <div className="w-full flex items-center justify-between">
          <h3 className="font-bold text-xl">
            Answer
            {quizData.questions[currentQuestion].type === "Multiple Choice" &&
              "s"}
          </h3>
          {quizData.questions[currentQuestion].type === "Multiple Choice" && (
            <h3 className="font-bold text-xl">Is Correct?</h3>
          )}
        </div>
        <div className="flex items-center">
          <Input
            id="answer1"
            name="answer"
            label="Answer One"
            type="text"
            disabled={isLoading}
            required={true}
            handleChange={(e) => handleChange(e, 0)}
            value={quizData.questions[currentQuestion].answers[0].answer}
          />
          {quizData.questions[currentQuestion].type === "Multiple Choice" && (
            <Checkbox
              type="checkbox"
              id="isCorrect1"
              name="isCorrect"
              label="Is Correct?"
              disabled={isLoading}
              required={true}
              handleChange={(e) => handleChange(e, 0)}
              value={quizData.questions[currentQuestion].answers[0].isCorrect}
            />
          )}
        </div>
        {quizData.questions[currentQuestion].type === "Multiple Choice" && (
          <>
            <div className="flex items-center">
              <Input
                id="answer2"
                label="Answer Two"
                name="answer"
                type="text"
                disabled={isLoading}
                required={true}
                handleChange={(e) => handleChange(e, 1)}
                value={quizData.questions[currentQuestion].answers[1].answer}
              />
              <Checkbox
                type="checkbox"
                id="isCorrect2"
                name="isCorrect"
                label="Is Correct?"
                disabled={isLoading}
                required={true}
                handleChange={(e) => handleChange(e, 1)}
                value={quizData.questions[currentQuestion].answers[1].isCorrect}
              />
            </div>
            <div className="flex items-center">
              <Input
                id="answer3"
                label="Answer Three"
                name="answer"
                type="text"
                disabled={isLoading}
                required={true}
                handleChange={(e) => handleChange(e, 2)}
                value={quizData.questions[currentQuestion].answers[2].answer}
              />
              <Checkbox
                type="checkbox"
                id="isCorrect3"
                name="isCorrect"
                label="Is Correct?"
                disabled={isLoading}
                required={true}
                handleChange={(e) => handleChange(e, 2)}
                value={quizData.questions[currentQuestion].answers[2].isCorrect}
              />
            </div>
            <div className="flex items-center">
              <Input
                id="answer4"
                label="Answer Four"
                name="answer"
                type="text"
                disabled={isLoading}
                required={true}
                handleChange={(e) => handleChange(e, 3)}
                value={quizData.questions[currentQuestion].answers[3].answer}
              />
              <Checkbox
                type="checkbox"
                id="isCorrect4"
                name="isCorrect"
                label="Is Correct?"
                disabled={isLoading}
                required={true}
                handleChange={(e) => handleChange(e, 3)}
                value={quizData.questions[currentQuestion].answers[3].isCorrect}
              />
            </div>
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

  // reviewing quiz
  if (step === STEPS.REVIEW) {
    bodyContent = (
      <div className="flex flex-col gap-6 mt-3  h-full">
        <div className="flex items-center gap-4 pb-4">
          <Input
            disabled={true}
            value={quizData.category}
            id="category"
            name="category"
            label="Category"
            handleChange={() => {}}
          />
          <Input
            disabled={true}
            value={quizData.score}
            id="score"
            name="score"
            label="Score"
            handleChange={() => {}}
          />
        </div>
        {quizData.questions.map((question, index) => {
          return (
            <div key={index} className="flex flex-col md:flex-row gap-4 pb-4 ">
              <Textarea
                value={question.question}
                id={`Question${index + 1}`}
                label={`Question ${index + 1}`}
                handleChange={() => {}}
                rows={1}
                disabled={true}
              />
              {question.type === "Single Select" && (
                <Textarea
                  disabled={true}
                  value={question.answers[0].answer}
                  id={`Answer${index + 1}`}
                  label={`Answer ${index + 1}`}
                  handleChange={() => {}}
                  rows={1}
                />
              )}
              {question.type === "Multiple Choice" &&
                question.answers.map((answer, i) => {
                  if (answer.isCorrect === true) {
                    return (
                      <Textarea
                        key={i}
                        disabled={true}
                        value={answer.answer}
                        id={`Answer${index + 1}`}
                        label={`Answer ${index + 1}`}
                        handleChange={() => {}}
                        rows={1}
                      />
                    );
                  }
                  return;
                })}
            </div>
          );
        })}

        <div className="flex flex-row items-center gap-4">
          <Button
            className="w-full p-6"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>
          <Button className="w-full p-6" onClick={handleSubmit}>
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
      return `Review Quiz Info: ${quizData.title}`;
    }
  }, [step, currentQuestion, quizData]);

  return (
    <Modal
      disabled={isLoading}
      isOpen={createQuizModal.isOpen}
      onClose={createQuizModal.onClose}
      title={modalTitle}
      body={bodyContent}
      percentage={progress?.toString()}
      current={currentQuestion}
      max={quizData.score}
    />
  );
};

export default CreateQuizModal;
