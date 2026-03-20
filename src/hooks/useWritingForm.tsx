import { addNewStoryTurn } from "@services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";
import { type CanvasPath } from "react-sketch-canvas";

export default function useWritingForm(storyId?: string) {
  const [textDraft, setTextDraft] = useState("");
  const [drawingPaths, setDrawingPaths] = useState<CanvasPath[]>([]);
  const [drawingImage, setDrawingImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textDraft.trim() || !storyId) return;

    await addNewStoryTurn(storyId, textDraft, drawingImage);
    queryClient.invalidateQueries({ queryKey: ["turns", storyId] });
    setTextDraft("");
    setDrawingPaths([]);
    setDrawingImage(null);
  };

  return {
    textDraft,
    setTextDraft,
    drawingPaths,
    setDrawingPaths,
    drawingImage,
    setDrawingImage,
    handleSubmit,
  };
}
