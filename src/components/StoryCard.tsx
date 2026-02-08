import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Clock, PenIcon } from "lucide-react";
import type { Story } from "@/types";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const { title, genres, contents, creatorName, createdAt } = story;
  const introText = contents[0].text;

  const getDaysDiff = () => {
    const now = Date.now();

    const diffInDays = Math.floor(
      (now - createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    return diffInDays;
  };

  return (
    <Card className="flex h-full snap-start flex-col rounded-none">
      <CardHeader>
        <CardTitle className="text-xl"> {title} </CardTitle>
        <ul className="flex flex-wrap gap-x-2">
          {genres.map((genre) => (
            <li>
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
            <PenIcon /> <span> By: {creatorName} </span>
          </p>
          <p className="flex gap-x-2">
            <Clock />
            <span> {getDaysDiff()} days ago </span>
          </p>
        </div>
        <Button> Join Story </Button>
      </CardFooter>
    </Card>
  );
}
