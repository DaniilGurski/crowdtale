import { useTurnsById } from "@hooks/useTurnsById";
import { useUser } from "@hooks/useUser";
import useWritingForm from "@hooks/useWritingForm";
import { getNextWriter } from "@lib/utils";
import { Button } from "@components/ui/button";
import { useParams } from "react-router";

export default function WritingForm() {
  const { user } = useUser();
  const { id: storyId } = useParams();
  const { userInput, setUserInput, handleSubmit } = useWritingForm(storyId);
  const { data: story } = useTurnsById(storyId);

  if (!story || !user) {
    return null;
  }

  const nextWriter = getNextWriter(story);

  return (
    <form
      className="writing-form-grid bg-card w-full justify-items-end rounded-t-4xl shadow-sm"
      onSubmit={handleSubmit}
    >
      {/* I am using the standard textarea because I want the form to be styled as the one from Shadcn */}
      <textarea
        className="caret-primary w-full resize-none border-none p-4 shadow-none focus:outline-0"
        placeholder="..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button
        type="submit"
        className="m-2 px-12"
        disabled={user.id !== nextWriter.user_id}
      >
        Send
      </Button>
    </form>
  );
}
