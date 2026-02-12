import StoryFeed from "@components/StoryFeed";

export default function DiscoverPage() {
  return (
    <section className="mx-auto grid h-screen w-[90%] max-w-3xl snap-y snap-mandatory place-items-center overflow-y-scroll">
      <StoryFeed />
    </section>
  );
}
