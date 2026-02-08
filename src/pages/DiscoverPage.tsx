import StoryCard from "@/components/StoryCard";

export default function DiscoverPage() {
  return (
    <section className="mx-auto h-screen w-[90%] max-w-3xl snap-y snap-mandatory overflow-y-scroll">
      {/* <h2> Discover Page </h2> */}
      <StoryCard />
      <StoryCard />
      <StoryCard />
    </section>
  );
}
