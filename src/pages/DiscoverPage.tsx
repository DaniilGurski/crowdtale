import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { VIRTUALIZATION } from "@lib/constants";
import { useDiscoverFeed } from "@hooks/useDiscoverFeed";
import { useDiscoverFeedVirtualizer } from "@hooks/useDiscoverFeedVirtualizer";
import DiscoverFeedEmpty from "@components/discover-feed/DiscoverFeedEmpty";
import DiscoverFeedLoading from "@components/discover-feed/DiscoverFeedLoading";
import DiscoverFeedError from "@components/discover-feed/DiscoverFeedError";
import StoryCard from "@components/discover-feed/StoryCard";
import StoryCardSkeleton from "@components/skeletons/StoryCardSkeleton";

export default function DiscoverPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView({
    threshold: VIRTUALIZATION.INTERSECTION_THRESHOLD,
  });
  const { data, isPending, error, fetchNextPage, isFetchingNextPage, refetch } =
    useDiscoverFeed();
  const stories = data?.pages.flat() ?? [];

  const { virtualizer, virtualItems } = useDiscoverFeedVirtualizer(
    scrollRef,
    stories,
    isFetchingNextPage,
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) return <DiscoverFeedLoading />;

  if (error) return <DiscoverFeedError refetch={refetch} />;

  if (stories.length === 0) return <DiscoverFeedEmpty />;

  return (
    <div
      className="mx-auto h-screen w-[90%] max-w-xl snap-y snap-mandatory overflow-y-scroll"
      ref={scrollRef}
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualItems.map(({ index, key, start, size }) => {
          const isLast = index + 1 === stories.length;
          const story = stories[index];
          const isSkeleton = index >= stories.length;

          return (
            <div
              className="absolute w-full snap-start"
              key={key}
              style={{
                height: `${size}px`,
                transform: `translateY(${start}px)`,
              }}
            >
              {isSkeleton ? (
                <StoryCardSkeleton />
              ) : (
                <StoryCard story={story} ref={isLast ? ref : undefined} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
