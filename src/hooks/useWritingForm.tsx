import { addNewStoryTurn } from "@services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";
import { type CanvasPath } from "react-sketch-canvas";

export default function useWritingForm(storyId?: string) {
  const [textDraft, setTextDraft] = useState("");
  const [drawingPaths, setDrawingPaths] = useState<CanvasPath[]>([]);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textDraft.trim() || !storyId) return;

    await addNewStoryTurn(storyId, textDraft);
    queryClient.invalidateQueries({ queryKey: ["turns", storyId] });
    setTextDraft("");
    setDrawingPaths([]);
  };

  return {
    textDraft,
    setTextDraft,
    drawingPaths,
    setDrawingPaths,
    handleSubmit,
  };
}
