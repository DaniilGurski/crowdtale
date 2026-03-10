import { Skeleton } from "@components/ui/skeleton";

function WritingTurnsListSkeleton() {
  return (
    <>
      <Skeleton className="py-12" />
      <Skeleton className="py-12" />
      <Skeleton className="py-12" />
    </>
  );
}

function WritingSpaceActionSkeleton() {
  return <Skeleton className="h-24 w-full rounded-md" />;
}

export default function WritingSpacePageSkeleton() {
  return (
    <section className="h-full flex-1 overflow-y-scroll">
      <Skeleton className="mb-4 py-8"> </Skeleton>

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
