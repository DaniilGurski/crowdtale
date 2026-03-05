import { Spinner } from "@components/ui/spinner";
import { WritingSpaceAction } from "@components/writing-space/WritingSpaceAction";
import NavigationHeader from "@components/writing-space/NavigationHeader";
import { useUser } from "@hooks/useUser";
import { useTurnsById } from "@hooks/useTurnsById";
import { getNextWriter } from "@lib/utils";
import { useParams } from "react-router";
import { useIsParticipant } from "@/hooks/useIsParticipant";
import { WritingTurnsList } from "@/components/writing-space/WritingTurnList";

// Page where users can view, join, and contribute to the story they are part of
export default function WritingSpacePage() {
  const { user } = useUser();
  const { id: storyId } = useParams();
  const { data: story, isPending, error } = useTurnsById(storyId);
  const { data: isParticipant } = useIsParticipant(storyId, user?.id);

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  const { turns, title, story_genres, status } = story;
  const nextWriter = getNextWriter(story);

  return (
    <section className="h-full flex-1 overflow-y-scroll">
      <NavigationHeader
        storyTitle={title}
        storyGenres={story_genres}
        storyStatus={status}
        nextWriterUsername={nextWriter.profiles.username}
      />

      <div className="flex h-full flex-col">
        <div className="mx-auto grid w-[90%] max-w-2xl flex-1 content-start gap-y-4">
          <WritingTurnsList turns={turns} />

          {isParticipant && (
            <p>Waiting for {nextWriter.profiles.username} turn...</p>
          )}
        </div>

        <WritingSpaceAction userId={user?.id} status={status} />
      </div>
    </section>
  );
}
