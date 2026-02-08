import StoryCard from "@/components/StoryCard";
import { stories } from "@/stories";

export default function DiscoverPage() {
  return (
    <section className="mx-auto h-screen w-[90%] max-w-3xl snap-y snap-mandatory overflow-y-scroll">
      {stories.map((story) => {
        return <StoryCard key={story.id} story={story} />;
      })}
    </section>
  );
}
