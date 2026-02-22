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
import { Badge } from "@components/ui/badge";
import { getRelativeTime } from "@lib/utils";
import type { StoryWithGenres } from "@T/index";

interface StoryCardProps extends ComponentPropsWithRef<"div"> {
  story: StoryWithGenres;
}

export default function StoryCard({ story, ref }: StoryCardProps) {
  const { title, opening_text, creator_id, created_at, story_genres } = story;

  return (
    <Card className="flex h-screen snap-start flex-col rounded-3xl" ref={ref}>
      <CardHeader>
        <CardTitle className="text-xl"> {title} </CardTitle>
        <ul className="flex flex-wrap gap-2">
          {story_genres.map(({ genres }) => {
            return (
              <li key={genres.id}>
                <Badge key={genres.id}> {genres.name} </Badge>
              </li>
            );
          })}
        </ul>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-4 tracking-wider italic">"{opening_text}"</p>
      </CardContent>

      <CardFooter className="grid gap-y-4">
        <div className="flex justify-between">
          <p className="flex gap-x-2">
            <PenIcon />
            <span>By: {creator_id.substring(0, 10)}</span>
          </p>
          <p className="flex gap-x-2">
            <Clock />
            <span> {getRelativeTime(created_at)} </span>
          </p>
        </div>
        <Button> Join Story </Button>
      </CardFooter>
    </Card>
  );
}
