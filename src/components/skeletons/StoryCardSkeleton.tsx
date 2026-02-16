import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";

export default function StoryCardSkeleton() {
  return (
    <Card className="flex h-screen w-full snap-start flex-col rounded-none">
      <CardHeader>
        <Skeleton className="h-7 w-3/4 rounded" />
        <ul className="flex flex-wrap gap-x-2 pt-2">
          <li>
            <Skeleton className="h-6 w-20 rounded-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-24 rounded-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-20 rounded-full" />
          </li>
        </ul>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </CardContent>

      <CardFooter className="grid gap-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-4 w-1/4 rounded" />
        </div>
        <Skeleton className="h-10 w-full rounded" />
      </CardFooter>
    </Card>
  );
}
