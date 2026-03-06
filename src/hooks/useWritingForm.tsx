import { addNewStoryTurn } from "@services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";

export default function useWritingForm(storyId?: string) {
  const [userInput, setUserInput] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || !storyId) return;
    console.log();

    await addNewStoryTurn(storyId, userInput);
    queryClient.invalidateQueries({ queryKey: ["turns", storyId] });
    setUserInput("");
  };

  return { userInput, setUserInput, handleSubmit };
}
