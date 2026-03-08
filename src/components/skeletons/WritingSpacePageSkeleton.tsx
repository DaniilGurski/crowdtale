import { Skeleton } from "@components/ui/skeleton";

function NavigationHeaderSkeleton() {
  return (
    <header className="bg-card mb-4 flex items-center justify-between rounded-4xl p-4 shadow-sm">
      <div className="flex items-center gap-x-2">
        {/* Back button */}
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="space-y-2">
          {/* Title */}
          <Skeleton className="h-5 w-40" />
          {/* Genres */}
          <div className="flex gap-1">
            <Skeleton className="h-4 w-12 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        {/* Status badge */}
        <Skeleton className="h-9 w-9 rounded-md" />
        {/* Settings button */}
        <Skeleton className="h-9 w-9 rounded-md" />
        {/* Refresh button */}
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </header>
  );
}

function WritingTurnBlockSkeleton() {
  return <Skeleton className="py-12" />;
}

function WritingTurnsListSkeleton() {
  return (
    <>
      <WritingTurnBlockSkeleton />
      <WritingTurnBlockSkeleton />
      <WritingTurnBlockSkeleton />
    </>
  );
}

function WritingSpaceActionSkeleton() {
  return <Skeleton className="h-24 w-full rounded-md" />;
}

export default function WritingSpacePageSkeleton() {
  return (
    <section className="h-full flex-1 overflow-y-scroll">
      <NavigationHeaderSkeleton />

      <div className="flex h-full flex-col">
        <div className="mx-auto grid w-[90%] max-w-2xl flex-1 content-start gap-y-4">
          <WritingTurnsListSkeleton />

          {/* Waiting message placeholder */}
          <Skeleton className="h-4 w-48" />
        </div>

        <WritingSpaceActionSkeleton />
      </div>
    </section>
  );
}
