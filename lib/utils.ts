import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(inputDate: Date) {
  if (inputDate instanceof Date) {
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
  } else {
    return "Invalid date format";
  }
}
