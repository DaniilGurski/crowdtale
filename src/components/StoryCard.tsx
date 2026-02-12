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
import { Skeleton } from "@components/ui/skeleton";
import { getRelativeTime } from "@lib/utils";
import type { Story } from "@T/index";

interface StoryCardProps extends ComponentPropsWithRef<"div"> {
  story: Story;
}

interface ErrorCardProps {
  refetch: () => void;
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

// TODO: Move to seperate file
export function SkeletonStoryCard() {
  return (
    <Card className="flex h-screen w-full snap-start flex-col rounded-none">
      <CardHeader>
        <Skeleton className="h-7 w-3/4 rounded" />
        <ul className="flex flex-wrap gap-x-2 pt-2">
          <li>
            <Skeleton className="h-6 w-20 rounded-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-24 rounded-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-20 rounded-full" />
          </li>
        </ul>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </CardContent>

      <CardFooter className="grid gap-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-4 w-1/4 rounded" />
        </div>
        <Skeleton className="h-10 w-full rounded" />
      </CardFooter>
    </Card>
  );
}

// TODO: Move to seperate file
export function ErrorStoryCard({ refetch }: ErrorCardProps) {
  return (
    <Card className="flex h-screen w-full snap-start flex-col items-center justify-center rounded-none">
      <CardContent className="grid gap-y-2 text-center">
        <p className="line-clamp-4 tracking-wider italic">
          Something went wrong !
        </p>

        <Button onClick={refetch}> Retry </Button>
      </CardContent>
    </Card>
  );
}
