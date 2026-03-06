import { Clock, PenIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import { getRelativeTime } from "@lib/utils";
import type { StoryWithGenres, StoryWithParticipants } from "@T/index";
import { Link, useLocation } from "react-router";
import GenreList from "../GenreList";

interface StoryCardProps extends ComponentPropsWithRef<"div"> {
  story: StoryWithGenres & StoryWithParticipants;
}

export default function StoryCard({ story, ref }: StoryCardProps) {
  const {
    id,
    title,
    opening_text,
    created_at,
    story_genres,
    story_participants,
  } = story;
  const location = useLocation();

  return (
    <Card className="flex h-full flex-col rounded-3xl" ref={ref}>
      <CardHeader>
        <CardTitle className="text-xl"> {title} </CardTitle>
        <GenreList storyGenres={story_genres} />
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-4 tracking-wider italic">"{opening_text}"</p>
      </CardContent>

      <CardFooter className="grid gap-y-4">
        <div className="flex justify-between">
          <p className="flex gap-x-2">
            <PenIcon />
            <span>By: {story_participants[0].profiles.username}</span>
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
