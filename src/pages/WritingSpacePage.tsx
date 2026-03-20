import WritingSpacePageSkeleton from "@components/skeletons/WritingSpacePageSkeleton";
import WritingSpaceHeader from "@components/writing-space/WritingSpaceHeader";
import useWritingForm from "@hooks/useWritingForm";
import { Suspense } from "react";
import { Outlet, useParams } from "react-router";

// Page where users can view, join, and contribute to the story they are part of
export default function WritingSpacePage() {
  const { id: storyId } = useParams();
  const writingForm = useWritingForm(storyId);

  return (
    <Suspense fallback={<WritingSpacePageSkeleton />}>
      <section className="h-full flex-1 overflow-y-scroll">
        <WritingSpaceHeader />

        <Outlet context={writingForm} />
      </section>
    </Suspense>
  );
}
