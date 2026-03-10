import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { DISCOVER_PAGE, VIRTUALIZATION } from "@lib/constants";
import { useDiscoverFeed } from "@hooks/useDiscoverFeed";
import { useDiscoverFeedVirtualizer } from "@hooks/useDiscoverFeedVirtualizer";
import DiscoverFeedEmpty from "@components/discover-feed/DiscoverFeedEmpty";
import DiscoverFeedLoading from "@components/discover-feed/DiscoverFeedLoading";
import DiscoverFeedError from "@components/discover-feed/DiscoverFeedError";
import StoryCard from "@components/discover-feed/StoryCard";
import StoryCardSkeleton from "@components/skeletons/StoryCardSkeleton";
import DiscoverFeedHeader from "@components/discover-feed/DiscoverFeedHeader";
import { useAtomValue } from "jotai";
import { selectedGenresAtom } from "@lib/atoms";

export default function DiscoverPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView({
    threshold: VIRTUALIZATION.INTERSECTION_THRESHOLD,
  });
  const { data, isPending, error, fetchNextPage, isFetchingNextPage, refetch } =
    useDiscoverFeed();
  const selectedGenres = useAtomValue(selectedGenresAtom);

  const allStories = data?.pages.flat() ?? [];
  const stories =
    selectedGenres.length === 0
      ? allStories
      : allStories.filter((story) =>
          story.story_genres?.some((sg) =>
            selectedGenres.includes(sg.genres.id.toString()),
          ),
        );

  const { virtualizer, virtualItems } = useDiscoverFeedVirtualizer(
    scrollRef,
    stories,
    isFetchingNextPage,
    DISCOVER_PAGE.HEADER_HEIGHT,
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) return <DiscoverFeedLoading />;

  if (error) return <DiscoverFeedError refetch={refetch} />;

  if (allStories.length === 0) return <DiscoverFeedEmpty />;

  return (
    <div className="mx-auto flex h-dvh w-[90%] max-w-xl flex-col">
      <DiscoverFeedHeader />

      <div className="snap-y snap-mandatory overflow-y-scroll" ref={scrollRef}>
        <div
          className="relative"
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
    </div>
  );
}
