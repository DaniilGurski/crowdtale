import LibraryStoryItem from "@components/my-library/LibraryStoryItem";
import { Button } from "@components/ui/button";
import { activeStories, completedStories } from "@/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export default function MyLibraryPage() {
  return (
    <div className="mx-auto grid w-[90%] gap-y-4 p-8">
      <div>
        <h2 className="text-2xl font-bold">My Library</h2>
        <p>Your stories, active and finished</p>
      </div>

      <Tabs defaultValue="active">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Button> Create Story </Button>
        </div>

        <TabsContent className="library-grid" value="active">
          {activeStories.map((story) => {
            return <LibraryStoryItem story={story} />;
          })}
        </TabsContent>

        <TabsContent className="library-grid" value="completed">
          {completedStories.map((story) => {
            return <LibraryStoryItem story={story} />;
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
