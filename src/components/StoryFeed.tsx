import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import StoryCard, {
  ErrorStoryCard,
  SkeletonStoryCard,
} from "@components/StoryCard";
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

export default function StoryFeed() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView({ threshold: 1 });
  const { data, isPending, error, fetchNextPage, isFetchingNextPage, refetch } =
    useDiscoveryFeed();
  const stories = data?.pages.flat() ?? [];

  // Show skeleton cards while fetching next page
  const skeletonCount = isFetchingNextPage ? 3 : 0;
  const itemCount = stories.length + skeletonCount;

  const virtualizer = useVirtualizer({
    count: itemCount,
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
          const isLastStory = index + 1 === stories.length;
          const isSkeleton = index >= stories.length;
          const story = stories[index];

          return (
            <div
              className="absolute inset-0"
              style={{ transform: `translateY(${start}px)` }}
              key={key}
            >
              {isSkeleton ? (
                <SkeletonStoryCard />
              ) : (
                <StoryCard story={story} ref={isLastStory ? ref : undefined} />
              )}
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
