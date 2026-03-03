import { Button } from "@components/ui/button";
import { useState, type SubmitEvent } from "react";
import { useParams } from "react-router";

export default function WritingForm() {
  const { id: storyId } = useParams();
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }
  };

  return (
    <form
      className="writing-form-grid bg-card relative justify-items-end"
      onSubmit={handleSubmit}
    >
      {/* I am using the standard textarea because I want the form to be styled as the one from Shadcn */}
      <textarea
        className="caret-primary w-full resize-none border-none p-4 shadow-none focus:outline-0"
        placeholder="..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button className="m-2 px-12"> Send </Button>
    </form>
  );
}
