import { Button } from "@components/ui/button";
import { useTurnsById } from "@hooks/useTurnsById";
import { useUser } from "@hooks/useUser";
import useWritingForm from "@hooks/useWritingForm";
import { getNextWriter } from "@lib/utils";
import { useParams, Link, useOutletContext } from "react-router";

export default function WritingForm() {
  const { user } = useUser();
  const { id: storyId } = useParams();
  const { textDraft, setTextDraft, handleSubmit } =
    useOutletContext<ReturnType<typeof useWritingForm>>();
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
        value={textDraft}
        onChange={(e) => setTextDraft(e.target.value)}
      />

      <div className="flex">
        <Link to={`/stories/${storyId}/draw`}>
          <Button type="button" className="m-2 px-12">
            Draw
          </Button>
        </Link>

        <Button
          type="submit"
          className="m-2 px-12"
          disabled={user.id !== nextWriter.user_id}
        >
          Send
        </Button>
      </div>
    </form>
  );
}
