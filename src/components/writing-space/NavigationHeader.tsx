import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import GenreList from "@components/GenreList";
import { useLocation, useNavigate, useParams } from "react-router";
import { ChevronLeft, RefreshCcw, Settings } from "lucide-react";
import type { StoryStatus } from "@T/index";
import { capitalize } from "@/lib/utils";
import StorySettingsDialog from "./StorySettingsDialog";
import { useTurnsById } from "@/hooks/useTurnsById";

interface NavigationHeaderProps {
  storyTitle?: string;
  storyGenres?: { genres: { id: number; name: string } }[];
  storyStatus?: StoryStatus;
  nextWriterUsername?: string;
}

export default function NavigationHeader({
  storyTitle,
  storyGenres,
  storyStatus,
}: NavigationHeaderProps) {
  const { id: storyId } = useParams();
  const { refetch } = useTurnsById(storyId);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  return (
    <header className="bg-card mb-4 flex items-center justify-between rounded-4xl p-4">
      <div className="flex items-center gap-x-2">
        <Button variant="ghost" onClick={() => navigate(from)}>
          <span className="sr-only"> Go back </span>
          <ChevronLeft />
        </Button>
        <div>
          <h2> {storyTitle} </h2>
          <GenreList storyGenres={storyGenres} />
        </div>
      </div>

      <div className="flex gap-x-2">
        {storyStatus && (
          <Badge variant="secondary">{capitalize(storyStatus)}</Badge>
        )}
        <StorySettingsDialog />
        <Button variant="ghost" onClick={() => refetch()}>
          <span className="sr-only"> Refresh </span>
          <RefreshCcw />
        </Button>
      </div>
    </header>
  );
}
