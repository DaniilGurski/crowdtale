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
import type { Story } from "@T/index";

interface StoryCardProps extends ComponentPropsWithRef<"div"> {
  story: Story;
}

export default function StoryCard({ story, ref }: StoryCardProps) {
  const { title, genres, contents, creator, created_at } = story;
  const introText = contents[0].text;

  return (
    <Card className="flex h-screen snap-start flex-col rounded-none" ref={ref}>
      <CardHeader>
        <CardTitle className="text-xl"> {title} </CardTitle>
        <ul className="flex flex-wrap gap-x-2">
          {genres.map((genre) => (
            <li key={genre}>
              <Badge> {genre} </Badge>
            </li>
          ))}
        </ul>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-4 tracking-wider italic">"{introText}"</p>
      </CardContent>

      <CardFooter className="grid gap-y-4">
        <div className="flex justify-between">
          <p className="flex gap-x-2">
            <PenIcon /> <span> By: {creator.username} </span>
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
