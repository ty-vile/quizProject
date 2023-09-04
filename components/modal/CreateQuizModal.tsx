"use client";

import { useState } from "react";
import Modal from "./Modal";
import useCreateQuizModal from "@/hooks/useCreateQuizModal";
import Heading from "../utility/Heading";
import Input from "../utility/Inputs/Input";
import Select from "../utility/Inputs/Select";
import { Button } from "../ui/button";

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
  const [progressBar, setProgressBar] = useState<number>(3);
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

  const submitCreateQuiz = () => {
    // ADD CHECK FOR SCORE >= 1 && <= 10
    // ADD CHECK FOR CATEGORY !== ''
    // ADD ERROR MESSAGES TO INPUTS

    // CREATE QUESTIONS = MAX NUMBER OF QUESTIONS (EMPTY OBJECTS)
    const newQuizDataQuestions = Array(Number(quizData.score)).fill({
      type: "",
      question: "",
    });

    const newQuizQuestionsType = Array<string>(Number(quizData.score)).fill("");
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
          minimum={1}
          maximum={10}
          handleChange={handleChange}
          value={quizData.score}
        />
        <Button
          disabled={isLoading}
          onClick={submitCreateQuiz}
          variant="outline"
          className="p-8"
        >
          Create Quiz
        </Button>
      </div>
    );
  }

  if (step === STEPS.QUESTIONS) {
    bodyContent = (
      <div className="flex flex-col gap-12 mt-3">
        <div className="relative h-4 rounded-full overflow-hidden bg-background">
          <div
            className={`absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 w-${progressBar}/12`}
          ></div>
        </div>
        <Select
          label="Question Type"
          id="questionType"
          value={quizQuestionsType[currentQuestion]}
          handleChange={handleChange}
        >
          <option disabled>Select Type</option>
          <option>Multiple Choice</option>
          <option>Single Select</option>
        </Select>
        <Input
          id="question"
          label="Question"
          type="text"
          disabled={isLoading}
          handleChange={handleChange}
          value={quizQuestionsQuestion[currentQuestion]}
        />
        {quizQuestionsType[currentQuestion] === ""
          ? ""
          : quizQuestionsType[currentQuestion] === "Multiple Choice"
          ? "Multiple Choice"
          : "Single Select"}
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
    />
  );
};

export default CreateQuizModal;
