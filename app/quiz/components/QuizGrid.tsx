"use client";

import { Quiz } from "@prisma/client";
import QuizCard from "./QuizCard";
import CategoryFilter from "@/components/filter/CategoryFilter";
import { useMemo, useState } from "react";

type Props = {
  quizzes: Quiz[] | null;
  path: string;
};

const QuizGrid: React.FC<Props> = ({ quizzes, path }) => {
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
    <div className="flex flex-col flex-wrap w-full relative md:flex-row md:gap-x-8">
      <div className="flex flex-col gap-4 w-full md:w-1/5 md:sticky md:top-24 h-fit max-h-[70vh]">
        <h2 className="bg-primary text-white w-fit font-josefin p-4 text-md md:text-xl lg:text-4xl">
          Filters
        </h2>
        <CategoryFilter
          uniqueCategories={categoriesSet}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="flex grow w-full md:w-9/12 flex-wrap justify-end gap-4">
        {displayQuizzes?.map((quiz, i) => {
          const { title, createdAt, category, score, id, userId } = quiz;

          return (
            <QuizCard
              userId={userId}
              key={id}
              id={id}
              title={title}
              category={category}
              score={score}
              createdAt={createdAt}
              path={path}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuizGrid;
