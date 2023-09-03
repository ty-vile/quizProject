"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import useCreateQuizModal from "@/hooks/useCreateQuizModal";
import Heading from "../utility/Heading";
import Input from "../utility/Input";
import { Button } from "../ui/button";

enum STEPS {
  CREATE = 0,
  QUESTIONS = 1,
  REVIEW = 2,
}

type Question = {
  name: string;
  answer: string;
};

type QuizData = {
  questions: Question[];
  category: string;
  score: number;
};

const CreateQuizModal = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CREATE);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [quizData, setQuizData] = useState<QuizData>({
    category: "",
    score: 1,
    questions: [],
  });

  const createQuizModal = useCreateQuizModal();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const submitCreateQuiz = () => {
    // ADD CHECK FOR SCORE >= 1 && <= 10
    // ADD CHECK FOR CATEGORY !== ''
    // ADD ERROR MESSAGES TO INPUTS

    // CREATE QUESTIONS = MAX NUMBER OF QUESTIONS (EMPTY OBJECTS)
    const newQuestions = Array(Number(quizData.score)).fill({
      type: "",
      question: "",
    });

    // FILL QUIZDATA.QUESTIONS WITH EMPTY OBJECTS CREATED PREVIOUSLY
    setQuizData((prevData) => ({
      ...prevData,
      questions: [...newQuestions],
    }));

    // SET CURRENT QUESTION TO ONE TO TRACK WHICH QUESTION WE ARE UP TOO
    setCurrentQuestion(1);

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
          Create Questions
        </Button>
      </div>
    );
  }

  if (step === STEPS.QUESTIONS) {
    bodyContent = (
      <div className="flex flex-col gap-12 mt-3">
        <Button
          disabled={isLoading}
          onClick={() => {
            console.log(quizData);
          }}
          variant="outline"
          className="p-8"
        >
          CLG
        </Button>
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
