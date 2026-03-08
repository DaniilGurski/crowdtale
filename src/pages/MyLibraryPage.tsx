import NavigationHeader from "@components/NavigationHeader";
import LibraryList from "@components/my-library/LibraryList";
import { Button } from "@components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Link } from "react-router";

export default function MyLibraryPage() {
  return (
    <div className="flex w-full flex-col">
      <NavigationHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-y-4 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold">My Library</h2>
          <p>Your stories, active and completed</p>
        </div>

        <Tabs defaultValue="active">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <Button asChild>
              <Link to="/create-story"> Create Story </Link>
            </Button>
          </div>

          <LibraryList />
        </Tabs>
      </div>
    </div>
  );
}
