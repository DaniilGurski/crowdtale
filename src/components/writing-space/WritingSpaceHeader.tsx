import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import GenreList from "@components/GenreList";
import StorySettingsDialog from "@components/writing-space/StorySettingsDialog";
import { useLocation, useNavigate, useParams } from "react-router";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import { capitalize } from "@lib/utils";
import { useTurnsById } from "@hooks/useTurnsById";
import { useStoryById } from "@/hooks/useStoryById";

export default function WritingSpaceHeader() {
  const { id: storyId } = useParams();
  const { data: story, isPending } = useStoryById(storyId);
  const { refetch } = useTurnsById(storyId);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  if (isPending) {
    return null;
  }

  const { title, story_genres, status } = story!;

  return (
    <header className="bg-card mb-4 flex items-center justify-between rounded-b-4xl p-4 shadow-sm">
      <div className="flex items-center gap-x-1 sm:gap-x-2">
        <Button variant="ghost" onClick={() => navigate(from)}>
          <span className="sr-only"> Go back </span>
          <ChevronLeft />
        </Button>
        <div>
          <h2> {title} </h2>
          <GenreList className="hidden sm:flex" storyGenres={story_genres} />
        </div>
      </div>

      <div className="flex gap-x-1 sm:gap-x-2">
        {status && <Badge variant="secondary">{capitalize(status)}</Badge>}
        <StorySettingsDialog />
        <Button variant="ghost" onClick={() => refetch()}>
          <span className="sr-only"> Refresh </span>
          <RefreshCcw />
        </Button>
      </div>
    </header>
  );
}
