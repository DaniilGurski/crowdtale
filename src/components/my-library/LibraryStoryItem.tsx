import { type ComponentPropsWithRef } from "react";
import { Clock, PenIcon } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { getRelativeTime } from "@lib/utils";
import type { StoryWithParticipants } from "@T/index";

interface LibraryStoryItemProps extends ComponentPropsWithRef<"div"> {
  story: StoryWithParticipants;
}

export default function LibraryStoryItem({ story }: LibraryStoryItemProps) {
  const { title, created_at, story_genres, story_participants } = story;

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="text-xl"> {title} </CardTitle>
        <ul className="flex flex-wrap gap-x-2">
          {story_genres.map(({ genres }) => {
            return <Badge key={genres.id}> {genres.name} </Badge>;
          })}
        </ul>
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
        <Button> View </Button>
      </CardFooter>
    </Card>
  );
}
