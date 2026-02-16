import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@components/ui/empty";
import { Compass } from "lucide-react";
import { Button } from "@components/ui/button";
import { Link } from "react-router";

export default function DiscoverFeedEmpty() {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Compass />
        </EmptyMedia>
        <EmptyTitle> No stories found ! </EmptyTitle>

        <EmptyDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quidem
          natus, magnam esse molestias maiores perferendis.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/create-story"> Create Story </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
