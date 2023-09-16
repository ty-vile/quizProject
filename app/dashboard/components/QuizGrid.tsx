"use client";

import { Quiz } from "@prisma/client";
import QuizCard from "./QuizCard";
import CategoryFilter from "@/components/filter/CategoryFilter";
import { useMemo, useState } from "react";

type Props = { quizzes: Quiz[] | null };

const QuizGrid: React.FC<Props> = ({ quizzes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  // creates array of categories removing any duplicates
  const categoriesSet = Array.from(
    new Set(quizzes!.map((quiz) => quiz.category))
  );

  const displayQuizzes = useMemo(() => {
    if (selectedCategory.length === 0) {
      return quizzes;
    }

    let filteredQuizzes;

    filteredQuizzes = quizzes!.filter((quiz) =>
      selectedCategory.includes(quiz.category)
    );

    return filteredQuizzes;
  }, [selectedCategory]);

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <CategoryFilter
          uniqueCategories={categoriesSet}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* Search Input */}
      </div>
      {displayQuizzes?.map((quiz, i) => {
        const { title, createdAt, category, score, id } = quiz;

        return (
          <QuizCard
            key={id}
            id={id}
            title={title}
            category={category}
            score={score}
            createdAt={createdAt}
          />
        );
      })}
    </>
  );
};

export default QuizGrid;
