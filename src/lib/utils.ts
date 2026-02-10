import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRelativeTime = (dateString: string) => {
  const now = Date.now();
  const createdAtDate = new Date(dateString);

  const diffInDays = Math.floor(
    (now - createdAtDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return `${Math.floor(diffInDays / 7)} weeks ago`;
};
