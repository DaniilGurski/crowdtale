import StoryCard from "@components/StoryCard";
import { supabase } from "@lib/supabase/client";
import type { Story } from "@T/index";
import { useQuery } from "@tanstack/react-query";

const getAllStories = async (): Promise<Story[]> => {
  const { data: stories, error } = await supabase.from("stories").select("*");

  if (error) {
    throw error;
  }

  console.log(stories);

  return stories;
};

export default function DiscoverPage() {
  const { data: stories, isPending } = useQuery({
    queryFn: getAllStories,
    queryKey: ["stories"],
  });

  if (isPending) {
    return <p> Loading stories ... </p>;
  }

  return (
    <section className="mx-auto h-screen w-[90%] max-w-3xl snap-y snap-mandatory overflow-y-scroll">
      {stories?.map((story) => {
        return <StoryCard key={story.id} story={story} />;
      })}
    </section>
  );
}
