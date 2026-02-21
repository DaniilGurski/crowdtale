import { Skeleton } from "@/components/ui/skeleton";

export default function CreateStoryFormSkeleton() {
  return (
    <div className="grid gap-y-6">
      {/* Story Title Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Genres Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-14" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* Opening Paragraph Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-36 w-full" />
      </div>
    </div>
  );
}
