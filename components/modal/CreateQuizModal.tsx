"use client";

import { useMemo, useState } from "react";
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
  // quiz data state
  const [quizQuestionsType, setQuizQuestionsType] = useState<string[]>([]);
  const [quizQuestionsQuestion, setQuizQuestionsQuestion] = useState<string[]>(
    []
  );
  let [quizQuestionsAnswers, setQuizQuestionsAnswers] = useState<QuizState>([
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
  ]);

  const [quizData, setQuizData] = useState<QuizData>({
    category: "",
    score: 1,
    questions: [],
  });

  const createQuizModal = useCreateQuizModal();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "category" || name === "score") {
      setQuizData({
        ...quizData,
        [name]: value,
      });
    }

    if (name === "questionType") {
      let newValue = value;
      let updatedTypesArray = [...quizQuestionsType];
      updatedTypesArray[currentQuestion] = newValue;
      setQuizQuestionsType(updatedTypesArray);
    }

    if (name === "question") {
      let newValue = value;
      let updatedQuestionsArray = [...quizQuestionsQuestion];
      updatedQuestionsArray[currentQuestion] = newValue;
      setQuizQuestionsQuestion(updatedQuestionsArray);
    }

    if (name === "answerOne") {
      let newValue = value;
      let updatedAnswersArray = [...quizQuestionsAnswers];

      updatedAnswersArray[currentQuestion][0].answer = newValue;
      setQuizQuestionsAnswers(updatedAnswersArray);
    }

    if (name === "answerTwo") {
      let newValue = value;
      let updatedAnswersArray = [...quizQuestionsAnswers];

      updatedAnswersArray[currentQuestion][1].answer = newValue;
      setQuizQuestionsAnswers(updatedAnswersArray);
    }

    if (name === "answerThree") {
      let newValue = value;
      let updatedAnswersArray = [...quizQuestionsAnswers];

      updatedAnswersArray[currentQuestion][2].answer = newValue;
      setQuizQuestionsAnswers(updatedAnswersArray);
    }

    if (name === "answerFour") {
      let newValue = value;
      let updatedAnswersArray = [...quizQuestionsAnswers];

      updatedAnswersArray[currentQuestion][3].answer = newValue;
      setQuizQuestionsAnswers(updatedAnswersArray);
    }
  };

  const initQuiz = () => {
    // ADD CHECK FOR SCORE >= 1 && <= 10
    // ADD CHECK FOR CATEGORY !== ''
    // ADD ERROR MESSAGES TO INPUTS

    // create questions object - max number of questions
    const newQuizDataQuestions = Array(Number(quizData.score)).fill({
      type: "",
      question: "",
    });

    // fill quizData with prefilled empty objects
    setQuizData((prevData) => ({
      ...prevData,
      questions: newQuizDataQuestions,
    }));

    // create types - prefill with single select
    const newQuizQuestionsTypes = Array<string>(Number(quizData.score)).fill(
      "Single Select"
    );

    // create questions - prefill with empty string
    const newQuizQuestionsQuestions = Array<string>(
      Number(quizData.score)
    ).fill("");

    // prefill state ready to be updated with handlechange
    setQuizQuestionsType(newQuizQuestionsTypes);
    setQuizQuestionsQuestion(newQuizQuestionsQuestions);

    // CHANGE STEP TO QUESTIONS
    setStep(STEPS.QUESTIONS);
  };

  const nextQuestion = () => {
    if (currentQuestion === quizData.score - 1) {
      console.log(quizQuestionsAnswers);
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

  let bodyContent;

  if (step === STEPS.CREATE) {
    bodyContent = (
      <div className="flex flex-col gap-12 mt-3">
        <Input
          id="category"
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
        {/* <ProgressBar
          percentage={percentageProgress}
          current={currentQuestion + 1}
          max={quizData?.score}
        /> */}
        <Select
          label="Question Type"
          id="questionType"
          value={quizQuestionsType[currentQuestion]} // Set the default value
          handleChange={handleChange}
        >
          <option value="Single Select">Single Select</option>
          <option value="Multiple Choice">Multiple Choice</option>
        </Select>
        <Textarea
          id="question"
          label="Question"
          disabled={isLoading}
          handleChange={handleChange}
          value={quizQuestionsQuestion[currentQuestion]}
        />
        <h3>
          Answer
          {quizQuestionsType[currentQuestion] === "Multiple Choice" && "s"}
        </h3>
        <Input
          id="answerOne"
          label="Answer One"
          type="text"
          disabled={isLoading}
          required={true}
          handleChange={handleChange}
          // ADD VALUE
          value={quizQuestionsAnswers[currentQuestion][0].answer}
        />
        {quizQuestionsType[currentQuestion] === "Multiple Choice" && (
          <>
            <Input
              id="answerTwo"
              label="Answer Two"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              // ADD VALUE
              value={quizQuestionsAnswers[currentQuestion][1].answer}
            />
            <Input
              id="answerThree"
              label="Answer Three"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              // ADD VALUE
              value={quizQuestionsAnswers[currentQuestion][2].answer}
            />
            <Input
              id="answerFour"
              label="Answer Four"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              // ADD VALUE
              value={quizQuestionsAnswers[currentQuestion][3].answer}
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
