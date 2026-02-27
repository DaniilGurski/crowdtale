import { ChevronLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Spinner } from "@components/ui/spinner";
import GenreList from "@components/GenreList";
import { WritingSpaceAction } from "@components/writing-space/WritingSpaceAction";
import { TurnBlock } from "@components/writing-space/TurnBlock";
import { useUser } from "@hooks/useUser";
import { useLocation, useNavigate, useParams } from "react-router";
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
    return null;
  }

  /* TODO: Fix overflow issues on mobile */
  return (
    <section className="h-full flex-1">
      <NavigationHeader
        storyTitle={storyInfo.title}
        storyGenres={storyInfo.story_genres}
        storyStatus={storyInfo.status}
      />
      <StoryGuard>
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
      </StoryGuard>
    </section>
  );
}
