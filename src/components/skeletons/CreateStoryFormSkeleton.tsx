import { Skeleton } from "@/components/ui/skeleton";

export default function CreateStoryFormSkeleton() {
  return (
    <div className="grid gap-y-6">
      {/* Story Title Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>

      {/* Genres Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-14" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* Deadline Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full max-w-[280px]" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      {/* Opening Paragraph Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-[168px] w-full" />
      </div>
    </div>
  );
}
