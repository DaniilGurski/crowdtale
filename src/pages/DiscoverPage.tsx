import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
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
import { useVirtualizer } from "@tanstack/react-virtual";

export default function DiscoverPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView({ threshold: 0.2 });
  const { data, isPending, error, fetchNextPage, refetch } = useDiscoveryFeed();
  const stories = data?.pages.flat() ?? [];

  const virtualizer = useVirtualizer({
    count: stories.length,
    estimateSize: () => innerHeight,
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) {
    return <Spinner className="size-6" />;
  }

  if (error) {
    return <ErrorStoryCard refetch={refetch} />;
  }

  if (stories.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <div
      className="mx-auto grid h-screen w-[90%] max-w-3xl snap-y snap-mandatory place-items-center overflow-y-scroll"
      ref={scrollRef}
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualItems.map(({ index, key, start }) => {
          const isLast = index + 1 === stories.length;
          const story = stories[index];

          return (
            <div
              className="absolute inset-0"
              style={{ transform: `translateY(${start}px)` }}
              key={key}
            >
              <StoryCard story={story} ref={isLast ? ref : undefined} />
            </div>
          );
        })}
      </div>
    </div>
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
