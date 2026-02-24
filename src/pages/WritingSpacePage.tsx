import { ChevronLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { getTurnsByStoryId } from "@/services/api";
import { Spinner } from "@components/ui/spinner";
import GenreList from "@components/GenreList";

export default function WritingSpacePage() {
  const { id } = useParams();
  const {
    data: story,
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      if (!id) return;

      return await getTurnsByStoryId(id);
    },
    queryKey: ["turns", id],
    enabled: !!id,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  if (!story) {
    return null;
  }

  const { stories } = story;

  return (
    <section className="h-full flex-1">
      <header className="bg-card flex items-center justify-between rounded-4xl p-4">
        <div className="flex items-center gap-x-2">
          <Button variant="ghost" onClick={() => navigate(from)}>
            <span className="sr-only"> Go back </span>
            <ChevronLeft />
          </Button>
          <div>
            <h2> {stories?.title} </h2>
            <GenreList storyGenres={story.stories?.story_genres} />
          </div>
        </div>

        <Badge variant="secondary"> Waiting for partner </Badge>
      </header>
      <div className="flex h-full flex-col">
        <div className="mx-auto w-[90%] max-w-xl flex-1"></div>

        <Button> Join </Button>
      </div>
    </section>
  );
}
