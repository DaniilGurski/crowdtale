import { Skeleton } from "@components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

export default function CreateStoryFormSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-4xl">
      {/* Progress Bar Section */}
      <div className="px-6 pt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a New Story</CardTitle>
        <CardDescription>
          Set the stage for your collaborative tale. Another writer will join
          you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-4 w-64" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {/* Next button */}
        <Skeleton className="h-9 w-16" />
      </CardFooter>
    </Card>
  );
}
