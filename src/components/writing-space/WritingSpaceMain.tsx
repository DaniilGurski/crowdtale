import WritingTurnsList from "@components/writing-space/WritingTurnList";
import WritingSpaceAction from "@components/writing-space/WritingSpaceAction";
import { useIsParticipant } from "@hooks/useIsParticipant";
import { useSuspenseTurnsById } from "@hooks/useTurnsById";
import { useUser } from "@hooks/useUser";
import { getNextWriter } from "@lib/utils";
import { useParams } from "react-router";

export default function WritingSpaceMain() {
  const { user } = useUser();
  const { id: storyId } = useParams();
  const { data: isParticipant } = useIsParticipant(storyId, user?.id);
  const { data: story, error } = useSuspenseTurnsById(storyId);

  if (error) {
    return <p> {error.message} </p>;
  }

  const { turns, status } = story;
  const nextWriter = getNextWriter(story);

  return (
    <div className="relative flex h-full flex-col">
      <div className="mx-auto grid w-[90%] max-w-2xl flex-1 content-start gap-y-4">
        <WritingTurnsList turns={turns} />

        {isParticipant && story.status === "active" && (
          <p className="animate-pulse text-sm text-orange-950/70 italic">
            Waiting for {nextWriter.profiles.username} turn...
          </p>
        )}
      </div>

      <WritingSpaceAction userId={user?.id} status={status} />
    </div>
  );
}
