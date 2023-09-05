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

const CreateQuizModal = ({}) => {
  // form state
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CREATE);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // progress state
  const [percentageProgress, setPercentageProgress] = useState<number>(3);
  // data state
  const [quizQuestionsType, setQuizQuestionsType] = useState<string[]>([]);
  const [quizQuestionsQuestion, setQuizQuestionsQuestion] = useState<string[]>(
    []
  );
  const [quizData, setQuizData] = useState<QuizData>({
    category: "",
    score: 1,
    questions: [],
  });

  const createQuizModal = useCreateQuizModal();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "category" || name === "score") {
      return setQuizData({
        ...quizData,
        [name]: value,
      });
    }

    if (name === "questionType") {
      let newValue = value;
      console.log(newValue, "NVL");
      let updatedArray = [...quizQuestionsType];

      updatedArray[currentQuestion] = newValue;

      setQuizQuestionsType(updatedArray);
    }

    if (name === "question") {
      let newValue = value;
      let updatedArray = [...quizQuestionsQuestion];

      updatedArray[currentQuestion] = newValue;

      setQuizQuestionsQuestion(updatedArray);
    }
  };

  const initQuiz = () => {
    // ADD CHECK FOR SCORE >= 1 && <= 10
    // ADD CHECK FOR CATEGORY !== ''
    // ADD ERROR MESSAGES TO INPUTS

    // CREATE QUESTIONS = MAX NUMBER OF QUESTIONS (EMPTY OBJECTS)
    const newQuizDataQuestions = Array(Number(quizData.score)).fill({
      type: "",
      question: "",
    });

    const newQuizQuestionsType = Array<string>(Number(quizData.score)).fill(
      "Single Select"
    );
    const newQuizQuestionsQuestion = Array<string>(Number(quizData.score)).fill(
      ""
    );

    // FILL QUIZDATA.QUESTIONS WITH EMPTY OBJECTS CREATED PREVIOUSLY
    setQuizData((prevData) => ({
      ...prevData,
      questions: newQuizDataQuestions,
    }));

    setQuizQuestionsType(newQuizQuestionsType);
    setQuizQuestionsQuestion(newQuizQuestionsQuestion);

    // CHANGE STEP TO QUESTIONS
    setStep(STEPS.QUESTIONS);
  };

  const nextQuestion = () => {
    if (currentQuestion === quizData.score - 1) {
      console.log(quizQuestionsQuestion);
      console.log(quizQuestionsType);
      return setStep(STEPS.REVIEW);
    }

    console.log(quizData);
    return setCurrentQuestion(currentQuestion + 1);
  };

  const min = useMemo(() => {
    return 1;
  }, []);
  const max = useMemo(() => {
    return 10;
  }, []);

  let bodyContent;

  if (step === STEPS.CREATE) {
    bodyContent = (
      <div className="flex flex-col gap-12 mt-3">
        <Heading title="Quiz Information" />
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
          minimum={min}
          maximum={max}
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
        {quizQuestionsType[currentQuestion] === "Multiple Choice" && (
          <>
            <h3>Answers</h3>
            <Input
              id="answerOne"
              label="Answer One"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              // ADD VALUE
              value=""
            />
            <Input
              id="answerTwo"
              label="Answer Two"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              // ADD VALUE
              value=""
            />
            <Input
              id="answerThree"
              label="Answer Three"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              // ADD VALUE
              value=""
            />
            <Input
              id="answerFour"
              label="Answer Four"
              type="text"
              disabled={isLoading}
              required={true}
              handleChange={handleChange}
              // ADD VALUE
              value=""
            />
          </>
        )}
        <div className="flex flex-row items-center gap-4">
          <Button className="w-full p-6" variant="outline">
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
      title="Create New Quiz"
      body={bodyContent}
      percentage={percentageProgress}
      current={currentQuestion}
      max={quizData.score}
    />
  );
};

export default CreateQuizModal;
