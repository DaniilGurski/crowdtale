import WritingSpaceAction from "@components/writing-space/WritingSpaceAction";
import WritingSpaceHeader from "@components/writing-space/WritingSpaceHeader";
import WritingTurnsList from "@components/writing-space/WritingTurnList";
import WritingSpacePageSkeleton from "@components/skeletons/WritingSpacePageSkeleton";
import { useUser } from "@hooks/useUser";
import { useTurnsById } from "@hooks/useTurnsById";
import { useIsParticipant } from "@hooks/useIsParticipant";
import { getNextWriter } from "@lib/utils";
import { useParams } from "react-router";

// Page where users can view, join, and contribute to the story they are part of
export default function WritingSpacePage() {
  const { user } = useUser();
  const { id: storyId } = useParams();
  const { data: story, isPending, error } = useTurnsById(storyId);
  const { data: isParticipant } = useIsParticipant(storyId, user?.id);

  if (isPending) {
    return <WritingSpacePageSkeleton />;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  const { turns, status } = story;
  const nextWriter = getNextWriter(story);

  return (
    <section className="h-full flex-1 overflow-y-scroll">
      <WritingSpaceHeader />

      <div className="flex h-full flex-col">
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
    </section>
  );
}
