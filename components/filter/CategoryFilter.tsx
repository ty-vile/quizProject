"use client";

import { useState } from "react";
import CategoryFilterBadge from "./CategoryFilterBadge";

type Props = {
  uniqueCategories: string[];
  selectedCategory: string[];
  setSelectedCategory: (value: string[]) => void;
};

const CategoryFilter: React.FC<Props> = ({
  uniqueCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = useState<string[]>(uniqueCategories);

  const handleClick = (category: string) => {
    if (selectedCategory.includes(category)) {
      // remove category
      const updatedSelectedCategory = selectedCategory.filter(
        (item) => item !== category
      );
      setSelectedCategory(updatedSelectedCategory);
    } else {
      // addCategory
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 lg:gap-4">
      {categories?.map((category, i) => {
        return (
          <CategoryFilterBadge
            key={i}
            category={category}
            handleClick={handleClick}
            selectedCategory={selectedCategory}
          />
        );
      })}
    </div>
  );
};

export default CategoryFilter;
