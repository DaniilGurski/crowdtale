import StoryCard from "@components/StoryCard";
import { supabase } from "@lib/supabase/client";
import type { Story } from "@T/index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PAGE_SIZE = 5;

const getAllStories = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Story[]> => {
  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  console.log(`getting stories from index: ${from} to: ${to}`);

  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .range(from, to);

  if (error) throw error;
  return data;
};

export default function StoryFeed() {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { data, isPending, error, fetchNextPage } = useInfiniteQuery({
    queryFn: getAllStories,
    queryKey: ["stories"],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isPending) {
    return <p> Loading stories ... </p>;
  }

  if (error) {
    return <p> Error: {error.message} </p>;
  }

  const content = data.pages.map((stories) =>
    stories.map((story, index) => {
      const isLast = index + 1 === stories.length;

      if (isLast) {
        return <StoryCard key={story.id} story={story} ref={ref} />;
      }

      return <StoryCard key={story.id} story={story} />;
    }),
  );

  return content;
}
