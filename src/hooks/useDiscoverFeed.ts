import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllStories } from "@services/api";
import { STORIES } from "@lib/constants";

export const useDiscoverFeed = () => {
  return useInfiniteQuery({
    queryFn: getAllStories,
    queryKey: ["stories"],

    staleTime: 0,
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === STORIES.PAGE_SIZE
        ? allPages.length
        : undefined;
    },
  });
};
