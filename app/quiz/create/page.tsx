"use client";

// react
import { useMemo, useState } from "react";
// components
import { toast } from "react-toastify";
import PageHeading from "@/app/components/utility/text/PageHeading";
import AccordionEl from "@/app/components/utility/elements/AccordionEl";
// types
import { Answer, Question } from "@prisma/client";
// hooks
import useConfirmQuizModal from "@/hooks/useConfirmQuizModal";
// inputs
import { Button } from "@/app/components/ui/button";
import Input from "@/app/components/utility/inputs/Input";
import Select from "@/app/components/utility/inputs/Select";
import Textarea from "@/app/components/utility/inputs/Textarea";
import Checkbox from "@/app/components/utility/inputs/Checkbox";

// types
enum STEPS {
  CREATE = 0,
  QUESTIONS = 1,
  REVIEW = 2,
}

type ExtendedQuestion = Question & {
  answers: Answer[];
};

export type QuizData = {
  questions: ExtendedQuestion[];
  category: string;
  title: string;
  score: number;
};

const CreateQuiz = () => {
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

  const confirmQuizModal = useConfirmQuizModal();

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

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      })
        .then(() => {
          confirmQuizModal.onOpen();
          setQuizData({
            title: "",
            category: "",
            score: 1,
            questions: [],
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error creating quiz");
        });

      setIsLoading(false);
    } catch (error) {
      toast.error("Error creating quiz");
      console.log(error);
    }
  };

  const modalTitle = useMemo(() => {
    if (step === STEPS.CREATE) {
      return "Enter Quiz Info";
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

  let bodyContent;

  // creating quiz
  if (step === STEPS.CREATE) {
    bodyContent = (
      <div className="w-full flex flex-col">
        <h2 className="bg-primary text-white w-full  font-josefin p-4 text-md md:text-xl lg:text-4xl">
          {modalTitle}
        </h2>
        <div className="p-4">
          <div className="grid grid-cols-1  gap-4 lg:grid-cols-2 ">
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
          </div>
          <div className="mt-4 flex flex-row items-center justify-center gap-4">
            <Button
              className="w-full lg:max-w-[300px]"
              disabled={isLoading}
              onClick={initQuiz}
            >
              Start Creating Quiz
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
          <h2 className="bg-primary text-white w-full rounded-tl-lg rounded-tr-lg font-josefin p-4 text-md md:text-xl lg:text-4xl">
            {modalTitle}
          </h2>
        </div>
        <div className="flex flex-col gap-4 p-4">
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
            rows={6}
          />
        </div>

        <div className="flex flex-col gap-4 p-4 pt-8">
          <div className="w-full flex items-center justify-between">
            <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl">
              Answer
              {quizData.questions[currentQuestion].type === "Multiple Choice" &&
                "s"}
            </h2>
            {quizData.questions[currentQuestion].type === "Multiple Choice" && (
              <h5 className="bg-primary text-white w-fit font-josefin p-4 text-sm md:text-md lg:text-lg">
                Select Correct Answer
              </h5>
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
                  value={
                    quizData.questions[currentQuestion].answers[1].isCorrect
                  }
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
                  value={
                    quizData.questions[currentQuestion].answers[2].isCorrect
                  }
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
                  value={
                    quizData.questions[currentQuestion].answers[3].isCorrect
                  }
                />
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row items-center justify-center gap-4 p-4">
          <Button
            className="w-full  lg:max-w-[300px]"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>
          <Button className="w-full  lg:max-w-[300px]" onClick={nextQuestion}>
            Next
          </Button>
        </div>
      </div>
    );
  }

  // reviewing quiz
  if (step === STEPS.REVIEW) {
    bodyContent = (
      <div className="flex flex-col h-full">
        <div className="flex items-center ">
          <h2 className="bg-primary text-white w-full rounded-tl-lg rounded-tr-lg font-josefin p-4 text-md md:text-xl lg:text-4xl">
            {modalTitle}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-x-4 gap-y-6 p-4">
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
        <div className="p-4 mb-4">
          <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl mb-4">
            Questions
          </h2>

          {quizData.questions.map((question, index) => {
            return (
              <>
                <AccordionEl
                  index={index}
                  question={question}
                  createQuiz={true}
                  key={index}
                />
              </>
            );
          })}
        </div>
        <div className="-mt-8 flex flex-row items-center justify-center gap-4 lg:pr-14 p-4">
          <Button
            className="w-full lg:max-w-[300px]"
            variant="outline"
            onClick={prevQuestion}
          >
            Back
          </Button>

          <Button className="w-full lg:max-w-[300px]" onClick={handleSubmit}>
            Create Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pb-10">
        <PageHeading heading={"Create Quiz"} />
      </div>
      <div className="flex flex-col gap-8 border-2 border-gray-600 dark:border-gray-300 rounded-lg shadow-1">
        {bodyContent}
      </div>
    </>
  );
};

export default CreateQuiz;
