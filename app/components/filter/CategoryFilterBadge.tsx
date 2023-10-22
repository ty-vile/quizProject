"use client";

import { Quiz } from "@prisma/client";
import { useEffect, useState } from "react";

type Props = {
  category: string;
  handleClick: (category: string) => void;
  selectedCategory: string[];
};

const CategoryFilterBadge: React.FC<Props> = ({
  category,
  handleClick,
  selectedCategory,
}) => {
  const selected = selectedCategory.includes(category);

  return (
    <div
      className={`px-2 py-1 pt-2 lg:px-4 lg:py-3 lg:pb-2 border-2 border-primary cursor-pointer bg-background hover:bg-primary transition-all duration-300 text-sm font-josefin ${
        selected ? "bg-primary text-white" : ""
      }`}
      onClick={() => handleClick(category)}
    >
      {category}
    </div>
  );
};

export default CategoryFilterBadge;
