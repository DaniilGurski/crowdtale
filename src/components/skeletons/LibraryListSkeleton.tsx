import { Card, CardFooter, CardHeader } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";

function LibraryStoryItemSkeleton() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <Skeleton className="h-7 w-3/4 rounded" />
        <ul className="flex flex-wrap gap-x-2">
          <li>
            <Skeleton className="h-6 w-16 rounded-full" />
          </li>
          <li>
            <Skeleton className="h-6 w-20 rounded-full" />
          </li>
        </ul>
      </CardHeader>
      <CardFooter className="mt-auto grid gap-y-4 text-sm">
        <div className="grid gap-y-2">
          <div className="flex gap-x-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
          <div className="flex gap-x-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded" />
      </CardFooter>
    </Card>
  );
}

export default function LibraryListSkeleton() {
  return (
    <div className="library-grid">
      {Array.from({ length: 4 }).map((_, index) => (
        <LibraryStoryItemSkeleton key={index} />
      ))}
    </div>
  );
}
