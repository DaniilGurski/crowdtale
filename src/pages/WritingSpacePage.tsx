import WritingSpacePageSkeleton from "@components/skeletons/WritingSpacePageSkeleton";
import WritingSpaceHeader from "@components/writing-space/WritingSpaceHeader";
import { Suspense } from "react";
import { Outlet } from "react-router";

// Page where users can view, join, and contribute to the story they are part of
export default function WritingSpacePage() {
  return (
    <Suspense fallback={<WritingSpacePageSkeleton />}>
      <section className="h-full flex-1 overflow-y-scroll">
        <WritingSpaceHeader />

        <Outlet />
      </section>
    </Suspense>
  );
}
