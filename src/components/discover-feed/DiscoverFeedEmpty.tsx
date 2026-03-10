import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@components/ui/empty";
import { Button } from "@components/ui/button";
import { Compass } from "lucide-react";
import { Link } from "react-router";

export default function DiscoverFeedEmpty() {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Compass />
        </EmptyMedia>
        <EmptyTitle> No stories found ! </EmptyTitle>

        <EmptyDescription>Perhaps you will be the first?</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/create-story"> Create Story </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
