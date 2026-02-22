import LibraryStoryItem from "@components/my-library/LibraryStoryItem";
import LibraryListSkeleton from "@components/skeletons/LibraryListSkeleton";
import { TabsContent } from "@components/ui/tabs";
import { useLibrary } from "@hooks/useLibrary";

export default function LibraryList() {
  const { data: stories, isPending, error } = useLibrary();

  const activeStories = stories?.filter((story) => story.status === "active");
  const completedStories = stories?.filter(
    (story) => story.status === "completed",
  );

  if (isPending) {
    return <LibraryListSkeleton />;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  if (!stories) {
    return null;
  }

  return (
    <>
      <TabsContent className="library-grid" value="active">
        {activeStories?.map((story) => (
          <LibraryStoryItem key={story.id} story={story} />
        ))}
      </TabsContent>
      <TabsContent className="library-grid" value="completed">
        {completedStories?.map((story) => (
          <LibraryStoryItem key={story.id} story={story} />
        ))}
      </TabsContent>
    </>
  );
}
