import { type ComponentPropsWithRef } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import GenreList from "@components/GenreList";
import { getRelativeTime } from "@lib/utils";
import type { StoryWithGenres, StoryWithParticipants } from "@T/index";
import { Clock, PenIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

interface LibraryStoryItemProps extends ComponentPropsWithRef<"div"> {
  story: StoryWithGenres & StoryWithParticipants;
}

export default function LibraryStoryItem({ story }: LibraryStoryItemProps) {
  const { id, title, created_at, story_genres, story_participants } = story;
  const location = useLocation();

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="text-xl"> {title} </CardTitle>
        <GenreList storyGenres={story_genres} />
      </CardHeader>
      <CardFooter className="mt-auto grid gap-y-4 text-sm">
        <div className="grid gap-y-2">
          <p className="flex gap-x-2">
            <PenIcon />
            <span>By: {story_participants[0].profiles.username} </span>
          </p>
          <p className="flex gap-x-2">
            <Clock />
            <span> {getRelativeTime(created_at)} </span>
          </p>
        </div>
        <Button asChild>
          <Link to={`/stories/${id}`} state={{ from: location }}>
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
