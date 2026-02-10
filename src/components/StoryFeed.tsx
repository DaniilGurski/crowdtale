import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import StoryCard from "@components/StoryCard";
import { useDiscoveryFeed } from "@hooks/useDiscoveryFeed";

export default function StoryFeed() {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { data, isPending, error, fetchNextPage } = useDiscoveryFeed();
  const stories = data?.pages.flat() ?? [];

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) {
    return <p> Loading stories ... </p>;
  }

  if (error) {
    return <p> Error: {error.message} </p>;
  }

  if (!stories) {
    return <p> No stories yet ! </p>;
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
