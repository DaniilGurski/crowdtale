import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import StoryCard, { ErrorStoryCard } from "@components/StoryCard";
import { Spinner } from "@components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@components/ui/empty";
import { Button } from "@components/ui/button";
import { useDiscoveryFeed } from "@hooks/useDiscoveryFeed";
import { Compass } from "lucide-react";

export default function StoryFeed() {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { data, isPending, error, fetchNextPage, refetch } = useDiscoveryFeed();
  const stories = data?.pages.flat() ?? [];

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) {
    return <Spinner className="size-6" />;
  }

  if (error) {
    return <ErrorStoryCard refetch={refetch} />;
  }

  if (!stories) {
    return <EmptyFeed />;
  }

  return (
    <>
      {stories.map((story, index) => {
        const isLast = index + 1 === stories.length;

        return (
          <StoryCard
            key={story.id}
            story={story}
            ref={isLast ? ref : undefined}
          />
        );
      })}
    </>
  );
}

// TODO: Move to seperate file
function EmptyFeed() {
  return (
    <Empty>
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
        <Button> Create story </Button>
      </EmptyContent>
    </Empty>
  );
}
