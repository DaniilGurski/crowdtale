import LibraryStoryItem from "@components/my-library/LibraryStoryItem";
import LibraryListSkeleton from "@components/skeletons/LibraryListSkeleton";
import { TabsContent } from "@components/ui/tabs";
import { useLibrary } from "@hooks/useLibrary";
import LibraryListEmpty from "./LibraryListEmpty";

export default function LibraryList() {
  const { data: stories, isPending, error } = useLibrary();

  const activeStories = stories?.filter(
    (story) => story.status === "waiting" || story.status === "active",
  );
  const completedStories = stories?.filter(
    (story) => story.status === "completed",
  );

  if (isPending) {
    return <LibraryListSkeleton />;
  }

  if (error) {
    return <p> {error.message} </p>;
  }

  return (
    <>
      <TabsContent className="library-grid" value="active">
        {activeStories?.length ? (
          activeStories.map((story) => (
            <LibraryStoryItem key={story.id} storyId={story.id} />
          ))
        ) : (
          <LibraryListEmpty message="No active stories" />
        )}
      </TabsContent>
      <TabsContent className="library-grid" value="completed">
        {completedStories?.length ? (
          completedStories.map((story) => (
            <LibraryStoryItem key={story.id} storyId={story.id} />
          ))
        ) : (
          <LibraryListEmpty message="No completed stories" />
        )}
      </TabsContent>
    </>
  );
}
