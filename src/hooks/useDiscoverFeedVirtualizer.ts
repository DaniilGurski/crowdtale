import { VIRTUALIZATION } from "@lib/constants";
import type { Story } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { RefObject } from "react";

export const useDiscoverFeedVirtualizer = (
  scrollRef: RefObject<HTMLDivElement | null>,
  stories: Story[],
  isFetchingNextPage: boolean,
) => {
  const skeletonCount = isFetchingNextPage
    ? VIRTUALIZATION.SKELETON_COUNT_FETCHING
    : 0;

  const virtualizer = useVirtualizer({
    count: stories.length + skeletonCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => window.innerHeight,
  });
  const virtualItems = virtualizer.getVirtualItems();

  return { virtualizer, virtualItems };
};
