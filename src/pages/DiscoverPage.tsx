import StoryFeed from "@components/StoryFeed";

export default function DiscoverPage() {
  return (
    <section className="mx-auto h-screen w-[90%] max-w-3xl snap-y snap-mandatory overflow-y-scroll">
      <StoryFeed />
    </section>
  );
}
