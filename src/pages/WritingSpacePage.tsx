import { Spinner } from "@components/ui/spinner";
import { WritingSpaceAction } from "@components/writing-space/WritingSpaceAction";
import { TurnBlock } from "@components/writing-space/TurnBlock";
import { useUser } from "@hooks/useUser";
import { useParams } from "react-router";
import { useTurnsById } from "@/hooks/useTurnsById";
import NavigationHeader from "@/components/writing-space/NavigationHeader";
import StoryGuard from "@/components/guards/StoryGuard";

// Page where users can view, join, and contribute to the story they are part of
export default function WritingSpacePage() {
  const { id: storyId } = useParams();
  const { data: turns, isPending, error, storyInfo } = useTurnsById(storyId);
  const { user } = useUser();

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  if (!turns?.length || !storyInfo) {
    return (
      <section className="h-full flex-1 overflow-y-scroll">
        <NavigationHeader />
        <p className="grid w-full place-items-center">
          You don't have permission to view this story !
        </p>
      </section>
    );
  }

  return (
    <section className="h-full flex-1 overflow-y-scroll">
      <NavigationHeader
        storyTitle={storyInfo.title}
        storyGenres={storyInfo.story_genres}
        storyStatus={storyInfo.status}
      />

      <div className="flex h-full flex-col">
        <div className="mx-auto grid w-[90%] max-w-2xl flex-1 content-start gap-y-4">
          {turns.map(({ content, profiles }, index) => {
            if (index <= 0) {
              return (
                <TurnBlock
                  key={index}
                  text={content}
                  author={profiles.username}
                  isOpening
                />
              );
            }
            return <TurnBlock text={content} author={profiles.username} />;
          })}
        </div>

        <WritingSpaceAction
          storyId={storyId}
          userId={user!.id}
          status={storyInfo.status}
        />
      </div>
    </section>
  );
}
