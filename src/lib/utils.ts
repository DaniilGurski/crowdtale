import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StoryWithTurns, StoryParticipantWithProfiles } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRelativeTime = (dateString: string | null) => {
  if (!dateString) return "undefined";

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

export const capitalize = (str: string) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export const getNextWriter = (
  story: StoryWithTurns,
): StoryParticipantWithProfiles => {
  const participants = story.story_participants;
  const lastTurn = story.turns[story.turns.length - 1];

  if (!lastTurn) return participants[0];

  const lastWriterIndex = participants.findIndex(
    (p) => p.user_id === lastTurn.user_id,
  );

  // Round Robin logic: Go to next person, or loop to index 0
  const nextIndex = (lastWriterIndex + 1) % participants.length;
  return participants[nextIndex];
};
